import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/about/AboutHeroSection'
import { MissionSection } from '@/components/sections/about/MissionSection'

export const metadata: Metadata = {
  title: 'About Us - Leading the Future of AI Automation',
  description: 'Learn about EmpoweredAgent.ai\'s mission to democratize AI automation and empower businesses with intelligent agents. Meet our team and discover our journey.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About EmpoweredAgent.ai - Leading AI Automation',
    description: 'Learn about our mission to democratize AI automation and empower businesses with intelligent agents.',
    type: 'website',
    url: 'https://empoweredagent.ai/about',
  },
}

// Structured data for about page
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'EmpoweredAgent.ai',
  url: 'https://empoweredagent.ai',
  description: 'Leading AI automation platform that empowers businesses with intelligent agents for workflow optimization and process automation.',
  foundingDate: '2023',
  founders: [
    {
      '@type': 'Person',
      name: 'Alex Chen',
      jobTitle: 'CEO & Co-Founder'
    },
    {
      '@type': 'Person', 
      name: 'Sarah Rodriguez',
      jobTitle: 'CTO & Co-Founder'
    }
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    addressCountry: 'US'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-123-4567',
    contactType: 'customer service',
    email: 'hello@empoweredagent.ai'
  },
  sameAs: [
    'https://twitter.com/empoweredagent',
    'https://linkedin.com/company/empoweredagent',
    'https://github.com/empoweredagent'
  ]
}

export default function AboutPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Mission Section */}
        <MissionSection />
      </div>
    </>
  )
}