'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LucideIcon, Play, ExternalLink, Clock, Users, Zap, CheckCircle, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface AgentCardProps {
  name: string
  description: string
  category: string
  industry?: string
  complexity: 'Simple' | 'Medium' | 'Advanced'
  integrations: string[]
  features: string[]
  metrics: {
    timesSaved?: string
    efficiency?: string
    roi?: string
    users?: string
  }
  deploymentTime: string
  pricing?: {
    setup: string
    monthly: string
  }
  icon: LucideIcon
  image?: string
  isPopular?: boolean
  isFeatured?: boolean
  demoUrl?: string
  variant?: 'default' | 'compact' | 'detailed'
  onDemo?: () => void
  onClone?: () => void
  onContact?: () => void
}

const complexityColors = {
  Simple: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

export function AgentCard({
  name,
  description,
  category,
  industry,
  complexity,
  integrations,
  features,
  metrics,
  deploymentTime,
  pricing,
  icon: Icon,
  image,
  isPopular = false,
  isFeatured = false,
  demoUrl,
  variant = 'default',
  onDemo,
  onClone,
  onContact
}: AgentCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        type: 'spring',
        stiffness: 200
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2
      }
    }
  }

  if (variant === 'compact') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card
          variant="default"
          hover="glow"
          className="p-6 h-full relative overflow-hidden group cursor-pointer"
        >
          {/* Popular Badge */}
          {isPopular && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1 z-10">
              <Star className="w-3 h-3 fill-current" />
              <span>Popular</span>
            </div>
          )}

          {/* Content */}
          <div className="flex items-start space-x-4">
            <motion.div
              variants={iconVariants}
              className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {description}
              </p>

              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${complexityColors[complexity]}`}>
                  {complexity}
                </span>
                <div className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                  {metrics.timesSaved || metrics.efficiency || metrics.roi}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card
        variant="default"
        hover="glow"
        className="p-8 h-full relative overflow-hidden group"
      >
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-0 right-0 bg-gradient-to-br from-primary-500 to-primary-600 text-white text-xs font-bold px-4 py-2 rounded-bl-lg">
            FEATURED
          </div>
        )}

        {/* Popular Badge */}
        {isPopular && !isFeatured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1">
            <Star className="w-3 h-3 fill-current" />
            <span>Popular</span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            variants={iconVariants}
            className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          <div className="flex space-x-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${complexityColors[complexity]}`}>
              {complexity}
            </span>
            {industry && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                {industry}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {name}
            </h3>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            {description}
          </p>

          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span className="font-medium">Category:</span> {category}
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Key Features</h4>
          <ul className="space-y-2">
            {features.slice(0, 4).map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center space-x-2 text-sm"
              >
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Metrics */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          {Object.entries(metrics).map(([key, value]) => (
            <div key={key} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
            </div>
          ))}
        </div>

        {/* Integrations */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Integrations</h4>
          <div className="flex flex-wrap gap-2">
            {integrations.slice(0, 3).map((integration, index) => (
              <span
                key={index}
                className="text-xs bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 px-2 py-1 rounded-md"
              >
                {integration}
              </span>
            ))}
            {integrations.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{integrations.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Deployment Time */}
        <div className="mb-6 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <Clock className="w-4 h-4" />
          <span>Deploy in {deploymentTime}</span>
        </div>

        {/* Pricing */}
        {pricing && (
          <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Setup</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{pricing.setup}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 dark:text-gray-300">Monthly</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{pricing.monthly}</div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <Button
            size="sm"
            className="flex-1"
            onClick={onDemo}
          >
            <Play className="w-4 h-4 mr-2" />
            Demo
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onClone}
          >
            <Zap className="w-4 h-4 mr-2" />
            Clone
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-4"
            onClick={onContact}
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Hover Effect Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent dark:from-primary-950 dark:to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  )
}