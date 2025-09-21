import { Metadata } from 'next'
import { ContactHeroSection } from '@/components/sections/ContactHeroSection'
import { ContactFormSection } from '@/components/sections/ContactFormSection'
import { ContactInfoSection } from '@/components/sections/ContactInfoSection'

export const metadata: Metadata = {
  title: 'Contact Us | Empowered Agent - Get in Touch with Our Team',
  description: 'Contact our team for personalized demos, support, or partnership opportunities. We\'re here to help you transform your real estate business with AI.',
  keywords: 'contact, support, demo, consultation, real estate AI, customer service',
  openGraph: {
    title: 'Contact Us | Empowered Agent',
    description: 'Contact our team for personalized demos, support, or partnership opportunities.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactHeroSection />
      <ContactFormSection />
      <ContactInfoSection />
    </div>
  )
}