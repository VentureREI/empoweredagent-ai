'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Lightbulb, TrendingUp, Target, AlertCircle, CheckCircle,
  ArrowRight, BarChart3, Users, DollarSign, Clock,
  Building2, Star, Zap, Shield, Award, Eye
} from 'lucide-react'

const industryTrends = [
  {
    id: 1,
    trend: 'AI-Powered Lead Qualification',
    impact: 'High',
    adoption: '73%',
    description: 'Automated lead scoring and qualification is becoming the industry standard',
    metrics: {
      conversionIncrease: '+147%',
      timeReduction: '-68%',
      costSaving: '$12.3K/month'
    },
    caseStudyExample: 'Premium Properties Group saw 24% conversion rates vs 8% industry average',
    futureOutlook: 'Expected to reach 95% adoption by 2025'
  },
  {
    id: 2,
    trend: 'Mobile-First Agent Experience',
    impact: 'High',
    adoption: '84%',
    description: 'Agents increasingly expect full functionality on mobile devices',
    metrics: {
      productivityGain: '+89%',
      responseTime: '-76%',
      satisfaction: '+94%'
    },
    caseStudyExample: 'Rural agents at Mountain View Realty operate efficiently despite connectivity challenges',
    futureOutlook: 'Mobile-only workflows becoming the norm'
  },
  {
    id: 3,
    trend: 'Predictive Market Analytics',
    impact: 'Medium',
    adoption: '45%',
    description: 'AI-driven market predictions for pricing and timing strategies',
    metrics: {
      pricingAccuracy: '+156%',
      timeOnMarket: '-34%',
      profitMargin: '+23%'
    },
    caseStudyExample: 'Luxury teams using predictive analytics achieve 19% higher profit margins',
    futureOutlook: 'Will become essential for competitive positioning'
  },
  {
    id: 4,
    trend: 'Automated Compliance Monitoring',
    impact: 'Critical',
    adoption: '67%',
    description: 'Real-time compliance checking and automated documentation',
    metrics: {
      violationReduction: '-94%',
      auditTime: '-81%',
      riskMitigation: '+267%'
    },
    caseStudyExample: 'Large brokerages report 94% reduction in compliance violations',
    futureOutlook: 'Regulatory requirement trend indicates mandatory adoption'
  },
  {
    id: 5,
    trend: 'Multi-Channel Communication Hub',
    impact: 'High',
    adoption: '89%',
    description: 'Unified client communication across all channels and platforms',
    metrics: {
      responseRate: '+156%',
      clientSatisfaction: '+78%',
      efficiency: '+134%'
    },
    caseStudyExample: 'Teams with unified communication see 4.9/5 client satisfaction vs 3.8/5 average',
    futureOutlook: 'Standard expectation for all real estate transactions'
  }
]

const successPatterns = [
  {
    pattern: 'Early Technology Adoption',
    description: 'Teams that implement new technologies within first 6 months see 2.3x better results',
    successRate: '94%',
    avgROI: '1,247%',
    keyFactors: [
      'Leadership commitment to change',
      'Comprehensive agent training',
      'Gradual feature rollout',
      'Continuous optimization'
    ],
    riskFactors: [
      'Resistance to change',
      'Inadequate training',
      'Poor implementation planning'
    ]
  },
  {
    pattern: 'Data-Driven Decision Making',
    description: 'Organizations leveraging analytics outperform traditional approaches by 389%',
    successRate: '87%',
    avgROI: '756%',
    keyFactors: [
      'Regular metrics review',
      'KPI-based goal setting',
      'Performance tracking',
      'Adaptive strategies'
    ],
    riskFactors: [
      'Data quality issues',
      'Analysis paralysis',
      'Lack of actionable insights'
    ]
  },
  {
    pattern: 'Client Experience Focus',
    description: 'Businesses prioritizing client experience achieve 67% higher retention rates',
    successRate: '91%',
    avgROI: '634%',
    keyFactors: [
      'Personalized communication',
      'Proactive service delivery',
      'Feedback integration',
      'Technology enhancement'
    ],
    riskFactors: [
      'Inconsistent service delivery',
      'Technology complexity',
      'Staff resistance'
    ]
  }
]

