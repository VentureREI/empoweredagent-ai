'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Search, Settings, Rocket, CheckCircle, Clock, Users, Zap, Target } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'
import { ContactModal } from '@/components/modals/ContactModal'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discover & Analyze',
    subtitle: 'We understand your business',
    description: 'We map your workflows, uncover opportunities, and design your automation plan tailored to your real estate or business needs.',
    features: [
      'Workflow mapping & opportunity assessment',
      'Custom automation strategy development', 
      'CRM and tool integration planning',
      'ROI projections & implementation timeline'
    ],
    timeline: '1-2 weeks',
    color: 'from-blue-500 to-primary-600'
  },
  {
    number: '02',
    icon: Settings,
    title: 'Configure & Deploy',
    subtitle: 'Automations built for you',
    description: 'We build and integrate automations that fit your business, CRM, and tools — no technical expertise required on your end.',
    features: [
      'Custom automation development',
      'CRM & business tool integrations',
      'Lead follow-up & nurture sequences',
      'Team training & handover support'
    ],
    timeline: '2-4 weeks',
    color: 'from-primary-500 to-purple-600'
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Optimize & Scale',
    subtitle: 'Growth on autopilot',
    description: 'We monitor results, fine-tune workflows, and scale as your business grows with ongoing optimization and support.',
    features: [
      'Performance monitoring & analytics',
      'Continuous workflow optimization',
      'Scaling automations with growth',
      '24/7 support & maintenance'
    ],
    timeline: 'Ongoing',
    color: 'from-green-500 to-primary-600'
  }
]

const benefits = [
  {
    icon: Clock,
    title: 'Fast Implementation',
    description: 'Live within 30 days, with some seeing results in just days'
  },
  {
    icon: Users,
    title: 'Hands-On Support',
    description: 'Dedicated experts guide you through every step'
  },
  {
    icon: Zap,
    title: 'Immediate ROI',
    description: 'See measurable results from day one of deployment'
  },
  {
    icon: Target,
    title: 'Guaranteed Results',
    description: 'We ensure your automations deliver measurable value'
  }
]

export function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  // Modal state management
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const handleLeadFormSubmit = (formData: LeadFormData) => {
    console.log('Lead form submitted:', formData)
    // The modal handles the calendar view internally
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  }

  return (
    <>
      <section ref={ref} className="py-24 bg-white dark:bg-dark-950 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-24 w-96 h-96 bg-primary-100 dark:bg-primary-900 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-accent-100 dark:bg-accent-900 rounded-full blur-3xl opacity-20" />
          
          {/* Connection Lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="hidden lg:block w-full max-w-4xl">
              <svg className="w-full h-4" viewBox="0 0 800 20" fill="none">
                <path
                  d="M0 10 L800 10"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#7c3aed" stopOpacity="1" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Your Journey to <span className="text-gradient">Automated Growth</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Our streamlined 3-step process makes it easy to unlock the power of AI and automation — without the overwhelm.
            </motion.p>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20"
          >
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <motion.div
                  key={index}
                  variants={stepVariants}
                  className="relative"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8 text-6xl font-bold text-primary-100 dark:text-primary-900 z-0">
                    {step.number}
                  </div>

                  {/* Card */}
                  <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 relative z-10 group">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 font-semibold mb-4">
                        {step.subtitle}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {step.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Timeline */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Timeline:</span>
                      <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                        {step.timeline}
                      </span>
                    </div>

                    {/* Arrow for desktop */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                        <ArrowRight className="w-8 h-8 text-primary-400 animate-pulse" />
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 rounded-3xl p-12 border border-primary-200 dark:border-primary-800 mb-16"
          >
            <motion.h3
              variants={itemVariants}
              className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
            >
              Why Our Process Works
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="text-center group"
                  >
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {benefit.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={itemVariants}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-12 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-hero-pattern opacity-10" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">
                  Ready to Automate Your Business?
                </h3>
                <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                  Book a free strategy session and discover how EmpoweredAgent can streamline your work, 
                  capture more leads, and save you hours every week.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setIsLeadModalOpen(true)}
                    className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Book Strategy Session
                  </button>
                  
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="text-white border-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold border-2 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Contact Our Team
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
                
                <p className="text-sm text-primary-200 mt-6">
                  ⚡ Free 30-minute session • 🎯 Custom automation plan • 💡 No obligations
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lead Form Modal */}
      <LeadFormModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onSubmit={handleLeadFormSubmit}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  )
}