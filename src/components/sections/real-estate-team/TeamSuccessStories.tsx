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
  Sparkles,
  Crown,
  Shield,
  Activity
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { LeadFormModal, LeadFormData } from '@/components/modals/LeadFormModal'

const successStories = [
  {
    id: 1,
    teamName: 'Phoenix Elite Realty',
    teamLeader: 'Sarah Johnson',
    location: 'Phoenix, AZ',
    teamSize: 24,
    experience: '5 years',
    avatar: '/teams/phoenix-elite.jpg',
    beforeStats: {
      revenue: '$8.2M',
      agents: 15,
      avgDeals: 180,
      retention: '65%'
    },
    afterStats: {
      revenue: '$23.5M',
      agents: 24,
      avgDeals: 347,
      retention: '94%'
    },
    improvements: {
      revenue: '+187%',
      agents: '+60%',
      avgDeals: '+93%',
      retention: '+45%'
    },
    quote: "Our team revenue tripled in 18 months. The AI-powered lead distribution and automated workflows freed up our agents to focus on what they do best - building relationships and closing deals. Best investment we've ever made.",
    videoUrl: '/testimonials/phoenix-elite-video.mp4',
    challenges: [
      'Uneven lead distribution causing agent conflicts',
      'Manual processes consuming 40+ hours/week',
      'High agent turnover (35% annually)',
      'Inconsistent follow-up leading to lost deals'
    ],
    solutions: [
      'AI-powered lead routing based on expertise',
      'Automated follow-up and nurturing sequences',
      'Comprehensive performance tracking',
      'Team collaboration and communication tools'
    ],
    results: [
      'Revenue increased 187% in 18 months',
      'Agent retention improved to 94%',
      'Team size grew from 15 to 24 agents',
      'Average deals per agent increased 93%'
    ],
    timeline: '18 months',
    specialty: 'Luxury residential & commercial',
    markets: ['Phoenix', 'Scottsdale', 'Paradise Valley'],
    rating: 5
  },
  {
    id: 2,
    teamName: 'Metro Real Estate Group',
    teamLeader: 'Michael Rodriguez',
    location: 'Dallas, TX',
    teamSize: 18,
    experience: '8 years',
    avatar: '/teams/metro-group.jpg',
    beforeStats: {
      revenue: '$12.5M',
      agents: 22,
      avgDeals: 245,
      retention: '58%'
    },
    afterStats: {
      revenue: '$31.2M',
      agents: 18,
      avgDeals: 412,
      retention: '89%'
    },
    improvements: {
      revenue: '+150%',
      agents: '-18%',
      avgDeals: '+68%',
      retention: '+53%'
    },
    quote: "We actually reduced our team size but increased revenue by 150%. The platform helped us identify our top performers and optimize our operations. Now every agent is a high performer with the right support and automation.",
    videoUrl: '/testimonials/metro-group-video.mp4',
    challenges: [
      'Underperforming agents dragging down team results',
      'Complex market requiring specialized expertise',
      'Difficulty scaling operations efficiently',
      'Time-consuming administrative tasks'
    ],
    solutions: [
      'Performance analytics and coaching insights',
      'Specialized lead routing by market segment',
      'Automated administrative workflows',
      'Team training and development programs'
    ],
    results: [
      'Optimized team composition for better results',
      'Revenue per agent increased significantly',
      'Streamlined operations with fewer agents',
      'Industry-leading retention rates achieved'
    ],
    timeline: '12 months',
    specialty: 'Commercial & investment properties',
    markets: ['Dallas', 'Fort Worth', 'Plano'],
    rating: 5
  },
  {
    id: 3,
    teamName: 'Coastal Premier Team',
    teamLeader: 'Jennifer Chen',
    location: 'San Diego, CA',
    teamSize: 32,
    experience: '6 years',
    avatar: '/teams/coastal-premier.jpg',
    beforeStats: {
      revenue: '$15.8M',
      agents: 28,
      avgDeals: 198,
      retention: '72%'
    },
    afterStats: {
      revenue: '$42.3M',
      agents: 32,
      avgDeals: 389,
      retention: '96%'
    },
    improvements: {
      revenue: '+168%',
      agents: '+14%',
      avgDeals: '+96%',
      retention: '+33%'
    },
    quote: "The platform transformed how we manage our large team. Real-time performance tracking and automated coaching helped every agent improve. We went from good to exceptional across the board.",
    videoUrl: '/testimonials/coastal-premier-video.mp4',
    challenges: [
      'Managing large team spread across multiple markets',
      'Maintaining quality standards with rapid growth',
      'Complex luxury market requirements',
      'Coordination across different specializations'
    ],
    solutions: [
      'Centralized team management dashboard',
      'Quality control and performance monitoring',
      'Luxury market-specific tools and training',
      'Specialized team coordination features'
    ],
    results: [
      'Successfully scaled to 32 high-performing agents',
      'Maintained premium service standards',
      'Dominated luxury market share',
      'Achieved industry-best retention rates'
    ],
    timeline: '15 months',
    specialty: 'Luxury coastal properties',
    markets: ['San Diego', 'La Jolla', 'Del Mar'],
    rating: 5
  },
  {
    id: 4,
    teamName: 'Mountain View Realty',
    teamLeader: 'David Park',
    location: 'Denver, CO',
    teamSize: 12,
    experience: '4 years',
    avatar: '/teams/mountain-view.jpg',
    beforeStats: {
      revenue: '$4.8M',
      agents: 8,
      avgDeals: 95,
      retention: '50%'
    },
    afterStats: {
      revenue: '$14.2M',
      agents: 12,
      avgDeals: 278,
      retention: '92%'
    },
    improvements: {
      revenue: '+196%',
      agents: '+50%',
      avgDeals: '+193%',
      retention: '+84%'
    },
    quote: "As a smaller team, we needed to compete with the big players. The AI platform leveled the playing field. We now outperform teams twice our size with better tools and smarter processes.",
    videoUrl: '/testimonials/mountain-view-video.mp4',
    challenges: [
      'Small team competing against large brokerages',
      'Limited resources for technology and training',
      'Seasonal market fluctuations',
      'Need for maximum efficiency with fewer agents'
    ],
    solutions: [
      'Enterprise-level tools for small team pricing',
      'Automated efficiency maximization',
      'Market trend analysis and adaptation',
      'Performance optimization for each agent'
    ],
    results: [
      'Tripled revenue with strategic growth',
      'Outperformed larger competing teams',
      'Achieved market leadership position',
      'Built sustainable, profitable operation'
    ],
    timeline: '10 months',
    specialty: 'Mountain resort properties',
    markets: ['Denver', 'Boulder', 'Aspen'],
    rating: 5
  }
]

