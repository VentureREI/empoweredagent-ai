'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Mail, 
  CheckCircle,
  ArrowRight,
  AlertCircle,
  TrendingUp,
  Users,
  Zap,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface NewsletterFormData {
  email: string
  firstName: string
  businessType: string
}

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

const businessTypes = [
  'Real Estate Agent',
  'Real Estate Team', 
  'Brokerage Owner',
  'Small Business Owner',
  'Consultant',
  'Other'
]

const benefits = [
  {
    icon: TrendingUp,
    title: 'Automation Insights',
    description: 'Weekly tips on streamlining workflows and capturing more leads'
  },
  {
    icon: Users,
    title: 'Success Stories',
    description: 'Real case studies from agents and businesses like yours'
  },
  {
    icon: Zap,
    title: 'Early Access',
    description: 'Be first to try new tools and get exclusive automation strategies'
  },
  {
    icon: Target,
    title: 'ROI Tips',
    description: 'Proven tactics to measure and maximize your automation ROI'
  }
]

export function NewsletterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const [formData, setFormData] = useState<NewsletterFormData>({
    email: '',
    firstName: '',
    businessType: ''
  })
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.firstName) {
      setFormState({
        status: 'error',
        message: 'Please fill in all required fields.'
      })
      return
    }

    setFormState({ status: 'loading', message: '' })

    try {
      // Simulate API call - replace with actual newsletter service
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setFormState({
        status: 'success',
        message: 'Welcome to the EmpoweredAgent community! Check your email for exclusive automation tips.'
      })
      
      // Reset form
      setFormData({ email: '', firstName: '', businessType: '' })
    } catch (error) {
      setFormState({
        status: 'error',
        message: 'Something went wrong. Please try again later.'
      })
    }
  }

  const isLoading = formState.status === 'loading'
  const isSuccess = formState.status === 'success'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-primary-100 dark:bg-primary-900 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-accent-100 dark:bg-accent-900 rounded-full blur-3xl opacity-20" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Stay Ahead of <span className="text-gradient">the Curve</span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals getting insider tips on automation, AI trends, 
              and success stories delivered weekly.
            </p>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-dark-800 rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-200 dark:border-gray-700 mb-16"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  You're In! Welcome to the Community
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                  {formState.message}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-dark-700 placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                      placeholder="Your first name"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-dark-700 placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        placeholder="your@email.com"
                        disabled={isLoading}
                      />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    What best describes your business? (Optional)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {businessTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, businessType: type }))}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                          formData.businessType === type
                            ? 'bg-primary-600 text-white border-primary-600'
                            : 'bg-gray-50 dark:bg-dark-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                        }`}
                        disabled={isLoading}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {formState.status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4"
                  >
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {formState.message}
                  </motion.div>
                )}

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6">
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Join <span className="font-semibold text-gray-900 dark:text-white">2,500+</span> professionals already getting our insights
                    </p>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isLoading || !formData.email || !formData.firstName}
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Get Weekly Insights
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Privacy Notice */}
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                  By subscribing, you agree to our{' '}
                  <a href="/privacy" className="text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors">
                    Privacy Policy
                  </a>
                  . Unsubscribe at any time.
                </p>
              </form>
            )}
          </motion.div>

          {/* Benefits */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </motion.div>

          {/* Social Proof */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                No spam, ever
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Weekly delivery
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Unsubscribe anytime
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}