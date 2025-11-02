import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'

export const metadata: Metadata = {
  title: 'AI Automation Systems | EmpoweredAgent.ai',
  description: 'Automate follow-ups, appointments, and CRM tasks with AI. Eliminate manual data entry, book more appointments, and close more deals on autopilot.',
  keywords: 'workflow automation, AI automation, appointment setting, CRM automation, follow-up automation, task automation, real estate automation',
  openGraph: {
    title: 'AI Automation Systems | EmpoweredAgent.ai',
    description: 'Automate follow-ups, appointments, and CRM tasks with AI',
    type: 'website',
    url: 'https://empoweredagent.ai/ai-automation',
  },
}

export default function AIAutomationPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <TestimonialsSection />
    </div>
  )
}
