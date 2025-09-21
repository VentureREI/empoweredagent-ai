'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react'

export function ProcessCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold mb-6"
          >
            Ready to Transform Your Business with AI?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-purple-200 mb-12 max-w-3xl mx-auto"
          >
            Join the companies that are already benefiting from our proven AI methodology. 
            Let's discuss how we can accelerate your business with intelligent automation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a
              href="/demo"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-900 font-semibold rounded-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg"
            >
              <Calendar className="mr-3 w-5 h-5" />
              Book Strategy Session
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-900 transition-all"
            >
              <MessageCircle className="mr-3 w-5 h-5" />
              Contact Our Team
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center space-x-8 text-center"
          >
            <div>
              <div className="text-2xl font-bold text-white">24-48hrs</div>
              <div className="text-sm text-purple-300">Response Time</div>
            </div>
            <div className="border-l border-purple-600 pl-8">
              <div className="text-2xl font-bold text-white">Free</div>
              <div className="text-sm text-purple-300">Initial Consultation</div>
            </div>
            <div className="border-l border-purple-600 pl-8">
              <div className="text-2xl font-bold text-white">30 Days</div>
              <div className="text-sm text-purple-300">To First Results</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}