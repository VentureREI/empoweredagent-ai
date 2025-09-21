'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Users,
  Target,
  BarChart3,
  MessageSquare,
  Workflow,
  Crown,
  Zap,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Shield,
  Award,
  Sparkles,
  Activity,
  Bell,
  Settings,
  Calendar,
  Phone,
  Mail,
  Globe,
  Home,
  FileText,
  Star,
  Heart,
  Coffee,
  GitBranch,
  Network,
  Layers,
  Filter,
  Share2,
  UserCheck,
  PieChart,
  LineChart,
  Map,
  Building,
  Briefcase,
  Search,
  Edit3,
  Download,
  Upload
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'

const featureCategories = [
  {
    id: 'lead-management',
    title: 'Smart Lead Management',
    description: 'Intelligent lead distribution and automated follow-up systems',
    icon: Target,
    color: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10'
  },
  {
    id: 'team-performance',
    title: 'Team Performance Tracking',
    description: 'Real-time analytics and performance optimization tools',
    icon: BarChart3,
    color: 'from-green-500 to-green-600',
    borderColor: 'border-green-500/30',
    bgColor: 'bg-green-500/10'
  },
  {
    id: 'collaboration',
    title: 'Team Collaboration',
    description: 'Seamless communication and workflow coordination',
    icon: MessageSquare,
    color: 'from-purple-500 to-purple-600',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/10'
  },
  {
    id: 'automation',
    title: 'Workflow Automation',
    description: 'Automated processes that scale with your team growth',
    icon: Workflow,
    color: 'from-orange-500 to-orange-600',
    borderColor: 'border-orange-500/30',
    bgColor: 'bg-orange-500/10'
  },
  {
    id: 'management',
    title: 'Team Management',
    description: 'Comprehensive tools for managing agents and operations',
    icon: Users,
    color: 'from-cyan-500 to-cyan-600',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10'
  },
  {
    id: 'training',
    title: 'Training & Development',
    description: 'Onboarding and continuous skill development programs',
    icon: Award,
    color: 'from-pink-500 to-pink-600',
    borderColor: 'border-pink-500/30',
    bgColor: 'bg-pink-500/10'
  }
]

const featureDetails = {
  'lead-management': {
    mainFeature: {
      title: 'AI-Powered Lead Distribution Engine',
      description: 'Automatically distribute leads to the right team members based on expertise, availability, and performance metrics. Ensure no lead falls through the cracks with intelligent routing and instant notifications.',
      benefits: ['90% faster lead assignment', '3x higher conversion rates', 'Perfect lead matching', '24/7 automated follow-up'],
      image: '/features/lead-distribution.png'
    },
    features: [
      {
        icon: Target,
        title: 'Smart Lead Routing',
        description: 'AI matches leads to the best-suited agent based on specialization and availability',
        metric: '90% accuracy'
      },
      {
        icon: Zap,
        title: 'Instant Notifications',
        description: 'Real-time alerts ensure leads are contacted within minutes',
        metric: '< 2 min response'
      },
      {
        icon: BarChart3,
        title: 'Lead Scoring',
        description: 'Automatically prioritize high-value leads for maximum ROI',
        metric: '5x better qualification'
      },
      {
        icon: Activity,
        title: 'Follow-up Automation',
        description: 'Automated nurturing sequences that adapt to lead behavior',
        metric: '85% engagement rate'
      }
    ]
  },
  'team-performance': {
    mainFeature: {
      title: 'Real-Time Performance Dashboard',
      description: 'Track every metric that matters with comprehensive analytics that help you optimize team performance, identify top performers, and coach struggling agents to success.',
      benefits: ['Complete visibility', 'Data-driven decisions', 'Individual coaching insights', 'Team goal tracking'],
      image: '/features/performance-dashboard.png'
    },
    features: [
      {
        icon: BarChart3,
        title: 'Individual Metrics',
        description: 'Track each agent\'s performance with detailed analytics',
        metric: '50+ KPIs tracked'
      },
      {
        icon: TrendingUp,
        title: 'Team Benchmarks',
        description: 'Compare performance against team and industry standards',
        metric: 'Real-time insights'
      },
      {
        icon: PieChart,
        title: 'Revenue Analytics',
        description: 'Monitor team revenue, commissions, and profitability',
        metric: 'Complete attribution'
      },
      {
        icon: Award,
        title: 'Performance Goals',
        description: 'Set and track individual and team performance targets',
        metric: '95% goal achievement'
      }
    ]
  },
  'collaboration': {
    mainFeature: {
      title: 'Unified Team Communication Hub',
      description: 'Keep your entire team connected with integrated communication tools, shared calendars, and collaborative workspaces that ensure everyone stays aligned and informed.',
      benefits: ['Centralized communication', 'Shared knowledge base', 'Team coordination', 'Document collaboration'],
      image: '/features/team-collaboration.png'
    },
    features: [
      {
        icon: MessageSquare,
        title: 'Team Chat & Channels',
        description: 'Organized communication channels for different topics and projects',
        metric: 'Instant messaging'
      },
      {
        icon: Share2,
        title: 'Document Sharing',
        description: 'Centralized document library with version control',
        metric: 'Real-time sync'
      },
      {
        icon: Calendar,
        title: 'Shared Calendars',
        description: 'Team scheduling and appointment coordination',
        metric: 'Zero conflicts'
      },
      {
        icon: Bell,
        title: 'Smart Notifications',
        description: 'Intelligent alerts that keep everyone informed without overwhelming',
        metric: 'Contextual updates'
      }
    ]
  },
  'automation': {
    mainFeature: {
      title: 'Intelligent Workflow Automation',
      description: 'Automate repetitive tasks and complex workflows to free up your team for high-value activities. From lead nurturing to transaction management, let AI handle the routine work.',
      benefits: ['80% time savings', 'Consistent processes', 'Reduced errors', 'Scalable operations'],
      image: '/features/workflow-automation.png'
    },
    features: [
      {
        icon: Workflow,
        title: 'Custom Workflows',
        description: 'Build automated processes tailored to your team\'s specific needs',
        metric: 'No-code builder'
      },
      {
        icon: Clock,
        title: 'Task Automation',
        description: 'Automatically assign and track tasks across your team',
        metric: '95% completion rate'
      },
      {
        icon: Mail,
        title: 'Email Sequences',
        description: 'Automated nurturing campaigns for leads and clients',
        metric: '70% open rate'
      },
      {
        icon: FileText,
        title: 'Document Generation',
        description: 'Auto-populate contracts and forms with client data',
        metric: '90% faster processing'
      }
    ]
  },
  'management': {
    mainFeature: {
      title: 'Comprehensive Team Management Suite',
      description: 'Manage every aspect of your real estate team from onboarding new agents to tracking commissions and managing territories. Everything you need in one platform.',
      benefits: ['Streamlined operations', 'Agent development', 'Territory management', 'Commission tracking'],
      image: '/features/team-management.png'
    },
    features: [
      {
        icon: Users,
        title: 'Agent Profiles',
        description: 'Comprehensive profiles with skills, territories, and performance data',
        metric: 'Complete visibility'
      },
      {
        icon: Map,
        title: 'Territory Management',
        description: 'Assign and manage geographic territories for optimal coverage',
        metric: 'Smart assignment'
      },
      {
        icon: DollarSign,
        title: 'Commission Tracking',
        description: 'Automated commission calculations and payout management',
        metric: '100% accuracy'
      },
      {
        icon: Settings,
        title: 'Role Management',
        description: 'Flexible permission system for different team roles',
        metric: 'Granular control'
      }
    ]
  },
  'training': {
    mainFeature: {
      title: 'AI-Powered Training & Development',
      description: 'Accelerate agent development with personalized training programs, skill assessments, and continuous coaching recommendations based on performance data.',
      benefits: ['Faster onboarding', 'Skill development', 'Performance coaching', 'Certification tracking'],
      image: '/features/training-development.png'
    },
    features: [
      {
        icon: Award,
        title: 'Learning Paths',
        description: 'Customized training programs based on agent experience and goals',
        metric: '3x faster onboarding'
      },
      {
        icon: Star,
        title: 'Skill Assessment',
        description: 'Regular evaluations to identify strengths and improvement areas',
        metric: 'Data-driven insights'
      },
      {
        icon: Coffee,
        title: 'Mentorship Program',
        description: 'Pair new agents with experienced mentors for guidance',
        metric: '90% retention rate'
      },
      {
        icon: Shield,
        title: 'Certification Tracking',
        description: 'Monitor licensing, certifications, and continuing education',
        metric: 'Compliance guaranteed'
      }
    ]
  }
}

