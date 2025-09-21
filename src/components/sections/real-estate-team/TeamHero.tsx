'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Users,
  Zap,
  ArrowRight,
  Calendar,
  Target,
  TrendingUp,
  Home,
  DollarSign,
  Clock,
  CheckCircle,
  Star,
  Award,
  Briefcase,
  Phone,
  Mail,
  MessageSquare,
  BarChart3,
  Globe,
  Smartphone,
  Heart,
  Coffee,
  Sparkles,
  Crown,
  Shield,
  UserCheck,
  Activity,
  Layers,
  Network,
  GitBranch,
  Workflow,
  Bell,
  Settings,
  PieChart,
  LineChart,
  Map,
  Filter,
  Share2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'

const typewriterPhrases = [
  'Scale Your Real Estate Team Exponentially',
  'Automate Lead Distribution & Follow-up',
  'Track Team Performance in Real-time',
  'Collaborate Seamlessly Across All Markets',
  'Build the Ultimate Real Estate Machine'
]

const teamStats = [
  {
    label: 'Team Revenue',
    value: '$12.8M',
    change: '+187%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600',
    description: 'Annual team production'
  },
  {
    label: 'Active Agents',
    value: 24,
    change: '+60%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600',
    description: 'Productive team members'
  },
  {
    label: 'Team Deals',
    value: 347,
    change: '+143%',
    trend: 'up',
    icon: Home,
    color: 'text-purple-600',
    description: 'Transactions closed'
  },
  {
    label: 'Response Time',
    value: '2.1 min',
    change: '-89%',
    trend: 'down',
    icon: Zap,
    color: 'text-orange-600',
    description: 'Average lead response'
  }
]

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Team Leader',
    avatar: '/team/sarah.jpg',
    status: 'online',
    deals: 47,
    volume: '$18.2M',
    specialization: 'Luxury Homes',
    performance: 95
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Senior Agent',
    avatar: '/team/michael.jpg',
    status: 'online',
    deals: 34,
    volume: '$12.8M',
    specialization: 'Commercial',
    performance: 88
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Listing Specialist',
    avatar: '/team/emily.jpg',
    status: 'away',
    deals: 28,
    volume: '$9.4M',
    specialization: 'Residential',
    performance: 92
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Buyer Agent',
    avatar: '/team/david.jpg',
    status: 'online',
    deals: 31,
    volume: '$8.9M',
    specialization: 'First-time Buyers',
    performance: 85
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Lead Coordinator',
    avatar: '/team/lisa.jpg',
    status: 'online',
    deals: 42,
    volume: '$15.1M',
    specialization: 'Lead Conversion',
    performance: 97
  }
]

const dailyActivities = [
  {
    id: 1,
    type: 'lead_assignment',
    message: 'AI assigned luxury lead to Sarah Johnson',
    time: '2 min ago',
    icon: Target,
    color: 'text-blue-600',
    priority: 'high'
  },
  {
    id: 2,
    type: 'deal_update',
    message: 'Michael Chen moved deal to under contract',
    time: '15 min ago',
    icon: Home,
    color: 'text-green-600',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'team_communication',
    message: 'Emily shared market analysis with team',
    time: '32 min ago',
    icon: Share2,
    color: 'text-purple-600',
    priority: 'low'
  },
  {
    id: 4,
    type: 'performance_alert',
    message: 'David exceeded monthly goal by 120%',
    time: '1 hour ago',
    icon: Award,
    color: 'text-orange-600',
    priority: 'high'
  },
  {
    id: 5,
    type: 'automation',
    message: 'AI sent 47 follow-up emails automatically',
    time: '2 hours ago',
    icon: Workflow,
    color: 'text-cyan-600',
    priority: 'medium'
  }
]

const teamGoals = [
  {
    goal: 'Monthly Revenue Target',
    current: 8.4,
    target: 10.0,
    unit: 'M',
    progress: 84,
    status: 'on-track'
  },
  {
    goal: 'Team Deals Closed',
    current: 28,
    target: 35,
    unit: '',
    progress: 80,
    status: 'on-track'
  },
  {
    goal: 'Lead Response Time',
    current: 2.1,
    target: 2.0,
    unit: 'min',
    progress: 95,
    status: 'excellent'
  },
  {
    goal: 'Client Satisfaction',
    current: 4.8,
    target: 4.9,
    unit: '/5',
    progress: 98,
    status: 'excellent'
  }
]

const quickActions = [
  {
    action: 'Assign Leads',
    icon: Users,
    color: 'bg-blue-600'
  },
  {
    action: 'Team Meeting',
    icon: Calendar,
    color: 'bg-green-600'
  },
  {
    action: 'Performance Review',
    icon: BarChart3,
    color: 'bg-purple-600'
  },
  {
    action: 'Send Update',
    icon: MessageSquare,
    color: 'bg-orange-600'
  }
]

