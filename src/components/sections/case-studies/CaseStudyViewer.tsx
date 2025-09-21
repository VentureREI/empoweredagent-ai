'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Play, CheckCircle, MapPin, Calendar, Users, Building2,
  TrendingUp, DollarSign, Target, Clock, Star, Award,
  ArrowRight, BarChart3, Shield, Download, Share2
} from 'lucide-react'

// This would typically receive the selected case study as props
// For now, using a placeholder that matches the showcase data structure
const sampleCaseStudy = {
  id: 1,
  title: 'Premium Properties Group Transformation',
  client: 'Premium Properties Group',
  location: 'Orange County, CA',
  industry: 'Luxury Residential',
  businessType: 'Real Estate Team',
  teamSize: '12 agents',
  timeframe: '18 months',
  implementationDate: 'January 2022',
  verificationStatus: 'Third-party verified',
  clientLogo: '/logos/premium-properties.png',
  heroImage: '/case-studies/premium-properties-hero.jpg',
  videoUrl: '/case-studies/premium-properties-video.mp4',
  beforeMetrics: {
    revenue: '$2.1M',
    deals: 89,
    marketShare: '3.2%',
    avgDealSize: '$23.6K',
    leadConversion: '8%',
    responseTime: '4.2 hours',
    clientSatisfaction: '3.8/5',
    agentRetention: '67%'
  },
  afterMetrics: {
    revenue: '$8.7M',
    deals: 247,
    marketShare: '12.4%',
    avgDealSize: '$35.2K',
    leadConversion: '24%',
    responseTime: '8 minutes',
    clientSatisfaction: '4.9/5',
    agentRetention: '96%'
  },
  keyResults: [
    { metric: 'Revenue Growth', value: '+314%', description: 'Quadrupled annual revenue in 18 months' },
    { metric: 'Market Share', value: '+287%', description: 'Became #1 luxury team in Orange County' },
    { metric: 'Deal Volume', value: '+177%', description: 'Nearly tripled transaction volume' },
    { metric: 'Efficiency', value: '+421%', description: 'Response time improved from hours to minutes' }
  ],
  challenges: [
    'Manual lead management causing delays and lost opportunities',
    'No centralized client communication system',
    'Difficulty tracking individual agent performance',
    'Limited market analysis capabilities for luxury segment',
    'High agent turnover due to inefficient processes',
    'Inconsistent client experience across team members'
  ],
  solutions: [
    'Automated lead routing and intelligent scoring system',
    'Unified communication platform with client portal',
    'Real-time performance analytics and coaching tools',
    'Advanced market intelligence for luxury properties',
    'Streamlined workflows and agent productivity tools',
    'Standardized client experience protocols'
  ],
  implementation: {
    phase1: {
      title: 'Discovery & Planning',
      duration: '2 weeks',
      activities: [
        'Current process audit and gap analysis',
        'Team interviews and requirement gathering',
        'Custom workflow design and approval',
        'Data migration planning and timeline'
      ]
    },
    phase2: {
      title: 'Platform Setup & Migration',
      duration: '3 weeks',
      activities: [
        'Platform configuration and customization',
        'Historical data migration and validation',
        'Integration with existing tools and systems',
        'Initial testing and quality assurance'
      ]
    },
    phase3: {
      title: 'Training & Onboarding',
      duration: '2 weeks',
      activities: [
        'Comprehensive team training sessions',
        'Individual agent onboarding and setup',
        'Process documentation and best practices',
        'Go-live preparation and support planning'
      ]
    },
    phase4: {
      title: 'Launch & Optimization',
      duration: '4 weeks',
      activities: [
        'Soft launch with core team members',
        'Performance monitoring and adjustments',
        'Full team rollout and adoption',
        'Ongoing optimization and refinement'
      ]
    }
  },
  timeline: [
    { month: 'Month 1-2', milestone: 'Platform Implementation', status: 'completed' },
    { month: 'Month 3-6', milestone: 'Team Adoption & Training', status: 'completed' },
    { month: 'Month 7-12', milestone: 'Process Optimization', status: 'completed' },
    { month: 'Month 13-18', milestone: 'Scale & Market Expansion', status: 'completed' }
  ],
  testimonial: {
    quote: "In 18 months, we went from a struggling mid-tier team to the #1 luxury real estate team in Orange County. The platform didn't just improve our efficiency—it completely transformed how we do business. Our agents are happier, our clients are thrilled, and our revenue has grown beyond our wildest expectations.",
    author: 'Jennifer Walsh',
    title: 'Team Leader & Principal Agent',
    photo: '/testimonials/jennifer-walsh.jpg',
    company: 'Premium Properties Group'
  },
  additionalTestimonials: [
    {
      quote: "The lead routing system alone saved us 15+ hours per week. Now leads are instantly assigned to the right agent based on expertise and availability.",
      author: 'Michael Chen',
      title: 'Senior Agent',
      specialty: 'Luxury Condos'
    },
    {
      quote: "Our client satisfaction scores went from 3.8 to 4.9. The unified communication system means no client ever falls through the cracks.",
      author: 'Sarah Rodriguez',
      title: 'Client Relations Manager',
      specialty: 'Client Experience'
    }
  ],
  roi: '847%',
  tags: ['Luxury Real Estate', 'Team Growth', 'Market Leadership', 'ROI Excellence'],
  verification: {
    auditor: 'Real Estate Analytics Corp',
    date: 'September 2023',
    certificate: '/verifications/premium-properties-cert.pdf',
    methodology: 'Independent third-party verification of all metrics through financial records, CRM data exports, and market analysis reports.'
  }
}