const industryBenchmarks = [
  {
    metric: 'Team Revenue Growth',
    industry: '15% annually',
    empowered: '175% annually',
    improvement: '11x better'
  },
  {
    metric: 'Agent Retention Rate',
    industry: '68%',
    empowered: '93%',
    improvement: '+37%'
  },
  {
    metric: 'Deals Per Agent',
    industry: '28/year',
    empowered: '52/year',
    improvement: '+86%'
  },
  {
    metric: 'Lead Response Time',
    industry: '6.2 hours',
    empowered: '2.1 minutes',
    improvement: '99% faster'
  },
  {
    metric: 'Administrative Time',
    industry: '35% of time',
    empowered: '8% of time',
    improvement: '-77%'
  },
  {
    metric: 'Team Satisfaction',
    industry: '3.4/5',
    empowered: '4.8/5',
    improvement: '+41%'
  }
]

const achievementBadges = [
  {
    title: 'Revenue Growth',
    description: '175% average annual revenue increase',
    icon: TrendingUp,
    color: 'text-green-500'
  },
  {
    title: 'Team Retention',
    description: '93% agent retention rate achieved',
    icon: Heart,
    color: 'text-pink-500'
  },
  {
    title: 'Market Leadership',
    description: '89% of teams achieve market leadership',
    icon: Crown,
    color: 'text-yellow-500'
  },
  {
    title: 'Operational Excellence',
    description: '4.8/5 average team satisfaction score',
    icon: Star,
    color: 'text-blue-500'
  }
]

