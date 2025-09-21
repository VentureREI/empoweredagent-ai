'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Users, Zap, DollarSign, Clock, Globe, Shield, BarChart3 } from 'lucide-react'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'

const stats = [
  {
    icon: Users,
    value: 2500,
    suffix: '+',
    label: 'Agents & Teams Served',
    description: 'Top producers and brokerages leveling up with AI concierge follow-up',
    gradient: 'from-blue-500 to-primary-600'
  },
  {
    icon: Zap,
    value: 10000,
    suffix: '+',
    label: 'Follow-Ups Sent Daily',
    description: 'Texts, emails, and DMs fired automatically the moment a lead comes in',
    gradient: 'from-primary-500 to-purple-600'
  },
  {
    icon: TrendingUp,
    value: 300,
    suffix: '%',
    label: 'Avg ROI in 90 Days',
    description: 'More appointments, higher conversion, and pipeline momentum—fast',
    gradient: 'from-green-500 to-primary-600'
  },
  {
    icon: Clock,
    value: 80,
    suffix: '%',
    label: 'Less Time on Manual Tasks',
    description: 'Ditch manual data entry and nurture—focus on clients, not busywork',
    gradient: 'from-orange-500 to-primary-600'
  },
  {
    icon: DollarSign,
    value: 2.5,
    suffix: 'M+',
    label: 'Commission Value Protected',
    description: 'Saved deals and revived cold leads that would have slipped through',
    gradient: 'from-emerald-500 to-primary-600'
  },
  {
    icon: Globe,
    value: 50,
    suffix: '+',
    label: 'Brokerages Served',
    description: 'High-performing brokerages across the U.S. and abroad rely on our playbook',
    gradient: 'from-cyan-500 to-primary-600'
  },
  {
    icon: Shield,
    value: 99.9,
    suffix: '%',
    label: 'Instant Response Uptime',
    description: 'Lead response that never sleeps—speed-to-lead you can count on',
    gradient: 'from-indigo-500 to-primary-600'
  },
  {
    icon: BarChart3,
    value: 500,
    suffix: '+',
    label: 'CRM & MLS Integrations',
    description: 'Connect your CRM, dialer, calendar, forms, and MLS—no friction',
    gradient: 'from-pink-500 to-primary-600'
  }
]

function Counter({ 
  target, 
  suffix = '', 
  duration = 2000 
}: { 
  target: number
  suffix?: string
  duration?: number 
}) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true)
      let startTime: number
      let animationFrame: number

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Ease-out function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const newCount = Math.floor(target * easeOut)
        setCount(newCount)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          // Ensure we end exactly at target
          setCount(target)
        }
      }

      animationFrame = requestAnimationFrame(animate)

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }
  }, [isInView, hasStarted, target, duration])

  // Fallback: if animation hasn't started after 2 seconds, show target value
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!hasStarted && count === 0) {
        setCount(target)
      }
    }, 2000)

    return () => clearTimeout(fallbackTimer)
  }, [hasStarted, count, target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleLeadFormSubmit = (formData: LeadFormData) => {
    console.log('Lead form submitted:', formData)
    // The modal handles the calendar view internally
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

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-dark-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-primary-100 dark:bg-primary-900 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-accent-100 dark:bg-accent-900 rounded-full blur-3xl opacity-20" />
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
            Proven Results That <span className="text-gradient">Speak for Themselves</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            See how our automations create measurable impact for growing businesses.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Value */}
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {stat.description}
                  </p>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 rounded-full opacity-20 group-hover:scale-110 transition-transform" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 rounded-3xl p-12 border border-primary-200 dark:border-primary-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Close More Deals With Less Effort?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of real estate agents who are converting more leads and reclaiming their time with smart automation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/how-we-work"
                className="btn-primary px-8 py-4 text-lg font-semibold inline-block hover:scale-105 transition-transform"
              >
                Learn More
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLeadModalOpen(true)}
                className="btn-secondary px-8 py-4 text-lg font-semibold"
              >
                Schedule Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lead Form Modal */}
      <LeadFormModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onSubmit={handleLeadFormSubmit}
      />
    </section>
  )
}