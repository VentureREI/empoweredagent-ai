'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Filter, Star, TrendingUp, Users, Zap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const stats = [
  { value: '150+', label: 'Ready-to-Deploy Agents' },
  { value: '12', label: 'Industry Categories' },
  { value: '95%', label: 'Success Rate' },
  { value: '2-4 days', label: 'Average Setup Time' }
]

const highlights = [
  {
    icon: Star,
    text: 'Battle-tested in production',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: TrendingUp,
    text: 'Proven ROI track record',
    color: 'from-green-500 to-primary-600'
  },
  {
    icon: Users,
    text: 'Used by 500+ companies',
    color: 'from-blue-500 to-primary-600'
  },
  {
    icon: Zap,
    text: 'Quick deployment ready',
    color: 'from-purple-500 to-primary-600'
  }
]

export function AgentGalleryHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-dark-950 dark:via-dark-900 dark:to-dark-800"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 hero-grid opacity-30" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200 dark:bg-primary-800 rounded-full blur-2xl opacity-40 animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent-200 dark:bg-accent-800 rounded-full blur-xl opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary-300 dark:bg-primary-700 rounded-full blur-3xl opacity-30" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            <span className="text-gradient">AI Agent Showcase</span>
            <br />
            Ready-to-Deploy Solutions
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Explore our comprehensive library of proven AI agents. Find the perfect starting point for your automation journey
            or deploy immediately with minimal customization.
          </motion.p>

          {/* Feature Highlights */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center space-x-3 bg-white dark:bg-dark-800 px-6 py-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-purple transition-all duration-300"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${highlight.color} flex items-center justify-center`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {highlight.text}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Quick Search */}
          <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents by name, industry, or use case..."
                className="w-full pl-12 pr-12 py-4 bg-white dark:bg-dark-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 dark:text-white text-lg"
              />
              <Button
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
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

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="text-lg px-8 py-4 shadow-lg hover:shadow-purple transform hover:scale-105 transition-all duration-300"
              onClick={() => {
                // Scroll to filter section
                document.getElementById('agent-filter')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Browse All Agents
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-2 border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900"
            >
              Request Custom Agent
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}