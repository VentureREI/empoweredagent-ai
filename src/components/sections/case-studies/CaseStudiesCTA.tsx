'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone, Calendar, Users, Star, Zap, CheckCircle, Play, MessageCircle, Award, Download, Shield, Clock, Target } from 'lucide-react'
import { useState } from 'react'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'

const ctaStats = [
  {
    value: '94%',
    label: 'Success Rate',
    change: 'Across all implementations'
  },
  {
    value: '16.2',
    label: 'Months Average',
    change: 'To achieve major results'
  },
  {
    value: '847%',
    label: 'Average ROI',
    change: 'Return on investment'
  },
  {
    value: '156',
    label: 'Verified Stories',
    change: 'Real client transformations'
  }
]

const quickActions = [
  {
    icon: Calendar,
    title: 'Schedule Your Success Consultation',
    description: 'Get personalized insights on your growth potential',
    action: 'Book Consultation',
    color: 'from-blue-500 to-blue-600',
    popular: true,
    duration: '45 minutes',
    benefit: 'Custom success roadmap',
    includes: [
      'Business assessment & gap analysis',
      'Custom ROI projections',
      'Implementation timeline',
      'Success strategy recommendations'
    ]
  },
  {
    icon: Download,
    title: 'Download Case Study Collection',
    description: 'Complete PDF collection of detailed case studies',
    action: 'Download Now',
    color: 'from-green-500 to-green-600',
    popular: false,
    duration: 'Instant',
    benefit: 'Detailed success blueprints',
    includes: [
      '25+ detailed case studies',
      'Implementation templates',
      'ROI calculation worksheets',
      'Best practices guide'
    ]
  },
  {
    icon: Play,
    title: 'Watch Success Story Videos',
    description: 'See real clients share their transformation stories',
    action: 'Watch Videos',
    color: 'from-purple-500 to-purple-600',
    popular: false,
    duration: '30 minutes',
    benefit: 'Real client testimonials',
    includes: [
      '12 video testimonials',
      'Behind-the-scenes content',
      'Before/after comparisons',
      'Client interview highlights'
    ]
  }
]

const successGuarantees = [
  {
    guarantee: '90-Day ROI Guarantee',
    description: 'See measurable results within 90 days or get your money back',
    icon: Target,
    details: 'We track your key metrics and guarantee improvement within the first quarter'
  },
  {
    guarantee: 'White-Glove Implementation',
    description: 'Dedicated success manager guides your entire transformation',
    icon: Users,
    details: 'Personal implementation specialist ensures smooth transition and adoption'
  },
  {
    guarantee: 'Risk-Free Trial Period',
    description: '30-day trial with full access to all features and support',
    icon: Shield,
    details: 'Experience the platform risk-free with complete functionality access'
  },
  {
    guarantee: '24/7 Success Support',
    description: 'Round-the-clock support during your transformation journey',
    icon: Clock,
    details: 'Always-available expert support to ensure continuous progress'
  }
]

const implementationSteps = [
  {
    step: 1,
    title: 'Discovery & Analysis',
    description: 'Comprehensive business assessment and success planning',
    duration: '1 week',
    deliverables: ['Current state analysis', 'Success roadmap', 'Custom timeline']
  },
  {
    step: 2,
    title: 'Platform Setup',
    description: 'Complete system configuration and data migration',
    duration: '2 weeks',
    deliverables: ['Platform deployment', 'Data migration', 'Integration setup']
  },
  {
    step: 3,
    title: 'Team Training',
    description: 'Comprehensive training and adoption support',
    duration: '2 weeks',
    deliverables: ['Team training sessions', 'Documentation', 'Certification']
  },
  {
    step: 4,
    title: 'Launch & Optimize',
    description: 'Go-live support and continuous optimization',
    duration: 'Ongoing',
    deliverables: ['Launch support', 'Performance monitoring', 'Regular optimization']
  }
]

const socialProof = [
  {
    metric: '2,847+',
    label: 'Real Estate Professionals',
    description: 'Trust our platform daily'
  },
  {
    metric: '$2.4B+',
    label: 'In Client Revenue',
    description: 'Generated through our platform'
  },
  {
    metric: '500+',
    label: 'Brokerages',
    description: 'Powered by our technology'
  },
  {
    metric: '4.9/5',
    label: 'Client Satisfaction',
    description: 'Based on verified reviews'
  }
]

export default function CaseStudiesCTA() {
  const [hoveredAction, setHoveredAction] = useState<number | null>(null)
  const [showImplementation, setShowImplementation] = useState(false)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  const handleLeadFormSubmit = (formData: LeadFormData) => {
    console.log('Success consultation request:', formData)
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
        {/* Main CTA Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="h-4 w-4 text-yellow-400" />
            Ready to Write Your Success Story?
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Join 156 Success Stories and
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 block">
              Transform Your Business
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            You've seen the results. You've read the stories. Now it's time to create your own
            transformation. Join the elite group of real estate professionals achieving extraordinary success.
          </p>

          {/* Social Proof */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {socialProof.map((proof, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  {proof.metric}
                </div>
                <div className="text-yellow-400 font-medium mb-1">{proof.label}</div>
                <div className="text-gray-400 text-sm">{proof.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
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

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white font-medium">{action.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">You Get</span>
                    <span className="text-white font-medium">{action.benefit}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-medium mb-2">Includes:</h4>
                  <div className="space-y-1">
                    {action.includes.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span className="text-gray-300 text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => action.title.includes('Success Consultation') ? setIsLeadModalOpen(true) : undefined}
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

        {/* Success Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Our Success Guarantees</h3>
            <p className="text-gray-300">
              We're so confident in our platform, we guarantee your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successGuarantees.map((guarantee, index) => {
              const IconComponent = guarantee.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">{guarantee.guarantee}</h4>
                  <p className="text-gray-300 text-sm mb-2">{guarantee.description}</p>
                  <p className="text-gray-400 text-xs">{guarantee.details}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Implementation Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Your Path to Success</h3>
            <p className="text-gray-300">
              Our proven 4-step implementation process ensures your transformation
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
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {step.step}
                </div>
                <h4 className="font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-gray-300 text-sm mb-3">{step.description}</p>
                <div className="text-yellow-400 text-xs font-medium mb-3">{step.duration}</div>
                <div className="space-y-1">
                  {step.deliverables.map((deliverable, idx) => (
                    <div key={idx} className="text-gray-400 text-xs">• {deliverable}</div>
                  ))}
                </div>
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

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Your Success Story Starts Today
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join the platform that's helped 156 real estate professionals achieve extraordinary results.
              Your transformation is just one decision away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLeadModalOpen(true)}
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Schedule Success Consultation
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
              >
                <Download className="h-5 w-5" />
                Download Case Studies
              </motion.button>
            </div>

            <div className="text-blue-100 text-sm mb-4">
              Risk-free consultation • No obligation • Immediate insights
            </div>

            <div className="flex items-center justify-center gap-6 text-blue-200 text-xs">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>90-Day ROI Guarantee</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>White-Glove Implementation</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>24/7 Success Support</span>
              </div>
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