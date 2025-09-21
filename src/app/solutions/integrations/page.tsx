import { Metadata } from 'next'
import { IntegrationHero } from '@/components/sections/integrations/IntegrationHero'
import { IntegrationShowcase } from '@/components/sections/integrations/IntegrationShowcase'
import { IntegrationBuilder } from '@/components/sections/integrations/IntegrationBuilder'
import { IntegrationROICalculator } from '@/components/sections/integrations/IntegrationROICalculator'
import { IntegrationCTA } from '@/components/sections/integrations/IntegrationCTA'

export const metadata: Metadata = {
  title: 'Integration Services | Connect Your Real Estate Tech Stack | EmpoweredAgent.ai',
  description: 'Seamlessly connect your existing real estate tools with intelligent automation. CRM integration, MLS sync, marketing automation, and custom API connections that eliminate data silos.',
  keywords: 'real estate integrations, CRM integration, MLS integration, API connections, real estate automation, tech stack integration, data synchronization, workflow automation',
  openGraph: {
    title: 'Integration Services | Connect Your Real Estate Tech Stack',
    description: 'Intelligent automation that connects your existing tools and eliminates data silos in your real estate business.',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Integration Services&description=Connect Your Real Estate Tech Stack',
        width: 1200,
        height: 630,
        alt: 'Integration Services Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Integration Services | Connect Your Real Estate Tech Stack',
    description: 'Intelligent automation that connects your existing tools and eliminates data silos.',
  }
}

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen">
      <IntegrationHero />
      <IntegrationShowcase />
      <IntegrationBuilder />
      <IntegrationROICalculator />
      <IntegrationCTA />
    </div>
  )
}