export default function TeamSuccessStories() {
  const [currentStory, setCurrentStory] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleLeadFormSubmit = (formData: LeadFormData) => {
    console.log('Team transformation request:', formData)
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
    <section ref={ref} className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full text-purple-300 text-sm font-semibold mb-8 border border-purple-500/30 backdrop-blur-sm"
          >
            <Crown className="w-5 h-5 mr-2" />
            Elite Team Success Stories
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8"
          >
            Real Estate Teams Achieving
            <span className="block text-gradient bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Extraordinary Growth
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
          >
            Discover how real estate teams across the country are using our platform to
            <span className="text-purple-400 font-semibold"> triple their revenue</span>,
            <span className="text-blue-400 font-semibold"> improve agent retention</span>, and
            <span className="text-cyan-400 font-semibold"> dominate their markets</span>.
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
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20"
            >
              <div className="grid lg:grid-cols-12 gap-12">
                {/* Left Column - Story Content */}
                <div className="lg:col-span-7">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Building className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{story.teamName}</h3>
                      <p className="text-lg text-purple-300 font-semibold">Led by {story.teamLeader}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{story.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{story.teamSize} agents</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{story.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-gray-300">Verified Success Story</span>
                  </div>

                  <blockquote className="text-xl text-gray-200 italic mb-8 leading-relaxed">
                    <Quote className="w-8 h-8 text-purple-400 mb-4" />
                    "{story.quote}"
                  </blockquote>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">Key Challenges</h4>
                      <ul className="space-y-2">
                        {story.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-300">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">AI Solutions</h4>
                      <ul className="space-y-2">
                        {story.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30">
                    <h4 className="text-lg font-bold text-white mb-4">Results After {story.timeline}</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {story.results.map((result, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-green-400" />
                          <span className="text-gray-200">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Stats and Video */}
                <div className="lg:col-span-5">
                  <div className="space-y-8">
                    {/* Before/After Stats */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                      <h4 className="text-xl font-bold text-white mb-6 text-center">
                        Team Transformation
                      </h4>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-400">{story.beforeStats.revenue}</div>
                            <div className="text-sm text-gray-400">Before: Revenue</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{story.afterStats.revenue}</div>
                            <div className="text-sm text-gray-400">After: Revenue</div>
                            <div className="text-xs font-semibold text-green-300">{story.improvements.revenue}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-400">{story.beforeStats.agents}</div>
                            <div className="text-sm text-gray-400">Before: Agents</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{story.afterStats.agents}</div>
                            <div className="text-sm text-gray-400">After: Agents</div>
                            <div className="text-xs font-semibold text-green-300">{story.improvements.agents}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-400">{story.beforeStats.avgDeals}</div>
                            <div className="text-sm text-gray-400">Before: Avg Deals</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{story.afterStats.avgDeals}</div>
                            <div className="text-sm text-gray-400">After: Avg Deals</div>
                            <div className="text-xs font-semibold text-green-300">{story.improvements.avgDeals}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-xl font-bold text-red-400">{story.beforeStats.retention}</div>
                            <div className="text-sm text-gray-400">Before: Retention</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-green-400">{story.afterStats.retention}</div>
                            <div className="text-sm text-gray-400">After: Retention</div>
                            <div className="text-xs font-semibold text-green-300">{story.improvements.retention}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Video Testimonial */}
                    <div className="relative">
                      <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-8 aspect-video flex items-center justify-center border border-purple-500/30">
                        {!showVideo ? (
                          <Button
                            size="xl"
                            onClick={() => setShowVideo(true)}
                            className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl"
                          >
                            <Play className="w-8 h-8 mr-3" />
                            Watch {story.teamLeader}'s Story
                          </Button>
                        ) : (
                          <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
                            <p className="text-white">Video Player Placeholder</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Team Specialization */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Team Profile</h4>
                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-400">Specialization:</span>
                          <span className="text-white ml-2">{story.specialty}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Markets:</span>
                          <span className="text-white ml-2">{story.markets.join(', ')}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Timeline:</span>
                          <span className="text-white ml-2">{story.timeline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/20">
                <Button
                  onClick={prevStory}
                  variant="outline"
                  className="flex items-center space-x-2 border-white/30 text-white hover:bg-white hover:text-gray-900"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Previous Team</span>
                </Button>

                <div className="flex space-x-2">
                  {successStories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStory(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentStory ? 'bg-purple-400' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextStory}
                  variant="outline"
                  className="flex items-center space-x-2 border-white/30 text-white hover:bg-white hover:text-gray-900"
                >
                  <span>Next Team</span>
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
            <h3 className="text-3xl font-bold text-white mb-6">
              Outperforming Industry Standards
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              See how our teams consistently outperform industry benchmarks across all key metrics.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-4 px-6 font-bold text-white">Metric</th>
                    <th className="text-center py-4 px-6 font-bold text-white">Industry Average</th>
                    <th className="text-center py-4 px-6 font-bold text-white">Our Teams</th>
                    <th className="text-center py-4 px-6 font-bold text-white">Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  {industryBenchmarks.map((benchmark, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-white/10 hover:bg-white/5"
                    >
                      <td className="py-4 px-6 font-semibold text-white">{benchmark.metric}</td>
                      <td className="py-4 px-6 text-center text-red-400 font-semibold">{benchmark.industry}</td>
                      <td className="py-4 px-6 text-center text-green-400 font-semibold">{benchmark.empowered}</td>
                      <td className="py-4 px-6 text-center text-blue-400 font-bold">{benchmark.improvement}</td>
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
            <h3 className="text-3xl font-bold text-white mb-6">
              Join the Elite
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              These achievements represent what's possible when your team has the right tools and support.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-8 mb-16">
            {achievementBadges.map((badge, index) => {
              const IconComponent = badge.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                      <IconComponent className={`w-8 h-8 ${badge.color}`} />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{badge.title}</h4>
                  <p className="text-gray-300">{badge.description}</p>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-6">
                Ready to Write Your Team's Success Story?
              </h3>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Join 500+ high-performing real estate teams who've transformed their business with our platform.
                Your success story could be next.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="xl"
                  onClick={() => setIsLeadModalOpen(true)}
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Team Transformation
                </Button>
                <Link href="/contact">
                  <Button
                    size="xl"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Talk to Team Success Coach
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