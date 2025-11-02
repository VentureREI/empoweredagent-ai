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
  ArrowRight,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Share2,
  Briefcase,
  Building,
  Activity,
  Award,
  Sparkles,
  Home,
  UserCheck,
  Timer,
  FileText,
  Phone,
  Mail,
  Search,
  Camera,
  MessageSquare,
  TrendingDown
} from 'lucide-react'

interface TaskBreakdown {
  name: string
  hoursPerWeek: number
  tasksPerWeek: number
  automationPotential: number // 0-100%
  icon: any
  description: string
}

interface ROIInputs {
  // Business Metrics
  transactionsPerMonth: number
  avgCommissionPerTransaction: number
  avgTransactionValue: number
  closingRate: number // percentage

  // Task Breakdown
  leadGeneration: TaskBreakdown
  leadFollowUp: TaskBreakdown
  clientCommunication: TaskBreakdown
  documentPreparation: TaskBreakdown
  appointmentScheduling: TaskBreakdown
  marketingActivities: TaskBreakdown
  administrativeTasks: TaskBreakdown
  contractManagement: TaskBreakdown

  // Cost Comparison
  assistantSalary: number // annual
  assistantBenefits: number // percentage of salary
  assistantHourlyRate: number // hourly rate
  hourlyValueOfTime: number
}

interface ROIResults {
  // Time Savings
  totalWeeklyTimeSaved: number
  totalMonthlyTimeSaved: number
  totalAnnualTimeSaved: number

  // Financial Impact
  timeValueSaved: number // annual
  assistantCostSavings: number // annual (salary + benefits)
  assistantHourlyCostSavings: number // annual (hourly rate cost)
  totalAnnualSavings: number

  // Business Growth
  additionalCapacityHours: number
  potentialAdditionalTransactions: number
  additionalRevenue: number

  // ROI Metrics
  roiPercentage: number
  paybackPeriod: number // months

  // Task Details
  taskSavingsBreakdown: { [key: string]: number }

  // Comparison Metrics
  assistantVsAutomationSavings: number // how much more you save with automation vs assistant
  assistantTotalAnnualCost: number // what assistant would cost (hourly rate)
}

