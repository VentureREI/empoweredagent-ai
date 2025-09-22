'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Check,
  X,
  Star,
  Zap,
  Shield,
  Clock,
  Users,
  Target,
  Brain,
  Globe,
  Phone,
  Mail,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Award,
  Crown,
  Rocket,
  Heart,
  Coffee,
  Smartphone,
  HeadphonesIcon,
  MessageSquare,
  Video,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'

const pricingPlans = [
  {
    id: 'starter',
    name: 'AI Starter',
    description: 'Essential AI automation for growing agents',
    price: 497,
    originalPrice: 697,
    period: 'month',
    badge: null,
    color: 'from-blue-500 to-blue-600',
    popular: false,
    savings: 'Save $200/month',
    features: {
      leadGeneration: {
        aiLeadResponse: true,
        responseTime: '< 2 hours',
        leadSources: 'Facebook, Google, Zillow',
        monthlyLeads: 100,
        qualification: 'AI-powered'
      },
      clientManagement: {
        contacts: 1000,
        automation: 'Lead nurturing workflows',
        reminders: true,
        customFields: 25
      },
      marketing: {
        socialPosts: 'AI-generated content',
        emailTemplates: 'Custom templates',
        marketReports: 'Weekly',
        brandedMaterials: 'Professional'
      },
      analytics: {
        dashboard: 'Business insights',
        reports: 'ROI tracking',
        insights: true,
        forecasting: false
      },
      support: {
        type: 'Email & Chat',
        hours: 'Business hours',
        onboarding: '2 hours setup',
        training: 'Live training'
      }
    },
    limits: {
      transactions: 'Up to 5 closings/month',
      integrations: 'CRM + 2 tools',
      users: 1,
      storage: 'Unlimited'
    },
    guarantee: '30-day money back',
    setupFee: 0,
    contract: 'Monthly'
  },
  {
    id: 'professional',
    name: 'AI Professional',
    description: 'Complete automation suite for serious agents',
    price: 997,
    originalPrice: 1497,
    period: 'month',
    badge: 'Most Popular',
    color: 'from-purple-500 to-purple-600',
    popular: true,
    savings: 'Save $500/month',
    features: {
      leadGeneration: {
        aiLeadResponse: true,
        responseTime: '< 30 minutes',
        leadSources: 'All major platforms',
        monthlyLeads: 'Unlimited',
        qualification: 'Advanced AI + SMS'
      },
      clientManagement: {
        contacts: 'Unlimited',
        automation: 'Full pipeline automation',
        reminders: true,
        customFields: 'Unlimited'
      },
      marketing: {
        socialPosts: 'Daily AI content',
        emailTemplates: 'Custom campaigns',
        marketReports: 'Real-time',
        brandedMaterials: 'Premium designs'
      },
      analytics: {
        dashboard: 'Advanced metrics',
        reports: 'Custom reporting',
        insights: true,
        forecasting: 'Predictive AI'
      },
      support: {
        type: 'Priority support',
        hours: 'Business hours',
        onboarding: 'Full setup (4 hours)',
        training: 'Weekly coaching calls'
      }
    },
    limits: {
      transactions: 'Up to 15 closings/month',
      integrations: 'CRM + 5 tools',
      users: 'Agent + assistant',
      storage: 'Unlimited'
    },
    guarantee: '60-day money back',
    setupFee: 0,
    contract: 'Monthly'
  },
  {
    id: 'elite',
    name: 'AI Elite',
    description: 'Enterprise-grade AI automation for top producers',
    price: 1997,
    originalPrice: 2997,
    period: 'month',
    badge: 'Elite',
    color: 'from-yellow-500 to-yellow-600',
    popular: false,
    savings: 'Save $1000/month',
    features: {
      leadGeneration: {
        aiLeadResponse: true,
        responseTime: '< 15 minutes',
        leadSources: 'All platforms + custom',
        monthlyLeads: 'Unlimited',
        qualification: 'AI + Human team'
      },
      clientManagement: {
        contacts: 'Unlimited',
        automation: 'Enterprise workflows',
        reminders: true,
        customFields: 'Unlimited'
      },
      marketing: {
        socialPosts: 'Professional content team',
        emailTemplates: 'Custom brand campaigns',
        marketReports: 'Real-time + custom',
        brandedMaterials: 'Luxury brand package'
      },
      analytics: {
        dashboard: 'Executive dashboard',
        reports: 'White-label reporting',
        insights: 'AI + market intelligence',
        forecasting: 'Advanced predictive'
      },
      support: {
        type: 'Dedicated success manager',
        hours: 'Priority access',
        onboarding: 'Done-for-you setup',
        training: 'Personal business coach'
      }
    },
    limits: {
      transactions: 'Unlimited closings',
      integrations: 'Unlimited + custom',
      users: 'Full team (up to 5)',
      storage: 'Unlimited'
    },
    guarantee: '90-day money back',
    setupFee: 0,
    contract: 'Monthly'
  }
]

