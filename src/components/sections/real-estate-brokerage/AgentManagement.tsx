'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Users, UserPlus, Settings, Award, Target, Clock,
  TrendingUp, BarChart3, Calendar, CheckCircle, AlertCircle,
  Star, Zap, Bell, MessageSquare, BookOpen, Shield,
  Download, Filter, Search, MoreHorizontal, Eye,
  DollarSign, Home, Phone, Mail, MapPin
} from 'lucide-react'

const managementTabs = [
  {
    id: 'overview',
    title: 'Agent Overview',
    icon: Users,
    description: 'Complete agent roster and performance summary'
  },
  {
    id: 'onboarding',
    title: 'Onboarding',
    icon: UserPlus,
    description: 'Streamlined agent recruitment and setup'
  },
  {
    id: 'performance',
    title: 'Performance',
    icon: BarChart3,
    description: 'Individual agent metrics and coaching'
  },
  {
    id: 'training',
    title: 'Training',
    icon: BookOpen,
    description: 'Continuing education and skill development'
  }
]

const agentRoster = [
  {
    id: 1,
    name: 'Sarah Martinez',
    email: 'sarah.martinez@brokerage.com',
    phone: '(555) 123-4567',
    license: 'DRE#01234567',
    joinDate: '2021-03-15',
    status: 'active',
    performance: 'excellent',
    avatar: '/agents/sarah.jpg',
    metrics: {
      ytdRevenue: '$24.8M',
      ytdDeals: 127,
      ytdCommission: '$847K',
      avgDealSize: '$195K',
      conversionRate: '24%',
      responseTime: '1.2 min'
    },
    specialties: ['Luxury Homes', 'Investment Properties'],
    certifications: ['CRS', 'GRI', 'SRES'],
    territory: 'Beverly Hills, West Hollywood',
    teamLead: true,
    compliance: {
      license: 'current',
      insurance: 'current',
      training: 'current'
    }
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@brokerage.com',
    phone: '(555) 234-5678',
    license: 'DRE#01234568',
    joinDate: '2020-08-22',
    status: 'active',
    performance: 'excellent',
    avatar: '/agents/michael.jpg',
    metrics: {
      ytdRevenue: '$19.2M',
      ytdDeals: 98,
      ytdCommission: '$621K',
      avgDealSize: '$196K',
      conversionRate: '22%',
      responseTime: '1.8 min'
    },
    specialties: ['Commercial', 'Industrial'],
    certifications: ['CCIM', 'SIOR'],
    territory: 'Downtown LA, Century City',
    teamLead: false,
    compliance: {
      license: 'current',
      insurance: 'current',
      training: 'expires_soon'
    }
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@brokerage.com',
    phone: '(555) 345-6789',
    license: 'DRE#01234569',
    joinDate: '2022-01-10',
    status: 'active',
    performance: 'good',
    avatar: '/agents/emily.jpg',
    metrics: {
      ytdRevenue: '$16.7M',
      ytdDeals: 156,
      ytdCommission: '$534K',
      avgDealSize: '$107K',
      conversionRate: '28%',
      responseTime: '2.3 min'
    },
    specialties: ['First-Time Buyers', 'Condos'],
    certifications: ['ABR', 'PSA'],
    territory: 'Santa Monica, Venice',
    teamLead: false,
    compliance: {
      license: 'current',
      insurance: 'current',
      training: 'current'
    }
  },
  {
    id: 4,
    name: 'David Park',
    email: 'david.park@brokerage.com',
    phone: '(555) 456-7890',
    license: 'DRE#01234570',
    joinDate: '2021-11-05',
    status: 'active',
    performance: 'good',
    avatar: '/agents/david.jpg',
    metrics: {
      ytdRevenue: '$14.1M',
      ytdDeals: 89,
      ytdCommission: '$478K',
      avgDealSize: '$158K',
      conversionRate: '19%',
      responseTime: '3.1 min'
    },
    specialties: ['Investment Properties', 'REO'],
    certifications: ['RES', 'CDPE'],
    territory: 'Manhattan Beach, Redondo Beach',
    teamLead: false,
    compliance: {
      license: 'current',
      insurance: 'expires_soon',
      training: 'current'
    }
  }
]

const onboardingSteps = [
  {
    step: 1,
    title: 'Application Review',
    description: 'Background check and license verification',
    duration: '1-2 days',
    status: 'automated',
    completionRate: 98
  },
  {
    step: 2,
    title: 'Document Collection',
    description: 'E&O insurance, W-9, direct deposit setup',
    duration: '1 day',
    status: 'digital',
    completionRate: 95
  },
  {
    step: 3,
    title: 'Platform Training',
    description: 'CRM, systems, and tools orientation',
    duration: '2-3 days',
    status: 'interactive',
    completionRate: 92
  },
  {
    step: 4,
    title: 'Mentorship Assignment',
    description: 'Pair with experienced team member',
    duration: '90 days',
    status: 'ongoing',
    completionRate: 89
  }
]

