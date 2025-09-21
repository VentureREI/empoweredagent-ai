'use client'

import { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Clock, MessageCircle, Video, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const offices = [
  {
    city: 'San Francisco',
    country: 'United States',
    address: '123 Innovation Drive, Suite 400',
    zipCode: 'San Francisco, CA 94105',
    phone: '+1 (555) 123-4567',
    email: 'sf@empoweredagent.ai',
    timezone: 'PST (UTC-8)',
    hours: '9:00 AM - 6:00 PM',
    isHeadquarters: true,
    mapUrl: 'https://maps.google.com/?q=San+Francisco,+CA',
    departments: ['Sales', 'Engineering', 'Support', 'Leadership']
  },
  {
    city: 'London',
    country: 'United Kingdom',
    address: '45 Finsbury Square',
    zipCode: 'London EC2A 1PX, UK',
    phone: '+44 20 7123 4567',
    email: 'london@empoweredagent.ai',
    timezone: 'GMT (UTC+0)',
    hours: '9:00 AM - 5:00 PM',
    isHeadquarters: false,
    mapUrl: 'https://maps.google.com/?q=London,+UK',
    departments: ['Sales', 'Customer Success', 'Partnerships']
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    address: '1 Marina Boulevard, Level 20',
    zipCode: 'Singapore 018989',
    phone: '+65 6123 4567',
    email: 'singapore@empoweredagent.ai',
    timezone: 'SGT (UTC+8)',
    hours: '9:00 AM - 6:00 PM',
    isHeadquarters: false,
    mapUrl: 'https://maps.google.com/?q=Singapore',
    departments: ['Sales', 'Customer Success', 'Regional Operations']
  }
]

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    action: 'Start Chat',
    href: '#',
    available: '24/7',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Video,
    title: 'Video Call',
    description: 'Schedule a video consultation with our experts',
    action: 'Book Call',
    href: '/demo',
    available: 'Business Hours',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Calendar,
    title: 'In-Person Meeting',
    description: 'Meet our team at one of our global offices',
    action: 'Schedule Visit',
    href: '#',
    available: 'By Appointment',
    color: 'from-purple-500 to-pink-500'
  }
]

const supportChannels = [
  {
    type: 'General Inquiries',
    email: 'hello@empoweredagent.ai',
    responseTime: '< 24 hours'
  },
  {
    type: 'Sales & Partnerships',
    email: 'sales@empoweredagent.ai',
    responseTime: '< 4 hours'
  },
  {
    type: 'Technical Support',
    email: 'support@empoweredagent.ai',
    responseTime: '< 2 hours'
  },
  {
    type: 'Media & Press',
    email: 'press@empoweredagent.ai',
    responseTime: '< 48 hours'
  }
]

export function ContactInfoSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedOffice, setSelectedOffice] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('contact-info')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact-info" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={cn(
          'text-center mb-16 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Multiple Ways to{' '}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the communication method that works best for you. Our global team is ready to help.
          </p>
        </div>

        {/* Contact Methods */}
        <div className={cn(
          'grid md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-200',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <Card
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300"
                hover="scale"
              >
                <div className="space-y-4">
                  <div className={cn(
                    'inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r text-white shadow-lg group-hover:scale-110 transition-transform duration-300',
                    method.color
                  )}>
                    <Icon size={24} />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {method.description}
                    </p>
                    <div className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-4">
                      Available: {method.available}
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <a href={method.href}>
                      {method.action}
                    </a>
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Global Offices */}
        <div className={cn(
          'transition-all duration-1000 delay-400',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Global Offices
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              With offices across three continents, we're always available to serve our global customer base.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Office selector for mobile */}
            <div className="lg:hidden">
              <div className="flex space-x-2 mb-6 overflow-x-auto">
                {offices.map((office, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedOffice(index)}
                    className={cn(
                      'px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors',
                      selectedOffice === index
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    )}
                  >
                    {office.city}
                  </button>
                ))}
              </div>
            </div>

            {/* Office cards */}
            {offices.map((office, index) => (
              <Card
                key={index}
                className={cn(
                  'relative transition-all duration-300 hover:scale-105',
                  // Show only selected office on mobile
                  'lg:block',
                  selectedOffice === index ? 'block' : 'hidden lg:block',
                  office.isHeadquarters ? 'ring-2 ring-primary-500 ring-offset-4' : ''
                )}
                hover="scale"
              >
                {office.isHeadquarters && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                      Headquarters
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Location */}
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {office.city}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {office.country}
                    </p>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={16} />
                      <div className="text-sm">
                        <div className="text-gray-900 dark:text-white">{office.address}</div>
                        <div className="text-gray-600 dark:text-gray-400">{office.zipCode}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="text-gray-400 flex-shrink-0" size={16} />
                      <a 
                        href={`tel:${office.phone}`}
                        className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        {office.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="text-gray-400 flex-shrink-0" size={16} />
                      <a 
                        href={`mailto:${office.email}`}
                        className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        {office.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="text-gray-400 flex-shrink-0" size={16} />
                      <div className="text-sm">
                        <div className="text-gray-900 dark:text-white">{office.hours}</div>
                        <div className="text-gray-600 dark:text-gray-400">{office.timezone}</div>
                      </div>
                    </div>
                  </div>

                  {/* Departments */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Departments:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {office.departments.map((dept, deptIndex) => (
                        <span
                          key={deptIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                        >
                          {dept}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View on map button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <a href={office.mapUrl} target="_blank" rel="noopener noreferrer">
                      View on Map
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Email Support Channels */}
        <div className={cn(
          'mt-20 transition-all duration-1000 delay-600',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Direct Email Support
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Reach out directly to the right team for faster, more targeted assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <Card
                key={index}
                className="text-center hover:scale-105 transition-all duration-300"
                hover="scale"
              >
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {channel.type}
                  </h4>
                  <a
                    href={`mailto:${channel.email}`}
                    className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                  >
                    {channel.email}
                  </a>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Response: {channel.responseTime}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Support */}
        <div className={cn(
          'mt-16 text-center transition-all duration-1000 delay-800',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 max-w-2xl mx-auto">
            <div className="text-center space-y-4">
              <h4 className="text-lg font-bold text-red-900 dark:text-red-300">
                Emergency Support
              </h4>
              <p className="text-red-800 dark:text-red-400">
                For critical system outages affecting production environments
              </p>
              <div className="space-y-2">
                <div className="font-semibold text-red-900 dark:text-red-300">
                  📞 +1 (555) 911-HELP
                </div>
                <div className="text-sm text-red-700 dark:text-red-400">
                  Available 24/7 for Enterprise customers
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}