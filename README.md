# EmpoweredAgent.ai Website

A modern, responsive website for EmpoweredAgent.ai built with Next.js 14, TypeScript, and Tailwind CSS. Features a purple N8N.io-inspired design theme and comprehensive AI agent showcase.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript 5.4+, Tailwind CSS 3.4+
- **Purple Theme**: Custom N8N.io-inspired design with vibrant purple gradients
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Performance Optimized**: SSR/SSG, lazy loading, optimized images with WebP support
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **SEO Optimized**: Meta tags, structured data, sitemap generation
- **Analytics Integration**: Privacy-first analytics with Plausible/Fathom support
- **Form Handling**: Contact forms with validation, rate limiting, and CRM integration
- **Component Library**: Reusable UI components with variants and proper TypeScript
- **State Management**: Zustand for lightweight, performant state management
- **Animation**: Framer Motion for smooth animations and transitions
- **Dark Mode**: System-aware theme switching with user preference persistence

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page with team and company info
│   ├── contact/           # Contact page with forms and info
│   ├── api/               # API routes for forms and integrations
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   ├── layout/           # Header, Footer, Navigation
│   ├── sections/         # Page sections (Hero, Features, etc.)
│   ├── ui/               # Base UI components (Button, Card, etc.)
│   ├── providers.tsx     # App providers and context
│   └── Analytics.tsx     # Privacy-first analytics setup
├── lib/                  # Utility functions and configurations
│   ├── stores/           # Zustand state management
│   └── utils.ts          # Helper functions and utilities
├── types/                # TypeScript type definitions
│   └── index.ts          # Global type definitions
└── styles/               # Additional styling (if needed)
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18.0.0 or higher
- npm, yarn, or pnpm package manager
- Git for version control

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/empoweredagent-website.git
cd empoweredagent-website
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Core Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# Analytics (Optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=empoweredagent.ai
PLAUSIBLE_API_KEY=your-plausible-api-key

# Email Integration (Choose one)
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@empoweredagent.ai

# Alternative: AWS SES
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1

# CRM Integration (Optional)
HUBSPOT_ACCESS_TOKEN=your-hubspot-token
SALESFORCE_API_URL=your-salesforce-instance-url
SALESFORCE_CLIENT_ID=your-salesforce-client-id
SALESFORCE_CLIENT_SECRET=your-salesforce-client-secret

# Newsletter Service (Optional)
MAILCHIMP_API_KEY=your-mailchimp-api-key
MAILCHIMP_AUDIENCE_ID=your-audience-id

# Maps Integration (Optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key

# Security
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000

# Development
NODE_ENV=development
```

### 4. Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🎨 Customization

### Theme Configuration

The purple theme is configured in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#7C3AED', // Main vibrant purple
    // ... other shades
  },
  accent: {
    400: '#A78BFA', // Lighter purple shade
    // ... other shades
  }
}
```

### Adding New Components

1. Create component in appropriate directory:
   - `src/components/ui/` for reusable UI elements
   - `src/components/sections/` for page sections
   - `src/components/layout/` for layout elements

2. Follow naming convention: `ComponentName.tsx`

3. Use TypeScript interfaces for props:

```typescript
interface ComponentProps {
  title: string
  variant?: 'primary' | 'secondary'
  className?: string
}

export function Component({ title, variant = 'primary', className }: ComponentProps) {
  // Component implementation
}
```

### Adding New Pages

1. Create page in `src/app/page-name/page.tsx`
2. Add route to navigation in `src/components/layout/Header.tsx`
3. Update sitemap generation if needed

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

```bash
# Deploy to Vercel CLI
npx vercel
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📧 Email Integration

### SendGrid Setup

```bash
npm install @sendgrid/mail
```

Configure in API routes:

```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const msg = {
  to: 'sales@empoweredagent.ai',
  from: process.env.SENDGRID_FROM_EMAIL!,
  subject: 'New Contact Form Submission',
  html: emailTemplate
}

await sgMail.send(msg)
```

### Alternative: AWS SES

```bash
npm install @aws-sdk/client-ses
```

## 📊 Analytics Integration

### Plausible Analytics

```typescript
// In src/components/Analytics.tsx
const script = document.createElement('script')
script.defer = true
script.src = 'https://plausible.io/js/script.js'
script.setAttribute('data-domain', 'empoweredagent.ai')
```

### Custom Event Tracking

```typescript
import { useAnalytics } from '@/components/Analytics'

const { trackEvent } = useAnalytics()

// Track button clicks
trackEvent('CTA Click', {
  location: 'hero-section',
  button: 'Get Started'
})
```

## 🧪 Testing

### Unit Tests

```bash
npm run test
# or
yarn test
```

### E2E Tests

```bash
npm run test:e2e
# or
npx cypress open
```

### Type Checking

```bash
npm run type-check
# or
yarn type-check
```

## 🔧 Development Tools

### Code Quality

- **ESLint**: Linting with Next.js recommended rules
- **Prettier**: Code formatting with Tailwind plugin
- **TypeScript**: Strict type checking enabled
- **Husky**: Git hooks for pre-commit linting

### Performance

- **Next.js Image**: Optimized image loading with WebP
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analyzer**: Analyze bundle size with `npm run analyze`

## 📝 Content Management

### Static Content

Update content in component files:
- Agent data: `src/components/sections/FeaturesSection.tsx`
- Team members: `src/components/sections/TeamSection.tsx`
- Testimonials: `src/components/sections/TestimonialsSection.tsx`

### Dynamic Content (Future)

For CMS integration, consider:
- **Contentful**: Headless CMS with rich API
- **Strapi**: Open-source headless CMS
- **Sanity**: Real-time collaborative CMS

## 🔒 Security

### Implemented Security Measures

- **Content Security Policy**: Configured in `next.config.js`
- **Rate Limiting**: API route protection
- **Input Validation**: Zod schema validation
- **XSS Protection**: Content sanitization
- **HTTPS Only**: Force secure connections

### Additional Recommendations

- Enable CORS for specific domains only
- Implement API authentication for sensitive endpoints
- Regular dependency updates with `npm audit`
- Monitor with error tracking (e.g., Sentry)

## 📱 Mobile Optimization

- **Responsive Design**: Mobile-first approach
- **Touch Interactions**: Optimized for touch devices
- **Performance**: Optimized for mobile networks
- **PWA Ready**: Can be extended to Progressive Web App

## 🌐 SEO Configuration

### Automated SEO

- **Meta Tags**: Dynamic generation per page
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Schema.org markup for rich snippets
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine crawler guidance

### SEO Best Practices

- Semantic HTML structure
- Optimized images with alt text
- Fast loading times (Core Web Vitals)
- Mobile-friendly design
- Internal linking structure

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m "Add new feature"`
4. Push to branch: `git push origin feature/new-feature`
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For technical support or questions:

- **Documentation**: Check this README and code comments
- **Issues**: Create GitHub issues for bugs or feature requests
- **Email**: tech@empoweredagent.ai
- **Community**: Join our Discord for discussions

## 🗺️ Roadmap

### Phase 1 (Complete)
- ✅ Core website with responsive design
- ✅ Purple N8N.io-inspired theme
- ✅ Contact forms and basic analytics
- ✅ SEO optimization and performance

### Phase 2 (Planned)
- 🔄 Blog/CMS integration
- 🔄 Customer portal with authentication
- 🔄 Advanced analytics dashboard
- 🔄 Multi-language support

### Phase 3 (Future)
- 📋 Live chat integration
- 📋 Interactive product demos
- 📋 A/B testing framework
- 📋 Advanced personalization

---

Built with ❤️ by the EmpoweredAgent.ai team