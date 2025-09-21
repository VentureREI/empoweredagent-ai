'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Plus,
  ArrowRight,
  Settings,
  Database,
  Users,
  Globe,
  Zap,
  CheckCircle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Code,
  Workflow,
  GitBranch,
  Filter,
  Calendar,
  Mail,
  MessageSquare,
  BarChart3,
  FileText,
  Download,
  Upload,
  RefreshCw,
  AlertCircle,
  Target,
  Layers
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const integrationSteps = [
  {
    id: 'source',
    title: 'Choose Data Source',
    description: 'Select where your data comes from',
    icon: Database,
    completed: true,
    active: false
  },
  {
    id: 'transform',
    title: 'Configure Transformation',
    description: 'Map and transform your data',
    icon: Settings,
    completed: true,
    active: false
  },
  {
    id: 'destination',
    title: 'Set Destination',
    description: 'Choose where data flows to',
    icon: Target,
    completed: false,
    active: true
  },
  {
    id: 'test',
    title: 'Test & Deploy',
    description: 'Verify and launch integration',
    icon: Play,
    completed: false,
    active: false
  }
]

const dataConnectors = [
  {
    id: 'salesforce',
    name: 'Salesforce CRM',
    category: 'CRM',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    description: 'Customer data and sales pipeline',
    fields: ['contacts', 'leads', 'opportunities', 'accounts'],
    isPopular: true
  },
  {
    id: 'mls',
    name: 'MLS Database',
    category: 'Property Data',
    icon: Database,
    color: 'from-green-500 to-green-600',
    description: 'Real estate listings and property info',
    fields: ['listings', 'properties', 'agents', 'photos'],
    isPopular: true
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    category: 'Marketing',
    icon: Mail,
    color: 'from-yellow-500 to-orange-500',
    description: 'Email marketing and automation',
    fields: ['subscribers', 'campaigns', 'lists', 'segments'],
    isPopular: false
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    category: 'Analytics',
    icon: BarChart3,
    color: 'from-purple-500 to-purple-600',
    description: 'Website traffic and conversion data',
    fields: ['sessions', 'users', 'conversions', 'goals'],
    isPopular: false
  },
  {
    id: 'docusign',
    name: 'DocuSign',
    category: 'Documents',
    icon: FileText,
    color: 'from-cyan-500 to-cyan-600',
    description: 'Digital signatures and documents',
    fields: ['documents', 'signatures', 'templates', 'status'],
    isPopular: true
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    icon: MessageSquare,
    color: 'from-indigo-500 to-indigo-600',
    description: 'Team messaging and notifications',
    fields: ['messages', 'channels', 'users', 'files'],
    isPopular: false
  }
]

const transformationActions = [
  {
    id: 'map',
    name: 'Field Mapping',
    description: 'Map fields between systems',
    icon: GitBranch,
    complexity: 'Simple'
  },
  {
    id: 'filter',
    name: 'Data Filtering',
    description: 'Filter records based on conditions',
    icon: Filter,
    complexity: 'Medium'
  },
  {
    id: 'enrich',
    name: 'Data Enrichment',
    description: 'Add additional data to records',
    icon: Plus,
    complexity: 'Advanced'
  },
  {
    id: 'schedule',
    name: 'Schedule Sync',
    description: 'Set automatic sync intervals',
    icon: Clock,
    complexity: 'Simple'
  }
]

const workflowTemplates = [
  {
    id: 'lead-nurture',
    name: 'Lead Nurturing Automation',
    description: 'Automatically nurture leads from website to closing',
    steps: ['Website Form → CRM', 'CRM → Email Marketing', 'Follow-up Scheduling'],
    estimatedTime: '2-3 hours',
    difficulty: 'Beginner',
    uses: 1247
  },
  {
    id: 'listing-sync',
    name: 'MLS to Website Sync',
    description: 'Keep property listings synchronized across platforms',
    steps: ['MLS → Property Database', 'Auto-generate Listing Pages', 'SEO Optimization'],
    estimatedTime: '4-6 hours',
    difficulty: 'Intermediate',
    uses: 892
  },
  {
    id: 'client-onboarding',
    name: 'Client Onboarding Flow',
    description: 'Streamline new client documentation and setup',
    steps: ['Client Sign-up → CRM', 'Document Generation', 'Welcome Email Series'],
    estimatedTime: '3-4 hours',
    difficulty: 'Intermediate',
    uses: 634
  }
]

