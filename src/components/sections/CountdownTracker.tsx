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
    const calculateTimeLeft = () => {
      // Set expiration to 30 days from now
      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 30)

      const now = new Date().getTime()
      const distance = expirationDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / 1000 / 60) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      id="countdown-tracker"
      className={cn(
        'bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border border-purple-200 dark:border-purple-800/50 rounded-lg p-8 mb-16 transition-all duration-1000',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Limited Time Introductory Pricing
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Lock in special introductory rates for the next:
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {/* Days */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center border border-purple-200 dark:border-purple-800/50">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">
              {timeLeft.days}
            </div>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium mt-2">
              Days
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center border border-purple-200 dark:border-purple-800/50">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">
              {timeLeft.hours}
            </div>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium mt-2">
              Hours
            </div>
          </div>

          {/* Minutes */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center border border-purple-200 dark:border-purple-800/50">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">
              {timeLeft.minutes}
            </div>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium mt-2">
              Minutes
            </div>
          </div>

          {/* Seconds */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center border border-purple-200 dark:border-purple-800/50">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">
              {timeLeft.seconds}
            </div>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium mt-2">
              Seconds
            </div>
          </div>
        </div>

        <p className="text-sm text-purple-700 dark:text-purple-300">
          ✨ Set up fees and monthly pricing locked in at current rates. Regular pricing will increase after this promotional period ends.
        </p>
      </div>
    </div>
  )
}
