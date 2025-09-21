'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Calculator,
  TrendingUp,
  Clock,
  DollarSign,
  BarChart3,
  Target,
  Users,
  Building,
  ArrowRight,
  Zap,
  Brain
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const businessScenarios = [
  {
    id: 'solo-agent',
    name: 'Solo Agent',
    description: 'Individual agent focused on growth',
    icon: Users,
    color: 'from-blue-500 to-cyan-600',
    defaults: {
      monthlyTransactions: 3,
      avgCommission: 8500,
      dataAnalysisHours: 15,
      hourlyRate: 75,
      reportingHours: 10,
      researchHours: 12
    }
  },
  {
    id: 'small-team',
    name: 'Small Team',
    description: '3-5 agent team operation',
    icon: Building,
    color: 'from-purple-500 to-violet-600',
    defaults: {
      monthlyTransactions: 12,
      avgCommission: 7800,
      dataAnalysisHours: 45,
      hourlyRate: 85,
      reportingHours: 25,
      researchHours: 30
    }
  },
  {
    id: 'growing-brokerage',
    name: 'Growing Brokerage',
    description: '10+ agents with scaling needs',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-600',
    defaults: {
      monthlyTransactions: 35,
      avgCommission: 6200,
      dataAnalysisHours: 120,
      hourlyRate: 95,
      reportingHours: 80,
      researchHours: 100
    }
  }
]

const analyticsImpact = {
  timeReduction: 0.75, // 75% time reduction
  decisionAccuracy: 0.35, // 35% better decisions
  leadConversion: 0.28, // 28% better conversion
  marketTiming: 0.22, // 22% better timing
  competitiveAdvantage: 0.18 // 18% competitive edge
}