export function ComprehensiveROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    // Business Metrics
    transactionsPerMonth: 3,
    avgCommissionPerTransaction: 8500,
    avgTransactionValue: 425000,
    closingRate: 15,

    // Task Breakdown (hours per week, tasks per week, automation %)
    leadGeneration: {
      name: 'Lead Generation',
      hoursPerWeek: 12,
      tasksPerWeek: 25,
      automationPotential: 75,
      icon: Search,
      description: 'Prospecting, cold calling, social media outreach'
    },
    leadFollowUp: {
      name: 'Lead Follow-up',
      hoursPerWeek: 8,
      tasksPerWeek: 40,
      automationPotential: 85,
      icon: Phone,
      description: 'Automated drip campaigns, follow-up sequences'
    },
    clientCommunication: {
      name: 'Client Communication',
      hoursPerWeek: 6,
      tasksPerWeek: 30,
      automationPotential: 60,
      icon: MessageSquare,
      description: 'Status updates, scheduling, general communication'
    },
    documentPreparation: {
      name: 'Document Preparation',
      hoursPerWeek: 4,
      tasksPerWeek: 15,
      automationPotential: 90,
      icon: FileText,
      description: 'Contracts, forms, listing documents'
    },
    appointmentScheduling: {
      name: 'Appointment Scheduling',
      hoursPerWeek: 3,
      tasksPerWeek: 20,
      automationPotential: 95,
      icon: Calendar,
      description: 'Showings, meetings, inspections coordination'
    },
    marketingActivities: {
      name: 'Marketing Activities',
      hoursPerWeek: 8,
      tasksPerWeek: 12,
      automationPotential: 70,
      icon: Camera,
      description: 'Social media, listings, content creation'
    },
    administrativeTasks: {
      name: 'Administrative Tasks',
      hoursPerWeek: 6,
      tasksPerWeek: 35,
      automationPotential: 80,
      icon: Briefcase,
      description: 'Data entry, filing, expense tracking'
    },
    contractManagement: {
      name: 'Contract Management',
      hoursPerWeek: 3,
      tasksPerWeek: 8,
      automationPotential: 70,
      icon: CheckCircle,
      description: 'Contract tracking, deadline reminders, compliance'
    },

    // Cost Comparison
    assistantSalary: 45000, // annual
    assistantBenefits: 25, // 25% of salary
    assistantHourlyRate: 27.5, // hourly rate
    hourlyValueOfTime: 75
  })

  const [results, setResults] = useState<ROIResults>({
    totalWeeklyTimeSaved: 0,
    totalMonthlyTimeSaved: 0,
    totalAnnualTimeSaved: 0,
    timeValueSaved: 0,
    assistantCostSavings: 0,
    assistantHourlyCostSavings: 0,
    totalAnnualSavings: 0,
    additionalCapacityHours: 0,
    potentialAdditionalTransactions: 0,
    additionalRevenue: 0,
    roiPercentage: 0,
    paybackPeriod: 0,
    taskSavingsBreakdown: {},
    assistantVsAutomationSavings: 0,
    assistantTotalAnnualCost: 0
  })

  const [animatedResults, setAnimatedResults] = useState<ROIResults>(results)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Get all tasks as an array
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

    // Calculate time savings for each task
    let totalWeeklyTimeSaved = 0
    const taskSavingsBreakdown: { [key: string]: number } = {}

    tasks.forEach(task => {
      const timeSaved = task.hoursPerWeek * (task.automationPotential / 100)
      totalWeeklyTimeSaved += timeSaved
      taskSavingsBreakdown[task.name] = timeSaved
    })

    const totalMonthlyTimeSaved = totalWeeklyTimeSaved * 4.33
    const totalAnnualTimeSaved = totalMonthlyTimeSaved * 12

    // Calculate financial impact
    const timeValueSaved = totalAnnualTimeSaved * inputs.hourlyValueOfTime

    // Assistant cost comparisons
    const assistantCostSavings = inputs.assistantSalary * (1 + inputs.assistantBenefits / 100) // Full-time salary + benefits
    const assistantHourlyCostSavings = totalAnnualTimeSaved * inputs.assistantHourlyRate // Hourly assistant cost
    const assistantTotalAnnualCost = assistantHourlyCostSavings // What you'd pay an hourly assistant

    const totalAnnualSavings = timeValueSaved + assistantHourlyCostSavings // Use hourly cost for main savings calculation

    // Calculate business growth potential
    const additionalCapacityHours = totalWeeklyTimeSaved * 0.7 // 70% can go to revenue activities
    const hoursPerTransaction = 25 // estimated hours per transaction
    const potentialAdditionalTransactions = (additionalCapacityHours * 52) / hoursPerTransaction
    const additionalRevenue = potentialAdditionalTransactions * inputs.avgCommissionPerTransaction

    // Estimated platform cost
    const estimatedAnnualCost = 12000 // $1000/month for comprehensive automation

    // Calculate ROI
    const totalBenefit = totalAnnualSavings + additionalRevenue
    const roiPercentage = ((totalBenefit - estimatedAnnualCost) / estimatedAnnualCost) * 100
    const paybackPeriod = estimatedAnnualCost / (totalBenefit / 12)

    // Calculate savings vs assistant
    const assistantVsAutomationSavings = assistantHourlyCostSavings - estimatedAnnualCost

    return {
      totalWeeklyTimeSaved: Math.round(totalWeeklyTimeSaved * 10) / 10,
      totalMonthlyTimeSaved: Math.round(totalMonthlyTimeSaved),
      totalAnnualTimeSaved: Math.round(totalAnnualTimeSaved),
      timeValueSaved: Math.round(timeValueSaved),
      assistantCostSavings: Math.round(assistantCostSavings),
      assistantHourlyCostSavings: Math.round(assistantHourlyCostSavings),
      totalAnnualSavings: Math.round(totalAnnualSavings),
      additionalCapacityHours: Math.round(additionalCapacityHours * 10) / 10,
      potentialAdditionalTransactions: Math.round(potentialAdditionalTransactions * 10) / 10,
      additionalRevenue: Math.round(additionalRevenue),
      roiPercentage: Math.round(roiPercentage),
      paybackPeriod: Math.max(0.1, Math.round(paybackPeriod * 10) / 10),
      taskSavingsBreakdown,
      assistantVsAutomationSavings: Math.round(assistantVsAutomationSavings),
      assistantTotalAnnualCost: Math.round(assistantTotalAnnualCost)
    }
  }

  // Real-time calculation when inputs change
  useEffect(() => {
    const newResults = calculateROI()
    setResults(newResults)
  }, [inputs])

  // Animate values smoothly
  useEffect(() => {
    if (!isInView) return

    const timer = setTimeout(() => {
      setAnimatedResults(results)
    }, 300)

    return () => clearTimeout(timer)
  }, [results, isInView])

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
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold mb-8 rounded">
            <Calculator className="w-4 h-4 mr-2" />
            ROI Calculator
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Calculate Your Complete
            <span className="block text-gradient bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Business Automation ROI
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Get a detailed breakdown of task automation, time savings, cost comparisons, and revenue impact.
            See exactly how automation compares to hiring an assistant.
          </p>

        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Panel - Inputs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-5 space-y-8"
          >
            {/* Business Metrics */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-purple-600" />
                Business Metrics
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transactions Per Month
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="0.5"
                      value={inputs.transactionsPerMonth}
                      onChange={(e) => handleBusinessInputChange('transactionsPerMonth', parseFloat(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>1</span>
                      <span className="font-medium text-purple-600">{inputs.transactionsPerMonth} transactions</span>
                      <span>20</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Commission Per Transaction
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="3000"
                      max="25000"
                      step="500"
                      value={inputs.avgCommissionPerTransaction}
                      onChange={(e) => handleBusinessInputChange('avgCommissionPerTransaction', parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>$3K</span>
                      <span className="font-medium text-purple-600">{formatCurrency(inputs.avgCommissionPerTransaction)}</span>
                      <span>$25K</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Hourly Value
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="25"
                      max="200"
                      step="5"
                      value={inputs.hourlyValueOfTime}
                      onChange={(e) => handleBusinessInputChange('hourlyValueOfTime', parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>$25</span>
                      <span className="font-medium text-purple-600">${inputs.hourlyValueOfTime}/hr</span>
                      <span>$200</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Assistant Cost Comparison */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <UserCheck className="w-6 h-6 mr-3 text-orange-600" />
                Assistant Cost Comparison
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assistant Annual Salary
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="30000"
                      max="80000"
                      step="2500"
                      value={inputs.assistantSalary}
                      onChange={(e) => handleBusinessInputChange('assistantSalary', parseInt(e.target.value))}
                      className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>$30K</span>
                      <span className="font-medium text-orange-600">{formatCurrency(inputs.assistantSalary)}</span>
                      <span>$80K</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assistant Hourly Rate
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="20"
                      max="40"
                      step="2.5"
                      value={inputs.assistantHourlyRate}
                      onChange={(e) => handleBusinessInputChange('assistantHourlyRate', parseFloat(e.target.value))}
                      className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>$20</span>
                      <span className="font-medium text-orange-600">${inputs.assistantHourlyRate}/hr</span>
                      <span>$40</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Benefits Percentage (Salary Only)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="15"
                      max="40"
                      step="5"
                      value={inputs.assistantBenefits}
                      onChange={(e) => handleBusinessInputChange('assistantBenefits', parseInt(e.target.value))}
                      className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>15%</span>
                      <span className="font-medium text-orange-600">{inputs.assistantBenefits}%</span>
                      <span>40%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <div className="text-sm text-gray-600 mb-1">Hourly Assistant Cost (For These Tasks)</div>
                    <div className="text-xl font-bold text-orange-600">
                      {formatCurrency(animatedResults.assistantTotalAnnualCost)}
                      <span className="text-sm font-normal">/year</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {animatedResults.totalAnnualTimeSaved} hours × ${inputs.assistantHourlyRate}/hr
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Full-Time Assistant (Salary + Benefits)</div>
                    <div className="text-lg font-semibold text-gray-700">
                      {formatCurrency(inputs.assistantSalary * (1 + inputs.assistantBenefits / 100))}
                      <span className="text-sm font-normal">/year</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Panel - Results */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-7 space-y-8"
          >
            {/* Simple Comparison */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 mb-4 mx-auto">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">AI Automation</h4>
                <div className="text-3xl font-bold text-purple-600 mb-2">$12,000</div>
                <p className="text-sm text-gray-600 mb-4">per year</p>
                <div className="space-y-2 text-xs text-gray-600">
                  <div>• 24/7 availability</div>
                  <div>• Instant scaling</div>
                  <div>• No management needed</div>
                  <div>• Consistent quality</div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 mb-4 mx-auto">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">What An Assistant Would Cost</h4>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {formatCurrency(animatedResults.assistantTotalAnnualCost)}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {animatedResults.totalAnnualTimeSaved} hours × ${inputs.assistantHourlyRate}/hr
                </p>
                <div className="space-y-2 text-xs text-gray-600">
                  <div>• Limited availability</div>
                  <div>• Training required</div>
                  <div>• Management overhead</div>
                  <div>• Quality variance</div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-lg text-white text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4 mx-auto">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">You Save</h4>
                <div className="text-3xl font-bold mb-2">
                  {formatCurrency(animatedResults.assistantVsAutomationSavings)}
                </div>
                <p className="text-sm opacity-90 mb-4">vs hiring assistant</p>
                <div className="space-y-2 text-xs opacity-90">
                  <div>• {animatedResults.totalWeeklyTimeSaved}h/week saved</div>
                  <div>• {animatedResults.potentialAdditionalTransactions} more deals possible</div>
                  <div>• Focus on revenue activities</div>
                  <div>• Better work-life balance</div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Line */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Your Bottom Line</h3>

              <div className="text-5xl font-bold text-green-300 mb-2">
                {formatCurrency(animatedResults.timeValueSaved + animatedResults.assistantVsAutomationSavings + animatedResults.additionalRevenue)}
              </div>

              <p className="text-lg opacity-90 mb-6">Total Annual Value</p>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold">{animatedResults.totalWeeklyTimeSaved}h</div>
                  <div className="text-sm opacity-80">saved per week</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{animatedResults.roiPercentage}%</div>
                  <div className="text-sm opacity-80">ROI</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{animatedResults.paybackPeriod}mo</div>
                  <div className="text-sm opacity-80">payback</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Task Breakdown Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Detailed Task Breakdown</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getAllTasks().map((task, index) => (
              <motion.div
                key={task.name}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 mr-3">
                    <task.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{task.name}</h4>
                    <p className="text-xs text-gray-600">{task.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hours/Week:</span>
                    <span className="font-semibold">{task.hoursPerWeek}h</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tasks/Week:</span>
                    <span className="font-semibold">{task.tasksPerWeek}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Automation:</span>
                    <span className="font-semibold text-green-600">{task.automationPotential}%</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Time Saved:</span>
                      <span className="font-bold text-purple-600">
                        {(results.taskSavingsBreakdown[task.name] || 0).toFixed(1)}h/week
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Simple Summary */}
        <motion.div
          variants={itemVariants}
          className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">The Simple Truth</h3>
            <p className="text-gray-600 mb-8">Based on {animatedResults.totalAnnualTimeSaved} hours of tasks at ${inputs.assistantHourlyRate}/hour</p>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500 mb-4 mx-auto">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Hiring an Assistant Would Cost You</h4>
                <div className="text-4xl font-bold text-orange-600 mb-3">
                  {formatCurrency(animatedResults.assistantTotalAnnualCost)}
                </div>
                <p className="text-sm text-gray-600 mb-2">per year for the same tasks</p>
                <p className="text-xs text-orange-600 font-medium">
                  {animatedResults.totalAnnualTimeSaved} hours × ${inputs.assistantHourlyRate}/hour
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500 mb-4 mx-auto">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">AI Automation Costs You</h4>
                <div className="text-4xl font-bold text-purple-600 mb-3">$12,000</div>
                <p className="text-sm text-gray-600 mb-2">per year with better results</p>
                <p className="text-xs text-purple-600 font-medium">24/7 availability + no management</p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t-2 border-green-300">
              <h4 className="text-2xl font-bold text-green-600 mb-3">Your Clear Advantage</h4>
              <div className="text-5xl font-bold text-green-600 mb-2">
                {formatCurrency(animatedResults.assistantVsAutomationSavings)}
              </div>
              <p className="text-lg text-gray-700 font-medium">saved every year by choosing automation over hiring</p>
              <p className="text-sm text-gray-600 mt-2">Plus you get better reliability, 24/7 availability, and no management headaches</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}