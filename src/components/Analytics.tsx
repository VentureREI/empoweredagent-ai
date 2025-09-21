'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Google Analytics tracking ID - replace with your actual ID
const GA_TRACKING_ID = 'G-XXXXXXXXXX'

// Plausible Analytics - more privacy-friendly alternative
const PLAUSIBLE_DOMAIN = 'empoweredagent.ai'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    plausible: (...args: any[]) => void
  }
}

// Google Analytics functions
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args)
  }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

export const trackPageView = (url: string) => {
  gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// Plausible Analytics functions
export const plausibleEvent = (eventName: string, props?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props })
  }
}

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()
    
    // Track page views
    trackPageView(url)
    plausibleEvent('pageview')
  }, [pathname, searchParams])

  return (
    <>
      {/* Google Analytics */}
      {process.env.NODE_ENV === 'production' && GA_TRACKING_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true,
                  allow_google_signals: false,
                  allow_ad_personalization_signals: false,
                });
              `,
            }}
          />
        </>
      )}

      {/* Plausible Analytics - Privacy-friendly alternative */}
      {process.env.NODE_ENV === 'production' && PLAUSIBLE_DOMAIN && (
        <script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
        />
      )}
    </>
  )
}