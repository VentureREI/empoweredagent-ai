import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
import { StatsSection } from '@/components/sections/StatsSection'

export const metadata: Metadata = {
  title: 'Empower your real estate business with AI that works',
  description: 'Lead engagement, productivity, and automation built for real estate pros.',
  openGraph: {
    title: 'EmpoweredAgent.ai - Real Estate AI That Works',
    description: 'Lead engagement, productivity, and automation built for real estate pros.',
    type: 'website',
    url: 'https://empoweredagent.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EmpoweredAgent.ai - Real Estate AI',
    description: 'Lead engagement, productivity, and automation built for real estate pros.',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ProcessSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  )
}