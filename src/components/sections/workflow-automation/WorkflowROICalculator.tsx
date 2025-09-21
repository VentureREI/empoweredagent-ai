'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Calculator,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Zap,
  BarChart3,
  Target,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const presetScenarios = [
  {
    name: 'Solo Agent',
    description: 'Independent agent with 10-15 transactions/year',
    hoursPerWeek: 50,
    hourlyRate: 75,
    tasksAutomated: 60,
    monthlyTransactions: 1.2,
    leadFollowUpHours: 8,
    marketingHours: 6,
    adminHours: 10,
    clientCommHours: 4
  },
  {
    name: 'Small Team',
    description: 'Team of 2-3 agents with 30-50 transactions/year',
    hoursPerWeek: 60,
    hourlyRate: 80,
    tasksAutomated: 70,
    monthlyTransactions: 4,
    leadFollowUpHours: 12,
    marketingHours: 10,
    adminHours: 15,
    clientCommHours: 8
  },
  {
    name: 'Growing Brokerage',
    description: 'Team of 5+ agents with 100+ transactions/year',
    hoursPerWeek: 70,
    hourlyRate: 85,
    tasksAutomated: 80,
    monthlyTransactions: 10,
    leadFollowUpHours: 20,
    marketingHours: 15,
    adminHours: 25,
    clientCommHours: 12
  }
]

export function WorkflowROICalculator() {
  const [selectedScenario, setSelectedScenario] = useState(presetScenarios[0])
  const [customValues, setCustomValues] = useState(selectedScenario)
  const [showCustom, setShowCustom] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleScenarioChange = (scenario: typeof presetScenarios[0]) => {
    setSelectedScenario(scenario)
    setCustomValues(scenario)
    setShowCustom(false)
  }

  const handleCustomValueChange = (field: string, value: number) => {
    setCustomValues(prev => ({ ...prev, [field]: value }))
    setShowCustom(true)
  }

  // Calculations
  const totalTaskHours = customValues.leadFollowUpHours + customValues.marketingHours +
                        customValues.adminHours + customValues.clientCommHours

  const hoursAutomated = (totalTaskHours * customValues.tasksAutomated) / 100
  const weeklySavings = hoursAutomated
  const monthlySavings = weeklySavings * 4.33
  const yearlySavings = monthlySavings * 12

  const weeklyValue = weeklySavings * customValues.hourlyRate
  const monthlyValue = monthlySavings * customValues.hourlyRate
  const yearlyValue = yearlySavings * customValues.hourlyRate

  // Additional benefits
  const additionalDealsPerYear = Math.floor(yearlySavings / 20) // 1 deal per 20 hours saved
  const averageCommission = 7500 // Average commission per deal
  const additionalRevenue = additionalDealsPerYear * averageCommission

  const totalYearlyBenefit = yearlyValue + additionalRevenue
  const workflowCosts = 2000 // Estimated annual workflow automation costs
  const netROI = totalYearlyBenefit - workflowCosts
  const roiPercentage = ((netROI / workflowCosts) * 100).toFixed(0)

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
      ref={ref}
      className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-dark-800 dark:to-dark-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Calculate Your <span className="text-gradient">Workflow Automation ROI</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            See how much time and money you can save with intelligent workflow automation.
            Most agents see 500%+ ROI in the first year.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Inputs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Preset Scenarios */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-primary-600" />
                Choose Your Business Profile
              </h3>

              <div className="grid gap-4">
                {presetScenarios.map((scenario, index) => (
                  <button
                    key={index}
                    onClick={() => handleScenarioChange(scenario)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedScenario.name === scenario.name && !showCustom
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white">{scenario.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{scenario.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Custom Inputs */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Customize Your Numbers
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    value={customValues.hourlyRate}
                    onChange={(e) => handleCustomValueChange('hourlyRate', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tasks Automated (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={customValues.tasksAutomated}
                    onChange={(e) => handleCustomValueChange('tasksAutomated', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lead Follow-up (hrs/week)
                  </label>
                  <input
                    type="number"
                    value={customValues.leadFollowUpHours}
                    onChange={(e) => handleCustomValueChange('leadFollowUpHours', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Marketing (hrs/week)
                  </label>
                  <input
                    type="number"
                    value={customValues.marketingHours}
                    onChange={(e) => handleCustomValueChange('marketingHours', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Admin Tasks (hrs/week)
                  </label>
                  <input
                    type="number"
                    value={customValues.adminHours}
                    onChange={(e) => handleCustomValueChange('adminHours', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Client Communication (hrs/week)
                  </label>
                  <input
                    type="number"
                    value={customValues.clientCommHours}
                    onChange={(e) => handleCustomValueChange('clientCommHours', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Results */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center"
            >
              <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
              Your ROI Results
            </motion.h3>

            {/* Time Savings */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    Time Savings
                  </h4>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{weeklySavings.toFixed(1)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Hours/Week</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{monthlySavings.toFixed(0)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Hours/Month</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{yearlySavings.toFixed(0)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Hours/Year</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Financial Impact */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                    Financial Value
                  </h4>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">${weeklyValue.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Value/Week</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">${monthlyValue.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Value/Month</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">${yearlyValue.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Value/Year</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Additional Benefits */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-600" />
                  Additional Business Impact
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Additional Deals/Year:</span>
                    <span className="font-bold text-purple-600">{additionalDealsPerYear}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Extra Revenue:</span>
                    <span className="font-bold text-purple-600">${additionalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Annual Automation Costs:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">-${workflowCosts.toLocaleString()}</span>
                  </div>
                  <hr className="border-gray-300 dark:border-gray-600" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 dark:text-white font-semibold">Net Annual Benefit:</span>
                    <span className="font-bold text-green-600 text-xl">${netROI.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* ROI Summary */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-800/20 border-orange-200 dark:border-orange-800">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-orange-600" />
                    Total ROI
                  </h4>
                  <div className="text-4xl font-bold text-orange-600 mb-2">{roiPercentage}%</div>
                  <p className="text-gray-600 dark:text-gray-400">Return on Investment</p>
                </div>
              </Card>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="pt-4">
              <Button size="lg" className="w-full group">
                <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Start Building My Workflows
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-3">
                <CheckCircle className="w-4 h-4 inline-block mr-1 text-green-500" />
                Setup starts in 24 hours • 30-day money-back guarantee
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}