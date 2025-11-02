'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Zap,
  Target,
  BarChart3,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  Brain,
  Workflow,
  TrendingUp,
  Shield,
  Activity,
  Search,
  Settings,
  Lock,
  Eye
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const featureCategories = [
  {
    id: 'loan-processing',
    title: 'Instant Loan Processing',
    description: 'Automate end-to-end loan processing workflows and reduce approval time from days to hours',
    icon: Zap,
    color: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10',
    features: ['Document verification', 'Credit analysis', 'Income verification', 'Automated underwriting']
  },
  {
    id: 'risk-assessment',
    title: 'Intelligent Risk Assessment',
    description: 'AI-powered credit analysis and risk evaluation with real-time decision support',
    icon: Brain,
    color: 'from-green-500 to-green-600',
    borderColor: 'border-green-500/30',
    bgColor: 'bg-green-500/10',
    features: ['Credit scoring', 'Fraud detection', 'Market analysis', 'Portfolio risk']
  },
  {
    id: 'compliance',
    title: 'Regulatory Compliance',
    description: 'Ensure every transaction meets lending regulations and audit requirements automatically',
    icon: Shield,
    color: 'from-purple-500 to-purple-600',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/10',
    features: ['Audit trails', 'Compliance checks', 'Documentation', 'Regulatory reporting']
  },
  {
    id: 'analytics',
    title: 'Real-Time Analytics',
    description: 'Dashboard insights into your lending pipeline, performance, and market opportunities',
    icon: BarChart3,
    color: 'from-amber-500 to-amber-600',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
    features: ['Pipeline tracking', 'Performance metrics', 'Trend analysis', 'Custom reports']
  },
  {
    id: 'customer-experience',
    title: 'Customer Experience Portal',
    description: 'Self-service loan applications and real-time status tracking for borrowers',
    icon: Eye,
    color: 'from-rose-500 to-rose-600',
    borderColor: 'border-rose-500/30',
    bgColor: 'bg-rose-500/10',
    features: ['Mobile applications', 'Document upload', 'Status tracking', 'eSignature']
  },
  {
    id: 'integration',
    title: 'Seamless Integration',
    description: 'Connect with your existing lending systems, banks, and third-party services',
    icon: Workflow,
    color: 'from-cyan-500 to-cyan-600',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
    features: ['LOS integration', 'Banking APIs', 'CRM sync', 'Custom workflows']
  }
]

export function ForLendersFeatures() {
  const [selectedCategory, setSelectedCategory] = useState(featureCategories[0].id)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const selectedFeature = featureCategories.find(f => f.id === selectedCategory)

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Complete Lending Automation Suite
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            All the tools you need to streamline lending operations, reduce costs, and grow your business
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {featureCategories.map((category, index) => {
            const Icon = category.icon
            const isSelected = selectedCategory === category.id

            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                  isSelected
                    ? `border-green-500 bg-green-50 dark:bg-green-500/10 shadow-lg shadow-green-500/20`
                    : `border-gray-200 dark:border-gray-700 hover:border-green-500/50 dark:hover:border-green-500/30 bg-white dark:bg-dark-800 hover:shadow-lg`
                }`}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {category.description}
                </p>
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-500/20">
                    <ArrowRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Detailed Feature View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Feature Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-dark-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${selectedFeature?.color} mb-6`}>
                {selectedFeature && <selectedFeature.icon className="w-8 h-8 text-white" />}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedFeature?.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {selectedFeature?.description}
              </p>

              <div className="space-y-4 mb-8">
                {selectedFeature?.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <Button className="w-full" variant="default">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </AnimatePresence>

          {/* Feature Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: DollarSign, label: 'Higher Approval Rates', color: 'text-green-600' },
                { icon: Clock, label: 'Faster Processing', color: 'text-blue-600' },
                { icon: TrendingUp, label: 'Revenue Growth', color: 'text-amber-600' },
                { icon: Lock, label: 'Secure & Compliant', color: 'text-purple-600' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="p-6 bg-gray-50 dark:bg-dark-700 rounded-xl border border-gray-200 dark:border-gray-700 text-center"
                >
                  <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
