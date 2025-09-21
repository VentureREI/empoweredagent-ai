'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, Users, Zap } from 'lucide-react'

export function ProcessHeroSection() {
  const highlights = [
    { icon: CheckCircle, text: '98% Success Rate' },
    { icon: Clock, text: '30-Day Deployment' },
    { icon: Users, text: 'Expert AI Team' },
    { icon: Zap, text: 'Proven ROI' }
  ]

  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-purple-500/10 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 bg-purple-600/30 rounded-full text-purple-200 text-sm font-medium">
              <Zap className="w-4 h-4 mr-2" />
              Our Proven Methodology
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold mb-6"
          >
            How We Deploy{' '}
            <span className="bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent">
              AI Solutions
            </span>{' '}
            That CEOs Brag About
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl lg:text-2xl text-purple-200 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            We're an AI agency that deploys intelligent automation solutions by employing top data scientists 
            and AI engineers to produce products with measurable ROI. We've created an AI playbook that works for your business.
          </motion.p>

          {/* Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <Icon className="w-6 h-6 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm font-medium text-white">{item.text}</p>
                </div>
              )
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#our-process"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-900 font-semibold rounded-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg"
            >
              See Our Process
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/demo"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-900 transition-all"
            >
              Book Strategy Call
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}