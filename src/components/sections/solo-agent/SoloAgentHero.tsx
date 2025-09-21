'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  User,
  Zap,
  ArrowRight,
  Calendar,
  Target,
  TrendingUp,
  Users,
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
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'

const typewriterPhrases = [
  'Your Personal AI Real Estate Assistant',
  'Automate Lead Generation & Follow-up',
  'Scale Your Solo Practice Effortlessly',
  'Close More Deals with Less Stress',
  'Work Smarter, Not Harder'
]

const personalStats = [
  {
    label: 'Avg. Deals Closed',
    value: 47,
    suffix: '/year',
    increment: 0.5,
    icon: Home,
    color: 'text-blue-600',
    description: '+78% vs industry avg'
  },
  {
    label: 'Time Saved',
    value: 25,
    suffix: ' hrs/week',
    increment: 0.2,
    icon: Clock,
    color: 'text-green-600',
    description: 'More time for clients'
  },
  {
    label: 'Lead Response',
    value: 3,
    suffix: ' minutes',
    increment: 0.1,
    icon: Zap,
    color: 'text-purple-600',
    description: '95% faster response'
  },
  {
    label: 'Commission Growth',
    value: 240,
    suffix: '%',
    increment: 2,
    icon: TrendingUp,
    color: 'text-orange-600',
    description: 'Average increase'
  }
]

const agentPersona = {
  name: 'Sarah Johnson',
  title: 'Solo Real Estate Agent',
  experience: '5 years',
  specialization: 'Residential Sales',
  location: 'Phoenix, AZ',
  avatar: '/agents/sarah-solo.jpg',
  stats: {
    closings: 47,
    volume: '$18.2M',
    satisfaction: '4.9/5',
    referrals: '85%'
  }
}

const dailyTasks = [
  {
    id: 1,
    task: 'Lead qualification & follow-up',
    time: '2.5 hours',
    automated: true,
    savings: '90%',
    icon: Users,
    status: 'automated'
  },
  {
    id: 2,
    task: 'Market analysis reports',
    time: '1.5 hours',
    automated: true,
    savings: '85%',
    icon: BarChart3,
    status: 'automated'
  },
  {
    id: 3,
    task: 'Social media posting',
    time: '1 hour',
    automated: true,
    savings: '95%',
    icon: Globe,
    status: 'automated'
  },
  {
    id: 4,
    task: 'Client communication',
    time: '3 hours',
    automated: false,
    savings: '40%',
    icon: MessageSquare,
    status: 'assisted'
  },
  {
    id: 5,
    task: 'Property showings',
    time: '4 hours',
    automated: false,
    savings: '0%',
    icon: Home,
    status: 'manual'
  }
]

const successMetrics = [
  {
    metric: 'Response Time',
    before: '2+ hours',
    after: '3 minutes',
    improvement: '95% faster',
    icon: Zap
  },
  {
    metric: 'Lead Conversion',
    before: '12%',
    after: '28%',
    improvement: '+133%',
    icon: Target
  },
  {
    metric: 'Weekly Hours',
    before: '65 hours',
    after: '40 hours',
    improvement: '25 hrs saved',
    icon: Clock
  },
  {
    metric: 'Monthly Income',
    before: '$8,500',
    after: '$21,200',
    improvement: '+149%',
    icon: DollarSign
  }
]

