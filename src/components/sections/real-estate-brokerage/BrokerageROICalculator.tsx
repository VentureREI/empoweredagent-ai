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
  Building2,
  Activity,
  Award,
  Sparkles,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ROIInputs {
  agentCount: number
  avgDealsPerAgent: number
  avgCommissionRate: number
  avgTransactionValue: number
  managementTime: number
  complianceTime: number
  reportingTime: number
  coordinationTime: number
  adminTime: number
  hourlyValue: number
}

interface ROIResults {
  weeklyTimeSavings: number
  monthlyTimeSavings: number
  annualTimeSavings: number
  monthlyValueSaved: number
  annualValueSaved: number
  additionalTransactions: number
  additionalRevenue: number
  operationalEfficiencyGain: number
  agentRetentionImprovement: number
  roiPercentage: number
  paybackPeriod: number
}

const businessMetrics = [
  {
    id: 'operational-efficiency',
    title: 'Operational Efficiency',
    description: 'Total operational time saved per week',
    icon: Clock,
    color: 'from-blue-500 to-blue-600',
    unit: 'hours/week'
  },
  {
    id: 'revenue-growth',
    title: 'Revenue Growth',
    description: 'Additional monthly brokerage revenue',
    icon: DollarSign,
    color: 'from-green-500 to-green-600',
    unit: '$'
  },
  {
    id: 'efficiency-gain',
    title: 'Efficiency Gain',
    description: 'Overall brokerage productivity improvement',
    icon: TrendingUp,
    color: 'from-purple-500 to-purple-600',
    unit: '%'
  },
  {
    id: 'transaction-volume',
    title: 'Transaction Volume',
    description: 'Additional transactions processed monthly',
    icon: Target,
    color: 'from-orange-500 to-orange-600',
    unit: 'transactions'
  }
]

const industryBenchmarks = [
  {
    brokerageSize: '10-50 agents',
    avgSavings: '$85,000',
    timeReduction: '120 hours/week',
    additionalTransactions: '25-40/month'
  },
  {
    brokerageSize: '50-200 agents',
    avgSavings: '$280,000',
    timeReduction: '350 hours/week',
    additionalTransactions: '80-120/month'
  },
  {
    brokerageSize: '200+ agents',
    avgSavings: '$750,000',
    timeReduction: '800 hours/week',
    additionalTransactions: '200-350/month'
  }
]

const impactAreas = [
  {
    area: 'Agent Management',
    timeSaved: '75%',
    description: 'Automated onboarding and performance tracking',
    icon: Users
  },
  {
    area: 'Compliance Monitoring',
    timeSaved: '85%',
    description: 'Real-time compliance tracking and alerts',
    icon: Shield
  },
  {
    area: 'Financial Reporting',
    timeSaved: '90%',
    description: 'Automated commission and transaction reporting',
    icon: BarChart3
  },
  {
    area: 'Operations Coordination',
    timeSaved: '70%',
    description: 'Streamlined workflows and communication',
    icon: Building2
  }
]

const presetBrokerages = [
  {
    name: 'Growing Brokerage',
    description: 'Emerging brokerage, 10-50 agents',
    inputs: {
      agentCount: 25,
      avgDealsPerAgent: 22,
      avgCommissionRate: 3.5,
      avgTransactionValue: 425000,
      managementTime: 20,
      complianceTime: 15,
      reportingTime: 12,
      coordinationTime: 18,
      adminTime: 10,
      hourlyValue: 125
    }
  },
  {
    name: 'Established Brokerage',
    description: 'Professional brokerage, 50-200 agents',
    inputs: {
      agentCount: 85,
      avgDealsPerAgent: 28,
      avgCommissionRate: 3.2,
      avgTransactionValue: 475000,
      managementTime: 35,
      complianceTime: 25,
      reportingTime: 20,
      coordinationTime: 30,
      adminTime: 15,
      hourlyValue: 150
    }
  },
  {
    name: 'Enterprise Brokerage',
    description: 'Large brokerage, 200+ agents',
    inputs: {
      agentCount: 300,
      avgDealsPerAgent: 32,
      avgCommissionRate: 2.8,
      avgTransactionValue: 525000,
      managementTime: 50,
      complianceTime: 40,
      reportingTime: 30,
      coordinationTime: 45,
      adminTime: 20,
      hourlyValue: 175
    }
  }
]

