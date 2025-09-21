'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Zap,
  Users,
  Target,
  BarChart3,
  MessageSquare,
  Calendar,
  Globe,
  Phone,
  Mail,
  FileText,
  Home,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Brain,
  Automation,
  TrendingUp,
  Shield,
  Heart,
  Coffee,
  Briefcase,
  Award,
  Star,
  Sparkles,
  Activity,
  RefreshCw,
  Bell,
  Camera,
  Map,
  Search,
  Filter,
  Edit3,
  Share2,
  Download,
  Upload,
  Settings
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const featureCategories = [
  {
    id: 'lead-generation',
    title: 'AI Lead Generation',
    description: 'Never miss an opportunity with intelligent lead capture and qualification',
    icon: Target,
    color: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10'
  },
  {
    id: 'client-management',
    title: 'Smart Client Management',
    description: 'Build stronger relationships with automated communication and follow-up',
    icon: Users,
    color: 'from-green-500 to-green-600',
    borderColor: 'border-green-500/30',
    bgColor: 'bg-green-500/10'
  },
  {
    id: 'marketing-automation',
    title: 'Marketing Automation',
    description: 'Professional marketing campaigns that run on autopilot',
    icon: Globe,
    color: 'from-purple-500 to-purple-600',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/10'
  },
  {
    id: 'transaction-support',
    title: 'Transaction Support',
    description: 'Streamlined deal management from contract to close',
    icon: FileText,
    color: 'from-orange-500 to-orange-600',
    borderColor: 'border-orange-500/30',
    bgColor: 'bg-orange-500/10'
  },
  {
    id: 'analytics-insights',
    title: 'Analytics & Insights',
    description: 'Data-driven insights to optimize your business performance',
    icon: BarChart3,
    color: 'from-cyan-500 to-cyan-600',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10'
  },
  {
    id: 'personal-assistant',
    title: 'Personal AI Assistant',
    description: 'Your 24/7 AI companion for scheduling, reminders, and task management',
    icon: Brain,
    color: 'from-pink-500 to-pink-600',
    borderColor: 'border-pink-500/30',
    bgColor: 'bg-pink-500/10'
  }
]

