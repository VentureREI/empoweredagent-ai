'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  MessageSquare,
  Users,
  Calendar,
  FileText,
  Share2,
  Bell,
  Video,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Star,
  Award,
  Activity,
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Edit3,
  ArrowRight,
  Sparkles,
  Target,
  Workflow,
  Network,
  GitBranch,
  Layers,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Heart,
  Coffee,
  Zap,
  Shield,
  Lock,
  Eye,
  EyeOff,
  MoreHorizontal
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const collaborationFeatures = [
  {
    id: 'communication',
    title: 'Team Communication Hub',
    description: 'Centralized messaging and real-time collaboration',
    icon: MessageSquare,
    color: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10',
    features: [
      'Instant team messaging',
      'Channel-based conversations',
      'Direct messages',
      'File sharing & attachments',
      'Voice & video calls',
      'Screen sharing'
    ]
  },
  {
    id: 'calendar',
    title: 'Shared Team Calendar',
    description: 'Coordinated scheduling and appointment management',
    icon: Calendar,
    color: 'from-green-500 to-green-600',
    borderColor: 'border-green-500/30',
    bgColor: 'bg-green-500/10',
    features: [
      'Team availability view',
      'Shared appointments',
      'Conflict detection',
      'Automated reminders',
      'Client scheduling',
      'Meeting coordination'
    ]
  },
  {
    id: 'documents',
    title: 'Document Management',
    description: 'Centralized file storage and collaboration',
    icon: FileText,
    color: 'from-purple-500 to-purple-600',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/10',
    features: [
      'Cloud file storage',
      'Version control',
      'Template library',
      'Document sharing',
      'Collaborative editing',
      'Access permissions'
    ]
  },
  {
    id: 'workflow',
    title: 'Workflow Coordination',
    description: 'Automated task assignment and progress tracking',
    icon: Workflow,
    color: 'from-orange-500 to-orange-600',
    borderColor: 'border-orange-500/30',
    bgColor: 'bg-orange-500/10',
    features: [
      'Task automation',
      'Progress tracking',
      'Deadline management',
      'Team handoffs',
      'Status updates',
      'Performance metrics'
    ]
  }
]

const teamChannels = [
  {
    id: 1,
    name: 'General',
    type: 'public',
    members: 24,
    lastMessage: 'Sarah: Great job on the Phoenix listing!',
    time: '2 min ago',
    unread: 0,
    active: true
  },
  {
    id: 2,
    name: 'Luxury Listings',
    type: 'private',
    members: 8,
    lastMessage: 'Michael: New $2.8M property in Scottsdale',
    time: '15 min ago',
    unread: 3,
    active: false
  },
  {
    id: 3,
    name: 'Lead Updates',
    type: 'public',
    members: 18,
    lastMessage: 'AI Bot: 12 new leads assigned today',
    time: '32 min ago',
    unread: 1,
    active: false
  },
  {
    id: 4,
    name: 'Training & Development',
    type: 'public',
    members: 24,
    lastMessage: 'Lisa: New training module available',
    time: '1 hour ago',
    unread: 0,
    active: false
  },
  {
    id: 5,
    name: 'Market Updates',
    type: 'public',
    members: 24,
    lastMessage: 'Emily: Q3 market report is ready',
    time: '2 hours ago',
    unread: 0,
    active: false
  }
]

