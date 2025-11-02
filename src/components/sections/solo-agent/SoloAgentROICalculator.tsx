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
  Home
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ROIInputs {
  dealsPerMonth: number
  avgCommission: number
  hoursPerWeek: number
  leadGenTime: number
  adminTime: number
  followUpTime: number
  marketingTime: number
}

interface ROIResults {
  weeklySavings: number
  monthlySavings: number
  annualSavings: number
  efficiencyGain: number
  roiPercentage: number
  paybackPeriod: number
  additionalDeals: number
  revenueIncrease: number
}

const businessMetrics = [
  {
    id: 'time-savings',
    title: 'Time Savings',
    description: 'Hours saved per week through automation',
    icon: Clock,
    color: 'from-blue-500 to-blue-600',
    unit: 'hours/week'
  },
  {
    id: 'cost-reduction',
    title: 'Value Saved',
    description: 'Monthly value of time savings',
    icon: DollarSign,
    color: 'from-green-500 to-green-600',
    unit: '$'
  },
  {
    id: 'efficiency-gain',
    title: 'Efficiency Gain',
    description: 'Overall productivity improvement',
    icon: TrendingUp,
    color: 'from-purple-500 to-purple-600',
    unit: '%'
  },
  {
    id: 'revenue-impact',
    title: 'Revenue Impact',
    description: 'Additional monthly revenue potential',
    icon: Target,
    color: 'from-orange-500 to-orange-600',
    unit: '$'
  }
]

const industryBenchmarks = [
  {
    agentType: 'New Agent',
    avgSavings: '$8,400',
    timeReduction: '15 hours/week',
    additionalDeals: '2-3/month'
  },
  {
    agentType: 'Growing Agent',
    avgSavings: '$18,500',
    timeReduction: '22 hours/week',
    additionalDeals: '4-6/month'
  },
  {
    agentType: 'Top Producer',
    avgSavings: '$35,000',
    timeReduction: '28 hours/week',
    additionalDeals: '8-12/month'
  }
]

const impactAreas = [
  {
    area: 'Lead Generation',
    timeSaved: '75%',
    description: 'AI-powered lead identification and scoring',
    icon: Users
  },
  {
    area: 'Administrative Tasks',
    timeSaved: '85%',
    description: 'Automated paperwork and data entry',
    icon: Briefcase
  },
  {
    area: 'Follow-up & Nurturing',
    timeSaved: '70%',
    description: 'Automated email sequences and reminders',
    icon: Calendar
  },
  {
    area: 'Marketing & Content',
    timeSaved: '80%',
    description: 'AI-generated listings and social content',
    icon: Sparkles
  }
]

