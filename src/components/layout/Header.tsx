'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X, Zap, Bot, Workflow, BarChart3, Settings, Users } from 'lucide-react'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'

const navigationItems = [
  {
    title: 'AI Solutions',
    items: [
      {
        title: 'AI Agents Demo',
        description: 'Try our AI assistants live - chat with real estate experts',
        href: '/agents',
        icon: Bot
      },
      {
        title: 'Custom AI Agents',
        description: 'Intelligent agents tailored to your specific business needs',
        href: '/solutions/custom-agents',
        icon: Bot
      },
      {
        title: 'Workflow Automation',
        description: 'End-to-end process automation that saves hours daily',
        href: '/solutions/workflow-automation',
        icon: Workflow
      },
      {
        title: 'Data Analytics AI',
        description: 'Advanced analytics and reporting with AI insights',
        href: '/solutions/data-analytics',
        icon: BarChart3
      },
      {
        title: 'Integration Services',
        description: 'Connect your existing tools with intelligent automation',
        href: '/solutions/integrations',
        icon: Settings
      }
    ]
  },
  {
    title: 'For Agents',
    items: [
      {
        title: 'Solo Agent',
        description: 'AI automation solutions for individual real estate agents',
        href: '/for-agents/solo-agent',
        icon: Users
      },
      {
        title: 'Real Estate Team',
        description: 'Collaborative AI tools for small to mid-size real estate teams',
        href: '/for-agents/real-estate-team',
        icon: Users
      },
      {
        title: 'Real Estate Brokerage',
        description: 'Enterprise AI solutions for large brokerages and franchises',
        href: '/for-agents/real-estate-brokerage',
        icon: Settings
      }
    ]
  },
  {
    title: 'Case Studies',
    href: '/case-studies'
  },
  {
    title: 'Pricing',
    href: '/pricing'
  }
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleModalSubmit = (formData: LeadFormData) => {
    console.log('Lead form submitted:', formData)
    // Close modal and redirect to calendar
    setIsModalOpen(false)
    // Redirect to calendar page (we'll create this next)
    window.location.href = '/calendar'
  }

  const handleDropdownEnter = (itemTitle: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(itemTitle)
  }

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150) // Small delay to allow moving to dropdown
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                  EmpoweredAgent.ai
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.title} className="relative">
                  {item.items ? (
                    <div
                      className="relative group"
                      onMouseEnter={() => handleDropdownEnter(item.title)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <button className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 font-medium transition-colors py-2">
                        <span>{item.title}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.title ? 'rotate-180' : ''
                        }`} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === item.title && (
                        <div className="absolute top-full left-0 pt-2">
                          <div className="w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 transform opacity-100 scale-100 transition-all duration-200">
                            <div className="grid gap-3">
                              {item.items.map((subItem) => {
                                const Icon = subItem.icon
                                return (
                                  <Link
                                    key={subItem.title}
                                    href={subItem.href}
                                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors group"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                      <Icon className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">
                                        {subItem.title}
                                      </h3>
                                      <p className="text-sm text-gray-600 mt-1">
                                        {subItem.description}
                                      </p>
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href || '/'}
                      className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/how-we-work"
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                How We Work
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 font-medium shadow-lg"
              >
                Book Demo
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.title}>
                    {item.items ? (
                      <div>
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                          className="flex items-center justify-between w-full text-left text-gray-700 font-medium py-2"
                        >
                          <span>{item.title}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.title ? 'rotate-180' : ''}`} />
                        </button>
                        {activeDropdown === item.title && (
                          <div className="pl-4 mt-2 space-y-3">
                            {item.items.map((subItem) => {
                              const Icon = subItem.icon
                              return (
                                <Link
                                  key={subItem.title}
                                  href={subItem.href}
                                  className="flex items-start space-x-3 py-2"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <Icon className="w-5 h-5 text-purple-600 mt-0.5" />
                                  <div>
                                    <h3 className="font-medium text-gray-900">{subItem.title}</h3>
                                    <p className="text-sm text-gray-600">{subItem.description}</p>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href || '/'}
                        className="block text-gray-700 font-medium py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Mobile CTA Buttons */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Link
                    href="/how-we-work"
                    className="block text-center text-purple-600 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    How We Work
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false)
                      setIsModalOpen(true)
                    }}
                    className="block w-full text-center bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg font-medium"
                  >
                    Book Demo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Lead Form Modal */}
      <LeadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </>
  )
}