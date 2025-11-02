'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Workflow,
  BarChart3,
  Zap,
  Shield,
  Bot,
  MessageSquare,
  FileText,
  Calendar,
  ArrowRight,
  CheckCircle,
  Play,
  Sparkles,
  Video
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const agentCategories = [
  {
    id: 'leads',
    name: 'Lead Management',
    icon: Zap,
    color: 'from-blue-500 to-primary-600',
    description: 'Capture, qualify, and nurture leads automatically'
  },
  {
    id: 'communication',
    name: 'Client Communication',
    icon: MessageSquare,
    color: 'from-green-500 to-primary-600',
    description: 'Keep clients engaged throughout their journey'
  },
  {
    id: 'video',
    name: 'Video Automation',
    icon: Video,
    color: 'from-purple-500 to-primary-600',
    description: 'Automated video content for listings and marketing'
  },
  {
    id: 'marketing',
    name: 'Marketing Automation',
    icon: BarChart3,
    color: 'from-orange-500 to-primary-600',
    description: 'Generate listings and market properties effortlessly'
  }
]

const agents = {
  leads: [
    {
      name: 'Lead Response Agent',
      description: 'Instantly responds to new leads with personalized messages and qualification questions.',
      features: ['Instant lead response', 'Qualification scoring', 'CRM integration', 'Follow-up sequences'],
      metrics: '5x faster response time',
      popular: true
    },
    {
      name: 'Lead Nurture Agent',
      description: 'Keeps prospects engaged with relevant property updates and market insights.',
      features: ['Property matching', 'Market updates', 'Personalized content', 'Engagement tracking'],
      metrics: '40% higher conversion'
    },
    {
      name: 'Referral Follow-Up Agent',
      description: 'Automatically follows up with past clients for reviews and referrals.',
      features: ['Review requests', 'Referral campaigns', 'Client check-ins', 'Loyalty programs'],
      metrics: '3x more referrals'
    }
  ],
  communication: [
    {
      name: 'Client Update Agent',
      description: 'Keeps buyers and sellers informed throughout the transaction process.',
      features: ['Transaction updates', 'Milestone notifications', 'Document requests', 'Status tracking'],
      metrics: '95% client satisfaction',
      popular: true
    },
    {
      name: 'Appointment Scheduling Agent',
      description: 'Handles showing requests and calendar management automatically.',
      features: ['Calendar sync', 'Showing coordination', 'Reminder notifications', 'Reschedule handling'],
      metrics: '60% more showings'
    },
    {
      name: 'Market Update Agent',
      description: 'Sends personalized market reports and property alerts to clients.',
      features: ['Market analysis', 'Price alerts', 'Neighborhood reports', 'Investment insights'],
      metrics: '80% open rates'
    }
  ],
  video: [
    {
      name: 'Property Video Creator',
      description: 'Automatically generates professional property tour videos from photos and descriptions.',
      features: ['Automated video creation', 'Professional templates', 'Music and voiceover', 'Brand customization'],
      metrics: '5x more engagement',
      popular: true
    },
    {
      name: 'Social Video Agent',
      description: 'Creates social media video content optimized for different platforms.',
      features: ['Platform optimization', 'Auto-captions', 'Trending hashtags', 'Performance tracking'],
      metrics: '300% more views'
    },
    {
      name: 'Client Video Messages',
      description: 'Generates personalized video messages for client communication and follow-ups.',
      features: ['Personalized scripts', 'AI avatar options', 'Bulk generation', 'Delivery scheduling'],
      metrics: '85% response rate'
    }
  ],
  marketing: [
    {
      name: 'Listing Marketing Agent',
      description: 'Creates and distributes property marketing across multiple channels.',
      features: ['Listing syndication', 'Social media posts', 'Email campaigns', 'Virtual tours'],
      metrics: '50% more inquiries',
      popular: true
    },
    {
      name: 'Social Media Agent',
      description: 'Maintains consistent social presence with property and market content.',
      features: ['Content creation', 'Post scheduling', 'Engagement monitoring', 'Brand consistency'],
      metrics: '200% more followers'
    },
    {
      name: 'Email Campaign Agent',
      description: 'Sends targeted email campaigns to different client segments.',
      features: ['Segmentation', 'Drip campaigns', 'A/B testing', 'Performance analytics'],
      metrics: '300% higher engagement'
    }
  ]
}

export function FeaturesSection() {
  const [activeCategory, setActiveCategory] = useState('leads')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
            AI Agents That <span className="text-gradient">Handle Your Busywork</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            From instant lead response to transaction management, our specialized AI agents 
            handle the repetitive tasks so you can focus on what matters—closing deals and serving clients.
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {agentCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <motion.button
                key={category.id}
                variants={itemVariants}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-white dark:bg-dark-800 text-primary-600 dark:text-primary-400 shadow-lg border-2 border-primary-200 dark:border-primary-800'
                    : 'bg-white/50 dark:bg-dark-800/50 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-dark-800 border-2 border-transparent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {agents[activeCategory as keyof typeof agents].map((agent, index) => (
            <Card
              key={index}
              variant="default"
              hover="glow"
              className="p-8 relative overflow-hidden group"
            >
              {/* Popular Badge */}
              {agent.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Popular</span>
                </div>
              )}

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {agent.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {agent.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {agent.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Metrics */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Impact:</div>
                  <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {agent.metrics}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button
                    size="sm"
                    className="flex-1"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-4"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent dark:from-primary-950 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </motion.div>

      </div>
    </section>
  )
}