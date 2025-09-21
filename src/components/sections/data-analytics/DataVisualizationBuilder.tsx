'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useMarketData } from '@/hooks/useMarketData'
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Target,
  Activity,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Download,
  Share2,
  Filter,
  Settings,
  Zap,
  RefreshCw,
  Wifi,
  WifiOff
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const visualizationTypes = [
  {
    id: 'market-trends',
    name: 'Market Trends',
    description: 'Real-time price and inventory trends',
    icon: TrendingUp,
    chartType: LineChart,
    color: 'from-blue-500 to-cyan-600',
    dataPoints: [
      { month: 'Jan', price: 485000, inventory: 2.1, sales: 142 },
      { month: 'Feb', price: 492000, inventory: 1.8, sales: 156 },
      { month: 'Mar', price: 498000, inventory: 1.5, sales: 189 },
      { month: 'Apr', price: 510000, inventory: 1.3, sales: 203 },
      { month: 'May', price: 518000, inventory: 1.1, sales: 218 },
      { month: 'Jun', price: 525000, inventory: 0.9, sales: 234 }
    ]
  },
  {
    id: 'lead-sources',
    name: 'Lead Source Analysis',
    description: 'Lead generation and conversion tracking',
    icon: Users,
    chartType: PieChart,
    color: 'from-purple-500 to-violet-600',
    dataPoints: [
      { source: 'Online', leads: 245, conversions: 58, cost: 12400 },
      { source: 'Referrals', leads: 89, conversions: 34, cost: 0 },
      { source: 'Social Media', leads: 156, conversions: 28, cost: 5600 },
      { source: 'Direct Mail', leads: 67, conversions: 12, cost: 8900 },
      { source: 'Open Houses', leads: 123, conversions: 19, cost: 3200 }
    ]
  },
  {
    id: 'portfolio-performance',
    name: 'Portfolio Performance',
    description: 'Property ROI and cash flow analysis',
    icon: DollarSign,
    chartType: BarChart3,
    color: 'from-green-500 to-emerald-600',
    dataPoints: [
      { property: 'Property A', roi: 12.5, cashFlow: 2400, value: 485000 },
      { property: 'Property B', roi: 8.9, cashFlow: 1850, value: 325000 },
      { property: 'Property C', roi: 15.2, cashFlow: 3200, value: 675000 },
      { property: 'Property D', roi: 6.7, cashFlow: 1200, value: 295000 },
      { property: 'Property E', roi: 11.8, cashFlow: 2800, value: 520000 }
    ]
  },
  {
    id: 'geographic-analysis',
    name: 'Geographic Analysis',
    description: 'Location-based market intelligence',
    icon: MapPin,
    chartType: BarChart3,
    color: 'from-orange-500 to-red-600',
    dataPoints: [
      { area: 'Downtown', avgPrice: 650000, growth: 8.5, volume: 89 },
      { area: 'Suburban North', avgPrice: 425000, growth: 12.2, volume: 156 },
      { area: 'Waterfront', avgPrice: 850000, growth: 5.8, volume: 34 },
      { area: 'Historic District', avgPrice: 520000, growth: 9.8, volume: 67 },
      { area: 'New Development', avgPrice: 480000, growth: 18.5, volume: 123 }
    ]
  }
]

const interactiveFeatures = [
  { icon: Play, label: 'Real-time Updates', description: 'Live data streaming' },
  { icon: Filter, label: 'Smart Filters', description: 'AI-powered filtering' },
  { icon: Download, label: 'Export Options', description: 'Multiple formats' },
  { icon: Share2, label: 'Easy Sharing', description: 'Client presentations' }
]

