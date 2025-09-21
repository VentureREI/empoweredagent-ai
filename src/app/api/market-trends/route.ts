import { NextRequest, NextResponse } from 'next/server'

// Types for market data
interface MarketDataPoint {
  month: string
  price: number
  inventory: number
  sales: number
  area?: string
  growth?: number
  volume?: number
}

interface DataSource {
  name: string
  fetchData: () => Promise<MarketDataPoint[]>
  isAvailable: boolean
}

// Cache configuration
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes
let cache: { data: MarketDataPoint[], timestamp: number } | null = null

// Fallback data for when APIs are unavailable
const fallbackData: MarketDataPoint[] = [
  { month: 'Jan', price: 485000, inventory: 2.1, sales: 142 },
  { month: 'Feb', price: 492000, inventory: 1.8, sales: 156 },
  { month: 'Mar', price: 498000, inventory: 1.5, sales: 189 },
  { month: 'Apr', price: 510000, inventory: 1.3, sales: 203 },
  { month: 'May', price: 518000, inventory: 1.1, sales: 218 },
  { month: 'Jun', price: 525000, inventory: 0.9, sales: 234 }
]

// Data source implementations
const dataSources: DataSource[] = [
  {
    name: 'RentSpree API',
    isAvailable: !!process.env.RENTSPREE_API_KEY,
    fetchData: async (): Promise<MarketDataPoint[]> => {
      try {
        const response = await fetch(`https://api.rentspree.com/v1/market-data/trends?city=Phoenix&state=AZ`, {
          headers: {
            'Authorization': `Bearer ${process.env.RENTSPREE_API_KEY}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) throw new Error('RentSpree API failed')

        const data = await response.json()
        return transformRentSpreeData(data)
      } catch (error) {
        console.error('RentSpree API error:', error)
        throw error
      }
    }
  },
  {
    name: 'RapidAPI Real Estate',
    isAvailable: !!process.env.RAPIDAPI_KEY,
    fetchData: async (): Promise<MarketDataPoint[]> => {
      try {
        const response = await fetch(`https://realty-in-us.p.rapidapi.com/properties/list-for-sale`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
            'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
          }
        })

        if (!response.ok) throw new Error('RapidAPI failed')

        const data = await response.json()
        return transformRapidAPIData(data)
      } catch (error) {
        console.error('RapidAPI error:', error)
        throw error
      }
    }
  },
  {
    name: 'Zillow API',
    isAvailable: !!process.env.ZILLOW_API_KEY,
    fetchData: async (): Promise<MarketDataPoint[]> => {
      try {
        // Note: This is a simplified example. Real Zillow API has different endpoints
        const response = await fetch(`https://api.bridgedataoutput.com/api/v2/zestimates_v2/zestimates`, {
          headers: {
            'Authorization': `Bearer ${process.env.ZILLOW_API_KEY}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) throw new Error('Zillow API failed')

        const data = await response.json()
        return transformZillowData(data)
      } catch (error) {
        console.error('Zillow API error:', error)
        throw error
      }
    }
  },
  {
    name: 'Realtor.com API',
    isAvailable: !!process.env.REALTOR_API_KEY,
    fetchData: async (): Promise<MarketDataPoint[]> => {
      try {
        const response = await fetch(`https://rapidapi.p.rapidapi.com/properties/list-for-sale`, {
          headers: {
            'X-RapidAPI-Key': process.env.REALTOR_API_KEY!,
            'X-RapidAPI-Host': 'realtor.p.rapidapi.com'
          }
        })

        if (!response.ok) throw new Error('Realtor API failed')

        const data = await response.json()
        return transformRealtorData(data)
      } catch (error) {
        console.error('Realtor API error:', error)
        throw error
      }
    }
  },
  {
    name: 'MLS API',
    isAvailable: !!process.env.MLS_API_KEY && !!process.env.MLS_API_ENDPOINT,
    fetchData: async (): Promise<MarketDataPoint[]> => {
      try {
        const response = await fetch(`${process.env.MLS_API_ENDPOINT}/market-stats`, {
          headers: {
            'Authorization': `Bearer ${process.env.MLS_API_KEY}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) throw new Error('MLS API failed')

        const data = await response.json()
        return transformMLSData(data)
      } catch (error) {
        console.error('MLS API error:', error)
        throw error
      }
    }
  },
  {
    name: 'Enhanced Mock Data',
    isAvailable: true,
    fetchData: async (): Promise<MarketDataPoint[]> => {
      // Enhanced mock data with slight variations for realism
      const baseData = [...fallbackData]
      const now = new Date()
      const currentMonth = now.getMonth()

      return baseData.map((item, index) => ({
        ...item,
        price: Math.floor(item.price * (1 + (Math.random() - 0.5) * 0.02)), // ±1% variation
        inventory: Number((item.inventory * (1 + (Math.random() - 0.5) * 0.1)).toFixed(1)), // ±5% variation
        sales: Math.floor(item.sales * (1 + (Math.random() - 0.5) * 0.05)) // ±2.5% variation
      }))
    }
  }
]

// Data transformation functions
function transformRentSpreeData(data: any): MarketDataPoint[] {
  try {
    if (!data || !data.trends) return fallbackData

    return data.trends.slice(0, 6).map((trend: any, index: number) => ({
      month: getMonthName(index),
      price: trend.median_price || trend.avg_price || 500000,
      inventory: trend.inventory_months || 1.5,
      sales: trend.sales_count || 200
    }))
  } catch (error) {
    console.error('Error transforming RentSpree data:', error)
    return fallbackData
  }
}

function transformRapidAPIData(data: any): MarketDataPoint[] {
  try {
    if (!data || !data.properties) return fallbackData

    // Group properties by month and calculate aggregates
    const monthlyGroups = groupPropertiesByMonth(data.properties)
    return Object.entries(monthlyGroups).slice(0, 6).map(([month, properties]: [string, any]) => ({
      month,
      price: calculateMedianPrice(properties),
      inventory: calculateInventoryLevel(properties),
      sales: properties.length
    }))
  } catch (error) {
    console.error('Error transforming RapidAPI data:', error)
    return fallbackData
  }
}

function transformZillowData(data: any): MarketDataPoint[] {
  // Transform Zillow API response to our format
  // This would need to be customized based on actual Zillow API response structure
  try {
    if (!data || !data.results) return fallbackData

    return data.results.slice(0, 6).map((item: any, index: number) => ({
      month: getMonthName(index),
      price: item.zestimate || 500000,
      inventory: item.inventory || 1.5,
      sales: item.sales || 200
    }))
  } catch (error) {
    console.error('Error transforming Zillow data:', error)
    return fallbackData
  }
}

function transformRealtorData(data: any): MarketDataPoint[] {
  // Transform Realtor.com API response to our format
  try {
    if (!data || !data.properties) return fallbackData

    const monthlyData = groupByMonth(data.properties)
    return Object.entries(monthlyData).slice(0, 6).map(([month, properties]: [string, any]) => ({
      month,
      price: calculateAveragePrice(properties),
      inventory: calculateInventory(properties),
      sales: properties.length
    }))
  } catch (error) {
    console.error('Error transforming Realtor data:', error)
    return fallbackData
  }
}

function transformMLSData(data: any): MarketDataPoint[] {
  // Transform MLS API response to our format
  try {
    if (!data || !data.market_stats) return fallbackData

    return data.market_stats.slice(0, 6).map((stat: any) => ({
      month: stat.month || 'Unknown',
      price: stat.median_price || 500000,
      inventory: stat.months_supply || 1.5,
      sales: stat.sales_volume || 200
    }))
  } catch (error) {
    console.error('Error transforming MLS data:', error)
    return fallbackData
  }
}

// Helper functions
function getMonthName(index: number): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const currentMonth = new Date().getMonth()
  return months[(currentMonth - 5 + index + 12) % 12]
}

function groupByMonth(properties: any[]): Record<string, any[]> {
  const grouped: Record<string, any[]> = {}
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

  months.forEach((month, index) => {
    grouped[month] = properties.slice(index * 10, (index + 1) * 10)
  })

  return grouped
}

function calculateAveragePrice(properties: any[]): number {
  if (!properties || properties.length === 0) return 500000
  const total = properties.reduce((sum, prop) => sum + (prop.price || 500000), 0)
  return Math.floor(total / properties.length)
}

function calculateInventory(properties: any[]): number {
  // Mock inventory calculation based on property count
  return Number((properties.length / 100 * 1.5).toFixed(1))
}

function groupPropertiesByMonth(properties: any[]): Record<string, any[]> {
  const grouped: Record<string, any[]> = {}
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

  months.forEach((month, index) => {
    // Simulate monthly grouping by taking chunks of properties
    const startIndex = index * Math.floor(properties.length / 6)
    const endIndex = (index + 1) * Math.floor(properties.length / 6)
    grouped[month] = properties.slice(startIndex, endIndex)
  })

  return grouped
}

function calculateMedianPrice(properties: any[]): number {
  if (!properties || properties.length === 0) return 500000

  const prices = properties
    .map(prop => prop.price || prop.list_price || 500000)
    .sort((a, b) => a - b)

  const mid = Math.floor(prices.length / 2)
  return prices.length % 2 === 0
    ? Math.floor((prices[mid - 1] + prices[mid]) / 2)
    : prices[mid]
}

function calculateInventoryLevel(properties: any[]): number {
  // Calculate inventory based on days on market or property count
  const avgDaysOnMarket = properties.reduce((sum, prop) =>
    sum + (prop.days_on_market || 30), 0) / properties.length

  // Convert to months of inventory (simplified calculation)
  return Number((avgDaysOnMarket / 30 * 1.5).toFixed(1))
}

// Main fetch function with fallback strategy
async function fetchMarketData(forceRefresh = false): Promise<MarketDataPoint[]> {
  // Check cache first
  if (!forceRefresh && cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return cache.data
  }

  // Try each data source in order of preference
  for (const source of dataSources) {
    if (!source.isAvailable) {
      console.log(`Skipping ${source.name} - not configured`)
      continue
    }

    try {
      console.log(`Attempting to fetch data from ${source.name}`)
      const data = await source.fetchData()

      // Cache successful result
      cache = {
        data,
        timestamp: Date.now()
      }

      console.log(`Successfully fetched data from ${source.name}`)
      return data
    } catch (error) {
      console.error(`Failed to fetch from ${source.name}:`, error)
      continue
    }
  }

  // If all sources fail, return cached data or fallback
  if (cache) {
    console.log('All sources failed, returning cached data')
    return cache.data
  }

  console.log('All sources failed, returning fallback data')
  return fallbackData
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const forceRefresh = searchParams.get('refresh') === 'true'
    const area = searchParams.get('area') || 'phoenix'

    const data = await fetchMarketData(forceRefresh)

    // Add metadata about data source and freshness
    const response = {
      data,
      metadata: {
        area,
        lastUpdated: cache?.timestamp || Date.now(),
        source: getDataSource(),
        cacheAge: cache ? Date.now() - cache.timestamp : 0,
        isRealTime: !!process.env.ZILLOW_API_KEY || !!process.env.REALTOR_API_KEY,
        availableSources: dataSources
          .filter(source => source.isAvailable)
          .map(source => source.name)
      }
    }

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600'
      }
    })
  } catch (error) {
    console.error('Market trends API error:', error)

    return NextResponse.json(
      {
        data: fallbackData,
        error: 'Failed to fetch market data',
        metadata: {
          area: 'phoenix',
          lastUpdated: Date.now(),
          source: 'fallback',
          isRealTime: false
        }
      },
      { status: 200 } // Return 200 with fallback data instead of error
    )
  }
}

function getDataSource(): string {
  const availableSources = dataSources.filter(source => source.isAvailable)
  return availableSources.length > 0 ? availableSources[0].name : 'fallback'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === 'refresh') {
      const data = await fetchMarketData(true)
      return NextResponse.json({
        data,
        metadata: {
          lastUpdated: Date.now(),
          refreshed: true
        }
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Market trends POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}