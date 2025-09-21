'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  BarChart3, TrendingUp, PieChart, Target, DollarSign, Users,
  Clock, Star, Award, ArrowUp, ArrowDown, Filter, Eye
} from 'lucide-react'

const aggregatedMetrics = {
  totalClients: 156,
  totalRevenue: '$2.4B',
  averageROI: '847%',
  averageGrowthTime: '16.2 months',
  successRate: '94%',
  totalDeals: '12,847',
  avgSatisfaction: '4.8/5',
  totalAgents: '3,247'
}

const industryBreakdown = [
  {
    industry: 'Luxury Residential',
    percentage: 28,
    avgROI: '923%',
    caseCount: 44,
    avgRevenue: '$8.2M',
    color: 'bg-purple-500',
    growth: '+34%'
  },
  {
    industry: 'Commercial Real Estate',
    percentage: 23,
    avgROI: '756%',
    caseCount: 36,
    avgRevenue: '$24.7M',
    color: 'bg-blue-500',
    growth: '+28%'
  },
  {
    industry: 'Full-Service Brokerage',
    percentage: 19,
    avgROI: '634%',
    caseCount: 30,
    avgRevenue: '$18.4M',
    color: 'bg-green-500',
    growth: '+31%'
  },
  {
    industry: 'Vacation Rentals',
    percentage: 15,
    avgROI: '1,247%',
    caseCount: 23,
    avgRevenue: '$4.1M',
    color: 'bg-orange-500',
    growth: '+45%'
  },
  {
    industry: 'Rural/Ranch Properties',
    percentage: 10,
    avgROI: '542%',
    caseCount: 16,
    avgRevenue: '$6.8M',
    color: 'bg-indigo-500',
    growth: '+22%'
  },
  {
    industry: 'Ultra-Luxury',
    percentage: 5,
    avgROI: '789%',
    caseCount: 7,
    avgRevenue: '$12.1M',
    color: 'bg-amber-500',
    growth: '+38%'
  }
]

const teamSizeData = [
  {
    size: 'Small Teams (1-15 agents)',
    count: 67,
    avgROI: '1,123%',
    avgRevenue: '$3.2M',
    avgTimeframe: '12.4 months',
    successRate: '97%',
    topChallenge: 'Competing with larger firms',
    keyBenefit: 'Rapid implementation & agility'
  },
  {
    size: 'Medium Teams (16-50 agents)',
    count: 52,
    avgROI: '734%',
    avgRevenue: '$14.7M',
    avgTimeframe: '16.8 months',
    successRate: '93%',
    topChallenge: 'Scaling processes efficiently',
    keyBenefit: 'Balanced growth & control'
  },
  {
    size: 'Large Teams (51-100 agents)',
    count: 23,
    avgROI: '567%',
    avgRevenue: '$28.9M',
    avgTimeframe: '19.2 months',
    successRate: '91%',
    topChallenge: 'Managing complex operations',
    keyBenefit: 'Enterprise-level capabilities'
  },
  {
    size: 'Enterprise (100+ agents)',
    count: 14,
    avgROI: '423%',
    avgRevenue: '$67.3M',
    avgTimeframe: '24.1 months',
    successRate: '89%',
    topChallenge: 'Multi-office coordination',
    keyBenefit: 'Unified platform control'
  }
]

const timeToResults = [
  { timeframe: '0-3 months', metric: 'Initial Setup', percentage: 100, description: 'Platform deployment and training' },
  { timeframe: '3-6 months', metric: 'Early Wins', percentage: 87, description: 'Process improvements visible' },
  { timeframe: '6-12 months', metric: 'Significant Growth', percentage: 94, description: 'Major revenue increases' },
  { timeframe: '12-18 months', metric: 'Market Leadership', percentage: 76, description: 'Market share expansion' },
  { timeframe: '18+ months', metric: 'Transformation', percentage: 84, description: 'Complete business transformation' }
]

const regionalPerformance = [
  {
    region: 'California',
    cases: 42,
    avgROI: '923%',
    avgRevenue: '$12.4M',
    marketPenetration: '67%',
    topCity: 'Los Angeles'
  },
  {
    region: 'Texas',
    cases: 28,
    avgROI: '756%',
    avgRevenue: '$18.7M',
    marketPenetration: '54%',
    topCity: 'Dallas'
  },
  {
    region: 'Florida',
    cases: 24,
    avgROI: '1,089%',
    avgRevenue: '$8.9M',
    marketPenetration: '61%',
    topCity: 'Miami'
  },
  {
    region: 'New York',
    cases: 19,
    avgROI: '634%',
    avgRevenue: '$15.2M',
    marketPenetration: '43%',
    topCity: 'New York City'
  },
  {
    region: 'Illinois',
    cases: 16,
    avgROI: '567%',
    avgRevenue: '$22.1M',
    marketPenetration: '38%',
    topCity: 'Chicago'
  }
]

const benchmarkComparisons = [
  {
    metric: 'Revenue Growth',
    industry: '8-15%',
    platform: '423-1,247%',
    improvement: '28x better',
    description: 'Annual revenue increase'
  },
  {
    metric: 'Lead Conversion',
    industry: '12-18%',
    platform: '24-38%',
    improvement: '2.1x better',
    description: 'Lead to client conversion rate'
  },
  {
    metric: 'Agent Retention',
    industry: '68-75%',
    platform: '87-97%',
    improvement: '26% higher',
    description: 'Annual agent retention rate'
  },
  {
    metric: 'Time to Close',
    industry: '30-45 days',
    platform: '18-28 days',
    improvement: '38% faster',
    description: 'Average deal closing time'
  },
  {
    metric: 'Client Satisfaction',
    industry: '3.8-4.2/5',
    platform: '4.6-4.9/5',
    improvement: '18% higher',
    description: 'Client satisfaction scores'
  }
]

