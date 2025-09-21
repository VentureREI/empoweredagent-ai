'use client'

import { motion } from 'framer-motion'
import { Check, Star, Crown, Zap, Users, TrendingUp, Shield, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const pricingPlans = [
  {
    id: 'starter',
    name: 'Team Starter',
    description: 'Perfect for small teams getting started',
    price: 299,
    billing: 'per month',
    teamSize: '3-8 agents',
    popular: false,
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    features: [
      'Lead distribution system',
      'Basic CRM integration',
      'Team calendar & scheduling',
      'Performance dashboards',
      'Email marketing tools',
      'Standard support',
      'Mobile app access',
      'Document management'
    ],
    metrics: {
      setup: '2 hours',
      roi: '3x ROI typical',
      support: '24/7 chat'
    }
  },
  {
    id: 'professional',
    name: 'Team Professional',
    description: 'Advanced tools for growing teams',
    price: 599,
    billing: 'per month',
    teamSize: '8-20 agents',
    popular: true,
    icon: TrendingUp,
    color: 'from-purple-500 to-purple-600',
    features: [
      'Advanced lead scoring & routing',
      'Multi-MLS integration',
      'AI-powered market analysis',
      'Custom team workflows',
      'Advanced reporting & analytics',
      'Priority support',
      'Team collaboration tools',
      'Transaction management',
      'Custom branding',
      'API access'
    ],
    metrics: {
      setup: '1 hour',
      roi: '5x ROI typical',
      support: 'Priority phone'
    }
  },
  {
    id: 'enterprise',
    name: 'Team Enterprise',
    description: 'Enterprise-grade solution for large teams',
    price: 1299,
    billing: 'per month',
    teamSize: '20+ agents',
    popular: false,
    icon: Crown,
    color: 'from-amber-500 to-amber-600',
    features: [
      'Unlimited lead sources',
      'Custom AI models',
      'Advanced market predictions',
      'Multi-office management',
      'White-label solution',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced security & compliance',
      'Team training & onboarding',
      'Custom reporting',
      'SLA guarantees'
    ],
    metrics: {
      setup: '30 minutes',
      roi: '8x ROI typical',
      support: 'Dedicated manager'
    }
  }
]

const comparisonFeatures = [
  {
    category: 'Lead Management',
    features: [
      { name: 'Lead distribution', starter: true, professional: true, enterprise: true },
      { name: 'Advanced lead scoring', starter: false, professional: true, enterprise: true },
      { name: 'Custom routing rules', starter: false, professional: true, enterprise: true },
      { name: 'AI-powered lead qualification', starter: false, professional: false, enterprise: true }
    ]
  },
  {
    category: 'Team Management',
    features: [
      { name: 'Performance tracking', starter: true, professional: true, enterprise: true },
      { name: 'Goal setting & tracking', starter: true, professional: true, enterprise: true },
      { name: 'Commission tracking', starter: false, professional: true, enterprise: true },
      { name: 'Multi-office management', starter: false, professional: false, enterprise: true }
    ]
  },
  {
    category: 'Analytics & Reporting',
    features: [
      { name: 'Basic reporting', starter: true, professional: true, enterprise: true },
      { name: 'Advanced analytics', starter: false, professional: true, enterprise: true },
      { name: 'Custom dashboards', starter: false, professional: true, enterprise: true },
      { name: 'Market predictions', starter: false, professional: false, enterprise: true }
    ]
  },
  {
    category: 'Support & Training',
    features: [
      { name: 'Email support', starter: true, professional: true, enterprise: true },
      { name: 'Phone support', starter: false, professional: true, enterprise: true },
      { name: 'Team training', starter: false, professional: false, enterprise: true },
      { name: 'Dedicated account manager', starter: false, professional: false, enterprise: true }
    ]
  }
]

const testimonials = [
  {
    name: 'Michael Chen',
    role: 'Team Leader',
    company: 'Pacific Coast Realty',
    image: '/api/placeholder/80/80',
    quote: 'Our team productivity increased by 340% after implementing the Professional plan. The lead routing alone saved us 15 hours per week.',
    plan: 'professional'
  },
  {
    name: 'Sarah Rodriguez',
    role: 'Broker Owner',
    company: 'Metro Real Estate Group',
    image: '/api/placeholder/80/80',
    quote: 'The Enterprise plan transformed our 45-agent operation. We now manage 3 offices seamlessly with real-time insights.',
    plan: 'enterprise'
  },
  {
    name: 'David Kim',
    role: 'Team Captain',
    company: 'Urban Properties',
    image: '/api/placeholder/80/80',
    quote: 'Started with Team Starter and loved it so much we upgraded to Professional. ROI was immediate and substantial.',
    plan: 'starter'
  }
]

export default function TeamPricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [showComparison, setShowComparison] = useState(false)

  const getDiscountedPrice = (price: number) => {
    return billingPeriod === 'annual' ? Math.round(price * 0.8) : price
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4" />
            Team Pricing Plans
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Team's
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 block">
              Success Plan
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Scale your real estate team with plans designed for every stage of growth.
            From startup teams to enterprise operations.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-purple-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  billingPeriod === 'annual' ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingPeriod === 'annual' ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            {billingPeriod === 'annual' && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                Save 20%
              </span>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden ${
                  plan.popular ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} text-white mb-4`}>
                      <IconComponent className="h-8 w-8" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>

                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ${getDiscountedPrice(plan.price).toLocaleString()}
                      </span>
                      <span className="text-gray-600 ml-2">/{plan.billing}</span>
                      {billingPeriod === 'annual' && (
                        <div className="text-sm text-green-600 font-medium">
                          Save ${(plan.price * 12 * 0.2).toLocaleString()} annually
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-gray-600 font-medium mb-6">
                      For teams with {plan.teamSize}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{plan.metrics.setup}</div>
                      <div className="text-xs text-gray-600">Setup time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{plan.metrics.roi}</div>
                      <div className="text-xs text-gray-600">ROI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{plan.metrics.support}</div>
                      <div className="text-xs text-gray-600">Support</div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Start {plan.name}
                    <ArrowRight className="inline-block ml-2 h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Feature Comparison Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors"
          >
            <Shield className="h-4 w-4" />
            {showComparison ? 'Hide' : 'Show'} Detailed Feature Comparison
          </button>
        </motion.div>

        {/* Feature Comparison Table */}
        {showComparison && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16"
          >
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Feature Comparison
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-900">Starter</th>
                      <th className="text-center py-4 px-6 font-semibold text-purple-600">Professional</th>
                      <th className="text-center py-4 px-6 font-semibold text-amber-600">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((category, categoryIdx) => (
                      <>
                        <tr key={`category-${categoryIdx}`} className="bg-gray-50">
                          <td colSpan={4} className="py-3 px-6 font-semibold text-gray-800">
                            {category.category}
                          </td>
                        </tr>
                        {category.features.map((feature, featureIdx) => (
                          <tr key={`feature-${categoryIdx}-${featureIdx}`} className="border-b border-gray-100">
                            <td className="py-3 px-6 text-gray-700">{feature.name}</td>
                            <td className="py-3 px-6 text-center">
                              {feature.starter ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <span className="text-gray-300">—</span>
                              )}
                            </td>
                            <td className="py-3 px-6 text-center">
                              {feature.professional ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <span className="text-gray-300">—</span>
                              )}
                            </td>
                            <td className="py-3 px-6 text-center">
                              {feature.enterprise ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <span className="text-gray-300">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Customer Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <div className="mt-4 text-sm text-purple-600 font-medium">
                Using {testimonial.plan} plan
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}