'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Building2, Users, DollarSign, TrendingUp, Award, Target,
  BarChart3, PieChart, Activity, Star, Zap, ArrowRight,
  MapPin, Calendar, Clock, AlertCircle, CheckCircle
} from 'lucide-react'

const typewriterPhrases = [
  'Scale Your Brokerage Operations',
  'Maximize Agent Performance',
  'Automate Commission Tracking',
  'Optimize Lead Distribution',
  'Transform Market Analytics',
  'Streamline Compliance Management'
]

const brokerageStats = [
  {
    label: 'Brokerage Revenue',
    value: '$847M',
    change: '+234%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600',
    description: 'Total brokerage production'
  },
  {
    label: 'Active Agents',
    value: 1247,
    change: '+89%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600',
    description: 'Licensed professionals'
  },
  {
    label: 'Market Share',
    value: '28.4%',
    change: '+156%',
    trend: 'up',
    icon: PieChart,
    color: 'text-purple-600',
    description: 'Local market dominance'
  },
  {
    label: 'Avg Commission',
    value: '3.2%',
    change: '+67%',
    trend: 'up',
    icon: Award,
    color: 'text-orange-600',
    description: 'Commission optimization'
  }
]

const topAgents = [
  {
    rank: 1,
    name: 'Sarah Martinez',
    avatar: '/agents/sarah.jpg',
    production: '$24.8M',
    deals: 127,
    commission: '$847K',
    growth: '+234%',
    status: 'online',
    specialty: 'Luxury Homes'
  },
  {
    rank: 2,
    name: 'Michael Chen',
    avatar: '/agents/michael.jpg',
    production: '$19.2M',
    deals: 98,
    commission: '$621K',
    growth: '+189%',
    status: 'online',
    specialty: 'Commercial'
  },
  {
    rank: 3,
    name: 'Emily Rodriguez',
    avatar: '/agents/emily.jpg',
    production: '$16.7M',
    deals: 156,
    commission: '$534K',
    growth: '+167%',
    status: 'away',
    specialty: 'First-Time Buyers'
  },
  {
    rank: 4,
    name: 'David Park',
    avatar: '/agents/david.jpg',
    production: '$14.1M',
    deals: 89,
    commission: '$478K',
    growth: '+203%',
    status: 'online',
    specialty: 'Investment Properties'
  }
]

const realtimeActivities = [
  {
    id: 1,
    type: 'new_listing',
    agent: 'Sarah Martinez',
    action: 'Listed luxury home at $2.8M',
    location: 'Beverly Hills, CA',
    time: '2 min ago',
    value: '$2.8M',
    priority: 'high',
    icon: Building2,
    color: 'text-green-600'
  },
  {
    id: 2,
    type: 'deal_closed',
    agent: 'Michael Chen',
    action: 'Closed commercial property',
    location: 'Downtown LA, CA',
    time: '8 min ago',
    value: '$4.2M',
    priority: 'high',
    icon: CheckCircle,
    color: 'text-blue-600'
  },
  {
    id: 3,
    type: 'lead_assigned',
    agent: 'Emily Rodriguez',
    action: 'Received qualified lead',
    location: 'Santa Monica, CA',
    time: '12 min ago',
    value: 'High Value',
    priority: 'medium',
    icon: Target,
    color: 'text-purple-600'
  },
  {
    id: 4,
    type: 'showing_scheduled',
    agent: 'David Park',
    action: 'Scheduled property showing',
    location: 'Manhattan Beach, CA',
    time: '18 min ago',
    value: '$1.6M',
    priority: 'medium',
    icon: Calendar,
    color: 'text-orange-600'
  },
  {
    id: 5,
    type: 'contract_signed',
    agent: 'Lisa Thompson',
    action: 'Contract executed',
    location: 'Venice, CA',
    time: '24 min ago',
    value: '$1.2M',
    priority: 'high',
    icon: Award,
    color: 'text-indigo-600'
  }
]