export default function CaseStudyViewer() {
  const [isOpen, setIsOpen] = useState(false) // This would be controlled by parent component
  const [activeTab, setActiveTab] = useState('overview')
  const [showVideo, setShowVideo] = useState(false)

  const calculateGrowth = (before: string, after: string) => {
    const beforeNum = parseFloat(before.replace(/[^0-9.]/g, ''))
    const afterNum = parseFloat(after.replace(/[^0-9.]/g, ''))
    return Math.round(((afterNum - beforeNum) / beforeNum) * 100)
  }

  const tabs = [
    { id: 'overview', title: 'Overview', icon: BarChart3 },
    { id: 'implementation', title: 'Implementation', icon: CheckCircle },
    { id: 'results', title: 'Results', icon: TrendingUp },
    { id: 'testimonials', title: 'Testimonials', icon: Star }
  ]

  if (!isOpen) {
    // Show trigger button for demo purposes
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            <Play className="h-5 w-5" />
            View Detailed Case Study Example
          </button>
          <p className="text-gray-600 mt-4">Click to see our in-depth case study viewer</p>
        </div>
      </section>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{sampleCaseStudy.client}</h2>
                    <div className="text-purple-100 text-sm">{sampleCaseStudy.location} • {sampleCaseStudy.industry}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
                    <Shield className="h-4 w-4 text-green-300" />
                    <span className="text-white text-sm">{sampleCaseStudy.verificationStatus}</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex h-[calc(90vh-80px)]">
              {/* Sidebar */}
              <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
                <div className="space-y-2">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-purple-100 text-purple-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                        {tab.title}
                      </button>
                    )
                  })}
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Quick Stats</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{sampleCaseStudy.roi}%</div>
                      <div className="text-sm text-gray-600">ROI Increase</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{sampleCaseStudy.afterMetrics.revenue}</div>
                      <div className="text-sm text-gray-600">Final Revenue</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{sampleCaseStudy.timeframe}</div>
                      <div className="text-sm text-gray-600">Transformation Period</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Share2 className="h-4 w-4" />
                    Share Case Study
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeTab === 'overview' && (
                        <div className="space-y-8">
                          {/* Hero Section */}
                          <div className="relative">
                            <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                              <button
                                onClick={() => setShowVideo(true)}
                                className="bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-colors shadow-lg"
                              >
                                <Play className="h-8 w-8 text-purple-600" />
                              </button>
                            </div>
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                              <span className="text-sm font-medium text-gray-900">Success Story Video</span>
                            </div>
                          </div>

                          {/* Key Results */}
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Results Achieved</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                              {sampleCaseStudy.keyResults.map((result, index) => (
                                <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                                  <div className="text-3xl font-bold text-green-600 mb-2">{result.value}</div>
                                  <div className="font-semibold text-gray-900 mb-2">{result.metric}</div>
                                  <div className="text-gray-700">{result.description}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Before vs After */}
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Before vs After Comparison</h3>
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                                <div className="p-6">
                                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                    Before Platform
                                  </h4>
                                  <div className="space-y-3">
                                    {Object.entries(sampleCaseStudy.beforeMetrics).map(([key, value]) => (
                                      <div key={key} className="flex justify-between">
                                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                        <span className="font-semibold">{value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="p-6">
                                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    After Platform
                                  </h4>
                                  <div className="space-y-3">
                                    {Object.entries(sampleCaseStudy.afterMetrics).map(([key, value]) => (
                                      <div key={key} className="flex justify-between">
                                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                        <span className="font-semibold text-green-600">{value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Challenges & Solutions */}
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Challenges & Solutions</h3>
                            <div className="grid lg:grid-cols-2 gap-8">
                              <div>
                                <h4 className="text-lg font-semibold text-red-600 mb-4">Challenges Faced</h4>
                                <div className="space-y-3">
                                  {sampleCaseStudy.challenges.map((challenge, index) => (
                                    <div key={index} className="flex gap-3">
                                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-gray-700">{challenge}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-lg font-semibold text-green-600 mb-4">Solutions Implemented</h4>
                                <div className="space-y-3">
                                  {sampleCaseStudy.solutions.map((solution, index) => (
                                    <div key={index} className="flex gap-3">
                                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-700">{solution}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'implementation' && (
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Implementation Timeline</h3>
                            <div className="space-y-6">
                              {Object.entries(sampleCaseStudy.implementation).map(([phase, data], index) => (
                                <div key={phase} className="flex gap-6">
                                  <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                      {index + 1}
                                    </div>
                                    {index < Object.keys(sampleCaseStudy.implementation).length - 1 && (
                                      <div className="w-0.5 h-16 bg-purple-200 mt-2"></div>
                                    )}
                                  </div>
                                  <div className="flex-1 pb-8">
                                    <div className="flex items-center gap-3 mb-3">
                                      <h4 className="text-lg font-semibold text-gray-900">{data.title}</h4>
                                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                                        {data.duration}
                                      </span>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-3">
                                      {data.activities.map((activity, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                          <CheckCircle className="w-4 h-4 text-green-500" />
                                          <span className="text-gray-700 text-sm">{activity}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Major Milestones</h3>
                            <div className="bg-gray-50 rounded-xl p-6">
                              <div className="space-y-4">
                                {sampleCaseStudy.timeline.map((milestone, index) => (
                                  <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <CheckCircle className="w-5 h-5 text-green-500" />
                                      <div>
                                        <div className="font-medium text-gray-900">{milestone.milestone}</div>
                                        <div className="text-sm text-gray-600">{milestone.month}</div>
                                      </div>
                                    </div>
                                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                      Completed
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'results' && (
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Performance Metrics</h3>

                            {/* Revenue Growth Chart Placeholder */}
                            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 mb-6">
                              <h4 className="text-lg font-semibold text-gray-900 mb-4">Revenue Growth Over Time</h4>
                              <div className="h-64 flex items-end justify-center gap-4">
                                {Array.from({ length: 6 }, (_, i) => (
                                  <div key={i} className="flex flex-col items-center">
                                    <div
                                      className="bg-gradient-to-t from-purple-500 to-blue-500 rounded-t"
                                      style={{
                                        height: `${40 + (i * 30)}px`,
                                        width: '32px'
                                      }}
                                    ></div>
                                    <div className="text-xs text-gray-600 mt-2">Q{i + 1}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Key Metrics Grid */}
                            <div className="grid md:grid-cols-3 gap-6">
                              {[
                                { label: 'Total Revenue Impact', value: '+$6.6M', description: 'Additional annual revenue' },
                                { label: 'Cost Savings', value: '$180K', description: 'Operational efficiency gains' },
                                { label: 'Time Saved', value: '45 hrs/week', description: 'Team productivity increase' }
                              ].map((metric, index) => (
                                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                                  <div className="text-3xl font-bold text-purple-600 mb-2">{metric.value}</div>
                                  <div className="font-semibold text-gray-900 mb-1">{metric.label}</div>
                                  <div className="text-sm text-gray-600">{metric.description}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Verification */}
                          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <Shield className="w-6 h-6 text-green-600" />
                              <h4 className="text-lg font-semibold text-green-800">Third-Party Verification</h4>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm text-green-700 mb-1">Verified by</div>
                                <div className="font-semibold text-green-800">{sampleCaseStudy.verification.auditor}</div>
                              </div>
                              <div>
                                <div className="text-sm text-green-700 mb-1">Verification Date</div>
                                <div className="font-semibold text-green-800">{sampleCaseStudy.verification.date}</div>
                              </div>
                            </div>
                            <div className="mt-4">
                              <div className="text-sm text-green-700 mb-1">Methodology</div>
                              <div className="text-green-800">{sampleCaseStudy.verification.methodology}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'testimonials' && (
                        <div className="space-y-8">
                          {/* Main Testimonial */}
                          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                  {sampleCaseStudy.testimonial.author.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{sampleCaseStudy.testimonial.author}</div>
                                <div className="text-purple-600 font-medium">{sampleCaseStudy.testimonial.title}</div>
                                <div className="text-gray-600">{sampleCaseStudy.testimonial.company}</div>
                              </div>
                            </div>
                            <blockquote className="text-lg text-gray-800 italic leading-relaxed">
                              "{sampleCaseStudy.testimonial.quote}"
                            </blockquote>
                          </div>

                          {/* Additional Testimonials */}
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-6">Team Member Testimonials</h4>
                            <div className="grid md:grid-cols-2 gap-6">
                              {sampleCaseStudy.additionalTestimonials.map((testimonial, index) => (
                                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                                      <span className="text-white font-bold text-sm">
                                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                                      </span>
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-900">{testimonial.author}</div>
                                      <div className="text-sm text-blue-600">{testimonial.title}</div>
                                      <div className="text-xs text-gray-500">{testimonial.specialty}</div>
                                    </div>
                                  </div>
                                  <blockquote className="text-gray-700 italic">
                                    "{testimonial.quote}"
                                  </blockquote>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}