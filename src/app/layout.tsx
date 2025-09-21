import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Analytics } from '@/components/Analytics'

export const metadata: Metadata = {
  title: {
    default: 'EmpoweredAgent.ai - Intelligent AI Agents for Business Automation',
    template: '%s | EmpoweredAgent.ai'
  },
  description: 'Transform your workflow with AI agents that automate tasks, analyze data, and integrate seamlessly with your existing tools. Built for the future of work.',
  keywords: [
    'AI agents',
    'business automation',
    'workflow optimization', 
    'artificial intelligence',
    'data analytics',
    'process automation',
    'intelligent agents',
    'AI integration'
  ],
  authors: [{ name: 'EmpoweredAgent.ai Team' }],
  creator: 'EmpoweredAgent.ai',
  publisher: 'EmpoweredAgent.ai',
  metadataBase: new URL('https://empoweredagent.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://empoweredagent.ai',
    title: 'EmpoweredAgent.ai - Intelligent AI Agents for Business Automation',
    description: 'Transform your workflow with AI agents that automate tasks, analyze data, and integrate seamlessly with your existing tools.',
    siteName: 'EmpoweredAgent.ai',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EmpoweredAgent.ai - AI Agents Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EmpoweredAgent.ai - Intelligent AI Agents',
    description: 'Transform your workflow with AI agents that automate tasks, analyze data, and integrate seamlessly.',
    creator: '@empoweredagentai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <Header />
          <main className="relative">
            {children}
          </main>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}