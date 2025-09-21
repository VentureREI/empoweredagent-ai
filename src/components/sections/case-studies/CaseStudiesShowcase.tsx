'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Building2, Users, DollarSign, TrendingUp, MapPin, Calendar,
  Star, CheckCircle, ArrowRight, Filter, Search, Play,
  Award, Target, BarChart3, Clock, Shield, Eye
} from 'lucide-react'

const caseStudies = [
  {
    id: 1,
    title: 'Premium Properties Group Transformation',
    client: 'Premium Properties Group',
    location: 'Orange County, CA',
    industry: 'Luxury Residential',
    businessType: 'Real Estate Team',
    teamSize: '12 agents',
    timeframe: '18 months',
    implementationDate: 'January 2022',
    verificationStatus: 'Third-party verified',
    thumbnail: '/case-studies/premium-properties-thumb.jpg',
    videoUrl: '/case-studies/premium-properties-video.mp4',
    clientLogo: '/logos/premium-properties.png',
    beforeMetrics: {
      revenue: '$2.1M',
      deals: 89,
      marketShare: '3.2%',
      avgDealSize: '$23.6K',
      leadConversion: '8%',
      responseTime: '4.2 hours',
      clientSatisfaction: '3.8/5'
    },
    afterMetrics: {
      revenue: '$8.7M',
      deals: 247,
      marketShare: '12.4%',
      avgDealSize: '$35.2K',
      leadConversion: '24%',
      responseTime: '8 minutes',
      clientSatisfaction: '4.9/5'
    },
    keyResults: [
      { metric: 'Revenue Growth', value: '+314%', description: 'Quadrupled annual revenue' },
      { metric: 'Market Share', value: '+287%', description: 'Became #1 luxury team in OC' },
      { metric: 'Deal Volume', value: '+177%', description: 'Nearly tripled transactions' },
      { metric: 'Efficiency', value: '+421%', description: 'Dramatically faster response times' }
    ],
    challenges: [
      'Manual lead management causing delays',
      'No centralized client communication',
      'Difficulty tracking agent performance',
      'Limited market analysis capabilities'
    ],
    solutions: [
      'Automated lead routing and scoring',
      'Unified communication platform',
      'Real-time performance analytics',
      'Advanced market intelligence tools'
    ],
    testimonial: {
      quote: "In 18 months, we went from a struggling mid-tier team to the #1 luxury real estate team in Orange County. The platform didn't just improve our efficiency—it completely transformed how we do business.",
      author: 'Jennifer Walsh',
      title: 'Team Leader & Principal Agent',
      photo: '/testimonials/jennifer-walsh.jpg'
    },
    tags: ['Luxury Real Estate', 'Team Growth', 'Market Leadership', 'ROI Excellence'],
    featured: true,
    roi: '847%'
  },
  {
    id: 2,
    title: 'Metropolitan Realty Multi-Office Expansion',
    client: 'Metropolitan Realty',
    location: 'Chicago, IL',
    industry: 'Full-Service Brokerage',
    businessType: 'Real Estate Brokerage',
    teamSize: '89 agents',
    timeframe: '24 months',
    implementationDate: 'March 2021',
    verificationStatus: 'Auditor verified',
    thumbnail: '/case-studies/metropolitan-realty-thumb.jpg',
    videoUrl: '/case-studies/metropolitan-realty-video.mp4',
    clientLogo: '/logos/metropolitan-realty.png',
    beforeMetrics: {
      revenue: '$14.6M',
      deals: 432,
      marketShare: '4.7%',
      avgDealSize: '$33.8K',
      leadConversion: '11%',
      responseTime: '2.1 hours',
      clientSatisfaction: '4.1/5'
    },
    afterMetrics: {
      revenue: '$41.2M',
      deals: 1247,
      marketShare: '8.9%',
      avgDealSize: '$33.1K',
      leadConversion: '28%',
      responseTime: '12 minutes',
      clientSatisfaction: '4.8/5'
    },
    keyResults: [
      { metric: 'Revenue Growth', value: '+182%', description: 'Nearly tripled brokerage revenue' },
      { metric: 'Office Expansion', value: '4 offices', description: 'Expanded from 1 to 4 locations' },
      { metric: 'Agent Productivity', value: '+156%', description: 'Significant per-agent improvements' },
      { metric: 'Market Share', value: '+89%', description: 'Doubled Chicago market presence' }
    ],
    challenges: [
      'Managing multiple office locations',
      'Inconsistent agent training and processes',
      'Complex commission structures',
      'Lack of unified reporting across offices'
    ],
    solutions: [
      'Multi-office management platform',
      'Standardized training and onboarding',
      'Automated commission calculations',
      'Centralized analytics and reporting'
    ],
    testimonial: {
      quote: "Managing 89 agents across 4 offices used to be a nightmare. Now we have complete visibility into every aspect of our operation, and our agents are more productive than ever.",
      author: 'Robert Kim',
      title: 'Principal Broker',
      photo: '/testimonials/robert-kim.jpg'
    },
    tags: ['Multi-Office', 'Brokerage Growth', 'Agent Management', 'Scalability'],
    featured: false,
    roi: '623%'
  },
  {
    id: 3,
    title: 'Coastal Homes Vacation Rental Dominance',
    client: 'Coastal Homes Realty',
    location: 'Miami, FL',
    industry: 'Vacation Rental Specialist',
    businessType: 'Niche Specialist Team',
    teamSize: '8 agents',
    timeframe: '12 months',
    implementationDate: 'June 2022',
    verificationStatus: 'Client verified',
    thumbnail: '/case-studies/coastal-homes-thumb.jpg',
    videoUrl: '/case-studies/coastal-homes-video.mp4',
    clientLogo: '/logos/coastal-homes.png',
    beforeMetrics: {
      revenue: '$1.8M',
      deals: 67,
      marketShare: '6.3%',
      avgDealSize: '$26.9K',
      leadConversion: '16%',
      responseTime: '45 minutes',
      clientSatisfaction: '4.3/5'
    },
    afterMetrics: {
      revenue: '$6.3M',
      deals: 189,
      marketShare: '15.7%',
      avgDealSize: '$33.3K',
      leadConversion: '38%',
      responseTime: '3 minutes',
      clientSatisfaction: '4.9/5'
    },
    keyResults: [
      { metric: 'Revenue Growth', value: '+250%', description: 'Exceptional niche market growth' },
      { metric: 'Market Dominance', value: '#1 position', description: 'Became top vacation rental team' },
      { metric: 'Conversion Rate', value: '+138%', description: 'Industry-leading lead conversion' },
      { metric: 'Response Speed', value: '+93%', description: 'Near-instant lead response' }
    ],
    challenges: [
      'Highly competitive vacation rental market',
      'Seasonal demand fluctuations',
      'Complex property management needs',
      'Limited marketing budget vs. larger competitors'
    ],
    solutions: [
      'Vacation rental-specific CRM features',
      'Seasonal demand forecasting tools',
      'Integrated property management systems',
      'Cost-effective digital marketing automation'
    ],
    testimonial: {
      quote: "As a small team, we never thought we could compete with the big players in Miami's vacation rental market. This platform gave us enterprise-level capabilities that helped us dominate our niche.",
      author: 'Maria Gonzalez',
      title: 'Broker/Owner',
      photo: '/testimonials/maria-gonzalez.jpg'
    },
    tags: ['Vacation Rentals', 'Niche Domination', 'Small Team Success', 'Market Leadership'],
    featured: true,
    roi: '1,247%'
  },
  {
    id: 4,
    title: 'Texas Commercial Group Enterprise Growth',
    client: 'Texas Commercial Group',
    location: 'Dallas, TX',
    industry: 'Commercial Real Estate',
    businessType: 'Commercial Brokerage',
    teamSize: '156 agents',
    timeframe: '36 months',
    implementationDate: 'September 2020',
    verificationStatus: 'Third-party verified',
    thumbnail: '/case-studies/texas-commercial-thumb.jpg',
    videoUrl: '/case-studies/texas-commercial-video.mp4',
    clientLogo: '/logos/texas-commercial.png',
    beforeMetrics: {
      revenue: '$24.7M',
      deals: 234,
      marketShare: '11.2%',
      avgDealSize: '$105.6K',
      leadConversion: '9%',
      responseTime: '3.7 hours',
      clientSatisfaction: '4.0/5'
    },
    afterMetrics: {
      revenue: '$67.9M',
      deals: 489,
      marketShare: '19.8%',
      avgDealSize: '$138.9K',
      leadConversion: '22%',
      responseTime: '18 minutes',
      clientSatisfaction: '4.7/5'
    },
    keyResults: [
      { metric: 'Revenue Growth', value: '+175%', description: 'Significant commercial portfolio growth' },
      { metric: 'Deal Volume', value: '+109%', description: 'Doubled transaction volume' },
      { metric: 'Market Position', value: 'Top 3', description: 'Became top 3 commercial brokerage' },
      { metric: 'Agent Efficiency', value: '+234%', description: 'Improved agent productivity' }
    ],
    challenges: [
      'Complex commercial deal structures',
      'Long sales cycles requiring detailed tracking',
      'Multiple stakeholder coordination',
      'Compliance and documentation requirements'
    ],
    solutions: [
      'Commercial-specific deal management',
      'Advanced pipeline tracking and forecasting',
      'Multi-party collaboration tools',
      'Automated compliance documentation'
    ],
    testimonial: {
      quote: "Commercial real estate is complex, but this platform simplified our operations while giving us the sophisticated tools we need to handle multi-million dollar transactions with confidence.",
      author: 'David Chen',
      title: 'Managing Principal',
      photo: '/testimonials/david-chen.jpg'
    },
    tags: ['Commercial Real Estate', 'Enterprise Growth', 'Complex Transactions', 'Compliance'],
    featured: false,
    roi: '534%'
  },
  {
    id: 5,
    title: 'Mountain View Realty Rural Market Success',
    client: 'Mountain View Realty',
    location: 'Bozeman, MT',
    industry: 'Rural/Ranch Properties',
    businessType: 'Specialty Brokerage',
    teamSize: '23 agents',
    timeframe: '15 months',
    implementationDate: 'April 2022',
    verificationStatus: 'Client verified',
    thumbnail: '/case-studies/mountain-view-thumb.jpg',
    videoUrl: '/case-studies/mountain-view-video.mp4',
    clientLogo: '/logos/mountain-view.png',
    beforeMetrics: {
      revenue: '$3.2M',
      deals: 128,
      marketShare: '8.7%',
      avgDealSize: '$25.0K',
      leadConversion: '14%',
      responseTime: '2.8 hours',
      clientSatisfaction: '4.2/5'
    },
    afterMetrics: {
      revenue: '$8.1M',
      deals: 267,
      marketShare: '18.9%',
      avgDealSize: '$30.3K',
      leadConversion: '31%',
      responseTime: '22 minutes',
      clientSatisfaction: '4.8/5'
    },
    keyResults: [
      { metric: 'Revenue Growth', value: '+153%', description: 'Exceptional rural market growth' },
      { metric: 'Market Share', value: '+117%', description: 'Doubled regional market share' },
      { metric: 'Deal Efficiency', value: '+108%', description: 'Significantly more deals closed' },
      { metric: 'Client Satisfaction', value: '+14%', description: 'Industry-leading satisfaction' }
    ],
    challenges: [
      'Serving large geographic rural areas',
      'Limited internet connectivity in some regions',
      'Unique property types requiring specialized knowledge',
      'Seasonal market fluctuations'
    ],
    solutions: [
      'Mobile-optimized offline capabilities',
      'Regional connectivity optimization',
      'Specialized rural property tools',
      'Seasonal market analysis and planning'
    ],
    testimonial: {
      quote: "Rural real estate has unique challenges, but this platform adapted perfectly to our needs. We're now the dominant force in Montana's ranch and rural property market.",
      author: 'Sarah Thompson',
      title: 'Broker/Owner',
      photo: '/testimonials/sarah-thompson.jpg'
    },
    tags: ['Rural Properties', 'Geographic Challenges', 'Market Adaptation', 'Regional Leadership'],
    featured: false,
    roi: '423%'
  },
  {
    id: 6,
    title: 'Urban Luxury Collective City Dominance',
    client: 'Urban Luxury Collective',
    location: 'New York, NY',
    industry: 'Ultra-Luxury Residential',
    businessType: 'Luxury Specialist Team',
    teamSize: '18 agents',
    timeframe: '21 months',
    implementationDate: 'August 2021',
    verificationStatus: 'Third-party verified',
    thumbnail: '/case-studies/urban-luxury-thumb.jpg',
    videoUrl: '/case-studies/urban-luxury-video.mp4',
    clientLogo: '/logos/urban-luxury.png',
    beforeMetrics: {
      revenue: '$4.8M',
      deals: 34,
      marketShare: '2.1%',
      avgDealSize: '$141.2K',
      leadConversion: '6%',
      responseTime: '6.2 hours',
      clientSatisfaction: '4.1/5'
    },
    afterMetrics: {
      revenue: '$18.7M',
      deals: 89,
      marketShare: '7.8%',
      avgDealSize: '$210.1K',
      leadConversion: '19%',
      responseTime: '12 minutes',
      clientSatisfaction: '4.9/5'
    },
    keyResults: [
      { metric: 'Revenue Growth', value: '+290%', description: 'Exceptional luxury market growth' },
      { metric: 'Deal Value', value: '+49%', description: 'Higher value transactions' },
      { metric: 'Market Position', value: 'Top 5', description: 'Entered top 5 luxury teams in NYC' },
      { metric: 'Client Experience', value: '+20%', description: 'Premium client satisfaction' }
    ],
    challenges: [
      'Ultra-competitive NYC luxury market',
      'High-net-worth client expectations',
      'Complex international transactions',
      'Discretion and privacy requirements'
    ],
    solutions: [
      'Luxury-specific CRM and marketing tools',
      'White-glove client experience platform',
      'International transaction support',
      'Advanced privacy and security features'
    ],
    testimonial: {
      quote: "In New York's ultra-competitive luxury market, this platform gave us the edge we needed. Our clients expect perfection, and now we can deliver it consistently.",
      author: 'Alexander Morrison',
      title: 'Luxury Division Director',
      photo: '/testimonials/alexander-morrison.jpg'
    },
    tags: ['Ultra-Luxury', 'NYC Market', 'High-Net-Worth', 'Premium Service'],
    featured: true,
    roi: '789%'
  }
]

