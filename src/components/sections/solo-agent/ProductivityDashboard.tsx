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
  Briefcase
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const dashboardMetrics = [
  {
    id: 'leads',
    title: 'Active Leads',
    value: 47,
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
    description: 'This month'
  },
  {
    id: 'appointments',
    title: 'Appointments',
    value: 23,
    change: '+8%',
    trend: 'up',
    icon: Calendar,
    color: 'text-green-600',
    bgColor: 'bg-green-500/10',
    description: 'This week'
  },
  {
    id: 'listings',
    title: 'Active Listings',
    value: 12,
    change: '+3',
    trend: 'up',
    icon: Home,
    color: 'text-purple-600',
    bgColor: 'bg-purple-500/10',
    description: 'Properties'
  },
  {
    id: 'pipeline',
    title: 'Pipeline Value',
    value: '$2.8M',
    change: '+18%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-orange-600',
    bgColor: 'bg-orange-500/10',
    description: 'Total value'
  }
]

const recentActivities = [
  {
    id: 1,
    type: 'lead',
    title: 'New lead captured',
    description: 'Michael Chen - Looking for 3BR home in Scottsdale',
    time: '2 min ago',
    icon: Users,
    color: 'text-blue-600',
    priority: 'high'
  },
  {
    id: 2,
    type: 'appointment',
    title: 'Showing scheduled',
    description: '123 Main St - Tomorrow at 2:00 PM',
    time: '15 min ago',
    icon: Calendar,
    color: 'text-green-600',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'communication',
    title: 'Follow-up sent',
    description: 'AI sent personalized email to Sarah Johnson',
    time: '1 hour ago',
    icon: Mail,
    color: 'text-purple-600',
    priority: 'low'
  },
  {
    id: 4,
    type: 'listing',
    title: 'Price adjustment',
    description: '456 Oak Ave reduced by $10K',
    time: '2 hours ago',
    icon: Home,
    color: 'text-orange-600',
    priority: 'medium'
  },
  {
    id: 5,
    type: 'deal',
    title: 'Offer received',
    description: '$425K offer on 789 Pine St',
    time: '3 hours ago',
    icon: FileText,
    color: 'text-cyan-600',
    priority: 'high'
  }
]

const upcomingTasks = [
  {
    id: 1,
    task: 'Property showing at 2:00 PM',
    client: 'Johnson Family',
    location: '123 Main St, Phoenix',
    priority: 'high',
    automated: false,
    time: '2:00 PM',
    duration: '1 hour'
  },
  {
    id: 2,
    task: 'Follow up with buyer leads',
    client: 'AI Assistant',
    location: 'Automated',
    priority: 'medium',
    automated: true,
    time: '3:30 PM',
    duration: '30 min'
  },
  {
    id: 3,
    task: 'Market analysis for seller',
    client: 'Martinez Property',
    location: 'Virtual meeting',
    priority: 'medium',
    automated: false,
    time: '4:00 PM',
    duration: '45 min'
  },
  {
    id: 4,
    task: 'Social media content posting',
    client: 'Marketing AI',
    location: 'Automated',
    priority: 'low',
    automated: true,
    time: '5:00 PM',
    duration: '15 min'
  }
]

const leadSources = [
  { source: 'Website', leads: 18, percentage: 35, color: 'bg-blue-500' },
  { source: 'Social Media', leads: 12, percentage: 25, color: 'bg-purple-500' },
  { source: 'Referrals', leads: 10, percentage: 20, color: 'bg-green-500' },
  { source: 'Zillow', leads: 6, percentage: 12, color: 'bg-orange-500' },
  { source: 'Other', leads: 4, percentage: 8, color: 'bg-gray-500' }
]

const weeklyPerformance = [
  { day: 'Mon', leads: 8, appointments: 3, closings: 1 },
  { day: 'Tue', leads: 12, appointments: 5, closings: 0 },
  { day: 'Wed', leads: 6, appointments: 2, closings: 2 },
  { day: 'Thu', leads: 15, appointments: 7, closings: 1 },
  { day: 'Fri', leads: 10, appointments: 4, closings: 0 },
  { day: 'Sat', leads: 18, appointments: 8, closings: 1 },
  { day: 'Sun', leads: 5, appointments: 2, closings: 0 }
]

const aiInsights = [
  {
    type: 'opportunity',
    title: 'High-Value Lead Detected',
    description: 'New lead Michael Chen has pre-approval for $800K+',
    action: 'Schedule priority showing',
    priority: 'high',
    icon: Target
  },
  {
    type: 'warning',
    title: 'Listing Price Adjustment Needed',
    description: '456 Oak Ave is overpriced by 8% compared to recent sales',
    action: 'Suggest price reduction',
    priority: 'medium',
    icon: TrendingDown
  },
  {
    type: 'success',
    title: 'Perfect Match Found',
    description: 'New listing matches 3 buyer preferences',
    action: 'Send automated alerts',
    priority: 'high',
    icon: Heart
  },
  {
    type: 'reminder',
    title: 'Follow-up Opportunity',
    description: '5 leads haven\'t been contacted in 3+ days',
    action: 'Send re-engagement sequence',
    priority: 'medium',
    icon: Bell
  }
]

