'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Database,
  Users,
  Globe,
  Mail,
  Calendar,
  FileText,
  BarChart3,
  Smartphone,
  Cloud,
  Zap,
  Settings,
  CheckCircle,
  ArrowRight,
  Link2,
  Workflow,
  Shield,
  Clock,
  TrendingUp,
  Target,
  MessageSquare,
  CreditCard,
  Building
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const integrationCategories = [
  {
    id: 'crm',
    title: 'CRM Systems',
    description: 'Connect your customer relationship management tools',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10',
    integrations: [
      {
        name: 'Salesforce',
        logo: '/logos/salesforce.svg',
        description: 'Complete CRM integration with real-time contact sync',
        features: ['Contact Sync', 'Lead Management', 'Activity Tracking', 'Custom Fields'],
        connectionType: 'Bi-directional',
        setupTime: '24 hours',
        popularity: 95
      },
      {
        name: 'HubSpot',
        logo: '/logos/hubspot.svg',
        description: 'Marketing automation with lead nurturing workflows',
        features: ['Marketing Automation', 'Email Sequences', 'Lead Scoring', 'Analytics'],
        connectionType: 'Bi-directional',
        setupTime: '12 hours',
        popularity: 88
      },
      {
        name: 'Pipedrive',
        logo: '/logos/pipedrive.svg',
        description: 'Pipeline management for real estate sales process',
        features: ['Pipeline Management', 'Deal Tracking', 'Activity Reminders', 'Reports'],
        connectionType: 'Bi-directional',
        setupTime: '6 hours',
        popularity: 82
      }
    ]
  },
  {
    id: 'mls',
    title: 'MLS & Property Data',
    description: 'Real-time property listing synchronization',
    icon: Database,
    color: 'from-green-500 to-green-600',
    borderColor: 'border-green-500/30',
    bgColor: 'bg-green-500/10',
    integrations: [
      {
        name: 'MLS Grid',
        logo: '/logos/mls-grid.svg',
        description: 'Multi-MLS data aggregation and standardization',
        features: ['Multi-MLS Access', 'Data Standardization', 'Real-time Updates', 'Photo Sync'],
        connectionType: 'Pull Data',
        setupTime: '48 hours',
        popularity: 92
      },
      {
        name: 'Zillow',
        logo: '/logos/zillow.svg',
        description: 'Property valuations and market data integration',
        features: ['Zestimate Data', 'Market Analytics', 'Property History', 'Neighborhood Data'],
        connectionType: 'Pull Data',
        setupTime: '24 hours',
        popularity: 89
      },
      {
        name: 'Local MLS',
        logo: '/logos/mls.svg',
        description: 'Direct connection to your local MLS system',
        features: ['Direct MLS Access', 'Listing Sync', 'Status Updates', 'Custom Fields'],
        connectionType: 'Bi-directional',
        setupTime: '72 hours',
        popularity: 85
      }
    ]
  },
  {
    id: 'marketing',
    title: 'Marketing Tools',
    description: 'Automate your marketing campaigns and social media',
    icon: Globe,
    color: 'from-purple-500 to-purple-600',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/10',
    integrations: [
      {
        name: 'Mailchimp',
        logo: '/logos/mailchimp.svg',
        description: 'Email marketing automation for real estate',
        features: ['Email Campaigns', 'Audience Segmentation', 'Automation', 'Analytics'],
        connectionType: 'Bi-directional',
        setupTime: '8 hours',
        popularity: 91
      },
      {
        name: 'Facebook Ads',
        logo: '/logos/facebook.svg',
        description: 'Social media advertising campaign management',
        features: ['Lead Ads', 'Retargeting', 'Lookalike Audiences', 'ROI Tracking'],
        connectionType: 'Bi-directional',
        setupTime: '12 hours',
        popularity: 87
      },
      {
        name: 'Google Ads',
        logo: '/logos/google.svg',
        description: 'Search and display advertising integration',
        features: ['Search Ads', 'Display Network', 'Lead Extensions', 'Conversion Tracking'],
        connectionType: 'Bi-directional',
        setupTime: '16 hours',
        popularity: 84
      }
    ]
  },
  {
    id: 'communication',
    title: 'Communication',
    description: 'Unified messaging and communication platforms',
    icon: MessageSquare,
    color: 'from-orange-500 to-orange-600',
    borderColor: 'border-orange-500/30',
    bgColor: 'bg-orange-500/10',
    integrations: [
      {
        name: 'Twilio',
        logo: '/logos/twilio.svg',
        description: 'SMS and voice communication automation',
        features: ['SMS Automation', 'Voice Calls', 'WhatsApp Business', 'Call Tracking'],
        connectionType: 'Bi-directional',
        setupTime: '6 hours',
        popularity: 86
      },
      {
        name: 'Slack',
        logo: '/logos/slack.svg',
        description: 'Team communication and notification hub',
        features: ['Team Messaging', 'File Sharing', 'Integrations', 'Notifications'],
        connectionType: 'Push Notifications',
        setupTime: '2 hours',
        popularity: 79
      },
      {
        name: 'Zoom',
        logo: '/logos/zoom.svg',
        description: 'Video conferencing for client meetings',
        features: ['Video Meetings', 'Screen Sharing', 'Recording', 'Calendar Integration'],
        connectionType: 'Bi-directional',
        setupTime: '4 hours',
        popularity: 83
      }
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics & Reporting',
    description: 'Business intelligence and performance tracking',
    icon: BarChart3,
    color: 'from-cyan-500 to-cyan-600',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
    integrations: [
      {
        name: 'Google Analytics',
        logo: '/logos/google-analytics.svg',
        description: 'Website and lead generation analytics',
        features: ['Traffic Analysis', 'Goal Tracking', 'Lead Attribution', 'Custom Reports'],
        connectionType: 'Pull Data',
        setupTime: '4 hours',
        popularity: 94
      },
      {
        name: 'Tableau',
        logo: '/logos/tableau.svg',
        description: 'Advanced data visualization and business intelligence',
        features: ['Data Visualization', 'Custom Dashboards', 'Real-time Updates', 'Sharing'],
        connectionType: 'Pull Data',
        setupTime: '24 hours',
        popularity: 77
      },
      {
        name: 'Power BI',
        logo: '/logos/powerbi.svg',
        description: 'Microsoft business analytics platform',
        features: ['Interactive Dashboards', 'Data Modeling', 'Real-time Analytics', 'Collaboration'],
        connectionType: 'Pull Data',
        setupTime: '16 hours',
        popularity: 81
      }
    ]
  },
  {
    id: 'financial',
    title: 'Financial & Transactions',
    description: 'Payment processing and financial management',
    icon: CreditCard,
    color: 'from-emerald-500 to-emerald-600',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
    integrations: [
      {
        name: 'DocuSign',
        logo: '/logos/docusign.svg',
        description: 'Digital signature and document management',
        features: ['E-signatures', 'Document Templates', 'Workflow Automation', 'Compliance'],
        connectionType: 'Bi-directional',
        setupTime: '8 hours',
        popularity: 93
      },
      {
        name: 'Stripe',
        logo: '/logos/stripe.svg',
        description: 'Payment processing for real estate transactions',
        features: ['Payment Processing', 'Subscription Billing', 'Invoicing', 'Analytics'],
        connectionType: 'Bi-directional',
        setupTime: '12 hours',
        popularity: 85
      },
      {
        name: 'QuickBooks',
        logo: '/logos/quickbooks.svg',
        description: 'Accounting and financial management integration',
        features: ['Expense Tracking', 'Invoice Management', 'Tax Preparation', 'Reports'],
        connectionType: 'Bi-directional',
        setupTime: '16 hours',
        popularity: 88
      }
    ]
  }
]

const integrationStats = [
  {
    label: 'Total Integrations',
    value: '250+',
    icon: Link2,
    color: 'text-blue-600'
  },
  {
    label: 'Average Setup Time',
    value: '< 24hrs',
    icon: Clock,
    color: 'text-green-600'
  },
  {
    label: 'Success Rate',
    value: '99.7%',
    icon: CheckCircle,
    color: 'text-purple-600'
  },
  {
    label: 'Data Security',
    value: 'SOC 2',
    icon: Shield,
    color: 'text-orange-600'
  }
]

export function IntegrationShowcase() {
  const [activeCategory, setActiveCategory] = useState('crm')
  const [hoveredIntegration, setHoveredIntegration] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      }
    }
  }

  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-slate-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full text-purple-700 text-sm font-semibold mb-8 border border-purple-200"
          >
            <Workflow className="w-5 h-5 mr-2" />
            250+ Pre-Built Integrations
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8"
          >
            Connect Your Entire
            <span className="block text-gradient bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Real Estate Tech Stack
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
          >
            Seamlessly integrate with the tools you already use. Our intelligent platform connects
            <span className="text-purple-600 font-semibold"> CRM systems</span>,
            <span className="text-blue-600 font-semibold"> MLS databases</span>,
            <span className="text-cyan-600 font-semibold"> marketing platforms</span>, and more.
          </motion.p>

          {/* Integration Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          >
            {integrationStats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg"
                >
                  <div className="flex items-center justify-center mb-3">
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Integration Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {integrationCategories.map((category) => {
              const IconComponent = category.icon
              const isActive = activeCategory === category.id

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-3" />
                  {category.title}
                </button>
              )
            })}
          </motion.div>

          {/* Active Category Details */}
          {integrationCategories.map((category) => {
            if (category.id !== activeCategory) return null

            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {category.title}
                  </h3>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.integrations.map((integration, index) => (
                    <motion.div
                      key={integration.name}
                      variants={cardVariants}
                      custom={index}
                      onHoverStart={() => setHoveredIntegration(integration.name)}
                      onHoverEnd={() => setHoveredIntegration(null)}
                      className={`bg-white rounded-2xl p-8 border-2 transition-all duration-300 cursor-pointer group ${
                        hoveredIntegration === integration.name
                          ? `${category.borderColor} shadow-xl scale-105`
                          : 'border-gray-200 hover:border-gray-300 shadow-lg'
                      }`}
                    >
                      {/* Integration Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className={`w-16 h-16 ${category.bgColor} rounded-xl flex items-center justify-center`}>
                            <Building className="w-8 h-8 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">
                              {integration.name}
                            </h4>
                            <div className="flex items-center mt-1">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} mr-2`} />
                              <span className="text-sm text-gray-500">
                                {integration.connectionType}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">
                            {integration.popularity}%
                          </div>
                          <div className="text-xs text-gray-500">Popular</div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-6">
                        {integration.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3">
                          Key Features
                        </h5>
                        <div className="grid grid-cols-2 gap-2">
                          {integration.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Setup Time and CTA */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          Setup: {integration.setupTime}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:text-white group-hover:border-transparent transition-all duration-300"
                        >
                          Connect
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white"
          >
            <h3 className="text-3xl font-bold mb-6">
              Don't See Your Tool?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              We can build custom integrations for any real estate tool in your tech stack.
              Our team creates tailored solutions in as little as 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
              >
                <Zap className="w-5 h-5 mr-2" />
                Request Custom Integration
              </Button>
              <Button
                size="xl"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Integration Consultation
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}