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
        src: '/favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon'
      }
    ],
    shortcuts: [],
    related_applications: [],
    prefer_related_applications: false
  }
}