const teamBenefits = [
  {
    title: '3x Revenue Growth',
    description: 'Teams see average 300% revenue increase within 18 months',
    icon: TrendingUp,
    color: 'text-green-600'
  },
  {
    title: '90% Agent Retention',
    description: 'Dramatically reduce agent turnover with better systems',
    icon: Heart,
    color: 'text-pink-600'
  },
  {
    title: '50% Time Savings',
    description: 'Automation eliminates administrative overhead',
    icon: Clock,
    color: 'text-blue-600'
  },
  {
    title: '95% Lead Response',
    description: 'Never miss another opportunity with instant alerts',
    icon: Zap,
    color: 'text-purple-600'
  }
]

export default function TeamFeatures() {
  const [activeCategory, setActiveCategory] = useState('lead-management')
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleLeadFormSubmit = (formData: LeadFormData) => {
    console.log('Team demo request:', formData)
    // Handle form submission here
    setIsLeadModalOpen(false)
  }

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
            <Crown className="w-5 h-5 mr-2" />
            Complete Team Management Platform
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8"
          >
            Everything Your Team Needs
            <span className="block text-gradient bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              To Dominate Your Market
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
          >
            Our comprehensive platform provides all the tools, automation, and insights your real estate team needs to
            <span className="text-purple-600 font-semibold"> scale efficiently</span>,
            <span className="text-blue-600 font-semibold"> collaborate seamlessly</span>, and
            <span className="text-cyan-600 font-semibold"> achieve extraordinary results</span>.
          </motion.p>

          {/* Team Benefits */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          >
            {teamBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg"
                >
                  <div className="flex items-center justify-center mb-3">
                    <IconComponent className={`w-8 h-8 ${benefit.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{benefit.title}</div>
                  <div className="text-sm text-gray-600">{benefit.description}</div>
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
                          Explore This Feature
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
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-6">
              Ready to Scale Your Real Estate Team?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join 500+ high-performing real estate teams who've automated their operations
              and achieved extraordinary growth with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                onClick={() => setIsLeadModalOpen(true)}
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Team Transformation
              </Button>
              <Button
                size="xl"
                variant="outline"
                onClick={() => setIsLeadModalOpen(true)}
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Team Demo
              </Button>
            </div>
            <div className="flex justify-center items-center space-x-8 mt-8 text-purple-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Free Team Assessment</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Custom Implementation</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <LeadFormModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onSubmit={handleLeadFormSubmit}
      />
    </section>
  )
}