export default function MetricsVisualization() {
  const [activeView, setActiveView] = useState('overview')
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({})
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const animateValue = (key: string, targetValue: number) => {
      let current = 0
      const increment = targetValue / 100
      const timer = setInterval(() => {
        current += increment
        if (current >= targetValue) {
          current = targetValue
          clearInterval(timer)
        }
        setAnimatedValues(prev => ({ ...prev, [key]: current }))
      }, 20)
    }

    // Animate key metrics
    animateValue('totalRevenue', 2.4)
    animateValue('averageROI', 847)
    animateValue('successRate', 94)
    animateValue('totalClients', 156)
  }, [isInView])

  const viewOptions = [
    { id: 'overview', title: 'Overview', icon: BarChart3 },
    { id: 'industry', title: 'By Industry', icon: PieChart },
    { id: 'teamSize', title: 'By Team Size', icon: Users },
    { id: 'timeline', title: 'Time to Results', icon: Clock },
    { id: 'benchmarks', title: 'Benchmarks', icon: Target }
  ]

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BarChart3 className="h-4 w-4" />
            Comprehensive Analytics
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Success Metrics Across
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 block">
              All Case Studies
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dive deep into the data behind our success stories. Every metric verified,
            every trend analyzed, every insight actionable.
          </p>
        </motion.div>

        {/* Key Metrics Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            {
              label: 'Total Clients',
              value: animatedValues.totalClients || 0,
              suffix: '',
              icon: Users,
              color: 'text-blue-600',
              description: 'Verified case studies'
            },
            {
              label: 'Revenue Generated',
              value: animatedValues.totalRevenue || 0,
              suffix: 'B',
              prefix: '$',
              icon: DollarSign,
              color: 'text-green-600',
              description: 'By our clients'
            },
            {
              label: 'Average ROI',
              value: animatedValues.averageROI || 0,
              suffix: '%',
              icon: TrendingUp,
              color: 'text-purple-600',
              description: 'Return on investment'
            },
            {
              label: 'Success Rate',
              value: animatedValues.successRate || 0,
              suffix: '%',
              icon: Award,
              color: 'text-orange-600',
              description: 'Achieved target goals'
            }
          ].map((metric, index) => {
            const IconComponent = metric.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-purple-100 to-blue-100 mb-4`}>
                  <IconComponent className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {metric.prefix}{Math.round(metric.value)}{metric.suffix}
                </div>
                <div className="text-sm font-medium text-gray-900 mb-1">{metric.label}</div>
                <div className="text-xs text-gray-600">{metric.description}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {viewOptions.map((option) => {
              const IconComponent = option.icon
              return (
                <button
                  key={option.id}
                  onClick={() => setActiveView(option.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                    activeView === option.id
                      ? 'border-purple-300 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-purple-200'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {option.title}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Content Views */}
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-white/50"
        >
          {activeView === 'overview' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Regional Performance */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Top Performing Regions</h3>
                <div className="space-y-4">
                  {regionalPerformance.map((region, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-gray-900">{region.region}</div>
                        <div className="text-sm text-gray-600">{region.cases} case studies • {region.topCity}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{region.avgROI}</div>
                        <div className="text-sm text-gray-600">Avg ROI</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Success Timeline */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Typical Success Timeline</h3>
                <div className="space-y-4">
                  {timeToResults.map((phase, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">{phase.timeframe}</div>
                        <div className="text-sm font-semibold text-purple-600">{phase.percentage}%</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${phase.percentage}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        />
                      </div>
                      <div className="text-sm text-gray-600">{phase.description}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'industry' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-8">Performance by Industry Vertical</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {industryBreakdown.map((industry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-4 h-4 rounded-full ${industry.color}`}></div>
                      <div className="text-sm font-medium text-green-600">{industry.growth}</div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{industry.industry}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Market Share</span>
                        <span className="font-semibold">{industry.percentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg ROI</span>
                        <span className="font-semibold text-green-600">{industry.avgROI}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Case Count</span>
                        <span className="font-semibold">{industry.caseCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Revenue</span>
                        <span className="font-semibold">{industry.avgRevenue}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'teamSize' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-8">Performance by Team Size</h3>
              <div className="space-y-6">
                {teamSizeData.map((team, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200"
                  >
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">{team.size}</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-2xl font-bold text-green-600">{team.avgROI}</div>
                            <div className="text-sm text-gray-600">Average ROI</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-600">{team.count}</div>
                            <div className="text-sm text-gray-600">Case Studies</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-gray-900">{team.avgRevenue}</div>
                            <div className="text-sm text-gray-600">Avg Revenue</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-gray-900">{team.successRate}</div>
                            <div className="text-sm text-gray-600">Success Rate</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">Top Challenge</div>
                            <div className="text-gray-600">{team.topChallenge}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">Key Benefit</div>
                            <div className="text-gray-600">{team.keyBenefit}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">Avg Timeframe</div>
                            <div className="text-gray-600">{team.avgTimeframe}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'benchmarks' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-8">Industry Benchmark Comparisons</h3>
              <div className="space-y-6">
                {benchmarkComparisons.map((benchmark, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="grid lg:grid-cols-4 gap-6 items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{benchmark.metric}</h4>
                        <p className="text-sm text-gray-600">{benchmark.description}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Industry Average</div>
                        <div className="text-lg font-semibold text-gray-900">{benchmark.industry}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Our Platform</div>
                        <div className="text-lg font-semibold text-purple-600">{benchmark.platform}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Improvement</div>
                        <div className="text-lg font-bold text-green-600 flex items-center justify-center gap-1">
                          <ArrowUp className="h-4 w-4" />
                          {benchmark.improvement}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}