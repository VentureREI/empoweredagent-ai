'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  BarChart3, TrendingUp, PieChart, Activity, DollarSign, Users,
  Target, Award, Clock, MapPin, Calendar, ArrowUp, ArrowDown,
  Building2, Star, Zap, Eye, Filter, Download, RefreshCw
} from 'lucide-react'

const analyticsCategories = [
  {
    id: 'revenue',
    title: 'Revenue Analytics',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    id: 'agents',
    title: 'Agent Performance',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: 'market',
    title: 'Market Intelligence',
    icon: BarChart3,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    id: 'operations',
    title: 'Operations',
    icon: Activity,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
]

const kpiMetrics = [
  {
    label: 'Total Revenue',
    value: '$847.2M',
    change: '+23.4%',
    trend: 'up',
    period: 'vs last year',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    label: 'Commission Rate',
    value: '3.2%',
    change: '+0.3%',
    trend: 'up',
    period: 'vs last quarter',
    icon: Target,
    color: 'text-blue-600'
  },
  {
    label: 'Agent Productivity',
    value: '18.4',
    change: '+12.7%',
    trend: 'up',
    period: 'deals per agent',
    icon: Award,
    color: 'text-purple-600'
  },
  {
    label: 'Market Share',
    value: '28.4%',
    change: '+5.2%',
    trend: 'up',
    period: 'in primary markets',
    icon: PieChart,
    color: 'text-orange-600'
  }
]

const revenueData = [
  { month: 'Jan', revenue: 68.2, commission: 2.1, deals: 341 },
  { month: 'Feb', revenue: 72.1, commission: 2.3, deals: 367 },
  { month: 'Mar', revenue: 78.4, commission: 2.4, deals: 392 },
  { month: 'Apr', revenue: 82.7, commission: 2.6, deals: 421 },
  { month: 'May', revenue: 89.3, commission: 2.8, deals: 456 },
  { month: 'Jun', revenue: 94.1, commission: 3.0, deals: 478 },
  { month: 'Jul', revenue: 98.6, commission: 3.1, deals: 503 },
  { month: 'Aug', revenue: 103.2, commission: 3.2, deals: 529 },
  { month: 'Sep', revenue: 108.7, commission: 3.4, deals: 547 },
  { month: 'Oct', revenue: 114.3, commission: 3.5, deals: 572 },
  { month: 'Nov', revenue: 119.8, commission: 3.7, deals: 598 },
  { month: 'Dec', revenue: 125.4, commission: 3.8, deals: 621 }
]

const topPerformers = [
  {
    rank: 1,
    name: 'Sarah Martinez',
    revenue: '$24.8M',
    deals: 127,
    commission: '$847K',
    growth: '+234%',
    efficiency: 98,
    specialty: 'Luxury Residential'
  },
  {
    rank: 2,
    name: 'Michael Chen',
    revenue: '$19.2M',
    deals: 98,
    commission: '$621K',
    growth: '+189%',
    efficiency: 94,
    specialty: 'Commercial'
  },
  {
    rank: 3,
    name: 'Emily Rodriguez',
    revenue: '$16.7M',
    deals: 156,
    commission: '$534K',
    growth: '+167%',
    efficiency: 91,
    specialty: 'First-Time Buyers'
  },
  {
    rank: 4,
    name: 'David Park',
    revenue: '$14.1M',
    deals: 89,
    commission: '$478K',
    growth: '+203%',
    efficiency: 89,
    specialty: 'Investment Properties'
  },
  {
    rank: 5,
    name: 'Lisa Thompson',
    revenue: '$12.9M',
    deals: 134,
    commission: '$423K',
    growth: '+145%',
    efficiency: 87,
    specialty: 'Relocations'
  }
]

const marketSegments = [
  {
    segment: 'Luxury Homes',
    percentage: 35,
    revenue: '$296.5M',
    avgPrice: '$2.8M',
    deals: 106,
    growth: '+28%',
    color: 'bg-purple-500'
  },
  {
    segment: 'Mid-Range',
    percentage: 28,
    revenue: '$237.2M',
    avgPrice: '$850K',
    deals: 279,
    growth: '+15%',
    color: 'bg-blue-500'
  },
  {
    segment: 'Entry Level',
    percentage: 22,
    revenue: '$186.4M',
    avgPrice: '$425K',
    deals: 439,
    growth: '+12%',
    color: 'bg-green-500'
  },
  {
    segment: 'Commercial',
    percentage: 15,
    revenue: '$127.1M',
    avgPrice: '$1.2M',
    deals: 106,
    growth: '+31%',
    color: 'bg-orange-500'
  }
]

const operationalMetrics = [
  {
    metric: 'Lead Response Time',
    value: '2.1 min',
    target: '< 3 min',
    performance: 95,
    trend: 'up',
    change: '-45%'
  },
  {
    metric: 'Deal Cycle Time',
    value: '28 days',
    target: '< 30 days',
    performance: 87,
    trend: 'up',
    change: '-12%'
  },
  {
    metric: 'Client Satisfaction',
    value: '4.8/5',
    target: '> 4.5',
    performance: 96,
    trend: 'up',
    change: '+8%'
  },
  {
    metric: 'Agent Retention',
    value: '94%',
    target: '> 90%',
    performance: 98,
    trend: 'up',
    change: '+6%'
  }
]

export default function BrokerageAnalytics() {
  const [activeCategory, setActiveCategory] = useState('revenue')
  const [selectedTimeframe, setSelectedTimeframe] = useState('12m')
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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
            Business Intelligence Dashboard
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Data-Driven Insights for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 block">
              Smarter Decisions
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive analytics and reporting to optimize your brokerage performance,
            identify opportunities, and drive strategic growth.
          </p>
        </motion.div>

        {/* KPI Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {kpiMetrics.map((metric, index) => {
            const IconComponent = metric.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-white/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-gray-100`}>
                    <IconComponent className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    {metric.change}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-gray-600 font-medium">{metric.label}</div>
                <div className="text-gray-500 text-sm">{metric.period}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Analytics Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {analyticsCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'border-purple-300 bg-white shadow-lg'
                      : 'border-gray-200 bg-white hover:border-purple-200 hover:shadow-md'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${category.bgColor}`}>
                    <IconComponent className={`h-5 w-5 ${category.color}`} />
                  </div>
                  <span className="font-medium text-gray-900">{category.title}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Analytics Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeCategory === 'revenue' && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Revenue Chart */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-white/50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Revenue Trend</h3>
                    <div className="flex items-center gap-2">
                      <select className="text-sm border border-gray-200 rounded-lg px-3 py-1">
                        <option value="12m">Last 12 Months</option>
                        <option value="6m">Last 6 Months</option>
                        <option value="3m">Last 3 Months</option>
                      </select>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {revenueData.slice(-6).map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="font-medium text-gray-900">{data.month}</div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">${data.revenue}M</div>
                            <div className="text-sm text-gray-600">{data.deals} deals</div>
                          </div>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                              style={{ width: `${(data.revenue / 125) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market Segments */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-white/50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Revenue by Segment</h3>
                  <div className="space-y-4">
                    {marketSegments.map((segment, index) => (
                      <motion.div
                        key={index}
                        onHoverStart={() => setHoveredSegment(segment.segment)}
                        onHoverEnd={() => setHoveredSegment(null)}
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          hoveredSegment === segment.segment
                            ? 'border-purple-300 shadow-md transform scale-105'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold text-gray-900">{segment.segment}</div>
                          <div className="text-sm font-medium text-green-600">{segment.growth}</div>
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${segment.color}`}
                              style={{ width: `${segment.percentage}%` }}
                            />
                          </div>
                          <div className="text-sm font-medium text-gray-900">{segment.percentage}%</div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{segment.revenue}</span>
                          <span>{segment.deals} deals</span>
                          <span>Avg: {segment.avgPrice}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 'agents' && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-white/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Top Performing Agents</h3>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 text-sm border border-gray-200 rounded-lg px-3 py-1">
                      <Filter className="h-4 w-4" />
                      Filter
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Rank</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Agent</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Revenue</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Deals</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Commission</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Growth</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Efficiency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topPerformers.map((agent, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4 px-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {agent.rank}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-gray-900">{agent.name}</div>
                              <div className="text-sm text-gray-600">{agent.specialty}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-semibold text-gray-900">{agent.revenue}</td>
                          <td className="py-4 px-4 text-gray-900">{agent.deals}</td>
                          <td className="py-4 px-4 font-semibold text-green-600">{agent.commission}</td>
                          <td className="py-4 px-4 font-medium text-green-600">{agent.growth}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                                  style={{ width: `${agent.efficiency}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-900">{agent.efficiency}%</span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeCategory === 'operations' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-white/50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Operational KPIs</h3>
                  <div className="space-y-6">
                    {operationalMetrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-gray-900">{metric.metric}</div>
                          <div className={`text-sm font-medium ${
                            metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {metric.change}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                          <div className="text-sm text-gray-600">Target: {metric.target}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                              style={{ width: `${metric.performance}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{metric.performance}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border border-white/50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Insights</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <div className="font-semibold text-green-800">Strong Performance</div>
                      </div>
                      <p className="text-green-700 text-sm">Lead response time improved by 45% this quarter</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        <div className="font-semibold text-blue-800">Opportunity</div>
                      </div>
                      <p className="text-blue-700 text-sm">Deal cycle time can be reduced by optimizing documentation</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Star className="h-5 w-5 text-purple-600" />
                        <div className="font-semibold text-purple-800">Excellence</div>
                      </div>
                      <p className="text-purple-700 text-sm">Client satisfaction exceeds industry benchmarks</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}