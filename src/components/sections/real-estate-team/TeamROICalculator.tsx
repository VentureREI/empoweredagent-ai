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
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ROIInputs {
  teamSize: number
  avgDealsPerAgent: number
  avgCommission: number
  coordinationTime: number
  adminTime: number
  meetingTime: number
  leadDistributionTime: number
  reportingTime: number
  hourlyValue: number
}

interface ROIResults {
  weeklyTimeSavings: number
  monthlyTimeSavings: number
  annualTimeSavings: number
  monthlyValueSaved: number
  annualValueSaved: number
  additionalDealsPerAgent: number
  totalAdditionalDeals: number
  additionalRevenue: number
  teamEfficiencyGain: number
  roiPercentage: number
  paybackPeriod: number
}

const businessMetrics = [
  {
    id: 'team-time-savings',
    title: 'Team Time Savings',
    description: 'Total hours saved across team per week',
    icon: Clock,
    color: 'from-blue-500 to-blue-600',
    unit: 'hours/week'
  },
  {
    id: 'revenue-increase',
    title: 'Revenue Increase',
    description: 'Additional monthly team revenue',
    icon: DollarSign,
    color: 'from-green-500 to-green-600',
    unit: '$'
  },
  {
    id: 'efficiency-gain',
    title: 'Team Efficiency',
    description: 'Overall team productivity improvement',
    icon: TrendingUp,
    color: 'from-purple-500 to-purple-600',
    unit: '%'
  },
  {
    id: 'deal-capacity',
    title: 'Additional Deals',
    description: 'Extra deals closed per month by team',
    icon: Target,
    color: 'from-orange-500 to-orange-600',
    unit: 'deals'
  }
]

const industryBenchmarks = [
  {
    teamSize: '3-8 agents',
    avgSavings: '$24,000',
    timeReduction: '45 hours/week',
    additionalDeals: '8-12/month'
  },
  {
    teamSize: '8-15 agents',
    avgSavings: '$65,000',
    timeReduction: '85 hours/week',
    additionalDeals: '18-25/month'
  },
  {
    teamSize: '15-25 agents',
    avgSavings: '$140,000',
    timeReduction: '150 hours/week',
    additionalDeals: '35-50/month'
  }
]

const impactAreas = [
  {
    area: 'Lead Distribution',
    timeSaved: '80%',
    description: 'Automated lead scoring and assignment',
    icon: Users
  },
  {
    area: 'Team Coordination',
    timeSaved: '70%',
    description: 'Streamlined communication and workflows',
    icon: Sparkles
  },
  {
    area: 'Administrative Tasks',
    timeSaved: '85%',
    description: 'Automated reporting and documentation',
    icon: Briefcase
  },
  {
    area: 'Performance Tracking',
    timeSaved: '75%',
    description: 'Real-time analytics and dashboards',
    icon: BarChart3
  }
]

const presetTeams = [
  {
    name: 'Small Team',
    description: 'Growing team, 3-8 agents',
    inputs: {
      teamSize: 5,
      avgDealsPerAgent: 24,
      avgCommission: 8500,
      coordinationTime: 8,
      adminTime: 6,
      meetingTime: 4,
      leadDistributionTime: 5,
      reportingTime: 3,
      hourlyValue: 75
    }
  },
  {
    name: 'Mid-Size Team',
    description: 'Established team, 8-15 agents',
    inputs: {
      teamSize: 12,
      avgDealsPerAgent: 28,
      avgCommission: 9500,
      coordinationTime: 12,
      adminTime: 8,
      meetingTime: 6,
      leadDistributionTime: 8,
      reportingTime: 5,
      hourlyValue: 85
    }
  },
  {
    name: 'Large Team',
    description: 'High-performing team, 15+ agents',
    inputs: {
      teamSize: 20,
      avgDealsPerAgent: 32,
      avgCommission: 11000,
      coordinationTime: 15,
      adminTime: 10,
      meetingTime: 8,
      leadDistributionTime: 12,
      reportingTime: 7,
      hourlyValue: 95
    }
  }
]

