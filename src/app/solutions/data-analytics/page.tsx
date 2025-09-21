import { Metadata } from 'next'
import { AnalyticsHero } from '@/components/sections/data-analytics/AnalyticsHero'
import { AnalyticsShowcase } from '@/components/sections/data-analytics/AnalyticsShowcase'
import { AnalyticsROICalculator } from '@/components/sections/data-analytics/AnalyticsROICalculator'
import { DataVisualizationBuilder } from '@/components/sections/data-analytics/DataVisualizationBuilder'
import { AnalyticsCTA } from '@/components/sections/data-analytics/AnalyticsCTA'

export const metadata: Metadata = {
  title: 'Data Analytics AI | Real Estate Intelligence Platform | EmpoweredAgent.ai',
  description: 'Transform your real estate data into actionable insights with AI-powered analytics. Automated reporting, predictive market analysis, and intelligent dashboards that drive smarter business decisions.',
  keywords: 'real estate analytics, AI data analysis, property market intelligence, automated reporting, real estate dashboards, predictive analytics, market trends, business intelligence',
  openGraph: {
    title: 'Data Analytics AI | Real Estate Intelligence Platform',
    description: 'AI-powered analytics platform that transforms real estate data into actionable insights and automated reports.',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Data Analytics AI&description=Transform Real Estate Data Into Intelligence',
        width: 1200,
        height: 630,
        alt: 'Data Analytics AI Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Analytics AI | Real Estate Intelligence Platform',
    description: 'AI-powered analytics that turn real estate data into actionable insights.',
  }
}

export default function DataAnalyticsPage() {
  return (
    <div className="min-h-screen">
      <AnalyticsHero />
      <AnalyticsShowcase />
      <AnalyticsROICalculator />
      <DataVisualizationBuilder />
      <AnalyticsCTA />
    </div>
  )
}