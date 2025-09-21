import { Metadata } from 'next'
import BrokerageHero from '@/components/sections/real-estate-brokerage/BrokerageHero'
import BrokerageFeatures from '@/components/sections/real-estate-brokerage/BrokerageFeatures'
import BrokerageAnalytics from '@/components/sections/real-estate-brokerage/BrokerageAnalytics'
import AgentManagement from '@/components/sections/real-estate-brokerage/AgentManagement'
import BrokerageSuccessStories from '@/components/sections/real-estate-brokerage/BrokerageSuccessStories'
import BrokeragePricing from '@/components/sections/real-estate-brokerage/BrokeragePricing'
import BrokerageCTA from '@/components/sections/real-estate-brokerage/BrokerageCTA'

export const metadata: Metadata = {
  title: 'Real Estate Brokerage AI Platform | Complete Brokerage Management | EmpoweredAgent.ai',
  description: 'Transform your real estate brokerage with AI-powered management tools. Agent oversight, performance analytics, lead distribution, commission tracking, and automated workflows for modern brokerages.',
  keywords: 'real estate brokerage management, brokerage AI platform, agent management, brokerage analytics, commission tracking, lead distribution, real estate automation, brokerage tools',
  openGraph: {
    title: 'Real Estate Brokerage AI Platform | Complete Brokerage Management',
    description: 'AI-powered platform designed to help real estate brokerages scale operations, manage agents, and maximize profitability.',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Real Estate Brokerage AI Platform&description=Scale Your Brokerage with AI',
        width: 1200,
        height: 630,
        alt: 'Real Estate Brokerage AI Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate Brokerage AI Platform | Complete Brokerage Management',
    description: 'AI-powered tools and automation designed specifically for modern real estate brokerages.',
  }
}

export default function RealEstateBrokeragePage() {
  return (
    <div className="min-h-screen">
      <BrokerageHero />
      <BrokerageFeatures />
      <BrokerageAnalytics />
      <AgentManagement />
      <BrokerageSuccessStories />
      <BrokeragePricing />
      <BrokerageCTA />
    </div>
  )
}