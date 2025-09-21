import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
import { StatsSection } from '@/components/sections/StatsSection'

export const metadata: Metadata = {
  title: 'Intelligent AI Agents for Business Automation',
  description: 'Transform your workflow with AI agents that automate tasks, analyze data, and integrate seamlessly with your existing tools. Built for the future of work.',
  openGraph: {
    title: 'EmpoweredAgent.ai - Intelligent AI Agents for Business Automation',
    description: 'Transform your workflow with AI agents that automate tasks, analyze data, and integrate seamlessly with your existing tools.',
    type: 'website',
    url: 'https://empoweredagent.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EmpoweredAgent.ai - Intelligent AI Agents',
    description: 'Transform your workflow with AI agents that automate tasks, analyze data, and integrate seamlessly.',
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