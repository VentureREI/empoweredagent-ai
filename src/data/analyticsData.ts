import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Users,
  DollarSign,
  MapPin,
  Target,
  Activity,
  Calendar,
  Brain,
  Zap,
  Shield,
  Clock,
  Building,
  Home,
  ArrowUpRight,
  ArrowDownRight,
  Database,
  FileText,
  Bell,
  Search,
  Calculator
} from 'lucide-react'

export interface AnalyticsTemplate {
  id: string
  name: string
  description: string
  category: 'market-intelligence' | 'portfolio-management' | 'lead-analytics' | 'financial-reporting' | 'predictive-modeling' | 'competitive-analysis'
  complexity: 'Simple' | 'Medium' | 'Advanced'
  setupTime: string
  icon: any
  color: string
  isPopular?: boolean
  isFeatured?: boolean
  metrics: {
    accuracyRate?: string
    timeSaved?: string
    roiIncrease?: string
    dataPoints?: string
  }
  features: string[]
  dataSource: string[]
  visualizations: string[]
  pricing: {
    setup: string
    monthly: string
  }
  tags: string[]
  useCase: string
  benefits: string[]
}

export interface AnalyticsCategory {
  id: string
  name: string
  description: string
  icon: any
  color: string
  count: number
}

export const analyticsCategories: AnalyticsCategory[] = [
  {
    id: 'all',
    name: 'All Analytics',
    description: 'Complete suite',
    icon: BarChart3,
    color: 'from-blue-500 to-cyan-600',
    count: 18
  },
  {
    id: 'market-intelligence',
    name: 'Market Intelligence',
    description: 'Market trends & predictions',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-600',
    count: 4
  },
  {
    id: 'portfolio-management',
    name: 'Portfolio Analytics',
    description: 'Property performance tracking',
    icon: Building,
    color: 'from-purple-500 to-violet-600',
    count: 3
  },
  {
    id: 'lead-analytics',
    name: 'Lead Intelligence',
    description: 'Lead scoring & conversion',
    icon: Users,
    color: 'from-orange-500 to-red-600',
    count: 3
  },
  {
    id: 'financial-reporting',
    name: 'Financial Reports',
    description: 'Revenue & ROI analytics',
    icon: DollarSign,
    color: 'from-yellow-500 to-orange-600',
    count: 3
  },
  {
    id: 'predictive-modeling',
    name: 'Predictive Models',
    description: 'AI-powered forecasting',
    icon: Brain,
    color: 'from-pink-500 to-rose-600',
    count: 3
  },
  {
    id: 'competitive-analysis',
    name: 'Competitive Intel',
    description: 'Market positioning',
    icon: Target,
    color: 'from-indigo-500 to-blue-600',
    count: 2
  }
]