export function BrokerageROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    agentCount: 75,
    avgDealsPerAgent: 26,
    avgCommissionRate: 3.0,
    avgTransactionValue: 450000,
    managementTime: 30,
    complianceTime: 20,
    reportingTime: 15,
    coordinationTime: 25,
    adminTime: 12,
    hourlyValue: 140
  })

  const [results, setResults] = useState<ROIResults>({
    weeklyTimeSavings: 0,
    monthlyTimeSavings: 0,
    annualTimeSavings: 0,
    monthlyValueSaved: 0,
    annualValueSaved: 0,
    additionalTransactions: 0,
    additionalRevenue: 0,
    operationalEfficiencyGain: 0,
    agentRetentionImprovement: 0,
    roiPercentage: 0,
    paybackPeriod: 0
  })

  const [animatedResults, setAnimatedResults] = useState<ROIResults>(results)
  const [selectedBrokerage, setSelectedBrokerage] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const calculateROI = () => {
      // Time savings from automation per week (management/admin level)
      const managementSavings = inputs.managementTime * 0.75 // 75% automation
      const complianceSavings = inputs.complianceTime * 0.85 // 85% automation
      const reportingSavings = inputs.reportingTime * 0.90 // 90% automation
      const coordinationSavings = inputs.coordinationTime * 0.70 // 70% automation
      const adminSavings = inputs.adminTime * 0.80 // 80% automation

      const weeklyTimeSavings = managementSavings + complianceSavings + reportingSavings + coordinationSavings + adminSavings
      const monthlyTimeSavings = weeklyTimeSavings * 4.33
      const annualTimeSavings = monthlyTimeSavings * 12

      // Value of time saved
      const monthlyValueSaved = monthlyTimeSavings * inputs.hourlyValue
      const annualValueSaved = monthlyValueSaved * 12

      // Current brokerage metrics
      const currentTransactions = inputs.agentCount * inputs.avgDealsPerAgent / 12 // Monthly
      const currentRevenue = currentTransactions * inputs.avgTransactionValue * (inputs.avgCommissionRate / 100)

      // Additional capacity and efficiency gains
      const operationalEfficiencyGain = 0.15 + (Math.min(inputs.agentCount, 500) * 0.0002) // Scale with size
      const agentRetentionImprovement = 0.20 // 20% better retention through better systems

      // Additional transactions from improved efficiency
      const additionalTransactions = currentTransactions * operationalEfficiencyGain
      const additionalRevenue = additionalTransactions * inputs.avgTransactionValue * (inputs.avgCommissionRate / 100)

      // Agent retention also contributes to revenue (avoiding turnover costs and maintaining production)
      const retentionValue = inputs.agentCount * 0.15 * 25000 // 15% fewer departures, $25K replacement cost per agent annually
      const retentionMonthlyValue = retentionValue / 12

      // Estimated platform cost (enterprise scale)
      const baseCost = 2000
      const perAgentCost = 150
      const estimatedMonthlyCost = baseCost + (inputs.agentCount * perAgentCost)

      const totalMonthlyBenefit = monthlyValueSaved + additionalRevenue + retentionMonthlyValue
      const roiPercentage = ((totalMonthlyBenefit - estimatedMonthlyCost) / estimatedMonthlyCost) * 100
      const paybackPeriod = estimatedMonthlyCost / (totalMonthlyBenefit - estimatedMonthlyCost)

      const newResults: ROIResults = {
        weeklyTimeSavings: Math.round(weeklyTimeSavings * 10) / 10,
        monthlyTimeSavings: Math.round(monthlyTimeSavings),
        annualTimeSavings: Math.round(annualTimeSavings),
        monthlyValueSaved: Math.round(monthlyValueSaved),
        annualValueSaved: Math.round(annualValueSaved),
        additionalTransactions: Math.round(additionalTransactions * 10) / 10,
        additionalRevenue: Math.round(additionalRevenue),
        operationalEfficiencyGain: Math.round(operationalEfficiencyGain * 100),
        agentRetentionImprovement: Math.round(agentRetentionImprovement * 100),
        roiPercentage: Math.round(roiPercentage),
        paybackPeriod: Math.max(0.1, Math.round(paybackPeriod * 10) / 10)
      }

      return newResults
    }


  const handleInputChange = (field: keyof ROIInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }))
    setSelectedBrokerage(null)
  }

  const handleBrokerageSelect = (brokerage: typeof presetBrokerages[0]) => {
    setInputs(brokerage.inputs)
    setSelectedBrokerage(brokerage.name)
  }

  // Real-time calculation when inputs change
  useEffect(() => {
    const newResults = calculateROI()
    setResults(newResults)
  }, [inputs])

  // Animate values smoothly
  useEffect(() => {
    if (!isInView) return

    const animateValue = (start: number, end: number, duration: number = 1000) => {
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const current = start + (end - start) * easeOutQuart

        return current
      }

      const step = (currentTime: number) => {
        const current = animate(currentTime)

        if (Math.abs(current - end) > 0.1) {
          requestAnimationFrame(step)
        } else {
          return end
        }
        return current
      }

      requestAnimationFrame(step)
    }

    const timer = setTimeout(() => {
      setAnimatedResults(results)
    }, 300)

    return () => clearTimeout(timer)
  }, [results, isInView])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.6),transparent)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full text-purple-700 text-sm font-semibold mb-8 border border-purple-200">
            <Calculator className="w-5 h-5 mr-2" />
            Brokerage ROI Calculator
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Calculate Your Brokerage's
            <span className="block text-gradient bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Operational & Revenue Impact
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See exactly how much operational efficiency and revenue growth your brokerage will achieve with enterprise AI automation.
            Based on real brokerage performance data.
          </p>
        </motion.div>

        {/* Preset Brokerages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Quick Start: Choose Your Brokerage Profile</h3>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {presetBrokerages.map((brokerage, index) => (
              <button
                key={index}
                onClick={() => handleBrokerageSelect(brokerage)}
                className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                  selectedBrokerage === brokerage.name
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <h4 className="font-semibold text-gray-900 mb-2">{brokerage.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{brokerage.description}</p>
                <div className="text-sm text-purple-600 font-medium">
                  {brokerage.inputs.agentCount} agents • {brokerage.inputs.avgDealsPerAgent} deals/agent/year
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Calculator Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-purple-600" />
              Your Brokerage's Current Operations
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Agents
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="10"
                      max="500"
                      value={inputs.agentCount}
                      onChange={(e) => handleInputChange('agentCount', parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>10</span>
                      <span className="font-medium text-purple-600">{inputs.agentCount} agents</span>
                      <span>500+</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deals/Agent/Year
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="12"
                      max="60"
                      value={inputs.avgDealsPerAgent}
                      onChange={(e) => handleInputChange('avgDealsPerAgent', parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>12</span>
                      <span className="font-medium text-purple-600">{inputs.avgDealsPerAgent} deals</span>
                      <span>60+</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Commission Rate (%)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1.5"
                      max="6.0"
                      step="0.1"
                      value={inputs.avgCommissionRate}
                      onChange={(e) => handleInputChange('avgCommissionRate', parseFloat(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>1.5%</span>
                      <span className="font-medium text-purple-600">{inputs.avgCommissionRate}%</span>
                      <span>6.0%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avg Transaction Value
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="200000"
                      max="1500000"
                      step="25000"
                      value={inputs.avgTransactionValue}
                      onChange={(e) => handleInputChange('avgTransactionValue', parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>$200K</span>
                      <span className="font-medium text-purple-600">{formatCurrency(inputs.avgTransactionValue)}</span>
                      <span>$1.5M+</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Management Hourly Value
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="50"
                    max="300"
                    step="10"
                    value={inputs.hourlyValue}
                    onChange={(e) => handleInputChange('hourlyValue', parseInt(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$50</span>
                    <span className="font-medium text-purple-600">${inputs.hourlyValue}/hr</span>
                    <span>$300+</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Weekly Management Time Breakdown (hours)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Agent Management
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="10"
                        max="80"
                        value={inputs.managementTime}
                        onChange={(e) => handleInputChange('managementTime', parseInt(e.target.value))}
                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="text-center text-sm font-medium text-purple-600">{inputs.managementTime}h/week</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Compliance & Legal
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="5"
                        max="60"
                        value={inputs.complianceTime}
                        onChange={(e) => handleInputChange('complianceTime', parseInt(e.target.value))}
                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="text-center text-sm font-medium text-purple-600">{inputs.complianceTime}h/week</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Financial Reporting
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={inputs.reportingTime}
                        onChange={(e) => handleInputChange('reportingTime', parseInt(e.target.value))}
                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="text-center text-sm font-medium text-purple-600">{inputs.reportingTime}h/week</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Operations Coordination
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="10"
                        max="70"
                        value={inputs.coordinationTime}
                        onChange={(e) => handleInputChange('coordinationTime', parseInt(e.target.value))}
                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="text-center text-sm font-medium text-purple-600">{inputs.coordinationTime}h/week</div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Administrative Tasks
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="5"
                        max="40"
                        value={inputs.adminTime}
                        onChange={(e) => handleInputChange('adminTime', parseInt(e.target.value))}
                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="text-center text-sm font-medium text-purple-600">{inputs.adminTime}h/week</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {businessMetrics.map((metric, index) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} mb-4`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{metric.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{metric.description}</p>
                  <div className="text-2xl font-bold text-gray-900">
                    {metric.id === 'operational-efficiency' && `${animatedResults.weeklyTimeSavings} ${metric.unit}`}
                    {metric.id === 'revenue-growth' && `${formatCurrency(animatedResults.additionalRevenue)}`}
                    {metric.id === 'efficiency-gain' && `${animatedResults.operationalEfficiencyGain}%`}
                    {metric.id === 'transaction-volume' && `+${animatedResults.additionalTransactions} ${metric.unit}`}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Annual Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3" />
                Annual Brokerage Impact
              </h3>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-sm opacity-80 mb-1">Time Saved</div>
                  <div className="text-3xl font-bold">{animatedResults.annualTimeSavings}h</div>
                  <div className="text-sm opacity-80">Worth {formatCurrency(animatedResults.annualValueSaved)}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80 mb-1">Additional Revenue</div>
                  <div className="text-3xl font-bold">{formatCurrency(animatedResults.additionalRevenue * 12)}</div>
                  <div className="text-sm opacity-80">{(animatedResults.additionalTransactions * 12).toFixed(1)} more transactions</div>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="text-sm opacity-80 mb-2">Total Annual Value</div>
                  <div className="text-4xl font-bold text-green-300">
                    {formatCurrency(animatedResults.annualValueSaved + (animatedResults.additionalRevenue * 12))}
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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Enterprise Automation Impact Areas</h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

            <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Agent Retention Improvement</h4>
                <p className="text-sm text-gray-600 mb-4">Better systems lead to improved agent satisfaction and retention</p>
                <div className="text-3xl font-bold text-purple-600">+{animatedResults.agentRetentionImprovement}%</div>
                <div className="text-xs text-gray-500 mt-1">Retention Increase</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Industry Benchmarks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Brokerage Performance Benchmarks</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {industryBenchmarks.map((benchmark, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">{benchmark.brokerageSize}</h4>
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
                    <span className="text-gray-600">More Transactions:</span>
                    <span className="font-semibold">{benchmark.additionalTransactions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}