export function DataVisualizationBuilder() {
  const [activeVisualization, setActiveVisualization] = useState('market-trends')
  const [isAnimating, setIsAnimating] = useState(true)
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Real market data integration
  const {
    data: marketData,
    metadata,
    loading,
    error,
    refresh,
    dataAgeMinutes,
    isStale,
    isRealTime
  } = useMarketData({
    area: 'phoenix',
    autoRefresh: true,
    refreshInterval: 30 * 60 * 1000 // 30 minutes
  })

  const currentViz = visualizationTypes.find(v => v.id === activeVisualization)

  // Use real data for market trends, fallback to static data for others
  const getVisualizationData = () => {
    if (activeVisualization === 'market-trends' && marketData.length > 0) {
      return marketData
    }
    return currentViz?.dataPoints || []
  }

  const visualizationData = getVisualizationData()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  const renderVisualization = () => {
    if (!currentViz) return null

    const ChartIcon = currentViz.chartType

    return (
      <div className="relative w-full h-96 bg-gradient-to-br from-gray-50 to-white dark:from-dark-800 dark:to-dark-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
        {/* Chart Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${currentViz.color} rounded-lg flex items-center justify-center`}>
              <currentViz.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-bold text-gray-900 dark:text-white">{currentViz.name}</h4>
                {activeVisualization === 'market-trends' && (
                  <div className="flex items-center space-x-2">
                    {isRealTime ? (
                      <div className="flex items-center space-x-1">
                        <Wifi className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-green-600 font-medium">Live</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <WifiOff className="w-3 h-3 text-orange-500" />
                        <span className="text-xs text-orange-600 font-medium">Demo</span>
                      </div>
                    )}
                    {error && (
                      <span className="text-xs text-red-500">⚠ {error}</span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">{currentViz.description}</p>
                {activeVisualization === 'market-trends' && metadata && (
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>Updated {dataAgeMinutes}m ago</span>
                    <span>•</span>
                    <span>{metadata.source}</span>
                    {isStale && <span className="text-orange-500">• Stale</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {activeVisualization === 'market-trends' && (
              <Button
                size="sm"
                variant="outline"
                onClick={refresh}
                disabled={loading}
                className="relative"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAnimating(!isAnimating)}
            >
              {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button size="sm" variant="outline">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Interactive Chart Area */}
        <div className="relative h-64">
          {activeVisualization === 'market-trends' && currentViz && (
            <div className="flex items-end justify-between h-full space-x-4">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-dark-800/80 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Loading market data...</span>
                  </div>
                </div>
              )}
              {visualizationData.map((point: any, index: number) => (
                <motion.div
                  key={index}
                  className="flex-1 flex flex-col items-center cursor-pointer group"
                  onClick={() => setSelectedDataPoint(point)}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-md relative"
                    initial={{ height: 0 }}
                    animate={{
                      height: isAnimating ? `${(point.price / 600000) * 100}%` : '60%'
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 0.1,
                      repeat: isAnimating ? Infinity : 0,
                      repeatType: "reverse",
                      repeatDelay: 2
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      ${(point.price / 1000).toFixed(0)}K
                    </div>
                  </motion.div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">{point.month}</div>
                </motion.div>
              ))}
            </div>
          )}

          {activeVisualization === 'lead-sources' && currentViz && (
            <div className="relative h-full flex items-center justify-center">
              <div className="relative w-48 h-48">
                {currentViz.dataPoints.map((source: any, index: number) => {
                  const percentage = (source.leads / 680) * 100
                  const rotation = (index * 72) - 90 // Distribute evenly around circle
                  return (
                    <motion.div
                      key={index}
                      className="absolute top-1/2 left-1/2 origin-bottom cursor-pointer group"
                      style={{
                        transform: `translate(-50%, -100%) rotate(${rotation}deg)`,
                        width: '2px',
                        height: '96px'
                      }}
                      onClick={() => setSelectedDataPoint(source)}
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.div
                        className={`w-full bg-gradient-to-t ${
                          index === 0 ? 'from-blue-500 to-blue-400' :
                          index === 1 ? 'from-purple-500 to-purple-400' :
                          index === 2 ? 'from-green-500 to-green-400' :
                          index === 3 ? 'from-orange-500 to-orange-400' :
                          'from-red-500 to-red-400'
                        } rounded-t-sm`}
                        initial={{ height: 0 }}
                        animate={{
                          height: isAnimating ? `${percentage}%` : '60%'
                        }}
                        transition={{
                          duration: 1,
                          delay: index * 0.2
                        }}
                      />
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                           style={{ transform: `translate(-50%, 0) rotate(${-rotation}deg)` }}>
                        {source.source}: {source.leads}
                      </div>
                    </motion.div>
                  )
                })}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-full" />
              </div>
            </div>
          )}

          {activeVisualization === 'portfolio-performance' && currentViz && (
            <div className="flex items-end justify-between h-full space-x-6">
              {currentViz.dataPoints.map((property: any, index: number) => (
                <motion.div
                  key={index}
                  className="flex-1 flex flex-col items-center cursor-pointer group"
                  onClick={() => setSelectedDataPoint(property)}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-md relative"
                    initial={{ height: 0 }}
                    animate={{
                      height: isAnimating ? `${(property.roi / 20) * 100}%` : '60%'
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 0.15
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {property.roi}% ROI
                    </div>
                  </motion.div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">{property.property}</div>
                </motion.div>
              ))}
            </div>
          )}

          {activeVisualization === 'geographic-analysis' && currentViz && (
            <div className="grid grid-cols-5 gap-4 h-full">
              {currentViz.dataPoints.map((area: any, index: number) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center justify-end cursor-pointer group"
                  onClick={() => setSelectedDataPoint(area)}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-full bg-gradient-to-t from-orange-500 to-red-400 rounded-t-md relative"
                    initial={{ height: 0 }}
                    animate={{
                      height: isAnimating ? `${(area.growth / 20) * 100}%` : '60%'
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 0.1
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {area.growth}% growth
                    </div>
                  </motion.div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-2 text-center">
                    {area.area.split(' ')[0]}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Data Point Details */}
        {selectedDataPoint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 right-4 bg-white dark:bg-dark-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600"
          >
            <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Selected Data Point
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              {JSON.stringify(selectedDataPoint, null, 2)}
            </div>
          </motion.div>
        )}
      </div>
    )
  }

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-gradient-to-l from-purple-100 to-transparent dark:from-purple-900/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-gradient-to-r from-blue-100 to-transparent dark:from-blue-900/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Interactive <span className="text-gradient">Data Visualization</span> Builder
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Build stunning, interactive dashboards that turn complex real estate data into
            clear, actionable insights. Click on any visualization to explore the data.
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Visualization Type Selector */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {visualizationTypes.map((viz) => {
                const IconComponent = viz.icon
                const ChartIcon = viz.chartType
                return (
                  <motion.div
                    key={viz.id}
                    variants={itemVariants}
                    className={`cursor-pointer transition-all duration-300 ${
                      activeVisualization === viz.id ? 'transform scale-105' : 'hover:scale-102'
                    }`}
                    onClick={() => setActiveVisualization(viz.id)}
                  >
                    <Card
                      className={`p-6 text-center ${
                        activeVisualization === viz.id
                          ? 'border-2 border-primary-500 shadow-lg'
                          : 'border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${viz.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        {viz.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {viz.description}
                      </p>
                      <div className="flex items-center justify-center">
                        <ChartIcon className="w-4 h-4 text-gray-400" />
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Interactive Visualization */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="mb-16"
          >
            <motion.div variants={itemVariants}>
              {renderVisualization()}
            </motion.div>
          </motion.div>

          {/* Interactive Features */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="mb-16"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            >
              Powerful Interactive Features
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {interactiveFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    custom={index}
                  >
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        {feature.label}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={itemVariants}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-purple-600 to-blue-700 rounded-3xl p-12 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-hero-pattern opacity-10" />

              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">
                  Ready to Visualize Your Data?
                </h3>
                <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                  Transform your real estate data into powerful, interactive visualizations that
                  drive better decisions and impress clients.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Try Interactive Demo
                  </Button>

                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-white border-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
                  >
                    Build My Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}