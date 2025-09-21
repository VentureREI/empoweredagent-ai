'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Play, Star, CheckCircle, Zap, BarChart3, Link, MessageSquare, Shield, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const detailedAgents = [
  {
    id: 'workflow-agent',
    name: 'Workflow Agent',
    category: 'automation',
    icon: '🔄',
    tagline: 'Automate Complex Business Processes',
    description: 'Transform your business operations with intelligent workflow automation that handles complex multi-step processes, conditional logic, and decision-making.',
    longDescription: 'Our Workflow Agent is designed to handle the most complex business processes with ease. It can orchestrate multi-step workflows across different systems, make intelligent decisions based on predefined rules, and adapt to changing business conditions.',
    keyFeatures: [
      'Visual workflow builder with drag-and-drop interface',
      'Advanced conditional logic and branching',
      'Multi-system orchestration and coordination',
      'Real-time monitoring and error handling',
      'Custom approval workflows and escalations',
      'Automated data validation and quality checks'
    ],
    useCases: [
      'Customer onboarding automation',
      'Invoice processing and approval',
      'Lead qualification and routing',
      'Employee offboarding processes',
      'Compliance workflow management',
      'Order fulfillment optimization'
    ],
    metrics: {
      efficiency: '85% efficiency gain',
      timeReduction: '70% faster processing',
      errorReduction: '95% fewer errors'
    },
    pricing: { starter: 99, professional: 299, enterprise: 'Custom' },
    rating: 4.8,
    reviewCount: 234,
    demoUrl: '/demo/workflow',
    popular: true
  },
  {
    id: 'analytics-agent',
    name: 'Analytics Agent',
    category: 'analytics',
    icon: '📊',
    tagline: 'Transform Data into Actionable Insights',
    description: 'Unlock the power of your data with AI-driven analytics that provide real-time insights, predictive modeling, and automated reporting.',
    longDescription: 'The Analytics Agent leverages advanced machine learning algorithms to analyze your business data and provide actionable insights. It can identify trends, predict outcomes, and generate comprehensive reports automatically.',
    keyFeatures: [
      'Automated data collection and processing',
      'Advanced predictive analytics and forecasting',
      'Custom dashboard creation and visualization',
      'Natural language query interface',
      'Anomaly detection and alerting',
      'Automated report generation and distribution'
    ],
    useCases: [
      'Sales performance analysis and forecasting',
      'Customer behavior pattern recognition',
      'Financial risk assessment and monitoring',
      'Marketing campaign optimization',
      'Operational efficiency analysis',
      'Predictive maintenance scheduling'
    ],
    metrics: {
      efficiency: '90% faster insights',
      accuracy: '94% prediction accuracy',
      coverage: '100% data visibility'
    },
    pricing: { starter: 149, professional: 399, enterprise: 'Custom' },
    rating: 4.9,
    reviewCount: 189,
    demoUrl: '/demo/analytics',
    popular: false
  },
  {
    id: 'integration-agent',
    name: 'Integration Agent',
    category: 'integration',
    icon: '🔗',
    tagline: 'Seamlessly Connect Your Digital Ecosystem',
    description: 'Bridge the gap between your systems with intelligent integrations that ensure data flows seamlessly across your entire technology stack.',
    longDescription: 'Our Integration Agent specializes in connecting disparate systems and ensuring smooth data flow across your organization. It handles complex data transformations, maintains data integrity, and provides real-time synchronization.',
    keyFeatures: [
      '500+ pre-built system connectors',
      'Real-time bidirectional data synchronization',
      'Custom API integration capabilities',
      'Data transformation and mapping tools',
      'Error handling and retry mechanisms',
      'Comprehensive audit logging and monitoring'
    ],
    useCases: [
      'CRM and marketing automation sync',
      'E-commerce platform integration',
      'Financial system consolidation',
      'HR and payroll system unification',
      'Customer support tool integration',
      'Business intelligence data aggregation'
    ],
    metrics: {
      efficiency: '95% manual work reduction',
      reliability: '99.9% uptime',
      speed: '10x faster implementation'
    },
    pricing: { starter: 199, professional: 499, enterprise: 'Custom' },
    rating: 4.7,
    reviewCount: 156,
    demoUrl: '/demo/integration',
    popular: true
  },
  {
    id: 'communication-agent',
    name: 'Communication Agent',
    category: 'communication',
    icon: '💬',
    tagline: 'Intelligent Customer Interaction Management',
    description: 'Enhance customer experiences with AI-powered communication that provides 24/7 support, personalized interactions, and seamless escalation.',
    longDescription: 'The Communication Agent revolutionizes customer interaction by providing intelligent, context-aware responses across multiple channels. It learns from interactions and continuously improves its performance.',
    keyFeatures: [
      'Multi-channel communication support',
      'Natural language understanding and generation',
      'Sentiment analysis and emotional intelligence',
      'Automated escalation and handoff protocols',
      'Personalized interaction history tracking',
      'Real-time language translation capabilities'
    ],
    useCases: [
      '24/7 customer support automation',
      'Lead qualification and nurturing',
      'Appointment scheduling and management',
      'Customer feedback collection and analysis',
      'Technical support and troubleshooting',
      'Sales inquiry processing and routing'
    ],
    metrics: {
      availability: '24/7 support coverage',
      satisfaction: '92% customer satisfaction',
      resolution: '78% first-contact resolution'
    },
    pricing: { starter: 79, professional: 249, enterprise: 'Custom' },
    rating: 4.6,
    reviewCount: 278,
    demoUrl: '/demo/communication',
    popular: false
  },
  {
    id: 'security-agent',
    name: 'Security Agent',
    category: 'security',
    icon: '🛡️',
    tagline: 'Proactive Threat Detection and Response',
    description: 'Protect your business with advanced AI security that monitors, detects, and responds to threats in real-time while maintaining compliance.',
    longDescription: 'Our Security Agent provides comprehensive protection for your digital assets. It uses advanced machine learning to identify potential threats, automate responses, and ensure compliance with industry regulations.',
    keyFeatures: [
      'Real-time threat monitoring and detection',
      'Automated incident response and remediation',
      'Compliance monitoring and reporting',
      'User behavior analytics and anomaly detection',
      'Vulnerability assessment and management',
      'Security policy enforcement and auditing'
    ],
    useCases: [
      'Fraud detection and prevention',
      'Access control and identity management',
      'Data protection and privacy compliance',
      'Network security monitoring',
      'Security incident response automation',
      'Regulatory compliance tracking'
    ],
    metrics: {
      detection: '99.8% threat detection rate',
      response: '< 5 minute response time',
      compliance: '100% regulatory compliance'
    },
    pricing: { starter: 249, professional: 599, enterprise: 'Custom' },
    rating: 4.9,
    reviewCount: 142,
    demoUrl: '/demo/security',
    popular: false
  },
  {
    id: 'productivity-agent',
    name: 'Productivity Agent',
    category: 'productivity',
    icon: '⚡',
    tagline: 'Supercharge Team Efficiency and Collaboration',
    description: 'Boost your team\'s productivity with intelligent task management, resource optimization, and automated routine operations.',
    longDescription: 'The Productivity Agent focuses on optimizing team performance by automating routine tasks, optimizing resource allocation, and providing intelligent recommendations for improved efficiency.',
    keyFeatures: [
      'Intelligent task prioritization and scheduling',
      'Resource allocation optimization',
      'Automated meeting coordination and management',
      'Performance tracking and analytics',
      'Smart notification and reminder systems',
      'Collaboration workflow optimization'
    ],
    useCases: [
      'Project management and coordination',
      'Resource planning and allocation',
      'Meeting scheduling and optimization',
      'Time tracking and productivity analysis',
      'Team collaboration enhancement',
      'Deadline management and alerts'
    ],
    metrics: {
      productivity: '70% productivity increase',
      timesSaved: '25 hours/week saved',
      efficiency: '60% task completion improvement'
    },
    pricing: { starter: 119, professional: 329, enterprise: 'Custom' },
    rating: 4.5,
    reviewCount: 201,
    demoUrl: '/demo/productivity',
    popular: false
  }
]

