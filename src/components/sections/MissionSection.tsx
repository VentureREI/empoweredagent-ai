'use client'

import { useState, useEffect } from 'react'
import { Target, Eye, Heart, Lightbulb, Shield, Globe } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const missionCards = [
  {
    icon: Target,
    title: 'Our Mission',
    subtitle: 'Empowering Every Business',
    description: 'To democratize artificial intelligence by creating intelligent agents that make advanced automation accessible to businesses of all sizes, enabling them to focus on what matters most: innovation and growth.',
    color: 'from-primary-500 to-purple-600',
    stats: ['2.5K+ businesses empowered', '85% average efficiency gain', '500+ integrations available']
  },
  {
    icon: Eye,
    title: 'Our Vision',
    subtitle: 'The Future of Work',
    description: 'A world where every business operates at peak efficiency through intelligent automation, where humans and AI agents collaborate seamlessly to solve complex challenges and unlock unprecedented potential.',
    color: 'from-blue-500 to-cyan-600',
    stats: ['Global AI adoption', 'Human-AI collaboration', 'Sustainable innovation']
  }
]

const principles = [
  {
    icon: Heart,
    title: 'Human-Centric AI',
    description: 'We believe AI should augment human capabilities, not replace them. Our agents are designed to handle repetitive tasks so humans can focus on creative and strategic work.',
    gradient: 'from-red-500 to-pink-500'
  },
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'Security and privacy are fundamental to everything we build. We implement enterprise-grade security measures and maintain transparent data practices.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Lightbulb,
    title: 'Continuous Innovation',
    description: 'We continuously push the boundaries of what\'s possible with AI, staying at the forefront of technological advancement while maintaining practical applicability.',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Globe,
    title: 'Global Accessibility',
    description: 'Advanced AI capabilities should be accessible to organizations worldwide, regardless of their size, location, or technical expertise.',
    gradient: 'from-indigo-500 to-purple-500'
  }
]

const impactMetrics = [
  {
    value: '1.2B+',
    label: 'Tasks Automated',
    description: 'Repetitive processes eliminated'
  },
  {
    value: '$2.3B',
    label: 'Cost Savings',
    description: 'Generated for our clients'
  },
  {
    value: '150M+',
    label: 'Hours Saved',
    description: 'Human time freed for innovation'
  },
  {
    value: '99.9%',
    label: 'Uptime',
    description: 'Reliable 24/7 operations'
  }
]

export function MissionSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('mission-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % missionCards.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="mission-section" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission & Vision Cards */}
        <div className={cn(
          'grid lg:grid-cols-2 gap-8 mb-20 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          {missionCards.map((card, index) => {
            const Icon = card.icon
            return (
              <Card
                key={index}
                className={cn(
                  'relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105',
                  activeCard === index ? 'ring-2 ring-primary-500 ring-offset-4' : ''
                )}
                onClick={() => setActiveCard(index)}
                hover="lift"
              >
                {/* Background gradient */}
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-5 transition-opacity duration-500',
                  card.color,
                  activeCard === index ? 'opacity-10' : ''
                )} />
                
                <div className="relative space-y-6">
                  {/* Icon and header */}
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'p-3 rounded-2xl bg-gradient-to-r text-white shadow-lg transition-transform duration-300',
                      card.color,
                      activeCard === index ? 'scale-110' : ''
                    )}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {card.title}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 font-semibold">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {card.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2">
                    {card.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary-500 rounded-full" />
                        <span className="text-gray-700 dark:text-gray-300">{stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Core Principles */}
        <div className={cn(
          'mb-20 transition-all duration-1000 delay-300',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Principles
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The fundamental beliefs that guide our approach to building AI solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {principles.map((principle, index) => {
              const Icon = principle.icon
              return (
                <Card
                  key={index}
                  className={cn(
                    'group transition-all duration-1000 hover:-translate-y-2',
                    `delay-[${400 + index * 150}ms]`
                  )}
                  hover="lift"
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'p-3 rounded-xl bg-gradient-to-r text-white shadow-md group-hover:scale-110 transition-transform duration-300',
                      principle.gradient
                    )}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {principle.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Impact Metrics */}
        <div className={cn(
          'text-center transition-all duration-1000 delay-600',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Global Impact
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Measurable results that demonstrate our commitment to transforming businesses worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactMetrics.map((metric, index) => (
              <div
                key={index}
                className={cn(
                  'group transition-all duration-1000',
                  `delay-[${700 + index * 100}ms]`
                )}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                  <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {metric.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {metric.label}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}