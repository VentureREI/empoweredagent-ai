'use client'

import { useState } from 'react'
import { agents } from '@/lib/agents'
import { Button } from '@/components/ui/Button'
import { Bot, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AgentsPage() {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.6),transparent)]" />

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full text-sm font-medium mb-8"
          >
            <Bot className="h-4 w-4" />
            AI-Powered Real Estate Assistants
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Choose Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 block">
              AI Assistant
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12 px-4"
          >
            Experience our specialized AI agents in action. Each assistant is trained on real estate expertise
            and ready to help with specific tasks. Click any agent below to start a live conversation.
          </motion.p>
        </div>

        {/* Agents Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16"
        >
          {agents.map((agent, index) => (
            <Link key={agent.slug} href={`/agents/${agent.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                onHoverStart={() => setHoveredAgent(agent.slug)}
                onHoverEnd={() => setHoveredAgent(null)}
                className="group cursor-pointer"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full">
                  {/* Agent Icon */}
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${agent.color} rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {agent.icon}
                  </div>

                  {/* Agent Info */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-3 sm:mb-4 line-clamp-2">
                    {agent.tagline}
                  </p>

                  {/* Starter Prompts Preview */}
                  {hoveredAgent === agent.slug && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 mb-4"
                    >
                      <div className="text-xs text-purple-300 font-medium mb-2">Try asking:</div>
                      {agent.starterPrompts.slice(0, 2).map((prompt, promptIndex) => (
                        <div key={promptIndex} className="text-xs text-gray-400 bg-black/20 rounded-lg p-2">
                          "{prompt.slice(0, 60)}..."
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-300 font-medium">
                      Start Chat
                    </span>
                    <ArrowRight className="w-4 h-4 text-purple-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Experience AI That Understands Real Estate
          </h2>
          <p className="text-gray-300 mb-6">
            Our AI assistants are trained on real estate expertise, industry best practices,
            and proven methodologies. Start a conversation to see the difference.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white text-sm">Real-Time Responses</div>
                <div className="text-xs text-gray-400">Instant AI-powered assistance</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white text-sm">Industry Expertise</div>
                <div className="text-xs text-gray-400">Trained on real estate knowledge</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white text-sm">Actionable Results</div>
                <div className="text-xs text-gray-400">Get specific, helpful outputs</div>
              </div>
            </div>
          </div>

          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <Bot className="w-5 h-5 mr-2" />
            Choose an Assistant Above
          </Button>
        </motion.div>
      </div>
    </div>
  )
}