'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Home,
  DollarSign,
  Clock,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  Target,
  Zap,
  Star,
  Award,
  Activity,
  Bell,
  Filter,
  Download,
  Settings,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Eye,
  Play,
  Pause,
  MoreHorizontal,
  Plus,
  Search,
  Smartphone,
  Globe,
  FileText,
  Heart,
  Coffee,
  Building,
  MapPin,
  Briefcase,
  Crown,
  Shield,
  UserCheck,
  PieChart,
  LineChart,
  Map,
  Network,
  GitBranch,
  Workflow,
  Layers,
  Share2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'

const teamMetrics = [
  {
    id: 'revenue',
    title: 'Team Revenue',
    value: 12800000,
    change: '+187%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-500/10',
    description: 'Monthly recurring'
  },
  {
    id: 'deals',
    title: 'Active Deals',
    value: 89,
    change: '+43%',
    trend: 'up',
    icon: Home,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
    description: 'In pipeline'
  },
  {
    id: 'agents',
    title: 'Active Agents',
    value: 24,
    change: '+60%',
    trend: 'up',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-500/10',
    description: 'Team members'
  },
  {
    id: 'conversion',
    title: 'Conversion Rate',
    value: 28.5,
    change: '+12%',
    trend: 'up',
    icon: Target,
    color: 'text-orange-600',
    bgColor: 'bg-orange-500/10',
    description: 'Lead to deal'
  }
]

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Team Leader',
    avatar: '/team/sarah.jpg',
    status: 'online',
    performance: {
      deals: 47,
      volume: 18200000,
      conversion: 32.5,
      satisfaction: 4.9
    },
    specialization: 'Luxury Homes',
    territory: 'Scottsdale',
    level: 'top-performer',
    activities: ['Closed $2.8M deal', 'Listing presentation at 3 PM'],
    goals: {
      monthly: { current: 15, target: 18, progress: 83 },
      quarterly: { current: 42, target: 50, progress: 84 }
    }
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Senior Agent',
    avatar: '/team/michael.jpg',
    status: 'busy',
    performance: {
      deals: 34,
      volume: 12800000,
      conversion: 28.1,
      satisfaction: 4.7
    },
    specialization: 'Commercial',
    territory: 'Downtown Phoenix',
    level: 'high-performer',
    activities: ['Client showing in progress', 'Contract review pending'],
    goals: {
      monthly: { current: 12, target: 15, progress: 80 },
      quarterly: { current: 34, target: 40, progress: 85 }
    }
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Listing Specialist',
    avatar: '/team/emily.jpg',
    status: 'online',
    performance: {
      deals: 28,
      volume: 9400000,
      conversion: 25.8,
      satisfaction: 4.8
    },
    specialization: 'Residential',
    territory: 'Tempe',
    level: 'rising-star',
    activities: ['Listed 3 new properties', 'Photography scheduled'],
    goals: {
      monthly: { current: 8, target: 12, progress: 67 },
      quarterly: { current: 28, target: 35, progress: 80 }
    }
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Buyer Agent',
    avatar: '/team/david.jpg',
    status: 'away',
    performance: {
      deals: 31,
      volume: 8900000,
      conversion: 22.4,
      satisfaction: 4.6
    },
    specialization: 'First-time Buyers',
    territory: 'Mesa',
    level: 'developing',
    activities: ['Buyer consultation at 2 PM', 'Pre-approval assistance'],
    goals: {
      monthly: { current: 9, target: 12, progress: 75 },
      quarterly: { current: 31, target: 36, progress: 86 }
    }
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Lead Coordinator',
    avatar: '/team/lisa.jpg',
    status: 'online',
    performance: {
      deals: 42,
      volume: 15100000,
      conversion: 35.2,
      satisfaction: 4.9
    },
    specialization: 'Lead Conversion',
    territory: 'All Markets',
    level: 'top-performer',
    activities: ['Qualified 12 leads today', 'Team meeting prep'],
    goals: {
      monthly: { current: 18, target: 20, progress: 90 },
      quarterly: { current: 42, target: 45, progress: 93 }
    }
  }
]

const recentActivities = [
  {
    id: 1,
    type: 'deal_closed',
    agent: 'Sarah Johnson',
    description: 'Closed luxury home for $2.8M in Scottsdale',
    amount: 2800000,
    time: '15 min ago',
    icon: Home,
    color: 'text-green-600',
    priority: 'high'
  },
  {
    id: 2,
    type: 'lead_converted',
    agent: 'Lisa Thompson',
    description: 'Converted lead to showing appointment',
    time: '32 min ago',
    icon: Target,
    color: 'text-blue-600',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'listing_added',
    agent: 'Emily Rodriguez',
    description: 'Added new $750K listing in Tempe',
    amount: 750000,
    time: '1 hour ago',
    icon: Plus,
    color: 'text-purple-600',
    priority: 'medium'
  },
  {
    id: 4,
    type: 'client_review',
    agent: 'Michael Chen',
    description: 'Received 5-star review from commercial client',
    time: '2 hours ago',
    icon: Star,
    color: 'text-yellow-600',
    priority: 'low'
  },
  {
    id: 5,
    type: 'goal_achieved',
    agent: 'David Park',
    description: 'Exceeded monthly goal by 120%',
    time: '3 hours ago',
    icon: Award,
    color: 'text-orange-600',
    priority: 'high'
  }
]

