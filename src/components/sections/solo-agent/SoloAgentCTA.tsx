'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Calendar,
  Phone,
  MessageSquare,
  Play,
  Download,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  Target,
  Heart,
  Coffee,
  Rocket,
  Zap,
  Shield,
  Crown,
  Gift,
  Timer,
  Bell,
  Globe,
  Smartphone,
  Mail,
  Video,
  BookOpen,
  Briefcase,
  Building,
  Home,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'

const urgencyStats = [
  {
    stat: '2,847',
    label: 'Solo agents transformed this month',
    icon: Users,
    color: 'text-blue-400'
  },
  {
    stat: '147%',
    label: 'Average income increase',
    icon: TrendingUp,
    color: 'text-green-400'
  },
  {
    stat: '3 min',
    label: 'Average lead response time',
    icon: Zap,
    color: 'text-purple-400'
  },
  {
    stat: '4.9/5',
    label: 'Agent satisfaction rating',
    icon: Star,
    color: 'text-yellow-400'
  }
]

const limitedOffers = [
  {
    title: 'Free Setup & Onboarding',
    description: 'Normally $497, completely free for new solo agents',
    value: '$497',
    icon: Gift,
    expires: 'Limited time'
  },
  {
    title: '90-Day Success Guarantee',
    description: 'See results or get 100% money back',
    value: 'Risk-free',
    icon: Shield,
    expires: 'All plans'
  },
  {
    title: 'Personal Success Coach',
    description: '1-on-1 coaching for first 30 days',
    value: '$997',
    icon: Award,
    expires: 'First 100 agents'
  },
  {
    title: 'Exclusive Mastermind Access',
    description: 'Join our elite solo agent community',
    value: '$297/mo',
    icon: Crown,
    expires: 'Founding members'
  }
]

const socialProof = [
  {
    platform: 'Google Reviews',
    rating: '4.9/5',
    reviews: '2,847 reviews',
    icon: Star
  },
  {
    platform: 'Trustpilot',
    rating: '4.8/5',
    reviews: '1,234 reviews',
    icon: Shield
  },
  {
    platform: 'Better Business Bureau',
    rating: 'A+',
    reviews: 'Accredited',
    icon: Award
  }
]

const contactMethods = [
  {
    method: 'Instant Demo',
    description: 'See the platform in action right now',
    action: 'Watch Demo',
    icon: Play,
    color: 'from-purple-600 to-blue-600',
    popular: true
  },
  {
    method: 'Personal Consultation',
    description: 'Speak with a solo agent specialist',
    action: 'Book Call',
    icon: Calendar,
    color: 'from-green-600 to-green-700',
    popular: false
  },
  {
    method: 'Live Chat',
    description: 'Get instant answers to your questions',
    action: 'Start Chat',
    icon: MessageSquare,
    color: 'from-orange-600 to-orange-700',
    popular: false
  },
  {
    method: 'Call Sales',
    description: 'Speak with someone right now',
    action: 'Call (555) 123-4567',
    icon: Phone,
    color: 'from-cyan-600 to-cyan-700',
    popular: false
  }
]

const finalBenefits = [
  {
    benefit: 'Start generating leads in 24 hours',
    icon: Zap,
    description: 'AI responds to leads instantly while you sleep'
  },
  {
    benefit: 'Work 25 fewer hours per week',
    icon: Clock,
    description: 'Automation handles repetitive tasks'
  },
  {
    benefit: 'Double your income within 12 months',
    icon: DollarSign,
    description: 'Average agent sees 147% increase'
  },
  {
    benefit: 'Compete with big teams',
    icon: Target,
    description: 'Level the playing field with AI'
  },
  {
    benefit: 'Get your life back',
    icon: Heart,
    description: 'Spend more time with family'
  },
  {
    benefit: 'Become the market leader',
    icon: Crown,
    description: 'Dominate your local market'
  }
]

const testimonialHighlights = [
  {
    name: 'Sarah Chen',
    result: 'Income increased 154% in first year',
    quote: 'Best investment I\'ve ever made for my business',
    location: 'Austin, TX'
  },
  {
    name: 'Michael Rodriguez',
    result: 'Now top 1% luxury agent in Miami',
    quote: 'The AI never misses a high-value lead',
    location: 'Miami, FL'
  },
  {
    name: 'Jennifer Park',
    result: 'Commercial volume increased 300%',
    quote: 'I\'ve become the go-to agent for investors',
    location: 'Seattle, WA'
  }
]

const countdownTimer = {
  days: 2,
  hours: 14,
  minutes: 37,
  seconds: 42
}

