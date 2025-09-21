'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Star,
  Quote,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  Home,
  Target,
  Award,
  Heart,
  Briefcase,
  MapPin,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  BarChart3,
  Zap,
  CheckCircle,
  Play,
  Building,
  Globe,
  Coffee,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'
import Link from 'next/link'

const successStories = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Solo Residential Agent',
    location: 'Austin, TX',
    experience: '3 years',
    avatar: '/testimonials/sarah-chen.jpg',
    beforeStats: {
      income: '$65K',
      deals: 18,
      hours: 65,
      responseTime: '4+ hours'
    },
    afterStats: {
      income: '$165K',
      deals: 47,
      hours: 40,
      responseTime: '3 minutes'
    },
    improvements: {
      income: '+154%',
      deals: '+161%',
      hours: '-38%',
      responseTime: '-95%'
    },
    quote: "I went from struggling to keep up with leads to having a waiting list of qualified buyers. The AI handles all my follow-ups, and I can actually take weekends off now. Best investment I've ever made.",
    videoUrl: '/testimonials/sarah-chen-video.mp4',
    challenges: [
      'Missing leads due to slow response time',
      'Working 65+ hours per week',
      'Inconsistent follow-up system',
      'Struggling to compete with big teams'
    ],
    solutions: [
      'AI responds to leads in under 3 minutes',
      'Automated nurturing sequences',
      'Smart scheduling and task management',
      'Professional marketing automation'
    ],
    results: [
      'Income increased by 154% in first year',
      'Closed 47 deals vs previous 18',
      'Work-life balance dramatically improved',
      'Consistent top 5% performer'
    ],
    timeline: '12 months',
    specialty: 'First-time homebuyers',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    title: 'Independent Luxury Agent',
    location: 'Miami, FL',
    experience: '7 years',
    avatar: '/testimonials/michael-rodriguez.jpg',
    beforeStats: {
      income: '$180K',
      deals: 24,
      hours: 70,
      responseTime: '2 hours'
    },
    afterStats: {
      income: '$420K',
      deals: 38,
      hours: 45,
      responseTime: '90 seconds'
    },
    improvements: {
      income: '+133%',
      deals: '+58%',
      hours: '-36%',
      responseTime: '-96%'
    },
    quote: "The luxury market is all about relationships and instant response. Now I never miss a high-value lead, and my AI creates personalized experiences that wow my clients. My referral rate went through the roof.",
    videoUrl: '/testimonials/michael-rodriguez-video.mp4',
    challenges: [
      'High-value leads expecting immediate response',
      'Complex transaction management',
      'Maintaining luxury service standards solo',
      'Marketing to affluent clientele'
    ],
    solutions: [
      'Instant AI response system',
      'Sophisticated CRM automation',
      'Premium client experience workflows',
      'High-end marketing automation'
    ],
    results: [
      'Average deal value increased 85%',
      'Referral rate jumped to 78%',
      'Luxury market share doubled',
      'Featured in top agent rankings'
    ],
    timeline: '10 months',
    specialty: 'Luxury properties $1M+',
    rating: 5
  },
  {
    id: 3,
    name: 'Jennifer Park',
    title: 'Solo Commercial Agent',
    location: 'Seattle, WA',
    experience: '5 years',
    avatar: '/testimonials/jennifer-park.jpg',
    beforeStats: {
      income: '$95K',
      deals: 12,
      hours: 60,
      responseTime: '6 hours'
    },
    afterStats: {
      income: '$280K',
      deals: 28,
      hours: 42,
      responseTime: '5 minutes'
    },
    improvements: {
      income: '+195%',
      deals: '+133%',
      hours: '-30%',
      responseTime: '-98%'
    },
    quote: "Commercial real estate moves fast, and timing is everything. The AI keeps me ahead of every opportunity and handles all the complex data analysis. I've become the go-to agent for investors in my market.",
    videoUrl: '/testimonials/jennifer-park-video.mp4',
    challenges: [
      'Complex commercial property analysis',
      'Investor lead qualification',
      'Market research time-consuming',
      'Competing with commercial teams'
    ],
    solutions: [
      'AI-powered property analysis',
      'Intelligent investor matching',
      'Automated market reports',
      'Professional presentation tools'
    ],
    results: [
      'Commercial volume increased 300%',
      'Investor network expanded 5x',
      'Market analysis time cut by 80%',
      'Recognized as top commercial agent'
    ],
    timeline: '14 months',
    specialty: 'Commercial investment properties',
    rating: 5
  },
  {
    id: 4,
    name: 'David Thompson',
    title: 'Rural Market Specialist',
    location: 'Bozeman, MT',
    experience: '4 years',
    avatar: '/testimonials/david-thompson.jpg',
    beforeStats: {
      income: '$45K',
      deals: 15,
      hours: 55,
      responseTime: '8 hours'
    },
    afterStats: {
      income: '$125K',
      deals: 42,
      hours: 40,
      responseTime: '2 minutes'
    },
    improvements: {
      income: '+178%',
      deals: '+180%',
      hours: '-27%',
      responseTime: '-99%'
    },
    quote: "Rural markets have unique challenges, but the AI adapts perfectly. It understands my local market and helps me serve clients across a huge geographic area. I'm now the dominant agent in three counties.",
    videoUrl: '/testimonials/david-thompson-video.mp4',
    challenges: [
      'Large geographic territory',
      'Limited local market data',
      'Seasonal market fluctuations',
      'Competing with city agents'
    ],
    solutions: [
      'Mobile-first AI assistant',
      'Local market intelligence',
      'Seasonal campaign automation',
      'Rural-specific marketing tools'
    ],
    results: [
      'Territory expanded by 200%',
      'Market share increased to 35%',
      'Seasonal consistency achieved',
      'Featured in rural real estate publications'
    ],
    timeline: '8 months',
    specialty: 'Rural and ranch properties',
    rating: 5
  }
]

