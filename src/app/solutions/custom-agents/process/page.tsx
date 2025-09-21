import { Metadata } from 'next'
import { ProcessOverview } from '@/components/sections/custom-agents/ProcessOverview'
import { CustomAgentsCTA } from '@/components/sections/custom-agents/CustomAgentsCTA'

export const metadata: Metadata = {
  title: 'Custom Development Process - How We Build AI Agents',
  description: 'Learn about our proven process for developing custom AI agents. From discovery to deployment, see how we ensure your success.',
  openGraph: {
    title: 'Custom Development Process - EmpoweredAgent.ai',
    description: 'Learn about our proven process for developing custom AI agents.',
    type: 'website',
    url: 'https://empoweredagent.ai/solutions/custom-agents/process',
  },
}

export default function ProcessPage() {
  return (
    <div className="min-h-screen">
      <ProcessOverview />
      <CustomAgentsCTA />
    </div>
  )
}