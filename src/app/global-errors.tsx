'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { RefreshCw, Home, MessageCircle, AlertTriangle } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
    
    // In production, you would send this to your error tracking service
    // e.g., Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error)
    }
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-gray-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg w-full text-center">
            {/* Logo */}
            <div className="mb-8">
              <Logo size="lg" />
            </div>

            {/* Error icon */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                <AlertTriangle className="text-red-600 dark:text-red-400" size={48} />
              </div>
            </div>

            {/* Error message */}
            <div className="space-y-4 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Something Went Wrong
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                We're sorry, but our AI agents encountered an unexpected error. 
                This issue has been automatically reported to our team for investigation.
              </p>
            </div>

            {/* Error details (development only) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8 text-left">
                <h3 className="font-semibold text-red-900 dark:text-red-300 mb-2">
                  Error Details (Development Only):
                </h3>
                <code className="text-sm text-red-800 dark:text-red-400 break-all">
                  {error.message}
                </code>
                {error.digest && (
                  <p className="text-xs text-red-700 dark:text-red-500 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* Suggestions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                What you can try:
              </h2>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 text-left">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  Refresh the page to try again
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  Check your internet connection
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  Try again in a few minutes
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  Contact our support team if the problem persists
                </li>
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={reset}
                size="lg"
                className="flex-1 sm:flex-none"
              >
                <RefreshCw size={20} className="mr-2" />
                Try Again
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="flex-1 sm:flex-none"
                asChild
              >
                <a href="/">
                  <Home size={20} className="mr-2" />
                  Go Home
                </a>
              </Button>
            </div>

            {/* Contact support */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Need immediate assistance?
              </p>
              <Button
                variant="ghost"
                size="sm"
                asChild
              >
                <a href="/contact">
                  <MessageCircle size={16} className="mr-2" />
                  Contact Support
                </a>
              </Button>
            </div>

            {/* Error ID for support */}
            {error.digest && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Reference this error ID when contacting support: {error.digest}
                </p>
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}