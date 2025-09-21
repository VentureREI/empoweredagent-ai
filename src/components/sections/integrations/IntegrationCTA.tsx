'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Zap,
  Calendar,
  Phone,
  MessageSquare,
  Star,
  Award,
  Shield,
  Rocket,
  Heart,
  Sparkles,
  TrendingUp,
  Target,
  Building,
  Globe,
  Mail
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Team Lead, Phoenix Realty Group',
    company: 'Phoenix Realty Group',
    image: '/testimonials/sarah.jpg',
    content: 'Our team saved 25 hours per week after implementing these integrations. The ROI was incredible - we saw results within the first month.',
    rating: 5,
    results: 'Saved 25hrs/week',
    teamSize: '12 agents'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Broker/Owner',
    company: 'Elite Properties',
    image: '/testimonials/michael.jpg',
    content: 'The automated lead nurturing alone increased our conversion rate by 40%. Best investment we\'ve made in our tech stack.',
    rating: 5,
    results: '+40% conversions',
    teamSize: '8 agents'
  },
  {
    id: 3,
    name: 'Jennifer Martinez',
    role: 'Operations Manager',
    company: 'Sunset Real Estate',
    image: '/testimonials/jennifer.jpg',
    content: 'Data entry used to take hours every day. Now everything syncs automatically. Our agents can focus on what they do best - selling homes.',
    rating: 5,
    results: 'Eliminated data entry',
    teamSize: '25 agents'
  }
]

const guarantees = [
  {
    icon: Clock,
    title: '24-Hour Setup',
    description: 'Most integrations live within 24 hours',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with bank-level encryption',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: '24/7 technical support and success manager',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Award,
    title: '99.9% Uptime',
    description: 'Industry-leading reliability guarantee',
    color: 'from-orange-500 to-orange-600'
  }
]

const packages = [
  {
    name: 'Starter',
    price: 299,
    period: 'month',
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 5 integrations',
      'Basic automation workflows',
      'Email support',
      'Standard reporting',
      'Mobile app access'
    ],
    integrations: '5',
    teamSize: '1-5 agents',
    setupTime: '24 hours',
    popular: false,
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Professional',
    price: 599,
    period: 'month',
    description: 'Most popular for growing real estate teams',
    features: [
      'Up to 15 integrations',
      'Advanced automation workflows',
      'Priority support',
      'Custom reporting & analytics',
      'Team collaboration tools',
      'API access',
      'Custom field mapping'
    ],
    integrations: '15',
    teamSize: '6-25 agents',
    setupTime: '48 hours',
    popular: true,
    color: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Enterprise',
    price: 1299,
    period: 'month',
    description: 'For large brokerages and franchises',
    features: [
      'Unlimited integrations',
      'Custom workflow development',
      'Dedicated success manager',
      'White-label options',
      'Advanced security controls',
      'Custom reporting suite',
      'SLA guarantees',
      'On-site training'
    ],
    integrations: 'Unlimited',
    teamSize: '25+ agents',
    setupTime: '72 hours',
    popular: false,
    color: 'from-cyan-500 to-cyan-600'
  }
]

const contactMethods = [
  {
    icon: Calendar,
    title: 'Book a Demo',
    description: 'See our platform in action with your data',
    action: 'Schedule Demo',
    color: 'from-purple-600 to-blue-600'
  },
  {
    icon: Phone,
    title: 'Call Sales',
    description: 'Speak with an integration specialist now',
    action: 'Call (555) 123-4567',
    color: 'from-green-600 to-green-700'
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Get instant answers to your questions',
    action: 'Start Chat',
    color: 'from-orange-600 to-orange-700'
  }
]

export function IntegrationCTA() {
  const [selectedPackage, setSelectedPackage] = useState('Professional')
  const [isFormOpen, setIsFormOpen] = useState(false)
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

  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Testimonials Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full text-purple-300 text-sm font-semibold mb-8 border border-purple-500/30 backdrop-blur-sm">
              <Heart className="w-5 h-5 mr-2" />
              Loved by 2,500+ Real Estate Professionals
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Join Thousands of Successful
              <span className="block text-gradient bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Real Estate Teams
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                custom={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-300">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>

                <div className="flex justify-between text-sm">
                  <div className="text-center">
                    <div className="text-purple-400 font-semibold">{testimonial.results}</div>
                    <div className="text-gray-400">Results</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-semibold">{testimonial.teamSize}</div>
                    <div className="text-gray-400">Team Size</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Choose Your Integration
              <span className="block text-gradient bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Success Plan
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transparent pricing with no hidden fees. Start with any plan and upgrade as you grow.
              All plans include our success guarantee.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                variants={itemVariants}
                custom={index}
                className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 transition-all hover:scale-105 ${
                  pkg.popular
                    ? 'border-purple-500 shadow-2xl shadow-purple-500/25'
                    : 'border-white/20 hover:border-purple-500/30'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 rounded-full text-white text-sm font-semibold flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-gray-300 mb-6">{pkg.description}</p>

                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">${pkg.price}</span>
                    <span className="text-gray-300">/{pkg.period}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-purple-400 font-semibold">{pkg.integrations}</div>
                      <div className="text-gray-400">Integrations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-semibold">{pkg.setupTime}</div>
                      <div className="text-gray-400">Setup Time</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className={`w-full ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                      : 'bg-white/10 border border-white/30 text-white hover:bg-white hover:text-gray-900'
                  } font-semibold`}
                  onClick={() => setSelectedPackage(pkg.name)}
                >
                  {pkg.popular ? (
                    <>
                      <Rocket className="w-5 h-5 mr-2" />
                      Start Free Trial
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-5 h-5 mr-2" />
                      Get Started
                    </>
                  )}
                </Button>

                <div className="text-center mt-4">
                  <span className="text-sm text-gray-400">Ideal for {pkg.teamSize}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Guarantees */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => {
              const IconComponent = guarantee.icon
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${guarantee.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">{guarantee.title}</h4>
                  <p className="text-sm text-gray-400">{guarantee.description}</p>
                </div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Final CTA Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="w-10 h-10 text-white" />
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Transform Your
              <span className="block">Real Estate Business?</span>
            </h2>

            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Join 2,500+ real estate professionals who have automated their workflows and
              increased their productivity by an average of 40%. Start your free trial today.
            </p>

            <div className="flex flex-col lg:flex-row gap-6 justify-center mb-12">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all cursor-pointer group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">{method.title}</h4>
                    <p className="text-sm text-purple-100 mb-4">{method.description}</p>
                    <div className="text-white font-semibold group-hover:text-purple-200 transition-colors">
                      {method.action}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="xl"
                className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold group shadow-2xl"
              >
                <Calendar className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                Start Free 14-Day Trial
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="xl"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-6 text-lg font-semibold backdrop-blur-sm"
              >
                <Phone className="w-5 h-5 mr-2" />
                Talk to Integration Expert
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-12 text-purple-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No Setup Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>30-Day Money Back</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Migration Assistance</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}