export function ProductivityDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedMetric, setSelectedMetric] = useState('leads')
  const [showNotifications, setShowNotifications] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
            Personal Productivity Dashboard
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8"
          >
            Your Business at
            <span className="block text-gradient bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Your Fingertips
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
          >
            Monitor your performance, track opportunities, and stay organized with an intelligent dashboard
            that adapts to your workflow and provides actionable insights.
          </motion.p>
        </motion.div>

        {/* Dashboard Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl"
        >
          {/* Dashboard Header */}
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white">Good afternoon, Sarah!</h3>
              <p className="text-gray-300">{formatDate(currentTime)} • {formatTime(currentTime)}</p>
            </div>
            <div className="flex items-center space-x-4">
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
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </Button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column - Metrics and Charts */}
            <div className="lg:col-span-8 space-y-8">
              {/* Key Metrics */}
              <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-6">
                {dashboardMetrics.map((metric, index) => {
                  const IconComponent = metric.icon
                  const isSelected = selectedMetric === metric.id

                  return (
                    <motion.div
                      key={metric.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMetric(metric.id)}
                      className={`cursor-pointer rounded-xl p-6 border-2 transition-all ${
                        isSelected
                          ? 'border-purple-500 bg-white/20'
                          : 'border-white/20 bg-white/10 hover:border-white/30'
                      }`}
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
                      <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                      <div className="text-sm text-gray-400">{metric.title}</div>
                      <div className="text-xs text-gray-500">{metric.description}</div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Performance Chart */}
              <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-bold text-white">Weekly Performance</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-300">Leads</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-300">Appointments</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-300">Closings</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-4 h-40">
                  {weeklyPerformance.map((day, index) => {
                    const maxValue = Math.max(...weeklyPerformance.map(d => Math.max(d.leads, d.appointments * 2, d.closings * 5)))

                    return (
                      <div key={day.day} className="flex flex-col justify-end space-y-1">
                        <div className="flex flex-col space-y-1">
                          <div
                            className="bg-blue-500 rounded-sm transition-all duration-500"
                            style={{ height: `${(day.leads / maxValue) * 120}px` }}
                          ></div>
                          <div
                            className="bg-green-500 rounded-sm transition-all duration-500"
                            style={{ height: `${(day.appointments * 2 / maxValue) * 120}px` }}
                          ></div>
                          <div
                            className="bg-purple-500 rounded-sm transition-all duration-500"
                            style={{ height: `${(day.closings * 5 / maxValue) * 120}px` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-400 text-center mt-2">{day.day}</div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Lead Sources */}
              <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-xl font-bold text-white mb-6">Lead Sources This Month</h4>
                <div className="space-y-4">
                  {leadSources.map((source, index) => (
                    <div key={source.source} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 ${source.color} rounded-full`}></div>
                        <span className="text-white font-medium">{source.source}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 bg-white/10 rounded-full h-2">
                          <div
                            className={`h-2 ${source.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-300 text-sm w-8 text-right">{source.leads}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Activities and Tasks */}
            <div className="lg:col-span-4 space-y-8">
              {/* AI Insights */}
              <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-bold text-white">AI Insights</h4>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-4">
                  {aiInsights.slice(0, 3).map((insight, index) => {
                    const IconComponent = insight.icon
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-l-4 ${
                          insight.priority === 'high'
                            ? 'bg-red-500/10 border-red-500'
                            : insight.priority === 'medium'
                            ? 'bg-yellow-500/10 border-yellow-500'
                            : 'bg-green-500/10 border-green-500'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <IconComponent className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <h5 className="font-semibold text-white text-sm">{insight.title}</h5>
                            <p className="text-gray-300 text-xs mb-2">{insight.description}</p>
                            <Button size="sm" className="text-xs bg-white/10 hover:bg-white/20 text-white">
                              {insight.action}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Recent Activities */}
              <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-bold text-white">Recent Activity</h4>
                  <Button size="sm" variant="outline" className="text-xs border-white/30 text-white">
                    <Eye className="w-3 h-3 mr-1" />
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentActivities.slice(0, 4).map((activity, index) => {
                    const IconComponent = activity.icon
                    return (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10`}>
                          <IconComponent className={`w-4 h-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-white text-sm">{activity.title}</h5>
                          <p className="text-gray-300 text-xs">{activity.description}</p>
                          <span className="text-gray-500 text-xs">{activity.time}</span>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          activity.priority === 'high' ? 'bg-red-400' :
                          activity.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                        }`}></div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Upcoming Tasks */}
              <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-bold text-white">Today's Schedule</h4>
                  <Button size="sm" className="text-xs bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-3 h-3 mr-1" />
                    Add Task
                  </Button>
                </div>
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div
                      key={task.id}
                      className={`p-3 rounded-lg border ${
                        task.priority === 'high'
                          ? 'border-red-500/30 bg-red-500/5'
                          : task.priority === 'medium'
                          ? 'border-yellow-500/30 bg-yellow-500/5'
                          : 'border-green-500/30 bg-green-500/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium text-sm">{task.time}</span>
                        {task.automated && (
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                            Auto
                          </span>
                        )}
                      </div>
                      <h5 className="font-semibold text-white text-sm mb-1">{task.task}</h5>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-xs">{task.client}</span>
                        <span className="text-gray-400 text-xs">{task.duration}</span>
                      </div>
                    </div>
                  ))}
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
              Experience Your Personal Dashboard
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              See how our AI-powered dashboard can transform your daily workflow and
              help you stay ahead of every opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Try Mobile App
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}