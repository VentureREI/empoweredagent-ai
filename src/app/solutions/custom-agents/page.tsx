import { Metadata } from 'next'
import { CustomAgentsHero } from '@/components/sections/custom-agents/CustomAgentsHero'
import { AgentShowcase } from '@/components/sections/custom-agents/AgentShowcase'
import { ROICalculator } from '@/components/sections/custom-agents/ROICalculator'
import { ProcessOverview } from '@/components/sections/custom-agents/ProcessOverview'
import { CustomAgentsCTA } from '@/components/sections/custom-agents/CustomAgentsCTA'

export const metadata: Metadata = {
  title: 'Custom AI Agents - Tailored Solutions for Your Business',
  description: 'Build intelligent AI agents that think like your team. Custom-developed solutions that integrate seamlessly with your workflow and deliver measurable results.',
  openGraph: {
    title: 'Custom AI Agents - EmpoweredAgent.ai',
    description: 'Build intelligent AI agents that think like your team. Custom-developed solutions for maximum ROI.',
    type: 'website',
    url: 'https://empoweredagent.ai/solutions/custom-agents',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom AI Agents - EmpoweredAgent.ai',
    description: 'Build intelligent AI agents that think like your team. Custom-developed solutions for maximum ROI.',
  },
}

export default function CustomAgentsPage() {
  return (
    <div className="min-h-screen">
      <CustomAgentsHero />
      <AgentShowcase />
      <ROICalculator />
      <ProcessOverview />
      <CustomAgentsCTA />
    </div>
  )
}