'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

// Match the API validation schema exactly
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  phone: z.string().optional(),
  subject: z.enum(['general', 'demo', 'partnership', 'support', 'other']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  interested_agents: z.array(z.string()).optional(),
  budget_range: z.enum(['under-10k', '10k-50k', '50k-100k', '100k-500k', 'over-500k', 'not-sure']).optional(),
  timeline: z.enum(['immediate', '1-3-months', '3-6-months', '6-12-months', 'exploring']).optional(),
  marketing_consent: z.boolean().optional()
})

type ContactFormData = z.infer<typeof contactFormSchema>

const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'demo', label: 'Request Demo' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'support', label: 'Technical Support' },
  { value: 'other', label: 'Other' }
]

const agentOptions = [
  'Workflow Agent',
  'Analytics Agent', 
  'Integration Agent',
  'Communication Agent',
  'Security Agent',
  'Productivity Agent'
]

const budgetOptions = [
  { value: 'under-10k', label: 'Under $10K' },
  { value: '10k-50k', label: '$10K - $50K' },
  { value: '50k-100k', label: '$50K - $100K' },
  { value: '100k-500k', label: '$100K - $500K' },
  { value: 'over-500k', label: 'Over $500K' },
  { value: 'not-sure', label: 'Not sure yet' }
]

const timelineOptions = [
  { value: 'immediate', label: 'Immediate (within 30 days)' },
  { value: '1-3-months', label: '1-3 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: '6-12-months', label: '6-12 months' },
  { value: 'exploring', label: 'Just exploring' }
]

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [apiErrors, setApiErrors] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setError,
    clearErrors
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      subject: 'general',
      interested_agents: [],
      marketing_consent: false
    }
  })

  const selectedSubject = watch('subject')

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      console.log('Modal opened, resetting form')
      reset()
      setIsSubmitted(false)
      setApiErrors([])
      clearErrors()
    }
  }, [isOpen, reset, clearErrors])

  const onSubmit = async (data: ContactFormData) => {
    console.log('🚀 FORM SUBMIT TRIGGERED!')
    
    try {
      setIsSubmitting(true)
      setApiErrors([])
      clearErrors()

      console.log('Form data being submitted:', data)

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('API Response status:', response.status)
      console.log('API Response ok:', response.ok)

      // Parse response as JSON
      let responseData
      try {
        responseData = await response.json()
        console.log('API Response data:', responseData)
      } catch (parseError) {
        console.error('❌ Failed to parse response as JSON:', parseError)
        throw new Error('Invalid response from server')
      }

      if (response.ok && responseData.success) {
        console.log('✅ Form submission successful!')
        setIsSubmitted(true)
        toast.success(responseData.message || 'Message sent successfully! We\'ll get back to you soon.')
        
        // Close modal after 3 seconds
        setTimeout(() => {
          onClose()
          setIsSubmitted(false)
        }, 3000)
      } else {
        console.log('❌ Form submission failed:', responseData)
        
        // Handle validation errors
        if (responseData.errors && Array.isArray(responseData.errors)) {
          responseData.errors.forEach((error: any) => {
            if (error.field && error.message) {
              setError(error.field as keyof ContactFormData, {
                type: 'server',
                message: error.message
              })
            }
          })
        }

        // Show general error message
        const errorMessage = responseData.message || 'Failed to send message. Please try again.'
        setApiErrors([errorMessage])
        toast.error(errorMessage)
      }
    } catch (error) {
      console.error('❌ Exception during form submission:', error)
      const errorMessage = error instanceof Error ? error.message : 'Network error. Please check your connection and try again.'
      setApiErrors([errorMessage])
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card className="bg-white dark:bg-gray-900 shadow-2xl">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isSubmitted ? 'Thank You!' : 'Get in Touch'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Success State */}
            {isSubmitted ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thank you for your message. Our team will review your inquiry and get back to you within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* API Errors */}
                {apiErrors.length > 0 && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                      <AlertCircle size={16} />
                      <span className="font-medium">Please fix the following errors:</span>
                    </div>
                    <ul className="mt-2 list-disc list-inside text-sm text-red-700 dark:text-red-300">
                      {apiErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('name')}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="your.email@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Company Name *
                    </label>
                    <input
                      {...register('company')}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Your company name"
                    />
                    {errors.company && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Phone Number
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    {...register('subject')}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    {subjectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-vertical"
                    placeholder="Please describe your inquiry in detail... (minimum 10 characters)"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Optional: Interested Agents */}
                {(selectedSubject === 'demo' || selectedSubject === 'general') && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Interested AI Agents (Optional)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {agentOptions.map((agent) => (
                        <label key={agent} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={agent}
                            {...register('interested_agents')}
                            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{agent}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Marketing Consent */}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    {...register('marketing_consent')}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 mt-0.5"
                  />
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to receive marketing communications from EmpoweredAgent.ai. You can unsubscribe at any time.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {!isSubmitting && <Send size={16} className="mr-2" />}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ContactModal