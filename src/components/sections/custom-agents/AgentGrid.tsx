'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Brain,
  MessageSquare,
  FileText,
  BarChart3,
  ShoppingCart,
  Users,
  Shield,
  Workflow,
  Calendar,
  Database,
  Globe,
  Zap,
  TrendingUp,
  Bot,
  Heart,
  Building2,
  CreditCard,
  Phone,
  Mail,
  Search,
  Camera,
  Headphones,
  BookOpen,
  Code,
  Target,
  Settings
} from 'lucide-react'
import { AgentCard } from '@/components/ui/AgentCard'
import { realEstateAgents } from '@/data/realEstateAgents'

// Using imported real estate agents data

interface AgentGridProps {
  filters?: any
  viewMode?: 'grid' | 'list'
}

export function AgentGrid({ filters, viewMode = 'grid' }: AgentGridProps) {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([])

  // Filter and sort agents based on current filters
  const filteredAgents = useMemo(() => {
    if (!filters) return realEstateAgents

    let filtered = realEstateAgents.filter(agent => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          agent.name.toLowerCase().includes(searchLower) ||
          agent.description.toLowerCase().includes(searchLower) ||
          agent.category.toLowerCase().includes(searchLower) ||
          (agent.industry && agent.industry.toLowerCase().includes(searchLower)) ||
          agent.features.some(feature => feature.toLowerCase().includes(searchLower))

        if (!matchesSearch) return false
      }

      // Industry filter
      if (filters.industry && filters.industry !== 'All Industries') {
        if (!agent.industry || agent.industry !== filters.industry) return false
      }

      // Complexity filter
      if (filters.complexity && filters.complexity !== 'All Levels') {
        if (agent.complexity !== filters.complexity) return false
      }

      // Deployment time filter
      if (filters.deployment && filters.deployment !== 'Any Time') {
        if (agent.deploymentTime !== filters.deployment) return false
      }

      // Price filter
      if (filters.price && filters.price !== 'Any Price' && agent.pricing) {
        const setupCost = parseInt(agent.pricing.setup.replace(/[^0-9]/g, ''))
        switch (filters.price) {
          case 'Under $500':
            if (setupCost >= 500) return false
            break
          case '$500 - $1,500':
            if (setupCost < 500 || setupCost > 1500) return false
            break
          case '$1,500 - $5,000':
            if (setupCost < 1500 || setupCost > 5000) return false
            break
          case '$5,000+':
            if (setupCost < 5000) return false
            break
        }
      }

      return true
    })

    // Sort agents
    switch (filters.sort) {
      case 'newest':
        // For demo, we'll just reverse the array
        filtered = [...filtered].reverse()
        break
      case 'price-low':
        filtered = filtered.sort((a, b) => {
          const aPrice = a.pricing ? parseInt(a.pricing.setup.replace(/[^0-9]/g, '')) : 0
          const bPrice = b.pricing ? parseInt(b.pricing.setup.replace(/[^0-9]/g, '')) : 0
          return aPrice - bPrice
        })
        break
      case 'price-high':
        filtered = filtered.sort((a, b) => {
          const aPrice = a.pricing ? parseInt(a.pricing.setup.replace(/[^0-9]/g, '')) : 0
          const bPrice = b.pricing ? parseInt(b.pricing.setup.replace(/[^0-9]/g, '')) : 0
          return bPrice - aPrice
        })
        break
      case 'deployment':
        filtered = filtered.sort((a, b) => {
          const order = ['1-2 days', '3-5 days', '1-2 weeks', '2-3 weeks', '3-4 weeks', '4-5 weeks', '4-6 weeks', '5-7 weeks']
          return order.indexOf(a.deploymentTime) - order.indexOf(b.deploymentTime)
        })
        break
      default: // popular
        filtered = filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1
          if (!a.isFeatured && b.isFeatured) return 1
          if (a.isPopular && !b.isPopular) return -1
          if (!a.isPopular && b.isPopular) return 1
          return 0
        })
    }

    return filtered
  }, [filters])

  const handleAgentSelect = (agentName: string) => {
    setSelectedAgents(prev =>
      prev.includes(agentName)
        ? prev.filter(name => name !== agentName)
        : [...prev, agentName]
    )
  }

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

  if (filteredAgents.length === 0) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-dark-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Agents Found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try adjusting your filters to see more results, or contact us to build a custom solution.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Reset all filters
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-dark-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredAgents.length} Agent{filteredAgents.length !== 1 ? 's' : ''} Found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Ready-to-deploy AI solutions for real estate professionals
            </p>
          </div>

          {selectedAgents.length > 0 && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {selectedAgents.length} selected
              </span>
              <button className="text-primary-600 dark:text-primary-400 hover:underline text-sm">
                Compare Selected
              </button>
              <button
                onClick={() => setSelectedAgents([])}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>

        {/* Agents Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'
              : 'space-y-6'
          }
        >
          {filteredAgents.map((agent, index) => (
            <motion.div
              key={`${agent.name}-${index}`}
              variants={itemVariants}
            >
              <AgentCard
                {...agent}
                variant={viewMode === 'list' ? 'compact' : 'default'}
                onDemo={() => console.log(`Demo ${agent.name}`)}
                onClone={() => console.log(`Clone ${agent.name}`)}
                onContact={() => console.log(`Contact about ${agent.name}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}