'use client'

import { useEffect, useRef } from 'react'
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

  // Track previous pathname to detect route changes
  const previousPathnameRef = useRef(pathname)

  // Handle back/forward navigation and route transitions
  useEffect(() => {
    if (pathname !== previousPathnameRef.current) {
      previousPathnameRef.current = pathname
      // Complete the progress bar when pathname changes
      NProgressLib.done()
    }
  }, [pathname])

  return null
}