import { Metadata } from 'next'
import { WorkflowHero } from '@/components/sections/workflow-automation/WorkflowHero'
import { WorkflowShowcase } from '@/components/sections/workflow-automation/WorkflowShowcase'
import { WorkflowROICalculator } from '@/components/sections/workflow-automation/WorkflowROICalculator'
import { WorkflowBuilder } from '@/components/sections/workflow-automation/WorkflowBuilder'
import { WorkflowCTA } from '@/components/sections/workflow-automation/WorkflowCTA'

export const metadata: Metadata = {
  title: 'Workflow Automation - Transform Your Real Estate Operations',
  description: 'Automate your entire real estate workflow from lead capture to closing. Save 15+ hours per week with intelligent automation that works 24/7.',
  openGraph: {
    title: 'Workflow Automation - EmpoweredAgent.ai',
    description: 'Automate your entire real estate workflow and save 15+ hours per week with intelligent automation.',
    type: 'website',
    url: 'https://empoweredagent.ai/solutions/workflow-automation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workflow Automation - EmpoweredAgent.ai',
    description: 'Automate your entire real estate workflow and save 15+ hours per week with intelligent automation.',
  },
}

export default function WorkflowAutomationPage() {
  return (
    <div className="min-h-screen">
      <WorkflowHero />
      <WorkflowShowcase />
      <WorkflowROICalculator />
      <WorkflowBuilder />
      <WorkflowCTA />
    </div>
  )
}