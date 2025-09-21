'use client'

import { useState, useEffect } from 'react'
import { Zap, BarChart3, Link, MessageSquare, Shield, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const agentCategories = [
  {
    icon: Zap,
    name: 'Automation',
    count: '12',
    description: 'Workflow and process automation'
  },
  {
    icon: BarChart3,
    name: 'Analytics',
    count: '8',
    description: 'Data analysis and insights'
  },
  {
    icon: Link,
    name: 'Integration',
    count: '15',
    description: 'System connectivity and sync'
  },
  {
    icon: MessageSquare,
    name: 'Communication',
    count: '6',
    description: 'Customer interaction and support'
  },
  {
    icon: Shield,
    name: 'Security',
    count: '9',
    description: 'Threat detection and compliance'
  },
  {
    icon: Users,
    name: 'Productivity',
    count: '11',
    description: 'Team efficiency and collaboration'
  }
]

const platformStats = [
  { label: 'Active Agents', value: '61+', description: 'Ready-to-deploy AI agents' },
  { label: 'Integrations', value: '500+', description: 'Pre-built connectors' },
  { label: 'Use Cases', value: '1000+', description: 'Proven automation scenarios' },
  { label: 'Uptime', value: '99.9%', description: 'Enterprise reliability' }
]

export function ProductsHeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    // Auto-cycle through categories
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % agentCategories.length)
    }, 3000)

    return () => clearInterval(interval)
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
          {/* Header */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Comprehensive AI{' '}
              <span className="gradient-text">Agent Platform</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Discover our complete suite of specialized AI agents designed to automate every aspect of your business operations. From simple tasks to complex workflows, we have the right agent for your needs.
            </p>
          </div>

          {/* Agent categories showcase */}
          <div className={cn(
            'transition-all duration-1000 delay-300',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {agentCategories.map((category, index) => {
                const Icon = category.icon
                const isActive = activeCategory === index
                
                return (
                  <div
                    key={index}
                    className={cn(
                      'relative group cursor-pointer transition-all duration-500',
                      isActive ? 'scale-110' : 'hover:scale-105'
                    )}
                    onClick={() => setActiveCategory(index)}
                  >
                    <div className={cn(
                      'bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all duration-500 shadow-lg',
                      isActive 
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-primary-lg' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                    )}>
                      <div className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center mb-3 mx-auto transition-all duration-300',
                        isActive 
                          ? 'bg-primary-600 text-white scale-110' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600'
                      )}>
                        <Icon size={20} />
                      </div>
                      
                      <div className="text-center">
                        <div className={cn(
                          'font-bold text-lg mb-1 transition-colors',
                          isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'
                        )}>
                          {category.count}
                        </div>
                        <div className={cn(
                          'font-semibold text-sm mb-1 transition-colors',
                          isActive ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-white'
                        )}>
                          {category.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {category.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Platform stats */}
          <div className={cn(
            'grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            {platformStats.map((stat, index) => (
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

          {/* CTA buttons */}
          <div className={cn(
            'flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            <Button size="xl" asChild>
              <a href="#products-grid">Explore All Agents</a>
            </Button>
            <Button variant="secondary" size="xl" asChild>
              <a href="/demo">See Them in Action</a>
            </Button>
          </div>

          {/* Value proposition */}
          <div className={cn(
            'max-w-4xl mx-auto transition-all duration-1000 delay-900',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No-Code Setup
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Deploy agents without technical expertise
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Enterprise Ready
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Built for scale, security, and compliance
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Continuous Learning
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Agents improve performance over time
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}