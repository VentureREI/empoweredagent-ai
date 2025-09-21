'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Play, Bot, Sparkles, Zap, Brain, Code, Workflow } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'

const typewriterPhrases = [
  'Build AI Agents That Think Like Top Producers',
  'Create Smart Solutions That Scale Your Business',
  'Develop Custom AI That Understands Real Estate',
  'Transform Your Practice Into a Lead Machine'
]

const featureHighlights = [
  { icon: Brain, text: 'Real Estate AI Expertise', color: 'from-blue-500 to-primary-600' },
  { icon: Code, text: 'MLS & CRM Integration', color: 'from-purple-500 to-primary-600' },
  { icon: Workflow, text: 'Transaction Automation', color: 'from-green-500 to-primary-600' },
  { icon: Zap, text: 'Lead-to-Close Pipeline', color: 'from-orange-500 to-primary-600' }
]

const stats = [
  { value: '500+', label: 'Real Estate Agents Served' },
  { value: '95%', label: 'Lead Conversion Increase' },
  { value: '2-4 Weeks', label: 'Agent Deployment Time' },
  { value: '10x', label: 'More Closings Per Month' }
]

export function CustomAgentsHero() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Typewriter effect
  useEffect(() => {
    if (!isInView) return

    const currentPhrase = typewriterPhrases[currentPhraseIndex]

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentPhrase.length) {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timer)
  }, [displayedText, isDeleting, currentPhraseIndex, isInView])

  const handleModalSubmit = (formData: LeadFormData) => {
    console.log('Lead form submitted:', formData)
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-dark-950 dark:via-dark-900 dark:to-dark-800"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 hero-grid opacity-30" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-4 h-4 bg-primary-400 rounded-full blur-sm opacity-60"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute top-40 right-20 w-6 h-6 bg-accent-400 rounded-full blur-sm opacity-40"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute bottom-40 left-20 w-3 h-3 bg-primary-500 rounded-full blur-sm opacity-50"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '3s' }}
          className="absolute bottom-20 right-10 w-5 h-5 bg-accent-500 rounded-full blur-sm opacity-60"
        />
      </div>

      {/* Large Background Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-200 dark:bg-primary-800 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200 dark:bg-accent-800 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Announcement Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 text-primary-800 dark:text-primary-200 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-primary-200 dark:border-primary-800"
          >
            <Sparkles className="w-4 h-4" />
            <span>✨ New: Advanced Real Estate AI Agents Now Available</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>

          {/* Typewriter Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight min-h-[200px] sm:min-h-[240px] lg:min-h-[280px] flex items-center justify-center"
          >
            <span className="text-gradient">
              {displayedText}
              <span className="animate-pulse text-primary-600">|</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            From lead generation to closing, we build intelligent AI agents that understand real estate workflows,
            integrate with your MLS and CRM, and deliver more closings from day one.
          </motion.p>

          {/* Feature Highlights */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {featureHighlights.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center space-x-3 bg-white dark:bg-dark-800 px-6 py-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-purple transition-all duration-300"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {feature.text}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="text-lg px-8 py-4 shadow-lg hover:shadow-purple transform hover:scale-105 transition-all duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              <Bot className="w-5 h-5 mr-2" />
              <span>Start Building Your Real Estate AI</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-2 border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900"
              onClick={() => {
                // Scroll to showcase section
                document.getElementById('agent-showcase')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <Play className="w-5 h-5 mr-2" />
              View Real Estate Agents
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-purple transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
              Trusted by top-producing real estate agents and brokerages nationwide
            </p>

            {/* Mock Company Logos */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-80 transition-opacity">
              {['Keller Williams', 'RE/MAX', 'Coldwell Banker', 'Century 21', 'Compass', 'eXp Realty'].map((company, index) => (
                <div
                  key={index}
                  className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-400"
                >
                  {company}
                </div>
              ))}
            </div>
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