const categoryIcons = {
  automation: Zap,
  analytics: BarChart3,
  integration: Link,
  communication: MessageSquare,
  security: Shield,
  productivity: Users,
}

const categories = [
  { id: 'all', name: 'All Agents', count: detailedAgents.length },
  { id: 'automation', name: 'Automation', count: detailedAgents.filter(a => a.category === 'automation').length },
  { id: 'analytics', name: 'Analytics', count: detailedAgents.filter(a => a.category === 'analytics').length },
  { id: 'integration', name: 'Integration', count: detailedAgents.filter(a => a.category === 'integration').length },
  { id: 'communication', name: 'Communication', count: detailedAgents.filter(a => a.category === 'communication').length },
  { id: 'security', name: 'Security', count: detailedAgents.filter(a => a.category === 'security').length },
  { id: 'productivity', name: 'Productivity', count: detailedAgents.filter(a => a.category === 'productivity').length },
]

export function ProductsGridSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('products-grid')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const filteredAgents = activeCategory === 'all' 
    ? detailedAgents 
    : detailedAgents.filter(agent => agent.category === activeCategory)

  return (
    <section id="products-grid" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={cn(
          'text-center mb-16 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose the Right{' '}
            <span className="gradient-text">AI Agent</span>{' '}
            for Your Needs
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Each agent is specifically designed to excel in its domain, providing specialized capabilities and optimized performance for your unique requirements.
          </p>
        </div>

        {/* Category filters */}
        <div className={cn(
          'flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'px-6 py-3 rounded-full font-medium transition-all duration-200',
                activeCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredAgents.map((agent, index) => {
            const CategoryIcon = categoryIcons[agent.category as keyof typeof categoryIcons]
            const isExpanded = expandedAgent === agent.id
            
            return (
              <Card
                key={agent.id}
                className={cn(
                  'relative group transition-all duration-500 hover:scale-102',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                  `delay-[${300 + index * 100}ms]`,
                  isExpanded ? 'lg:col-span-2 ring-2 ring-primary-500 ring-offset-4' : '',
                  agent.popular ? 'border-primary-200 dark:border-primary-800' : ''
                )}
                hover="lift"
              >
                {agent.popular && (
                  <div className="absolute -top-3 left-6">
                    <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{agent.icon}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CategoryIcon size={16} className="text-primary-600 dark:text-primary-400" />
                          <span className="text-sm font-medium text-primary-600 dark:text-primary-400 capitalize">
                            {agent.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {agent.name}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400 font-semibold">
                          {agent.tagline}
                        </p>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="text-yellow-400 fill-current" size={16} />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {agent.rating}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {agent.reviewCount} reviews
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {isExpanded ? agent.longDescription : agent.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    {Object.entries(agent.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-bold text-primary-600 dark:text-primary-400 text-sm">
                          {value}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="space-y-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Key features */}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Key Features
                          </h4>
                          <ul className="space-y-2">
                            {agent.keyFeatures.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Use cases */}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Common Use Cases
                          </h4>
                          <ul className="space-y-2">
                            {agent.useCases.map((useCase, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <ArrowRight size={16} className="text-primary-500 mt-0.5 flex-shrink-0" />
                                {useCase}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Pricing Plans
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              ${agent.pricing.starter}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Starter
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              ${agent.pricing.professional}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Professional
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {agent.pricing.enterprise}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Enterprise
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
                      variant="secondary"
                      className="flex-1"
                    >
                      {isExpanded ? 'Show Less' : 'Learn More'}
                    </Button>
                    <Button
                      className="flex-1"
                      asChild
                    >
                      <a href={agent.demoUrl}>
                        <Play size={16} className="mr-2" />
                        Try Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className={cn(
          'text-center mt-16 transition-all duration-1000 delay-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <Card className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border-primary-200 dark:border-primary-800">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Start your free trial today and experience the power of AI automation for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" asChild>
                  <a href="/signup">Start Free Trial</a>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <a href="/contact">Talk to an Expert</a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}