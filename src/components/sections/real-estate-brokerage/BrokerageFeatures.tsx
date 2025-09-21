'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Users, Building2, DollarSign, BarChart3, Shield, Target,
  TrendingUp, Award, Clock, CheckCircle, Star, Zap,
  FileText, MapPin, Calendar, Bell, Settings, Lock,
  PieChart, Activity, ArrowRight, Briefcase, Globe
} from 'lucide-react'

const featureCategories = [
  {
    id: 'agent-management',
    title: 'Agent Management',
    description: 'Complete agent lifecycle management and performance optimization',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    gradient: 'bg-gradient-to-r from-blue-50 to-blue-100'
  },
  {
    id: 'commission-tracking',
    title: 'Commission & Finance',
    description: 'Automated commission calculations and financial analytics',
    icon: DollarSign,
    color: 'from-green-500 to-green-600',
    gradient: 'bg-gradient-to-r from-green-50 to-green-100'
  },
  {
    id: 'market-analytics',
    title: 'Market Intelligence',
    description: 'Advanced market analysis and competitive intelligence',
    icon: BarChart3,
    color: 'from-purple-500 to-purple-600',
    gradient: 'bg-gradient-to-r from-purple-50 to-purple-100'
  },
  {
    id: 'compliance-tools',
    title: 'Compliance & Legal',
    description: 'Automated compliance monitoring and legal documentation',
    icon: Shield,
    color: 'from-red-500 to-red-600',
    gradient: 'bg-gradient-to-r from-red-50 to-red-100'
  },
  {
    id: 'lead-distribution',
    title: 'Lead Distribution',
    description: 'Intelligent lead routing and assignment automation',
    icon: Target,
    color: 'from-orange-500 to-orange-600',
    gradient: 'bg-gradient-to-r from-orange-50 to-orange-100'
  },
  {
    id: 'business-intelligence',
    title: 'Business Intelligence',
    description: 'Comprehensive reporting and predictive analytics',
    icon: TrendingUp,
    color: 'from-indigo-500 to-indigo-600',
    gradient: 'bg-gradient-to-r from-indigo-50 to-indigo-100'
  }
]