const comparisonFeatures = [
  {
    category: 'Lead Generation & Response',
    features: [
      {
        name: 'AI Lead Response',
        starter: true,
        professional: true,
        elite: true
      },
      {
        name: 'Response Time',
        starter: '< 5 min',
        professional: '< 3 min',
        elite: '< 60 sec'
      },
      {
        name: 'Lead Sources',
        starter: '3',
        professional: 'Unlimited',
        elite: 'Unlimited'
      },
      {
        name: 'Monthly Lead Capacity',
        starter: '50',
        professional: '200',
        elite: 'Unlimited'
      },
      {
        name: 'AI Qualification',
        starter: 'Basic',
        professional: 'Advanced',
        elite: 'AI + Human'
      },
      {
        name: 'Smart Lead Scoring',
        starter: false,
        professional: true,
        elite: true
      }
    ]
  },
  {
    category: 'Client Management',
    features: [
      {
        name: 'Contact Database',
        starter: '500',
        professional: '2,000',
        elite: 'Unlimited'
      },
      {
        name: 'Automation Workflows',
        starter: 'Basic',
        professional: 'Advanced',
        elite: 'Custom'
      },
      {
        name: 'Smart Reminders',
        starter: true,
        professional: true,
        elite: true
      },
      {
        name: 'Custom Fields',
        starter: '10',
        professional: '50',
        elite: 'Unlimited'
      },
      {
        name: 'Transaction Pipeline',
        starter: true,
        professional: true,
        elite: true
      },
      {
        name: 'Client Portal',
        starter: false,
        professional: true,
        elite: true
      }
    ]
  },
  {
    category: 'Marketing Automation',
    features: [
      {
        name: 'Social Media Posts/Month',
        starter: '10',
        professional: '50',
        elite: 'Unlimited'
      },
      {
        name: 'Email Templates',
        starter: '25',
        professional: '100',
        elite: 'Custom'
      },
      {
        name: 'Market Reports',
        starter: 'Monthly',
        professional: 'Weekly',
        elite: 'Daily'
      },
      {
        name: 'Branded Materials',
        starter: 'Basic',
        professional: 'Professional',
        elite: 'Luxury'
      },
      {
        name: 'Video Marketing',
        starter: false,
        professional: true,
        elite: true
      },
      {
        name: 'SEO Optimization',
        starter: false,
        professional: false,
        elite: true
      }
    ]
  },
  {
    category: 'Analytics & Insights',
    features: [
      {
        name: 'Performance Dashboard',
        starter: 'Standard',
        professional: 'Advanced',
        elite: 'Executive'
      },
      {
        name: 'Custom Reports',
        starter: 'Basic',
        professional: 'Advanced',
        elite: 'White-label'
      },
      {
        name: 'AI Insights',
        starter: false,
        professional: true,
        elite: 'Predictive'
      },
      {
        name: 'Market Forecasting',
        starter: false,
        professional: 'Basic',
        elite: 'Advanced'
      },
      {
        name: 'ROI Tracking',
        starter: false,
        professional: true,
        elite: true
      },
      {
        name: 'Competitive Analysis',
        starter: false,
        professional: false,
        elite: true
      }
    ]
  }
]

const addOns = [
  {
    name: 'AI Chatbot Training',
    description: 'Custom AI training for your specific market',
    price: 497,
    period: 'one-time'
  },
  {
    name: 'Advanced Lead Scoring',
    description: 'Machine learning lead qualification',
    price: 197,
    period: 'month'
  },
  {
    name: 'Custom Integrations',
    description: 'Connect any CRM, MLS, or business tool',
    price: 297,
    period: 'month'
  },
  {
    name: 'Done-For-You Setup',
    description: 'Complete hands-off implementation',
    price: 997,
    period: 'one-time'
  }
]

const faqs = [
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.'
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No setup fees for any plan. We handle all the technical setup and integration for you at no extra cost.'
  },
  {
    question: 'What if I need more leads than my plan allows?',
    answer: 'You can easily upgrade to a higher plan or purchase additional lead capacity on a monthly basis.'
  },
  {
    question: 'Do you offer annual discounts?',
    answer: 'Yes! Pay annually and save 20% on any plan. Plus get additional bonuses and priority support.'
  },
  {
    question: 'What kind of training is included?',
    answer: 'All plans include comprehensive onboarding. Professional and Elite plans include live training sessions and ongoing coaching.'
  }
]