const featureDetails = {
  'lead-generation': {
    mainFeature: {
      title: 'Instant Lead Response System',
      description: 'Respond to leads within 3 minutes, 24/7, with personalized AI conversations that qualify prospects and schedule appointments automatically.',
      benefits: ['95% faster response time', '3x higher conversion rate', '24/7 availability', 'Intelligent qualification'],
      image: '/features/lead-response.png'
    },
    features: [
      {
        icon: Zap,
        title: 'Lightning-Fast Response',
        description: 'AI responds to leads in under 3 minutes via phone, text, or email',
        metric: '< 3 min response'
      },
      {
        icon: Brain,
        title: 'Smart Lead Qualification',
        description: 'AI asks the right questions to identify serious buyers and sellers',
        metric: '85% accuracy'
      },
      {
        icon: Calendar,
        title: 'Auto Appointment Setting',
        description: 'Seamlessly books qualified leads directly into your calendar',
        metric: '60% show rate'
      },
      {
        icon: Phone,
        title: 'Multi-Channel Outreach',
        description: 'Follows up via phone, SMS, email, and social media',
        metric: '5 touchpoints'
      }
    ]
  },
  'client-management': {
    mainFeature: {
      title: 'Relationship Intelligence Platform',
      description: 'Build deeper client relationships with AI that remembers every interaction, preference, and important date to help you provide personalized service.',
      benefits: ['40% more referrals', 'Personalized communication', 'Never miss follow-ups', 'Complete client history'],
      image: '/features/client-management.png'
    },
    features: [
      {
        icon: Heart,
        title: 'Personal Touch Automation',
        description: 'Remembers birthdays, anniversaries, and personal preferences',
        metric: '95% client satisfaction'
      },
      {
        icon: MessageSquare,
        title: 'Smart Communication',
        description: 'AI-crafted messages that feel personal and timely',
        metric: '70% open rate'
      },
      {
        icon: Bell,
        title: 'Intelligent Reminders',
        description: 'Never forget important client milestones or follow-ups',
        metric: '100% follow-up rate'
      },
      {
        icon: Activity,
        title: 'Relationship Scoring',
        description: 'Track relationship strength and identify opportunities',
        metric: 'Real-time insights'
      }
    ]
  },
  'marketing-automation': {
    mainFeature: {
      title: 'Professional Marketing on Autopilot',
      description: 'Create and distribute professional marketing content across all channels without spending hours on design or copywriting.',
      benefits: ['Save 20+ hours/week', 'Professional brand presence', 'Consistent posting', 'Higher engagement'],
      image: '/features/marketing-automation.png'
    },
    features: [
      {
        icon: Camera,
        title: 'AI Content Creation',
        description: 'Generate professional listing descriptions, social posts, and emails',
        metric: '10x faster creation'
      },
      {
        icon: Share2,
        title: 'Multi-Platform Publishing',
        description: 'Post to Facebook, Instagram, LinkedIn, and more simultaneously',
        metric: '8 platforms'
      },
      {
        icon: TrendingUp,
        title: 'Market Updates',
        description: 'Auto-generate and send personalized market reports to clients',
        metric: 'Weekly reports'
      },
      {
        icon: Target,
        title: 'Targeted Campaigns',
        description: 'Create buyer and seller campaigns based on client behavior',
        metric: '3x higher CTR'
      }
    ]
  },
  'transaction-support': {
    mainFeature: {
      title: 'Seamless Transaction Management',
      description: 'Keep deals on track with automated timeline management, document preparation, and milestone reminders for smooth closings.',
      benefits: ['98% on-time closings', 'Reduced paperwork stress', 'Clear communication', 'Fewer deal fallouts'],
      image: '/features/transaction-support.png'
    },
    features: [
      {
        icon: CheckCircle,
        title: 'Smart Checklists',
        description: 'Dynamic task lists that adapt to each transaction type',
        metric: '98% completion rate'
      },
      {
        icon: FileText,
        title: 'Document Automation',
        description: 'Auto-populate contracts and forms with client information',
        metric: '80% time savings'
      },
      {
        icon: Clock,
        title: 'Timeline Management',
        description: 'Track critical dates and notify all parties automatically',
        metric: 'Zero missed deadlines'
      },
      {
        icon: Users,
        title: 'Multi-Party Communication',
        description: 'Keep buyers, sellers, lenders, and agents informed',
        metric: 'Real-time updates'
      }
    ]
  },
  'analytics-insights': {
    mainFeature: {
      title: 'Business Intelligence Dashboard',
      description: 'Make data-driven decisions with comprehensive analytics that track your performance, identify trends, and reveal growth opportunities.',
      benefits: ['Identify best lead sources', 'Optimize conversion rates', 'Track ROI', 'Predictive insights'],
      image: '/features/analytics-insights.png'
    },
    features: [
      {
        icon: BarChart3,
        title: 'Performance Analytics',
        description: 'Track conversion rates, response times, and deal velocity',
        metric: '50+ metrics'
      },
      {
        icon: Map,
        title: 'Market Intelligence',
        description: 'Hyper-local market data and comparable analysis',
        metric: 'Real-time data'
      },
      {
        icon: DollarSign,
        title: 'ROI Tracking',
        description: 'Measure marketing spend effectiveness and lead source performance',
        metric: 'Complete attribution'
      },
      {
        icon: TrendingUp,
        title: 'Predictive Insights',
        description: 'AI-powered forecasting for leads, closings, and income',
        metric: '90% accuracy'
      }
    ]
  },
  'personal-assistant': {
    mainFeature: {
      title: 'Your 24/7 AI Business Partner',
      description: 'A personal AI assistant that handles scheduling, research, follow-ups, and administrative tasks so you can focus on high-value activities.',
      benefits: ['25+ hours saved/week', 'Never miss opportunities', 'Perfect organization', 'Stress-free operations'],
      image: '/features/personal-assistant.png'
    },
    features: [
      {
        icon: Calendar,
        title: 'Intelligent Scheduling',
        description: 'AI coordinates your calendar, avoiding conflicts and optimizing routes',
        metric: '40% more efficient'
      },
      {
        icon: Search,
        title: 'Property Research',
        description: 'Instant property analysis, comps, and market data compilation',
        metric: '10x faster research'
      },
      {
        icon: Coffee,
        title: 'Daily Briefings',
        description: 'Morning summaries of your day, priorities, and opportunities',
        metric: 'Daily insights'
      },
      {
        icon: Settings,
        title: 'Task Automation',
        description: 'Automate repetitive tasks and admin work intelligently',
        metric: '80% automation'
      }
    ]
  }
}