const featureDetails = {
  'agent-management': [
    {
      title: 'Agent Onboarding',
      description: 'Streamlined digital onboarding with automated document collection',
      icon: CheckCircle,
      benefits: ['90% faster onboarding', 'Digital signature integration', 'Automated compliance checks']
    },
    {
      title: 'Performance Analytics',
      description: 'Real-time agent performance tracking and coaching insights',
      icon: BarChart3,
      benefits: ['Individual scorecards', 'Goal tracking', 'Performance benchmarking']
    },
    {
      title: 'Training Management',
      description: 'Comprehensive training programs and certification tracking',
      icon: Award,
      benefits: ['Continuing education tracking', 'Custom training modules', 'Progress monitoring']
    },
    {
      title: 'Communication Hub',
      description: 'Centralized communication platform for brokerage-wide messaging',
      icon: Bell,
      benefits: ['Instant messaging', 'Broadcast announcements', 'Team collaboration']
    }
  ],
  'commission-tracking': [
    {
      title: 'Automated Calculations',
      description: 'AI-powered commission calculations with complex split handling',
      icon: DollarSign,
      benefits: ['Complex split management', '99.9% accuracy', 'Real-time calculations']
    },
    {
      title: 'Payment Processing',
      description: 'Integrated payment systems with automated disbursements',
      icon: Clock,
      benefits: ['Instant payments', 'Multiple payment methods', 'Tax form generation']
    },
    {
      title: 'Financial Reporting',
      description: 'Comprehensive financial dashboards and P&L statements',
      icon: FileText,
      benefits: ['Real-time financials', 'Customizable reports', 'Audit trails']
    },
    {
      title: 'Expense Management',
      description: 'Track and manage brokerage expenses with approval workflows',
      icon: Briefcase,
      benefits: ['Expense categorization', 'Approval workflows', 'Receipt scanning']
    }
  ],
  'market-analytics': [
    {
      title: 'Market Trends',
      description: 'Real-time market analysis with predictive insights',
      icon: TrendingUp,
      benefits: ['Price predictions', 'Market forecasting', 'Trend analysis']
    },
    {
      title: 'Competitive Analysis',
      description: 'Monitor competitor activity and market positioning',
      icon: Target,
      benefits: ['Competitor tracking', 'Market share analysis', 'Pricing strategies']
    },
    {
      title: 'Territory Management',
      description: 'Geographic territory analysis and optimization',
      icon: MapPin,
      benefits: ['Territory mapping', 'Performance by area', 'Expansion planning']
    },
    {
      title: 'Custom Reports',
      description: 'Build custom market reports for agents and clients',
      icon: PieChart,
      benefits: ['Drag-and-drop builder', 'White-label reports', 'Automated delivery']
    }
  ],
  'compliance-tools': [
    {
      title: 'Regulatory Monitoring',
      description: 'Automated compliance monitoring across all transactions',
      icon: Shield,
      benefits: ['Real-time monitoring', 'Violation alerts', 'Audit preparation']
    },
    {
      title: 'Document Management',
      description: 'Secure document storage with compliance tracking',
      icon: FileText,
      benefits: ['Version control', 'Access logs', 'Retention policies']
    },
    {
      title: 'License Tracking',
      description: 'Automated license renewal reminders and status monitoring',
      icon: Award,
      benefits: ['Renewal alerts', 'Status tracking', 'Continuing education']
    },
    {
      title: 'Risk Assessment',
      description: 'AI-powered risk analysis for transactions and agents',
      icon: Lock,
      benefits: ['Risk scoring', 'Fraud detection', 'Preventive measures']
    }
  ],
  'lead-distribution': [
    {
      title: 'Smart Routing',
      description: 'AI-powered lead assignment based on agent expertise and availability',
      icon: Target,
      benefits: ['Intelligent matching', 'Fair distribution', 'Performance-based routing']
    },
    {
      title: 'Lead Scoring',
      description: 'Advanced lead qualification and priority scoring',
      icon: Star,
      benefits: ['Quality scoring', 'Conversion prediction', 'Priority ranking']
    },
    {
      title: 'Response Tracking',
      description: 'Monitor lead response times and follow-up activities',
      icon: Clock,
      benefits: ['Response monitoring', 'Follow-up reminders', 'Performance metrics']
    },
    {
      title: 'Source Attribution',
      description: 'Track lead sources and ROI for marketing campaigns',
      icon: Activity,
      benefits: ['Source tracking', 'ROI analysis', 'Campaign optimization']
    }
  ],
  'business-intelligence': [
    {
      title: 'Executive Dashboard',
      description: 'High-level KPI dashboard for brokerage leadership',
      icon: BarChart3,
      benefits: ['Real-time KPIs', 'Executive summaries', 'Trend analysis']
    },
    {
      title: 'Predictive Analytics',
      description: 'AI-powered forecasting for revenue and market trends',
      icon: TrendingUp,
      benefits: ['Revenue forecasting', 'Market predictions', 'Growth planning']
    },
    {
      title: 'Custom Metrics',
      description: 'Build and track custom business metrics and goals',
      icon: Settings,
      benefits: ['Custom KPIs', 'Goal tracking', 'Benchmark comparisons']
    },
    {
      title: 'Data Integration',
      description: 'Connect external data sources for comprehensive analysis',
      icon: Globe,
      benefits: ['API connections', 'Data synchronization', 'Unified reporting']
    }
  ]
}

export default function BrokerageFeatures() {
  const [activeCategory, setActiveCategory] = useState('agent-management')
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const activeFeatures = featureDetails[activeCategory as keyof typeof featureDetails]

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
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Building2 className="h-4 w-4" />
            Comprehensive Brokerage Platform
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything Your Brokerage
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 block">
              Needs to Succeed
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From agent management to market intelligence, our platform provides
            all the tools you need to scale your brokerage operations.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featureCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'border-purple-300 bg-gradient-to-r from-purple-50 to-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-purple-200 hover:shadow-md'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} text-white mb-4`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{category.description}</p>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Feature Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl border border-gray-100"
          >
            <div className="grid lg:grid-cols-2 gap-8">
              {activeFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onHoverStart={() => setHoveredFeature(feature.title)}
                    onHoverEnd={() => setHoveredFeature(null)}
                    className={`p-6 bg-white rounded-xl border border-gray-200 transition-all duration-300 ${
                      hoveredFeature === feature.title ? 'shadow-lg border-purple-300 transform scale-105' : 'hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-lg mb-2">{feature.title}</h4>
                        <p className="text-gray-600 mb-4">{feature.description}</p>
                        <div className="space-y-2">
                          {feature.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Category CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center"
            >
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">
                  Ready to Transform Your {featureCategories.find(c => c.id === activeCategory)?.title}?
                </h3>
                <p className="text-purple-100 mb-4">
                  See how our platform can revolutionize your brokerage operations
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Schedule Demo
                  <ArrowRight className="inline-block ml-2 h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {[
            { number: '500+', label: 'Brokerages', description: 'Trust our platform' },
            { number: '50K+', label: 'Agents', description: 'Using daily' },
            { number: '99.9%', label: 'Uptime', description: 'Guaranteed reliability' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-purple-600 mb-1">{stat.label}</div>
              <div className="text-gray-600">{stat.description}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}