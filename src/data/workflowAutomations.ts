import {
  MessageSquare,
  Target,
  FileText,
  BarChart3,
  Users,
  Calendar,
  Mail,
  Phone,
  Home,
  TrendingUp,
  Clock,
  CheckCircle,
  Zap,
  Bot,
  Shield,
  Globe,
  Camera,
  DollarSign,
  MapPin,
  Heart,
  Star,
  Workflow,
  Database,
  AlertCircle,
  Send
} from 'lucide-react'

export interface WorkflowAutomation {
  id: string
  name: string
  description: string
  category: 'lead-generation' | 'client-communication' | 'listing-management' | 'transaction-management' | 'marketing' | 'reporting'
  complexity: 'Simple' | 'Medium' | 'Advanced'
  setupTime: string
  timeSaved: string
  triggeredBy: string[]
  actions: string[]
  integrations: string[]
  metrics: {
    efficiency?: string
    responseTime?: string
    conversionBoost?: string
    timesSaved?: string
  }
  pricing: {
    setup: string
    monthly: string
  }
  isPopular?: boolean
  isFeatured?: boolean
  icon: any
  color: string
  tags: string[]
  useCase: string
  results: string[]
}

export const workflowAutomations: WorkflowAutomation[] = [
  // LEAD GENERATION WORKFLOWS
  {
    id: 'instant-lead-response',
    name: 'Instant Lead Response System',
    description: 'Respond to new leads within 60 seconds with personalized messages and schedule follow-ups automatically.',
    category: 'lead-generation',
    complexity: 'Simple',
    setupTime: '2-3 hours',
    timeSaved: '8 hours/week',
    triggeredBy: ['New website lead', 'Zillow inquiry', 'Facebook lead', 'Open house sign-up'],
    actions: [
      'Send instant text & email response',
      'Schedule follow-up calls',
      'Add to CRM with lead score',
      'Trigger lead nurture sequence',
      'Notify agent on mobile'
    ],
    integrations: ['Chime', 'KvCORE', 'Follow Up Boss', 'Zillow', 'Realtor.com', 'Facebook'],
    metrics: {
      responseTime: '< 60 seconds',
      conversionBoost: '+240%',
      timesSaved: '8 hrs/week'
    },
    pricing: {
      setup: '$500',
      monthly: '$89'
    },
    isPopular: true,
    isFeatured: true,
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    tags: ['High Converting', 'Instant Response', 'Lead Qualification'],
    useCase: 'Perfect for high-volume lead generation agents who want to capture every opportunity',
    results: [
      'Increased lead conversion by 240%',
      'Reduced response time from hours to seconds',
      'Eliminated missed follow-ups completely'
    ]
  },
  {
    id: 'lead-scoring-nurture',
    name: 'Smart Lead Scoring & Nurture',
    description: 'Automatically score leads based on behavior and send personalized content to move them through your funnel.',
    category: 'lead-generation',
    complexity: 'Medium',
    setupTime: '4-6 hours',
    timeSaved: '12 hours/week',
    triggeredBy: ['Website activity', 'Email engagement', 'Property views', 'Search behavior'],
    actions: [
      'Calculate lead score automatically',
      'Trigger personalized content sequences',
      'Schedule priority follow-ups for hot leads',
      'Send market updates and listings',
      'Track engagement and adjust scoring'
    ],
    integrations: ['Google Analytics', 'Facebook Pixel', 'CRM systems', 'Email platforms'],
    metrics: {
      efficiency: '+180%',
      conversionBoost: '+150%',
      timesSaved: '12 hrs/week'
    },
    pricing: {
      setup: '$750',
      monthly: '$129'
    },
    isPopular: true,
    icon: Target,
    color: 'from-blue-500 to-purple-500',
    tags: ['Lead Scoring', 'Behavioral Triggers', 'Personalization'],
    useCase: 'Ideal for agents who want to focus on the hottest leads while nurturing long-term prospects',
    results: [
      'Improved lead qualification by 180%',
      'Increased conversion rates by 150%',
      'Automated 90% of lead nurturing tasks'
    ]
  },
  {
    id: 'open-house-automation',
    name: 'Open House Lead Automation',
    description: 'Capture visitor info, send property details, and follow up automatically after every open house.',
    category: 'lead-generation',
    complexity: 'Simple',
    setupTime: '1-2 hours',
    timeSaved: '4 hours/week',
    triggeredBy: ['QR code scan', 'Sign-in form', 'Business card collection', 'iPad registration'],
    actions: [
      'Capture visitor contact information',
      'Send instant property details and comps',
      'Add to buyer/seller prospect lists',
      'Schedule showing appointments',
      'Track property interest and engagement'
    ],
    integrations: ['QR code generators', 'iPad apps', 'CRM systems', 'MLS'],
    metrics: {
      efficiency: '+300%',
      responseTime: 'Instant',
      timesSaved: '4 hrs/week'
    },
    pricing: {
      setup: '$300',
      monthly: '$49'
    },
    icon: Home,
    color: 'from-green-500 to-teal-500',
    tags: ['Open House', 'QR Codes', 'Instant Follow-up'],
    useCase: 'Essential for agents who host regular open houses and want to maximize every visitor',
    results: [
      'Increased open house lead capture by 300%',
      'Eliminated manual follow-up tasks',
      'Converted 25% more open house visitors'
    ]
  },

  // CLIENT COMMUNICATION WORKFLOWS
  {
    id: 'transaction-updates',
    name: 'Automated Transaction Updates',
    description: 'Keep clients informed with automatic updates at every stage of their transaction.',
    category: 'client-communication',
    complexity: 'Medium',
    setupTime: '3-4 hours',
    timeSaved: '10 hours/week',
    triggeredBy: ['Contract milestones', 'Inspection dates', 'Financing updates', 'Closing dates'],
    actions: [
      'Send milestone update emails and texts',
      'Provide next steps and timelines',
      'Schedule important appointment reminders',
      'Share document upload links',
      'Track client engagement and questions'
    ],
    integrations: ['Transaction management systems', 'DocuSign', 'CRM', 'Calendar apps'],
    metrics: {
      efficiency: '+250%',
      responseTime: 'Real-time',
      timesSaved: '10 hrs/week'
    },
    pricing: {
      setup: '$600',
      monthly: '$99'
    },
    isPopular: true,
    icon: MessageSquare,
    color: 'from-purple-500 to-pink-500',
    tags: ['Transaction Management', 'Client Updates', 'Milestone Tracking'],
    useCase: 'Perfect for agents managing multiple transactions who want to provide exceptional client service',
    results: [
      'Reduced client anxiety and questions by 60%',
      'Improved client satisfaction scores by 40%',
      'Eliminated missed communication deadlines'
    ]
  },
  {
    id: 'birthday-anniversary',
    name: 'Client Birthday & Anniversary System',
    description: 'Never forget important dates with automated birthday, anniversary, and home-iversary campaigns.',
    category: 'client-communication',
    complexity: 'Simple',
    setupTime: '2-3 hours',
    timeSaved: '6 hours/week',
    triggeredBy: ['Client birthdays', 'Wedding anniversaries', 'Home purchase anniversaries', 'Holiday dates'],
    actions: [
      'Send personalized birthday and anniversary wishes',
      'Provide home value updates on home-iversaries',
      'Include market reports and neighborhood news',
      'Offer referral incentives and home services',
      'Track engagement and follow up personally'
    ],
    integrations: ['CRM databases', 'Email platforms', 'SMS services', 'Home value APIs'],
    metrics: {
      efficiency: '+400%',
      responseTime: 'Scheduled',
      timesSaved: '6 hrs/week'
    },
    pricing: {
      setup: '$400',
      monthly: '$69'
    },
    icon: Heart,
    color: 'from-red-500 to-pink-500',
    tags: ['Client Retention', 'Personal Touch', 'Referral Generation'],
    useCase: 'Great for building long-term relationships and generating referrals from past clients',
    results: [
      'Increased referral rate by 150%',
      'Improved client retention by 200%',
      'Generated 30% more repeat business'
    ]
  },
  {
    id: 'market-updates',
    name: 'Personalized Market Updates',
    description: 'Send targeted market reports based on client interests, locations, and transaction history.',
    category: 'client-communication',
    complexity: 'Medium',
    setupTime: '4-5 hours',
    timeSaved: '8 hours/week',
    triggeredBy: ['Monthly schedule', 'Market changes', 'New listings', 'Price changes'],
    actions: [
      'Generate neighborhood-specific market reports',
      'Include comparable sales and trends',
      'Add new listings matching client preferences',
      'Provide home value estimates',
      'Schedule quarterly market review calls'
    ],
    integrations: ['MLS systems', 'Market data APIs', 'Email platforms', 'Design tools'],
    metrics: {
      efficiency: '+200%',
      responseTime: 'Monthly/triggered',
      timesSaved: '8 hrs/week'
    },
    pricing: {
      setup: '$650',
      monthly: '$119'
    },
    icon: TrendingUp,
    color: 'from-blue-500 to-green-500',
    tags: ['Market Reports', 'Data-Driven', 'Client Education'],
    useCase: 'Essential for establishing expertise and staying top-of-mind with clients and prospects',
    results: [
      'Positioned as market expert with 90% of clients',
      'Increased listing appointments by 80%',
      'Generated 40% more buyer inquiries'
    ]
  },

  // LISTING MANAGEMENT WORKFLOWS
  {
    id: 'listing-marketing-blitz',
    name: 'Listing Marketing Blitz',
    description: 'Automatically market new listings across 50+ platforms within minutes of going live.',
    category: 'listing-management',
    complexity: 'Advanced',
    setupTime: '6-8 hours',
    timeSaved: '15 hours/week',
    triggeredBy: ['New MLS listing', 'Price changes', 'Status updates', 'Photo uploads'],
    actions: [
      'Distribute to all major real estate portals',
      'Create social media posts with property highlights',
      'Generate and send email campaigns to prospects',
      'Schedule open house events automatically',
      'Track views, leads, and engagement metrics'
    ],
    integrations: ['MLS', 'Zillow', 'Realtor.com', 'Facebook', 'Instagram', 'Email platforms'],
    metrics: {
      efficiency: '+500%',
      responseTime: '< 5 minutes',
      timesSaved: '15 hrs/week'
    },
    pricing: {
      setup: '$1,200',
      monthly: '$199'
    },
    isFeatured: true,
    icon: Globe,
    color: 'from-orange-500 to-red-500',
    tags: ['Listing Marketing', 'Multi-Platform', 'Maximum Exposure'],
    useCase: 'Perfect for listing agents who want maximum exposure and faster sales',
    results: [
      'Reduced average days on market by 35%',
      'Increased listing views by 400%',
      'Generated 300% more showing requests'
    ]
  },
  {
    id: 'price-change-alerts',
    name: 'Smart Price Change Automation',
    description: 'Monitor market conditions and automatically suggest price adjustments with supporting data.',
    category: 'listing-management',
    complexity: 'Medium',
    setupTime: '3-4 hours',
    timeSaved: '6 hours/week',
    triggeredBy: ['Days on market', 'Market shifts', 'Comparable sales', 'Activity levels'],
    actions: [
      'Analyze listing performance vs. market',
      'Generate price recommendation reports',
      'Send alerts to listing agents',
      'Prepare CMA updates for sellers',
      'Schedule seller consultation calls'
    ],
    integrations: ['MLS', 'Market data APIs', 'CRM', 'Reporting tools'],
    metrics: {
      efficiency: '+150%',
      responseTime: 'Weekly analysis',
      timesSaved: '6 hrs/week'
    },
    pricing: {
      setup: '$550',
      monthly: '$89'
    },
    icon: BarChart3,
    color: 'from-purple-500 to-blue-500',
    tags: ['Price Optimization', 'Market Analysis', 'Data-Driven'],
    useCase: 'Ideal for agents who want to optimize pricing strategies and improve time-to-sale',
    results: [
      'Improved sale price accuracy by 95%',
      'Reduced time on market by 25%',
      'Increased seller satisfaction by 80%'
    ]
  },
  {
    id: 'listing-photography',
    name: 'Photography & Media Automation',
    description: 'Automatically schedule photography, create virtual tours, and distribute media assets.',
    category: 'listing-management',
    complexity: 'Medium',
    setupTime: '4-5 hours',
    timeSaved: '8 hours/week',
    triggeredBy: ['Listing agreement signed', 'Photo upload', 'Media completion', 'Tour creation'],
    actions: [
      'Schedule professional photography automatically',
      'Create virtual tours and floor plans',
      'Generate property highlight videos',
      'Distribute media to all marketing channels',
      'Update MLS with high-quality assets'
    ],
    integrations: ['Photography vendors', 'Virtual tour platforms', 'MLS', 'Social media'],
    metrics: {
      efficiency: '+300%',
      responseTime: '24-48 hours',
      timesSaved: '8 hrs/week'
    },
    pricing: {
      setup: '$700',
      monthly: '$129'
    },
    icon: Camera,
    color: 'from-pink-500 to-purple-500',
    tags: ['Photography', 'Virtual Tours', 'Media Management'],
    useCase: 'Essential for agents who want professional marketing materials without the coordination hassle',
    results: [
      'Increased listing engagement by 250%',
      'Reduced time to first showing by 40%',
      'Improved photo quality consistency by 100%'
    ]
  },

  // TRANSACTION MANAGEMENT WORKFLOWS
  {
    id: 'contract-milestone-tracking',
    name: 'Contract Milestone Tracker',
    description: 'Automatically track and manage all contract deadlines, inspections, and closing requirements.',
    category: 'transaction-management',
    complexity: 'Advanced',
    setupTime: '5-7 hours',
    timeSaved: '12 hours/week',
    triggeredBy: ['Contract execution', 'Milestone dates', 'Document uploads', 'Deadline approaches'],
    actions: [
      'Create timeline with all critical dates',
      'Send reminder alerts 72, 24, and 2 hours before deadlines',
      'Track document completion status',
      'Coordinate with lenders, inspectors, and attorneys',
      'Update all parties on progress automatically'
    ],
    integrations: ['Transaction management systems', 'Calendar apps', 'DocuSign', 'CRM'],
    metrics: {
      efficiency: '+400%',
      responseTime: 'Proactive alerts',
      timesSaved: '12 hrs/week'
    },
    pricing: {
      setup: '$900',
      monthly: '$149'
    },
    isFeatured: true,
    icon: CheckCircle,
    color: 'from-green-500 to-blue-500',
    tags: ['Transaction Management', 'Deadline Tracking', 'Coordination'],
    useCase: 'Critical for agents managing multiple transactions who want to ensure nothing falls through the cracks',
    results: [
      'Reduced missed deadlines by 100%',
      'Improved closing rate by 15%',
      'Decreased transaction stress by 70%'
    ]
  },
  {
    id: 'closing-coordination',
    name: 'Automated Closing Coordination',
    description: 'Coordinate all closing activities, documents, and communications automatically.',
    category: 'transaction-management',
    complexity: 'Advanced',
    setupTime: '6-8 hours',
    timeSaved: '10 hours/week',
    triggeredBy: ['Clear to close', 'Final walkthrough', 'Closing scheduled', 'Document requests'],
    actions: [
      'Schedule final walkthrough automatically',
      'Coordinate with title company and lenders',
      'Send closing preparation checklists to clients',
      'Track wire transfer and document requirements',
      'Send post-closing follow-up sequences'
    ],
    integrations: ['Title companies', 'Lenders', 'Transaction platforms', 'Wire services'],
    metrics: {
      efficiency: '+350%',
      responseTime: 'Real-time coordination',
      timesSaved: '10 hrs/week'
    },
    pricing: {
      setup: '$1,000',
      monthly: '$169'
    },
    icon: FileText,
    color: 'from-indigo-500 to-purple-500',
    tags: ['Closing Coordination', 'Document Management', 'Final Steps'],
    useCase: 'Perfect for agents who want seamless closings and exceptional client experiences',
    results: [
      'Reduced closing delays by 80%',
      'Improved client satisfaction by 95%',
      'Eliminated closing day surprises'
    ]
  },

  // MARKETING WORKFLOWS
  {
    id: 'social-media-automation',
    name: 'Real Estate Social Media Automation',
    description: 'Automatically create, schedule, and post engaging real estate content across all platforms.',
    category: 'marketing',
    complexity: 'Medium',
    setupTime: '4-6 hours',
    timeSaved: '15 hours/week',
    triggeredBy: ['New listings', 'Market updates', 'Content calendar', 'Sold properties'],
    actions: [
      'Generate listing posts with property highlights',
      'Create market update graphics and captions',
      'Schedule success story posts automatically',
      'Share client testimonials and reviews',
      'Track engagement and optimize posting times'
    ],
    integrations: ['Facebook', 'Instagram', 'LinkedIn', 'TikTok', 'Design tools'],
    metrics: {
      efficiency: '+600%',
      responseTime: 'Scheduled posting',
      timesSaved: '15 hrs/week'
    },
    pricing: {
      setup: '$800',
      monthly: '$149'
    },
    isPopular: true,
    icon: Users,
    color: 'from-pink-500 to-red-500',
    tags: ['Social Media', 'Content Creation', 'Brand Building'],
    useCase: 'Essential for agents who want consistent social media presence without daily management',
    results: [
      'Increased social media engagement by 400%',
      'Generated 50% more leads from social media',
      'Built strong personal brand presence'
    ]
  },
  {
    id: 'email-drip-campaigns',
    name: 'Intelligent Email Drip Campaigns',
    description: 'Send personalized email sequences based on client type, interests, and behavior.',
    category: 'marketing',
    complexity: 'Medium',
    setupTime: '5-6 hours',
    timeSaved: '12 hours/week',
    triggeredBy: ['Lead source', 'Client behavior', 'Property interests', 'Engagement levels'],
    actions: [
      'Segment contacts by buyer/seller/investor type',
      'Send targeted content sequences automatically',
      'Include relevant listings and market updates',
      'Track opens, clicks, and engagement',
      'Adjust sequences based on response rates'
    ],
    integrations: ['Email platforms', 'CRM', 'MLS', 'Analytics tools'],
    metrics: {
      efficiency: '+450%',
      responseTime: 'Behavioral triggers',
      timesSaved: '12 hrs/week'
    },
    pricing: {
      setup: '$650',
      monthly: '$99'
    },
    icon: Mail,
    color: 'from-blue-500 to-teal-500',
    tags: ['Email Marketing', 'Lead Nurturing', 'Personalization'],
    useCase: 'Perfect for building relationships and staying top-of-mind with prospects and clients',
    results: [
      'Increased email engagement by 300%',
      'Generated 60% more qualified leads',
      'Improved client retention by 180%'
    ]
  },

  // REPORTING WORKFLOWS
  {
    id: 'performance-dashboards',
    name: 'Automated Performance Dashboards',
    description: 'Generate comprehensive business performance reports automatically every week.',
    category: 'reporting',
    complexity: 'Advanced',
    setupTime: '6-8 hours',
    timeSaved: '8 hours/week',
    triggeredBy: ['Weekly schedule', 'Month-end', 'Quarter-end', 'Campaign completion'],
    actions: [
      'Compile sales and listing performance data',
      'Generate lead source and conversion reports',
      'Create ROI analysis for marketing campaigns',
      'Track goal progress and projections',
      'Send automated reports to team and stakeholders'
    ],
    integrations: ['CRM', 'MLS', 'Google Analytics', 'Marketing platforms', 'Financial tools'],
    metrics: {
      efficiency: '+500%',
      responseTime: 'Scheduled reports',
      timesSaved: '8 hrs/week'
    },
    pricing: {
      setup: '$1,100',
      monthly: '$199'
    },
    icon: BarChart3,
    color: 'from-purple-500 to-pink-500',
    tags: ['Business Intelligence', 'Performance Tracking', 'ROI Analysis'],
    useCase: 'Essential for data-driven agents who want to optimize their business performance',
    results: [
      'Improved decision-making speed by 300%',
      'Increased marketing ROI by 150%',
      'Identified new growth opportunities'
    ]
  }
]

