'use client'

import { useState, useEffect } from 'react'
import { Check, X, Star, Zap, Crown, Building } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small businesses getting started with AI automation',
    icon: Zap,
    price: {
      monthly: 99,
      annually: 79
    },
    popular: false,
    features: {
      agents: '3 AI Agents',
      tasks: '5,000 monthly tasks',
      integrations: '10 integrations',
      support: 'Email support',
      uptime: '99.5% SLA',
      users: '5 team members',
      storage: '10GB data storage',
      analytics: 'Basic analytics',
      workflows: 'Pre-built workflows',
      customization: 'Limited customization'
    },
    included: [
      'agents', 'tasks', 'integrations', 'support', 'uptime', 'users', 'storage', 'analytics', 'workflows'
    ],
    excluded: ['customization'],
    cta: 'Start Free Trial',
    badge: null
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing businesses that need advanced automation capabilities',
    icon: Star,
    price: {
      monthly: 299,
      annually: 239
    },
    popular: true,
    features: {
      agents: '10 AI Agents',
      tasks: '25,000 monthly tasks',
      integrations: '50 integrations',
      support: 'Priority support',
      uptime: '99.9% SLA',
      users: '25 team members',
      storage: '100GB data storage',
      analytics: 'Advanced analytics',
      workflows: 'Custom workflows',
      customization: 'Full customization',
      api: 'API access',
      whitelabel: 'White-label options'
    },
    included: [
      'agents', 'tasks', 'integrations', 'support', 'uptime', 'users', 
      'storage', 'analytics', 'workflows', 'customization', 'api', 'whitelabel'
    ],
    excluded: [],
    cta: 'Start Free Trial',
    badge: 'Most Popular'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations requiring enterprise-grade features and support',
    icon: Crown,
    price: {
      monthly: 'Custom',
      annually: 'Custom'
    },
    popular: false,
    features: {
      agents: 'Unlimited AI Agents',
      tasks: 'Unlimited monthly tasks',
      integrations: 'Unlimited integrations',
      support: '24/7 dedicated support',
      uptime: '99.99% SLA',
      users: 'Unlimited team members',
      storage: 'Unlimited data storage',
      analytics: 'Enterprise analytics',
      workflows: 'Enterprise workflows',
      customization: 'Complete customization',
      api: 'Premium API access',
      whitelabel: 'Full white-labeling',
      onpremise: 'On-premise deployment',
      sso: 'SSO integration',
      compliance: 'SOC 2, HIPAA compliance'
    },
    included: [
      'agents', 'tasks', 'integrations', 'support', 'uptime', 'users',
      'storage', 'analytics', 'workflows', 'customization', 'api', 
      'whitelabel', 'onpremise', 'sso', 'compliance'
    ],
    excluded: [],
    cta: 'Contact Sales',
    badge: 'Enterprise'
  }
]

const featureDescriptions = {
  agents: 'Number of AI agents you can deploy',
  tasks: 'Automated tasks processed per month',
  integrations: 'Third-party system connections',
  support: 'Customer support level and response time',
  uptime: 'Service level agreement for availability',
  users: 'Team members who can access the platform',
  storage: 'Data storage capacity for your workflows',
  analytics: 'Reporting and performance insights',
  workflows: 'Workflow templates and customization options',
  customization: 'Ability to customize agent behavior and UI',
  api: 'Programmatic access to platform features',
  whitelabel: 'Brand the platform with your company identity',
  onpremise: 'Deploy on your own infrastructure',
  sso: 'Single sign-on integration with your identity provider',
  compliance: 'Enterprise security and compliance certifications'
}

const additionalFeatures = [
  'Free 30-day trial on all plans',
  'No setup fees or hidden costs',
  'Cancel anytime with 30-day notice',
  'Migration assistance included',
  'Training and onboarding support',
  'Regular feature updates and improvements'
]

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly')
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('pricing-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="pricing-section" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={cn(
          'text-center mb-16 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Simple, Transparent{' '}
            <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Choose the plan that fits your business needs. All plans include our core AI agent capabilities with no hidden fees.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-white dark:bg-gray-900 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'px-6 py-2 rounded-md text-sm font-medium transition-all duration-200',
                billingCycle === 'monthly'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annually')}
              className={cn(
                'px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 relative',
                billingCycle === 'annually'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              Annually
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className={cn(
          'grid lg:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-200',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          {pricingPlans.map((plan) => {
            const Icon = plan.icon
            const isHovered = hoveredPlan === plan.id
            const price = typeof plan.price[billingCycle] === 'number' 
              ? plan.price[billingCycle] 
              : plan.price[billingCycle]

            return (
              <div
                key={plan.id}
                className={cn(
                  'relative transition-all duration-300 cursor-pointer bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700',
                  plan.popular 
                    ? 'ring-2 ring-purple-500 ring-offset-4 scale-105 lg:scale-110' 
                    : 'hover:scale-105',
                  isHovered ? 'shadow-2xl' : ''
                )}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className={cn(
                      'px-4 py-1 rounded-full text-sm font-semibold',
                      plan.popular 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-800 text-white'
                    )}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan header */}
                  <div className="text-center">
                    <div className={cn(
                      'inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-300',
                      plan.popular 
                        ? 'bg-purple-600 text-white scale-110' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    )}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {plan.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center">
                    {typeof price === 'number' ? (
                      <>
                        <div className="flex items-baseline justify-center">
                          <span className="text-4xl font-bold text-gray-900 dark:text-white">
                            ${price}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400 ml-2">
                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                          </span>
                        </div>
                        {billingCycle === 'annually' && typeof plan.price.monthly === 'number' && (
                          <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                            Save ${(plan.price.monthly * 12) - (price * 12)}/year
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-4xl font-bold text-gray-900 dark:text-white">
                        {price}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {Object.entries(plan.features).map(([key, value]) => (
                      <div 
                        key={key} 
                        className="flex items-center gap-3 group"
                        title={featureDescriptions[key as keyof typeof featureDescriptions]}
                      >
                        {plan.included.includes(key) ? (
                          <Check className="text-green-500 flex-shrink-0" size={16} />
                        ) : (
                          <X className="text-gray-400 flex-shrink-0" size={16} />
                        )}
                        <span className={cn(
                          'text-sm',
                          plan.included.includes(key)
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-500 dark:text-gray-400'
                        )}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    className={cn(
                      'w-full py-3 px-6 rounded-lg font-medium transition-all duration-300',
                      plan.popular 
                        ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
                      isHovered ? 'shadow-lg transform scale-105' : ''
                    )}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional features */}
        <div className={cn(
          'text-center transition-all duration-1000 delay-400',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Included with All Plans
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Check className="text-green-500 flex-shrink-0" size={16} />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}