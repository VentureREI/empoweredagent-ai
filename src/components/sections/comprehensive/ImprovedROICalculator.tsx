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
  Target,
  CheckCircle,
  BarChart3,
  UserCheck,
  Search,
  Phone,
  MessageSquare,
  FileText,
  Calendar,
  Camera,
  Briefcase
} from 'lucide-react'

interface TaskBreakdown {
  name: string
  hoursPerWeek: number
  automationPotential: number
  icon: any
  description: string
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
  appointmentScheduling: TaskBreakdown
  marketingActivities: TaskBreakdown
  administrativeTasks: TaskBreakdown
  contractManagement: TaskBreakdown
}

interface ROIResults {
  totalWeeklyTimeSaved: number
  totalAnnualTimeSaved: number
  assistantTotalAnnualCost: number
  timeValueSaved: number
  assistantVsAutomationSavings: number
  additionalRevenue: number
  totalValue: number
  taskSavingsBreakdown: { [key: string]: number }
}

export function ImprovedROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    transactionsPerMonth: 3,
    avgCommissionPerTransaction: 8500,
    assistantHourlyRate: 27.5,
    hourlyValueOfTime: 75,

    leadGeneration: {
      name: 'Lead Generation',
      hoursPerWeek: 12,
      automationPotential: 75,
      icon: Search,
      description: 'Prospecting, cold calling, social media outreach'
    },
    leadFollowUp: {
      name: 'Lead Follow-up',
      hoursPerWeek: 8,
      automationPotential: 85,
      icon: Phone,
      description: 'Automated drip campaigns, follow-up sequences'
    },
    clientCommunication: {
      name: 'Client Communication',
      hoursPerWeek: 6,
      automationPotential: 60,
      icon: MessageSquare,
      description: 'Status updates, scheduling, general communication'
    },
    documentPreparation: {
      name: 'Document Preparation',
      hoursPerWeek: 4,
      automationPotential: 90,
      icon: FileText,
      description: 'Contracts, forms, listing documents'
    },
    appointmentScheduling: {
      name: 'Appointment Scheduling',
      hoursPerWeek: 3,
      automationPotential: 95,
      icon: Calendar,
      description: 'Showings, meetings, inspections coordination'
    },
    marketingActivities: {
      name: 'Marketing Activities',
      hoursPerWeek: 8,
      automationPotential: 70,
      icon: Camera,
      description: 'Social media, listings, content creation'
    },
    administrativeTasks: {
      name: 'Administrative Tasks',
      hoursPerWeek: 6,
      automationPotential: 80,
      icon: Briefcase,
      description: 'Data entry, filing, expense tracking'
    },
    contractManagement: {
      name: 'Contract Management',
      hoursPerWeek: 3,
      automationPotential: 70,
      icon: CheckCircle,
      description: 'Contract tracking, deadline reminders, compliance'
    }
  })

  const [results, setResults] = useState<ROIResults>({
    totalWeeklyTimeSaved: 0,
    totalAnnualTimeSaved: 0,
    assistantTotalAnnualCost: 0,
    timeValueSaved: 0,
    assistantVsAutomationSavings: 0,
    additionalRevenue: 0,
    totalValue: 0,
    taskSavingsBreakdown: {}
  })

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const getAllTasks = (): TaskBreakdown[] => {
    return [
      inputs.leadGeneration,
      inputs.leadFollowUp,
      inputs.clientCommunication,
      inputs.documentPreparation,
      inputs.appointmentScheduling,
      inputs.marketingActivities,
      inputs.administrativeTasks,
      inputs.contractManagement
    ]
  }

  const calculateROI = () => {
    const tasks = getAllTasks()

    let totalWeeklyTimeSaved = 0
    const taskSavingsBreakdown: { [key: string]: number } = {}

    tasks.forEach(task => {
      const timeSaved = task.hoursPerWeek * (task.automationPotential / 100)
      totalWeeklyTimeSaved += timeSaved
      taskSavingsBreakdown[task.name] = timeSaved
    })

    const totalAnnualTimeSaved = totalWeeklyTimeSaved * 52
    const assistantTotalAnnualCost = totalAnnualTimeSaved * inputs.assistantHourlyRate
    const automationCost = 12000
    const assistantVsAutomationSavings = assistantTotalAnnualCost - automationCost
    const timeValueSaved = totalAnnualTimeSaved * inputs.hourlyValueOfTime

    // Additional revenue from freed up time
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

  const handleTaskInputChange = (taskKey: string, field: string, value: number) => {
    setInputs(prev => ({
      ...prev,
      [taskKey]: {
        ...prev[taskKey as keyof ROIInputs] as TaskBreakdown,
        [field]: value
      }
    }))
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
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Clean Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded mb-6">
            <Calculator className="w-4 h-4 inline mr-2" />
            ROI Calculator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Automation vs Hiring an Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get a detailed breakdown of costs, time savings, and revenue impact.
            See exactly how automation compares to hiring help.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">

          {/* Business Inputs */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Business Details</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Transactions
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    step="0.5"
                    value={inputs.transactionsPerMonth}
                    onChange={(e) => handleBusinessInputChange('transactionsPerMonth', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Commission Per Deal
                  </label>
                  <input
                    type="number"
                    min="1000"
                    max="50000"
                    step="250"
                    value={inputs.avgCommissionPerTransaction}
                    onChange={(e) => handleBusinessInputChange('avgCommissionPerTransaction', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="8500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assistant Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    min="15"
                    max="60"
                    step="0.5"
                    value={inputs.assistantHourlyRate}
                    onChange={(e) => handleBusinessInputChange('assistantHourlyRate', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="27.50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Hourly Value
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      min="50"
                      max="300"
                      step="5"
                      value={inputs.hourlyValueOfTime}
                      onChange={(e) => handleBusinessInputChange('hourlyValueOfTime', parseInt(e.target.value) || 0)}
                      className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="75"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">/hr</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">

            {/* Main Comparison */}
            <div className="bg-gray-50 p-8 rounded-xl mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Annual Cost Comparison</h3>
              <p className="text-gray-600 text-center mb-8">Based on {results.totalWeeklyTimeSaved} hours/week of automatable tasks</p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border-l-4 border-orange-500">
                  <div className="flex items-center mb-3">
                    <UserCheck className="w-6 h-6 text-orange-500 mr-2" />
                    <h4 className="font-bold text-gray-900">Assistant Cost</h4>
                  </div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {formatCurrency(results.assistantTotalAnnualCost)}
                  </div>
                  <p className="text-sm text-gray-600">
                    {results.totalAnnualTimeSaved} hours × ${inputs.assistantHourlyRate}/hr
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center mb-3">
                    <Zap className="w-6 h-6 text-blue-500 mr-2" />
                    <h4 className="font-bold text-gray-900">Automation Cost</h4>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$12,000</div>
                  <p className="text-sm text-gray-600">24/7 availability, no management</p>
                </div>
              </div>

              <div className="bg-green-600 text-white p-6 rounded-lg text-center">
                <h4 className="text-xl font-bold mb-2">Your Annual Savings</h4>
                <div className="text-4xl font-bold mb-2">{formatCurrency(results.assistantVsAutomationSavings)}</div>
                <p className="opacity-90">by choosing automation over hiring</p>
              </div>
            </div>

            {/* Additional Value */}
            <div className="bg-blue-600 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Plus Additional Value</h3>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-90" />
                  <div className="text-2xl font-bold">{results.totalWeeklyTimeSaved}h</div>
                  <div className="text-sm opacity-90">per week saved</div>
                </div>
                <div className="text-center">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 opacity-90" />
                  <div className="text-2xl font-bold">{formatCurrency(results.timeValueSaved)}</div>
                  <div className="text-sm opacity-90">time value</div>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-90" />
                  <div className="text-2xl font-bold">{formatCurrency(results.additionalRevenue)}</div>
                  <div className="text-sm opacity-90">potential revenue</div>
                </div>
              </div>

              <div className="border-t border-blue-500 pt-6">
                <div className="text-center">
                  <div className="text-sm opacity-90 mb-2">Total Annual Value</div>
                  <div className="text-4xl font-bold">{formatCurrency(results.totalValue)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Breakdown */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Detailed Task Breakdown</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getAllTasks().map((task, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <task.icon className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-gray-900 text-sm">{task.name}</h4>
                </div>
                <p className="text-xs text-gray-600 mb-3">{task.description}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Hours/week:</span>
                    <span className="font-medium">{task.hoursPerWeek}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Automation:</span>
                    <span className="font-medium text-green-600">{task.automationPotential}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time saved:</span>
                    <span className="font-bold text-blue-600">
                      {(results.taskSavingsBreakdown[task.name] || 0).toFixed(1)}h/wk
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Summary */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">The Bottom Line</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">If You Hire an Assistant</h4>
              <div className="text-2xl font-bold text-orange-600">{formatCurrency(results.assistantTotalAnnualCost)}</div>
              <p className="text-sm text-gray-600">per year for these tasks</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">If You Choose Automation</h4>
              <div className="text-2xl font-bold text-blue-600">$12,000</div>
              <p className="text-sm text-gray-600">per year + better reliability</p>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-6">
            <h4 className="text-lg font-bold text-green-600 mb-2">Your Advantage</h4>
            <div className="text-3xl font-bold text-green-600 mb-2">{formatCurrency(results.assistantVsAutomationSavings)}</div>
            <p className="text-gray-600">saved every year by choosing automation</p>
          </div>
        </div>
      </div>
    </section>
  )
}