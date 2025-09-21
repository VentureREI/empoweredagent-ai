'use client'

import { motion } from 'framer-motion'
import { Check, Star, Crown, Zap, Building2, TrendingUp, Shield, ArrowRight, Users, BarChart3 } from 'lucide-react'
import { useState } from 'react'

const pricingPlans = [
  {
    id: 'growth',
    name: 'Growth Brokerage',
    description: 'Perfect for emerging brokerages ready to scale',
    price: 899,
    billing: 'per month',
    agentRange: '10-50 agents',
    popular: false,
    icon: TrendingUp,
    color: 'from-blue-500 to-blue-600',
    features: [
      'Complete agent management suite',
      'Basic CRM and lead distribution',
      'Performance analytics dashboard',
      'Commission tracking and payments',
      'Standard compliance monitoring',
      'Email and phone support',
      'Mobile app for agents',
      'Document management system',
      'Basic market analytics',
      'Agent onboarding tools'
    ],
    metrics: {
      setup: '1 week',
      roi: '4x ROI typical',
      support: 'Business hours'
    },
    included: {
      agents: '50 agents included',
      transactions: 'Unlimited transactions',
      storage: '100GB document storage',
      integrations: '10+ MLS integrations'
    }
  },
  {
    id: 'professional',
    name: 'Professional Brokerage',
    description: 'Advanced platform for established brokerages',
    price: 1899,
    billing: 'per month',
    agentRange: '50-200 agents',
    popular: true,
    icon: Building2,
    color: 'from-purple-500 to-purple-600',
    features: [
      'Advanced agent management & analytics',
      'AI-powered lead scoring & routing',
      'Multi-office management',
      'Custom commission structures',
      'Advanced market intelligence',
      'Priority support & training',
      'White-label mobile apps',
      'Advanced reporting suite',
      'Compliance automation',
      'Custom integrations & API access',
      'Team collaboration tools',
      'Automated workflows',
      'Territory management',
      'Performance coaching tools'
    ],
    metrics: {
      setup: '3 days',
      roi: '6x ROI typical',
      support: '24/7 priority'
    },
    included: {
      agents: '200 agents included',
      transactions: 'Unlimited transactions',
      storage: '500GB document storage',
      integrations: 'All MLS integrations'
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise Brokerage',
    description: 'Ultimate platform for large brokerage networks',
    price: 3999,
    billing: 'per month',
    agentRange: '200+ agents',
    popular: false,
    icon: Crown,
    color: 'from-amber-500 to-amber-600',
    features: [
      'Unlimited agent management',
      'AI-powered market predictions',
      'Multi-brand/franchise management',
      'Custom platform development',
      'Advanced business intelligence',
      'Dedicated success manager',
      'Custom training programs',
      'Enterprise security & compliance',
      'Full API access & customization',
      'Advanced automation tools',
      'Custom reporting & dashboards',
      'Multi-language support',
      'Disaster recovery & backup',
      'SLA guarantees',
      'On-premise deployment options'
    ],
    metrics: {
      setup: '1 day',
      roi: '8x ROI typical',
      support: 'Dedicated manager'
    },
    included: {
      agents: 'Unlimited agents',
      transactions: 'Unlimited transactions',
      storage: 'Unlimited storage',
      integrations: 'All integrations + custom'
    }
  }
]

const comparisonFeatures = [
  {
    category: 'Agent Management',
    features: [
      { name: 'Agent onboarding & setup', growth: true, professional: true, enterprise: true },
      { name: 'Performance tracking', growth: true, professional: true, enterprise: true },
      { name: 'Advanced analytics & coaching', growth: false, professional: true, enterprise: true },
      { name: 'Multi-office management', growth: false, professional: true, enterprise: true },
      { name: 'Unlimited agent capacity', growth: false, professional: false, enterprise: true }
    ]
  },
  {
    category: 'Lead & Transaction Management',
    features: [
      { name: 'Basic lead distribution', growth: true, professional: true, enterprise: true },
      { name: 'AI-powered lead scoring', growth: false, professional: true, enterprise: true },
      { name: 'Advanced routing algorithms', growth: false, professional: true, enterprise: true },
      { name: 'Predictive lead analytics', growth: false, professional: false, enterprise: true }
    ]
  },
  {
    category: 'Financial Management',
    features: [
      { name: 'Commission tracking', growth: true, professional: true, enterprise: true },
      { name: 'Automated payments', growth: true, professional: true, enterprise: true },
      { name: 'Custom commission structures', growth: false, professional: true, enterprise: true },
      { name: 'Advanced financial reporting', growth: false, professional: true, enterprise: true },
      { name: 'Multi-entity accounting', growth: false, professional: false, enterprise: true }
    ]
  },
  {
    category: 'Technology & Integration',
    features: [
      { name: 'Standard MLS integrations', growth: true, professional: true, enterprise: true },
      { name: 'API access', growth: false, professional: true, enterprise: true },
      { name: 'Custom integrations', growth: false, professional: true, enterprise: true },
      { name: 'White-label solutions', growth: false, professional: false, enterprise: true },
      { name: 'On-premise deployment', growth: false, professional: false, enterprise: true }
    ]
  },
  {
    category: 'Support & Training',
    features: [
      { name: 'Email & phone support', growth: true, professional: true, enterprise: true },
      { name: '24/7 priority support', growth: false, professional: true, enterprise: true },
      { name: 'Dedicated account manager', growth: false, professional: false, enterprise: true },
      { name: 'Custom training programs', growth: false, professional: false, enterprise: true }
    ]
  }
]

const addOnServices = [
  {
    name: 'Marketing Suite',
    description: 'Advanced marketing automation and campaigns',
    price: '$299/month',
    features: ['Email campaigns', 'Social media management', 'Lead magnets', 'Landing pages']
  },
  {
    name: 'Advanced Analytics',
    description: 'Predictive analytics and market intelligence',
    price: '$199/month',
    features: ['Market predictions', 'Competitive analysis', 'Custom reports', 'Data exports']
  },
  {
    name: 'Compliance Plus',
    description: 'Enhanced compliance monitoring and reporting',
    price: '$149/month',
    features: ['Audit trails', 'Regulatory reporting', 'Risk monitoring', 'Documentation']
  },
  {
    name: 'Training Academy',
    description: 'Comprehensive agent training and certification',
    price: '$99/month',
    features: ['Video courses', 'Certifications', 'Progress tracking', 'Custom content']
  }
]

const testimonials = [
  {
    name: 'Jennifer Walsh',
    role: 'Broker/Owner',
    company: 'Pacific Premier Realty',
    image: '/api/placeholder/80/80',
    quote: 'The Professional plan transformed our 85-agent brokerage. Revenue increased 135% in 18 months with the advanced analytics and lead routing.',
    plan: 'professional',
    results: '+135% revenue growth'
  },
  {
    name: 'Robert Kim',
    role: 'Principal Broker',
    company: 'Metro Commercial Group',
    image: '/api/placeholder/80/80',
    quote: 'Managing 200+ commercial agents was impossible before Enterprise. Now we have complete visibility and automated processes.',
    plan: 'enterprise',
    results: '+62% operational efficiency'
  },
  {
    name: 'Maria Gonzalez',
    role: 'Broker/Owner',
    company: 'Sunshine Coast Realty',
    image: '/api/placeholder/80/80',
    quote: 'Started with Growth plan and loved the results. Small brokerages can now compete with enterprise-level tools.',
    plan: 'growth',
    results: '+182% productivity per agent'
  }
]

export default function BrokeragePricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [showComparison, setShowComparison] = useState(false)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])

  const getDiscountedPrice = (price: number) => {
    return billingPeriod === 'annual' ? Math.round(price * 0.8) : price
  }

  const toggleAddOn = (addOnName: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnName)
        ? prev.filter(name => name !== addOnName)
        : [...prev, addOnName]
    )
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
            <Building2 className="h-4 w-4" />
            Brokerage Pricing Plans
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Scale Your Brokerage with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 block">
              Transparent Pricing
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your brokerage size and growth ambitions.
            All plans include unlimited transactions and comprehensive support.
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
                  plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
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
                      For brokerages with {plan.agentRange}
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Agents</span>
                        <span className="font-medium">{plan.included.agents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transactions</span>
                        <span className="font-medium">{plan.included.transactions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Storage</span>
                        <span className="font-medium">{plan.included.storage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Integrations</span>
                        <span className="font-medium">{plan.included.integrations}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.slice(0, 8).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 8 && (
                      <div className="text-sm text-purple-600 font-medium">
                        +{plan.features.length - 8} more features
                      </div>
                    )}
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

        {/* Add-On Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Optional Add-On Services</h3>
            <p className="text-gray-600">Enhance your platform with specialized tools and services</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOnServices.map((addOn, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{addOn.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{addOn.description}</p>
                  <div className="text-2xl font-bold text-purple-600">{addOn.price}</div>
                </div>

                <div className="space-y-2 mb-4">
                  {addOn.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => toggleAddOn(addOn.name)}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                    selectedAddOns.includes(addOn.name)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedAddOns.includes(addOn.name) ? 'Added' : 'Add Service'}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
            <BarChart3 className="h-4 w-4" />
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
                Complete Feature Comparison
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                      <th className="text-center py-4 px-6 font-semibold text-blue-600">Growth</th>
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
                              {feature.growth ? (
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
              <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-purple-600 font-medium">
                  Using {testimonial.plan} plan
                </div>
                <div className="text-sm font-semibold text-green-600">
                  {testimonial.results}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}