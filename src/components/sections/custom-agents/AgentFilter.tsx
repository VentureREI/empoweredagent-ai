'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Filter,
  Search,
  Grid,
  List,
  SlidersHorizontal,
  Building2,
  Users,
  DollarSign,
  Clock,
  Star,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const industries = [
  'All Industries',
  'Healthcare',
  'Finance',
  'E-commerce',
  'Real Estate',
  'Manufacturing',
  'Education',
  'Legal',
  'Marketing',
  'HR',
  'IT Services'
]

const complexityLevels = [
  'All Levels',
  'Simple',
  'Medium',
  'Advanced'
]

const deploymentTimes = [
  'Any Time',
  '1-2 days',
  '3-5 days',
  '1-2 weeks',
  '2+ weeks'
]

const priceRanges = [
  'Any Price',
  'Under $500',
  '$500 - $1,500',
  '$1,500 - $5,000',
  '$5,000+'
]

const sortOptions = [
  { value: 'popular', label: 'Most Popular', icon: Star },
  { value: 'newest', label: 'Newest First', icon: TrendingUp },
  { value: 'price-low', label: 'Price: Low to High', icon: DollarSign },
  { value: 'price-high', label: 'Price: High to Low', icon: DollarSign },
  { value: 'deployment', label: 'Fastest Deployment', icon: Clock }
]

interface AgentFilterProps {
  onFilterChange?: (filters: any) => void
  onViewChange?: (view: 'grid' | 'list') => void
}

export function AgentFilter({ onFilterChange, onViewChange }: AgentFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState({
    search: '',
    industry: 'All Industries',
    complexity: 'All Levels',
    deployment: 'Any Time',
    price: 'Any Price',
    sort: 'popular'
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleViewChange = (view: 'grid' | 'list') => {
    setCurrentView(view)
    onViewChange?.(view)
  }

  const clearFilters = () => {
    const defaultFilters = {
      search: '',
      industry: 'All Industries',
      complexity: 'All Levels',
      deployment: 'Any Time',
      price: 'Any Price',
      sort: 'popular'
    }
    setFilters(defaultFilters)
    onFilterChange?.(defaultFilters)
  }

  const hasActiveFilters = Object.values(filters).some((value, index) => {
    const defaults = ['', 'All Industries', 'All Levels', 'Any Time', 'Any Price', 'popular']
    return value !== defaults[index]
  })

  return (
    <section
      id="agent-filter"
      className="py-12 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-gray-800 sticky top-20 z-40"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          {/* Search and Quick Filters */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 dark:text-white"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2">
              <select
                value={filters.industry}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white text-sm"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>

              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Controls and Advanced Filters */}
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-dark-800 rounded-lg p-1">
              <button
                onClick={() => handleViewChange('grid')}
                className={`p-2 rounded-md transition-colors ${
                  currentView === 'grid'
                    ? 'bg-white dark:bg-dark-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleViewChange('list')}
                className={`p-2 rounded-md transition-colors ${
                  currentView === 'list'
                    ? 'bg-white dark:bg-dark-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Advanced Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`${isExpanded ? 'bg-primary-50 dark:bg-primary-900 border-primary-200 dark:border-primary-800' : ''}`}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Expanded Filters */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Complexity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Complexity Level
                </label>
                <select
                  value={filters.complexity}
                  onChange={(e) => handleFilterChange('complexity', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white text-sm"
                >
                  {complexityLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Deployment Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deployment Time
                </label>
                <select
                  value={filters.deployment}
                  onChange={(e) => handleFilterChange('deployment', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white text-sm"
                >
                  {deploymentTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range
                </label>
                <select
                  value={filters.price}
                  onChange={(e) => handleFilterChange('price', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white text-sm"
                >
                  {priceRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mt-4"
          >
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Active filters:</span>
            {Object.entries(filters).map(([key, value]) => {
              const defaults = {
                search: '',
                industry: 'All Industries',
                complexity: 'All Levels',
                deployment: 'Any Time',
                price: 'Any Price',
                sort: 'popular'
              }

              if (value && value !== defaults[key as keyof typeof defaults]) {
                return (
                  <span
                    key={key}
                    className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm rounded-full"
                  >
                    {key === 'search' ? `"${value}"` : value}
                    <button
                      onClick={() => handleFilterChange(key, defaults[key as keyof typeof defaults])}
                      className="ml-2 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      ×
                    </button>
                  </span>
                )
              }
              return null
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}