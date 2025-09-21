import { Metadata } from 'next'
import TeamHero from '@/components/sections/real-estate-team/TeamHero'
import TeamFeatures from '@/components/sections/real-estate-team/TeamFeatures'
import TeamDashboard from '@/components/sections/real-estate-team/TeamDashboard'
import TeamCollaboration from '@/components/sections/real-estate-team/TeamCollaboration'
import TeamSuccessStories from '@/components/sections/real-estate-team/TeamSuccessStories'
import TeamPricing from '@/components/sections/real-estate-team/TeamPricing'
import TeamCTA from '@/components/sections/real-estate-team/TeamCTA'

export const metadata: Metadata = {
  title: 'Real Estate Team AI Platform | Team Management & Collaboration | EmpoweredAgent.ai',
  description: 'Scale your real estate team with AI-powered management tools. Lead distribution, performance tracking, team collaboration, and automated workflows designed for high-performing real estate teams.',
  keywords: 'real estate team management, team AI platform, lead distribution, performance tracking, team collaboration, real estate team tools, agent management, team productivity',
  openGraph: {
    title: 'Real Estate Team AI Platform | Team Management & Collaboration',
    description: 'AI-powered platform designed to help real estate teams scale, collaborate, and achieve extraordinary results together.',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Real Estate Team AI Platform&description=Scale Your Team with AI',
        width: 1200,
        height: 630,
        alt: 'Real Estate Team AI Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate Team AI Platform | Team Management & Collaboration',
    description: 'AI-powered tools and automation designed specifically for high-performing real estate teams.',
  }
}

export default function RealEstateTeamPage() {
  return (
    <div className="min-h-screen">
      <TeamHero />
      <TeamFeatures />
      <TeamDashboard />
      <TeamCollaboration />
      <TeamSuccessStories />
      <TeamPricing />
      <TeamCTA />
    </div>
  )
}