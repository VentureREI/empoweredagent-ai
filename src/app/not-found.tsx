'use client'

import Link from 'next/link'
import { Home, ArrowLeft, Search, MessageCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-gray-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
              EmpoweredAgent.ai
            </h1>
          </Link>
        </div>

        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-purple-600 dark:text-purple-400 mb-4 animate-pulse">
            404
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin">
                <div className="w-4 h-4 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
              </div>
            </div>
            <div className="w-32 h-32 mx-auto flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
          </div>
        </div>

        {/* Error message */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Oops! It looks like our AI agents couldn't find the page you're looking for. 
            The page may have been moved, deleted, or you might have typed the wrong URL.
          </p>
        </div>

        {/* Suggestions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            What can you do?
          </h2>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 text-left">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Check the URL for any typos or errors
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Go back to the previous page using your browser
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Visit our homepage to start fresh
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Use our search feature to find what you need
            </li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 transform hover:scale-105"
          >
            <Home size={20} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 rounded-lg font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Additional help */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Still can't find what you're looking for?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm"
            >
              <MessageCircle size={16} />
              Contact Support
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm"
            >
              <Search size={16} />
              Search Site
            </Link>
          </div>
        </div>

        {/* Popular pages */}
        <div className="mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: 'Products', href: '/products' },
              { name: 'About', href: '/about' },
              { name: 'Pricing', href: '/pricing' },
              { name: 'Blog', href: '/blog' },
              { name: 'Contact', href: '/contact' }
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-1 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}