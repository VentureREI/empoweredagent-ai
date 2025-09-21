'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, HelpCircle, Search, ThumbsUp, ThumbsDown, MessageSquare, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface FAQ {
  id: string
  category: string
  question: string
  answer: string
  helpful?: number
  tags: string[]
}

const faqs: FAQ[] = [
  {
    id: '1',
    category: 'Getting Started',
    question: 'What are AI agents and how do they work?',
    answer: 'AI agents are intelligent software programs that can perform tasks, make decisions, and automate processes on your behalf. Our agents use advanced machine learning and natural language processing to understand your business needs, integrate with your existing tools, and execute complex workflows automatically. They learn from your processes and continuously improve their performance over time.',
    helpful: 45,
    tags: ['basics', 'ai', 'automation']
  },
  {
    id: '2',
    category: 'Getting Started',
    question: 'How quickly can I get started with EmpoweredAgent.ai?',
    answer: 'Most customers can get started within 24-48 hours. Our onboarding process includes: 1) Initial consultation call (30 minutes), 2) System integration setup (1-2 hours), 3) Agent configuration and training (2-4 hours), 4) Testing and go-live (1 hour). We provide dedicated onboarding specialists to ensure a smooth setup process.',
    helpful: 38,
    tags: ['onboarding', 'setup', 'timeline']
  },
  {
    id: '3',
    category: 'Getting Started',
    question: 'Do I need technical expertise to use your platform?',
    answer: 'No technical expertise is required. Our platform is designed for business users with an intuitive, no-code interface. You can create workflows using our visual builder, and our AI agents handle the complex technical implementation. For advanced customizations, our technical team provides full support.',
    helpful: 52,
    tags: ['no-code', 'technical', 'ease-of-use']
  },
  {
    id: '4',
    category: 'Pricing',
    question: 'How is your pricing structured?',
    answer: 'We offer flexible pricing based on the number of agents, integrations, and monthly task volume. Our plans start at $99/month for small businesses and scale to enterprise packages. All plans include: unlimited workflows, 24/7 support, regular updates, and a 30-day free trial. Contact our sales team for custom enterprise pricing.',
    helpful: 41,
    tags: ['pricing', 'plans', 'cost']
  },
  {
    id: '5',
    category: 'Pricing',
    question: 'Is there a free trial available?',
    answer: 'Yes! We offer a 30-day free trial with full access to our platform. This includes up to 3 AI agents, 10 integrations, and 1,000 automated tasks. No credit card required to start your trial. Our team provides personalized onboarding to help you achieve quick wins during the trial period.',
    helpful: 67,
    tags: ['free-trial', 'trial', 'no-credit-card']
  },
  {
    id: '6',
    category: 'Security',
    question: 'How do you ensure data security and privacy?',
    answer: 'Security is our top priority. We use enterprise-grade encryption (AES-256), maintain SOC 2 Type II compliance, and follow GDPR requirements. All data is encrypted in transit and at rest. We offer single sign-on (SSO), role-based access controls, and audit logs. Your data never trains our models, and we provide data residency options for enterprise customers.',
    helpful: 89,
    tags: ['security', 'privacy', 'compliance', 'encryption']
  },
  {
    id: '7',
    category: 'Security',
    question: 'Where is my data stored and who has access?',
    answer: 'Your data is stored in secure, certified data centers (AWS/Google Cloud) with redundancy and backup systems. Only authorized personnel with legitimate business needs have access, and all access is logged and monitored. You maintain full ownership of your data and can export or delete it at any time.',
    helpful: 34,
    tags: ['data-storage', 'access', 'ownership']
  },
  {
    id: '8',
    category: 'Features',
    question: 'What types of workflows can AI agents automate?',
    answer: 'Our AI agents can automate virtually any digital workflow: data entry and processing, email management and responses, report generation and distribution, customer support tickets, inventory management, lead qualification, appointment scheduling, invoice processing, and much more. If it\'s a repetitive task involving digital tools, we can likely automate it.',
    helpful: 76,
    tags: ['workflows', 'automation', 'use-cases']
  },
  {
    id: '9',
    category: 'Features',
    question: 'Can AI agents integrate with our existing software?',
    answer: 'Yes, we support 500+ integrations including popular tools like Salesforce, HubSpot, Slack, Microsoft 365, Google Workspace, Shopify, and many more. For custom or legacy systems, we can build API integrations or use RPA (Robotic Process Automation) to connect with any software interface.',
    helpful: 63,
    tags: ['integrations', 'software', 'api', 'legacy-systems']
  },
  {
    id: '10',
    category: 'Support',
    question: 'What kind of support do you provide?',
    answer: 'We provide comprehensive support including: 24/7 technical support via chat, email, and phone; dedicated customer success manager for enterprise clients; extensive documentation and video tutorials; live training sessions and webinars; community forum with peer support; and priority support for critical issues.',
    helpful: 45,
    tags: ['support', '24/7', 'training', 'documentation']
  },
  {
    id: '11',
    category: 'Support',
    question: 'How do you handle system maintenance and updates?',
    answer: 'We perform all maintenance during scheduled windows with advance notice. Updates are deployed gradually with zero downtime. Critical security patches are applied immediately. We maintain 99.9% uptime SLA and provide status page notifications. All updates include new features and improvements at no extra cost.',
    helpful: 28,
    tags: ['maintenance', 'updates', 'uptime', 'sla']
  },
  {
    id: '12',
    category: 'Advanced',
    question: 'Can I customize AI agents for specific business needs?',
    answer: 'Absolutely! Our platform offers extensive customization options: custom workflow builders, conditional logic and branching, custom data fields and processing rules, integration with proprietary systems, custom AI model training for specific use cases, and white-label solutions for agencies and partners.',
    helpful: 39,
    tags: ['customization', 'custom-ai', 'advanced', 'white-label']
  }
]

