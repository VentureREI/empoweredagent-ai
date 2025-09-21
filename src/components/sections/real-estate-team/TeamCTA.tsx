'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone, Calendar, Users, Star, Zap, CheckCircle, Play, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'
import Link from 'next/link'

const ctaStats = [
  {
    value: '2,847',
    label: 'Teams Using Platform',
    change: '+23% this month'
  },
  {
    value: '$1.2B+',
    label: 'Team Revenue Generated',
    change: 'Last 12 months'
  },
  {
    value: '94%',
    label: 'Team Satisfaction Rate',
    change: 'Based on 500+ reviews'
  },
  {
    value: '3.2x',
    label: 'Average ROI Increase',
    change: 'Within first 6 months'
  }
]

const quickActions = [
  {
    icon: Calendar,
    title: 'Schedule Demo',
    description: '15-min personalized walkthrough',
    action: 'Book Demo',
    color: 'from-blue-500 to-blue-600',
    popular: true
  },
  {
    icon: Phone,
    title: 'Call Sales',
    description: 'Speak with team specialist',
    action: 'Call Now',
    color: 'from-green-500 to-green-600',
    popular: false
  },
  {
    icon: MessageCircle,
    title: 'Chat with Us',
    description: 'Get instant answers',
    action: 'Start Chat',
    color: 'from-purple-500 to-purple-600',
    popular: false
  }
]

const urgencyIndicators = [
  {
    text: '🔥 Limited time: 30% off first 3 months',
    expiry: '2 days left'
  },
  {
    text: '⚡ Free team migration & setup included',
    expiry: 'This month only'
  },
  {
    text: '🎯 Bonus: Free team training session',
    expiry: 'For next 50 signups'
  }
]

export default function TeamCTA() {
  const [hoveredAction, setHoveredAction] = useState<number | null>(null)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  const handleLeadFormSubmit = (formData: LeadFormData) => {
    console.log('Team trial/demo request:', formData)
    // Handle form submission here
    setIsLeadModalOpen(false)
  }

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
            <Zap className="h-4 w-4 text-yellow-400" />
            Ready to Transform Your Team?
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Start Building Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 block">
              Dream Team Today
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of successful real estate teams who've transformed their business
            with our platform. No setup fees, no long-term contracts.
          </p>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 border-2 border-white flex items-center justify-center text-white text-sm font-semibold"
                >
                  {i}
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
              <div className="text-gray-300 text-sm">From 2,847+ team leaders</div>
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
                <p className="text-gray-300 mb-6">{action.description}</p>

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
              <div className="text-green-400 text-sm">{stat.change}</div>
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
            <h3 className="text-2xl font-bold text-white mb-4">Trusted by Industry Leaders</h3>
            <p className="text-gray-300">
              Used by top real estate teams across all major markets
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'RE/MAX', teams: '847 teams' },
              { name: 'Keller Williams', teams: '623 teams' },
              { name: 'Coldwell Banker', teams: '421 teams' },
              { name: 'Century 21', teams: '356 teams' }
            ].map((company, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">{company.name.charAt(0)}</span>
                </div>
                <div className="text-white font-semibold">{company.name}</div>
                <div className="text-gray-400 text-sm">{company.teams}</div>
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
              Ready to 10x Your Team's Performance?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join the platform that's helping real estate teams close more deals,
              manage leads better, and grow faster than ever before.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLeadModalOpen(true)}
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                Start Free Trial
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLeadModalOpen(true)}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Schedule Demo
              </motion.button>
            </div>

            <div className="mt-6 text-blue-100 text-sm">
              No credit card required • Setup in under 5 minutes • Cancel anytime
            </div>
          </div>
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