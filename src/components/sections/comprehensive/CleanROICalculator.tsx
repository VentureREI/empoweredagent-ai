'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Calculator,
  DollarSign,
  Clock,
  TrendingUp,
  Users,
  Zap,
  UserCheck,
  ArrowRight
} from 'lucide-react'

interface ROIInputs {
  transactionsPerMonth: number
  avgCommissionPerTransaction: number
  assistantHourlyRate: number
  hourlyValueOfTime: number
}

interface ROIResults {
  totalWeeklyTimeSaved: number
  totalAnnualTimeSaved: number
  assistantTotalAnnualCost: number
  automationCost: number
  annualSavings: number
  timeValue: number
  totalValue: number
}

export function CleanROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    transactionsPerMonth: 3,
    avgCommissionPerTransaction: 8500,
    assistantHourlyRate: 27.5,
    hourlyValueOfTime: 75
  })

  const [results, setResults] = useState<ROIResults>({
    totalWeeklyTimeSaved: 0,
    totalAnnualTimeSaved: 0,
    assistantTotalAnnualCost: 0,
    automationCost: 12000,
    annualSavings: 0,
    timeValue: 0,
    totalValue: 0
  })

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const calculateROI = () => {
    // Simplified calculation - focus on key tasks that an assistant would handle
    const weeklyHours = 15 // Conservative estimate of automatable tasks per week
    const annualHours = weeklyHours * 52

    const assistantCost = annualHours * inputs.assistantHourlyRate
    const automationCost = 12000
    const savings = assistantCost - automationCost
    const timeValue = annualHours * inputs.hourlyValueOfTime
    const totalValue = savings + timeValue

    return {
      totalWeeklyTimeSaved: weeklyHours,
      totalAnnualTimeSaved: annualHours,
      assistantTotalAnnualCost: Math.round(assistantCost),
      automationCost: automationCost,
      annualSavings: Math.round(savings),
      timeValue: Math.round(timeValue),
      totalValue: Math.round(totalValue)
    }
  }

  useEffect(() => {
    const newResults = calculateROI()
    setResults(newResults)
  }, [inputs])

  const handleInputChange = (field: keyof ROIInputs, value: number) => {
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
    <section ref={ref} className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Clean Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI Automation vs Hiring an Assistant
          </h2>
          <p className="text-xl text-gray-600">
            See the real cost comparison for your business
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left - Simple Inputs */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Your Business</h3>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Transactions Per Month
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={inputs.transactionsPerMonth}
                  onChange={(e) => handleInputChange('transactionsPerMonth', parseFloat(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>1</span>
                  <span className="font-semibold text-blue-600">{inputs.transactionsPerMonth} deals</span>
                  <span>10</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Average Commission Per Deal
                </label>
                <input
                  type="range"
                  min="3000"
                  max="15000"
                  step="500"
                  value={inputs.avgCommissionPerTransaction}
                  onChange={(e) => handleInputChange('avgCommissionPerTransaction', parseInt(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>$3K</span>
                  <span className="font-semibold text-blue-600">{formatCurrency(inputs.avgCommissionPerTransaction)}</span>
                  <span>$15K</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Assistant Hourly Rate
                </label>
                <input
                  type="range"
                  min="20"
                  max="40"
                  step="2.5"
                  value={inputs.assistantHourlyRate}
                  onChange={(e) => handleInputChange('assistantHourlyRate', parseFloat(e.target.value))}
                  className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>$20</span>
                  <span className="font-semibold text-orange-600">${inputs.assistantHourlyRate}/hr</span>
                  <span>$40</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Your Time Value Per Hour
                </label>
                <input
                  type="range"
                  min="50"
                  max="150"
                  step="5"
                  value={inputs.hourlyValueOfTime}
                  onChange={(e) => handleInputChange('hourlyValueOfTime', parseInt(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>$50</span>
                  <span className="font-semibold text-green-600">${inputs.hourlyValueOfTime}/hr</span>
                  <span>$150</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Clean Results */}
          <div className="space-y-6">

            {/* The Comparison */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900">Annual Cost Comparison</h3>
                <p className="text-gray-600 mt-1">Based on {results.totalWeeklyTimeSaved} hours/week of automatable tasks</p>
              </div>

              <div className="p-8 space-y-6">
                {/* Assistant Cost */}
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center">
                    <UserCheck className="w-8 h-8 text-orange-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">Hiring an Assistant</div>
                      <div className="text-sm text-gray-600">{results.totalAnnualTimeSaved} hrs × ${inputs.assistantHourlyRate}/hr</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {formatCurrency(results.assistantTotalAnnualCost)}
                  </div>
                </div>

                {/* Automation Cost */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <Zap className="w-8 h-8 text-blue-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">AI Automation Platform</div>
                      <div className="text-sm text-gray-600">24/7 availability, no management</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(results.automationCost)}
                  </div>
                </div>

                {/* Savings */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-300">
                  <div className="flex items-center">
                    <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                    <div>
                      <div className="font-bold text-gray-900">Your Annual Savings</div>
                      <div className="text-sm text-gray-600">By choosing automation</div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-600">
                    {formatCurrency(results.annualSavings)}
                  </div>
                </div>
              </div>
            </div>

            {/* Value Add */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg text-white p-8">
              <h3 className="text-2xl font-bold mb-4">Plus Additional Value</h3>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm opacity-90">Time Freed Up</div>
                  <div className="text-2xl font-bold">{results.totalWeeklyTimeSaved}h/week</div>
                </div>
                <div>
                  <div className="text-sm opacity-90">Time Value</div>
                  <div className="text-2xl font-bold">{formatCurrency(results.timeValue)}</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="text-sm opacity-90 mb-2">Total Annual Value</div>
                <div className="text-4xl font-bold">
                  {formatCurrency(results.totalValue)}
                </div>
              </div>
            </div>

            {/* Simple Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Automation Wins</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Costs less than hiring help</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Works 24/7 without breaks</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">No training or management needed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Scales instantly with your business</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}