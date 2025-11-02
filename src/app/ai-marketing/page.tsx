import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'

export const metadata: Metadata = {
  title: 'AI Marketing Suite | EmpoweredAgent.ai',
  description: 'Generate marketing content, social media posts, and email campaigns with AI. Stay top-of-mind with automated, personalized marketing on autopilot.',
  keywords: 'AI marketing, content generation, social media automation, email marketing, marketing automation, real estate marketing, AI copywriting',
  openGraph: {
    title: 'AI Marketing Suite | EmpoweredAgent.ai',
    description: 'Generate marketing content and campaigns with AI',
    type: 'website',
    url: 'https://empoweredagent.ai/ai-marketing',
  },
}

export default function AIMarketingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <TestimonialsSection />
    </div>
  )
}