export function SoloAgentROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    dealsPerMonth: 2.5,
    avgCommission: 9000,
    hoursPerWeek: 45,
    leadGenTime: 16,
    adminTime: 9,
    followUpTime: 14,
    marketingTime: 7
  })

  const [results, setResults] = useState<ROIResults>({
    weeklySavings: 0,
    monthlySavings: 0,
    annualSavings: 0,
    efficiencyGain: 0,
    roiPercentage: 0,
    paybackPeriod: 0,
    additionalDeals: 0,
    revenueIncrease: 0
  })

  const [animatedResults, setAnimatedResults] = useState<ROIResults>(results)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Calculate ROI based on inputs
  useEffect(() => {
    const calculateROI = () => {
      // Time savings from automation
      const leadGenSavings = inputs.leadGenTime * 0.75 // 75% automation
      const adminSavings = inputs.adminTime * 0.85 // 85% automation
      const followUpSavings = inputs.followUpTime * 0.70 // 70% automation
      const marketingSavings = inputs.marketingTime * 0.80 // 80% automation

      const weeklySavings = leadGenSavings + adminSavings + followUpSavings + marketingSavings
      const monthlySavings = weeklySavings * 4.33
      const annualSavings = monthlySavings * 12

      // Estimated hourly value for agent
      const hourlyValue = inputs.avgCommission / 15 // Roughly 15 hours per deal
      const savedValue = monthlySavings * hourlyValue

      // Additional capacity for deals
      const additionalHoursForDeals = weeklySavings * 0.6 // 60% can go to deal-focused activities
      const hoursPerDeal = 15 // Estimated hours per deal
      const additionalDealsPerWeek = additionalHoursForDeals / hoursPerDeal
      const additionalDeals = additionalDealsPerWeek * 4.33 // Monthly additional deals

      // Additional revenue
      const revenueIncrease = additionalDeals * inputs.avgCommission

      // Efficiency gain
      const currentDealsCapacity = (inputs.hoursPerWeek / hoursPerDeal) * 4.33
      const newDealsCapacity = currentDealsCapacity + additionalDeals
      const efficiencyGain = ((newDealsCapacity - currentDealsCapacity) / currentDealsCapacity) * 100

      // Estimated platform cost (conservative)
      const estimatedMonthlyCost = 800 // Conservative estimate for AI automation platform
      const roiPercentage = ((savedValue + revenueIncrease - estimatedMonthlyCost) / estimatedMonthlyCost) * 100
      const paybackPeriod = estimatedMonthlyCost / (savedValue + revenueIncrease - estimatedMonthlyCost)

      const newResults: ROIResults = {
        weeklySavings: Math.round(weeklySavings * 10) / 10,
        monthlySavings: Math.round(savedValue),
        annualSavings: Math.round(savedValue * 12),
        efficiencyGain: Math.round(efficiencyGain),
        roiPercentage: Math.round(roiPercentage),
        paybackPeriod: Math.max(0.1, Math.round(paybackPeriod * 10) / 10),
        additionalDeals: Math.round(additionalDeals * 10) / 10,
        revenueIncrease: Math.round(revenueIncrease)
      }

      setResults(newResults)
    }

    calculateROI()
  }, [inputs])

  // Animate results when they change
  useEffect(() => {
    const animateToValue = (key: keyof ROIResults) => {
      const startValue = animatedResults[key]
      const endValue = results[key]
      const duration = 1000
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)

        const currentValue = startValue + (endValue - startValue) * easeOutQuart

        setAnimatedResults(prev => ({
          ...prev,
          [key]: key === 'paybackPeriod' || key === 'additionalDeals' ? Math.round(currentValue * 10) / 10 : Math.round(currentValue)
        }))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }

    Object.keys(results).forEach(key => {
      animateToValue(key as keyof ROIResults)
    })
  }, [results])

  const handleInputChange = (field: keyof ROIInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }))
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
        duration: 0.5
      }
    }
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
    <section ref={ref} className="py-32 bg-gradient-to-br from-slate-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full text-purple-700 text-sm font-semibold mb-8 border border-purple-200"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Solo Agent ROI Calculator
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8"
          >
            Calculate Your AI Automation
            <span className="block text-gradient bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Return on Investment
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
          >
            Discover how much time and money you'll save by automating your real estate workflows.
            Get a personalized ROI analysis based on your current business metrics.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Panel - Calculator Inputs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-5 space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Home className="w-6 h-6 mr-3 text-purple-600" />
                Your Business Profile
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deals Per Month
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="15"
                    step="0.5"
                    value={inputs.dealsPerMonth}
                    onChange={(e) => handleInputChange('dealsPerMonth', parseFloat(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0.5</span>
                    <span className="font-semibold text-purple-600">{inputs.dealsPerMonth} deals/month</span>
                    <span>15+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Commission Per Deal ($)
                  </label>
                  <input
                    type="range"
                    min="3000"
                    max="25000"
                    step="500"
                    value={inputs.avgCommission}
                    onChange={(e) => handleInputChange('avgCommission', parseInt(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>$3K</span>
                    <span className="font-semibold text-purple-600">{formatCurrency(inputs.avgCommission)}</span>
                    <span>$25K+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Hours Per Week
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="70"
                    value={inputs.hoursPerWeek}
                    onChange={(e) => handleInputChange('hoursPerWeek', parseInt(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>20h</span>
                    <span className="font-semibold text-purple-600">{inputs.hoursPerWeek} hours/week</span>
                    <span>70h</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Activity className="w-6 h-6 mr-3 text-blue-600" />
                Current Time Spent (Hours/Week)
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lead Generation & Prospecting
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="30"
                    value={inputs.leadGenTime}
                    onChange={(e) => handleInputChange('leadGenTime', parseInt(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>2h</span>
                    <span className="font-semibold text-blue-600">{inputs.leadGenTime} hours</span>
                    <span>30h</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Administrative Tasks
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    value={inputs.adminTime}
                    onChange={(e) => handleInputChange('adminTime', parseInt(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>2h</span>
                    <span className="font-semibold text-blue-600">{inputs.adminTime} hours</span>
                    <span>20h</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Follow-up & Client Communication
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="25"
                    value={inputs.followUpTime}
                    onChange={(e) => handleInputChange('followUpTime', parseInt(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>3h</span>
                    <span className="font-semibold text-blue-600">{inputs.followUpTime} hours</span>
                    <span>25h</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marketing & Content Creation
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    value={inputs.marketingTime}
                    onChange={(e) => handleInputChange('marketingTime', parseInt(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>2h</span>
                    <span className="font-semibold text-blue-600">{inputs.marketingTime} hours</span>
                    <span>20h</span>
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
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-6">
              {businessMetrics.map((metric, index) => (
                <motion.div
                  key={metric.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} mb-4`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{metric.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{metric.description}</p>
                  <div className="text-2xl font-bold text-gray-900">
                    {metric.id === 'time-savings' && `${animatedResults.weeklySavings} ${metric.unit}`}
                    {metric.id === 'cost-reduction' && `${formatCurrency(animatedResults.monthlySavings)}`}
                    {metric.id === 'efficiency-gain' && `${animatedResults.efficiencyGain}%`}
                    {metric.id === 'revenue-impact' && `${formatCurrency(animatedResults.revenueIncrease)}`}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Annual Impact */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3" />
                Annual Impact Summary
              </h3>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-sm opacity-80 mb-1">Time Saved</div>
                  <div className="text-3xl font-bold">{(animatedResults.weeklySavings * 52).toFixed(0)}h</div>
                  <div className="text-sm opacity-80">Worth {formatCurrency(animatedResults.annualSavings)}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80 mb-1">Additional Revenue</div>
                  <div className="text-3xl font-bold">{formatCurrency(animatedResults.revenueIncrease * 12)}</div>
                  <div className="text-sm opacity-80">{(animatedResults.additionalDeals * 12).toFixed(1)} more deals</div>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="text-sm opacity-80 mb-2">Total Annual Value</div>
                  <div className="text-4xl font-bold text-green-300">
                    {formatCurrency(animatedResults.annualSavings + (animatedResults.revenueIncrease * 12))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span>ROI: {animatedResults.roiPercentage}%</span>
                <span>Payback: {animatedResults.paybackPeriod} months</span>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Impact Areas */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Automation Impact Areas</h3>
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactAreas.map((area, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 mb-4">
                    <area.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-2">{area.area}</div>
                  <div className="text-sm text-gray-600 mb-3">{area.description}</div>
                  <div className="text-2xl font-bold text-green-600">{area.timeSaved}</div>
                  <div className="text-xs text-gray-500">Time Saved</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Industry Benchmarks */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Industry Benchmarks</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {industryBenchmarks.map((benchmark, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
              >
                <h4 className="font-semibold text-gray-900 mb-4">{benchmark.agentType}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Savings:</span>
                    <span className="font-semibold">{benchmark.avgSavings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Reduction:</span>
                    <span className="font-semibold">{benchmark.timeReduction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">More Deals:</span>
                    <span className="font-semibold">{benchmark.additionalDeals}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}