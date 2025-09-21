'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BarChart3, TrendingUp, Zap, Clock, DollarSign, ArrowRight, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { analyticsTemplates, analyticsCategories } from '@/data/analyticsData'

export function AnalyticsShowcase() {
  const [activeCategory, setActiveCategory] = useState('market-intelligence')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const filteredTemplates = activeCategory === 'all'
    ? analyticsTemplates
    : analyticsTemplates.filter(template => template.category === activeCategory)

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
      id="analytics-showcase"
      ref={ref}
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-blue-100 dark:bg-blue-900 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-purple-100 dark:bg-purple-900 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Real Estate Analytics <span className="text-gradient">That Drive Results</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            From market intelligence to predictive modeling, our AI-powered analytics suite transforms
            your data into actionable insights that drive smarter decisions and bigger profits.
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {analyticsCategories.slice(1).map((category) => {
            const IconComponent = category.icon
            return (
              <motion.button
                key={category.id}
                variants={itemVariants}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-white dark:bg-dark-800 text-primary-600 dark:text-primary-400 shadow-lg border-2 border-primary-200 dark:border-primary-800 transform scale-105'
                    : 'bg-white/50 dark:bg-dark-800/50 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-dark-800 border-2 border-transparent hover:scale-102'
                }`}
                whileHover={{ scale: activeCategory === category.id ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  activeCategory === category.id
                    ? `bg-gradient-to-br ${category.color}`
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  <IconComponent className={`w-4 h-4 ${
                    activeCategory === category.id ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                  }`} />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{category.name}</div>
                  <div className="text-xs opacity-70">{category.description}</div>
                </div>
                <div className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {category.count}
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Analytics Templates Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16"
        >
          {filteredTemplates.map((template, index) => {
            const IconComponent = template.icon
            return (
              <Card
                key={`${activeCategory}-${index}`}
                className="relative group hover:shadow-xl transition-all duration-300"
                hover="lift"
              >
                {/* Popular/Featured Badges */}
                {template.isPopular && (
                  <div className="absolute -top-3 left-6 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                {template.isFeatured && (
                  <div className="absolute -top-3 right-6 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full">
                      AI Powered
                    </span>
                  </div>
                )}

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${template.color} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Setup</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{template.setupTime}</div>
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {template.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 gap-3 mb-4">
                    {template.metrics.accuracyRate && (
                      <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Accuracy</span>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">{template.metrics.accuracyRate}</span>
                      </div>
                    )}
                    {template.metrics.timeSaved && (
                      <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Time Saved</span>
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{template.metrics.timeSaved}</span>
                      </div>
                    )}
                    {template.metrics.roiIncrease && (
                      <div className="flex items-center justify-between p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-300">ROI Increase</span>
                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">{template.metrics.roiIncrease}</span>
                      </div>
                    )}
                    {template.metrics.dataPoints && (
                      <div className="flex items-center justify-between p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Data Points</span>
                        <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">{template.metrics.dataPoints}</span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                    <div className="space-y-1">
                      {template.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Setup</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{template.pricing.setup}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Monthly</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{template.pricing.monthly}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button size="sm" className="w-full group">
                      <BarChart3 className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                      Build This Analytics
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        See Demo
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-hero-pattern opacity-10" />

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Need Custom Analytics Solutions?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Every real estate business has unique data needs. Our team specializes in building
                custom analytics dashboards and predictive models tailored to your specific requirements.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Build Custom Analytics
                </Button>

                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white border-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
                >
                  View All Templates
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}