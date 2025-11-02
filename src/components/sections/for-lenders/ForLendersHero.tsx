'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Zap,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  Sparkles,
  BarChart3,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'

const typewriterPhrases = [
  'Your AI-Powered Lending Operations Assistant',
  'Automate Loan Processing & Approvals',
  'Scale Your Lending Business Instantly',
  'Close Loans Faster with AI Verification',
  'Transform Lending Operations'
]

const lenderStats = [
  {
    label: 'Loans Processed',
    value: 340,
    suffix: '/month',
    increment: 2,
    icon: DollarSign,
    color: 'text-green-600',
    description: '+156% vs manual processing'
  },
  {
    label: 'Time Saved',
    value: 45,
    suffix: ' hrs/week',
    increment: 0.3,
    icon: Clock,
    color: 'text-blue-600',
    description: 'Focus on relationships'
  },
  {
    label: 'Approval Rate',
    value: 94,
    suffix: '%',
    increment: 0.4,
    icon: CheckCircle,
    color: 'text-purple-600',
    description: 'Faster decisioning'
  },
  {
    label: 'Revenue Increase',
    value: 245,
    suffix: '%',
    increment: 1.2,
    icon: TrendingUp,
    color: 'text-amber-600',
    description: 'First year ROI'
  }
]

const benefits = [
  { icon: Zap, text: 'Instant Loan Processing' },
  { icon: BarChart3, text: 'Real-Time Analytics' },
  { icon: Target, text: 'Smart Risk Assessment' },
]

export function ForLendersHero() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [displayedStats, setDisplayedStats] = useState(lenderStats.map(stat => ({ ...stat, currentValue: 0 })))
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const fullText = typewriterPhrases[0]

  useEffect(() => {
    if (isInView) {
      let i = 0
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.slice(0, i + 1))
          i++
        } else {
          clearInterval(timer)
        }
      }, 50)

      return () => clearInterval(timer)
    }
  }, [isInView, fullText])

  // Animate stats
  useEffect(() => {
    if (!isInView) return

    const animationDuration = 2000
    const startTime = Date.now()

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / animationDuration, 1)

      setDisplayedStats(
        lenderStats.map((stat) => ({
          ...stat,
          currentValue: Math.floor(stat.value * progress)
        }))
      )

      if (progress === 1) {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [isInView])

  const handleLeadFormSubmit = (formData: LeadFormData) => {
    console.log('Lead form submitted:', formData)
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-grid opacity-30" />

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-6xl mx-auto">
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-green-600/20 text-green-300 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-green-500/30 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>New: AI-Powered Lending Automation</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <span className="text-gradient">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Transform your lending operations with intelligent automation. Process loans faster, approve more confidently, and grow your business exponentially.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-white dark:bg-dark-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-purple transition-all duration-300 hover:scale-105"
                >
                  <IconComponent className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {benefit.text}
                  </span>
                </div>
              )
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="text-lg px-8 py-4 shadow-lg hover:shadow-purple"
              onClick={() => setIsLeadModalOpen(true)}
            >
              <Zap className="w-5 h-5 mr-2" />
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="text-lg px-8 py-4 border border-white/20 hover:bg-white/10 text-white"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {displayedStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className={`w-6 h-6 ${stat.color} mr-2`} />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {stat.currentValue}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400 font-medium mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.description}
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* Value Propositions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center p-6 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-purple transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Instant Deployment
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Get your lending AI live in minutes with pre-built loan processing workflows
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-purple transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Full Compliance
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Bank-grade security with regulatory compliance and complete audit trails
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-purple transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Rapid ROI
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                See up to 245% ROI in your first year with instant loan processing automation
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lead Form Modal */}
      <LeadFormModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onSubmit={handleLeadFormSubmit}
      />
    </section>
  )
}
