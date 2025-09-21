'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, AlertTriangle, Clock, DollarSign, Users, Zap, Brain, Shield, Target } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const problems = [
  {
    icon: Clock,
    title: 'Manual Processes Slow You Down',
    description: 'Your team spends hours on repetitive tasks that could be automated, reducing productivity and increasing frustration.',
    impact: '40% of work time wasted on manual tasks'
  },
  {
    icon: DollarSign,
    title: 'Rising Operational Costs',
    description: 'Labor costs continue to increase while efficiency decreases, squeezing your profit margins and limiting growth.',
    impact: 'Operating costs up 23% year over year'
  },
  {
    icon: Users,
    title: 'Scaling Challenges',
    description: 'Growing your business means hiring more people, but finding qualified talent is expensive and time-consuming.',
    impact: 'Average hire takes 42 days and costs $15K+'
  },
  {
    icon: AlertTriangle,
    title: 'Human Error & Inconsistency',
    description: 'Manual processes lead to mistakes, data inconsistencies, and compliance issues that can cost your business.',
    impact: 'Human error costs $62B annually in the US'
  }
]

const solutions = [
  {
    icon: Brain,
    title: 'Intelligent Automation',
    description: 'Our AI agents handle complex workflows end-to-end, learning and adapting to your business processes automatically.',
    benefit: 'Reduce manual work by 80%',
    color: 'from-blue-500 to-primary-600'
  },
  {
    icon: DollarSign,
    title: 'Cost Optimization',
    description: 'Replace expensive manual labor with AI agents that work 24/7 without breaks, benefits, or training costs.',
    benefit: 'Cut operational costs by 60%',
    color: 'from-green-500 to-primary-600'
  },
  {
    icon: Zap,
    title: 'Instant Scalability',
    description: 'Deploy new AI agents instantly as your business grows. No hiring, training, or onboarding delays.',
    benefit: 'Scale operations in minutes',
    color: 'from-purple-500 to-primary-600'
  },
  {
    icon: Shield,
    title: 'Perfect Accuracy',
    description: 'AI agents follow exact protocols every time, eliminating human error and ensuring consistent results.',
    benefit: '99.9% accuracy guaranteed',
    color: 'from-orange-500 to-primary-600'
  }
]

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

export function ProblemSolutionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-gray-50 dark:bg-dark-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-100 dark:bg-primary-900 rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-100 dark:bg-accent-900 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            You've Got Problems...{' '}
            <span className="text-gradient">We've Got Solutions</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Every business faces the same challenges. But while others struggle with manual processes, 
            you can leap ahead with intelligent AI automation.
          </motion.p>
        </motion.div>

        {/* Problems Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <motion.h3
              variants={itemVariants}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            >
              The Challenges You Face Every Day
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300"
            >
              Sound familiar? You're not alone.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((problem, index) => {
              const IconComponent = problem.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6 text-red-600 dark:text-red-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {problem.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {problem.description}
                      </p>
                      <div className="inline-flex items-center px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm font-medium rounded-full">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        {problem.impact}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Solutions Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="text-center mb-16">
            <motion.h3
              variants={itemVariants}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            >
              How AI Agents Transform Your Business
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300"
            >
              Turn every problem into a competitive advantage.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {solutions.map((solution, index) => {
              const IconComponent = solution.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 bg-gradient-to-br ${solution.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          {solution.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                          {solution.description}
                        </p>
                        <div className="inline-flex items-center px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full">
                          <Target className="w-4 h-4 mr-2" />
                          {solution.benefit}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-12 text-white relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-hero-pattern opacity-10" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Join thousands of companies already using AI agents to automate their workflows, 
                reduce costs, and scale effortlessly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg"
                  asChild
                >
                  <Link href="/demo" className="flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>See How It Works</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white border-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold"
                  asChild
                >
                  <Link href="/case-studies">View Success Stories</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}