const industryBenchmarks = [
  {
    metric: 'Average Response Time',
    industry: '4.2 hours',
    empowered: '3 minutes',
    improvement: '95% faster'
  },
  {
    metric: 'Annual Deal Volume',
    industry: '21 deals',
    empowered: '42 deals',
    improvement: '100% more'
  },
  {
    metric: 'Weekly Work Hours',
    industry: '58 hours',
    empowered: '41 hours',
    improvement: '17 hrs saved'
  },
  {
    metric: 'Lead Conversion Rate',
    industry: '12%',
    empowered: '28%',
    improvement: '+133%'
  },
  {
    metric: 'Average Commission',
    industry: '$78K',
    empowered: '$195K',
    improvement: '+150%'
  },
  {
    metric: 'Client Satisfaction',
    industry: '3.8/5',
    empowered: '4.9/5',
    improvement: '+29%'
  }
]

const achievementBadges = [
  {
    title: 'Top 1% Producer',
    description: '85% of solo agents achieve top 1% in their market',
    icon: Award,
    color: 'text-yellow-500'
  },
  {
    title: 'Work-Life Balance',
    description: '92% report better work-life balance',
    icon: Heart,
    color: 'text-pink-500'
  },
  {
    title: 'Income Growth',
    description: 'Average 147% income increase in year one',
    icon: TrendingUp,
    color: 'text-green-500'
  },
  {
    title: 'Client Satisfaction',
    description: '4.9/5 average client satisfaction rating',
    icon: Star,
    color: 'text-blue-500'
  }
]

