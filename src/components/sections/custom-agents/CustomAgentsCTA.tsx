'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Bot,
  ArrowRight,
  Calendar,
  MessageSquare,
  Star,
  CheckCircle,
  Sparkles,
  Zap,
  Users,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'

const guarantees = [
  {
    icon: CheckCircle,
    title: '30-Day Money Back Guarantee',
    description: 'Not satisfied? Get a full refund within 30 days.'
  },
  {
    icon: Star,
    title: '99.9% Uptime SLA',
    description: 'Enterprise-grade reliability you can count on.'
  },
  {
    icon: Users,
    title: 'Dedicated Support Team',
    description: '24/7 support from AI specialists who know your agent.'
  },
  {
    icon: TrendingUp,
    title: 'Performance Guarantee',
    description: 'We guarantee measurable ROI within 90 days.'
  }
]

const testimonialSnippets = [
  {
    quote: "Our custom AI agent pays for itself every month. ROI was immediate.",
    author: "Sarah Chen",
    company: "TechFlow Solutions",
    role: "Operations Director"
  },
  {
    quote: "EmpoweredAgent built exactly what we needed. Flawless execution.",
    author: "Michael Rodriguez",
    company: "DataCorp",
    role: "CTO"
  },
  {
    quote: "The process was smooth and the results exceeded our expectations.",
    author: "Emily Thompson",
    company: "GrowthLabs",
    role: "CEO"
  }
]

const urgencyFactors = [
  "🔥 Limited: Only 5 custom development slots available this month",
  "⚡ Fast Track: Book this week and get priority development",
  "🎯 Bonus: Free 3-month optimization package (worth $3,000)",
  "📞 Exclusive: 1-on-1 strategy session with our AI architect"
]

export function CustomAgentsCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleModalSubmit = (formData: LeadFormData) => {
    console.log('Lead form submitted:', formData)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-dark-800 dark:to-dark-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-100 dark:bg-primary-900 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent-100 dark:bg-accent-900 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Main CTA Section */}
          <div className="text-center mb-16">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 text-primary-800 dark:text-primary-200 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-primary-200 dark:border-primary-800"
            >
              <Sparkles className="w-4 h-4" />
              <span>✨ Transform Your Business with Custom AI</span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Ready to Build Your
              <br />
              <span className="text-gradient">Perfect AI Agent?</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Join hundreds of forward-thinking companies that have transformed their operations
              with custom AI agents. Your intelligent automation solution is just one conversation away.
            </motion.p>

            {/* Urgency Factors */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 mb-8 max-w-3xl mx-auto"
            >
              <div className="text-center mb-4">
                <span className="inline-flex items-center space-x-2 text-orange-800 dark:text-orange-200 font-semibold">
                  <Zap className="w-5 h-5" />
                  <span>Limited Time Offer</span>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {urgencyFactors.map((factor, index) => (
                  <div key={index} className="text-orange-700 dark:text-orange-300 text-center sm:text-left">
                    {factor}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Primary CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.div variants={pulseVariants} animate="animate">
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 shadow-2xl hover:shadow-purple transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Bot className="w-6 h-6 mr-3" />
                  <span>Start Building Now</span>
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </motion.div>

              <Button
                variant="outline"
                size="lg"
                className="text-xl px-12 py-6 border-2 border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900 transition-all duration-300"
                onClick={() => setIsModalOpen(true)}
              >
                <Calendar className="w-6 h-6 mr-3" />
                Schedule Discovery Call
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="text-center text-gray-500 dark:text-gray-400 text-sm"
            >
              <p className="mb-2">✅ No long-term contracts • ✅ 30-day money-back guarantee • ✅ SOC 2 compliant</p>
              <p>Trusted by 500+ companies worldwide</p>
            </motion.div>
          </div>

          {/* Guarantees Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {guarantees.map((guarantee, index) => {
              const IconComponent = guarantee.icon
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card variant="default" hover="glow" className="p-6 text-center h-full">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {guarantee.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {guarantee.description}
                    </p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-gray-50 to-white dark:from-dark-800 dark:to-dark-700 rounded-3xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                What Our Clients Say
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Real results from real businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonialSnippets.map((testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 mb-4">
              <MessageSquare className="w-5 h-5" />
              <span>Still have questions? We're here to help.</span>
            </div>
            <Button
              variant="ghost"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              Chat with our AI specialists
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Lead Form Modal */}
      <LeadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </section>
  )
}