'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, ArrowRight, ArrowLeft } from 'lucide-react'

interface LeadFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: LeadFormData) => void
}

export interface LeadFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  requirements: string
}

type ModalView = 'form' | 'calendar'

export function LeadFormModal({ isOpen, onClose, onSubmit }: LeadFormModalProps) {
  const [currentView, setCurrentView] = useState<ModalView>('form')
  const [formData, setFormData] = useState<LeadFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    requirements: ''
  })

  const [errors, setErrors] = useState<Partial<LeadFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset modal state when it opens/closes
  useEffect(() => {
    if (isOpen) {
      setCurrentView('form')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        requirements: ''
      })
      setErrors({})
    }
  }, [isOpen])

  const validateForm = (): boolean => {
    const newErrors: Partial<LeadFormData> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.company.trim()) newErrors.company = 'Company name is required'
    if (!formData.requirements.trim()) newErrors.requirements = 'Please tell us what you need'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Log the form data (you can send this to your backend later)
    console.log('Lead form submitted:', formData)
    
    // Switch to calendar view - DON'T call onSubmit to avoid redirects
    setCurrentView('calendar')
    setIsSubmitting(false)
  }

  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleClose = () => {
    setCurrentView('form')
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative bg-white rounded-2xl shadow-xl transition-all duration-300 ${
              currentView === 'calendar' ? 'w-full max-w-4xl h-[80vh]' : 'w-full max-w-md'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                {currentView === 'calendar' && (
                  <button
                    onClick={() => setCurrentView('form')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                  </button>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentView === 'form' ? 'Book Your Demo' : 'Schedule Your Meeting'}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {currentView === 'form' 
                      ? 'Tell us about your AI needs' 
                      : `Thanks ${formData.firstName}! Pick a convenient time`
                    }
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className={currentView === 'calendar' ? 'h-[calc(80vh-100px)]' : ''}>
              {currentView === 'form' ? (
                /* Form View */
                <>
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="john@company.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors ${
                          errors.company ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your Company Inc."
                      />
                      {errors.company && (
                        <p className="text-red-500 text-xs mt-1">{errors.company}</p>
                      )}
                    </div>

                    {/* Requirements */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        What AI solutions are you looking for? *
                      </label>
                      <textarea
                        value={formData.requirements}
                        onChange={(e) => handleInputChange('requirements', e.target.value)}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors resize-none ${
                          errors.requirements ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Tell us about your automation needs, data challenges, or specific AI goals..."
                      />
                      {errors.requirements && (
                        <p className="text-red-500 text-xs mt-1">{errors.requirements}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Calendar className="w-5 h-5 mr-2" />
                          Continue to Calendar
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Footer */}
                  <div className="px-6 pb-6">
                    <p className="text-xs text-gray-500 text-center">
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </div>
                </>
              ) : (
                /* Calendar View */
                <div className="p-6 h-full flex flex-col">
                  <div className="flex-1">
                    <iframe
                      src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2W0z71aIRmOrNE4kEdk27EmvVeOwnnE4GuENwMOUJ9ALuAEOpmuoiKODg0QICPzfoKia-B-RX8?gv=true"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      className="rounded-lg"
                      title="Book an appointment"
                    />
                  </div>
                  
                  {/* Footer for calendar view */}
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Having trouble? You can also{' '}
                      <a 
                        href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2W0z71aIRmOrNE4kEdk27EmvVeOwnnE4GuENwMOUJ9ALuAEOpmuoiKODg0QICPzfoKia-B-RX8?gv=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700 underline"
                      >
                        open calendar in new tab
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}