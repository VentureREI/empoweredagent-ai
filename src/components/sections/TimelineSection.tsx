'use client'

import { useState, useEffect } from 'react'
import { Calendar, Users, Rocket, Award, Globe, Building } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineEvent {
  year: string
  quarter?: string
  title: string
  description: string
  icon: React.ElementType
  category: 'founding' | 'product' | 'funding' | 'milestone' | 'expansion'
  achievements?: string[]
  metrics?: {
    label: string
    value: string
  }[]
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '2019',
    quarter: 'Q1',
    title: 'Company Founded',
    description: 'EmpoweredAgent.ai was founded by Dr. Alex Thompson and Lisa Wang with a vision to democratize AI automation for businesses of all sizes.',
    icon: Building,
    category: 'founding',
    achievements: [
      'Incorporated in San Francisco',
      'Assembled founding team',
      'Initial product research',
      'Filed first patents'
    ]
  },
  {
    year: '2019',
    quarter: 'Q4',
    title: 'Seed Funding Round',
    description: 'Raised $5M in seed funding from leading VCs to accelerate product development and hire world-class AI talent.',
    icon: Rocket,
    category: 'funding',
    metrics: [
      { label: 'Funding Raised', value: '$5M' },
      { label: 'Team Size', value: '12' },
      { label: 'VCs Invested', value: '3' }
    ]
  },
  {
    year: '2020',
    quarter: 'Q2',
    title: 'First AI Agent Launch',
    description: 'Released our first Workflow Agent to a select group of beta customers, demonstrating 70% automation in document processing tasks.',
    icon: Award,
    category: 'product',
    achievements: [
      'Beta launch with 50 customers',
      '70% automation achieved',
      'First customer success stories',
      'Product-market fit validation'
    ]
  },
  {
    year: '2021',
    quarter: 'Q1',
    title: 'Series A Funding',
    description: 'Secured $15M Series A to scale our platform and expand our agent capabilities across analytics and integrations.',
    icon: Rocket,
    category: 'funding',
    metrics: [
      { label: 'Funding Raised', value: '$15M' },
      { label: 'Valuation', value: '$75M' },
      { label: 'Team Size', value: '45' }
    ]
  },
  {
    year: '2021',
    quarter: 'Q3',
    title: 'Platform Expansion',
    description: 'Launched Analytics and Integration Agents, reaching 500+ integrations and serving 250+ enterprise customers.',
    icon: Globe,
    category: 'product',
    achievements: [
      '500+ integrations launched',
      '250+ enterprise customers',
      '3 core agent types available',
      'Multi-tenant architecture'
    ]
  },
  {
    year: '2022',
    quarter: 'Q2',
    title: '1000+ Customer Milestone',
    description: 'Reached 1000+ active customers across 50+ countries, processing over 100M automated tasks monthly.',
    icon: Users,
    category: 'milestone',
    metrics: [
      { label: 'Active Customers', value: '1,000+' },
      { label: 'Countries Served', value: '50+' },
      { label: 'Monthly Tasks', value: '100M+' }
    ]
  },
  {
    year: '2023',
    quarter: 'Q1',
    title: 'Series B Funding',
    description: 'Raised $50M Series B led by top-tier VCs to accelerate global expansion and advanced AI research.',
    icon: Rocket,
    category: 'funding',
    metrics: [
      { label: 'Funding Raised', value: '$50M' },
      { label: 'Valuation', value: '$500M' },
      { label: 'Team Size', value: '150+' }
    ]
  },
  {
    year: '2023',
    quarter: 'Q4',
    title: 'AI Security Agent Launch',
    description: 'Introduced advanced Security and Communication Agents with next-generation AI capabilities powered by large language models.',
    icon: Award,
    category: 'product',
    achievements: [
      'LLM-powered agents',
      '99.8% threat detection rate',
      'Natural language processing',
      'Advanced security protocols'
    ]
  },
  {
    year: '2024',
    quarter: 'Q2',
    title: 'Global Expansion',
    description: 'Opened offices in London and Singapore, established partnerships with major cloud providers and system integrators.',
    icon: Globe,
    category: 'expansion',
    achievements: [
      'London & Singapore offices',
      'Cloud provider partnerships',
      'Enterprise channel program',
      'Global compliance certifications'
    ]
  },
  {
    year: '2024',
    quarter: 'Q4',
    title: '2500+ Enterprise Customers',
    description: 'Reached 2500+ enterprise customers with 85% average efficiency gains and $2.3B in total cost savings generated.',
    icon: Award,
    category: 'milestone',
    metrics: [
      { label: 'Enterprise Customers', value: '2,500+' },
      { label: 'Efficiency Gains', value: '85%' },
      { label: 'Cost Savings', value: '$2.3B' }
    ]
  }
]

const categoryColors = {
  founding: 'from-blue-500 to-cyan-500',
  product: 'from-green-500 to-emerald-500',
  funding: 'from-purple-500 to-pink-500',
  milestone: 'from-orange-500 to-red-500',
  expansion: 'from-indigo-500 to-purple-500'
}

export function TimelineSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleEvents, setVisibleEvents] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('timeline-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Stagger the visibility of timeline events
    timelineEvents.forEach((_, index) => {
      setTimeout(() => {
        setVisibleEvents(prev => [...prev, index])
      }, index * 200)
    })
  }, [isVisible])

  return (
    <section id="timeline-section" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={cn(
          'text-center mb-16 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Journey to{' '}
            <span className="gradient-text">Transform Business</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            From a startup vision to a global AI platform, discover the key milestones that shaped our mission to empower businesses with intelligent automation.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-300 to-primary-600 rounded-full" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon
              const isLeft = index % 2 === 0
              const isEventVisible = visibleEvents.includes(index)
              
              return (
                <div
                  key={index}
                  className={cn(
                    'relative flex items-center transition-all duration-800',
                    isLeft ? 'justify-start' : 'justify-end',
                    isEventVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className={cn(
                      'w-12 h-12 rounded-full bg-gradient-to-r flex items-center justify-center text-white shadow-lg transition-all duration-500',
                      categoryColors[event.category],
                      isEventVisible ? 'scale-100' : 'scale-0'
                    )}>
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Event card */}
                  <div className={cn(
                    'w-5/12 transition-all duration-700 delay-200',
                    isLeft ? 'mr-auto pr-8' : 'ml-auto pl-8',
                    isEventVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? '-translate-x-8' : 'translate-x-8'}`
                  )}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                      {/* Date and category */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
                          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                            {event.year} {event.quarter}
                          </span>
                        </div>
                        <span className={cn(
                          'px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r capitalize',
                          categoryColors[event.category]
                        )}>
                          {event.category}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        {event.description}
                      </p>

                      {/* Achievements */}
                      {event.achievements && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Key Achievements:
                          </h4>
                          <ul className="space-y-1">
                            {event.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Metrics */}
                      {event.metrics && (
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          {event.metrics.map((metric, idx) => (
                            <div key={idx} className="text-center">
                              <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                                {metric.value}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Future plans */}
        <div className={cn(
          'text-center mt-20 transition-all duration-1000 delay-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What's Next?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              We're just getting started. Our roadmap includes advanced AI reasoning capabilities, autonomous agent orchestration, and expanding into new industries and use cases.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {['Advanced AI Reasoning', 'Autonomous Orchestration', 'Industry Specialization', 'Global Scale'].map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-primary-200 dark:border-primary-700 text-gray-700 dark:text-gray-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}