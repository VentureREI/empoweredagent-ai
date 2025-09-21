'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

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

export function ContactFormSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      subject: 'general',
      interested_agents: [],
      marketing_consent: true
    }
  })

  const selectedSubject = watch('subject')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('contact-form')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSubmitted(true)
        toast.success('Message sent successfully! We\'ll get back to you soon.')
        reset()
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
      console.error('Contact form error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="contact-form" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-white dark:bg-gray-900 shadow-xl">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Thank You!
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Your message has been sent successfully. Our team will review your inquiry and get back to you within 24 hours.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-200">
                  <strong>What happens next?</strong><br />
                  1. We'll review your inquiry<br />
                  2. Match you with the right expert<br />
                  3. Reach out to schedule a call or demo
                </div>
              </div>
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="secondary"
                size="lg"
              >
                Send Another Message
              </Button>
            </div>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="contact-form" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={cn(
          'text-center mb-12 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tell us about your needs and we'll connect you with the right AI expert to help transform your business.
          </p>
        </div>

        {/* Form */}
        <Card className={cn(
          'bg-white dark:bg-gray-900 shadow-xl transition-all duration-1000 delay-200',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
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

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Company *
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
            </div>

            {/* Conditional fields based on subject */}
            {(selectedSubject === 'demo' || selectedSubject === 'general') && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Interested AI Agents
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {agentOptions.map((agent) => (
                      <label key={agent} className="flex items-center space-x-2 text-sm">
                        <input
                          {...register('interested_agents')}
                          type="checkbox"
                          value={agent}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{agent}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Budget Range
                    </label>
                    <select
                      {...register('budget_range')}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select budget range</option>
                      {budgetOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Timeline
                    </label>
                    <select
                      {...register('timeline')}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Message *
              </label>
              <textarea
                {...register('message')}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                placeholder="Tell us about your project, goals, or questions..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Marketing consent */}
            <div className="flex items-start space-x-3">
              <input
                {...register('marketing_consent')}
                type="checkbox"
                className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label className="text-sm text-gray-600 dark:text-gray-400">
                I agree to receive marketing communications from EmpoweredAgent.ai. You can unsubscribe at any time.
                <br />
                <span className="text-xs">
                  By submitting this form, you agree to our{' '}
                  <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a> and{' '}
                  <a href="/terms" className="text-primary-600 hover:underline">Terms of Service</a>.
                </span>
              </label>
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
                {!isSubmitting && <Send size={20} className="ml-2" />}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  )
}