const commonChallenges = [
  {
    challenge: 'Agent Adoption Resistance',
    frequency: '67%',
    severity: 'High',
    description: 'Agents reluctant to change established workflows and processes',
    solutions: [
      'Gradual implementation with pilot groups',
      'Comprehensive training and support',
      'Clear ROI demonstration',
      'Peer mentorship programs'
    ],
    successStories: [
      'Metropolitan Realty achieved 98% adoption through peer training',
      'Coastal Homes used gamification to drive engagement'
    ],
    timeline: '3-6 months typical resolution'
  },
  {
    challenge: 'Data Migration Complexity',
    frequency: '54%',
    severity: 'Medium',
    description: 'Transferring historical data while maintaining business continuity',
    solutions: [
      'Phased migration approach',
      'Data validation protocols',
      'Backup and rollback procedures',
      'Professional migration services'
    ],
    successStories: [
      'Texas Commercial Group migrated 15 years of data seamlessly',
      'Urban Luxury maintained operations during full migration'
    ],
    timeline: '2-4 weeks typical duration'
  },
  {
    challenge: 'ROI Measurement Difficulties',
    frequency: '43%',
    severity: 'Medium',
    description: 'Accurately tracking and attributing performance improvements',
    solutions: [
      'Baseline metric establishment',
      'Regular performance reviews',
      'Attribution modeling',
      'Third-party verification'
    ],
    successStories: [
      'Premium Properties documented 314% growth with verified metrics',
      'Mountain View Realty tracks productivity gains in real-time'
    ],
    timeline: '6-12 months for full visibility'
  }
]

const futurePredictions = [
  {
    prediction: 'AI-Driven Property Valuations',
    timeframe: '2025-2026',
    probability: '89%',
    impact: 'Transformational',
    description: 'Machine learning will provide instant, accurate property valuations',
    implications: [
      'Faster deal processing',
      'More accurate pricing strategies',
      'Reduced appraisal dependencies',
      'Enhanced market analysis'
    ]
  },
  {
    prediction: 'Virtual Reality Property Tours',
    timeframe: '2024-2025',
    probability: '76%',
    impact: 'Significant',
    description: 'Immersive VR tours will become standard for property viewing',
    implications: [
      'Reduced physical showings',
      'Global reach for properties',
      'Enhanced buyer experience',
      'Lower marketing costs'
    ]
  },
  {
    prediction: 'Blockchain Transaction Processing',
    timeframe: '2026-2027',
    probability: '62%',
    impact: 'Revolutionary',
    description: 'Blockchain will streamline property transfers and documentation',
    implications: [
      'Instantaneous transfers',
      'Reduced fraud risk',
      'Lower transaction costs',
      'Simplified compliance'
    ]
  }
]

