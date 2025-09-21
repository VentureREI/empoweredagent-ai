'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Zap,
  ArrowRight,
  Play,
  Clock,
  TrendingUp,
  Shield,
  Bot,
  Workflow,
  CheckCircle,
  Calendar,
  MessageSquare,
  FileText,
  BarChart3,
  Users,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const typewriterPhrases = [
  'Automate Your Lead Follow-Up in 2 Minutes',
  'Convert More Prospects While You Sleep',
  'Streamline Listings From MLS to Marketing',
  'Transform Client Communication Forever',
  'Scale Your Business Without Scaling Hours'
]

const metrics = [
  { value: '15+', label: 'Hours Saved Weekly', icon: Clock },
  { value: '300%', label: 'Lead Response Speed', icon: TrendingUp },
  { value: '85%', label: 'Task Automation Rate', icon: Zap },
  { value: '24/7', label: 'Always Working', icon: Shield }
]

const automationPreviews = [
  {
    title: 'Lead Capture & Nurture',
    description: 'Automatically capture leads and start personalized follow-up sequences',
    icon: Target,
    color: 'from-blue-500 to-blue-600',
    delay: 0
  },
  {
    title: 'Client Communication',
    description: 'Send updates, reminders, and market reports on autopilot',
    icon: MessageSquare,
    color: 'from-green-500 to-green-600',
    delay: 200
  },
  {
    title: 'Listing Management',
    description: 'Sync listings across platforms and automate marketing campaigns',
    icon: FileText,
    color: 'from-purple-500 to-purple-600',
    delay: 400
  },
  {
    title: 'Transaction Tracking',
    description: 'Monitor deals, deadlines, and documents automatically',
    icon: BarChart3,
    color: 'from-orange-500 to-orange-600',
    delay: 600
  }
]

export function WorkflowHero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    const phrase = typewriterPhrases[currentPhrase]
    let currentIndex = 0

    if (isTyping) {
      const typingInterval = setInterval(() => {
        if (currentIndex <= phrase.length) {
          setDisplayText(phrase.slice(0, currentIndex))
          currentIndex++
        } else {
          setIsTyping(false)
          setTimeout(() => {
            setIsTyping(true)
            setCurrentPhrase((prev) => (prev + 1) % typewriterPhrases.length)
          }, 2000)
          clearInterval(typingInterval)
        }
      }, 100)

      return () => clearInterval(typingInterval)
    }
  }, [currentPhrase, isTyping])

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

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-br from-white via-purple-50 to-primary-50 dark:from-dark-900 dark:via-purple-900/20 dark:to-primary-900/20 overflow-hidden flex items-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-gradient-to-r from-primary-200 to-purple-200 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-gradient-to-r from-blue-200 to-primary-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-semibold mb-6 border border-primary-200 dark:border-primary-800"
            >
              <Workflow className="w-4 h-4 mr-2" />
              Real Estate Workflow Automation
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
            >
              <span className="text-gradient">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Transform your real estate business with intelligent automation that handles repetitive tasks,
              nurtures leads, and manages client relationships while you focus on closing deals.
            </motion.p>

            {/* Metrics Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {metrics.map((metric, index) => {
                const IconComponent = metric.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {metric.label}
                    </div>
                  </div>
                )
              })}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="xl" className="group">
                <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Build My Workflow
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="secondary" size="xl" className="group">
                <Play className="w-5 h-5 mr-2" />
                See Workflows in Action
              </Button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm text-gray-500 dark:text-gray-400 mt-4"
            >
              <CheckCircle className="w-4 h-4 inline-block mr-1 text-green-500" />
              Setup in 24 hours • No coding required • Real estate focused
            </motion.p>
          </motion.div>

          {/* Right Content - Automation Preview Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {automationPreviews.map((preview, index) => {
                const IconComponent = preview.icon
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative group"
                    style={{ animationDelay: `${preview.delay}ms` }}
                  >
                    <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-dark-800 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                      <div className={`w-12 h-12 bg-gradient-to-br ${preview.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {preview.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {preview.description}
                      </p>
                    </div>

                    {/* Connecting Lines for Flow Effect */}
                    {index < automationPreviews.length - 1 && (
                      <div className="hidden sm:block absolute top-1/2 -right-3 w-6 h-6">
                        <div className="w-full h-0.5 bg-gradient-to-r from-primary-300 to-purple-300 animate-pulse" />
                        <ArrowRight className="w-4 h-4 text-primary-400 absolute -top-2 -right-1" />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Floating Workflow Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '2s' }}>
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}