const recentMessages = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    avatar: '/team/sarah.jpg',
    message: 'Just closed the $2.8M Scottsdale deal! 🎉 Thanks for all your support team!',
    time: '2 min ago',
    reactions: [
      { emoji: '🎉', count: 8 },
      { emoji: '👏', count: 12 },
      { emoji: '🔥', count: 5 }
    ],
    type: 'achievement'
  },
  {
    id: 2,
    sender: 'Michael Chen',
    avatar: '/team/michael.jpg',
    message: 'New commercial opportunity downtown. Perfect for our investment clients. DM me for details.',
    time: '15 min ago',
    reactions: [
      { emoji: '💼', count: 4 },
      { emoji: '🎯', count: 3 }
    ],
    type: 'opportunity'
  },
  {
    id: 3,
    sender: 'AI Assistant',
    avatar: '/ai-avatar.png',
    message: 'Lead distribution complete. 12 qualified leads assigned based on agent specialization and availability.',
    time: '32 min ago',
    reactions: [
      { emoji: '🤖', count: 6 },
      { emoji: '⚡', count: 4 }
    ],
    type: 'automation'
  },
  {
    id: 4,
    sender: 'Emily Rodriguez',
    avatar: '/team/emily.jpg',
    message: 'Listed 3 new properties in Tempe today. Photography scheduled for tomorrow morning.',
    time: '1 hour ago',
    reactions: [
      { emoji: '🏠', count: 7 },
      { emoji: '📸', count: 3 }
    ],
    type: 'update'
  }
]

const sharedDocuments = [
  {
    id: 1,
    name: 'Q3 Market Analysis Report',
    type: 'PDF',
    size: '2.4 MB',
    lastModified: '2 hours ago',
    modifiedBy: 'Emily Rodriguez',
    shared: true,
    downloads: 15
  },
  {
    id: 2,
    name: 'Luxury Listing Templates',
    type: 'Folder',
    size: '125 MB',
    lastModified: '1 day ago',
    modifiedBy: 'Sarah Johnson',
    shared: true,
    downloads: 32
  },
  {
    id: 3,
    name: 'Client Onboarding Checklist',
    type: 'DOC',
    size: '1.2 MB',
    lastModified: '3 days ago',
    modifiedBy: 'Lisa Thompson',
    shared: true,
    downloads: 28
  },
  {
    id: 4,
    name: 'Team Meeting Notes - Oct',
    type: 'DOC',
    size: '850 KB',
    lastModified: '5 days ago',
    modifiedBy: 'David Park',
    shared: false,
    downloads: 8
  }
]

const upcomingMeetings = [
  {
    id: 1,
    title: 'Weekly Team Standup',
    time: 'Today, 2:00 PM',
    duration: '30 min',
    attendees: 24,
    type: 'recurring',
    host: 'Sarah Johnson'
  },
  {
    id: 2,
    title: 'Q4 Strategy Planning',
    time: 'Tomorrow, 10:00 AM',
    duration: '2 hours',
    attendees: 8,
    type: 'planning',
    host: 'Michael Chen'
  },
  {
    id: 3,
    title: 'New Agent Onboarding',
    time: 'Friday, 9:00 AM',
    duration: '1 hour',
    attendees: 5,
    type: 'training',
    host: 'Lisa Thompson'
  }
]

const collaborationStats = [
  {
    label: 'Team Messages',
    value: '2,847',
    change: '+23%',
    icon: MessageSquare,
    color: 'text-blue-600'
  },
  {
    label: 'Files Shared',
    value: '456',
    change: '+18%',
    icon: FileText,
    color: 'text-green-600'
  },
  {
    label: 'Video Calls',
    value: '89',
    change: '+34%',
    icon: Video,
    color: 'text-purple-600'
  },
  {
    label: 'Response Time',
    value: '4.2 min',
    change: '-15%',
    icon: Clock,
    color: 'text-orange-600'
  }
]

