'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Star, ExternalLink, CheckCircle, Filter, Zap, ArrowRight, Users, Calendar, Mail, Database, Shield, BarChart3, MessageSquare, FileText, DollarSign, Settings } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const integrationCategories = [
  { id: 'all', name: 'All Integrations', count: 500, icon: Settings },
  { id: 'crm', name: 'CRM & Sales', count: 45, icon: Users },
  { id: 'productivity', name: 'Productivity', count: 67, icon: Calendar },
  { id: 'communication', name: 'Communication', count: 38, icon: MessageSquare },
  { id: 'marketing', name: 'Marketing', count: 52, icon: Mail },
  { id: 'finance', name: 'Finance', count: 41, icon: DollarSign },
  { id: 'analytics', name: 'Analytics', count: 46, icon: BarChart3 },
  { id: 'security', name: 'Security', count: 23, icon: Shield },
  { id: 'database', name: 'Databases', count: 35, icon: Database },
  { id: 'files', name: 'File Storage', count: 28, icon: FileText }
]

const featuredIntegrations = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'crm',
    description: 'Complete CRM integration with real-time data sync and automated workflows',
    logo: '/logos/salesforce.svg',
    popular: true,
    complexity: 'easy',
    features: ['Lead automation', 'Opportunity tracking', 'Custom fields sync', 'Report generation'],
    setupTime: '15 minutes',
    rating: 4.9,
    installations: '12,000+',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'crm',
    description: 'Marketing automation and CRM integration for complete customer lifecycle management',
    logo: '/logos/hubspot.svg',
    popular: true,
    complexity: 'easy',
    features: ['Contact management', 'Email automation', 'Pipeline tracking', 'Analytics sync'],
    setupTime: '10 minutes',
    rating: 4.8,
    installations: '8,500+',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'communication',
    description: 'Team communication and workflow automation with intelligent bot interactions',
    logo: '/logos/slack.svg',
    popular: true,
    complexity: 'easy',
    features: ['Message automation', 'Channel management', 'File sharing', 'Team notifications'],
    setupTime: '5 minutes',
    rating: 4.9,
    installations: '15,000+',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    category: 'productivity',
    description: 'Seamless integration with Gmail, Drive, Calendar, and all Google productivity tools',
    logo: '/logos/google.svg',
    popular: true,
    complexity: 'medium',
    features: ['Email automation', 'Calendar sync', 'Document processing', 'Drive management'],
    setupTime: '20 minutes',
    rating: 4.7,
    installations: '20,000+',
    gradient: 'from-green-500 to-green-600'
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    category: 'productivity',
    description: 'Full integration with Office suite, Teams, and Azure services',
    logo: '/logos/microsoft.svg',
    popular: true,
    complexity: 'medium',
    features: ['Office automation', 'Teams integration', 'OneDrive sync', 'Power BI reports'],
    setupTime: '25 minutes',
    rating: 4.6,
    installations: '18,000+',
    gradient: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'ecommerce',
    description: 'E-commerce automation for inventory, orders, and customer management',
    logo: '/logos/shopify.svg',
    popular: false,
    complexity: 'easy',
    features: ['Order automation', 'Inventory sync', 'Customer support', 'Analytics tracking'],
    setupTime: '15 minutes',
    rating: 4.8,
    installations: '5,500+',
    gradient: 'from-green-600 to-emerald-600'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'finance',
    description: 'Payment processing automation and financial data synchronization',
    logo: '/logos/stripe.svg',
    popular: false,
    complexity: 'medium',
    features: ['Payment automation', 'Invoice generation', 'Revenue tracking', 'Subscription management'],
    setupTime: '30 minutes',
    rating: 4.7,
    installations: '7,200+',
    gradient: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    category: 'communication',
    description: 'Customer support automation with intelligent ticket routing and responses',
    logo: '/logos/zendesk.svg',
    popular: false,
    complexity: 'easy',
    features: ['Ticket automation', 'Customer routing', 'Response templates', 'Analytics'],
    setupTime: '20 minutes',
    rating: 4.6,
    installations: '6,800+',
    gradient: 'from-teal-500 to-teal-600'
  }
]