export default function IndustryInsights() {
  const [activeTab, setActiveTab] = useState('trends')
  const [selectedTrend, setSelectedTrend] = useState<any>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const tabs = [
    { id: 'trends', title: 'Industry Trends', icon: TrendingUp },
    { id: 'patterns', title: 'Success Patterns', icon: Target },
    { id: 'challenges', title: 'Common Challenges', icon: AlertCircle },
    { id: 'future', title: 'Future Outlook', icon: Lightbulb }
  ]

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Lightbulb className="h-4 w-4" />
            Industry Intelligence
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Insights from 156 Success Stories
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 block">
              & Market Analysis
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from patterns, trends, and insights discovered across our comprehensive
            case study database. Navigate the future of real estate with confidence.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-blue-300 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-blue-200'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {tab.title}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'trends' && (
              <div className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {industryTrends.map((trend, index) => (
                    <motion.div
                      key={trend.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedTrend(trend)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{trend.trend}</h3>
                          <p className="text-gray-700 mb-3">{trend.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            trend.impact === 'High' ? 'bg-red-100 text-red-700' :
                            trend.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {trend.impact} Impact
                          </div>
                          <div className="text-2xl font-bold text-blue-600 mt-2">{trend.adoption}</div>
                          <div className="text-xs text-gray-600">Adoption Rate</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {Object.entries(trend.metrics).map(([key, value]) => (
                          <div key={key} className="text-center p-2 bg-white rounded-lg">
                            <div className="font-bold text-green-600 text-sm">{value}</div>
                            <div className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                          </div>
                        ))}
                      </div>

                      <div className="text-sm text-gray-600 italic mb-3">
                        "{trend.caseStudyExample}"
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-purple-600 font-medium">{trend.futureOutlook}</div>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'patterns' && (
              <div className="space-y-8">
                {successPatterns.map((pattern, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200"
                  >
                    <div className="grid lg:grid-cols-3 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{pattern.pattern}</h3>
                        <p className="text-gray-700 mb-4">{pattern.description}</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-2xl font-bold text-green-600">{pattern.successRate}</div>
                            <div className="text-sm text-gray-600">Success Rate</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-600">{pattern.avgROI}</div>
                            <div className="text-sm text-gray-600">Avg ROI</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Key Success Factors
                        </h4>
                        <div className="space-y-2">
                          {pattern.keyFactors.map((factor, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">{factor}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Risk Factors
                        </h4>
                        <div className="space-y-2">
                          {pattern.riskFactors.map((risk, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">{risk}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'challenges' && (
              <div className="space-y-6">
                {commonChallenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">{challenge.challenge}</h3>
                          <div className="flex items-center gap-2">
                            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                              {challenge.frequency}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              challenge.severity === 'High' ? 'bg-red-100 text-red-700' :
                              challenge.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {challenge.severity}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{challenge.description}</p>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <div className="text-sm font-medium text-blue-800 mb-1">Typical Resolution</div>
                          <div className="text-blue-700">{challenge.timeline}</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-green-700 mb-3">Proven Solutions</h4>
                        <div className="space-y-2 mb-4">
                          {challenge.solutions.map((solution, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{solution}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="text-sm font-medium text-green-800 mb-2">Success Examples</div>
                          {challenge.successStories.map((story, idx) => (
                            <div key={idx} className="text-sm text-green-700 mb-1">• {story}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'future' && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200 mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Future of Real Estate Technology</h3>
                  <p className="text-gray-700 mb-6">
                    Based on current trends and case study patterns, here are the key technological shifts
                    that will reshape the real estate industry in the coming years.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {futurePredictions.map((prediction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{prediction.prediction}</h4>
                        <div className="text-right ml-4">
                          <div className="text-lg font-bold text-purple-600">{prediction.probability}</div>
                          <div className="text-xs text-gray-600">Probability</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                          {prediction.timeframe}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          prediction.impact === 'Transformational' ? 'bg-red-100 text-red-700' :
                          prediction.impact === 'Revolutionary' ? 'bg-purple-100 text-purple-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {prediction.impact}
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{prediction.description}</p>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Key Implications</h5>
                        <div className="space-y-1">
                          {prediction.implications.map((implication, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <ArrowRight className="h-3 w-3 text-purple-500" />
                              <span className="text-sm text-gray-700">{implication}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="h-6 w-6 text-yellow-500" />
                    <h4 className="text-lg font-semibold text-gray-900">Actionable Insights</h4>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">For Small Teams</h5>
                      <p className="text-sm text-gray-700">Focus on mobile-first solutions and AI-powered lead qualification to compete effectively</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">For Large Brokerages</h5>
                      <p className="text-sm text-gray-700">Invest in predictive analytics and automated compliance to maintain market leadership</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">For All Organizations</h5>
                      <p className="text-sm text-gray-700">Prepare for VR adoption and blockchain integration to stay ahead of the curve</p>
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