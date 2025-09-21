import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EmpoweredAgent.ai - AI Automation Platform',
    short_name: 'EmpoweredAgent',
    description: 'Transform your workflow with intelligent AI agents that automate tasks, analyze data, and integrate seamlessly with your existing tools.',
    start_url: '/',
    display: 'standalone',
    background_color: '#4c1d95',
    theme_color: '#7c3aed',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en-US',
    categories: ['business', 'productivity', 'utilities'],
    icons: [
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    shortcuts: [
      {
        name: 'Start Free Trial',
        short_name: 'Trial',
        description: 'Start your free 30-day trial',
        url: '/signup',
        icons: [
          {
            src: '/icons/shortcut-trial.png',
            sizes: '96x96',
            type: 'image/png'
          }
        ]
      },
      {
        name: 'Watch Demo',
        short_name: 'Demo',
        description: 'See EmpoweredAgent.ai in action',
        url: '/demo',
        icons: [
          {
            src: '/icons/shortcut-demo.png',
            sizes: '96x96',
            type: 'image/png'
          }
        ]
      },
      {
        name: 'Contact Sales',
        short_name: 'Contact',
        description: 'Get in touch with our sales team',
        url: '/contact',
        icons: [
          {
            src: '/icons/shortcut-contact.png',
            sizes: '96x96',
            type: 'image/png'
          }
        ]
      }
    ],
    related_applications: [],
    prefer_related_applications: false
  }
}