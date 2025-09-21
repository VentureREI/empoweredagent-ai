'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MessageSquare,
  FileSearch,
  Code2,
  TestTube,
  Rocket,
  CheckCircle,
  ArrowRight,
  Calendar,
  Users,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const processSteps = [
  {
    id: 1,
    title: 'Discovery & Planning',
    description: 'We analyze your workflow, identify automation opportunities, and design the perfect AI agent for your needs.',
    icon: MessageSquare,
    duration: '1-2 days',
    deliverables: [
      'Process analysis report',
      'Agent requirements document',
      'Technical architecture plan',
      'Project timeline'
    ],
    color: 'from-blue-500 to-primary-600'
  },
  {
    id: 2,
    title: 'Design & Prototyping',
    description: 'Our team creates wireframes, user flows, and a working prototype to validate the solution approach.',
    icon: FileSearch,
    duration: '3-5 days',
    deliverables: [
      'User interface mockups',
      'Workflow diagrams',
      'Working prototype',
      'Integration specifications'
    ],
    color: 'from-green-500 to-primary-600'
  },
  {
    id: 3,
    title: 'Development & Training',
    description: 'We build your custom AI agent, train it on your data, and integrate it with your existing systems.',
    icon: Code2,
    duration: '1-3 weeks',
    deliverables: [
      'Custom AI agent',
      'System integrations',
      'Training data pipeline',
      'Performance monitoring'
    ],
    color: 'from-purple-500 to-primary-600'
  },
  {
    id: 4,
    title: 'Testing & Optimization',
    description: 'Rigorous testing ensures your agent performs perfectly in real-world conditions with continuous optimization.',
    icon: TestTube,
    duration: '3-5 days',
    deliverables: [
      'Comprehensive testing report',
      'Performance benchmarks',
      'Optimization recommendations',
      'Quality assurance sign-off'
    ],
    color: 'from-orange-500 to-primary-600'
  },
  {
    id: 5,
    title: 'Deployment & Support',
    description: 'We deploy your agent to production, provide training to your team, and offer ongoing support and maintenance.',
    icon: Rocket,
    duration: '1-2 days',
    deliverables: [
      'Production deployment',
      'Team training session',
      'Documentation package',
      'Ongoing support plan'
    ],
    color: 'from-red-500 to-primary-600'
  }
]

const benefits = [
  {
    icon: Calendar,
    title: 'Fast Delivery',
    description: 'Most agents deployed within 2-4 weeks'
  },
  {
    icon: Users,
    title: 'Collaborative Process',
    description: 'You are involved every step of the way'
  },
  {
    icon: Zap,
    title: 'Proven Framework',
    description: 'Battle-tested development methodology'
  }
]

export function ProcessOverview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-24 w-96 h-96 bg-primary-100 dark:bg-primary-900 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/3 -right-24 w-96 h-96 bg-accent-100 dark:bg-accent-900 rounded-full blur-3xl opacity-20" />
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
            Our <span className="text-gradient">Proven Development Process</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            From concept to deployment, our structured approach ensures your AI agent is built right,
            delivered on time, and exceeds your expectations.
          </motion.p>

          {/* Benefits */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">{benefit.title}</div>
                    <div className="text-sm">{benefit.description}</div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200 dark:from-primary-800 dark:via-primary-600 dark:to-primary-800"></div>

          <div className="space-y-12">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={step.id}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={stepVariants}
                  transition={{ delay: index * 0.2 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`w-full lg:w-5/12 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                    <Card variant="default" hover="glow" className="p-8 h-full">
                      <div className={`flex items-start gap-4 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                        <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className={`flex-1 ${isEven ? 'lg:text-right' : ''}`}>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white text-sm font-bold rounded-full">
                              {step.id}
                            </span>
                            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                              {step.duration}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            {step.description}
                          </p>

                          {/* Deliverables */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                              Key Deliverables:
                            </h4>
                            <ul className={`space-y-2 ${isEven ? 'lg:text-right' : ''}`}>
                              {step.deliverables.map((deliverable, delivIndex) => (
                                <li key={delivIndex} className={`flex items-center space-x-2 text-sm ${isEven ? 'lg:flex-row-reverse lg:space-x-reverse lg:space-x-2' : ''}`}>
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">{deliverable}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Timeline Node */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div className="w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-dark-800 shadow-lg relative z-10"></div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block w-5/12"></div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-hero-pattern opacity-10" />

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Start Building?
              </h3>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Schedule a discovery call to discuss your needs and see how our proven process
                can deliver the perfect AI agent for your business.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Discovery Call
                </Button>

                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white border-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold"
                >
                  View Detailed Process
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}