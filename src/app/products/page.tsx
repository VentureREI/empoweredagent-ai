import { Metadata } from 'next'
import { ProductsHeroSection } from '@/components/sections/ProductsHeroSection'
import { ProductsGridSection } from '@/components/sections/ProductsGridSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { NewsletterSection } from '@/components/sections/NewsletterSection'

export const metadata: Metadata = {
  title: 'AI Agents & Products - Intelligent Automation Solutions',
  description: 'Explore our comprehensive suite of AI agents for workflow automation, analytics, integrations, communication, security, and productivity optimization.',
  openGraph: {
    title: 'EmpoweredAgent.ai Products - Intelligent Automation Solutions',
    description: 'Explore our comprehensive suite of AI agents for workflow automation, analytics, integrations, and more.',
  },
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <ProductsHeroSection />
      <ProductsGridSection />
      <PricingSection />
      <NewsletterSection />
    </div>
  )
}