'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Calendar, Handshake, HelpCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const contactTypes = [
  {
    icon: MessageSquare,
    title: 'General Inquiry',
    description: 'Questions about our platform, pricing, or capabilities',
    href: '#contact-form',
    color: 'from-blue-500 to-cyan-500',
    popular: false
  },
  {
    icon: Calendar,
    title: 'Book a Demo',
    description: 'See our AI agents in action with a personalized demonstration',
    href: '/demo',
    color: 'from-green-500 to-emerald-500',
    popular: true
  },
  {
    icon: Handshake,
    title: 'Partnership',
    description: 'Explore integration, reseller, or strategic partnership opportunities',
    href: '#contact-form',
    color: 'from-purple-500 to-pink-500',
    popular: false
  },
  {
    icon: HelpCircle,
    title: 'Support',
    description: 'Technical support for existing customers and implementation help',
    href: '/support',
    color: 'from-orange-500 to-red-500',
    popular: false
  }
]

const responsePromise = [
  { time: '< 1 hour', type: 'Demo requests' },
  { time: '< 4 hours', type: 'Partnership inquiries' },
  { time: '< 24 hours', type: 'General questions' },
  { time: 'Immediate', type: 'Existing customers' }
]

export function ContactHeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-gray-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
        <div className="absolute inset-0 dot-pattern opacity-10" />
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
              Let's Build the Future{' '}
              <span className="gradient-text">Together</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Ready to transform your business with AI agents? Our team of experts is here to help you get started, answer questions, or explore partnership opportunities.
            </p>
          </div>

          {/* Contact type cards */}
          <div className={cn(
            'grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto transition-all duration-1000 delay-300',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            {contactTypes.map((type, index) => {
              const Icon = type.icon
              return (
                <Card
                  key={index}
                  className={cn(
                    'relative group cursor-pointer transition-all duration-300 hover:scale-105',
                    type.popular ? 'ring-2 ring-primary-500 ring-offset-4' : ''
                  )}
                  hover="scale"
                >
                  {type.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center space-y-4">
                    <div className={cn(
                      'inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r text-white shadow-lg group-hover:scale-110 transition-transform duration-300',
                      type.color
                    )}>
                      <Icon size={24} />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {type.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {type.description}
                      </p>
                    </div>

                    <Button
                      variant={type.popular ? 'default' : 'secondary'}
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <a href={type.href}>
                        {type.title === 'Book a Demo' ? 'Schedule Now' : 'Get Started'}
                        <ArrowRight size={16} className="ml-2" />
                      </a>
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Response time promise */}
          <div className={cn(
            'transition-all duration-1000 delay-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Our Response Time Promise
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {responsePromise.map((promise, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                      {promise.time}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {promise.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className={cn(
            'grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-1000 delay-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">150+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Expert Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Countries Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}