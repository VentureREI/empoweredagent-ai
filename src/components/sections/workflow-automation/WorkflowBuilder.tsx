'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Workflow,
  ArrowRight,
  ArrowDown,
  Mail,
  MessageSquare,
  Calendar,
  Users,
  BarChart3,
  CheckCircle,
  Clock,
  Bot,
  Zap,
  Target,
  Phone,
  FileText,
  AlertCircle,
  Send,
  Star,
  Home,
  TrendingUp
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const workflowSteps = [
  {
    id: 1,
    type: 'trigger',
    title: 'Lead Submits Form',
    description: 'Visitor fills out contact form on website',
    icon: Target,
    color: 'from-blue-500 to-blue-600',
    position: { x: 0, y: 0 }
  },
  {
    id: 2,
    type: 'action',
    title: 'Instant Response',
    description: 'Send immediate text & email confirmation',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    position: { x: 1, y: 0 }
  },
  {
    id: 3,
    type: 'action',
    title: 'Lead Scoring',
    description: 'Analyze lead quality and assign score',
    icon: BarChart3,
    color: 'from-purple-500 to-purple-600',
    position: { x: 2, y: 0 }
  },
  {
    id: 4,
    type: 'condition',
    title: 'High Quality Lead?',
    description: 'Score > 80 points',
    icon: AlertCircle,
    color: 'from-orange-500 to-red-500',
    position: { x: 3, y: 0 }
  },
  {
    id: 5,
    type: 'action',
    title: 'Schedule Call',
    description: 'Book appointment within 24 hours',
    icon: Calendar,
    color: 'from-green-500 to-green-600',
    position: { x: 4, y: -1 }
  },
  {
    id: 6,
    type: 'action',
    title: 'Nurture Sequence',
    description: 'Add to 30-day email campaign',
    icon: Mail,
    color: 'from-indigo-500 to-purple-500',
    position: { x: 4, y: 1 }
  },
  {
    id: 7,
    type: 'action',
    title: 'Agent Notification',
    description: 'Send SMS alert with lead details',
    icon: MessageSquare,
    color: 'from-pink-500 to-red-500',
    position: { x: 5, y: -1 }
  },
  {
    id: 8,
    type: 'action',
    title: 'CRM Update',
    description: 'Add lead to database with tags',
    icon: Users,
    color: 'from-teal-500 to-blue-500',
    position: { x: 5, y: 0 }
  },
  {
    id: 9,
    type: 'action',
    title: 'Track Engagement',
    description: 'Monitor opens, clicks, and responses',
    icon: TrendingUp,
    color: 'from-cyan-500 to-blue-500',
    position: { x: 5, y: 1 }
  }
]

const workflowExamples = [
  {
    id: 'lead-follow-up',
    name: 'Lead Follow-Up Automation',
    description: 'Convert more leads with instant response and intelligent nurturing',
    steps: 8,
    timeSaved: '12 hours/week',
    conversionBoost: '+240%',
    color: 'from-blue-500 to-purple-600',
    icon: Target
  },
  {
    id: 'listing-marketing',
    name: 'Listing Marketing Blitz',
    description: 'Market new listings across 50+ platforms automatically',
    steps: 12,
    timeSaved: '15 hours/week',
    conversionBoost: '+180%',
    color: 'from-orange-500 to-red-600',
    icon: Home
  },
  {
    id: 'client-updates',
    name: 'Transaction Updates',
    description: 'Keep clients informed at every milestone automatically',
    steps: 6,
    timeSaved: '10 hours/week',
    conversionBoost: '+150%',
    color: 'from-green-500 to-teal-600',
    icon: FileText
  },
  {
    id: 'social-media',
    name: 'Social Media Automation',
    description: 'Create and schedule engaging content automatically',
    steps: 10,
    timeSaved: '20 hours/week',
    conversionBoost: '+300%',
    color: 'from-pink-500 to-purple-600',
    icon: Users
  }
]

