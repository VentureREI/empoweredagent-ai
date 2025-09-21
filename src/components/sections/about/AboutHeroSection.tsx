
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, Target, Users, Zap } from 'lucide-react'

const stats = [
  { value: '2023', label: 'Founded' },
  { value: '2,500+', label: 'Customers' },
  { value: '50+', label: 'Team Members' },
  { value: '$15M', label: 'Series A' }
]

export function HeroSection() {
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-dark-950 dark:via-dark-900 dark:to-dark-800"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-grid opacity-30" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full blur-xl animate-float opacity-60" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent-200 dark:bg-accent-800 rounded-full blur-2xl animate-float opacity-40" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-primary-300 dark:bg-primary-700 rounded-full blur-xl animate-float opacity-50" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-6 py-3 rounded-full text-sm font-medium border border-primary-200 dark:border-primary-800">
              <Sparkles className="w-4 h-4" />
              <span>About EmpoweredAgent.ai</span>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text */}
            <div>
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
              >
                We're <span className="text-gradient">Empowering</span> the Future of Work
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              >
                At EmpoweredAgent.ai, we believe every business deserves access to intelligent automation. 
                We're democratizing AI to help companies of all sizes work smarter, not harder.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-6"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Visual Elements */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Mission Card */}
                <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Our Mission
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Democratize AI automation for businesses worldwide
                  </p>
                </div>

                {/* Team Card */}
                <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 mt-8">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Our Team
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    50+ AI experts from top tech companies
                  </p>
                </div>

                {/* Innovation Card */}
                <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 -mt-8">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Innovation
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Cutting-edge AI research and development
                  </p>
                </div>

                {/* Results Card */}
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-6 rounded-2xl text-white">
                  <div className="text-3xl font-bold mb-2">10M+</div>
                  <div className="text-primary-100 text-sm">
                    Tasks automated monthly across our platform
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 rounded-full opacity-50 blur-xl animate-pulse" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-accent-100 to-primary-100 dark:from-accent-900 dark:to-primary-900 rounded-full opacity-30 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}