export function SoloAgentCTA() {
  const [selectedContact, setSelectedContact] = useState(0)
  const [showUrgency, setShowUrgency] = useState(true)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleLeadFormSubmit = (formData: LeadFormData) => {
    console.log('Solo agent consultation request:', formData)
    // Handle form submission here
    setIsLeadModalOpen(false)
  }

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

  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Urgency Banner */}
        <AnimatePresence>
          {showUrgency && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 mb-16 border border-red-500"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Timer className="w-8 h-8 text-white animate-pulse" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Limited Time Offer Expires Soon!</h3>
                    <p className="text-red-100">Save up to $1,791 in setup fees and bonuses</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{countdownTimer.days}</div>
                    <div className="text-xs text-red-100">DAYS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{countdownTimer.hours}</div>
                    <div className="text-xs text-red-100">HOURS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{countdownTimer.minutes}</div>
                    <div className="text-xs text-red-100">MINS</div>
                  </div>
                  <button
                    onClick={() => setShowUrgency(false)}
                    className="text-white hover:text-red-200 ml-4"
                  >
                    ×
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main CTA Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full text-purple-300 text-sm font-semibold mb-8 border border-purple-500/30 backdrop-blur-sm"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Your Solo Agent Transformation Starts Here
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
          >
            <span className="block">Ready to Become the</span>
            <span className="block text-gradient bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              #1 Agent in Your Market?
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Join 2,847 solo agents who've transformed their practice with AI and are now
            <span className="text-purple-400 font-semibold"> earning more</span>,
            <span className="text-blue-400 font-semibold"> working less</span>, and
            <span className="text-cyan-400 font-semibold"> living better</span>.
          </motion.p>

          {/* Urgency Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          >
            {urgencyStats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-center mb-3">
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.stat}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Limited Offers */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Exclusive Bonuses Worth $1,791
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              When you start your transformation today, you'll receive these incredible bonuses absolutely free.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {limitedOffers.map((offer, index) => {
              const IconComponent = offer.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center relative"
                >
                  <div className="absolute -top-3 right-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {offer.expires}
                  </div>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-400 mb-2">{offer.value}</div>
                  <h4 className="text-lg font-bold text-white mb-3">{offer.title}</h4>
                  <p className="text-gray-300 text-sm">{offer.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Choose Your Preferred Way to Get Started
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our solo agent specialists are standing by to help you transform your practice.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedContact(index)}
                  className={`cursor-pointer rounded-xl p-8 border-2 transition-all text-center ${
                    method.popular
                      ? 'border-purple-500 bg-white/20 shadow-xl shadow-purple-500/25'
                      : 'border-white/20 bg-white/10 hover:border-purple-500/50'
                  }`}
                >
                  {method.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{method.method}</h4>
                  <p className="text-gray-300 mb-6">{method.description}</p>
                  <Button
                    size="lg"
                    onClick={() => method.method === 'Personal Consultation' ? setIsLeadModalOpen(true) : undefined}
                    className={`w-full ${
                      method.popular
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                        : 'bg-white/10 border border-white/30 text-white hover:bg-white hover:text-gray-900'
                    } font-semibold`}
                  >
                    {method.action}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Final Benefits */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              What Happens When You Start Today
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {finalBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{benefit.benefit}</h4>
                  <p className="text-gray-300">{benefit.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Testimonial Highlights */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Your Success Story Starts Today
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8">
            {testimonialHighlights.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{testimonial.name}</h4>
                <div className="text-sm text-gray-400 mb-4">{testimonial.location}</div>
                <div className="text-lg font-semibold text-green-400 mb-4">{testimonial.result}</div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8">
            {socialProof.map((proof, index) => {
              const IconComponent = proof.icon
              return (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl p-6 border border-white/10 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="text-xl font-bold text-white mb-2">{proof.rating}</div>
                  <div className="text-lg font-semibold text-white mb-1">{proof.platform}</div>
                  <div className="text-sm text-gray-400">{proof.reviews}</div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white relative overflow-hidden"
          >
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-full animate-float"></div>
              <div className="absolute top-20 right-16 w-8 h-8 bg-white rounded-full animate-float animation-delay-1000"></div>
              <div className="absolute bottom-16 left-20 w-12 h-12 bg-white rounded-full animate-float animation-delay-2000"></div>
              <div className="absolute bottom-8 right-8 w-6 h-6 bg-white rounded-full animate-float animation-delay-3000"></div>
            </div>

            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white animate-pulse" />
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Don't Wait Another Day to Transform Your Practice
              </h1>

              <p className="text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
                Every day you wait is another day your competitors get ahead.
                Join the solo agent revolution and start your transformation today.
              </p>

              <div className="flex flex-col lg:flex-row gap-6 justify-center mb-12">
                <Button
                  size="xl"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-6 text-2xl font-bold group shadow-2xl"
                >
                  <Rocket className="w-8 h-8 mr-4 group-hover:animate-pulse" />
                  Start Your 7-Day Free Trial
                  <ArrowRight className="w-8 h-8 ml-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="xl"
                  variant="outline"
                  className="border-4 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-6 text-xl font-semibold backdrop-blur-sm"
                >
                  <Phone className="w-6 h-6 mr-3" />
                  Call (555) 123-4567
                </Button>
              </div>

              <div className="grid md:grid-cols-5 gap-8 text-purple-100">
                <div className="flex flex-col items-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <span className="font-semibold">7-Day Free Trial</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <span className="font-semibold">No Setup Fees</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <span className="font-semibold">Cancel Anytime</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <span className="font-semibold">90-Day Guarantee</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <span className="font-semibold">24/7 Support</span>
                </div>
              </div>

              <div className="mt-12 text-purple-100">
                <p className="text-lg">
                  🚀 <strong>Limited Time:</strong> First 100 agents get exclusive bonuses worth $1,791
                </p>
                <p className="text-sm mt-2 opacity-80">
                  * Offer expires in {countdownTimer.days} days, {countdownTimer.hours} hours, {countdownTimer.minutes} minutes
                </p>
              </div>
            </div>
          </motion.div>
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