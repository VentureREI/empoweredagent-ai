'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  Target,
  Brain,
  Zap,
  ArrowRight,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Activity,
  PieChart,
  LineChart,
  BarChart2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const typewriterPhrases = [
  'Turn Property Data Into Million-Dollar Insights',
  'Predict Market Trends Before Your Competition',
  'Automate Reports That Close More Deals',
  'Transform Spreadsheets Into Smart Dashboards',
  'Discover Hidden Opportunities in Your Data'
]

const liveMetrics = [
  {
    label: 'Properties Analyzed',
    value: 847392,
    increment: 23,
    icon: MapPin,
    color: 'text-blue-600'
  },
  {
    label: 'Market Predictions',
    value: 99.2,
    suffix: '%',
    increment: 0.1,
    icon: Target,
    color: 'text-green-600'
  },
  {
    label: 'Reports Generated',
    value: 156843,
    increment: 47,
    icon: BarChart3,
    color: 'text-purple-600'
  },
  {
    label: 'Hours Saved',
    value: 924567,
    increment: 127,
    icon: Activity,
    color: 'text-orange-600'
  }
]

const dashboardPreviews = [
  {
    title: 'Market Intelligence Dashboard',
    description: 'Real-time market trends and predictive analytics',
    metrics: ['Price Trends', 'Inventory Levels', 'Demand Forecasts'],
    chart: BarChart3,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    title: 'Portfolio Performance',
    description: 'Comprehensive property portfolio analytics',
    metrics: ['ROI Analysis', 'Performance Tracking', 'Risk Assessment'],
    chart: LineChart,
    color: 'from-green-500 to-emerald-600'
  },
  {
    title: 'Lead Analytics Center',
    description: 'Advanced lead scoring and conversion tracking',
    metrics: ['Lead Quality', 'Conversion Rates', 'Pipeline Health'],
    chart: PieChart,
    color: 'from-purple-500 to-violet-600'
  }
]

export function AnalyticsHero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [metrics, setMetrics] = useState(liveMetrics)
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
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
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
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full text-blue-300 text-sm font-semibold mb-8 border border-blue-500/30 backdrop-blur-sm"
            >
              <Brain className="w-5 h-5 mr-2 animate-pulse" />
              AI-Powered Real Estate Analytics Platform
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
            >
              <span className="block">Transform Your</span>
              <span className="block text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {displayText}
              </span>
              <span className="animate-pulse">|</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto lg:mx-0 leading-relaxed"
            >
              Stop drowning in spreadsheets. Our AI analyzes millions of data points to deliver
              <span className="text-blue-400 font-semibold"> actionable insights</span>,
              <span className="text-purple-400 font-semibold"> predictive analytics</span>, and
              <span className="text-cyan-400 font-semibold"> automated reports</span> that transform how you make real estate decisions.
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

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-8"
            >
              <Button
                size="xl"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-6 text-xl font-bold group shadow-2xl"
              >
                <BarChart3 className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                Start Analyzing Your Data
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="xl"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg font-semibold backdrop-blur-sm"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Analytics Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-8 text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-400" />
                <span>10,000+ Real Estate Professionals</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span>$2.3B+ in Transactions Analyzed</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Dashboard Previews */}
          <motion.div
            className="flex-1 w-full lg:w-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative">
              {dashboardPreviews.map((dashboard, index) => {
                const ChartIcon = dashboard.chart
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    custom={index}
                    className={`absolute w-full max-w-md ${
                      index === 0 ? 'z-30 top-0 left-0' :
                      index === 1 ? 'z-20 top-8 left-8' :
                      'z-10 top-16 left-16'
                    }`}
                    whileHover={{
                      scale: index === 0 ? 1.05 : 1.02,
                      z: 50,
                      rotateY: 5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 hover:border-white/30 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${dashboard.color} rounded-xl flex items-center justify-center`}>
                          <ChartIcon className="w-6 h-6 text-white" />
                        </div>
                        <motion.div
                          className="w-20 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded opacity-80"
                          animate={{
                            scaleY: [1, 1.2, 0.8, 1.1, 1],
                            transition: {
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "loop"
                            }
                          }}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {dashboard.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-4">
                        {dashboard.description}
                      </p>
                      <div className="space-y-2">
                        {dashboard.metrics.map((metric, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">{metric}</span>
                            <motion.div
                              className="w-16 h-2 bg-gradient-to-r from-gray-600 to-blue-500 rounded-full"
                              animate={{
                                opacity: [0.5, 1, 0.7, 1],
                                transition: {
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}