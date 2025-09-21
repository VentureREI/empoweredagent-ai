'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calculator, DollarSign, Clock, TrendingUp, Users, Zap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface CalculatorInputs {
  employees: number
  hourlyRate: number
  hoursPerTask: number
  tasksPerWeek: number
  agentCost: number
}

interface ROIResults {
  currentCost: number
  newCost: number
  weeklySavings: number
  monthlySavings: number
  annualSavings: number
  roi: number
  paybackPeriod: number
  timeSaved: number
}

const presetScenarios = [
  {
    name: 'Solo Agent',
    description: 'Individual agent automating lead follow-up',
    inputs: {
      employees: 1,
      hourlyRate: 75,
      hoursPerTask: 3,
      tasksPerWeek: 15,
      agentCost: 850
    }
  },
  {
    name: 'Small Team',
    description: 'Real estate team with transaction coordination',
    inputs: {
      employees: 5,
      hourlyRate: 65,
      hoursPerTask: 4,
      tasksPerWeek: 30,
      agentCost: 1500
    }
  },
  {
    name: 'Brokerage',
    description: 'Large brokerage with multiple agents and complex workflows',
    inputs: {
      employees: 25,
      hourlyRate: 80,
      hoursPerTask: 5,
      tasksPerWeek: 75,
      agentCost: 3500
    }
  }
]

export function ROICalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    employees: 3,
    hourlyRate: 75,
    hoursPerTask: 3,
    tasksPerWeek: 20,
    agentCost: 1200
  })

  const [results, setResults] = useState<ROIResults | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Calculate ROI
  const calculateROI = (calculatorInputs: CalculatorInputs) => {
    const { employees, hourlyRate, hoursPerTask, tasksPerWeek, agentCost } = calculatorInputs

    // Current manual process costs
    const weeklyHours = employees * hoursPerTask * tasksPerWeek
    const currentWeeklyCost = weeklyHours * hourlyRate
    const currentMonthlyCost = currentWeeklyCost * 4.33 // average weeks per month
    const currentAnnualCost = currentWeeklyCost * 52

    // With AI agent (assuming 85% automation rate)
    const automationRate = 0.85
    const remainingManualWork = 1 - automationRate
    const newWeeklyHours = weeklyHours * remainingManualWork
    const newWeeklyCost = newWeeklyHours * hourlyRate + (agentCost / 4.33) // monthly agent cost converted to weekly
    const newMonthlyCost = newWeeklyCost * 4.33
    const newAnnualCost = newWeeklyCost * 52

    // Savings and ROI
    const weeklySavings = currentWeeklyCost - newWeeklyCost
    const monthlySavings = currentMonthlyCost - newMonthlyCost
    const annualSavings = currentAnnualCost - newAnnualCost
    const roi = ((annualSavings - agentCost * 12) / (agentCost * 12)) * 100
    const paybackPeriod = (agentCost * 12) / annualSavings * 12 // months
    const timeSaved = weeklyHours * automationRate

    return {
      currentCost: currentAnnualCost,
      newCost: newAnnualCost,
      weeklySavings,
      monthlySavings,
      annualSavings,
      roi,
      paybackPeriod,
      timeSaved: timeSaved * 52 // annual hours saved
    }
  }

  // Update results when inputs change
  useEffect(() => {
    const newResults = calculateROI(inputs)
    setResults(newResults)
  }, [inputs])

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  const loadPreset = (preset: typeof presetScenarios[0]) => {
    setIsCalculating(true)
    setTimeout(() => {
      setInputs(preset.inputs)
      setIsCalculating(false)
    }, 800)
  }

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <section
      ref={ref}
      className="py-24 bg-white dark:bg-dark-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-100 dark:bg-primary-900 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent-100 dark:bg-accent-900 rounded-full blur-3xl opacity-20" />
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
            Calculate Your <span className="text-gradient">AI Agent ROI</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            See exactly how much time and money you could save with custom AI agents.
            Use our interactive calculator to model your specific business scenario.
          </motion.p>
        </motion.div>

        {/* Preset Scenarios */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-12"
        >
          <motion.h3
            variants={itemVariants}
            className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center"
          >
            Quick Start Scenarios
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {presetScenarios.map((preset, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  variant="default"
                  hover="glow"
                  className="p-6 cursor-pointer group"
                  onClick={() => loadPreset(preset)}
                >
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {preset.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {preset.description}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <div>👥 {preset.inputs.employees} employees</div>
                    <div>💰 ${preset.inputs.hourlyRate}/hour</div>
                    <div>⏱️ {preset.inputs.hoursPerTask}h per task</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Inputs */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <Card variant="default" className="p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    ROI Calculator
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Enter your business details
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Number of Employees */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Agents/Staff
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={inputs.employees}
                      onChange={(e) => handleInputChange('employees', parseInt(e.target.value) || 0)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="3"
                    />
                  </div>
                </motion.div>

                {/* Hourly Rate */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Average Hourly Rate ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={inputs.hourlyRate}
                      onChange={(e) => handleInputChange('hourlyRate', parseFloat(e.target.value) || 0)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="75"
                    />
                  </div>
                </motion.div>

                {/* Hours per Task */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hours per Task
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      step="0.5"
                      value={inputs.hoursPerTask}
                      onChange={(e) => handleInputChange('hoursPerTask', parseFloat(e.target.value) || 0)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="3"
                    />
                  </div>
                </motion.div>

                {/* Tasks per Week */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tasks per Week
                  </label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={inputs.tasksPerWeek}
                      onChange={(e) => handleInputChange('tasksPerWeek', parseInt(e.target.value) || 0)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="20"
                    />
                  </div>
                </motion.div>

                {/* Agent Monthly Cost */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    AI Agent Monthly Cost ($)
                  </label>
                  <div className="relative">
                    <Zap className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={inputs.agentCost}
                      onChange={(e) => handleInputChange('agentCost', parseInt(e.target.value) || 0)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="1200"
                    />
                  </div>
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
            <Card variant="default" className="p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Your ROI Projections
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Estimated savings and returns
                  </p>
                </div>
              </div>

              {results && (
                <motion.div
                  key={JSON.stringify(inputs)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-xl">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(results.annualSavings)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Annual Savings</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 rounded-xl">
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {Math.round(results.roi)}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">ROI</div>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Monthly Savings</span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {formatCurrency(results.monthlySavings)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Payback Period</span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {Math.round(results.paybackPeriod)} months
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Time Saved (Annual)</span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {Math.round(results.timeSaved).toLocaleString()} hours
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      size="lg"
                      className="w-full text-lg"
                    >
                      Get Your Custom Quote
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                      * Results based on 85% automation rate. Actual results may vary.
                    </p>
                  </div>
                </motion.div>
              )}

              {isCalculating && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}