export default function TeamCollaboration() {
  const [activeFeature, setActiveFeature] = useState('communication')
  const [selectedChannel, setSelectedChannel] = useState(1)
  const [showMobileView, setShowMobileView] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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
            <Network className="w-5 h-5 mr-2" />
            Team Collaboration Platform
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8"
          >
            Keep Your Team Connected
            <span className="block text-gradient bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              And Coordinated
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
          >
            Powerful collaboration tools that ensure your team stays aligned, informed, and productive.
            From instant messaging to shared calendars, everything your team needs to work together seamlessly.
          </motion.p>

          {/* Collaboration Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          >
            {collaborationStats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg"
                >
                  <div className="flex items-center justify-center mb-3">
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                  <div className={`text-xs font-semibold ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {stat.change} this month
                  </div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Feature Navigation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {collaborationFeatures.map((feature) => {
              const IconComponent = feature.icon
              const isActive = activeFeature === feature.id

              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`flex items-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${feature.color} text-white shadow-lg transform scale-105`
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="text-sm font-bold">{feature.title}</div>
                    <div className="text-xs opacity-80">{feature.description}</div>
                  </div>
                </button>
              )
            })}
          </motion.div>

          {/* Team Communication Interface */}
          <AnimatePresence mode="wait">
            {activeFeature === 'communication' && (
              <motion.div
                key="communication"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Team Communication Hub</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-600 text-sm font-medium">24 members online</span>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Video className="w-4 h-4 mr-2" />
                      Start Call
                    </Button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                  {/* Channels Sidebar */}
                  <div className="lg:col-span-3">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">Channels</h4>
                        <Button size="sm" variant="outline">
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      {teamChannels.map((channel) => (
                        <button
                          key={channel.id}
                          onClick={() => setSelectedChannel(channel.id)}
                          className={`w-full text-left p-3 rounded-lg transition-all ${
                            selectedChannel === channel.id
                              ? 'bg-blue-50 border border-blue-200'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">#{channel.name}</span>
                              {channel.type === 'private' && (
                                <Lock className="w-3 h-3 text-gray-400" />
                              )}
                            </div>
                            {channel.unread > 0 && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {channel.unread}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 truncate">{channel.lastMessage}</div>
                          <div className="text-xs text-gray-400 mt-1">{channel.time}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="lg:col-span-9">
                    <div className="bg-gray-50 rounded-xl p-6 h-96 overflow-y-auto">
                      <div className="space-y-6">
                        {recentMessages.map((message) => (
                          <div key={message.id} className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold text-gray-900">{message.sender}</span>
                                <span className="text-xs text-gray-500">{message.time}</span>
                                {message.type === 'automation' && (
                                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                                    Bot
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-700 mb-2">{message.message}</p>
                              <div className="flex items-center space-x-4">
                                {message.reactions.map((reaction, index) => (
                                  <button
                                    key={index}
                                    className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                                  >
                                    <span>{reaction.emoji}</span>
                                    <span>{reaction.count}</span>
                                  </button>
                                ))}
                                <button className="text-xs text-gray-400 hover:text-gray-600">
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-3">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeFeature === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Shared Team Calendar</h3>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="bg-gray-50 rounded-xl p-6 h-96">
                      <div className="text-center text-gray-500 mt-24">
                        <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-lg font-medium">Interactive Calendar View</p>
                        <p className="text-sm">See team availability and schedule coordination</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Upcoming Meetings</h4>
                    <div className="space-y-4">
                      {upcomingMeetings.map((meeting) => (
                        <div key={meeting.id} className="bg-gray-50 rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">{meeting.title}</h5>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>{meeting.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4" />
                              <span>{meeting.attendees} attendees</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4" />
                              <span>Host: {meeting.host}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeFeature === 'documents' && (
              <motion.div
                key="documents"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Document Management</h3>
                  <div className="flex items-center space-x-3">
                    <Button size="sm" variant="outline">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {sharedDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{doc.type}</span>
                            <span>{doc.size}</span>
                            <span>Modified {doc.lastModified} by {doc.modifiedBy}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500">{doc.downloads} downloads</span>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeFeature === 'workflow' && (
              <motion.div
                key="workflow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Workflow Coordination</h3>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Workflow
                  </Button>
                </div>

                <div className="text-center py-24">
                  <Workflow className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Automated Task Management</h4>
                  <p className="text-gray-600">Visual workflow builder and task coordination system</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Network className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-6">
              Transform Your Team Collaboration
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Give your team the collaboration tools they need to work together
              seamlessly and achieve extraordinary results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <Button
                  size="xl"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Team Trial
                </Button>
              </Link>
              <Button
                size="xl"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
              >
                <Video className="w-5 h-5 mr-2" />
                See Collaboration Demo
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}