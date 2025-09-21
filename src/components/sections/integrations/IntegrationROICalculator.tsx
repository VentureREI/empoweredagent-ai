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
  hoursPerWeek: number
  hourlyRate: number
  dataEntryTime: number
  reportingTime: number
  followUpTime: number
  integrationCount: number
  dealVolume: number
}

interface ROIResults {
  weeklySavings: number
  monthlySavings: number
  annualSavings: number
  efficiencyGain: number
  roiPercentage: number
  paybackPeriod: number
  costReduction: number
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
    title: 'Cost Reduction',
    description: 'Monthly operational cost savings',
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
    description: 'Additional revenue from efficiency',
    icon: Target,
    color: 'from-orange-500 to-orange-600',
    unit: '$'
  }
]

const industryBenchmarks = [
  {
    teamSize: '1-5 agents',
    avgSavings: '$4,200',
    timeReduction: '12 hours/week',
    roi: '340%'
  },
  {
    teamSize: '6-15 agents',
    avgSavings: '$18,500',
    timeReduction: '35 hours/week',
    roi: '425%'
  },
  {
    teamSize: '16-50 agents',
    avgSavings: '$52,000',
    timeReduction: '95 hours/week',
    roi: '580%'
  },
  {
    teamSize: '50+ agents',
    avgSavings: '$125,000',
    timeReduction: '200+ hours/week',
    roi: '750%'
  }
]

const impactAreas = [
  {
    area: 'Data Entry Elimination',
    timeSaved: '85%',
    description: 'Automatic data sync between systems',
    icon: Zap
  },
  {
    area: 'Report Generation',
    timeSaved: '70%',
    description: 'Automated reporting and analytics',
    icon: BarChart3
  },
  {
    area: 'Lead Follow-up',
    timeSaved: '60%',
    description: 'Automated nurturing sequences',
    icon: Users
  },
  {
    area: 'Administrative Tasks',
    timeSaved: '75%',
    description: 'Streamlined workflows and processes',
    icon: Briefcase
  }
]