const successStats = [
  {
    label: 'Average Income Increase',
    value: '+147%',
    description: 'Within first 12 months',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    label: 'Time Saved Per Week',
    value: '25 hrs',
    description: 'More time for clients & family',
    icon: Clock,
    color: 'text-blue-600'
  },
  {
    label: 'Lead Response Time',
    value: '3 min',
    description: '95% faster than average',
    icon: Zap,
    color: 'text-purple-600'
  },
  {
    label: 'Client Satisfaction',
    value: '4.9/5',
    description: 'Highest in industry',
    icon: Star,
    color: 'text-orange-600'
  }
]

export function SoloAgentFeatures() {
  const [activeCategory, setActiveCategory] = useState('lead-generation')
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
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
            <Sparkles className="w-5 h-5 mr-2" />
            All-in-One Solo Agent Platform
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8"
          >
            Everything You Need to
            <span className="block text-gradient bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Dominate Your Market
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
          >
            Our AI-powered platform handles the heavy lifting so you can focus on what matters most:
            <span className="text-purple-600 font-semibold"> building relationships</span>,
            <span className="text-blue-600 font-semibold"> closing deals</span>, and
            <span className="text-cyan-600 font-semibold"> growing your business</span>.
          </motion.p>

          {/* Success Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          >
            {successStats.map((stat, index) => {
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
                  <div className="text-sm font-semibold text-gray-700 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.description}</div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Feature Categories Navigation */}
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
            {featureCategories.map((category) => {
              const IconComponent = category.icon
              const isActive = activeCategory === category.id

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="text-sm font-bold">{category.title}</div>
                    <div className="text-xs opacity-80">{category.description}</div>
                  </div>
                </button>
              )
            })}
          </motion.div>

          {/* Active Category Details */}
          <AnimatePresence mode="wait">
            {featureCategories.map((category) => {
              if (category.id !== activeCategory) return null
              const details = featureDetails[category.id as keyof typeof featureDetails]

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-12"
                >
                  {/* Main Feature Highlight */}
                  <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-200">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      <div>
                        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-6 ${category.bgColor} ${category.borderColor} border`}>
                          <category.icon className="w-4 h-4 mr-2" />
                          Featured Capability
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-6">
                          {details.mainFeature.title}
                        </h3>
                        <p className="text-lg text-gray-600 mb-8">
                          {details.mainFeature.description}
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                          {details.mainFeature.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          Try This Feature
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                      <div className="relative">
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 aspect-square flex items-center justify-center">
                          <div className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center`}>
                            <category.icon className="w-10 h-10 text-white" />
                          </div>
                        </div>
                        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          NEW
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {details.features.map((feature, index) => {
                      const IconComponent = feature.icon
                      const isHovered = hoveredFeature === `${category.id}-${index}`

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          onHoverStart={() => setHoveredFeature(`${category.id}-${index}`)}
                          onHoverEnd={() => setHoveredFeature(null)}
                          className={`bg-white rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer group ${
                            isHovered
                              ? `${category.borderColor} shadow-xl scale-105`
                              : 'border-gray-200 hover:border-gray-300 shadow-lg'
                          }`}
                        >
                          <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <IconComponent className="w-6 h-6 text-gray-600" />
                          </div>
                          <h4 className="text-lg font-bold text-gray-900 mb-3">
                            {feature.title}
                          </h4>
                          <p className="text-gray-600 mb-4 text-sm">
                            {feature.description}
                          </p>
                          <div className={`text-sm font-semibold px-3 py-1 rounded-full inline-block ${category.bgColor} text-gray-700`}>
                            {feature.metric}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
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
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-6">
              Ready to Transform Your Solo Practice?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join 2,500+ successful solo agents who've automated their workflows and
              increased their income by an average of 147% within 12 months.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Free 7-Day Trial
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Personal Demo
              </Button>
            </div>
            <div className="flex justify-center items-center space-x-8 mt-8 text-purple-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Setup in 24 Hours</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}