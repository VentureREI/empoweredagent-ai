'use client'

import { useState, useEffect } from 'react'
import { Check, X, Star, Zap, Crown, Building } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const pricingPlans = [
  {
    id: 'core',
    name: 'Core Automation',
    description: 'AI-powered lead capture, qualification, and follow-up automation',
    icon: Zap,
    price: {
      monthly: 599,
      setup: 750
    },
    popular: false,
    features: {
      setup: '$750 one-time setup',
      leadCapture: 'AI Lead Capture & Qualification',
      autoFollowUp: 'Automated Follow-Up Sequences',
      crmIntegration: 'CRM Integration',
      support: 'Email support',
      analytics: 'Basic Analytics Dashboard',
      users: '3 team members',
      uptime: '99.5% SLA',
      customization: 'Pre-built templates'
    },
    included: [
      'setup', 'leadCapture', 'autoFollowUp', 'crmIntegration', 'support', 'analytics', 'users', 'uptime'
    ],
    excluded: ['customization'],
    cta: 'Get Started',
    badge: null
  },
  {
    id: 'growth',
    name: 'Growth Suite',
    description: 'Complete lead gen, automation, and AI marketing systems',
    icon: Star,
    price: {
      monthly: 1499,
      setup: 1500
    },
    popular: true,
    features: {
      setup: '$1,500 one-time setup',
      leadCapture: 'AI Lead Capture & Qualification',
      autoFollowUp: 'Advanced Follow-Up & Nurturing',
      crmIntegration: 'Full CRM Integration',
      aiMarketing: 'AI Marketing Content Suite',
      support: 'Priority 24-hour support',
      analytics: 'Advanced Analytics & Reporting',
      users: '10 team members',
      uptime: '99.9% SLA',
      customization: 'Full customization',
      workflows: 'Custom AI Workflows'
    },
    included: [
      'setup', 'leadCapture', 'autoFollowUp', 'crmIntegration', 'aiMarketing', 'support', 'analytics', 'users', 'uptime', 'customization', 'workflows'
    ],
    excluded: [],
    cta: 'Get Started',
    badge: 'Most Popular'
  },
  {
    id: 'enterprise',
    name: 'Enterprise AI Ops',
    description: 'White-glove service with dedicated AI operations team',
    icon: Crown,
    price: {
      monthly: 2599,
      setup: 3000
    },
    popular: false,
    features: {
      setup: '$3,000 one-time setup',
      leadCapture: 'AI Lead Capture & Qualification',
      autoFollowUp: 'Enterprise Follow-Up Systems',
      crmIntegration: 'Full CRM Integration',
      aiMarketing: 'Complete AI Marketing Suite',
      support: '24/7 Dedicated AI Operations Team',
      analytics: 'Enterprise Analytics & AI Insights',
      users: 'Unlimited team members',
      uptime: '99.99% SLA',
      customization: 'Complete customization',
      workflows: 'Enterprise AI Workflows',
      whitelabel: 'White-label options',
      api: 'Premium API access',
      compliance: 'SOC 2 & GDPR compliance'
    },
    included: [
      'setup', 'leadCapture', 'autoFollowUp', 'crmIntegration', 'aiMarketing', 'support', 'analytics', 'users', 'uptime', 'customization', 'workflows', 'whitelabel', 'api', 'compliance'
    ],
    excluded: [],
    cta: 'Contact Sales',
    badge: 'Enterprise'
  }
]

const featureDescriptions = {
  setup: 'One-time setup and deployment fee',
  leadCapture: 'AI-powered lead capture and qualification system',
  autoFollowUp: 'Automated follow-up sequences and nurturing',
  crmIntegration: 'Integration with your existing CRM',
  aiMarketing: 'AI-powered marketing content and campaigns',
  support: 'Customer support level and response time',
  analytics: 'Reporting and performance insights',
  users: 'Team members who can access the platform',
  uptime: 'Service level agreement for availability',
  customization: 'Customization level of AI systems',
  workflows: 'Custom AI workflow creation and automation',
  whitelabel: 'Brand the platform with your company identity',
  api: 'Programmatic access to platform features',
  compliance: 'Enterprise security and compliance certifications'
}

const additionalFeatures = [
  '90-day money-back guarantee',
  'Full onboarding and training included',
  'Dedicated account manager',
  'Regular optimization and updates',
  'Bank-grade security & compliance',
  'Done-for-you AI system installation'
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
            Transparent{' '}
            <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Choose the AI system that fits your business. All plans include professional setup, training, and dedicated support. No hidden fees.
          </p>
        </div>

        {/* Pricing cards */}
        <div className={cn(
          'grid lg:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-200',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          {pricingPlans.map((plan) => {
            const Icon = plan.icon
            const isHovered = hoveredPlan === plan.id
            const monthlyPrice = plan.price.monthly
            const setupPrice = plan.price.setup

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
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        ${monthlyPrice}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        /month
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      + ${setupPrice} setup fee
                    </div>
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