export function SoloAgentSuccessStories() {
  const [currentStory, setCurrentStory] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleLeadFormSubmit = (formData: LeadFormData) => {
    console.log('Solo agent transformation request:', formData)
    // Handle form submission here
    setIsLeadModalOpen(false)
  }

  const story = successStories[currentStory]

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length)
    setShowVideo(false)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length)
    setShowVideo(false)
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
        duration: 0.5
      }
    }
  }

  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-slate-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full text-purple-700 text-sm font-semibold mb-8 border border-purple-200"
          >
            <Star className="w-5 h-5 mr-2" />
            Real Solo Agent Success Stories
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8"
          >
            Solo Agents Achieving
            <span className="block text-gradient bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Extraordinary Results
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
          >
            Discover how independent agents across the country are using AI to
            <span className="text-purple-600 font-semibold"> double their income</span>,
            <span className="text-blue-600 font-semibold"> work fewer hours</span>, and
            <span className="text-cyan-600 font-semibold"> dominate their markets</span>.
          </motion.p>
        </motion.div>

        {/* Featured Success Story */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-12 shadow-xl border border-gray-200"
            >
              <div className="grid lg:grid-cols-12 gap-12">
                {/* Left Column - Story Content */}
                <div className="lg:col-span-7">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Building className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{story.name}</h3>
                      <p className="text-lg text-purple-600 font-semibold">{story.title}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{story.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Briefcase className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{story.experience}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Home className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{story.specialty}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-gray-600">Verified Success Story</span>
                  </div>

                  <blockquote className="text-xl text-gray-700 italic mb-8 leading-relaxed">
                    <Quote className="w-8 h-8 text-purple-400 mb-4" />
                    "{story.quote}"
                  </blockquote>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Key Challenges</h4>
                      <ul className="space-y-2">
                        {story.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">AI Solutions</h4>
                      <ul className="space-y-2">
                        {story.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Results After {story.timeline}</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {story.results.map((result, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Stats and Video */}
                <div className="lg:col-span-5">
                  <div className="space-y-8">
                    {/* Before/After Stats */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
                      <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">
                        Performance Transformation
                      </h4>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">{story.beforeStats.income}</div>
                            <div className="text-sm text-gray-600">Before: Annual Income</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{story.afterStats.income}</div>
                            <div className="text-sm text-gray-600">After: Annual Income</div>
                            <div className="text-xs font-semibold text-green-700">{story.improvements.income}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">{story.beforeStats.deals}</div>
                            <div className="text-sm text-gray-600">Before: Annual Deals</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{story.afterStats.deals}</div>
                            <div className="text-sm text-gray-600">After: Annual Deals</div>
                            <div className="text-xs font-semibold text-green-700">{story.improvements.deals}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">{story.beforeStats.hours}h</div>
                            <div className="text-sm text-gray-600">Before: Weekly Hours</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{story.afterStats.hours}h</div>
                            <div className="text-sm text-gray-600">After: Weekly Hours</div>
                            <div className="text-xs font-semibold text-green-700">{story.improvements.hours}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-xl font-bold text-red-600">{story.beforeStats.responseTime}</div>
                            <div className="text-sm text-gray-600">Before: Response Time</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-green-600">{story.afterStats.responseTime}</div>
                            <div className="text-sm text-gray-600">After: Response Time</div>
                            <div className="text-xs font-semibold text-green-700">{story.improvements.responseTime}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Video Testimonial */}
                    <div className="relative">
                      <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 aspect-video flex items-center justify-center">
                        {!showVideo ? (
                          <Button
                            size="xl"
                            onClick={() => setShowVideo(true)}
                            className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl"
                          >
                            <Play className="w-8 h-8 mr-3" />
                            Watch {story.name}'s Story
                          </Button>
                        ) : (
                          <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
                            <p className="text-white">Video Player Placeholder</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
                <Button
                  onClick={prevStory}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Previous Story</span>
                </Button>

                <div className="flex space-x-2">
                  {successStories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStory(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentStory ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextStory}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <span>Next Story</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Industry Benchmarks */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Outperforming Industry Standards
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our solo agents consistently outperform industry benchmarks across all key metrics.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-bold text-gray-900">Metric</th>
                    <th className="text-center py-4 px-6 font-bold text-gray-900">Industry Average</th>
                    <th className="text-center py-4 px-6 font-bold text-gray-900">EmpoweredAgent.ai</th>
                    <th className="text-center py-4 px-6 font-bold text-gray-900">Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  {industryBenchmarks.map((benchmark, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 font-semibold text-gray-900">{benchmark.metric}</td>
                      <td className="py-4 px-6 text-center text-red-600 font-semibold">{benchmark.industry}</td>
                      <td className="py-4 px-6 text-center text-green-600 font-semibold">{benchmark.empowered}</td>
                      <td className="py-4 px-6 text-center text-blue-600 font-bold">{benchmark.improvement}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>

        {/* Achievement Badges */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Join the Elite
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These achievements represent what's possible when you have the right AI tools and support.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-8">
            {achievementBadges.map((badge, index) => {
              const IconComponent = badge.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                      <IconComponent className={`w-8 h-8 ${badge.color}`} />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{badge.title}</h4>
                  <p className="text-gray-600">{badge.description}</p>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-6">
                Ready to Write Your Success Story?
              </h3>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Join thousands of solo agents who've transformed their practice with AI.
                Your success story could be next.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="xl"
                  onClick={() => setIsLeadModalOpen(true)}
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Your Transformation
                </Button>
                <Link href="/contact">
                  <Button
                    size="xl"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Talk to Success Coach
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <LeadFormModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onSubmit={handleLeadFormSubmit}
      />
    </section>
  )
}