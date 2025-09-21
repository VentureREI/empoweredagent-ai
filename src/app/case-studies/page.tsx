import { Metadata } from 'next'
import CaseStudiesHero from '@/components/sections/case-studies/CaseStudiesHero'
import CaseStudiesShowcase from '@/components/sections/case-studies/CaseStudiesShowcase'
import CaseStudyViewer from '@/components/sections/case-studies/CaseStudyViewer'
import MetricsVisualization from '@/components/sections/case-studies/MetricsVisualization'
import IndustryInsights from '@/components/sections/case-studies/IndustryInsights'
import CaseStudiesCTA from '@/components/sections/case-studies/CaseStudiesCTA'

export const metadata: Metadata = {
  title: 'Case Studies | Real Estate Success Stories | EmpoweredAgent.ai',
  description: 'Discover how real estate professionals and brokerages have transformed their businesses with EmpoweredAgent.ai. Detailed case studies with verified results, ROI metrics, and implementation insights.',
  keywords: 'real estate case studies, success stories, ROI results, agent transformation, brokerage growth, real estate AI success, implementation results, customer testimonials',
  openGraph: {
    title: 'Case Studies | Real Estate Success Stories | EmpoweredAgent.ai',
    description: 'See how real estate professionals achieved extraordinary results with our AI platform. Verified case studies with detailed metrics and ROI analysis.',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Case Studies&description=Real Estate Success Stories',
        width: 1200,
        height: 630,
        alt: 'Real Estate Case Studies and Success Stories'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies | Real Estate Success Stories | EmpoweredAgent.ai',
    description: 'Verified success stories from real estate professionals who transformed their businesses with AI.',
  }
}

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen">
      <CaseStudiesHero />
      <CaseStudiesShowcase />
      <CaseStudyViewer />
      <MetricsVisualization />
      <IndustryInsights />
      <CaseStudiesCTA />
    </div>
  )
}