const teamGoals = [
  {
    category: 'Revenue',
    current: 8.4,
    target: 10.0,
    unit: 'M',
    progress: 84,
    trend: 'up',
    onTrack: true
  },
  {
    category: 'Deals Closed',
    current: 28,
    target: 35,
    unit: '',
    progress: 80,
    trend: 'up',
    onTrack: true
  },
  {
    category: 'Lead Response',
    current: 2.1,
    target: 2.0,
    unit: 'min',
    progress: 95,
    trend: 'down',
    onTrack: true
  },
  {
    category: 'Team Satisfaction',
    current: 4.8,
    target: 4.9,
    unit: '/5',
    progress: 98,
    trend: 'up',
    onTrack: true
  }
]

const performanceData = [
  { month: 'Jan', revenue: 6.2, deals: 18, agents: 20 },
  { month: 'Feb', revenue: 7.1, deals: 22, agents: 21 },
  { month: 'Mar', revenue: 8.5, deals: 26, agents: 22 },
  { month: 'Apr', revenue: 9.8, deals: 31, agents: 23 },
  { month: 'May', revenue: 11.2, deals: 35, agents: 24 },
  { month: 'Jun', revenue: 12.8, deals: 42, agents: 24 }
]

const leadDistribution = [
  { source: 'Website', leads: 45, percentage: 35, conversion: 28, color: 'bg-blue-500' },
  { source: 'Referrals', leads: 32, percentage: 25, conversion: 42, color: 'bg-green-500' },
  { source: 'Social Media', leads: 28, percentage: 22, conversion: 18, color: 'bg-purple-500' },
  { source: 'Zillow', leads: 15, percentage: 12, conversion: 15, color: 'bg-orange-500' },
  { source: 'Other', leads: 8, percentage: 6, conversion: 12, color: 'bg-gray-500' }
]

