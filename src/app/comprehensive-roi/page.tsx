import { Metadata } from 'next'
import { UnifiedROICalculator } from '@/components/sections/comprehensive/UnifiedROICalculator'

export const metadata: Metadata = {
  title: 'Comprehensive ROI Calculator | Complete Business Automation Analysis | EmpoweredAgent.ai',
  description: 'Get a detailed breakdown of task automation, time savings, cost comparisons with assistant hiring, and complete revenue impact analysis. See exactly how AI automation transforms your real estate business.',
  keywords: 'ROI calculator, business automation, task breakdown, assistant cost comparison, time savings analysis, real estate automation, productivity calculator',
  openGraph: {
    title: 'Comprehensive ROI Calculator | Complete Business Automation Analysis',
    description: 'Detailed task breakdown, cost comparisons, and revenue impact analysis for real estate automation.',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Comprehensive ROI Calculator&description=Complete Business Automation Analysis',
        width: 1200,
        height: 630,
        alt: 'Comprehensive ROI Calculator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comprehensive ROI Calculator | Complete Business Automation Analysis',
    description: 'See exactly how automation compares to hiring an assistant with detailed task breakdowns and financial analysis.',
  }
}

export default function ComprehensiveROIPage() {
  return (
    <div className="min-h-screen">
      <UnifiedROICalculator />
    </div>
  )
}