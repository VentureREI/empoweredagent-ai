'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Target, Users, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

const stats = [
  { value: '2019', label: 'Founded', description: 'Started with a vision to democratize AI' },
  { value: '150+', label: 'Team Members', description: 'AI researchers, engineers, and innovators' },
  { value: '2.5K+', label: 'Enterprise Clients', description: 'Fortune 500 companies worldwide' },
  { value: '$50M', label: 'Series B Funding', description: 'Backed by leading VCs and strategic investors' }
]

const coreValues = [
  {
    icon: Sparkles,
    title: 'Innovation First',
    description: 'We push the boundaries of what\'s possible with AI technology'
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'Every solution we build delivers measurable business impact'
  },
  {
    icon: Users,
    title: 'Human-Centric',
    description: 'AI should augment human capabilities, not replace them'
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'Building solutions that transform businesses worldwide'
  }
]

export function AboutHeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-gray-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
        <div className="absolute inset-0 grid-pattern opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className={cn(
          'text-center space-y-12 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-sm font-medium">
            <Sparkles size={16} />
            <span>Building the Future of Work</span>
          </div>

          {/* Headline */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              We're on a Mission to{' '}
              <span className="gradient-text">Transform Business</span>{' '}
              with AI
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              EmpoweredAgent.ai was founded on the belief that artificial intelligence should empower every business to achieve extraordinary results. We're building the most advanced AI agent platform to automate, analyze, and optimize operations at scale.
            </p>
          </div>

          {/* Stats */}
          <div className={cn(
            'grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto transition-all duration-1000 delay-300',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core values */}
        <div className={cn(
          'mt-24 transition-all duration-1000 delay-500',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do and drive our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className={cn(
                    'text-center p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group',
                    `delay-[${600 + index * 100}ms]`
                  )}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-primary-600 dark:text-primary-400" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}