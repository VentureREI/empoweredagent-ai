'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Calculator,
  DollarSign,
  Clock,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react'

interface TaskBreakdown {
  name: string
  hoursPerWeek: number
  automationPotential: number
}

interface ROIInputs {
  transactionsPerMonth: number
  avgCommissionPerTransaction: number
  assistantHourlyRate: number
  hourlyValueOfTime: number

  leadGeneration: TaskBreakdown
  leadFollowUp: TaskBreakdown
  clientCommunication: TaskBreakdown
  documentPreparation: TaskBreakdown
  scheduling: TaskBreakdown
  marketResearch: TaskBreakdown
  socialMedia: TaskBreakdown
  dataEntry: TaskBreakdown
}

interface TaskSavings {
  task: string
  originalHours: number
  automatedHours: number
}

interface ROIResults {
  totalWeeklyTimeSaved: number
  totalAnnualTimeSaved: number
  assistantTotalAnnualCost: number
  timeValueSaved: number
  assistantVsAutomationSavings: number
  additionalRevenue: number
  totalValue: number
  taskSavingsBreakdown: TaskSavings[]
}

export function UnifiedROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    transactionsPerMonth: 3,
    avgCommissionPerTransaction: 8500,
    assistantHourlyRate: 27.5,
    hourlyValueOfTime: 75,

    leadGeneration: {
      name: 'Lead Generation',
      hoursPerWeek: 12,
      automationPotential: 75,
    },
    leadFollowUp: {
      name: 'Lead Follow-up',
      hoursPerWeek: 8,
      automationPotential: 80,
    },
    clientCommunication: {
      name: 'Client Communication',
      hoursPerWeek: 6,
      automationPotential: 60,
    },
    documentPreparation: {
      name: 'Document Preparation',
      hoursPerWeek: 4,
      automationPotential: 90,
    },
    scheduling: {
      name: 'Scheduling & Calendar',
      hoursPerWeek: 3,
      automationPotential: 95,
    },
    marketResearch: {
      name: 'Market Research',
      hoursPerWeek: 5,
      automationPotential: 85,
    },
    socialMedia: {
      name: 'Social Media Management',
      hoursPerWeek: 4,
      automationPotential: 70,
    },
    dataEntry: {
      name: 'Data Entry & CRM',
      hoursPerWeek: 3,
      automationPotential: 95,
    },
  })

  const [results, setResults] = useState<ROIResults>({
    totalWeeklyTimeSaved: 0,
    totalAnnualTimeSaved: 0,
    assistantTotalAnnualCost: 0,
    timeValueSaved: 0,
    assistantVsAutomationSavings: 0,
    additionalRevenue: 0,
    totalValue: 0,
    taskSavingsBreakdown: []
  })

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const calculateROI = () => {
    const taskSavingsBreakdown: TaskSavings[] = []
    let totalWeeklyTimeSaved = 0

    // Base time calculations - scale with transaction volume
    const transactionMultiplier = Math.max(0.5, inputs.transactionsPerMonth / 3) // Scale relative to 3 transactions baseline

    // Calculate savings for each task
    Object.entries(inputs).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null && 'hoursPerWeek' in value) {
        const task = value as TaskBreakdown
        // Scale task hours based on transaction volume
        const scaledHours = task.hoursPerWeek * transactionMultiplier
        const automatedHours = Math.round((scaledHours * task.automationPotential / 100) * 10) / 10
        totalWeeklyTimeSaved += automatedHours

        taskSavingsBreakdown.push({
          task: task.name,
          originalHours: scaledHours,
          automatedHours: automatedHours
        })
      }
    })

    const totalAnnualTimeSaved = totalWeeklyTimeSaved * 52
    const assistantTotalAnnualCost = totalAnnualTimeSaved * inputs.assistantHourlyRate
    const automationCost = 12000
    const assistantVsAutomationSavings = assistantTotalAnnualCost - automationCost
    const timeValueSaved = totalAnnualTimeSaved * inputs.hourlyValueOfTime

    // Additional revenue from freed up time - now uses both inputs meaningfully
    const additionalCapacityHours = totalWeeklyTimeSaved * 0.7 * 52
    const hoursPerTransaction = 25
    const additionalTransactions = additionalCapacityHours / hoursPerTransaction
    const additionalRevenue = additionalTransactions * inputs.avgCommissionPerTransaction

    const totalValue = assistantVsAutomationSavings + timeValueSaved + additionalRevenue

    return {
      totalWeeklyTimeSaved: Math.round(totalWeeklyTimeSaved * 10) / 10,
      totalAnnualTimeSaved: Math.round(totalAnnualTimeSaved),
      assistantTotalAnnualCost: Math.round(assistantTotalAnnualCost),
      timeValueSaved: Math.round(timeValueSaved),
      assistantVsAutomationSavings: Math.round(assistantVsAutomationSavings),
      additionalRevenue: Math.round(additionalRevenue),
      totalValue: Math.round(totalValue),
      taskSavingsBreakdown
    }
  }

  useEffect(() => {
    const newResults = calculateROI()
    setResults(newResults)
  }, [inputs])

  const handleBusinessInputChange = (field: string, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AI Automation vs Assistant ROI Analysis
            </h2>
            <p className="text-xl text-gray-600">
              Complete breakdown of costs, savings, and value creation
            </p>
          </motion.div>
        </div>

        {/* Single Unified Section */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">

          {/* Business Inputs Row */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Business Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Monthly Transactions
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  step="0.5"
                  value={inputs.transactionsPerMonth}
                  onChange={(e) => handleBusinessInputChange('transactionsPerMonth', parseFloat(e.target.value) || 0)}
                  className="block w-full px-3 py-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold"
                  placeholder="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Avg Commission/Deal
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    min="3000"
                    max="25000"
                    step="500"
                    value={inputs.avgCommissionPerTransaction}
                    onChange={(e) => handleBusinessInputChange('avgCommissionPerTransaction', parseInt(e.target.value) || 0)}
                    className="block w-full pl-7 pr-3 py-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold"
                    placeholder="8500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Assistant Rate/Hour
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    min="20"
                    max="50"
                    step="2.5"
                    value={inputs.assistantHourlyRate}
                    onChange={(e) => handleBusinessInputChange('assistantHourlyRate', parseFloat(e.target.value) || 0)}
                    className="block w-full pl-7 pr-3 py-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold"
                    placeholder="27.50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Your Time Value/Hour
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    min="50"
                    max="300"
                    step="5"
                    value={inputs.hourlyValueOfTime}
                    onChange={(e) => handleBusinessInputChange('hourlyValueOfTime', parseInt(e.target.value) || 0)}
                    className="block w-full pl-7 pr-3 py-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold"
                    placeholder="75"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Task Breakdown */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Weekly Tasks That Can Be Automated</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Object.entries(inputs).filter(([key]) =>
                typeof inputs[key as keyof ROIInputs] === 'object' && inputs[key as keyof ROIInputs] !== null
              ).map(([taskKey, task]) => {
                const taskData = task as TaskBreakdown
                const savings = results.taskSavingsBreakdown.find(t => t.task === taskData.name)

                return (
                  <div key={taskKey} className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">{taskData.name}</h4>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {savings ? `${savings.automatedHours}h` : '0h'}
                    </div>
                    <div className="text-xs text-gray-500">
                      saved per week
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="text-center bg-green-100 rounded-lg py-4">
              <div className="text-sm text-gray-600 mb-1">Total Weekly Time Saved</div>
              <div className="text-3xl font-bold text-green-600">{results.totalWeeklyTimeSaved} hours</div>
            </div>
          </div>

          {/* Cost Comparison */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Annual Cost Comparison</h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Assistant Cost */}
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
                <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-gray-900 mb-2">Hiring Assistant</h4>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {formatCurrency(results.assistantTotalAnnualCost)}
                </div>
                <p className="text-sm text-gray-600">
                  {results.totalAnnualTimeSaved} hrs × ${inputs.assistantHourlyRate}/hr
                </p>
              </div>

              {/* Automation Cost */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-gray-900 mb-2">AI Automation</h4>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  $12,000
                </div>
                <p className="text-sm text-gray-600">
                  Complete platform, 24/7 availability
                </p>
              </div>

              {/* Savings */}
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 text-center">
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-gray-900 mb-2">Your Savings</h4>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {formatCurrency(results.assistantVsAutomationSavings)}
                </div>
                <p className="text-sm text-gray-600">
                  Annual cost savings
                </p>
              </div>
            </div>
          </div>

          {/* Total Value Summary */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-6">Complete Annual Value Creation</h3>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-sm opacity-90 mb-1">Cost Savings</div>
                <div className="text-2xl font-bold">{formatCurrency(results.assistantVsAutomationSavings)}</div>
              </div>
              <div>
                <div className="text-sm opacity-90 mb-1">Time Value</div>
                <div className="text-2xl font-bold">{formatCurrency(results.timeValueSaved)}</div>
              </div>
              <div>
                <div className="text-sm opacity-90 mb-1">Revenue Boost</div>
                <div className="text-2xl font-bold">{formatCurrency(results.additionalRevenue)}</div>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6">
              <div className="text-xl opacity-90 mb-2">Total Annual Value</div>
              <div className="text-5xl font-bold">{formatCurrency(results.totalValue)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}