const trainingPrograms = [
  {
    id: 1,
    title: 'Market Mastery Certification',
    description: 'Advanced market analysis and pricing strategies',
    duration: '40 hours',
    participants: 156,
    completionRate: 87,
    rating: 4.8,
    category: 'Market Knowledge',
    status: 'active'
  },
  {
    id: 2,
    title: 'Luxury Sales Specialist',
    description: 'High-end property sales and client management',
    duration: '32 hours',
    participants: 89,
    completionRate: 92,
    rating: 4.9,
    category: 'Specialization',
    status: 'active'
  },
  {
    id: 3,
    title: 'Technology Proficiency',
    description: 'Platform tools and digital marketing mastery',
    duration: '24 hours',
    participants: 234,
    completionRate: 94,
    rating: 4.7,
    category: 'Technology',
    status: 'active'
  },
  {
    id: 4,
    title: 'Compliance & Ethics',
    description: 'Legal requirements and ethical practices',
    duration: '16 hours',
    participants: 278,
    completionRate: 96,
    rating: 4.6,
    category: 'Compliance',
    status: 'mandatory'
  }
]

export default function AgentManagement() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const filteredAgents = agentRoster.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || agent.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'needs_improvement': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getComplianceStatus = (compliance: any) => {
    const issues = Object.values(compliance).filter(status => status === 'expires_soon' || status === 'expired').length
    if (issues === 0) return { status: 'compliant', color: 'text-green-600', icon: CheckCircle }
    if (issues === 1) return { status: 'warning', color: 'text-orange-600', icon: AlertCircle }
    return { status: 'critical', color: 'text-red-600', icon: AlertCircle }
  }

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
            <Users className="h-4 w-4" />
            Agent Management Suite
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Empower Your Agents to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 block">
              Achieve Excellence
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive agent management tools for recruitment, onboarding,
            performance tracking, and professional development.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {managementTabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-blue-300 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-blue-200 hover:shadow-md'
                  }`}
                >
                  <IconComponent className={`h-5 w-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-600'}`} />
                  <div className="text-left">
                    <div className={`font-semibold ${activeTab === tab.id ? 'text-blue-900' : 'text-gray-900'}`}>
                      {tab.title}
                    </div>
                    <div className="text-sm text-gray-600">{tab.description}</div>
                  </div>
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
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          placeholder="Search agents..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 text-sm border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50">
                        <Download className="h-4 w-4" />
                        Export
                      </button>
                      <button className="flex items-center gap-2 text-sm bg-blue-600 text-white rounded-lg px-3 py-2 hover:bg-blue-700">
                        <UserPlus className="h-4 w-4" />
                        Add Agent
                      </button>
                    </div>
                  </div>

                  {/* Agent Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAgents.map((agent, index) => {
                      const compliance = getComplianceStatus(agent.compliance)
                      const ComplianceIcon = compliance.icon
                      return (
                        <motion.div
                          key={agent.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                          onClick={() => setSelectedAgent(agent)}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                                {agent.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{agent.name}</div>
                                <div className="text-sm text-gray-600">{agent.license}</div>
                              </div>
                            </div>
                            {agent.teamLead && (
                              <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                Team Lead
                              </div>
                            )}
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">YTD Revenue</span>
                              <span className="font-semibold text-green-600">{agent.metrics.ytdRevenue}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Deals Closed</span>
                              <span className="font-semibold text-gray-900">{agent.metrics.ytdDeals}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Performance</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.performance)}`}>
                                {agent.performance}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Compliance</span>
                              <div className="flex items-center gap-1">
                                <ComplianceIcon className={`h-4 w-4 ${compliance.color}`} />
                                <span className={`text-xs font-medium ${compliance.color}`}>
                                  {compliance.status}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-gray-500">
                                {agent.specialties.join(', ')}
                              </div>
                              <button className="text-blue-600 hover:text-blue-800">
                                <Eye className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'onboarding' && (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Agent Onboarding Process</h3>
                  <p className="text-gray-600">Streamlined 4-step process to get new agents productive quickly</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {onboardingSteps.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {step.step}
                        </div>
                        <div className="text-sm font-medium text-blue-700">{step.status}</div>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Duration</span>
                          <span className="font-medium text-gray-900">{step.duration}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Completion</span>
                          <span className="font-medium text-green-600">{step.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${step.completionRate}%` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'training' && (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Training Programs</h3>
                    <p className="text-gray-600">Continuous education and skill development opportunities</p>
                  </div>
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <UserPlus className="h-4 w-4" />
                    Create Program
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {trainingPrograms.map((program, index) => (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{program.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{program.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{program.duration}</span>
                            <span>•</span>
                            <span>{program.participants} enrolled</span>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          program.status === 'mandatory' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {program.status}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Completion Rate</span>
                          <span className="font-semibold text-green-600">{program.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${program.completionRate}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium text-gray-900">{program.rating}</span>
                          </div>
                          <span className="text-sm text-gray-600">{program.category}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}