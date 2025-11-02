'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'

export function ForLendersCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleModalSubmit = (formData: LeadFormData) => {
    console.log('Lead form submitted:', formData)
    setIsModalOpen(false)
  }

  const benefits = [
    {
      icon: Zap,
      title: 'Deploy in Days',
      description: 'Not months. Get up and running with your lending AI instantly.'
    },
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'Enterprise-level compliance, audit trails, and regulatory adherence.'
    },
    {
      icon: TrendingUp,
      title: 'Measurable ROI',
      description: 'See results in your first month with 245% average first-year ROI.'
    }
  ]

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-grid opacity-20" />

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Lending Operations?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join leading lenders who are processing more loans, making better decisions, and growing faster with AI automation.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="text-lg px-8 py-4 shadow-lg hover:shadow-purple"
              onClick={() => setIsModalOpen(true)}
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="text-lg px-8 py-4 border border-white/20 hover:bg-white/10 text-white"
            >
              Schedule Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-12 border-t border-white/10 text-center"
        >
          <p className="text-gray-400 text-sm mb-6">Trusted by lending institutions nationwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-80 transition-opacity">
            {['National Mortgage Association', 'Certified Secure Bank', 'SOC 2 Compliant', 'FDIC Approved'].map((badge, index) => (
              <div key={index} className="text-sm font-semibold text-gray-300">
                ✓ {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lead Form Modal */}
      <LeadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </section>
  )
}
