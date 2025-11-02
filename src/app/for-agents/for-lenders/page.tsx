import { Metadata } from 'next'
import { ForLendersHero } from '@/components/sections/for-lenders/ForLendersHero'
import { ForLendersFeatures } from '@/components/sections/for-lenders/ForLendersFeatures'
import { LenderROICalculator } from '@/components/sections/for-lenders/LenderROICalculator'
import { LenderSuccessStories } from '@/components/sections/for-lenders/LenderSuccessStories'
import { ForLendersCTA } from '@/components/sections/for-lenders/ForLendersCTA'

export const metadata: Metadata = {
  title: 'AI Solutions for Lenders | Automated Lending Process Optimization | EmpoweredAgent.ai',
  description: 'Transform your lending operations with AI-powered automation. Streamline loan processing, improve approval rates, and accelerate funding cycles with intelligent automation designed for modern lenders.',
  keywords: 'AI for lending, loan automation, lending process automation, mortgage automation, loan processing AI, lending solutions, automated underwriting, lender AI tools',
  openGraph: {
    title: 'AI Solutions for Lenders | Process Automation & Optimization',
    description: 'AI-powered platform designed specifically for lending institutions. Automate workflows, improve efficiency, and close more loans faster.',
    type: 'website',
    images: [
      {
        url: '/api/og?title=AI Solutions for Lenders&description=Automated Lending Process Optimization',
        width: 1200,
        height: 630,
        alt: 'AI Solutions for Lenders'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solutions for Lenders | Lending AI Automation',
    description: 'AI-powered automation and productivity tools designed specifically for lending institutions and loan officers.',
  }
}

export default function ForLendersPage() {
  return (
    <div className="min-h-screen">
      <ForLendersHero />
      <ForLendersFeatures />
      <LenderROICalculator />
      <LenderSuccessStories />
      <ForLendersCTA />
    </div>
  )
}
