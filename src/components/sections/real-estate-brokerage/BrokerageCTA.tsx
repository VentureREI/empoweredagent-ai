'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone, Calendar, Users, Star, Zap, CheckCircle, Play, MessageCircle, Award, Building2, TrendingUp } from 'lucide-react'
import { useState } from 'react'

const ctaStats = [
  {
    value: '500+',
    label: 'Brokerages Powered',
    change: '+150% growth this year'
  },
  {
    value: '$24B+',
    label: 'In Brokerage Revenue',
    change: 'Managed through platform'
  },
  {
    value: '50K+',
    label: 'Active Agents',
    change: 'Using platform daily'
  },
  {
    value: '98%',
    label: 'Client Success Rate',
    change: 'Based on 500+ implementations'
  }
]

const quickActions = [
  {
    icon: Calendar,
    title: 'Schedule Demo',
    description: 'See the platform in action with your data',
    action: 'Book Demo',
    color: 'from-blue-500 to-blue-600',
    popular: true,
    duration: '30 minutes',
    benefit: 'Personalized walkthrough'
  },
  {
    icon: Phone,
    title: 'Speak with Expert',
    description: 'Discuss your brokerage needs with specialist',
    action: 'Call Now',
    color: 'from-green-500 to-green-600',
    popular: false,
    duration: '15 minutes',
    benefit: 'Immediate consultation'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Get instant answers to your questions',
    action: 'Start Chat',
    color: 'from-purple-500 to-purple-600',
    popular: false,
    duration: 'Instant',
    benefit: 'Real-time support'
  }
]

const urgencyIndicators = [
  {
    text: '🚀 Limited time: 50% off implementation for new brokerages',
    expiry: 'Ends December 31st'
  },
  {
    text: '⚡ Free data migration and agent training included',
    expiry: 'Q1 2024 signups only'
  },
  {
    text: '🎯 Guaranteed ROI in 90 days or money back',
    expiry: 'New enterprise clients'
  }
]

const implementationSteps = [
  {
    step: 1,
    title: 'Discovery Call',
    description: 'Understand your brokerage needs and goals',
    duration: '30 minutes'
  },
  {
    step: 2,
    title: 'Custom Setup',
    description: 'Platform configuration and data migration',
    duration: '1-3 days'
  },
  {
    step: 3,
    title: 'Agent Training',
    description: 'Comprehensive onboarding for your team',
    duration: '1 week'
  },
  {
    step: 4,
    title: 'Go Live',
    description: 'Launch with full support and monitoring',
    duration: 'Day 1'
  }
]

const trustIndicators = [
  {
    name: 'SOC 2 Compliant',
    description: 'Enterprise-grade security',
    icon: '🔒'
  },
  {
    name: '99.9% Uptime',
    description: 'Guaranteed availability',
    icon: '⚡'
  },
  {
    name: 'GDPR Ready',
    description: 'Global compliance standards',
    icon: '🌍'
  },
  {
    name: '24/7 Support',
    description: 'Always here when you need us',
    icon: '🚀'
  }
]

export default function BrokerageCTA() {
  const [hoveredAction, setHoveredAction] = useState<number | null>(null)

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.6),transparent)]" />

      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Urgency Indicators */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {urgencyIndicators.map((indicator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm"
            >
              <span className="font-medium">{indicator.text}</span>
              <span className="ml-2 text-yellow-300 text-xs">({indicator.expiry})</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Building2 className="h-4 w-4 text-yellow-400" />
            Ready to Transform Your Brokerage?
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Scale Your Brokerage to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 block">
              Industry Leadership
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join 500+ successful brokerages who've transformed their operations with our platform.
            Start your journey to market dominance today.
          </p>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 border-2 border-white flex items-center justify-center text-white text-sm font-semibold"
                >
                  {String.fromCharCode(65 + i - 1)}
                </div>
              ))}
            </div>
            <div className="ml-4 text-left">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-white font-semibold ml-2">4.9/5</span>
              </div>
              <div className="text-gray-300 text-sm">From 500+ brokerage owners</div>
            </div>
          </div>
        </motion.div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredAction(index)}
                onHoverEnd={() => setHoveredAction(null)}
                className={`relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
                  action.popular ? 'ring-2 ring-yellow-400' : ''
                } ${
                  hoveredAction === index ? 'transform scale-105 shadow-2xl' : ''
                }`}
              >
                {action.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${action.color} text-white mb-6`}>
                  <IconComponent className="h-8 w-8" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{action.title}</h3>
                <p className="text-gray-300 mb-4">{action.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white font-medium">{action.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Benefit</span>
                    <span className="text-white font-medium">{action.benefit}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    action.popular
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {action.action}
                  <ArrowRight className="inline-block ml-2 h-4 w-4" />
                </motion.button>
              </motion.div>
            )
          })}
        </div>

        {/* Implementation Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Simple 4-Step Implementation</h3>
            <p className="text-gray-300">
              Get your brokerage up and running in days, not months
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {implementationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-lg mx-auto mb-4">
                  {step.step}
                </div>
                <h4 className="font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-gray-300 text-sm mb-2">{step.description}</p>
                <div className="text-yellow-400 text-xs font-medium">{step.duration}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {ctaStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 font-medium mb-1">{stat.label}</div>
              <div className="text-yellow-400 text-sm">{stat.change}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Enterprise-Grade Security & Support</h3>
            <p className="text-gray-300">
              Built for the most demanding brokerage environments
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-3">{indicator.icon}</div>
                <div className="font-semibold text-white mb-1">{indicator.name}</div>
                <div className="text-gray-400 text-sm">{indicator.description}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Dominate Your Market?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join the platform that's helping brokerages achieve 135% revenue growth,
              94% agent retention, and industry-leading market share.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                Start Free Trial
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Schedule Demo
              </motion.button>
            </div>

            <div className="mt-6 text-blue-100 text-sm">
              No setup fees • 30-day free trial • Cancel anytime • ROI guaranteed in 90 days
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 text-blue-200 text-xs">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}