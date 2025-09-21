'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Youtube, ArrowRight, Heart, Zap } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const footerLinks = {
  product: [
    { name: 'Workflow Agents', href: '/products/workflow' },
    { name: 'Analytics Agents', href: '/products/analytics' },
    { name: 'Integration Hub', href: '/products/integrations' },
    { name: 'Communication Agents', href: '/products/communication' },
    { name: 'Security Agents', href: '/products/security' },
    { name: 'API Documentation', href: '/docs/api' },
    { name: 'Pricing', href: '/pricing' }
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press Kit', href: '/press' },
    { name: 'Contact', href: '/contact' },
    { name: 'Partners', href: '/partners' },
    { name: 'Investors', href: '/investors' }
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Webinars', href: '/webinars' },
    { name: 'Resource Library', href: '/resources' },
    { name: 'System Status', href: '/status' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Data Processing', href: '/data-processing' },
    { name: 'Security', href: '/security' },
    { name: 'Compliance', href: '/compliance' }
  ]
}

const socialLinks = [
  { 
    icon: Twitter, 
    href: 'https://twitter.com/empoweredagent', 
    label: 'Twitter',
    color: 'hover:text-blue-400'
  },
  { 
    icon: Linkedin, 
    href: 'https://linkedin.com/company/empoweredagent', 
    label: 'LinkedIn',
    color: 'hover:text-blue-600'
  },
  { 
    icon: Github, 
    href: 'https://github.com/empoweredagent', 
    label: 'GitHub',
    color: 'hover:text-gray-400'
  },
  { 
    icon: Youtube, 
    href: 'https://youtube.com/@empoweredagent', 
    label: 'YouTube',
    color: 'hover:text-red-500'
  }
]

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'support@empoweredagent.ai',
    href: 'mailto:support@empoweredagent.ai'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (480) 409-9900',
    href: 'tel:+14804099900'
  },
  {
    icon: MapPin,
    label: '7975 N Hayden Rd, Suite D-285, Scottsdale, AZ 85258',
    value: 'Scottsdale, AZ',
    href: 'https://maps.google.com/maps?q=San+Francisco,+CA'
  }
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5" />
      
      {/* Main Footer */}
      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Stay Ahead with AI Innovation
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get the latest insights on AI agents, automation strategies, and industry trends delivered to your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <Button 
                  type="submit"
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
              
              <p className="text-sm text-gray-400 mt-4">
                Join 25,000+ professionals already subscribed. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Main Links */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <Logo variant="white" size="lg" />
                <span className="text-2xl font-bold">EmpoweredAgent.ai</span>
              </Link>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Transforming businesses with intelligent AI agents that automate workflows, 
                analyze data, and integrate seamlessly with existing tools.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-colors"
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{item.value}</span>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-primary-400">Products</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-primary-400">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-primary-400">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-primary-400">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <span>© {currentYear} EmpoweredAgent.ai. All rights reserved.</span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center space-x-1">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>for the future of work</span>
                </span>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm mr-2">Follow us:</span>
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'text-gray-400 transition-colors p-2 rounded-lg hover:bg-gray-800',
                        social.color
                      )}
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-gray-800 text-center">
              <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
                <span className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-primary-400" />
                  <span>99.9% Uptime SLA</span>
                </span>
                <span>•</span>
                <span>SOC 2 Type II Certified</span>
                <span>•</span>
                <span>GDPR Compliant</span>
                <span>•</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}