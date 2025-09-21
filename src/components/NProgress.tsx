'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NProgressLib from 'nprogress'

// Configure NProgress
NProgressLib.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08,
  easing: 'ease',
  speed: 200,
})

// Custom styles for NProgress to match our theme
const nprogressStyles = `
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: linear-gradient(90deg, #7c3aed, #a78bfa);
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    border-radius: 0 0 2px 2px;
    box-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px rgba(124, 58, 237, 0.7), 0 0 5px rgba(124, 58, 237, 0.7);
    opacity: 1.0;
    transform: rotate(3deg) translate(0px, -4px);
  }

  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border: solid 2px transparent;
    border-top-color: #7c3aed;
    border-left-color: #7c3aed;
    border-radius: 50%;
    animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom {
    #nprogress .bar {
      background: linear-gradient(90deg, #7c3aed, #a78bfa);
    }
  }

  @keyframes nprogress-spinner {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

export function NProgress() {
  const pathname = usePathname()

  useEffect(() => {
    // Inject custom styles
    const style = document.createElement('style')
    style.textContent = nprogressStyles
    document.head.appendChild(style)

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  useEffect(() => {
    // Start progress bar when route changes
    NProgressLib.start()

    // Complete progress bar after a delay
    const timer = setTimeout(() => {
      NProgressLib.done()
    }, 100)

    return () => {
      clearTimeout(timer)
      NProgressLib.done()
    }
  }, [pathname])

  // Handle manual navigation events
  useEffect(() => {
    const handleStart = () => NProgressLib.start()
    const handleComplete = () => NProgressLib.done()

    // Listen for programmatic navigation
    const originalPushState = window.history.pushState
    const originalReplaceState = window.history.replaceState

    window.history.pushState = function(...args) {
      handleStart()
      originalPushState.apply(window.history, args)
      setTimeout(handleComplete, 100)
    }

    window.history.replaceState = function(...args) {
      handleStart()
      originalReplaceState.apply(window.history, args)
      setTimeout(handleComplete, 100)
    }

    // Listen for back/forward navigation
    window.addEventListener('popstate', handleStart)
    
    // Listen for link clicks
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        handleStart()
        setTimeout(handleComplete, 100)
      }
    }

    document.addEventListener('click', handleLinkClick)

    return () => {
      // Restore original methods
      window.history.pushState = originalPushState
      window.history.replaceState = originalReplaceState
      
      // Remove event listeners
      window.removeEventListener('popstate', handleStart)
      document.removeEventListener('click', handleLinkClick)
    }
  }, [])

  return null
}