export function TeamROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    teamSize: 8,
    avgDealsPerAgent: 26,
    avgCommission: 9000,
    coordinationTime: 10,
    adminTime: 7,
    meetingTime: 5,
    leadDistributionTime: 6,
    reportingTime: 4,
    hourlyValue: 80
  })

  const [results, setResults] = useState<ROIResults>({
    weeklyTimeSavings: 0,
    monthlyTimeSavings: 0,
    annualTimeSavings: 0,
    monthlyValueSaved: 0,
    annualValueSaved: 0,
    additionalDealsPerAgent: 0,
    totalAdditionalDeals: 0,
    additionalRevenue: 0,
    teamEfficiencyGain: 0,
    roiPercentage: 0,
    paybackPeriod: 0
  })

  const [animatedResults, setAnimatedResults] = useState<ROIResults>(results)
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const calculateROI = () => {
      // Time savings from automation per agent per week
      const coordinationSavings = inputs.coordinationTime * 0.70 // 70% automation
      const adminSavings = inputs.adminTime * 0.85 // 85% automation
      const meetingSavings = inputs.meetingTime * 0.50 // 50% automation (still need some meetings)
      const leadDistSavings = inputs.leadDistributionTime * 0.80 // 80% automation
      const reportingSavings = inputs.reportingTime * 0.75 // 75% automation

      const weeklyTimeSavingsPerAgent = coordinationSavings + adminSavings + meetingSavings + leadDistSavings + reportingSavings
      const weeklyTimeSavings = weeklyTimeSavingsPerAgent * inputs.teamSize
      const monthlyTimeSavings = weeklyTimeSavings * 4.33
      const annualTimeSavings = monthlyTimeSavings * 12

      // Value of time saved
      const monthlyValueSaved = monthlyTimeSavings * inputs.hourlyValue
      const annualValueSaved = monthlyValueSaved * 12

      // Additional capacity for deals - team synergy multiplier
      const additionalHoursForDeals = weeklyTimeSavingsPerAgent * 0.65 // 65% can go to deal-focused activities
      const hoursPerDeal = 15 // Estimated hours per deal
      const additionalDealsPerWeek = additionalHoursForDeals / hoursPerDeal
      const additionalDealsPerAgent = additionalDealsPerWeek * 4.33 // Monthly additional deals per agent

      // Team synergy bonus - teams are more efficient than sum of parts
      const teamSynergyMultiplier = 1 + (Math.min(inputs.teamSize, 20) * 0.02) // 2% bonus per agent, max 40%
      const effectiveAdditionalDeals = additionalDealsPerAgent * teamSynergyMultiplier
      const totalAdditionalDeals = effectiveAdditionalDeals * inputs.teamSize

      // Additional revenue
      const additionalRevenue = totalAdditionalDeals * inputs.avgCommission

      // Team efficiency gain
      const currentTeamDeals = inputs.teamSize * inputs.avgDealsPerAgent
      const newTeamDeals = currentTeamDeals + (effectiveAdditionalDeals * inputs.teamSize * 12) // Annual
      const teamEfficiencyGain = ((newTeamDeals - currentTeamDeals) / currentTeamDeals) * 100

      // Estimated platform cost (scaled for team)
      const baseCost = 800
      const perAgentCost = 200
      const estimatedMonthlyCost = baseCost + (inputs.teamSize * perAgentCost)
      const roiPercentage = ((monthlyValueSaved + additionalRevenue - estimatedMonthlyCost) / estimatedMonthlyCost) * 100
      const paybackPeriod = estimatedMonthlyCost / (monthlyValueSaved + additionalRevenue - estimatedMonthlyCost)

      const newResults: ROIResults = {
        weeklyTimeSavings: Math.round(weeklyTimeSavings * 10) / 10,
        monthlyTimeSavings: Math.round(monthlyTimeSavings),
        annualTimeSavings: Math.round(annualTimeSavings),
        monthlyValueSaved: Math.round(monthlyValueSaved),
        annualValueSaved: Math.round(annualValueSaved),
        additionalDealsPerAgent: Math.round(effectiveAdditionalDeals * 10) / 10,
        totalAdditionalDeals: Math.round(totalAdditionalDeals * 10) / 10,
        additionalRevenue: Math.round(additionalRevenue),
        teamEfficiencyGain: Math.round(teamEfficiencyGain),
        roiPercentage: Math.round(roiPercentage),
        paybackPeriod: Math.max(0.1, Math.round(paybackPeriod * 10) / 10)
      }

      return newResults
    }


  const handleInputChange = (field: keyof ROIInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }))
    setSelectedTeam(null)
  }

  const handleTeamSelect = (team: typeof presetTeams[0]) => {
    setInputs(team.inputs)
    setSelectedTeam(team.name)
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
            Team ROI Calculator
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Calculate Your Team's
            <span className="block text-gradient bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Productivity & Revenue Impact
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See exactly how much time and money your team will save with AI automation, plus the additional deals you can close together.
            Based on real team performance data.
          </p>
        </motion.div>

        {/* Preset Teams */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Quick Start: Choose Your Team Profile</h3>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {presetTeams.map((team, index) => (
              <button
                key={index}
                onClick={() => handleTeamSelect(team)}
                className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                  selectedTeam === team.name
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <h4 className="font-semibold text-gray-900 mb-2">{team.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{team.description}</p>
                <div className="text-sm text-purple-600 font-medium">
                  {team.inputs.teamSize} agents • {team.inputs.avgDealsPerAgent} deals/agent/year
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
              Your Team's Current Activity
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Size
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="3"
                      max="50"
                      value={inputs.teamSize}
                      onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>3</span>
                      <span className="font-medium text-purple-600">{inputs.teamSize} agents</span>
                      <span>50+</span>
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
                    Average Commission
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="3000"
                      max="25000"
                      step="500"
                      value={inputs.avgCommission}
                      onChange={(e) => handleInputChange('avgCommission', parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>$3K</span>
                      <span className="font-medium text-purple-600">{formatCurrency(inputs.avgCommission)}</span>
                      <span>$25K+</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value Per Hour
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="25"
                      max="200"
                      step="5"
                      value={inputs.hourlyValue}
                      onChange={(e) => handleInputChange('hourlyValue', parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>$25</span>
                      <span className="font-medium text-purple-600">${inputs.hourlyValue}/hr</span>
                      <span>$200+</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Weekly Time Breakdown (hours/agent)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Coordination
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="2"
                        max="25"
                        value={inputs.coordinationTime}
                        onChange={(e) => handleInputChange('coordinationTime', parseInt(e.target.value))}
                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="text-center text-sm font-medium text-purple-600">{inputs.coordinationTime}h/week</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Tasks
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="2"
                        max="20"
                        value={inputs.adminTime}
                        onChange={(e) => handleInputChange('adminTime', parseInt(e.target.value))}
                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="text-center text-sm font-medium text-purple-600">{inputs.adminTime}h/week</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meetings
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="1"
                        max="15"
                        value={inputs.meetingTime}
                        onChange={(e) => handleInputChange('meetingTime', parseInt(e.target.value))}
                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="text-center text-sm font-medium text-purple-600">{inputs.meetingTime}h/week</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lead Distribution
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="2"
                        max="20"
                        value={inputs.leadDistributionTime}
                        onChange={(e) => handleInputChange('leadDistributionTime', parseInt(e.target.value))}
                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="text-center text-sm font-medium text-purple-600">{inputs.leadDistributionTime}h/week</div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reporting & Analytics
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="1"
                        max="15"
                        value={inputs.reportingTime}
                        onChange={(e) => handleInputChange('reportingTime', parseInt(e.target.value))}
                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="text-center text-sm font-medium text-purple-600">{inputs.reportingTime}h/week</div>
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
                    {metric.id === 'team-time-savings' && `${animatedResults.weeklyTimeSavings} ${metric.unit}`}
                    {metric.id === 'revenue-increase' && `${formatCurrency(animatedResults.additionalRevenue)}`}
                    {metric.id === 'efficiency-gain' && `${animatedResults.teamEfficiencyGain}%`}
                    {metric.id === 'deal-capacity' && `+${animatedResults.totalAdditionalDeals} ${metric.unit}`}
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
                Annual Team Impact
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
                  <div className="text-sm opacity-80">{(animatedResults.totalAdditionalDeals * 12).toFixed(1)} more deals</div>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Team Automation Impact Areas</h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Team Performance Benchmarks</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {industryBenchmarks.map((benchmark, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">{benchmark.teamSize}</h4>
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
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}