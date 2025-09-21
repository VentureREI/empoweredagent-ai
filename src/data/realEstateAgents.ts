import {
  TrendingUp,
  MessageSquare,
  BarChart3,
  FileText,
  Workflow,
  Calendar,
  Phone,
  Mail,
  Camera,
  Users,
  Shield,
  Bot,
  Globe,
  Search,
  Heart,
  Building2,
  MapPin,
  DollarSign
} from 'lucide-react'

export const realEstateAgents = [
  // Lead Generation
  {
    name: 'Lead Response Agent',
    description: 'Instantly responds to new leads from Zillow, Realtor.com, and your website with personalized messages and qualification questions.',
    category: 'leads',
    industry: 'Real Estate',
    complexity: 'Advanced' as const,
    integrations: ['Zillow', 'Realtor.com', 'MLS', 'KvCORE', 'Chime'],
    features: [
      'Instant lead response (under 60 seconds)',
      'Qualification scoring and routing',
      'Multi-channel follow-up sequences',
      'Lead source tracking and analytics',
      'CRM integration and sync'
    ],
    metrics: {
      timesSaved: '15 hrs/week',
      efficiency: '5x faster response',
      roi: '300% more appointments'
    },
    deploymentTime: '2-3 weeks',
    pricing: {
      setup: '$8,500',
      monthly: '$850/month'
    },
    icon: TrendingUp,
    isPopular: true
  },
  {
    name: 'Lead Nurture Agent',
    description: 'Keeps prospects engaged with relevant property updates, market insights, and personalized content based on their preferences.',
    category: 'leads',
    complexity: 'Medium' as const,
    integrations: ['MLS', 'Email platforms', 'SMS services', 'Social media'],
    features: [
      'Property matching and alerts',
      'Market report generation',
      'Personalized content delivery',
      'Engagement tracking and scoring'
    ],
    metrics: {
      efficiency: '40% higher conversion',
      timesSaved: '10 hrs/week'
    },
    deploymentTime: '1-2 weeks',
    pricing: {
      setup: '$4,500',
      monthly: '$450/month'
    },
    icon: Heart
  },
  {
    name: 'Referral Follow-up Agent',
    description: 'Automatically follows up with past clients for reviews, referrals, and repeat business opportunities.',
    category: 'leads',
    complexity: 'Medium' as const,
    integrations: ['CRM', 'Email', 'SMS', 'Review platforms'],
    features: [
      'Automated review requests',
      'Referral campaign management',
      'Client anniversary reminders',
      'Social media engagement'
    ],
    metrics: {
      efficiency: '3x more referrals',
      roi: '250% increase'
    },
    deploymentTime: '1-2 weeks',
    icon: Users
  },

  // Client Communication
  {
    name: 'Transaction Update Agent',
    description: 'Keeps buyers and sellers informed throughout the transaction process with automated status updates and milestone notifications.',
    category: 'client',
    industry: 'Real Estate',
    complexity: 'Advanced' as const,
    integrations: ['Transaction management systems', 'Email', 'SMS', 'DocuSign'],
    features: [
      'Automated transaction updates',
      'Milestone notifications',
      'Document request reminders',
      'Client portal integration'
    ],
    metrics: {
      efficiency: '95% client satisfaction',
      timesSaved: '12 hrs/week'
    },
    deploymentTime: '3-4 weeks',
    pricing: {
      setup: '$7,500',
      monthly: '$750/month'
    },
    icon: MessageSquare,
    isFeatured: true
  },
  {
    name: 'Showing Coordinator Agent',
    description: 'Handles showing requests, calendar management, and coordinates with listing agents automatically.',
    category: 'client',
    complexity: 'Medium' as const,
    integrations: ['Calendar apps', 'MLS', 'Showing services', 'SMS'],
    features: [
      'Automated showing scheduling',
      'Calendar conflict resolution',
      'Reminder notifications',
      'Feedback collection'
    ],
    metrics: {
      efficiency: '60% more showings',
      timesSaved: '8 hrs/week'
    },
    deploymentTime: '2-3 weeks',
    icon: Calendar
  },
  {
    name: 'Client Check-in Agent',
    description: 'Maintains regular contact with clients throughout their home buying/selling journey with personalized messages.',
    category: 'client',
    complexity: 'Simple' as const,
    integrations: ['CRM', 'Email', 'SMS'],
    features: [
      'Scheduled check-in messages',
      'Mood and satisfaction tracking',
      'Resource sharing',
      'Event invitations'
    ],
    metrics: {
      efficiency: '80% client retention',
      timesSaved: '6 hrs/week'
    },
    deploymentTime: '1-2 weeks',
    icon: Phone
  },

  // Listing Management
  {
    name: 'Listing Creation Agent',
    description: 'Automatically creates optimized property listings with AI-generated descriptions, pricing analysis, and photo enhancement.',
    category: 'listings',
    industry: 'Real Estate',
    complexity: 'Advanced' as const,
    integrations: ['MLS', 'Zillow', 'Realtor.com', 'Photo editing tools'],
    features: [
      'AI-powered listing descriptions',
      'Competitive pricing analysis',
      'Photo enhancement and staging',
      'Multi-platform syndication'
    ],
    metrics: {
      efficiency: '70% faster listings',
      roi: '25% higher sale prices'
    },
    deploymentTime: '3-4 weeks',
    pricing: {
      setup: '$9,500',
      monthly: '$950/month'
    },
    icon: Building2,
    isPopular: true
  },
  {
    name: 'Market Analysis Agent',
    description: 'Generates comprehensive market reports, CMAs, and neighborhood analytics for listings and clients.',
    category: 'listings',
    complexity: 'Advanced' as const,
    integrations: ['MLS', 'Public records', 'Market data sources'],
    features: [
      'Automated CMA generation',
      'Market trend analysis',
      'Neighborhood statistics',
      'Investment property analysis'
    ],
    metrics: {
      efficiency: '90% faster CMAs',
      timesSaved: '15 hrs/week'
    },
    deploymentTime: '4-5 weeks',
    icon: BarChart3
  },
  {
    name: 'Property Marketing Agent',
    description: 'Creates and distributes property marketing materials across social media, email campaigns, and advertising platforms.',
    category: 'listings',
    complexity: 'Medium' as const,
    integrations: ['Social media', 'Email platforms', 'Ad networks'],
    features: [
      'Social media post creation',
      'Email campaign automation',
      'Ad campaign optimization',
      'Performance tracking'
    ],
    metrics: {
      efficiency: '200% more exposure',
      roi: '35% faster sales'
    },
    deploymentTime: '2-3 weeks',
    icon: Globe
  },

  // Transaction Management
  {
    name: 'Contract Management Agent',
    description: 'Tracks contract terms, contingency deadlines, and important dates to ensure smooth transactions.',
    category: 'transactions',
    industry: 'Real Estate',
    complexity: 'Advanced' as const,
    integrations: ['DocuSign', 'Transaction platforms', 'Calendar', 'CRM'],
    features: [
      'Deadline tracking and alerts',
      'Contingency monitoring',
      'Document management',
      'Commission calculations'
    ],
    metrics: {
      efficiency: '99% on-time closings',
      timesSaved: '20 hrs/week'
    },
    deploymentTime: '4-6 weeks',
    pricing: {
      setup: '$12,000',
      monthly: '$1,200/month'
    },
    icon: FileText,
    isFeatured: true
  },
  {
    name: 'Closing Coordinator Agent',
    description: 'Manages the closing process, coordinates with all parties, and ensures all requirements are met.',
    category: 'transactions',
    complexity: 'Advanced' as const,
    integrations: ['Title companies', 'Lenders', 'Inspectors', 'Attorneys'],
    features: [
      'Closing timeline management',
      'Party coordination',
      'Document verification',
      'Issue resolution tracking'
    ],
    metrics: {
      efficiency: '85% fewer delays',
      roi: '95% closing rate'
    },
    deploymentTime: '5-7 weeks',
    icon: Shield
  },
  {
    name: 'Commission Tracking Agent',
    description: 'Monitors deal progress, calculates commissions, and tracks payments with detailed financial reporting.',
    category: 'transactions',
    complexity: 'Medium' as const,
    integrations: ['Transaction platforms', 'Accounting software', 'Banking'],
    features: [
      'Deal pipeline tracking',
      'Commission calculations',
      'Payment monitoring',
      'Financial reporting'
    ],
    metrics: {
      efficiency: '100% accurate tracking',
      timesSaved: '8 hrs/week'
    },
    deploymentTime: '2-3 weeks',
    icon: DollarSign
  },

  // Marketing Automation
  {
    name: 'Social Media Agent',
    description: 'Maintains consistent social presence with property posts, market insights, and community engagement.',
    category: 'marketing',
    complexity: 'Medium' as const,
    integrations: ['Facebook', 'Instagram', 'LinkedIn', 'Twitter'],
    features: [
      'Automated post scheduling',
      'Content creation and curation',
      'Engagement monitoring',
      'Hashtag optimization'
    ],
    metrics: {
      efficiency: '300% more followers',
      roi: '150% lead increase'
    },
    deploymentTime: '1-2 weeks',
    pricing: {
      setup: '$3,500',
      monthly: '$350/month'
    },
    icon: Workflow
  },
  {
    name: 'Email Campaign Agent',
    description: 'Sends targeted email campaigns to different client segments with market updates and property alerts.',
    category: 'marketing',
    complexity: 'Medium' as const,
    integrations: ['Email platforms', 'CRM', 'MLS'],
    features: [
      'Segmented email campaigns',
      'Drip sequence automation',
      'A/B testing optimization',
      'Performance analytics'
    ],
    metrics: {
      efficiency: '400% higher engagement',
      roi: '200% more conversions'
    },
    deploymentTime: '2-3 weeks',
    icon: Mail
  },
  {
    name: 'Video Marketing Agent',
    description: 'Creates automated video content for property tours, market updates, and client testimonials.',
    category: 'marketing',
    complexity: 'Advanced' as const,
    integrations: ['Video platforms', 'MLS', 'Social media'],
    features: [
      'Automated video creation',
      'Virtual tour generation',
      'Market update videos',
      'Social media optimization'
    ],
    metrics: {
      efficiency: '500% more views',
      roi: '180% engagement boost'
    },
    deploymentTime: '3-4 weeks',
    icon: Camera
  }
]