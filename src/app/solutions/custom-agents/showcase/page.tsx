import { Metadata } from 'next'
import { AgentGalleryHero } from '@/components/sections/custom-agents/AgentGalleryHero'
import { AgentFilter } from '@/components/sections/custom-agents/AgentFilter'
import { AgentGrid } from '@/components/sections/custom-agents/AgentGrid'

export const metadata: Metadata = {
  title: 'AI Agent Showcase - Ready-to-Deploy Solutions',
  description: 'Explore our gallery of proven AI agents across industries. Find the perfect starting point for your custom solution.',
  openGraph: {
    title: 'AI Agent Showcase - EmpoweredAgent.ai',
    description: 'Explore our gallery of proven AI agents across industries.',
    type: 'website',
    url: 'https://empoweredagent.ai/solutions/custom-agents/showcase',
  },
}

export default function AgentShowcasePage() {
  return (
    <div className="min-h-screen">
      <AgentGalleryHero />
      <AgentFilter />
      <AgentGrid />
    </div>
  )
}