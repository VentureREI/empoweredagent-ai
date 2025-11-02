import { Metadata } from 'next'
import { SoloAgentHero } from '@/components/sections/solo-agent/SoloAgentHero'
import { SoloAgentFeatures } from '@/components/sections/solo-agent/SoloAgentFeatures'
import { SoloAgentROICalculator } from '@/components/sections/solo-agent/SoloAgentROICalculator'
import { SoloAgentCTA } from '@/components/sections/solo-agent/SoloAgentCTA'

export const metadata: Metadata = {
  title: 'Solo Agent AI Assistant | Personal Real Estate Productivity Platform | EmpoweredAgent.ai',
  description: 'Transform your solo real estate practice with AI-powered automation. Lead generation, client management, marketing automation, and transaction support designed specifically for independent agents.',
  keywords: 'solo real estate agent, independent agent AI, real estate automation, lead generation, client management, marketing automation, transaction support, productivity tools',
  openGraph: {
    title: 'Solo Agent AI Assistant | Personal Real Estate Productivity Platform',
    description: 'AI-powered platform designed specifically for solo real estate agents. Automate leads, manage clients, and close more deals.',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Solo Agent AI Assistant&description=Personal Real Estate Productivity Platform',
        width: 1200,
        height: 630,
        alt: 'Solo Agent AI Assistant Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solo Agent AI Assistant | Personal Real Estate Productivity Platform',
    description: 'AI-powered automation and productivity tools designed specifically for independent real estate agents.',
  }
}

export default function SoloAgentPage() {
  return (
    <div className="min-h-screen">
      <SoloAgentHero />
      <SoloAgentFeatures />
      <SoloAgentROICalculator />
      <SoloAgentCTA />
    </div>
  )
}