export default function TeamDashboard() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState('overview')
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleLeadFormSubmit = (formData: LeadFormData) => {
    console.log('Team assessment request:', formData)
    // Handle form submission here
    setIsLeadModalOpen(false)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const getPerformanceLevel = (level: string) => {
    switch (level) {
      case 'top-performer':
        return { color: 'text-green-600', bg: 'bg-green-500/20', icon: Crown }
      case 'high-performer':
        return { color: 'text-blue-600', bg: 'bg-blue-500/20', icon: Award }
      case 'rising-star':
        return { color: 'text-purple-600', bg: 'bg-purple-500/20', icon: Star }
      default:
        return { color: 'text-orange-600', bg: 'bg-orange-500/20', icon: TrendingUp }
    }
  }

  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full text-purple-300 text-sm font-semibold mb-8 border border-purple-500/30 backdrop-blur-sm"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Real-Time Team Performance Dashboard
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8"
          >
            Complete Team Visibility
            <span className="block text-gradient bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              At Your Fingertips
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
          >
            Monitor team performance, track individual progress, and identify opportunities
            with comprehensive analytics that update in real-time.
          </motion.p>
        </motion.div>

        {/* Main Dashboard Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl"
        >
          {/* Dashboard Header */}
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white">Team Performance Dashboard</h3>
              <p className="text-gray-300">Live data • Updated {formatTime(currentTime)}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Live Updates</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-white/30 text-white hover:bg-white hover:text-gray-900"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-6 mb-12">
            {teamMetrics.map((metric, index) => {
              const IconComponent = metric.icon

              return (
                <motion.div
                  key={metric.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${metric.color}`} />
                    </div>
                    <div className={`flex items-center text-sm font-semibold ${
                      metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {metric.trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                      {metric.change}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {metric.id === 'revenue' ? formatCurrency(metric.value) :
                     metric.id === 'conversion' ? `${metric.value}%` :
                     metric.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">{metric.title}</div>
                  <div className="text-xs text-gray-500">{metric.description}</div>
                </motion.div>
              )
            })}
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column - Team Performance */}
            <div className="lg:col-span-8 space-y-8">
              {/* Performance Chart */}
              <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-bold text-white">Team Performance Trends</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-300">Revenue</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-300">Deals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-300">Agents</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-4 h-48">
                  {performanceData.map((data, index) => {
                    const maxRevenue = Math.max(...performanceData.map(d => d.revenue))
                    const maxDeals = Math.max(...performanceData.map(d => d.deals))

                    return (
                      <div key={data.month} className="flex flex-col justify-end space-y-1">
                        <div className="flex flex-col justify-end space-y-1 h-40">
                          <div
                            className="bg-blue-500 rounded-sm transition-all duration-1000"
                            style={{ height: `${(data.revenue / maxRevenue) * 140}px` }}
                          ></div>
                          <div
                            className="bg-green-500 rounded-sm transition-all duration-1000"
                            style={{ height: `${(data.deals / maxDeals) * 100}px` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-400 text-center mt-2">{data.month}</div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Team Members Performance */}
              <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-bold text-white">Team Member Performance</h4>
                  <Button size="sm" variant="outline" className="text-xs border-white/30 text-white">
                    <Eye className="w-3 h-3 mr-1" />
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {teamMembers.slice(0, 4).map((member, index) => {
                    const performanceLevel = getPerformanceLevel(member.level)
                    const IconComponent = performanceLevel.icon

                    return (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all cursor-pointer"
                        onClick={() => setSelectedAgent(selectedAgent === member.name ? null : member.name)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                              <Users className="w-6 h-6 text-white" />
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                              member.status === 'online' ? 'bg-green-400' :
                              member.status === 'busy' ? 'bg-red-400' : 'bg-yellow-400'
                            }`}></div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-semibold">{member.name}</span>
                              <div className={`flex items-center px-2 py-1 rounded text-xs ${performanceLevel.bg} ${performanceLevel.color}`}>
                                <IconComponent className="w-3 h-3 mr-1" />
                                {member.level.replace('-', ' ')}
                              </div>
                            </div>
                            <div className="text-sm text-gray-400">{member.role} • {member.specialization}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">{member.performance.deals} deals</div>
                          <div className="text-sm text-gray-400">{formatCurrency(member.performance.volume)}</div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Lead Distribution */}
              <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-xl font-bold text-white mb-6">Lead Source Distribution</h4>
                <div className="space-y-4">
                  {leadDistribution.map((source, index) => (
                    <div key={source.source} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 ${source.color} rounded-full`}></div>
                        <span className="text-white font-medium">{source.source}</span>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="text-white font-semibold">{source.leads}</div>
                          <div className="text-xs text-gray-400">leads</div>
                        </div>
                        <div className="w-24 bg-white/10 rounded-full h-2">
                          <div
                            className={`h-2 ${source.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-semibold">{source.conversion}%</div>
                          <div className="text-xs text-gray-400">conversion</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Goals and Activity */}
            <div className="lg:col-span-4 space-y-8">
              {/* Team Goals */}
              <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-bold text-white">Team Goals</h4>
                  <Button size="sm" className="text-xs bg-purple-600 hover:bg-purple-700">
                    <Target className="w-3 h-3 mr-1" />
                    Set Goals
                  </Button>
                </div>
                <div className="space-y-4">
                  {teamGoals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-white">{goal.category}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          goal.onTrack ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {goal.onTrack ? 'On Track' : 'Behind'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-white/10 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              goal.onTrack ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400 w-16 text-right">
                          {goal.current}{goal.unit}/{goal.target}{goal.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-bold text-white">Recent Activity</h4>
                  <Button size="sm" variant="outline" className="text-xs border-white/30 text-white">
                    <Eye className="w-3 h-3 mr-1" />
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentActivities.slice(0, 5).map((activity, index) => {
                    const IconComponent = activity.icon
                    return (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          activity.priority === 'high' ? 'bg-green-500/20 text-green-400' :
                          activity.priority === 'medium' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-white font-medium">{activity.agent}</div>
                          <div className="text-sm text-gray-300">{activity.description}</div>
                          {activity.amount && (
                            <div className="text-sm text-green-400 font-semibold">
                              {formatCurrency(activity.amount)}
                            </div>
                          )}
                          <div className="text-xs text-gray-500">{activity.time}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-xl font-bold text-white mb-6">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    Assign Leads
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    Team Meeting
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-xs">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Performance Review
                  </Button>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-xs">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Send Update
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white"
          >
            <h3 className="text-3xl font-bold mb-6">
              Ready to Transform Your Team Management?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              See how our comprehensive dashboard can give you complete visibility
              and control over your real estate team's performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                onClick={() => setIsLeadModalOpen(true)}
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                <Play className="w-5 h-5 mr-2" />
                See Dashboard Demo
              </Button>
              <Button
                size="xl"
                variant="outline"
                onClick={() => setIsLeadModalOpen(true)}
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Team Assessment
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <LeadFormModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onSubmit={handleLeadFormSubmit}
      />
    </section>
  )
}