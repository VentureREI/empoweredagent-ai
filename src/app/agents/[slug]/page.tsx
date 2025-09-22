'use client'

import { useState, useRef, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { agents } from '@/lib/agents'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Send, Bot, User, Sparkles } from 'lucide-react'
import Link from 'next/link'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function AgentPage() {
  const params = useParams()
  const slug = params.slug as string
  const agent = agents.find(a => a.slug === slug)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (!agent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Agent Not Found</h1>
          <Link href="/agents">
            <Button variant="outline">Back to Agents</Button>
          </Link>
        </div>
      </div>
    )
  }

  async function sendMessage() {
    if (!input.trim() || isLoading || !agent) return

    const userMessage: Message = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: agent.slug, messages: newMessages }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      }

      setMessages([...newMessages, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`
      }
      setMessages([...newMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const useStarterPrompt = (prompt: string) => {
    setInput(prompt)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <Link href="/agents">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 flex-shrink-0">
                  <ArrowLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Back to Agents</span>
                </Button>
              </Link>
              <div className="text-xl sm:text-2xl flex-shrink-0">{agent.icon}</div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-bold text-white truncate">{agent.name}</h1>
                <p className="text-xs sm:text-sm text-gray-300 truncate">{agent.tagline}</p>
              </div>
            </div>
            <div className={`px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r ${agent.color} text-white text-xs sm:text-sm font-medium flex-shrink-0`}>
              <span className="hidden sm:inline">AI Assistant</span>
              <span className="sm:hidden">AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-120px)]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">{agent.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-2">Hi! I'm {agent.name}</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">{agent.tagline}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
                {agent.starterPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => useStarterPrompt(prompt)}
                    className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mt-0.5 group-hover:text-purple-300 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-gray-300 group-hover:text-white leading-relaxed">{prompt}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} px-2 sm:px-0`}
            >
              <div
                className={`max-w-[85%] sm:max-w-3xl px-3 sm:px-4 py-2 sm:py-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                }`}
              >
                <div className="flex items-start space-x-2 sm:space-x-3">
                  {message.role === 'assistant' && (
                    <div className="text-base sm:text-lg mt-0.5 flex-shrink-0">{agent.icon}</div>
                  )}
                  {message.role === 'user' && (
                    <User className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="whitespace-pre-wrap text-sm sm:text-base break-words">{message.content}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-lg">{agent.icon}</div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-3 sm:p-4">
          <div className="flex space-x-2 sm:space-x-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${agent.name}...`}
              className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none outline-none min-h-[50px] sm:min-h-[60px] max-h-32 text-sm sm:text-base"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="self-end flex-shrink-0"
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs sm:text-sm text-gray-400">
            <span className="hidden sm:inline">Press Enter to send, Shift+Enter for new line</span>
            <span className="sm:hidden">Enter to send</span>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}