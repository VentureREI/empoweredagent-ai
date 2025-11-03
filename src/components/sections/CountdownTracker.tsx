'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTracker() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('countdown-tracker')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!mounted) return

    const calculateTimeLeft = () => {
      // November 14th, 2024 at 10:00 AM PST
      // PST is UTC-8
      const launchDate = new Date('2024-11-14T10:00:00-08:00').getTime()
      const now = new Date().getTime()
      const distance = launchDate - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / 1000 / 60) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [mounted])

  return (
    <div
      id="countdown-tracker"
      className={cn(
        'bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg px-6 py-5 mb-12 transition-all duration-1000',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}>
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Limited Time Introductory Pricing
            </h3>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Lock in special introductory rates for the next:
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {/* Days */}
          <div className="bg-white dark:bg-gray-900/50 rounded p-2 text-center border border-purple-200 dark:border-purple-800/30">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Days
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white dark:bg-gray-900/50 rounded p-2 text-center border border-purple-200 dark:border-purple-800/30">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Hours
            </div>
          </div>

          {/* Minutes */}
          <div className="bg-white dark:bg-gray-900/50 rounded p-2 text-center border border-purple-200 dark:border-purple-800/30">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Minutes
            </div>
          </div>

          {/* Seconds */}
          <div className="bg-white dark:bg-gray-900/50 rounded p-2 text-center border border-purple-200 dark:border-purple-800/30">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Seconds
            </div>
          </div>
        </div>

        <p className="text-xs text-purple-700 dark:text-purple-300">
          ✨ Set up fees and monthly pricing locked in at current rates. Regular pricing will increase after this promotional period ends.
        </p>
      </div>
    </div>
  )
}
