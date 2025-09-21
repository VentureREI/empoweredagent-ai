'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Star, TrendingUp, Users } from 'lucide-react'

const methodologyHighlights = [
  {
    title: 'Proven Track Record',
    description: '150+ successful AI implementations across various industries',
    icon: TrendingUp,
    stats: '150+ Projects'
  },
  {
    title: 'Expert Team',
    description: '70+ AI specialists, data scientists, and machine learning engineers',
    icon: Users,
    stats: '70+ Experts'
  },
  {
    title: 'Years of Experience',
    description: '14 years of combined experience in AI, ML, and data science',
    icon: Star,
    stats: '14 Years'
  },
  {
    title: 'Client Satisfaction',
    description: '98% client satisfaction rate with ongoing partnerships',
    icon: CheckCircle,
    stats: '98% Satisfaction'
  }
]

export function MethodologySection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Our Methodology in{' '}
            <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
              Numbers
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            The data speaks for itself - our systematic approach delivers consistent results
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {methodologyHighlights.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">{item.stats}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg text-center"
        >
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-xl lg:text-2xl text-gray-700 italic mb-8">
              "The founding staff is a treasure trove of insight, and everyone is incredibly strong at implementation. 
              EmpoweredAgent.ai delivered our machine learning model that predicts market trends with 85% accuracy."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Enterprise Client</div>
                <div className="text-sm text-gray-600">Fortune 500 Company</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}