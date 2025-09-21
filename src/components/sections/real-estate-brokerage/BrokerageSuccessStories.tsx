'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Building2, TrendingUp, Users, DollarSign, Award, Target,
  MapPin, Calendar, Star, Play, ArrowRight, ArrowLeft,
  BarChart3, PieChart, Clock, CheckCircle, Zap
} from 'lucide-react'

const successStories = [
  {
    id: 1,
    brokerageName: 'Pacific Premier Realty',
    location: 'San Francisco Bay Area',
    brokerOwner: 'Jennifer Walsh',
    brokerImage: '/brokers/jennifer.jpg',
    companySize: 'Mid-size (85 agents)',
    timeframe: '18 months',
    industry: 'Luxury Residential',
    challenge: 'Struggling with agent retention and outdated systems limiting growth potential',
    beforeStats: {
      revenue: '$127M',
      agents: 62,
      avgDealsPerAgent: 12,
      marketShare: '8.2%',
      agentRetention: '67%',
      leadConversion: '14%',
      responseTime: '45 min'
    },
    afterStats: {
      revenue: '$298M',
      agents: 85,
      avgDealsPerAgent: 28,
      marketShare: '19.7%',
      agentRetention: '94%',
      leadConversion: '31%',
      responseTime: '1.8 min'
    },
    keyResults: [
      {
        metric: 'Revenue Growth',
        improvement: '+135%',
        description: 'Doubled revenue in 18 months through improved efficiency'
      },
      {
        metric: 'Agent Productivity',
        improvement: '+133%',
        description: 'Average deals per agent increased dramatically'
      },
      {
        metric: 'Market Share',
        improvement: '+140%',
        description: 'Became dominant player in luxury SF market'
      },
      {
        metric: 'Agent Retention',
        improvement: '+40%',
        description: 'Industry-leading retention rates'
      }
    ],
    testimonial: {
      quote: "The platform transformed our brokerage from a struggling mid-size firm to the luxury market leader in San Francisco. Our agents are more productive, happier, and our clients receive exceptional service.",
      author: 'Jennifer Walsh',
      title: 'Broker/Owner, Pacific Premier Realty'
    },
    videoUrl: '/videos/pacific-premier-case-study.mp4',
    implementation: [
      'Complete CRM migration and data integration',
      'Agent onboarding and training program',
      'Lead routing and management system setup',
      'Performance analytics dashboard deployment',
      'Mobile app rollout for field agents'
    ]
  },
  {
    id: 2,
    brokerageName: 'Metro Commercial Group',
    location: 'Chicago Metro Area',
    brokerOwner: 'Robert Kim',
    brokerImage: '/brokers/robert.jpg',
    companySize: 'Large (200+ agents)',
    timeframe: '12 months',
    industry: 'Commercial Real Estate',
    challenge: 'Complex deal tracking and commission calculations causing operational inefficiencies',
    beforeStats: {
      revenue: '$445M',
      agents: 156,
      avgDealsPerAgent: 8,
      marketShare: '15.3%',
      agentRetention: '78%',
      leadConversion: '11%',
      responseTime: '2.2 hours'
    },
    afterStats: {
      revenue: '$721M',
      agents: 203,
      avgDealsPerAgent: 18,
      marketShare: '24.1%',
      agentRetention: '91%',
      leadConversion: '26%',
      responseTime: '8 min'
    },
    keyResults: [
      {
        metric: 'Revenue Growth',
        improvement: '+62%',
        description: 'Significant growth in commercial transactions'
      },
      {
        metric: 'Deal Velocity',
        improvement: '+125%',
        description: 'Faster deal processing and closing times'
      },
      {
        metric: 'Operational Efficiency',
        improvement: '+89%',
        description: 'Streamlined processes and automation'
      },
      {
        metric: 'Agent Satisfaction',
        improvement: '+67%',
        description: 'Higher agent satisfaction and retention'
      }
    ],
    testimonial: {
      quote: "Managing 200+ commercial agents was a nightmare before this platform. Now we have complete visibility into every deal, automated commission calculations, and our agents are closing deals 125% faster.",
      author: 'Robert Kim',
      title: 'Principal Broker, Metro Commercial Group'
    },
    videoUrl: '/videos/metro-commercial-case-study.mp4',
    implementation: [
      'Enterprise-grade platform deployment',
      'Custom commercial workflow configuration',
      'Advanced reporting and analytics setup',
      'Multi-office integration and management',
      'Commission automation and compliance tools'
    ]
  },
  {
    id: 3,
    brokerageName: 'Sunshine Coast Realty',
    location: 'Miami-Dade County',
    brokerOwner: 'Maria Gonzalez',
    brokerImage: '/brokers/maria.jpg',
    companySize: 'Small (35 agents)',
    timeframe: '8 months',
    industry: 'Vacation Rentals & Luxury',
    challenge: 'Competing against larger brokerages with limited resources and manual processes',
    beforeStats: {
      revenue: '$42M',
      agents: 28,
      avgDealsPerAgent: 11,
      marketShare: '3.1%',
      agentRetention: '71%',
      leadConversion: '16%',
      responseTime: '1.2 hours'
    },
    afterStats: {
      revenue: '$89M',
      agents: 35,
      avgDealsPerAgent: 31,
      marketShare: '8.7%',
      agentRetention: '96%',
      leadConversion: '38%',
      responseTime: '3.2 min'
    },
    keyResults: [
      {
        metric: 'Revenue Per Agent',
        improvement: '+182%',
        description: 'Exceptional productivity gains per agent'
      },
      {
        metric: 'Market Share',
        improvement: '+181%',
        description: 'Tripled market presence in vacation rental segment'
      },
      {
        metric: 'Lead Conversion',
        improvement: '+138%',
        description: 'Industry-leading conversion rates'
      },
      {
        metric: 'Response Time',
        improvement: '-96%',
        description: 'Near-instant lead response capabilities'
      }
    ],
    testimonial: {
      quote: "As a small brokerage, we thought we'd never compete with the big players. This platform leveled the playing field and gave us enterprise-level capabilities that helped us dominate our niche market.",
      author: 'Maria Gonzalez',
      title: 'Broker/Owner, Sunshine Coast Realty'
    },
    videoUrl: '/videos/sunshine-coast-case-study.mp4',
    implementation: [
      'Rapid deployment in under 30 days',
      'Vacation rental specialization features',
      'Automated marketing and lead nurturing',
      'Mobile-first agent experience',
      'Integration with property management systems'
    ]
  }
]

