'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { DollarSign, TrendingUp, Users, Clock } from 'lucide-react'

export function LenderROICalculator() {
  const [loansPerMonth, setLoansPerMonth] = useState(150)
  const [avgLoanValue, setAvgLoanValue] = useState(350000)
  const [processingTimeHours, setProcessingTimeHours] = useState(48)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Calculate metrics
  const automatedLoansPerMonth = Math.floor(loansPerMonth * 2.5)
  const hoursPerLoan = processingTimeHours / loansPerMonth
  const automatedHoursPerLoan = hoursPerLoan * 0.25 // 75% reduction
  const hoursSaved = (hoursPerLoan - automatedHoursPerLoan) * loansPerMonth
  const costPerHour = 50
  const moneySaved = hoursSaved * costPerHour
  const additionalLoans = automatedLoansPerMonth - loansPerMonth
  const additionalRevenue = additionalLoans * (avgLoanValue * 0.005) // Assume 0.5% fee
  const firstYearROI = ((additionalRevenue * 12 + moneySaved * 12) / 24000) * 100

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-b from-white to-gray-50 dark:from-dark-800 dark:to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Calculate Your ROI
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            See how much you can save with AI-powered lending automation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-dark-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Your Lending Numbers
            </h3>

            {/* Input 1: Loans Per Month */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Loans Processed Per Month: <span className="text-green-600">{loansPerMonth}</span>
              </label>
              <input
                type="range"
                min="50"
                max="500"
                value={loansPerMonth}
                onChange={(e) => setLoansPerMonth(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">50 — 500</div>
            </div>

            {/* Input 2: Avg Loan Value */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Average Loan Value: <span className="text-green-600">${(avgLoanValue / 1000).toFixed(0)}K</span>
              </label>
              <input
                type="range"
                min="100000"
                max="1000000"
                step="50000"
                value={avgLoanValue}
                onChange={(e) => setAvgLoanValue(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">$100K — $1M</div>
            </div>

            {/* Input 3: Processing Time */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Avg Processing Time Per Loan: <span className="text-green-600">{processingTimeHours} hours</span>
              </label>
              <input
                type="range"
                min="24"
                max="120"
                value={processingTimeHours}
                onChange={(e) => setProcessingTimeHours(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">24 — 120 hours</div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Result 1: Additional Loans */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-500/5 rounded-2xl p-6 border border-blue-200 dark:border-blue-500/30">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-blue-900 dark:text-blue-200 mb-1">Additional Loans Processed</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
                    +{additionalLoans.toFixed(0)} loans/month
                  </p>
                </div>
              </div>
            </div>

            {/* Result 2: Hours Saved */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-500/5 rounded-2xl p-6 border border-green-200 dark:border-green-500/30">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-green-900 dark:text-green-200 mb-1">Hours Saved Per Month</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-300">
                    {hoursSaved.toFixed(0)} hours
                  </p>
                </div>
              </div>
            </div>

            {/* Result 3: Monthly Savings */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-500/10 dark:to-amber-500/5 rounded-2xl p-6 border border-amber-200 dark:border-amber-500/30">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-amber-900 dark:text-amber-200 mb-1">Monthly Savings + Revenue</p>
                  <p className="text-3xl font-bold text-amber-600 dark:text-amber-300">
                    ${((moneySaved + additionalRevenue) / 1000).toFixed(0)}K/month
                  </p>
                </div>
              </div>
            </div>

            {/* Result 4: Annual ROI */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-500/5 rounded-2xl p-6 border border-purple-200 dark:border-purple-500/30">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-purple-900 dark:text-purple-200 mb-1">First Year ROI</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-300">
                    {Math.max(0, firstYearROI).toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              *Calculations based on average lending industry metrics. Actual results may vary based on your specific operations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