export function WorkflowBuilder() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(workflowExamples[0])
  const [animationPhase, setAnimationPhase] = useState(0)
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
        duration: 0.6
      }
    }
  }

  const stepVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  }

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-gradient-to-r from-primary-100 to-purple-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-gradient-to-r from-blue-100 to-primary-100 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Build Workflows That <span className="text-gradient">Actually Work</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            See how our visual workflow builder creates intelligent automations that adapt to your business.
            No coding required - just point, click, and watch your productivity soar.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Workflow Examples Sidebar */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-4 space-y-4"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center"
            >
              <Workflow className="w-6 h-6 mr-2 text-primary-600" />
              Popular Workflows
            </motion.h3>

            {workflowExamples.map((workflow, index) => {
              const IconComponent = workflow.icon
              return (
                <motion.div
                  key={workflow.id}
                  variants={itemVariants}
                  custom={index}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all duration-300 ${
                      selectedWorkflow.id === workflow.id
                        ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedWorkflow(workflow)}
                    hover="lift"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${workflow.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {workflow.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {workflow.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3 mr-1" />
                            {workflow.timeSaved}
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {workflow.conversionBoost}
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Workflow className="w-3 h-3 mr-1" />
                            {workflow.steps} steps
                          </div>
                          <div className="flex items-center text-green-500">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Proven
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}

            <motion.div variants={itemVariants} className="pt-4">
              <Button size="lg" className="w-full group">
                <Bot className="w-5 h-5 mr-2" />
                Build Custom Workflow
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Workflow Visualization */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedWorkflow.name}
                </h3>
                <div className="flex items-center space-x-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setAnimationPhase(prev => prev + 1)}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Preview Flow
                  </Button>
                </div>
              </div>

              {/* Workflow Canvas */}
              <div className="relative min-h-[500px] bg-gray-50 dark:bg-dark-900 rounded-xl p-6 overflow-auto">
                {/* Grid Background */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(107, 114, 128, 0.2) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(107, 114, 128, 0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />

                {/* Workflow Steps */}
                <div className="relative z-10">
                  {workflowSteps.map((step, index) => {
                    const IconComponent = step.icon
                    const xPos = step.position.x * 180
                    const yPos = step.position.y * 120 + 200

                    return (
                      <motion.div
                        key={step.id}
                        variants={stepVariants}
                        custom={index}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="absolute"
                        style={{
                          left: `${xPos}px`,
                          top: `${yPos}px`
                        }}
                      >
                        <Card className={`w-40 p-4 text-center ${
                          step.type === 'trigger' ? 'ring-2 ring-green-500' :
                          step.type === 'condition' ? 'ring-2 ring-yellow-500' :
                          'ring-2 ring-blue-500'
                        }`}>
                          <div className={`w-10 h-10 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                            {step.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {step.description}
                          </p>
                        </Card>

                        {/* Connection Lines */}
                        {index < workflowSteps.length - 1 && (
                          <div className="absolute top-1/2 left-full w-20 flex items-center justify-center">
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                          </div>
                        )}

                        {/* Conditional Branches */}
                        {step.type === 'condition' && (
                          <>
                            <div className="absolute top-1/2 left-full w-20 -rotate-45 flex items-center justify-center">
                              <ArrowRight className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="absolute top-1/2 left-full w-20 rotate-45 flex items-center justify-center">
                              <ArrowRight className="w-5 h-5 text-orange-500" />
                            </div>
                            <div className="absolute -top-6 left-full w-20 text-center">
                              <span className="text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
                                YES
                              </span>
                            </div>
                            <div className="absolute -bottom-6 left-full w-20 text-center">
                              <span className="text-xs font-semibold text-orange-600 bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded">
                                NO
                              </span>
                            </div>
                          </>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Workflow Stats */}
              <div className="grid grid-cols-4 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedWorkflow.steps}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Steps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedWorkflow.timeSaved}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Time Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{selectedWorkflow.conversionBoost}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Conversion Boost</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Always Working</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="p-6 text-center" hover="lift">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Drag & Drop Builder
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create complex workflows with our intuitive visual builder. No coding required.
              </p>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-6 text-center" hover="lift">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Real Estate Focused
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pre-built templates and integrations designed specifically for real estate professionals.
              </p>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-6 text-center" hover="lift">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Proven Results
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our workflows are battle-tested by top-producing agents and proven to drive results.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}