export const workflowCategories = [
  {
    id: 'all',
    name: 'All Workflows',
    icon: Workflow,
    description: 'View our complete workflow automation library',
    color: 'from-purple-500 to-primary-600'
  },
  {
    id: 'lead-generation',
    name: 'Lead Generation',
    icon: Target,
    description: 'Capture and qualify leads automatically',
    color: 'from-blue-500 to-primary-600'
  },
  {
    id: 'client-communication',
    name: 'Client Communication',
    icon: MessageSquare,
    description: 'Keep clients engaged throughout transactions',
    color: 'from-green-500 to-primary-600'
  },
  {
    id: 'listing-management',
    name: 'Listing Management',
    icon: FileText,
    description: 'Automate listing marketing and management',
    color: 'from-orange-500 to-primary-600'
  },
  {
    id: 'transaction-management',
    name: 'Transaction Management',
    icon: CheckCircle,
    description: 'Streamline deals from contract to closing',
    color: 'from-pink-500 to-primary-600'
  },
  {
    id: 'marketing',
    name: 'Marketing Automation',
    icon: Users,
    description: 'Automate social media and marketing campaigns',
    color: 'from-indigo-500 to-primary-600'
  },
  {
    id: 'reporting',
    name: 'Business Intelligence',
    icon: BarChart3,
    description: 'Automated reporting and performance tracking',
    color: 'from-purple-500 to-primary-600'
  }
]