const filterOptions = {
  businessType: ['All', 'Real Estate Team', 'Real Estate Brokerage', 'Niche Specialist Team', 'Commercial Brokerage', 'Specialty Brokerage', 'Luxury Specialist Team'],
  industry: ['All', 'Luxury Residential', 'Full-Service Brokerage', 'Vacation Rental Specialist', 'Commercial Real Estate', 'Rural/Ranch Properties', 'Ultra-Luxury Residential'],
  teamSize: ['All', 'Small (1-15)', 'Medium (16-50)', 'Large (51-100)', 'Enterprise (100+)'],
  timeframe: ['All', '6-12 months', '12-18 months', '18-24 months', '24+ months']
}

export default function CaseStudiesShowcase() {
  const [selectedFilters, setSelectedFilters] = useState({
    businessType: 'All',
    industry: 'All',
    teamSize: 'All',
    timeframe: 'All'
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCase, setSelectedCase] = useState<any>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const getTeamSizeCategory = (teamSize: string) => {
    const num = parseInt(teamSize)
    if (num <= 15) return 'Small (1-15)'
    if (num <= 50) return 'Medium (16-50)'
    if (num <= 100) return 'Large (51-100)'
    return 'Enterprise (100+)'
  }

  const getTimeframeCategory = (timeframe: string) => {
    const months = parseInt(timeframe)
    if (months <= 12) return '6-12 months'
    if (months <= 18) return '12-18 months'
    if (months <= 24) return '18-24 months'
    return '24+ months'
  }

  const filteredCaseStudies = caseStudies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesBusinessType = selectedFilters.businessType === 'All' || study.businessType === selectedFilters.businessType
    const matchesIndustry = selectedFilters.industry === 'All' || study.industry === selectedFilters.industry
    const matchesTeamSize = selectedFilters.teamSize === 'All' || getTeamSizeCategory(study.teamSize) === selectedFilters.teamSize
    const matchesTimeframe = selectedFilters.timeframe === 'All' || getTimeframeCategory(study.timeframe) === selectedFilters.timeframe

    return matchesSearch && matchesBusinessType && matchesIndustry && matchesTeamSize && matchesTimeframe
  })

  const featuredCases = filteredCaseStudies.filter(study => study.featured)
  const regularCases = filteredCaseStudies.filter(study => !study.featured)

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BarChart3 className="h-4 w-4" />
            Complete Case Study Library
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Explore Success Stories by
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 block">
              Industry & Business Type
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Filter through our comprehensive library of verified case studies.
            Every metric verified, every transformation documented.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-xl p-6 mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search case studies by client, location, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(filterOptions).map(([filterKey, options]) => (
                <div key={filterKey}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {filterKey.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <select
                    value={selectedFilters[filterKey as keyof typeof selectedFilters]}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, [filterKey]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {filteredCaseStudies.length} of {caseStudies.length} case studies
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <BarChart3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Users className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Featured Cases */}
        {featuredCases.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              Featured Success Stories
            </h3>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredCases.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedCase(study)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <span className="text-sm font-medium text-purple-700">Featured Case</span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{study.client}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {study.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {study.industry}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">
                        {study.keyResults[0].value}
                      </div>
                      <div className="text-sm text-gray-600">ROI Growth</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {study.keyResults.slice(0, 3).map((result, idx) => (
                      <div key={idx} className="text-center p-3 bg-white rounded-lg">
                        <div className="text-lg font-bold text-gray-900">{result.value}</div>
                        <div className="text-xs text-gray-600">{result.metric}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{study.verificationStatus}</span>
                    </div>
                    <button className="flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700">
                      View Full Case Study
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Cases */}
        {regularCases.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">All Case Studies</h3>

            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {regularCases.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    viewMode === 'list' ? 'flex items-center gap-6 p-6' : 'p-6'
                  }`}
                  onClick={() => setSelectedCase(study)}
                >
                  {viewMode === 'grid' ? (
                    <>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{study.client}</h4>
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {study.location}
                          </div>
                          <div className="text-sm text-purple-600 font-medium">{study.industry}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{study.roi}%</div>
                          <div className="text-xs text-gray-600">ROI</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="font-semibold text-gray-900">{study.afterMetrics.revenue}</div>
                          <div className="text-xs text-gray-600">Revenue</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="font-semibold text-gray-900">{study.afterMetrics.deals}</div>
                          <div className="text-xs text-gray-600">Deals</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">{study.timeframe}</div>
                        <button className="text-purple-600 hover:text-purple-700">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h4 className="text-xl font-bold text-gray-900">{study.client}</h4>
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                            {study.industry}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {study.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {study.teamSize}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {study.timeframe}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-green-600">{study.roi}%</div>
                        <div className="text-sm text-gray-600">ROI Increase</div>
                        <div className="text-lg font-semibold text-gray-900 mt-1">{study.afterMetrics.revenue}</div>
                        <div className="text-sm text-gray-600">Final Revenue</div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {filteredCaseStudies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No case studies found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </section>
  )
}