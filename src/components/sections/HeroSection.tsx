'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Play, Sparkles, Zap, Shield, BarChart3, Workflow, Bot, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoModal } from '@/components/ui/VideoModal'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  { icon: Workflow, text: 'Instant Lead Follow-Up' },
  { icon: BarChart3, text: 'Smarter CRM & Funnels' },
  { icon: Zap, text: 'Done-For-You Automations' },
  { icon: Shield, text: 'Secure & Reliable Systems' },
]

const stats = [
  { value: '2,500+', label: 'Professionals Supported' },
  { value: '10,000+', label: 'Tasks Automated Daily' },
  { value: '300%', label: 'Increase In Productivity' },
  { value: '24/7', label: 'AI Support' },
]

const trustedCompanies = [
  { name: 'Keller Williams', logo: '/logos/techcorp.svg' },
  { name: 'Re/Max', logo: '/logos/dataflow.svg' },
  { name: 'HomeSmart', logo: '/logos/autosys.svg' },
  { name: 'Real', logo: '/logos/cloudbase.svg' },
  { name: 'EXP', logo: '/logos/innovateai.svg' },
  { name: 'My Home Group', logo: '/logos/futurework.svg' },
]

export function HeroSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [typedText, setTypedText] = useState('')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const fullText = 'Your One-Stop Partner for AI & Business Automation'

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

  const handleLeadFormSubmit = (formData: LeadFormData) => {
    console.log('Lead form submitted:', formData)
    // The modal handles the calendar view internally
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
            <span>New: Enterprise AI Agents Now Available</span>
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
            From lead generation to client follow-up, Empowered Agent builds smart automations that save you time, grow your pipeline, and keep your business running on autopilot. 
            <span className="text-purple-400 font-semibold"> Built for professionals who want results, not busywork.</span>
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-white dark:bg-dark-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-purple transition-all duration-300 hover:scale-105"
                >
                  <IconComponent className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {feature.text}
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
              <Bot className="w-5 h-5 mr-2" />
              <span>Schedule Your Intro Call</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-purple"
              onClick={() => setIsLeadModalOpen(true)}
            >
              <Bot className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
            
            <Link href="/agents">
              <Button
                variant="ghost"
                size="lg"
                className="text-lg px-8 py-4 border border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900"
              >
                <Bot className="w-5 h-5 mr-2" />
                See Our Bot Demo
              </Button>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Trusted By Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center"
          >
            <p className="text-sm text-white mb-8 font-medium">
              Trusted thousands forward-thinking real estate professionals
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-80 transition-opacity">
              {trustedCompanies.map((company, index) => (
                <div
                  key={index}
                  className="h-8 w-24 bg-white rounded flex items-center justify-center text-xs font-semibold text-black"
                >
                  {company.name}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Value Propositions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center p-6 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-purple transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Deploy in Minutes
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Get started with pre-built AI agents and see results immediately
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-purple transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Enterprise Ready
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Bank-grade security with SOC 2 compliance and data protection
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-purple transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Measurable ROI
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Track performance and see up to 300% ROI in the first quarter
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual video
        title="EmpoweredAgent.ai Demo"
      />

      {/* Lead Form Modal */}
      <LeadFormModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onSubmit={handleLeadFormSubmit}
      />
    </section>
  )
}