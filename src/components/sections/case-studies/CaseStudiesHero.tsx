'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Award, TrendingUp, Users, Building2, BarChart3, DollarSign,
  Star, Clock, MapPin, CheckCircle, ArrowRight, Play,
  Target, Zap, Shield, Calendar
} from 'lucide-react'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'

const heroStats = [
  {
    value: '847%',
    label: 'Average ROI Increase',
    description: 'Across all case studies',
    icon: TrendingUp,
    color: 'text-green-600'
  },
  {
    value: '156',
    label: 'Success Stories',
    description: 'Verified case studies',
    icon: Award,
    color: 'text-blue-600'
  },
  {
    value: '$2.4B',
    label: 'Revenue Generated',
    description: 'By our clients',
    icon: DollarSign,
    color: 'text-purple-600'
  },
  {
    value: '94%',
    label: 'Client Success Rate',
    description: 'Achieved target goals',
    icon: Target,
    color: 'text-orange-600'
  }
]

const featuredSuccessMetrics = [
  {
    client: 'Premium Properties Group',
    location: 'Orange County, CA',
    type: 'Luxury Residential Team',
    timeframe: '18 months',
    beforeRevenue: '$2.1M',
    afterRevenue: '$8.7M',
    growth: '+314%',
    dealsClosed: 247,
    marketShare: '12.4%',
    agentRetention: '96%',
    highlight: 'Became #1 luxury team in Orange County'
  },
  {
    client: 'Metropolitan Realty',
    location: 'Chicago, IL',
    type: 'Full-Service Brokerage',
    timeframe: '24 months',
    beforeRevenue: '$14.6M',
    afterRevenue: '$41.2M',
    growth: '+182%',
    dealsClosed: 1847,
    marketShare: '8.9%',
    agentRetention: '89%',
    highlight: 'Expanded from 1 to 4 offices'
  },
  {
    client: 'Coastal Homes Realty',
    location: 'Miami, FL',
    type: 'Vacation Rental Specialists',
    timeframe: '12 months',
    beforeRevenue: '$1.8M',
    afterRevenue: '$6.3M',
    growth: '+250%',
    dealsClosed: 189,
    marketShare: '15.7%',
    agentRetention: '92%',
    highlight: 'Dominated luxury vacation rental market'
  }
]

const verificationBadges = [
  {
    text: 'Verified by Third-Party Auditor',
    icon: Shield,
    description: 'All metrics independently verified'
  },
  {
    text: 'Real Client Testimonials',
    icon: Users,
    description: 'Authentic client interviews'
  },
  {
    text: 'Before/After Documentation',
    icon: BarChart3,
    description: 'Complete data transparency'
  },
  {
    text: 'Time-Stamped Results',
    icon: Clock,
    description: 'Chronological proof of progress'
  }
]

export default function CaseStudiesHero() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [animatedStats, setAnimatedStats] = useState(heroStats.map(stat => ({ ...stat, currentValue: 0 })))
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleLeadFormSubmit = (formData: LeadFormData) => {
    console.log('Case study consultation request:', formData)
    // Handle form submission here
    setIsLeadModalOpen(false)
  }

  // Rotate featured metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % featuredSuccessMetrics.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Animate stats
  useEffect(() => {
    if (!isInView) return

    const parseStatValue = (value: string): number => {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
      if (value.includes('B')) return numericValue * 1000000000
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
    }, 30)

    return () => clearInterval(interval)
  }, [isInView])

  const formatStatValue = (stat: any) => {
    if (stat.label === 'Revenue Generated') {
      return `$${(stat.currentValue / 1000000000).toFixed(1)}B`
    } else if (stat.label === 'Average ROI Increase' || stat.label === 'Client Success Rate') {
      return `${Math.round(stat.currentValue)}%`
    } else {
      return Math.round(stat.currentValue).toString()
    }
  }

  const currentMetric = featuredSuccessMetrics[currentFeature]

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden pt-20 pb-16"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.6),transparent)]" />

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="h-4 w-4" />
                Verified Success Stories
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Real Results from
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 block">
                  Real Clients
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-xl mb-8">
                Discover how real estate professionals and brokerages have achieved
                extraordinary growth with our platform. Every metric verified,
                every story authentic.
              </p>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 gap-6">
              {animatedStats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-purple-100 to-blue-100 mb-4`}>
                      <IconComponent className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {formatStatValue(stat)}
                    </div>
                    <div className="text-sm font-medium text-gray-900 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-600">{stat.description}</div>
                  </motion.div>
                )
              })}
            </div>

            {/* Verification Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Why Our Case Studies Are Different</h3>
              {verificationBadges.map((badge, index) => {
                const IconComponent = badge.icon
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <IconComponent className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{badge.text}</div>
                      <div className="text-sm text-gray-300">{badge.description}</div>
                    </div>
                  </div>
                )
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLeadModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Book Consultation
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border border-gray-200 hover:border-purple-300 transition-all duration-200 flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                Watch Video Stories
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Featured Case Study */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-lg">Featured Success Story</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm">Verified</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Client Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{currentMetric.client}</h4>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {currentMetric.location}
                    </div>
                    <div className="text-sm text-purple-600 font-medium">{currentMetric.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Transformation Period</div>
                    <div className="font-semibold text-gray-900">{currentMetric.timeframe}</div>
                  </div>
                </div>

                {/* Key Highlight */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold text-gray-900">Key Achievement</span>
                  </div>
                  <p className="text-gray-700">{currentMetric.highlight}</p>
                </div>

                {/* Before/After Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3">Before Platform</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revenue</span>
                        <span className="font-medium">{currentMetric.beforeRevenue}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3">After Platform</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revenue</span>
                        <span className="font-medium text-green-600">{currentMetric.afterRevenue}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Growth Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{currentMetric.growth}</div>
                    <div className="text-sm text-gray-600">Revenue Growth</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{currentMetric.dealsClosed}</div>
                    <div className="text-sm text-gray-600">Deals Closed</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{currentMetric.marketShare}</div>
                    <div className="text-sm text-gray-600">Market Share</div>
                  </div>
                </div>

                {/* Verification */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-900">Independently Verified</span>
                  </div>
                  <button className="text-purple-600 text-sm font-medium hover:text-purple-700 flex items-center gap-1">
                    View Full Case Study
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {featuredSuccessMetrics.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentFeature ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
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