export function AnalyticsROICalculator() {
  const [selectedScenario, setSelectedScenario] = useState('solo-agent')
  const [inputs, setInputs] = useState(businessScenarios[0].defaults)
  const [showResults, setShowResults] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleScenarioChange = (scenarioId: string) => {
    setSelectedScenario(scenarioId)
    const scenario = businessScenarios.find(s => s.id === scenarioId)
    if (scenario) {
      setInputs(scenario.defaults)
      setShowResults(false)
    }
  }

  const calculateROI = () => {
    // Current costs
    const monthlyAnalysisTime = inputs.dataAnalysisHours + inputs.reportingHours + inputs.researchHours
    const currentMonthlyCost = monthlyAnalysisTime * inputs.hourlyRate
    const currentYearlyCost = currentMonthlyCost * 12

    // Time savings with analytics
    const timeSaved = monthlyAnalysisTime * analyticsImpact.timeReduction
    const monthlySavings = timeSaved * inputs.hourlyRate
    const yearlySavings = monthlySavings * 12

    // Revenue impact
    const monthlyRevenue = inputs.monthlyTransactions * inputs.avgCommission
    const yearlyRevenue = monthlyRevenue * 12

    // Improved conversion and decision accuracy
    const revenueIncrease = yearlyRevenue * (
      analyticsImpact.decisionAccuracy +
      analyticsImpact.leadConversion +
      analyticsImpact.marketTiming
    )

    // Analytics costs (estimated)
    const analyticsSetupCost = selectedScenario === 'solo-agent' ? 2000 :
                              selectedScenario === 'small-team' ? 5000 : 10000
    const analyticsMonthly = selectedScenario === 'solo-agent' ? 299 :
                            selectedScenario === 'small-team' ? 699 : 1299
    const analyticsYearlyCost = analyticsSetupCost + (analyticsMonthly * 12)

    // ROI calculation
    const totalBenefit = yearlySavings + revenueIncrease
    const netBenefit = totalBenefit - analyticsYearlyCost
    const roiPercentage = (netBenefit / analyticsYearlyCost) * 100

    return {
      currentYearlyCost,
      yearlySavings,
      revenueIncrease,
      totalBenefit,
      analyticsYearlyCost,
      netBenefit,
      roiPercentage,
      timeSavedHours: timeSaved * 12,
      additionalDeals: Math.floor((revenueIncrease / inputs.avgCommission) / 12)
    }
  }

  const results = calculateROI()

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
      className="py-24 bg-white dark:bg-dark-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-blue-100 to-transparent dark:from-blue-900/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-purple-100 to-transparent dark:from-purple-900/30 rounded-full blur-3xl" />
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
            Calculate Your <span className="text-gradient">Analytics ROI</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            See exactly how much time and money AI-powered analytics can save your business.
            Select your business type and get personalized ROI projections.
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Business Scenario Selection */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="mb-12"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            >
              Choose Your Business Profile
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {businessScenarios.map((scenario) => {
                const IconComponent = scenario.icon
                return (
                  <motion.div
                    key={scenario.id}
                    variants={itemVariants}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedScenario === scenario.id ? 'transform scale-105' : 'hover:scale-102'
                    }`}
                    onClick={() => handleScenarioChange(scenario.id)}
                  >
                    <Card
                      className={`p-6 text-center ${
                        selectedScenario === scenario.id
                          ? 'border-2 border-primary-500 shadow-lg'
                          : 'border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${scenario.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {scenario.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {scenario.description}
                      </p>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Input Form and Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Form */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <Card className="p-8">
                <motion.h3
                  variants={itemVariants}
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center"
                >
                  <Calculator className="w-6 h-6 mr-3 text-primary-600" />
                  Business Metrics
                </motion.h3>

                <div className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Monthly Transactions
                    </label>
                    <input
                      type="number"
                      value={inputs.monthlyTransactions}
                      onChange={(e) => setInputs({...inputs, monthlyTransactions: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-dark-800 dark:text-white"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Average Commission ($)
                    </label>
                    <input
                      type="number"
                      value={inputs.avgCommission}
                      onChange={(e) => setInputs({...inputs, avgCommission: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-dark-800 dark:text-white"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Hours/Month on Data Analysis
                    </label>
                    <input
                      type="number"
                      value={inputs.dataAnalysisHours}
                      onChange={(e) => setInputs({...inputs, dataAnalysisHours: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-dark-800 dark:text-white"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Hours/Month on Reporting
                    </label>
                    <input
                      type="number"
                      value={inputs.reportingHours}
                      onChange={(e) => setInputs({...inputs, reportingHours: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-dark-800 dark:text-white"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Hours/Month on Market Research
                    </label>
                    <input
                      type="number"
                      value={inputs.researchHours}
                      onChange={(e) => setInputs({...inputs, researchHours: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-dark-800 dark:text-white"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Your Hourly Rate ($)
                    </label>
                    <input
                      type="number"
                      value={inputs.hourlyRate}
                      onChange={(e) => setInputs({...inputs, hourlyRate: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-dark-800 dark:text-white"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button
                      onClick={() => setShowResults(true)}
                      size="lg"
                      className="w-full"
                    >
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Calculate My ROI
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>

            {/* Results */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {showResults ? (
                <div className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-green-800 dark:text-green-300">
                          Annual ROI
                        </h3>
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        {results.roiPercentage.toFixed(0)}%
                      </div>
                      <p className="text-green-700 dark:text-green-300">
                        Return on Analytics Investment
                      </p>
                    </Card>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <Card className="p-4 text-center">
                        <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {results.timeSavedHours.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Hours Saved/Year
                        </div>
                      </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Card className="p-4 text-center">
                        <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          +{results.additionalDeals}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Extra Deals/Month
                        </div>
                      </Card>
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <Card className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        Financial Impact Breakdown
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Time Savings</span>
                          <span className="font-semibold text-green-600">
                            +${results.yearlySavings.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Revenue Increase</span>
                          <span className="font-semibold text-green-600">
                            +${results.revenueIncrease.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Analytics Investment</span>
                          <span className="font-semibold text-red-600">
                            -${results.analyticsYearlyCost.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between">
                            <span className="font-bold text-gray-900 dark:text-white">Net Benefit</span>
                            <span className="font-bold text-green-600 text-lg">
                              ${results.netBenefit.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button size="lg" className="w-full group">
                      <Brain className="w-5 h-5 mr-2" />
                      Start My Analytics Journey
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <motion.div variants={itemVariants}>
                  <Card className="p-12 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Calculator className="w-12 h-12 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Ready to Calculate?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Fill in your business metrics on the left, then click "Calculate My ROI" to see your personalized analytics investment return.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center justify-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-700 dark:text-blue-300">75% Time Saved</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-green-700 dark:text-green-300">35% More Revenue</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}