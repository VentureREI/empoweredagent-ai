import { Metadata } from 'next'
import { PricingSection } from '@/components/sections/PricingSection'

export const metadata: Metadata = {
  title: 'Pricing | EmpoweredAgent.ai - AI Agent Platform Plans',
  description: 'Choose the perfect AI agent plan for your business. Simple, transparent pricing with no hidden fees. Starter, Professional, and Enterprise plans available.',
  openGraph: {
    title: 'Pricing | EmpoweredAgent.ai - AI Agent Platform Plans',
    description: 'Choose the perfect AI agent plan for your business. Simple, transparent pricing with no hidden fees.',
    type: 'website',
    url: 'https://empoweredagent.ai/pricing',
  },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <PricingSection />
    </div>
  )
}