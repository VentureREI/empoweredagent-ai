/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  async redirects() {
    return [
      // Redirect old /for-agents/* routes to new product pillar routes
      {
        source: '/for-agents/solo-agent',
        destination: '/lead-generation',
        permanent: true, // 301 redirect
      },
      {
        source: '/for-agents/real-estate-team',
        destination: '/lead-generation',
        permanent: true,
      },
      {
        source: '/for-agents/real-estate-brokerage',
        destination: '/lead-generation',
        permanent: true,
      },
      // Redirect old /solutions/* routes to /ai-automation
      {
        source: '/solutions/custom-agents',
        destination: '/ai-automation',
        permanent: true,
      },
      {
        source: '/solutions/custom-agents/:slug',
        destination: '/ai-automation',
        permanent: true,
      },
      {
        source: '/solutions/workflow-automation',
        destination: '/ai-automation',
        permanent: true,
      },
      {
        source: '/solutions/data-analytics',
        destination: '/ai-automation',
        permanent: true,
      },
      {
        source: '/solutions/integrations',
        destination: '/ai-automation',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