export default function TeamHero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(teamStats.map(stat => ({ ...stat, currentValue: 0 })))
  const [currentActivity, setCurrentActivity] = useState(0)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleLeadFormSubmit = (formData: LeadFormData) => {
    console.log('Team demo request:', formData)
    // Handle form submission here
    setIsLeadModalOpen(false)
  }

  // Typewriter effect
  useEffect(() => {
    const currentString = typewriterPhrases[currentPhrase]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 1000 : 2000

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentString) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false)
        setCurrentPhrase((prev) => (prev + 1) % typewriterPhrases.length)
      } else {
        setDisplayText(prev =>
          isDeleting
            ? prev.slice(0, -1)
            : currentString.slice(0, prev.length + 1)
        )
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentPhrase])

  // Activity rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity(prev => (prev + 1) % dailyActivities.length)
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
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  }

  const formatStatValue = (stat: any) => {
    if (stat.label === 'Team Revenue') {
      return `$${(stat.currentValue / 1000000).toFixed(1)}M`
    } else if (stat.label === 'Response Time') {
      return `${stat.currentValue.toFixed(1)} min`
    } else if (stat.label === 'Active Agents' || stat.label === 'Team Deals') {
      return Math.round(stat.currentValue).toString()
    } else {
      // Fallback for any other stat types
      return stat.currentValue.toFixed(0)
    }
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-20">
          {/* Left Column - Content */}
          <motion.div
            className="flex-1 text-center lg:text-left mb-16 lg:mb-0"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full text-purple-300 text-sm font-semibold mb-8 border border-purple-500/30 backdrop-blur-sm"
            >
              <Crown className="w-5 h-5 mr-2" />
              Built for High-Performing Teams
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
            >
              <span className="block">Transform Your</span>
              <span className="block">Real Estate Team with</span>
              <span className="block text-gradient bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent min-h-[1.2em]">
                {displayText}
              </span>
              <span className="animate-pulse">|</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto lg:mx-0 leading-relaxed"
            >
              Empower your real estate team with AI that
              <span className="text-purple-400 font-semibold"> intelligently distributes leads</span>,
              <span className="text-blue-400 font-semibold"> tracks performance in real-time</span>, and
              <span className="text-cyan-400 font-semibold"> automates collaboration</span> to maximize every opportunity.
            </motion.p>

            {/* Team Performance Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {animatedStats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                      <div className={`ml-2 text-sm font-semibold ${
                        stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {stat.change}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {formatStatValue(stat)}
                    </div>
                    <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                    <div className="text-xs text-green-400">{stat.description}</div>
                  </div>
                )
              })}
            </motion.div>

            {/* Team Goals Progress */}
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-12"
            >
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                Team Goals Progress
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {teamGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white">{goal.goal}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        goal.status === 'excellent' ? 'bg-green-500/20 text-green-400' :
                        goal.status === 'on-track' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {goal.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            goal.status === 'excellent' ? 'bg-green-500' :
                            goal.status === 'on-track' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">
                        {goal.current}{goal.unit}/{goal.target}{goal.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-8"
            >
              <Button
                size="xl"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-12 py-6 text-xl font-bold group shadow-2xl"
              >
                <Users className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                Scale Your Team Now
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="xl"
                variant="outline"
                onClick={() => setIsLeadModalOpen(true)}
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg font-semibold backdrop-blur-sm"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Team Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-8 text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>500+ Teams Scaled</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>4.9/5 Team Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span>187% Avg Growth</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Team Dashboard Preview */}
          <motion.div
            className="flex-1 w-full lg:w-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={itemVariants}
              className="relative w-full max-w-lg mx-auto"
            >
              <div className="relative w-full bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
                {/* Team Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white">Elite Real Estate Team</h3>
                    <p className="text-purple-300">Phoenix Market Leaders</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400">Live</span>
                  </div>
                </div>

                {/* Team Members */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Active Team Members</h4>
                  {teamMembers.slice(0, 3).map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            member.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
                          }`}></div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{member.name}</div>
                          <div className="text-xs text-gray-400">{member.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-white">{member.deals}</div>
                        <div className="text-xs text-gray-400">deals</div>
                      </div>
                    </motion.div>
                  ))}
                  <div className="text-center">
                    <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white text-xs">
                      View All Team Members
                    </Button>
                  </div>
                </div>

                {/* Live Activity Feed */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Live Team Activity</h4>
                  {dailyActivities.slice(0, 3).map((activity, index) => {
                    const IconComponent = activity.icon
                    const isHighlighted = index === currentActivity % 3

                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0.7 }}
                        animate={{
                          opacity: isHighlighted ? 1 : 0.7,
                          scale: isHighlighted ? 1.02 : 1,
                          backgroundColor: isHighlighted ? 'rgba(147, 51, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)'
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start space-x-3 p-3 rounded-lg border border-white/10"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          activity.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          activity.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-white">{activity.message}</div>
                          <div className="text-xs text-gray-400">{activity.time}</div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Quick Actions */}
                <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon
                    return (
                      <Button
                        key={index}
                        size="sm"
                        className={`${action.color} hover:opacity-80 text-xs`}
                      >
                        <IconComponent className="w-3 h-3 mr-1" />
                        {action.action}
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* Floating Team Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <Crown className="w-4 h-4" />
                  <span>Top 1% Team</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <LeadFormModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onSubmit={handleLeadFormSubmit}
      />
    </section>
  )
}