const allIntegrations = [
  ...featuredIntegrations,
  // Add more integrations for different categories
  {
    id: 'airtable',
    name: 'Airtable',
    category: 'database',
    description: 'Database automation and workflow management',
    logo: '/logos/airtable.svg',
    complexity: 'easy',
    setupTime: '10 minutes',
    rating: 4.5,
    installations: '3,200+',
    gradient: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'productivity',
    description: 'Workspace automation and content management',
    logo: '/logos/notion.svg',
    complexity: 'medium',
    setupTime: '25 minutes',
    rating: 4.4,
    installations: '4,100+',
    gradient: 'from-gray-600 to-gray-700'
  }
]

export function IntegrationsSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredIntegrations, setFilteredIntegrations] = useState(allIntegrations)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    let filtered = allIntegrations

    if (activeCategory !== 'all') {
      filtered = filtered.filter(integration => integration.category === activeCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(integration =>
        integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredIntegrations(filtered)
  }, [activeCategory, searchQuery])

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
        duration: 0.6
      }
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <section ref={ref} className="py-24 bg-gray-50 dark:bg-dark-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary-100 dark:bg-primary-900 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-accent-100 dark:bg-accent-900 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Connect with <span className="text-gradient">500+ Tools</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Seamlessly integrate with your existing tools and platforms. Our AI agents work 
            with the software you already use, enhancing your current workflow.
          </motion.p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-12"
        >
          {/* Search Bar */}
          <motion.div variants={itemVariants} className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            {integrationCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300',
                    activeCategory === category.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white dark:bg-dark-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-700 border border-gray-200 dark:border-gray-700'
                  )}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm">{category.name}</span>
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded-full',
                    activeCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  )}>
                    {category.count}
                  </span>
                </button>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Featured Integrations */}
        {activeCategory === 'all' && (
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="mb-16"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8"
            >
              Most Popular Integrations
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredIntegrations.filter(i => i.popular).slice(0, 6).map((integration) => (
                <motion.div key={integration.id} variants={itemVariants}>
                  <Card variant="default" hover="glow" className="p-6 h-full relative overflow-hidden group">
                    {/* Popular Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Popular
                    </div>

                    {/* Logo and Header */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${integration.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold text-lg">
                          {integration.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {integration.name}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 ml-1">
                              {integration.rating}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {integration.installations} installs
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      {integration.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {integration.features?.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                        {integration.features && integration.features.length > 3 && (
                          <span className="text-xs text-primary-600 dark:text-primary-400 px-2 py-1">
                            +{integration.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500 dark:text-gray-400">Setup:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {integration.setupTime}
                        </span>
                      </div>
                      <div className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        getComplexityColor(integration.complexity)
                      )}>
                        {integration.complexity}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        Connect
                        <Zap className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Integrations Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {activeCategory === 'all' ? 'All Integrations' : 
               integrationCategories.find(c => c.id === activeCategory)?.name} 
              <span className="text-lg font-normal text-gray-500 dark:text-gray-400 ml-2">
                ({filteredIntegrations.length} found)
              </span>
            </h3>
            
            {filteredIntegrations.length === 0 && (
              <Button
                variant="ghost"
                onClick={() => { setSearchQuery(''); setActiveCategory('all') }}
              >
                Clear Filters
              </Button>
            )}
          </motion.div>

          {filteredIntegrations.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No integrations found
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => { setSearchQuery(''); setActiveCategory('all') }}
              >
                View All Integrations
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredIntegrations.map((integration) => (
                <motion.div key={integration.id} variants={itemVariants}>
                  <Card variant="default" hover="lift" className="p-4 h-full group">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${integration.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-semibold">
                          {integration.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                          {integration.name}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                          {integration.rating}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                      {integration.description}
                    </p>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">
                        {integration.setupTime}
                      </span>
                      <span className={cn(
                        'px-2 py-1 rounded text-xs font-medium',
                        getComplexityColor(integration.complexity)
                      )}>
                        {integration.complexity}
                      </span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-hero-pattern opacity-10" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Need a Custom Integration?
              </h3>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Don't see your tool? Our team can build custom integrations for any API 
                or create specialized connectors for your unique requirements.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Request Integration
                </Button>
                
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white border-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold"
                >
                  View API Docs
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}