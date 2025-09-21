'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Clock, TrendingUp, Zap, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { workflowAutomations, workflowCategories } from '@/data/workflowAutomations'

export function WorkflowShowcase() {
  const [activeCategory, setActiveCategory] = useState('lead-generation')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const filteredWorkflows = activeCategory === 'all'
    ? workflowAutomations
    : workflowAutomations.filter(workflow => workflow.category === activeCategory)

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
      id="workflow-showcase"
      ref={ref}
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary-100 dark:bg-primary-900 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-accent-100 dark:bg-accent-900 rounded-full blur-3xl opacity-20" />
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
            Real Estate Workflow Automations <span className="text-gradient">That Actually Work</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Choose from our library of proven workflow automations designed specifically for real estate professionals.
            Each workflow is battle-tested and optimized for maximum ROI.
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {workflowCategories.map((category) => {
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
              </motion.button>
            )
          })}
        </motion.div>

        {/* Workflows Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16"
        >
          {filteredWorkflows.map((workflow, index) => {
            const IconComponent = workflow.icon
            return (
              <Card
                key={`${activeCategory}-${index}`}
                className="relative group hover:shadow-xl transition-all duration-300"
                hover="lift"
              >
                {/* Popular/Featured Badges */}
                {workflow.isPopular && (
                  <div className="absolute -top-3 left-6 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                {workflow.isFeatured && (
                  <div className="absolute -top-3 right-6 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                )}

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${workflow.color} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Setup Time</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{workflow.setupTime}</div>
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {workflow.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {workflow.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {workflow.metrics.timesSaved && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{workflow.metrics.timesSaved}</span>
                      </div>
                    )}
                    {workflow.metrics.conversionBoost && (
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{workflow.metrics.conversionBoost}</span>
                      </div>
                    )}
                    {workflow.metrics.efficiency && (
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{workflow.metrics.efficiency}</span>
                      </div>
                    )}
                    {workflow.metrics.responseTime && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{workflow.metrics.responseTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {workflow.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Setup</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{workflow.pricing.setup}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Monthly</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{workflow.pricing.monthly}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button size="sm" className="w-full group">
                      <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                      Build This Workflow
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
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-hero-pattern opacity-10" />

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Need a Custom Workflow?
              </h3>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Every real estate business is unique. Our team specializes in building custom workflow automations
                tailored to your specific processes, tools, and market conditions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Build Custom Workflow
                </Button>

                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white border-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold"
                >
                  View All Workflows
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