export function IntegrationBuilder() {
  const [selectedSource, setSelectedSource] = useState<string | null>('salesforce')
  const [selectedDestination, setSelectedDestination] = useState<string | null>('mailchimp')
  const [selectedTransformations, setSelectedTransformations] = useState<string[]>(['map', 'filter'])
  const [currentStep, setCurrentStep] = useState(2)
  const [isBuilding, setIsBuilding] = useState(false)
  const [showTemplates, setShowTemplates] = useState(true)
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

  const handleTransformationToggle = (transformationId: string) => {
    setSelectedTransformations(prev =>
      prev.includes(transformationId)
        ? prev.filter(id => id !== transformationId)
        : [...prev, transformationId]
    )
  }

  const handleBuildIntegration = () => {
    setIsBuilding(true)
    setTimeout(() => {
      setIsBuilding(false)
      // Show success state
    }, 3000)
  }

  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full text-purple-300 text-sm font-semibold mb-8 border border-purple-500/30 backdrop-blur-sm"
          >
            <Code className="w-5 h-5 mr-2" />
            No-Code Integration Builder
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8"
          >
            Build Custom Integrations
            <span className="block text-gradient bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Without Writing Code
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
          >
            Our visual integration builder lets you connect any tools in minutes.
            Drag, drop, and configure powerful automations that transform your real estate business.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Panel - Templates and Controls */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-4 space-y-8"
          >
            {/* Templates Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Quick Start Templates</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="border-purple-500/30 text-purple-300 hover:bg-purple-600 hover:text-white"
                >
                  {showTemplates ? 'Hide' : 'Show'}
                </Button>
              </div>

              <AnimatePresence>
                {showTemplates && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {workflowTemplates.map((template, index) => (
                      <motion.div
                        key={template.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                            {template.name}
                          </h4>
                          <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded">
                            {template.uses} uses
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{template.estimatedTime}</span>
                          <span className="text-purple-400">{template.difficulty}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Progress Steps */}
            <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Integration Progress</h3>
              <div className="space-y-4">
                {integrationSteps.map((step, index) => {
                  const IconComponent = step.icon
                  return (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                        step.active
                          ? 'bg-purple-600/20 border border-purple-500/30'
                          : step.completed
                          ? 'bg-green-600/20 border border-green-500/30'
                          : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed
                          ? 'bg-green-600 text-white'
                          : step.active
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <IconComponent className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{step.title}</h4>
                        <p className="text-sm text-gray-400">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Panel - Visual Builder */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Integration Canvas</h3>
                <div className="flex items-center space-x-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white hover:text-gray-900"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleBuildIntegration}
                    disabled={isBuilding}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isBuilding ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Building...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Build Integration
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Visual Flow Builder */}
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  {/* Source */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <Upload className="w-5 h-5 mr-2 text-blue-400" />
                      Data Source
                    </h4>
                    <div className="space-y-3">
                      {dataConnectors.slice(0, 3).map((connector) => {
                        const IconComponent = connector.icon
                        const isSelected = selectedSource === connector.id
                        return (
                          <motion.div
                            key={connector.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedSource(connector.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              isSelected
                                ? 'border-blue-500 bg-blue-500/20'
                                : 'border-white/20 bg-white/5 hover:border-blue-500/50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${connector.color} flex items-center justify-center`}>
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-semibold text-white">{connector.name}</h5>
                                <p className="text-xs text-gray-400">{connector.category}</p>
                              </div>
                              {connector.isPopular && (
                                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                                  Popular
                                </span>
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Transformation */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-purple-400" />
                      Transform
                    </h4>
                    <div className="space-y-3">
                      {transformationActions.map((action) => {
                        const IconComponent = action.icon
                        const isSelected = selectedTransformations.includes(action.id)
                        return (
                          <motion.div
                            key={action.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleTransformationToggle(action.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              isSelected
                                ? 'border-purple-500 bg-purple-500/20'
                                : 'border-white/20 bg-white/5 hover:border-purple-500/50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <IconComponent className="w-5 h-5 text-purple-400" />
                                <div>
                                  <h5 className="font-semibold text-white text-sm">{action.name}</h5>
                                  <p className="text-xs text-gray-400">{action.complexity}</p>
                                </div>
                              </div>
                              {isSelected && <CheckCircle className="w-5 h-5 text-green-400" />}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <Download className="w-5 h-5 mr-2 text-green-400" />
                      Destination
                    </h4>
                    <div className="space-y-3">
                      {dataConnectors.slice(2, 5).map((connector) => {
                        const IconComponent = connector.icon
                        const isSelected = selectedDestination === connector.id
                        return (
                          <motion.div
                            key={connector.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedDestination(connector.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              isSelected
                                ? 'border-green-500 bg-green-500/20'
                                : 'border-white/20 bg-white/5 hover:border-green-500/50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${connector.color} flex items-center justify-center`}>
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-semibold text-white">{connector.name}</h5>
                                <p className="text-xs text-gray-400">{connector.category}</p>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Connection Lines */}
                <div className="absolute top-1/2 left-0 right-0 flex items-center justify-center pointer-events-none">
                  <div className="flex items-center space-x-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                    >
                      <ArrowRight className="w-4 h-4 text-white" />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 }}
                      className="w-8 h-8 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center"
                    >
                      <ArrowRight className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Configuration Panel */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Layers className="w-5 h-5 mr-2 text-cyan-400" />
                  Integration Configuration
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Sync Frequency
                    </label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                      <option value="realtime">Real-time</option>
                      <option value="hourly">Every Hour</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Error Handling
                    </label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                      <option value="retry">Retry Failed Records</option>
                      <option value="skip">Skip and Continue</option>
                      <option value="stop">Stop on Error</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}