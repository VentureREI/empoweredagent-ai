'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Clock, TrendingUp } from 'lucide-react'

const approachItems = [
  {
    icon: Shield,
    title: 'Data Security First',
    description: 'Privacy of your data is our first priority. We implement enterprise-grade security protocols and ensure full compliance with data protection regulations.',
    stats: '100% Secure'
  },
  {
    icon: Award,
    title: 'A+ Talent with AI Experience',
    description: 'We hire and maintain top-tier talent with years of AI experience. Our team includes PhD scientists, ML engineers, and AI product specialists.',
    stats: '90%+ Retention Rate'
  },
  {
    icon: Clock,
    title: 'Rapid Implementation',
    description: 'Our proven methodology allows for quick deployment without sacrificing quality. Most projects go live within 30 days of kickoff.',
    stats: '30-Day Average'
  },
  {
    icon: TrendingUp,
    title: 'Measurable ROI',
    description: 'Every solution we deploy is designed to deliver quantifiable business value. We track metrics and ensure positive return on investment.',
    stats: '300% Avg ROI'
  }
]

export function ApproachSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nobody Gets Fired Choosing{' '}
            <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
              EmpoweredAgent.ai
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our approach combines technical excellence with business acumen to deliver AI solutions that actually work in the real world.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Approach Items */}
          <div className="space-y-8">
            {approachItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <span className="text-sm font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded">
                        {item.stats}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why Choose Our Process?</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <span>Technical Excellence - cutting edge AI technology</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <span>Business Focus - solutions that drive real results</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <span>Proven Track Record - 150+ successful projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <span>Long-term Partnership - we're here for the journey</span>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-purple-700/50 rounded-lg">
                <blockquote className="italic text-purple-100">
                  "Commitment from engineers to meet development deadlines and work after hours as necessary to drive project to completion."
                </blockquote>
                <cite className="text-sm text-purple-300 mt-2 block">- Enterprise Client Feedback</cite>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}