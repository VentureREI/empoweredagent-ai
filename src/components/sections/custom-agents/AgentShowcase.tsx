'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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
  ArrowRight
} from 'lucide-react'
import { AgentCard } from '@/components/ui/AgentCard'
import { Button } from '@/components/ui/Button'
import { realEstateAgents } from '@/data/realEstateAgents'

const categories = [
  {
    id: 'all',
    name: 'All Agents',
    icon: Brain,
    description: 'View our complete real estate agent portfolio',
    color: 'from-purple-500 to-primary-600'
  },
  {
    id: 'leads',
    name: 'Lead Generation',
    icon: TrendingUp,
    description: 'Capture and qualify leads automatically',
    color: 'from-blue-500 to-primary-600'
  },
  {
    id: 'client',
    name: 'Client Communication',
    icon: MessageSquare,
    description: 'Keep clients engaged throughout transactions',
    color: 'from-green-500 to-primary-600'
  },
  {
    id: 'listings',
    name: 'Listing Management',
    icon: BarChart3,
    description: 'Automate listing creation and marketing',
    color: 'from-orange-500 to-primary-600'
  },
  {
    id: 'transactions',
    name: 'Transaction Management',
    icon: FileText,
    description: 'Streamline deals from contract to closing',
    color: 'from-pink-500 to-primary-600'
  },
  {
    id: 'marketing',
    name: 'Marketing Automation',
    icon: Workflow,
    description: 'Automate social media and marketing campaigns',
    color: 'from-indigo-500 to-primary-600'
  }
]


export function AgentShowcase() {
  const [activeCategory, setActiveCategory] = useState('leads')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const filteredAgents = activeCategory === 'all'
    ? realEstateAgents
    : realEstateAgents.filter(agent => agent.category === activeCategory)

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

  return (
    <section
      id="agent-showcase"
      ref={ref}
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800 relative overflow-hidden"
    >
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
            Real Estate AI Agents <span className="text-gradient">Built for Top Producers</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Choose from our library of battle-tested real estate AI agents or use them as starting points for your custom solution.
            Each agent is designed specifically for real estate professionals and proven to drive results.
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <motion.button
                key={category.id}
                variants={itemVariants}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-white dark:bg-dark-800 text-primary-600 dark:text-primary-400 shadow-lg border-2 border-primary-200 dark:border-primary-800 transform scale-105'
                    : 'bg-white/50 dark:bg-dark-800/50 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-dark-800 border-2 border-transparent hover:scale-102'
                }`}
                whileHover={{ scale: activeCategory === category.id ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  activeCategory === category.id
                    ? `bg-gradient-to-br ${category.color}`
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  <IconComponent className={`w-4 h-4 ${
                    activeCategory === category.id ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                  }`} />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{category.name}</div>
                  <div className="text-xs opacity-70">{category.description}</div>
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Agents Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16"
        >
          {filteredAgents.map((agent, index) => (
            <AgentCard
              key={`${activeCategory}-${index}`}
              {...agent}
              onDemo={() => console.log(`Demo ${agent.name}`)}
              onClone={() => console.log(`Clone ${agent.name}`)}
              onContact={() => console.log(`Contact about ${agent.name}`)}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
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
                Don't See What You Need?
              </h3>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Every market is different. Our team specializes in building custom real estate AI agents tailored to your
                local market conditions, business model, and MLS/CRM integrations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <Bot className="w-5 h-5 mr-2" />
                  Build Custom Real Estate AI
                </Button>

                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white border-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold"
                >
                  View All Real Estate Agents
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