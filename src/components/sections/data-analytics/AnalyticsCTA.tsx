'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  BarChart3,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Users,
  Calendar,
  Brain,
  Target,
  TrendingUp,
  Star,
  Phone,
  Mail,
  Database,
  Zap,
  Trophy,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const testimonials = [
  {
    name: 'David Kim',
    role: 'Investment Strategist, Marcus & Millichap',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face&auto=format',
    quote: 'The predictive analytics alone have helped me identify $15M worth of opportunities that I would have missed. ROI was immediate.',
    rating: 5,
    metrics: '$15M opportunities identified'
  },
  {
    name: 'Rachel Santos',
    role: 'Data-Driven Broker, Coldwell Banker',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&crop=face&auto=format',
    quote: 'I went from spending 40 hours a week on market research to having AI-powered insights delivered instantly. My clients are amazed.',
    rating: 5,
    metrics: '40 hrs saved weekly'
  },
  {
    name: 'Marcus Thompson',
    role: 'Portfolio Manager, CBRE',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face&auto=format',
    quote: 'The portfolio analytics dashboard transformed how we make investment decisions. Every metric we need is right at our fingertips.',
    rating: 5,
    metrics: '95% decision accuracy'
  }
]

const guarantees = [
  {
    icon: Clock,
    title: '48-Hour Setup',
    description: 'Your first analytics dashboard will be live within 48 hours'
  },
  {
    icon: Shield,
    title: '30-Day Guarantee',
    description: 'Not seeing actionable insights? Get a full refund within 30 days'
  },
  {
    icon: Users,
    title: 'Dedicated Analysts',
    description: 'Real estate data experts available for support and optimization'
  },
  {
    icon: Target,
    title: 'Accuracy Promise',
    description: 'We guarantee 90%+ prediction accuracy or we optimize for free'
  }
]

const urgencyFactors = [
  'Your competitors are already using AI analytics to gain market advantage',
  'Every day without data insights means missed opportunities and revenue',
  'Market conditions change rapidly - manual analysis is too slow',
  'The real estate industry is becoming increasingly data-driven'
]

const successMetrics = [
  { icon: DollarSign, value: '$2.3B+', label: 'Transactions Analyzed' },
  { icon: TrendingUp, value: '94%', label: 'Prediction Accuracy' },
  { icon: Clock, value: '15,000+', label: 'Hours Saved Monthly' },
  { icon: Trophy, value: '98%', label: 'Client Satisfaction' }
]

export function AnalyticsCTA() {
  const [selectedPlan, setSelectedPlan] = useState('professional')
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

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-dark-800 dark:to-dark-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Success Metrics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {successMetrics.map((metric, index) => {
            const IconComponent = metric.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {metric.label}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Urgency Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-full text-orange-700 dark:text-orange-300 text-sm font-semibold mb-6 border border-orange-200 dark:border-orange-800"
          >
            <Clock className="w-4 h-4 mr-2 animate-pulse" />
            Limited Time: Free Advanced Setup (Save $2,500)
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Stop Making Decisions in the <span className="text-gradient">Dark</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            While you're manually analyzing spreadsheets, your competitors are using AI to identify
            opportunities, predict market movements, and close more deals. Don't let outdated processes cost you another opportunity.
          </motion.p>

          {/* Urgency Factors */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12"
          >
            {urgencyFactors.map((factor, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 bg-white/80 dark:bg-dark-800/80 rounded-lg border border-orange-200 dark:border-orange-800"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{factor}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-12 text-white relative overflow-hidden mb-16"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-hero-pattern opacity-10" />

            <div className="relative z-10 text-center">
              <h3 className="text-3xl sm:text-4xl font-bold mb-6">
                Transform Your Real Estate Business with AI Analytics
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join 8,000+ real estate professionals who've revolutionized their decision-making with
                AI-powered analytics. Get actionable insights from day one.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <Button
                  size="xl"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold group"
                >
                  <BarChart3 className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  Start Free Analytics Trial
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="xl"
                  variant="ghost"
                  className="text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg font-semibold"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Analytics Demo
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-blue-100">No setup fees this month</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-blue-100">30-day money back guarantee</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-blue-100">Cancel anytime</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            Trusted by Data-Driven Real Estate Leaders
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
              >
                <Card className="p-6 h-full" hover="lift">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {testimonial.metrics}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Guarantees */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            Our Commitment to Your Success
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => {
              const IconComponent = guarantee.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                >
                  <Card className="p-6 text-center h-full" hover="lift">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {guarantee.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {guarantee.description}
                    </p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Become a Data-Driven Real Estate Professional?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Stop guessing and start knowing. Transform your real estate business with AI-powered
              analytics that deliver actionable insights and competitive advantage.
            </p>

            <div className="space-y-4">
              <Button size="lg" className="w-full group">
                <Brain className="w-5 h-5 mr-2" />
                Start My Analytics Transformation
                <Database className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </Button>

              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  Call: (555) 123-4567
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  analytics@empoweredagent.ai
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}