const categories = [
  { id: 'all', name: 'All Questions', count: faqs.length },
  { id: 'Getting Started', name: 'Getting Started', count: faqs.filter(f => f.category === 'Getting Started').length },
  { id: 'Pricing', name: 'Pricing', count: faqs.filter(f => f.category === 'Pricing').length },
  { id: 'Security', name: 'Security', count: faqs.filter(f => f.category === 'Security').length },
  { id: 'Features', name: 'Features', count: faqs.filter(f => f.category === 'Features').length },
  { id: 'Support', name: 'Support', count: faqs.filter(f => f.category === 'Support').length },
  { id: 'Advanced', name: 'Advanced', count: faqs.filter(f => f.category === 'Advanced').length }
]

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  const [helpfulVote, setHelpfulVote] = useState<'up' | 'down' | null>(null)

  return (
    <Card variant="default" className="overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
            {faq.question}
          </h3>
          <div className="flex-shrink-0">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {faq.answer}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {faq.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Helpful section */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Was this helpful?
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setHelpfulVote(helpfulVote === 'up' ? null : 'up')}
                      className={cn(
                        'flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-colors',
                        helpfulVote === 'up'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                      )}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{faq.helpful && helpfulVote === 'up' ? faq.helpful + 1 : faq.helpful}</span>
                    </button>
                    <button
                      onClick={() => setHelpfulVote(helpfulVote === 'down' ? null : 'down')}
                      className={cn(
                        'flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-colors',
                        helpfulVote === 'down'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                      )}
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [filteredFaqs, setFilteredFaqs] = useState(faqs)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    let filtered = faqs

    if (activeCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === activeCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredFaqs(filtered)
  }, [activeCategory, searchQuery])

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
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
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-primary-200 dark:border-primary-800"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Got Questions? <span className="text-gradient">We've Got Answers</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Find answers to common questions about our AI agents, pricing, security, and more. 
            Can't find what you're looking for? We're here to help.
          </motion.p>
        </motion.div>

        {/* Search and Categories */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-12"
        >
          {/* Search Bar */}
          <motion.div variants={itemVariants} className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300',
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-700'
                )}
              >
                <span className="text-sm">{category.name}</span>
                <span className={cn(
                  'text-xs px-2 py-0.5 rounded-full',
                  activeCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                )}>
                  {category.count}
                </span>
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto mb-16"
        >
          {filteredFaqs.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No questions found
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Try adjusting your search or selecting a different category
              </p>
              <Button
                variant="outline"
                onClick={() => { setSearchQuery(''); setActiveCategory('all') }}
              >
                Show All Questions
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <motion.div key={faq.id} variants={itemVariants}>
                  <FAQItem
                    faq={faq}
                    isOpen={openItems.has(faq.id)}
                    onToggle={() => toggleItem(faq.id)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Still Have Questions */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 rounded-3xl p-12 border border-primary-200 dark:border-primary-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Our support team is here to help you get the most out of EmpoweredAgent.ai. 
              Get in touch and we'll respond within 2 hours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-4 text-lg font-semibold">
                <MessageSquare className="w-5 h-5 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold">
                <ExternalLink className="w-5 h-5 mr-2" />
                Visit Help Center
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
              💬 Live chat available • 📧 Email support • 📞 Phone support for enterprise
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}