export function IntegrationROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    teamSize: 5,
    hoursPerWeek: 40,
    hourlyRate: 75,
    dataEntryTime: 8,
    reportingTime: 6,
    followUpTime: 10,
    integrationCount: 4,
    dealVolume: 50
  })

  const [results, setResults] = useState<ROIResults>({
    weeklySavings: 0,
    monthlySavings: 0,
    annualSavings: 0,
    efficiencyGain: 0,
    roiPercentage: 0,
    paybackPeriod: 0,
    costReduction: 0,
    revenueIncrease: 0
  })

  const [animatedResults, setAnimatedResults] = useState<ROIResults>(results)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Calculate ROI based on inputs
  useEffect(() => {
    const calculateROI = () => {
      const totalManualHours = inputs.dataEntryTime + inputs.reportingTime + inputs.followUpTime
      const automationEfficiency = Math.min(0.8, 0.1 + (inputs.integrationCount * 0.15)) // Max 80% efficiency
      const hoursSaved = totalManualHours * automationEfficiency
      const weeklySavings = hoursSaved * inputs.hourlyRate * inputs.teamSize
      const monthlySavings = weeklySavings * 4.33
      const annualSavings = monthlySavings * 12

      // Integration platform cost (estimated)
      const platformCost = 500 + (inputs.teamSize * 50) + (inputs.integrationCount * 100)
      const roiPercentage = ((annualSavings - platformCost * 12) / (platformCost * 12)) * 100
      const paybackPeriod = (platformCost * 12) / monthlySavings

      // Revenue increase from efficiency gains
      const revenueIncrease = inputs.dealVolume * 0.15 * 5000 * automationEfficiency // 15% more deals closed

      const newResults: ROIResults = {
        weeklySavings: Math.round(weeklySavings),
        monthlySavings: Math.round(monthlySavings),
        annualSavings: Math.round(annualSavings),
        efficiencyGain: Math.round(automationEfficiency * 100),
        roiPercentage: Math.round(roiPercentage),
        paybackPeriod: Math.round(paybackPeriod * 10) / 10,
        costReduction: Math.round(monthlySavings),
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
          [key]: key === 'paybackPeriod' ? Math.round(currentValue * 10) / 10 : Math.round(currentValue)
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
            ROI Calculator
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8"
          >
            Calculate Your Integration
            <span className="block text-gradient bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Return on Investment
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
          >
            Discover how much time and money you'll save by automating your real estate workflows.
            Get a personalized ROI analysis based on your team size and current processes.
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
                <Briefcase className="w-6 h-6 mr-3 text-purple-600" />
                Your Business Profile
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Size (Number of Agents)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={inputs.teamSize}
                    onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1</span>
                    <span className="font-semibold text-purple-600">{inputs.teamSize} agents</span>
                    <span>100+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Hourly Rate ($)
                  </label>
                  <input
                    type="range"
                    min="25"
                    max="200"
                    value={inputs.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>$25</span>
                    <span className="font-semibold text-purple-600">${inputs.hourlyRate}/hour</span>
                    <span>$200</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Deal Volume
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="500"
                    value={inputs.dealVolume}
                    onChange={(e) => handleInputChange('dealVolume', parseInt(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>5</span>
                    <span className="font-semibold text-purple-600">{inputs.dealVolume} deals/month</span>
                    <span>500+</span>
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
                    Data Entry & Management
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={inputs.dataEntryTime}
                    onChange={(e) => handleInputChange('dataEntryTime', parseInt(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1h</span>
                    <span className="font-semibold text-blue-600">{inputs.dataEntryTime} hours</span>
                    <span>20h</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Generation
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={inputs.reportingTime}
                    onChange={(e) => handleInputChange('reportingTime', parseInt(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1h</span>
                    <span className="font-semibold text-blue-600">{inputs.reportingTime} hours</span>
                    <span>15h</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Follow-up & Communication
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="25"
                    value={inputs.followUpTime}
                    onChange={(e) => handleInputChange('followUpTime', parseInt(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>2h</span>
                    <span className="font-semibold text-blue-600">{inputs.followUpTime} hours</span>
                    <span>25h</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Integrations Needed
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    value={inputs.integrationCount}
                    onChange={(e) => handleInputChange('integrationCount', parseInt(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>2</span>
                    <span className="font-semibold text-blue-600">{inputs.integrationCount} integrations</span>
                    <span>15+</span>
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
            {/* ROI Metrics Grid */}
            <motion.div
              variants={itemVariants}
              className="grid md:grid-cols-2 gap-6"
            >
              {businessMetrics.map((metric, index) => {
                const IconComponent = metric.icon
                let value: string | number = 0

                switch (metric.id) {
                  case 'time-savings':
                    value = Math.round((inputs.dataEntryTime + inputs.reportingTime + inputs.followUpTime) *
                           Math.min(0.8, 0.1 + (inputs.integrationCount * 0.15)) * inputs.teamSize)
                    break
                  case 'cost-reduction':
                    value = `$${animatedResults.monthlySavings.toLocaleString()}`
                    break
                  case 'efficiency-gain':
                    value = `${animatedResults.efficiencyGain}%`
                    break
                  case 'revenue-impact':
                    value = `$${animatedResults.revenueIncrease.toLocaleString()}`
                    break
                }

                return (
                  <motion.div
                    key={metric.id}
                    variants={itemVariants}
                    className="bg-white rounded-xl p-8 shadow-xl border border-gray-200 group hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {value}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      {metric.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {metric.description}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Main ROI Summary */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold flex items-center">
                  <Award className="w-6 h-6 mr-3" />
                  Your ROI Summary
                </h3>
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    ${animatedResults.annualSavings.toLocaleString()}
                  </div>
                  <div className="text-lg text-purple-100">
                    Annual Savings
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    {animatedResults.roiPercentage}%
                  </div>
                  <div className="text-lg text-purple-100">
                    ROI Percentage
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    {animatedResults.paybackPeriod}
                  </div>
                  <div className="text-lg text-purple-100">
                    Payback (Months)
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 flex-1"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Report
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-600 flex-1"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Results
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-600"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Demo
                </Button>
              </div>
            </motion.div>

            {/* Impact Areas */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Target className="w-6 h-6 mr-3 text-green-600" />
                Automation Impact Areas
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {impactAreas.map((area, index) => {
                  const IconComponent = area.icon
                  return (
                    <motion.div
                      key={area.area}
                      variants={itemVariants}
                      custom={index}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">{area.area}</h4>
                          <span className="text-lg font-bold text-green-600">{area.timeSaved}</span>
                        </div>
                        <p className="text-sm text-gray-600">{area.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Industry Benchmarks */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                Industry Benchmarks
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Team Size</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Avg. Monthly Savings</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Time Reduction</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Typical ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industryBenchmarks.map((benchmark, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{benchmark.teamSize}</td>
                        <td className="py-3 px-4 text-green-600 font-semibold">{benchmark.avgSavings}</td>
                        <td className="py-3 px-4 text-blue-600 font-semibold">{benchmark.timeReduction}</td>
                        <td className="py-3 px-4 text-purple-600 font-semibold">{benchmark.roi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}