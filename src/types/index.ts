// Navigation types
export interface NavigationItem {
  name: string
  href: string
  children?: NavigationItem[]
  icon?: React.ComponentType<{ size?: number; className?: string }>
  description?: string
  badge?: string
}

// Theme types
export interface ThemeConfig {
  isDarkMode: boolean
  primaryColor: string
  accentColor: string
}

// Agent types
export interface Agent {
  id: string
  name: string
  category: string
  description: string
  icon: string
  features: string[]
  pricing: {
    starter: number
    professional: number
    enterprise: string | number
  }
  popular?: boolean
  rating?: number
  reviewCount?: number
}

// Contact form types
export interface ContactFormData {
  name: string
  email: string
  company: string
  phone?: string
  message: string
  subject: 'general' | 'demo' | 'partnership' | 'support' | 'other'
  interestedAgents?: string[]
  budgetRange?: string
  timeline?: string
  marketingConsent?: boolean
}

// Newsletter types
export interface NewsletterData {
  email: string
  firstName?: string
  lastName?: string
  interests?: string[]
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// User types
export interface User {
  id: string
  email: string
  name: string
  company?: string
  role?: string
  avatar?: string
  preferences: {
    theme: 'light' | 'dark' | 'system'
    notifications: boolean
    newsletter: boolean
  }
}

// Integration types
export interface Integration {
  id: string
  name: string
  category: string
  description: string
  logo: string
  setupTime: string
  complexity: 'easy' | 'medium' | 'advanced'
  features: string[]
  popular?: boolean
  connected?: boolean
}

// Pricing types
export interface PricingPlan {
  id: string
  name: string
  description: string
  price: {
    monthly: number | string
    annually: number | string
  }
  features: Record<string, string>
  included: string[]
  excluded: string[]
  popular?: boolean
  cta: string
  badge?: string
}

// Analytics types
export interface AnalyticsEvent {
  event: string
  properties: Record<string, any>
  timestamp: string
  userId?: string
  sessionId: string
}

// Component prop types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface IconProps {
  size?: number
  className?: string
  color?: string
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  validation?: {
    pattern?: RegExp
    minLength?: number
    maxLength?: number
    custom?: (value: any) => boolean | string
  }
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: string
  timestamp: string
}

// Team types
export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
  twitter?: string
  github?: string
  email?: string
  location?: string
  education?: string
  expertise?: string[]
  achievements?: string[]
  specialties?: string[]
}

// State types
export interface AppState {
  user: User | null
  theme: ThemeConfig
  navigation: {
    isMenuOpen: boolean
    activeSection: string
  }
  loading: boolean
  error: AppError | null
}