const industryBenchmarks = [
  {
    metric: 'Revenue Growth',
    industry: '8-12%',
    platform: '62-135%',
    improvement: '5x better'
  },
  {
    metric: 'Agent Retention',
    industry: '75-82%',
    platform: '91-96%',
    improvement: '18% higher'
  },
  {
    metric: 'Lead Conversion',
    industry: '12-18%',
    platform: '26-38%',
    improvement: '2.3x better'
  },
  {
    metric: 'Response Time',
    industry: '1-3 hours',
    platform: '2-8 minutes',
    improvement: '20x faster'
  }
]

export default function BrokerageSuccessStories() {
  const [currentStory, setCurrentStory] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const story = successStories[currentStory]

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length)
  }

  const calculateGrowth = (before: number, after: number) => {
    return Math.round(((after - before) / before) * 100)
  }

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
            <Award className="h-4 w-4" />
            Proven Success Stories
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Real Brokerages,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 block">
              Extraordinary Results
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how brokerages of all sizes have transformed their operations and
            achieved remarkable growth with our platform.
          </p>
        </motion.div>

        {/* Story Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={prevStory}
            className="p-3 bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>

          <div className="flex items-center gap-2">
            {successStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentStory ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextStory}
            className="p-3 bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
          >
            <ArrowRight className="h-5 w-5 text-gray-600" />
          </button>
        </motion.div>

        {/* Main Story Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 mb-16"
          >
            {/* Story Details */}
            <div className="space-y-8">
              {/* Brokerage Info */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-white/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {story.brokerageName.split(' ').map(word => word[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{story.brokerageName}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {story.location}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-600">Broker/Owner</div>
                    <div className="font-semibold text-gray-900">{story.brokerOwner}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Company Size</div>
                    <div className="font-semibold text-gray-900">{story.companySize}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Industry Focus</div>
                    <div className="font-semibold text-gray-900">{story.industry}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Transformation Time</div>
                    <div className="font-semibold text-gray-900">{story.timeframe}</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">The Challenge</h4>
                  <p className="text-gray-700">{story.challenge}</p>
                </div>
              </div>

              {/* Results */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-white/50">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Key Results Achieved</h4>
                <div className="grid grid-cols-2 gap-6">
                  {story.keyResults.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200"
                    >
                      <div className="text-3xl font-bold text-green-600 mb-2">{result.improvement}</div>
                      <div className="font-semibold text-gray-900 mb-1">{result.metric}</div>
                      <div className="text-sm text-gray-600">{result.description}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Before/After Metrics */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-white/50">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Before vs After Metrics</h4>
                <div className="space-y-6">
                  {[
                    { label: 'Annual Revenue', before: story.beforeStats.revenue, after: story.afterStats.revenue },
                    { label: 'Active Agents', before: story.beforeStats.agents, after: story.afterStats.agents },
                    { label: 'Deals Per Agent', before: story.beforeStats.avgDealsPerAgent, after: story.afterStats.avgDealsPerAgent },
                    { label: 'Market Share', before: story.beforeStats.marketShare, after: story.afterStats.marketShare },
                    { label: 'Agent Retention', before: story.beforeStats.agentRetention, after: story.afterStats.agentRetention },
                    { label: 'Lead Conversion', before: story.beforeStats.leadConversion, after: story.afterStats.leadConversion }
                  ].map((metric, index) => {
                    const beforeValue = typeof metric.before === 'string' ? parseFloat(metric.before.replace(/[^0-9.]/g, '')) : metric.before
                    const afterValue = typeof metric.after === 'string' ? parseFloat(metric.after.replace(/[^0-9.]/g, '')) : metric.after
                    const growth = calculateGrowth(beforeValue, afterValue)

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 mb-1">{metric.label}</div>
                          <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-600">
                              Before: <span className="font-semibold">{metric.before}</span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                            <div className="text-sm text-gray-900">
                              After: <span className="font-semibold">{metric.after}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${growth > 0 ? 'text-green-600' : 'text-blue-600'}`}>
                            {growth > 0 ? '+' : ''}{growth}%
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">{story.testimonial.author}</div>
                    <div className="text-purple-100 text-sm">{story.testimonial.title}</div>
                  </div>
                </div>
                <blockquote className="text-lg leading-relaxed italic">
                  "{story.testimonial.quote}"
                </blockquote>
              </div>

              {/* Video CTA */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-white/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Watch Full Case Study</h4>
                    <p className="text-gray-600 text-sm">See the complete transformation story</p>
                  </div>
                  <button
                    onClick={() => setShowVideo(true)}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Play className="h-4 w-4" />
                    Play Video
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Industry Benchmarks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-8 border border-white/50"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">How We Compare to Industry Standards</h3>
            <p className="text-gray-600">Our platform consistently delivers results that exceed industry benchmarks</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {industryBenchmarks.map((benchmark, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200"
              >
                <div className="font-semibold text-gray-900 mb-4">{benchmark.metric}</div>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600">Industry Average</div>
                    <div className="text-lg font-semibold text-gray-900">{benchmark.industry}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Our Platform</div>
                    <div className="text-lg font-semibold text-purple-600">{benchmark.platform}</div>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-sm font-medium text-green-600">{benchmark.improvement}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}