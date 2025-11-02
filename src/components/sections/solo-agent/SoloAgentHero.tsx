'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Zap,
  ArrowRight,
  Home,
  Clock,
  Target,
  Sparkles,
  TrendingUp,
  CheckCircle,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'

const typewriterPhrases = [
  'Supercharge Your Solo Practice',
  'With AI Lead Generation',
  'And Automated Follow-Up',
  'Close More Deals Faster',
  'Work Smarter, Not Harder'
]

const soloStats = [
  {
    label: 'Deals Closed',
    value: 47,
    suffix: '/year',
    increment: 0.5,
    icon: Home,
    color: 'text-blue-600',
    description: '+78% vs industry avg'
  },
  {
    label: 'Time Saved',
    value: 25,
    suffix: ' hrs/week',
    increment: 0.2,
    icon: Clock,
    color: 'text-green-600',
    description: 'More time for clients'
  },
  {
    label: 'Lead Response',
    value: 3,
    suffix: ' minutes',
    increment: 0.1,
    icon: Zap,
    color: 'text-purple-600',
    description: '95% faster response'
  },
  {
    label: 'Commission Growth',
    value: 240,
    suffix: '%',
    increment: 2,
    icon: TrendingUp,
    color: 'text-orange-600',
    description: 'Average increase'
  }
]

const benefits = [
  { icon: Zap, text: '3-Minute Lead Response' },
  { icon: BarChart3, text: 'Real-Time Performance Analytics' },
  { icon: Target, text: 'AI Lead Qualification' },
]

export function SoloAgentHero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(soloStats.map(stat => ({ ...stat, currentValue: 0 })))
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleLeadFormSubmit = (formData: LeadFormData) => {
    console.log('Solo agent demo request:', formData)
    setIsLeadModalOpen(false)
  }

  // Typewriter effect for rotating phrases
  useEffect(() => {
    const currentString = typewriterPhrases[currentPhrase]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 1000 : 3000

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentString) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false)
        setCurrentPhrase((prev) => (prev + 1) % typewriterPhrases.length)
      } else {
        setDisplayText(prev =>
          isDeleting
            ? prev.slice(0, -1)
            : prev + currentString.charAt(prev.length)
        )
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentPhrase])

  // Animate stats when in view
  useEffect(() => {
    if (!isInView) return

    const animationDuration = 2000
    const startTime = Date.now()

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / animationDuration, 1)

      setAnimatedStats(
        soloStats.map((stat) => ({
          ...stat,
          currentValue: stat.value * progress
        }))
      )

      if (progress === 1) {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-grid opacity-30" />

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
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
            className="inline-flex items-center space-x-2 bg-purple-600/20 text-purple-300 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-purple-500/30 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Real Estate Automation</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>

          {/* Main Headline with Typewriter Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <span className="text-gradient">
              {displayText}
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
            Compete with big teams. Automate repetitive tasks. Focus on building relationships and closing deals.
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
                  <IconComponent className="w-4 h-4 text-purple-600 dark:text-purple-400" />
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
            {animatedStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className={`w-6 h-6 ${stat.color} mr-2`} />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {Math.floor(stat.currentValue)}{stat.suffix}
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
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Deploy in Minutes
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Get started with pre-built agents and see results immediately
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-purple transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Enterprise Ready
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Bank-grade security with SOC 2 compliance and data protection
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-purple transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Measurable ROI
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Track performance and see up to 240% ROI in the first quarter
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
