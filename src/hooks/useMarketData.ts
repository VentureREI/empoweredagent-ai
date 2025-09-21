'use client'

import { useState, useEffect, useCallback } from 'react'

interface MarketDataPoint {
  month: string
  price: number
  inventory: number
  sales: number
  area?: string
  growth?: number
  volume?: number
}

interface MarketDataResponse {
  data: MarketDataPoint[]
  metadata: {
    area: string
    lastUpdated: number
    source: string
    cacheAge: number
    isRealTime: boolean
    availableSources: string[]
  }
  error?: string
}

interface UseMarketDataOptions {
  area?: string
  autoRefresh?: boolean
  refreshInterval?: number
}

export function useMarketData(options: UseMarketDataOptions = {}) {
  const {
    area = 'phoenix',
    autoRefresh = true,
    refreshInterval = 30 * 60 * 1000 // 30 minutes
  } = options

  const [data, setData] = useState<MarketDataPoint[]>([])
  const [metadata, setMetadata] = useState<MarketDataResponse['metadata'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<number>(Date.now())

  const fetchData = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        area,
        ...(forceRefresh && { refresh: 'true' })
      })

      const response = await fetch(`/api/market-trends?${params}`)
      const result: MarketDataResponse = await response.json()

      if (result.error) {
        setError(result.error)
      }

      setData(result.data)
      setMetadata(result.metadata)
      setLastRefresh(Date.now())
    } catch (err) {
      console.error('Failed to fetch market data:', err)
      setError('Failed to fetch market data')
    } finally {
      setLoading(false)
    }
  }, [area])

  const refresh = useCallback(() => {
    return fetchData(true)
  }, [fetchData])

  // Initial data fetch
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Auto refresh setup
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchData()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, fetchData])

  // Data age calculation
  const dataAge = metadata ? Date.now() - metadata.lastUpdated : 0
  const isStale = dataAge > refreshInterval
  const dataAgeMinutes = Math.floor(dataAge / (1000 * 60))

  return {
    data,
    metadata,
    loading,
    error,
    refresh,
    lastRefresh,
    dataAge,
    dataAgeMinutes,
    isStale,
    isRealTime: metadata?.isRealTime || false,
    availableSources: metadata?.availableSources || []
  }
}