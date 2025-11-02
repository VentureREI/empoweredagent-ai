'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

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
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg p-6 mb-8">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Limited Time Introductory Pricing
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Lock in special introductory rates for the next:
          </p>

          <div className="grid grid-cols-4 gap-3">
            {/* Days */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-amber-200 dark:border-amber-800/50">
              <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">
                {timeLeft.days}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">
                Days
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-amber-200 dark:border-amber-800/50">
              <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">
                {timeLeft.hours}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">
                Hours
              </div>
            </div>

            {/* Minutes */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-amber-200 dark:border-amber-800/50">
              <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">
                {timeLeft.minutes}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">
                Minutes
              </div>
            </div>

            {/* Seconds */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-amber-200 dark:border-amber-800/50">
              <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">
                {timeLeft.seconds}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">
                Seconds
              </div>
            </div>
          </div>

          <p className="text-sm text-amber-700 dark:text-amber-300 mt-4">
            ✨ Set up fees and monthly pricing locked in at current rates. Regular pricing will increase after this promotional period ends.
          </p>
        </div>
      </div>
    </div>
  )
}
