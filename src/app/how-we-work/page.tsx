import { Metadata } from 'next'
import { ProcessHeroSection } from '@/components/sections/ProcessHeroSection'
import { WorkflowStepsSection } from '@/components/sections/WorkflowStepsSection'
import { ApproachSection } from '@/components/sections/ApproachSection'
import { MethodologySection } from '@/components/sections/MethodologySection'
import { ProcessCTASection } from '@/components/sections/ProcessCTASection'

export const metadata: Metadata = {
  title: 'How We Work - Our AI Development Process',
  description: 'Discover our proven methodology for deploying AI solutions that deliver measurable ROI. From discovery to deployment, see how we transform your business with intelligent automation.',
  openGraph: {
    title: 'How We Work - EmpoweredAgent.ai Process',
    description: 'Our proven AI development methodology that ensures successful implementations and measurable business impact.',
    type: 'website',
    url: 'https://empoweredagent.ai/how-we-work',
  },
}

export default function HowWeWorkPage() {
  return (
    <div className="min-h-screen">
      <ProcessHeroSection />
      <ApproachSection />
      <WorkflowStepsSection />
      <MethodologySection />
      <ProcessCTASection />
    </div>
  )
}