export function SoloAgentHero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(personalStats.map(stat => ({ ...stat, currentValue: 0 })))
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleLeadFormSubmit = (formData: LeadFormData) => {
    console.log('Solo agent demo request:', formData)
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

  // Animated stats
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => prev.map(stat => ({
        ...stat,
        currentValue: Math.min(
          stat.currentValue + Math.random() * stat.increment,
          stat.value
        )
      })))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Task rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaskIndex(prev => (prev + 1) % dailyTasks.length)
    }, 3000)

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
              <User className="w-5 h-5 mr-2" />
              Designed for Solo Agents
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
            >
              <span className="block">Supercharge Your</span>
              <span className="block">Solo Practice with</span>
              <span className="block text-gradient bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent min-h-[1.2em]">
                {displayText}
              </span>
              <span className="animate-pulse">|</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto lg:mx-0 leading-relaxed"
            >
              Built specifically for independent agents who want to
              <span className="text-purple-400 font-semibold"> compete with big teams</span>,
              <span className="text-blue-400 font-semibold"> automate repetitive tasks</span>, and
              <span className="text-cyan-400 font-semibold"> focus on what you do best</span> - building relationships and closing deals.
            </motion.p>

            {/* Personal Stats */}
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
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {Math.round(stat.currentValue)}{stat.suffix || ''}
                    </div>
                    <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                    <div className="text-xs text-green-400">{stat.description}</div>
                  </div>
                )
              })}
            </motion.div>

            {/* Before/After Comparison */}
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-12"
            >
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                Transform Your Solo Practice
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                {successMetrics.map((metric, index) => {
                  const IconComponent = metric.icon
                  return (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-3">
                        <IconComponent className="w-8 h-8 text-purple-400" />
                      </div>
                      <div className="text-sm font-semibold text-white mb-2">{metric.metric}</div>
                      <div className="space-y-1">
                        <div className="text-xs text-red-400 line-through">{metric.before}</div>
                        <div className="text-sm font-bold text-green-400">{metric.after}</div>
                        <div className="text-xs text-blue-400">{metric.improvement}</div>
                      </div>
                    </div>
                  )
                })}
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
                <Sparkles className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                Start Your Free Trial
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="xl"
                variant="outline"
                onClick={() => setIsLeadModalOpen(true)}
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg font-semibold backdrop-blur-sm"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Personal Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-8 text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>7-Day Free Trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>4.9/5 Agent Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span>2,500+ Solo Agents</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Agent Dashboard Preview */}
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
                {/* Agent Profile Header */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{agentPersona.name}</h3>
                    <p className="text-purple-300">{agentPersona.title}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-400">{agentPersona.experience}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-400">{agentPersona.location}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{agentPersona.stats.closings}</div>
                    <div className="text-xs text-gray-400">Closings YTD</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{agentPersona.stats.volume}</div>
                    <div className="text-xs text-gray-400">Sales Volume</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{agentPersona.stats.satisfaction}</div>
                    <div className="text-xs text-gray-400">Client Rating</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{agentPersona.stats.referrals}</div>
                    <div className="text-xs text-gray-400">Referral Rate</div>
                  </div>
                </div>

                {/* Daily Task Automation */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Today's Automated Tasks</h4>
                  {dailyTasks.map((task, index) => {
                    const IconComponent = task.icon
                    const isHighlighted = index === currentTaskIndex

                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0.7 }}
                        animate={{
                          opacity: isHighlighted ? 1 : 0.7,
                          scale: isHighlighted ? 1.02 : 1,
                          backgroundColor: isHighlighted ? 'rgba(147, 51, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)'
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-between p-3 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            task.status === 'automated' ? 'bg-green-500/20 text-green-400' :
                            task.status === 'assisted' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{task.task}</div>
                            <div className="text-xs text-gray-400">{task.time}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          {task.automated && (
                            <div className="text-xs font-semibold text-green-400">
                              -{task.savings}
                            </div>
                          )}
                          <div className={`text-xs px-2 py-1 rounded ${
                            task.status === 'automated' ? 'bg-green-500/20 text-green-400' :
                            task.status === 'assisted' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {task.status}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Quick Actions */}
                <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-xs">
                    <Phone className="w-3 h-3 mr-1" />
                    Call Lead
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                    <Mail className="w-3 h-3 mr-1" />
                    Send Email
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    Schedule
                  </Button>
                </div>
              </div>

              {/* Floating Success Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>Top 5% Agent</span>
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