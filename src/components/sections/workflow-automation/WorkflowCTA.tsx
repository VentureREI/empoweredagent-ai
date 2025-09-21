'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Zap,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Users,
  Calendar,
  Bot,
  Target,
  TrendingUp,
  Star,
  Phone,
  Mail
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Top Producer, Keller Williams',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face&auto=format',
    quote: 'These workflows saved me 15 hours a week and increased my lead conversion by 300%. Best investment I ever made.',
    rating: 5,
    metrics: '+300% conversions'
  },
  {
    name: 'Michael Chen',
    role: 'Luxury Agent, Compass',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face&auto=format',
    quote: 'I went from manually following up with leads to having everything automated. My business has never been more efficient.',
    rating: 5,
    metrics: '20+ hrs saved/week'
  },
  {
    name: 'Jennifer Rodriguez',
    role: 'Team Leader, RE/MAX',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face&auto=format',
    quote: 'The transaction automation alone paid for itself in the first month. My clients love the constant updates.',
    rating: 5,
    metrics: '100% client satisfaction'
  }
]

const guarantees = [
  {
    icon: Clock,
    title: '24-Hour Setup',
    description: 'Your first workflow will be live within 24 hours of signing up'
  },
  {
    icon: Shield,
    title: '30-Day Guarantee',
    description: 'Not seeing results? Get a full refund within 30 days'
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Real estate automation experts available when you need them'
  },
  {
    icon: Target,
    title: 'ROI Promise',
    description: 'We guarantee 300%+ ROI or we work for free until you get it'
  }
]

const urgencyFactors = [
  'Every day without automation, you lose potential deals',
  'Your competitors are already using these workflows',
  '10,000+ leads go uncontacted every hour in real estate',
  'The longer you wait, the more money you leave on the table'
]

export function WorkflowCTA() {
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
      className="py-24 bg-gradient-to-b from-white to-primary-50 dark:from-dark-800 dark:to-dark-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-gradient-to-r from-primary-200 to-purple-200 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-gradient-to-r from-blue-200 to-primary-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Urgency Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-full text-red-700 dark:text-red-300 text-sm font-semibold mb-6 border border-red-200 dark:border-red-800"
          >
            <Clock className="w-4 h-4 mr-2 animate-pulse" />
            Limited Time: Setup Fee Waived (Save $1,500)
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Stop Losing Deals to <span className="text-gradient">Manual Processes</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Every minute you delay automation, your competitors are capturing leads faster,
            following up sooner, and closing more deals. Don't let manual processes cost you another sale.
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
            className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-12 text-white relative overflow-hidden mb-16"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-hero-pattern opacity-10" />

            <div className="relative z-10 text-center">
              <h3 className="text-3xl sm:text-4xl font-bold mb-6">
                Start Automating Your Real Estate Business Today
              </h3>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Join 5,000+ real estate professionals who've transformed their business with our workflow automation.
                See results in your first week or get your money back.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <Button
                  size="xl"
                  variant="secondary"
                  className="bg-white text-primary-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold group"
                >
                  <Zap className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  Start Free 14-Day Trial
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="xl"
                  variant="ghost"
                  className="text-white border-2 border-white hover:bg-white hover:text-primary-600 px-8 py-6 text-lg font-semibold"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Strategy Call
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-primary-100">No setup fees this week</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-primary-100">30-day money back guarantee</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-primary-100">Cancel anytime</span>
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
            Trusted by Real Estate Professionals Nationwide
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
                  <div className="text-sm font-semibold text-primary-600 dark:text-primary-400">
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
            Our Promise to You
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
              Ready to 10x Your Real Estate Business?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Stop losing deals to manual processes. Start automating today and watch your productivity soar.
            </p>

            <div className="space-y-4">
              <Button size="lg" className="w-full group">
                <Bot className="w-5 h-5 mr-2" />
                Start My Automation Journey
                <TrendingUp className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </Button>

              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  Call: (555) 123-4567
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  hello@empoweredagent.ai
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}