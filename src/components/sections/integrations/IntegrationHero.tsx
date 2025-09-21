'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Settings,
  Zap,
  ArrowRight,
  Calendar,
  Database,
  Globe,
  Layers,
  Link,
  Workflow,
  RefreshCw,
  CheckCircle,
  TrendingUp,
  Users,
  Clock,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const typewriterPhrases = [
  'Connect Every Tool in Your Tech Stack',
  'Eliminate Data Silos Forever',
  'Automate Cross-Platform Workflows',
  'Sync Your CRM, MLS, and Marketing Tools',
  'Create One Unified Real Estate Platform'
]

const connectionNodes = [
  {
    id: 'crm',
    name: 'CRM',
    description: 'Contact Management',
    position: { x: 20, y: 30 },
    color: 'from-blue-500 to-blue-600',
    icon: Users,
    connections: ['mls', 'marketing', 'analytics']
  },
  {
    id: 'mls',
    name: 'MLS',
    description: 'Property Listings',
    position: { x: 80, y: 20 },
    color: 'from-green-500 to-green-600',
    icon: Database,
    connections: ['crm', 'website', 'marketing']
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Email & Social',
    position: { x: 70, y: 70 },
    color: 'from-purple-500 to-purple-600',
    icon: Globe,
    connections: ['crm', 'mls', 'analytics']
  },
  {
    id: 'website',
    name: 'Website',
    description: 'Lead Generation',
    position: { x: 50, y: 10 },
    color: 'from-orange-500 to-orange-600',
    icon: Layers,
    connections: ['mls', 'crm']
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Performance Data',
    position: { x: 10, y: 80 },
    color: 'from-cyan-500 to-cyan-600',
    icon: TrendingUp,
    connections: ['crm', 'marketing']
  }
]

const liveMetrics = [
  {
    label: 'Integrations Active',
    value: 1247,
    increment: 3,
    icon: Link,
    color: 'text-blue-600'
  },
  {
    label: 'Data Sync Success',
    value: 99.8,
    suffix: '%',
    increment: 0.01,
    icon: RefreshCw,
    color: 'text-green-600'
  },
  {
    label: 'API Calls/Day',
    value: 2847392,
    increment: 1247,
    icon: Zap,
    color: 'text-purple-600'
  },
  {
    label: 'Time Saved',
    value: 34567,
    suffix: ' hrs',
    increment: 47,
    icon: Clock,
    color: 'text-orange-600'
  }
]

const integrationFeatures = [
  {
    title: 'Real-time Sync',
    description: 'Bi-directional data flow',
    icon: RefreshCw
  },
  {
    title: 'No Code Setup',
    description: 'Visual configuration',
    icon: Settings
  },
  {
    title: 'Secure Connections',
    description: 'Enterprise-grade security',
    icon: Shield
  },
  {
    title: 'Instant Deployment',
    description: 'Live in 24 hours',
    icon: Zap
  }
]

export function IntegrationHero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [metrics, setMetrics] = useState(liveMetrics)
  const [activeConnections, setActiveConnections] = useState<string[]>([])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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

  // Live metrics animation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.suffix === '%'
          ? Math.min(metric.value + (Math.random() * metric.increment), 100)
          : metric.value + Math.floor(Math.random() * metric.increment)
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Animated connections
  useEffect(() => {
    const interval = setInterval(() => {
      const allConnections = connectionNodes.flatMap(node =>
        node.connections.map(target => `${node.id}-${target}`)
      )

      setActiveConnections(prev => {
        const numActive = Math.floor(Math.random() * 3) + 2
        const shuffled = [...allConnections].sort(() => Math.random() - 0.5)
        return shuffled.slice(0, numActive)
      })
    }, 2000)

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

  const renderConnectionLine = (from: typeof connectionNodes[0], to: typeof connectionNodes[0]) => {
    const connectionId = `${from.id}-${to.id}`
    const isActive = activeConnections.includes(connectionId)

    return (
      <motion.line
        key={connectionId}
        x1={`${from.position.x}%`}
        y1={`${from.position.y}%`}
        x2={`${to.position.x}%`}
        y2={`${to.position.y}%`}
        stroke={isActive ? '#8B5CF6' : '#E5E7EB'}
        strokeWidth={isActive ? 3 : 1}
        strokeDasharray={isActive ? '0' : '5,5'}
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: 1,
          stroke: isActive ? '#8B5CF6' : '#E5E7EB',
          strokeWidth: isActive ? 3 : 1
        }}
        transition={{
          duration: 1.5,
          repeat: isActive ? Infinity : 0,
          repeatType: 'loop'
        }}
      />
    )
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
              <Settings className="w-5 h-5 mr-2 animate-spin" style={{ animationDuration: '3s' }} />
              Intelligent Integration Platform
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
            >
              <span className="block">Unify Your</span>
              <span className="block text-gradient bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {displayText}
              </span>
              <span className="animate-pulse">|</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto lg:mx-0 leading-relaxed"
            >
              Stop copying data between systems. Our intelligent integrations create
              <span className="text-purple-400 font-semibold"> seamless connections</span>,
              <span className="text-blue-400 font-semibold"> real-time sync</span>, and
              <span className="text-cyan-400 font-semibold"> automated workflows</span> across your entire real estate tech stack.
            </motion.p>

            {/* Live Metrics */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {metrics.map((metric, index) => {
                const IconComponent = metric.icon
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className={`w-5 h-5 ${metric.color}`} />
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {metric.value.toLocaleString()}{metric.suffix || ''}
                    </div>
                    <div className="text-xs text-gray-400">{metric.label}</div>
                  </div>
                )
              })}
            </motion.div>

            {/* Integration Features */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
            >
              {integrationFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10"
                  >
                    <IconComponent className="w-5 h-5 text-purple-400 mb-2" />
                    <div className="text-sm font-semibold text-white">{feature.title}</div>
                    <div className="text-xs text-gray-400">{feature.description}</div>
                  </div>
                )
              })}
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
                <Link className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                Connect Your Tools Now
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="xl"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg font-semibold backdrop-blur-sm"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Integration Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-8 text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>2,500+ Successful Integrations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>Enterprise-Grade Security</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Integration Network Visualization */}
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
              <div className="relative w-full h-96 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  {connectionNodes.map(fromNode =>
                    fromNode.connections.map(connectionId => {
                      const toNode = connectionNodes.find(n => n.id === connectionId)
                      return toNode ? renderConnectionLine(fromNode, toNode) : null
                    })
                  )}
                </svg>

                {/* Connection Nodes */}
                {connectionNodes.map((node, index) => {
                  const IconComponent = node.icon
                  return (
                    <motion.div
                      key={node.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${node.position.x}%`,
                        top: `${node.position.y}%`
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: index * 0.2,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${node.color} rounded-xl flex items-center justify-center shadow-2xl border border-white/20`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute top-18 left-1/2 transform -translate-x-1/2 text-center">
                        <div className="text-sm font-bold text-white">{node.name}</div>
                        <div className="text-xs text-gray-400">{node.description}</div>
                      </div>
                    </motion.div>
                  )
                })}

                {/* Central Hub */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.8, type: "spring" }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30">
                    <Workflow className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute top-22 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-sm font-bold text-white">AI Hub</div>
                    <div className="text-xs text-gray-400">Central Control</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}