export function SoloAgentPricing() {
  const [selectedPlan, setSelectedPlan] = useState('professional')
  const [showComparison, setShowComparison] = useState(false)
  const [showAddOns, setShowAddOns] = useState(false)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleLeadFormSubmit = (formData: LeadFormData) => {
    console.log('Solo agent specialist consultation request:', formData)
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

  const renderFeatureValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-400 mx-auto" />
      )
    }
    return <span className="text-sm font-medium text-gray-900">{value}</span>
  }

  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <DollarSign className="w-5 h-5 mr-2" />
            Solo Agent Pricing
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8"
          >
            Choose Your Path to
            <span className="block text-gradient bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Real Estate Success
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
          >
            Every plan is designed to help solo agents compete with big teams and achieve extraordinary results.
            <span className="text-purple-400 font-semibold"> No setup fees</span>,
            <span className="text-blue-400 font-semibold"> cancel anytime</span>, and
            <span className="text-cyan-400 font-semibold"> money-back guarantee</span>.
          </motion.p>

          {/* Special Offer Banner */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-white text-sm font-bold mb-12"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Limited Time: Save up to $1000/month on AI automation!
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              custom={index}
              className={`relative bg-white/10 backdrop-blur-xl rounded-3xl border-2 transition-all duration-300 ${
                plan.popular
                  ? 'border-purple-500 shadow-2xl shadow-purple-500/25 scale-105'
                  : 'border-white/20 hover:border-purple-500/50'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className={`bg-gradient-to-r ${plan.color} px-6 py-2 rounded-full text-white text-sm font-bold flex items-center`}>
                    {plan.popular && <Crown className="w-4 h-4 mr-2" />}
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-300 mb-6">{plan.description}</p>

                  <div className="mb-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-3xl text-gray-400 line-through">${plan.originalPrice}</span>
                      <span className="text-5xl font-bold text-white">${plan.price}</span>
                      <span className="text-gray-300">/{plan.period}</span>
                    </div>
                    <div className="text-green-400 font-semibold mt-2">{plan.savings}</div>
                  </div>

                  <Button
                    size="lg"
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                        : 'bg-white/10 border border-white/30 text-white hover:bg-white hover:text-gray-900'
                    } font-semibold`}
                  >
                    {plan.popular ? (
                      <>
                        <Rocket className="w-5 h-5 mr-2" />
                        Start Free Trial
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-5 h-5 mr-2" />
                        Choose Plan
                      </>
                    )}
                  </Button>
                </div>

                {/* Key Features */}
                <div className="space-y-4 mb-8">
                  <div className="text-white font-semibold mb-4">What's Included:</div>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <Zap className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                      <span>AI Response: {plan.features.leadGeneration.responseTime}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Users className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                      <span>Contacts: {plan.features.clientManagement.contacts}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Globe className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Social Posts: {plan.features.marketing.socialPosts}/month</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <BarChart3 className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" />
                      <span>Dashboard: {plan.features.analytics.dashboard}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <HeadphonesIcon className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                      <span>Support: {plan.features.support.type}</span>
                    </div>
                  </div>
                </div>

                {/* Limits & Guarantees */}
                <div className="pt-6 border-t border-white/10">
                  <div className="text-sm text-gray-400 space-y-2">
                    <div>• {plan.limits.transactions} transactions/month</div>
                    <div>• {plan.limits.integrations} integrations</div>
                    <div>• {plan.limits.storage} storage</div>
                    <div>• {plan.guarantee}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Comparison Toggle */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <Button
              onClick={() => setShowComparison(!showComparison)}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white hover:text-gray-900"
            >
              {showComparison ? 'Hide' : 'Show'} Detailed Feature Comparison
              <BarChart3 className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Detailed Feature Comparison */}
        {showComparison && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Complete Feature Comparison</h3>

            {comparisonFeatures.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8">
                <h4 className="text-xl font-bold text-purple-300 mb-4">{category.category}</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-3 px-4 text-white font-semibold">Feature</th>
                        <th className="text-center py-3 px-4 text-white font-semibold">Starter</th>
                        <th className="text-center py-3 px-4 text-white font-semibold">Professional</th>
                        <th className="text-center py-3 px-4 text-white font-semibold">Elite</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={featureIndex} className="border-b border-white/10">
                          <td className="py-3 px-4 text-gray-300">{feature.name}</td>
                          <td className="py-3 px-4 text-center">{renderFeatureValue(feature.starter)}</td>
                          <td className="py-3 px-4 text-center">{renderFeatureValue(feature.professional)}</td>
                          <td className="py-3 px-4 text-center">{renderFeatureValue(feature.elite)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Add-ons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">
              Power-Up Your Plan
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Optional add-ons to supercharge your real estate marketing and operations.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-purple-500/30 transition-all"
              >
                <h4 className="text-lg font-bold text-white mb-3">{addon.name}</h4>
                <p className="text-gray-300 text-sm mb-4">{addon.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">${addon.price}</span>
                    <span className="text-gray-400 text-sm">/{addon.period}</span>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h3>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h4 className="text-lg font-bold text-white mb-3">{faq.question}</h4>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
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
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-6">
              Still Have Questions?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Our solo agent specialists are here to help you choose the perfect plan
              and get started with your AI transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                onClick={() => setIsLeadModalOpen(true)}
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" />
                Talk to Specialist
              </Button>
              <Button
                size="xl"
                variant="outline"
                onClick={() => setIsLeadModalOpen(true)}
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Live Chat Support
              </Button>
            </div>
            <div className="flex justify-center items-center space-x-8 mt-8 text-purple-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>7-Day Free Trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No Setup Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Cancel Anytime</span>
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