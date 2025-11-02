import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'

export const metadata: Metadata = {
  title: 'AI Lead Generation System | EmpoweredAgent.ai',
  description: 'Capture and qualify leads 24/7 with AI. Automate lead qualification, follow-up, and scoring. Get more qualified leads with less manual effort.',
  keywords: 'AI lead generation, lead capture, lead qualification, lead scoring, automated follow-up, real estate leads, lead nurturing',
  openGraph: {
    title: 'AI Lead Generation System | EmpoweredAgent.ai',
    description: 'Capture and qualify leads 24/7 with AI-powered lead generation system',
    type: 'website',
    url: 'https://empoweredagent.ai/lead-generation',
  },
}

export default function LeadGenerationPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <TestimonialsSection />
    </div>
  )
}
