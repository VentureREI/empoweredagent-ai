'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, Eye, Heart, Lightbulb, Users, Rocket } from 'lucide-react'

const missionPoints = [
  {
    icon: Target,
    title: 'Democratize AI',
    description: 'Make powerful AI automation accessible to businesses of all sizes, not just tech giants.'
  },
  {
    icon: Users,
    title: 'Empower People',
    description: 'Free humans from repetitive tasks so they can focus on creativity and innovation.'
  },
  {
    icon: Rocket,
    title: 'Accelerate Growth',
    description: 'Help businesses scale faster and more efficiently than ever before possible.'
  }
]

const visionPoints = [
  {
    icon: Lightbulb,
    title: 'AI-First Future',
    description: 'A world where every business process is intelligently automated and optimized.'
  },
  {
    icon: Heart,
    title: 'Human-Centered',
    description: 'Technology that enhances human potential rather than replacing people.'
  },
  {
    icon: Eye,
    title: 'Transparent AI',
    description: 'AI systems that are explainable, ethical, and aligned with human values.'
  }
]

export function MissionSection() {
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
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Our <span className="text-gradient">Mission & Vision</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            We're building the future where intelligent automation empowers every business 
            to achieve more while enabling people to focus on what matters most.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Mission Section */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Our Mission
                </h3>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                To democratize AI automation by making it accessible, affordable, and actionable 
                for businesses of every size. We believe that intelligent automation shouldn't 
                be a privilege of large corporations.
              </p>
            </motion.div>

            <div className="space-y-6">
              {missionPoints.map((point, index) => {
                const IconComponent = point.icon
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start space-x-4 p-6 bg-gray-50 dark:bg-dark-800 rounded-2xl hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {point.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Vision Section */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-accent-600 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Our Vision
                </h3>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                A future where AI agents work alongside humans to create unprecedented levels 
                of productivity, creativity, and innovation. We envision a world where 
                technology amplifies human potential.
              </p>
            </motion.div>

            <div className="space-y-6">
              {visionPoints.map((point, index) => {
                const IconComponent = point.icon
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start space-x-4 p-6 bg-gray-50 dark:bg-dark-800 rounded-2xl hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {point.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-hero-pattern opacity-10" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <blockquote className="text-2xl sm:text-3xl font-bold mb-8 leading-relaxed">
                "The best way to predict the future is to create it. We're not just building AI tools — 
                we're crafting the foundation for how humans and AI will collaborate tomorrow."
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  AC
                </div>
                <div className="text-left">
                  <div className="text-lg font-semibold">Alex Chen</div>
                  <div className="text-primary-200">CEO & Co-Founder</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}