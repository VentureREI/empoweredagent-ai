import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  variant?: 'default' | 'white' | 'dark'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
}

export function Logo({ className, variant = 'default', size = 'md' }: LogoProps) {
  const getColors = () => {
    switch (variant) {
      case 'white':
        return {
          primary: '#ffffff',
          secondary: '#f3f4f6',
          accent: '#e5e7eb'
        }
      case 'dark':
        return {
          primary: '#1f2937',
          secondary: '#374151',
          accent: '#4b5563'
        }
      default:
        return {
          primary: '#7c3aed',
          secondary: '#a78bfa',
          accent: '#c4b5fd'
        }
    }
  }

  const colors = getColors()

  return (
    <svg
      className={cn(sizeClasses[size], className)}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="EmpoweredAgent.ai Logo"
    >
      {/* Outer Ring */}
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke={colors.primary}
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
      />
      
      {/* Inner Neural Network Pattern */}
      <g className="animate-fade-in">
        {/* Central Node */}
        <circle cx="20" cy="20" r="3" fill={colors.primary} />
        
        {/* Surrounding Nodes */}
        <circle cx="14" cy="12" r="2" fill={colors.secondary} />
        <circle cx="26" cy="12" r="2" fill={colors.secondary} />
        <circle cx="30" cy="20" r="2" fill={colors.secondary} />
        <circle cx="26" cy="28" r="2" fill={colors.secondary} />
        <circle cx="14" cy="28" r="2" fill={colors.secondary} />
        <circle cx="10" cy="20" r="2" fill={colors.secondary} />
        
        {/* Outer Nodes */}
        <circle cx="20" cy="8" r="1.5" fill={colors.accent} />
        <circle cx="32" cy="20" r="1.5" fill={colors.accent} />
        <circle cx="20" cy="32" r="1.5" fill={colors.accent} />
        <circle cx="8" cy="20" r="1.5" fill={colors.accent} />
      </g>
      
      {/* Connection Lines */}
      <g className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        {/* Central to surrounding */}
        <line x1="20" y1="20" x2="14" y2="12" stroke={colors.primary} strokeWidth="1.5" opacity="0.6" />
        <line x1="20" y1="20" x2="26" y2="12" stroke={colors.primary} strokeWidth="1.5" opacity="0.6" />
        <line x1="20" y1="20" x2="30" y2="20" stroke={colors.primary} strokeWidth="1.5" opacity="0.6" />
        <line x1="20" y1="20" x2="26" y2="28" stroke={colors.primary} strokeWidth="1.5" opacity="0.6" />
        <line x1="20" y1="20" x2="14" y2="28" stroke={colors.primary} strokeWidth="1.5" opacity="0.6" />
        <line x1="20" y1="20" x2="10" y2="20" stroke={colors.primary} strokeWidth="1.5" opacity="0.6" />
        
        {/* Surrounding to outer */}
        <line x1="14" y1="12" x2="20" y2="8" stroke={colors.secondary} strokeWidth="1" opacity="0.4" />
        <line x1="26" y1="12" x2="20" y2="8" stroke={colors.secondary} strokeWidth="1" opacity="0.4" />
        <line x1="30" y1="20" x2="32" y2="20" stroke={colors.secondary} strokeWidth="1" opacity="0.4" />
        <line x1="26" y1="28" x2="20" y2="32" stroke={colors.secondary} strokeWidth="1" opacity="0.4" />
        <line x1="14" y1="28" x2="20" y2="32" stroke={colors.secondary} strokeWidth="1" opacity="0.4" />
        <line x1="10" y1="20" x2="8" y2="20" stroke={colors.secondary} strokeWidth="1" opacity="0.4" />
      </g>
      
      {/* AI Symbol in Center */}
      <g className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <text 
          x="20" 
          y="24" 
          textAnchor="middle" 
          fontSize="6" 
          fontWeight="bold" 
          fill="white"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          AI
        </text>
      </g>
    </svg>
  )
}