const marketMetrics = [
  {
    market: 'Beverly Hills',
    avgPrice: '$3.2M',
    inventory: 124,
    dom: 28,
    trend: 'up',
    change: '+12%'
  },
  {
    market: 'Santa Monica',
    avgPrice: '$2.1M',
    inventory: 89,
    dom: 32,
    trend: 'up',
    change: '+8%'
  },
  {
    market: 'Manhattan Beach',
    avgPrice: '$2.8M',
    inventory: 67,
    dom: 25,
    trend: 'up',
    change: '+15%'
  },
  {
    market: 'Venice',
    avgPrice: '$1.4M',
    inventory: 156,
    dom: 41,
    trend: 'down',
    change: '-3%'
  }
]

export default function BrokerageHero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(brokerageStats.map(stat => ({ ...stat, currentValue: 0 })))
  const [currentActivity, setCurrentActivity] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Typewriter effect
  useEffect(() => {
    const currentString = typewriterPhrases[currentPhrase]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 1000 : 2000

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentString) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false)
        setCurrentPhrase((prev) => (prev + 1) % typewriterPhrases.length)
      } else {
        const nextText = isDeleting
          ? currentString.substring(0, displayText.length - 1)
          : currentString.substring(0, displayText.length + 1)
        setDisplayText(nextText)
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentPhrase, displayText, isDeleting])

  // Activity rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity(prev => (prev + 1) % realtimeActivities.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Animated stats
  useEffect(() => {
    const parseStatValue = (value: string | number): number => {
      if (typeof value === 'number') return value
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
      if (value.includes('M')) return numericValue * 1000000
      if (value.includes('K')) return numericValue * 1000
      if (value.includes('%')) return numericValue
      return numericValue
    }

    const interval = setInterval(() => {
      setAnimatedStats(prev => prev.map(stat => {
        const targetValue = parseStatValue(stat.value)
        const currentValue = stat.currentValue || 0
        const increment = targetValue / 100

        return {
          ...stat,
          currentValue: Math.min(currentValue + increment, targetValue)
        }
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const formatStatValue = (stat: any) => {
    if (stat.label === 'Brokerage Revenue') {
      return `$${(stat.currentValue / 1000000).toFixed(0)}M`
    } else if (stat.label === 'Market Share' || stat.label === 'Avg Commission') {
      return `${stat.currentValue.toFixed(1)}%`
    } else if (stat.label === 'Active Agents') {
      return Math.round(stat.currentValue).toString()
    } else {
      return stat.currentValue.toFixed(0)
    }
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.6),transparent)]" />

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Building2 className="h-4 w-4" />
                Real Estate Brokerage AI Platform
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  {displayText}
                </span>
                <span className="animate-pulse">|</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Transform your real estate brokerage with AI-powered management tools.
                Scale operations, maximize agent performance, and dominate your market.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Start Free Trial
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border border-gray-200 hover:border-purple-300 transition-all duration-200"
              >
                Schedule Demo
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {animatedStats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-purple-100 to-blue-100 mb-4`}>
                      <IconComponent className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {formatStatValue(stat)}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                    <div className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Right Content - Interactive Dashboard */}
          <motion.div variants={itemVariants} className="relative">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-lg">Brokerage Command Center</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm">Live</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Top Agents */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Top Performing Agents
                  </h4>
                  <div className="space-y-3">
                    {topAgents.slice(0, 3).map((agent, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {agent.rank}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{agent.name}</div>
                            <div className="text-sm text-gray-600">{agent.specialty}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{agent.production}</div>
                          <div className="text-sm text-green-600">{agent.growth}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Real-time Activity */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-500" />
                    Live Activity Feed
                  </h4>
                  <div className="space-y-3 max-h-48 overflow-hidden">
                    {realtimeActivities.slice(currentActivity, currentActivity + 3).map((activity, index) => {
                      const IconComponent = activity.icon
                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100"
                        >
                          <div className={`p-2 rounded-lg bg-gray-100`}>
                            <IconComponent className={`h-4 w-4 ${activity.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-xs text-gray-600">{activity.agent} • {activity.location}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-gray-500">{activity.time}</span>
                              <span className="text-xs font-medium text-purple-600">{activity.value}</span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Market Overview */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    Market Overview
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {marketMetrics.slice(0, 4).map((market, index) => (
                      <div key={index} className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                        <div className="font-medium text-gray-900 text-sm">{market.market}</div>
                        <div className="text-lg font-bold text-gray-900">{market.avgPrice}</div>
                        <div className={`text-xs font-medium ${market.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {market.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}