export const analyticsTemplates: AnalyticsTemplate[] = [
  // Market Intelligence
  {
    id: 'market-trends-dashboard',
    name: 'Real-Time Market Trends Dashboard',
    description: 'Live market data with predictive analytics showing price movements, inventory levels, and demand forecasts across your target markets.',
    category: 'market-intelligence',
    complexity: 'Medium',
    setupTime: '2-3 days',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-600',
    isPopular: true,
    metrics: {
      accuracyRate: '94% prediction accuracy',
      timeSaved: '25 hrs/week research',
      dataPoints: '2M+ properties tracked'
    },
    features: [
      'Real-time price trend analysis',
      'Inventory level monitoring',
      'Demand forecasting algorithms',
      'Market heat maps',
      'Comparative market analysis automation',
      'Custom market alerts'
    ],
    dataSource: ['MLS Data', 'Public Records', 'Market APIs', 'Economic Indicators'],
    visualizations: ['Trend Lines', 'Heat Maps', 'Comparative Charts', 'Forecasting Graphs'],
    pricing: {
      setup: '$1,200',
      monthly: '$299/mo'
    },
    tags: ['Market Analysis', 'Predictive Analytics', 'Real-time Data'],
    useCase: 'Perfect for agents and brokers who need to stay ahead of market trends and provide data-driven insights to clients.',
    benefits: [
      'Identify emerging market opportunities',
      'Make informed pricing decisions',
      'Provide clients with market insights',
      'Reduce research time by 80%'
    ]
  },
  {
    id: 'neighborhood-analytics',
    name: 'Neighborhood Intelligence Platform',
    description: 'Deep-dive analytics for specific neighborhoods including demographics, price patterns, and investment potential scoring.',
    category: 'market-intelligence',
    complexity: 'Advanced',
    setupTime: '3-5 days',
    icon: MapPin,
    color: 'from-blue-500 to-cyan-600',
    metrics: {
      accuracyRate: '96% neighborhood scoring',
      roiIncrease: '+180% investment ROI',
      dataPoints: '500K+ neighborhoods'
    },
    features: [
      'Demographic trend analysis',
      'School district impact modeling',
      'Crime and safety correlations',
      'Investment potential scoring',
      'Walkability and amenity analysis',
      'Future development predictions'
    ],
    dataSource: ['Census Data', 'School APIs', 'Crime Statistics', 'Development Records'],
    visualizations: ['Choropleth Maps', 'Scatter Plots', 'Score Cards', 'Trend Analysis'],
    pricing: {
      setup: '$1,800',
      monthly: '$449/mo'
    },
    tags: ['Neighborhood Analysis', 'Investment Scoring', 'Demographics'],
    useCase: 'Essential for investment professionals and agents specializing in specific geographic areas.',
    benefits: [
      'Identify high-potential neighborhoods',
      'Provide detailed area insights',
      'Support investment decisions',
      'Differentiate from competitors'
    ]
  },
  {
    id: 'price-prediction-engine',
    name: 'AI Price Prediction Engine',
    description: 'Machine learning models that predict property values with 95%+ accuracy using 200+ data points and market indicators.',
    category: 'market-intelligence',
    complexity: 'Advanced',
    setupTime: '5-7 days',
    icon: Brain,
    color: 'from-purple-500 to-pink-600',
    isFeatured: true,
    metrics: {
      accuracyRate: '95.7% price accuracy',
      timeSaved: '40 hrs/week on CMAs',
      roiIncrease: '+250% pricing accuracy'
    },
    features: [
      'ML-powered value predictions',
      'Automated CMA generation',
      'Price range optimization',
      'Market timing recommendations',
      'Confidence scoring system',
      'Historical accuracy tracking'
    ],
    dataSource: ['MLS History', 'Property Records', 'Market Indicators', 'Economic Data'],
    visualizations: ['Prediction Charts', 'Confidence Intervals', 'Comparison Tables', 'Accuracy Metrics'],
    pricing: {
      setup: '$2,500',
      monthly: '$599/mo'
    },
    tags: ['AI Pricing', 'Machine Learning', 'CMA Automation'],
    useCase: 'Game-changing for listing agents who need accurate pricing to win listings and sell faster.',
    benefits: [
      'Win more listings with accurate pricing',
      'Reduce time on market by 23%',
      'Automate CMA creation',
      'Increase client confidence'
    ]
  },
  {
    id: 'market-opportunity-scanner',
    name: 'Market Opportunity Scanner',
    description: 'Automated system that identifies emerging opportunities, undervalued properties, and market inefficiencies in real-time.',
    category: 'market-intelligence',
    complexity: 'Medium',
    setupTime: '2-4 days',
    icon: Search,
    color: 'from-orange-500 to-red-600',
    metrics: {
      dataPoints: '10M+ daily scans',
      timeSaved: '30 hrs/week research',
      roiIncrease: '+300% deal flow'
    },
    features: [
      'Automated opportunity detection',
      'Undervalued property alerts',
      'Market inefficiency identification',
      'Investment opportunity scoring',
      'Custom criteria matching',
      'Real-time notifications'
    ],
    dataSource: ['Multiple MLS', 'Off-market Data', 'Auction Sites', 'Distressed Properties'],
    visualizations: ['Opportunity Maps', 'Score Cards', 'Alert Dashboards', 'Trend Tracking'],
    pricing: {
      setup: '$900',
      monthly: '$199/mo'
    },
    tags: ['Opportunity Detection', 'Investment Alerts', 'Market Scanning'],
    useCase: 'Perfect for investors and wholesalers looking to identify deals before the competition.',
    benefits: [
      'Find deals before competition',
      'Automate deal sourcing',
      'Increase deal volume by 300%',
      'Save 30+ hours per week'
    ]
  },

  // Portfolio Management
  {
    id: 'portfolio-performance-tracker',
    name: 'Portfolio Performance Tracker',
    description: 'Comprehensive analytics for property portfolios including ROI tracking, performance comparisons, and optimization recommendations.',
    category: 'portfolio-management',
    complexity: 'Medium',
    setupTime: '1-2 days',
    icon: Building,
    color: 'from-purple-500 to-violet-600',
    isPopular: true,
    metrics: {
      roiIncrease: '+45% portfolio ROI',
      timeSaved: '20 hrs/week reporting',
      accuracyRate: '99% calculation accuracy'
    },
    features: [
      'Individual property ROI tracking',
      'Portfolio-wide performance metrics',
      'Comparative analysis tools',
      'Cash flow projections',
      'Expense categorization and tracking',
      'Tax optimization insights'
    ],
    dataSource: ['Property Management Systems', 'Financial Records', 'Market Data', 'Expense Tracking'],
    visualizations: ['Performance Charts', 'ROI Comparisons', 'Cash Flow Graphs', 'Portfolio Maps'],
    pricing: {
      setup: '$800',
      monthly: '$249/mo'
    },
    tags: ['Portfolio Management', 'ROI Tracking', 'Performance Analytics'],
    useCase: 'Essential for property investors and portfolio managers tracking multiple properties.',
    benefits: [
      'Optimize portfolio performance',
      'Identify underperforming assets',
      'Streamline reporting processes',
      'Make data-driven decisions'
    ]
  },
  {
    id: 'property-valuation-tracker',
    name: 'Automated Property Valuation Tracker',
    description: 'Continuous monitoring of property values in your portfolio with automated revaluation alerts and market impact analysis.',
    category: 'portfolio-management',
    complexity: 'Simple',
    setupTime: '1 day',
    icon: Home,
    color: 'from-green-500 to-teal-600',
    metrics: {
      dataPoints: '1M+ daily valuations',
      accuracyRate: '93% valuation accuracy',
      timeSaved: '15 hrs/week tracking'
    },
    features: [
      'Automated daily valuations',
      'Market impact notifications',
      'Value change trending',
      'Portfolio equity tracking',
      'Refinancing opportunity alerts',
      'Comparative market analysis'
    ],
    dataSource: ['AVM Services', 'Market Data', 'Comparable Sales', 'Property Records'],
    visualizations: ['Value Trend Lines', 'Portfolio Equity Charts', 'Alert Dashboards', 'Comparison Tables'],
    pricing: {
      setup: '$400',
      monthly: '$149/mo'
    },
    tags: ['Property Valuation', 'Portfolio Tracking', 'Market Monitoring'],
    useCase: 'Perfect for investors who need to track property values and equity changes automatically.',
    benefits: [
      'Monitor property values daily',
      'Identify refinancing opportunities',
      'Track portfolio equity growth',
      'Automate valuation processes'
    ]
  },
  {
    id: 'investment-scenario-modeler',
    name: 'Investment Scenario Modeler',
    description: 'Advanced modeling tool for running investment scenarios, sensitivity analysis, and risk assessment on potential and existing properties.',
    category: 'portfolio-management',
    complexity: 'Advanced',
    setupTime: '3-4 days',
    icon: Calculator,
    color: 'from-blue-500 to-purple-600',
    metrics: {
      roiIncrease: '+65% decision accuracy',
      timeSaved: '25 hrs/week analysis',
      accuracyRate: '97% projection accuracy'
    },
    features: [
      'Multiple scenario modeling',
      'Sensitivity analysis tools',
      'Risk assessment metrics',
      'Cash flow projections',
      'Monte Carlo simulations',
      'Scenario comparison dashboards'
    ],
    dataSource: ['Financial Models', 'Market Data', 'Economic Indicators', 'Property Data'],
    visualizations: ['Scenario Charts', 'Risk Matrices', 'Projection Graphs', 'Comparison Tables'],
    pricing: {
      setup: '$1,500',
      monthly: '$399/mo'
    },
    tags: ['Investment Modeling', 'Scenario Analysis', 'Risk Assessment'],
    useCase: 'Critical for serious investors making data-driven acquisition and disposition decisions.',
    benefits: [
      'Model investment scenarios',
      'Assess risk factors',
      'Compare investment options',
      'Make confident decisions'
    ]
  },

  // Lead Analytics
  {
    id: 'lead-scoring-engine',
    name: 'AI Lead Scoring Engine',
    description: 'Machine learning system that scores leads based on 50+ behavioral and demographic factors, predicting conversion probability.',
    category: 'lead-analytics',
    complexity: 'Advanced',
    setupTime: '2-3 days',
    icon: Target,
    color: 'from-orange-500 to-red-600',
    isPopular: true,
    metrics: {
      accuracyRate: '89% conversion prediction',
      roiIncrease: '+340% conversion rate',
      timeSaved: '18 hrs/week qualification'
    },
    features: [
      'Behavioral scoring algorithms',
      'Demographic analysis',
      'Engagement tracking',
      'Conversion probability scoring',
      'Lead prioritization system',
      'Automated follow-up triggers'
    ],
    dataSource: ['CRM Data', 'Website Analytics', 'Email Engagement', 'Social Media'],
    visualizations: ['Score Distributions', 'Conversion Funnels', 'Priority Lists', 'Performance Metrics'],
    pricing: {
      setup: '$1,000',
      monthly: '$299/mo'
    },
    tags: ['Lead Scoring', 'AI Analytics', 'Conversion Prediction'],
    useCase: 'Game-changer for high-volume agents who need to prioritize leads effectively.',
    benefits: [
      'Focus on high-value leads',
      'Increase conversion rates by 340%',
      'Automate lead qualification',
      'Optimize sales team efficiency'
    ]
  },
  {
    id: 'conversion-funnel-analyzer',
    name: 'Conversion Funnel Analyzer',
    description: 'Deep analysis of your sales funnel identifying bottlenecks, drop-off points, and optimization opportunities.',
    category: 'lead-analytics',
    complexity: 'Medium',
    setupTime: '1-2 days',
    icon: Activity,
    color: 'from-purple-500 to-pink-600',
    metrics: {
      roiIncrease: '+125% funnel efficiency',
      accuracyRate: '95% bottleneck detection',
      timeSaved: '12 hrs/week analysis'
    },
    features: [
      'Funnel stage analysis',
      'Drop-off point identification',
      'Conversion rate optimization',
      'A/B testing insights',
      'Performance benchmarking',
      'Automated optimization suggestions'
    ],
    dataSource: ['CRM Data', 'Website Analytics', 'Email Metrics', 'Call Tracking'],
    visualizations: ['Funnel Charts', 'Drop-off Analysis', 'Conversion Trends', 'Optimization Maps'],
    pricing: {
      setup: '$600',
      monthly: '$199/mo'
    },
    tags: ['Funnel Analysis', 'Conversion Optimization', 'Sales Analytics'],
    useCase: 'Essential for teams looking to optimize their sales process and increase conversion rates.',
    benefits: [
      'Identify funnel bottlenecks',
      'Optimize conversion rates',
      'Improve sales process',
      'Increase revenue per lead'
    ]
  },
  {
    id: 'client-behavior-analyzer',
    name: 'Client Behavior Analyzer',
    description: 'Advanced analytics tracking client interactions, preferences, and behaviors to personalize communication and improve satisfaction.',
    category: 'lead-analytics',
    complexity: 'Medium',
    setupTime: '2-3 days',
    icon: Users,
    color: 'from-blue-500 to-cyan-600',
    metrics: {
      roiIncrease: '+85% client satisfaction',
      timeSaved: '10 hrs/week personalization',
      accuracyRate: '92% behavior prediction'
    },
    features: [
      'Interaction tracking',
      'Preference analysis',
      'Behavior pattern recognition',
      'Communication optimization',
      'Satisfaction scoring',
      'Personalization recommendations'
    ],
    dataSource: ['CRM Interactions', 'Email Engagement', 'Website Behavior', 'Call Records'],
    visualizations: ['Behavior Maps', 'Preference Charts', 'Interaction Timelines', 'Satisfaction Scores'],
    pricing: {
      setup: '$800',
      monthly: '$249/mo'
    },
    tags: ['Client Analytics', 'Behavior Tracking', 'Personalization'],
    useCase: 'Perfect for agents focused on providing personalized, high-touch client experiences.',
    benefits: [
      'Understand client preferences',
      'Personalize communication',
      'Improve client satisfaction',
      'Increase referral rates'
    ]
  },

  // Financial Reporting
  {
    id: 'revenue-analytics-dashboard',
    name: 'Revenue Analytics Dashboard',
    description: 'Comprehensive revenue tracking and analysis with commission forecasting, pipeline value, and performance trending.',
    category: 'financial-reporting',
    complexity: 'Simple',
    setupTime: '1 day',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600',
    isPopular: true,
    metrics: {
      accuracyRate: '98% revenue tracking',
      timeSaved: '15 hrs/week reporting',
      roiIncrease: '+60% financial visibility'
    },
    features: [
      'Real-time revenue tracking',
      'Commission forecasting',
      'Pipeline value analysis',
      'Year-over-year comparisons',
      'Goal tracking and progress',
      'Automated financial reports'
    ],
    dataSource: ['Transaction Data', 'CRM Pipeline', 'Commission Records', 'Goal Settings'],
    visualizations: ['Revenue Charts', 'Commission Forecasts', 'Pipeline Graphs', 'Performance Metrics'],
    pricing: {
      setup: '$300',
      monthly: '$99/mo'
    },
    tags: ['Revenue Tracking', 'Financial Analytics', 'Commission Forecasting'],
    useCase: 'Essential for any real estate professional tracking financial performance and goals.',
    benefits: [
      'Track revenue in real-time',
      'Forecast future earnings',
      'Monitor goal progress',
      'Automate financial reporting'
    ]
  },
  {
    id: 'roi-calculator-suite',
    name: 'ROI Calculator Suite',
    description: 'Advanced ROI calculation tools for marketing campaigns, lead sources, and business investments with detailed attribution analysis.',
    category: 'financial-reporting',
    complexity: 'Medium',
    setupTime: '2-3 days',
    icon: Calculator,
    color: 'from-yellow-500 to-orange-600',
    metrics: {
      accuracyRate: '96% ROI calculation',
      roiIncrease: '+150% marketing efficiency',
      timeSaved: '20 hrs/week analysis'
    },
    features: [
      'Multi-channel ROI tracking',
      'Attribution modeling',
      'Campaign performance analysis',
      'Lead source profitability',
      'Investment return calculations',
      'Automated ROI reports'
    ],
    dataSource: ['Marketing Spend', 'Lead Sources', 'Conversion Data', 'Revenue Attribution'],
    visualizations: ['ROI Charts', 'Attribution Models', 'Performance Comparisons', 'Profitability Analysis'],
    pricing: {
      setup: '$700',
      monthly: '$199/mo'
    },
    tags: ['ROI Analysis', 'Marketing Analytics', 'Investment Tracking'],
    useCase: 'Critical for agents and teams investing in marketing and wanting to optimize spend.',
    benefits: [
      'Optimize marketing spend',
      'Track campaign ROI',
      'Identify profitable channels',
      'Improve investment decisions'
    ]
  },
  {
    id: 'expense-optimization-analyzer',
    name: 'Expense Optimization Analyzer',
    description: 'AI-powered expense analysis that identifies cost-saving opportunities and optimizes business spending across all categories.',
    category: 'financial-reporting',
    complexity: 'Medium',
    setupTime: '2-4 days',
    icon: PieChart,
    color: 'from-red-500 to-pink-600',
    metrics: {
      roiIncrease: '+35% cost savings',
      timeSaved: '8 hrs/week expense review',
      accuracyRate: '94% optimization accuracy'
    },
    features: [
      'Expense categorization',
      'Cost optimization suggestions',
      'Vendor comparison analysis',
      'Budget variance tracking',
      'Automated expense alerts',
      'Tax deduction optimization'
    ],
    dataSource: ['Expense Records', 'Bank Transactions', 'Vendor Invoices', 'Budget Data'],
    visualizations: ['Expense Breakdowns', 'Cost Trends', 'Optimization Charts', 'Savings Tracking'],
    pricing: {
      setup: '$500',
      monthly: '$149/mo'
    },
    tags: ['Expense Analysis', 'Cost Optimization', 'Budget Management'],
    useCase: 'Valuable for any real estate professional looking to optimize business expenses and increase profitability.',
    benefits: [
      'Reduce business expenses',
      'Optimize vendor spending',
      'Track budget performance',
      'Maximize tax deductions'
    ]
  },

  // Predictive Modeling
  {
    id: 'market-forecast-engine',
    name: 'Market Forecast Engine',
    description: 'AI-powered market forecasting using economic indicators, historical patterns, and machine learning to predict market movements.',
    category: 'predictive-modeling',
    complexity: 'Advanced',
    setupTime: '5-7 days',
    icon: Brain,
    color: 'from-purple-500 to-indigo-600',
    isFeatured: true,
    metrics: {
      accuracyRate: '91% forecast accuracy',
      timeSaved: '35 hrs/week research',
      roiIncrease: '+220% prediction value'
    },
    features: [
      'Economic indicator analysis',
      'Machine learning forecasts',
      'Market cycle predictions',
      'Risk assessment modeling',
      'Scenario planning tools',
      'Confidence interval tracking'
    ],
    dataSource: ['Economic Data', 'Market History', 'Government Statistics', 'Industry Reports'],
    visualizations: ['Forecast Models', 'Confidence Bands', 'Scenario Charts', 'Risk Matrices'],
    pricing: {
      setup: '$2,000',
      monthly: '$499/mo'
    },
    tags: ['Market Forecasting', 'AI Predictions', 'Economic Analysis'],
    useCase: 'Essential for serious investors and market analysts who need reliable market predictions.',
    benefits: [
      'Predict market movements',
      'Time investment decisions',
      'Assess market risks',
      'Plan long-term strategies'
    ]
  },
  {
    id: 'demand-prediction-system',
    name: 'Demand Prediction System',
    description: 'Predictive analytics for buyer demand in specific areas, price points, and property types using AI and market signals.',
    category: 'predictive-modeling',
    complexity: 'Advanced',
    setupTime: '4-6 days',
    icon: TrendingUp,
    color: 'from-green-500 to-blue-600',
    metrics: {
      accuracyRate: '88% demand prediction',
      roiIncrease: '+180% listing success',
      timeSaved: '25 hrs/week analysis'
    },
    features: [
      'Buyer demand forecasting',
      'Price point analysis',
      'Property type preferences',
      'Seasonal trend modeling',
      'Geographic demand mapping',
      'Time-to-sell predictions'
    ],
    dataSource: ['Search Data', 'Showing Activity', 'Market Trends', 'Buyer Behavior'],
    visualizations: ['Demand Heat Maps', 'Prediction Charts', 'Trend Analysis', 'Success Probability'],
    pricing: {
      setup: '$1,500',
      monthly: '$399/mo'
    },
    tags: ['Demand Forecasting', 'Buyer Analytics', 'Market Prediction'],
    useCase: 'Perfect for listing agents who want to optimize pricing and marketing strategies.',
    benefits: [
      'Predict buyer demand',
      'Optimize listing strategies',
      'Reduce time on market',
      'Increase listing success rates'
    ]
  },
  {
    id: 'investment-timing-optimizer',
    name: 'Investment Timing Optimizer',
    description: 'AI system that analyzes market cycles, economic indicators, and local factors to recommend optimal buy/sell timing.',
    category: 'predictive-modeling',
    complexity: 'Advanced',
    setupTime: '3-5 days',
    icon: Clock,
    color: 'from-orange-500 to-red-600',
    metrics: {
      accuracyRate: '85% timing accuracy',
      roiIncrease: '+145% investment returns',
      timeSaved: '30 hrs/week research'
    },
    features: [
      'Market cycle analysis',
      'Economic timing indicators',
      'Local market factors',
      'Buy/sell recommendations',
      'Risk-adjusted timing',
      'Portfolio optimization timing'
    ],
    dataSource: ['Market Cycles', 'Economic Indicators', 'Local Factors', 'Historical Performance'],
    visualizations: ['Timing Charts', 'Cycle Analysis', 'Opportunity Windows', 'Risk Assessments'],
    pricing: {
      setup: '$1,800',
      monthly: '$449/mo'
    },
    tags: ['Investment Timing', 'Market Cycles', 'Economic Analysis'],
    useCase: 'Critical for investors who want to optimize entry and exit timing for maximum returns.',
    benefits: [
      'Optimize investment timing',
      'Maximize returns',
      'Minimize market risk',
      'Improve portfolio performance'
    ]
  },

  // Competitive Analysis
  {
    id: 'competitor-intelligence-dashboard',
    name: 'Competitor Intelligence Dashboard',
    description: 'Comprehensive competitive analysis tracking competitor activities, pricing strategies, and market positioning.',
    category: 'competitive-analysis',
    complexity: 'Medium',
    setupTime: '2-3 days',
    icon: Target,
    color: 'from-indigo-500 to-purple-600',
    isPopular: true,
    metrics: {
      dataPoints: '50K+ competitor activities',
      timeSaved: '20 hrs/week research',
      accuracyRate: '93% competitive intelligence'
    },
    features: [
      'Competitor activity tracking',
      'Pricing strategy analysis',
      'Market share monitoring',
      'Performance benchmarking',
      'Competitive positioning maps',
      'Opportunity identification'
    ],
    dataSource: ['Public Records', 'Market Data', 'Social Media', 'Website Analytics'],
    visualizations: ['Competitive Maps', 'Market Share Charts', 'Performance Comparisons', 'Opportunity Matrices'],
    pricing: {
      setup: '$1,200',
      monthly: '$349/mo'
    },
    tags: ['Competitive Analysis', 'Market Intelligence', 'Benchmarking'],
    useCase: 'Essential for agents and brokers who want to understand their competitive landscape.',
    benefits: [
      'Monitor competitor activities',
      'Identify market opportunities',
      'Benchmark performance',
      'Develop competitive strategies'
    ]
  },
  {
    id: 'market-positioning-analyzer',
    name: 'Market Positioning Analyzer',
    description: 'Advanced analysis of your market position relative to competitors with strategic recommendations for improvement.',
    category: 'competitive-analysis',
    complexity: 'Advanced',
    setupTime: '3-4 days',
    icon: MapPin,
    color: 'from-blue-500 to-cyan-600',
    metrics: {
      accuracyRate: '96% positioning analysis',
      roiIncrease: '+120% market advantage',
      timeSaved: '15 hrs/week analysis'
    },
    features: [
      'Position mapping analysis',
      'Competitive advantage identification',
      'Market gap analysis',
      'Strategic recommendations',
      'Brand perception tracking',
      'Performance optimization'
    ],
    dataSource: ['Market Research', 'Competitor Data', 'Client Feedback', 'Performance Metrics'],
    visualizations: ['Position Maps', 'Advantage Charts', 'Gap Analysis', 'Strategy Recommendations'],
    pricing: {
      setup: '$1,000',
      monthly: '$299/mo'
    },
    tags: ['Market Positioning', 'Strategic Analysis', 'Competitive Advantage'],
    useCase: 'Valuable for professionals looking to optimize their market position and competitive strategy.',
    benefits: [
      'Understand market position',
      'Identify competitive advantages',
      'Discover market gaps',
      'Develop strategic plans'
    ]
  }
]