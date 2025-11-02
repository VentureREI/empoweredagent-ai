'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, ArrowRight } from 'lucide-react'

const successStories = [
  {
    company: 'Metropolitan Bank',
    title: 'Loan Processing Time Reduced by 80%',
    description: 'Automated their entire loan application process, reducing time from 7 days to just 1.5 days.',
    metrics: [
      { label: 'Processing Speed', value: '80%', change: 'faster' },
      { label: 'Loan Volume', value: '+156%', change: 'increase' },
      { label: 'Cost Reduction', value: '-$450K', change: 'annually' }
    ],
    testimonial: '"This AI solution completely transformed our operations. We\'re closing loans 5x faster and our team can focus on relationship building."',
    author: 'Sarah Chen, VP Operations',
    rating: 5
  },
  {
    company: 'Crescent Mortgage',
    title: 'Approval Rates Increased to 94%',
    description: 'Implemented AI-powered risk assessment that improved their approval accuracy and reduced defaults.',
    metrics: [
      { label: 'Approval Rate', value: '94%', change: 'accuracy' },
      { label: 'Default Rate', value: '-45%', change: 'reduction' },
      { label: 'ROI', value: '245%', change: 'year 1' }
    ],
    testimonial: '"The AI insights help us make smarter lending decisions. We\'re approving more quality loans and reducing risk significantly."',
    author: 'Michael Rodriguez, Chief Credit Officer',
    rating: 5
  },
  {
    company: 'Heritage Lending Group',
    title: 'Doubled Loan Officer Productivity',
    description: 'Loan officers now handle 2.5x more applications while maintaining quality and compliance.',
    metrics: [
      { label: 'Productivity', value: '2.5x', change: 'increase' },
      { label: 'Compliance', value: '100%', change: 'adherence' },
      { label: 'Satisfaction', value: '+89%', change: 'borrower' }
    ],
    testimonial: '"Our team loves the automation. It eliminates repetitive work so they can focus on closing deals and happy customers."',
    author: 'Jennifer Park, CEO',
    rating: 5
  }
]

export function LenderSuccessStories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative py-20 bg-gray-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Leading Lenders
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            See how lending institutions are transforming their operations
          </p>
        </motion.div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-dark-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Company Name & Stars */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {story.company}
                </h3>
                <div className="flex gap-1">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Title */}
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {story.title}
              </h4>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {story.description}
              </p>

              {/* Metrics */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                {story.metrics.map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {metric.label}
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {metric.value} {metric.change}
                    </span>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <blockquote className="mb-4">
                <p className="text-sm italic text-gray-700 dark:text-gray-300 mb-3">
                  {story.testimonial}
                </p>
                <footer className="text-sm font-medium text-gray-900 dark:text-white">
                  — {story.author}
                </footer>
              </blockquote>

              {/* CTA */}
              <button className="text-green-600 dark:text-green-400 text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Read Case Study <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
