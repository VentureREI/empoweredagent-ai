// Integration Types for Real Estate Platform

export interface Integration {
  id: string
  name: string
  category: IntegrationCategory
  description: string
  logo?: string
  icon?: string
  color: string
  status: IntegrationStatus
  isPopular: boolean
  features: string[]
  connectionType: ConnectionType
  setupTime: string
  complexity: IntegrationComplexity
  pricing?: IntegrationPricing
  fields: IntegrationField[]
  endpoints?: IntegrationEndpoint[]
  authentication: AuthenticationType
  rateLimits?: RateLimit
  documentation?: string
  supportLevel: SupportLevel
  lastUpdated: Date
  version: string
}

export interface IntegrationField {
  id: string
  name: string
  type: FieldType
  required: boolean
  description: string
  defaultValue?: any
  validation?: FieldValidation
  mapping?: FieldMapping
}

export interface IntegrationEndpoint {
  id: string
  name: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  description: string
  parameters?: EndpointParameter[]
  response?: EndpointResponse
  rateLimit?: number
}

export interface EndpointParameter {
  name: string
  type: string
  required: boolean
  description: string
  example?: any
}

export interface EndpointResponse {
  type: string
  description: string
  example?: any
  schema?: any
}

export interface FieldMapping {
  sourceField: string
  targetField: string
  transformation?: TransformationType
  conditions?: MappingCondition[]
}

export interface MappingCondition {
  field: string
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan'
  value: any
}

export interface FieldValidation {
  minLength?: number
  maxLength?: number
  pattern?: string
  min?: number
  max?: number
  enum?: string[]
}

export interface IntegrationPricing {
  model: 'free' | 'freemium' | 'subscription' | 'payPerUse' | 'enterprise'
  cost?: number
  period?: 'monthly' | 'yearly' | 'perRequest'
  freeQuota?: number
  features: string[]
}

export interface RateLimit {
  requests: number
  period: 'second' | 'minute' | 'hour' | 'day'
  resetTime?: string
}

export interface WorkflowStep {
  id: string
  name: string
  type: WorkflowStepType
  description: string
  order: number
  configuration: Record<string, any>
  inputFields: string[]
  outputFields: string[]
  conditions?: WorkflowCondition[]
  transformations?: DataTransformation[]
}

export interface WorkflowCondition {
  field: string
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan' | 'isEmpty' | 'isNotEmpty'
  value: any
}

export interface DataTransformation {
  id: string
  name: string
  type: TransformationType
  sourceField: string
  targetField: string
  configuration: Record<string, any>
}

export interface IntegrationWorkflow {
  id: string
  name: string
  description: string
  category: WorkflowCategory
  source: Integration
  destination: Integration
  steps: WorkflowStep[]
  isActive: boolean
  schedule?: WorkflowSchedule
  errorHandling: ErrorHandlingStrategy
  lastRun?: Date
  nextRun?: Date
  stats: WorkflowStats
  createdAt: Date
  updatedAt: Date
}

export interface WorkflowSchedule {
  type: 'manual' | 'interval' | 'cron' | 'realtime' | 'webhook'
  interval?: number // in minutes
  cronExpression?: string
  timezone?: string
  maxRetries?: number
  retryDelay?: number // in minutes
}

export interface WorkflowStats {
  totalRuns: number
  successfulRuns: number
  failedRuns: number
  averageRunTime: number // in seconds
  lastRunStatus: 'success' | 'failed' | 'partial' | 'running'
  recordsProcessed: number
  recordsSkipped: number
  recordsFailed: number
}

export interface IntegrationConnection {
  id: string
  integrationId: string
  name: string
  status: ConnectionStatus
  configuration: Record<string, any>
  credentials: Record<string, string>
  testResult?: ConnectionTestResult
  lastSync?: Date
  nextSync?: Date
  createdAt: Date
  updatedAt: Date
}

export interface ConnectionTestResult {
  success: boolean
  message: string
  details?: Record<string, any>
  testedAt: Date
}

export interface ROICalculation {
  teamSize: number
  hoursPerWeek: number
  hourlyRate: number
  currentProcessingTime: ProcessingTime
  integrationCount: number
  dealVolume: number
  results: ROIResults
  calculatedAt: Date
}

export interface ProcessingTime {
  dataEntry: number // hours per week
  reporting: number // hours per week
  followUp: number // hours per week
  administration: number // hours per week
}

export interface ROIResults {
  weeklySavings: number
  monthlySavings: number
  annualSavings: number
  efficiencyGain: number // percentage
  roiPercentage: number
  paybackPeriod: number // months
  costReduction: number
  revenueIncrease: number
  timeRecovered: number // hours per week
  automationLevel: number // percentage
}

export interface IntegrationTemplate {
  id: string
  name: string
  description: string
  category: WorkflowCategory
  sourceType: string
  destinationType: string
  estimatedSetupTime: string
  difficulty: IntegrationComplexity
  usageCount: number
  steps: string[]
  configuration: Record<string, any>
  requiredFields: string[]
  benefits: string[]
  tags: string[]
}

export interface IntegrationPackage {
  id: string
  name: string
  description: string
  price: number
  period: 'monthly' | 'yearly'
  features: string[]
  integrationLimit: number | 'unlimited'
  teamSizeLimit: string
  setupTime: string
  supportLevel: SupportLevel
  popular: boolean
  color: string
}

// Enums and Types

export type IntegrationCategory =
  | 'crm'
  | 'mls'
  | 'marketing'
  | 'communication'
  | 'analytics'
  | 'financial'
  | 'documents'
  | 'social'
  | 'productivity'
  | 'lead-generation'
  | 'property-management'
  | 'transaction-management'

export type IntegrationStatus =
  | 'active'
  | 'inactive'
  | 'deprecated'
  | 'beta'
  | 'coming-soon'
  | 'maintenance'

export type ConnectionType =
  | 'bi-directional'
  | 'pull-data'
  | 'push-data'
  | 'webhook'
  | 'api'
  | 'file-transfer'

export type IntegrationComplexity =
  | 'simple'
  | 'medium'
  | 'advanced'
  | 'expert'

export type AuthenticationType =
  | 'api-key'
  | 'oauth1'
  | 'oauth2'
  | 'basic'
  | 'bearer'
  | 'custom'

export type SupportLevel =
  | 'community'
  | 'standard'
  | 'priority'
  | 'dedicated'
  | 'enterprise'

export type FieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'email'
  | 'phone'
  | 'url'
  | 'text'
  | 'select'
  | 'multiselect'
  | 'file'
  | 'json'
  | 'array'

export type TransformationType =
  | 'direct'
  | 'format'
  | 'calculate'
  | 'concatenate'
  | 'split'
  | 'uppercase'
  | 'lowercase'
  | 'trim'
  | 'replace'
  | 'lookup'
  | 'conditional'
  | 'custom'

export type WorkflowStepType =
  | 'extract'
  | 'transform'
  | 'load'
  | 'filter'
  | 'enrich'
  | 'validate'
  | 'notify'
  | 'delay'
  | 'condition'
  | 'loop'
  | 'webhook'

export type WorkflowCategory =
  | 'lead-nurturing'
  | 'data-sync'
  | 'reporting'
  | 'client-onboarding'
  | 'marketing-automation'
  | 'transaction-processing'
  | 'property-updates'
  | 'communication'
  | 'analytics'
  | 'backup'

export type ConnectionStatus =
  | 'connected'
  | 'disconnected'
  | 'error'
  | 'pending'
  | 'testing'
  | 'expired'

export type ErrorHandlingStrategy =
  | 'retry'
  | 'skip'
  | 'stop'
  | 'log-and-continue'
  | 'custom'

// Real Estate Specific Types

export interface RealEstateContact {
  id: string
  type: 'lead' | 'client' | 'prospect' | 'vendor' | 'agent'
  firstName: string
  lastName: string
  email: string
  phone?: string
  status: ContactStatus
  source: string
  assignedAgent?: string
  tags: string[]
  customFields: Record<string, any>
  properties: PropertyInterest[]
  activities: ContactActivity[]
  lastContact?: Date
  createdAt: Date
  updatedAt: Date
}

export interface PropertyInterest {
  id: string
  propertyType: PropertyType
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  location: PropertyLocation
  preferences: PropertyPreferences
}

export interface PropertyLocation {
  city: string
  state: string
  zipCode?: string
  neighborhood?: string
  radius?: number // miles from center point
}

export interface PropertyPreferences {
  yearBuilt?: number
  lotSize?: number
  squareFootage?: number
  amenities: string[]
  schoolDistrict?: string
  commute?: CommutePreferences
}

export interface CommutePreferences {
  maxTime?: number // minutes
  transportation: 'driving' | 'public' | 'walking' | 'cycling'
  destinations: string[]
}

export interface ContactActivity {
  id: string
  type: ActivityType
  description: string
  date: Date
  agent: string
  outcome?: string
  followUpDate?: Date
  notes?: string
}

export interface PropertyListing {
  id: string
  mlsNumber: string
  address: PropertyAddress
  price: number
  status: ListingStatus
  propertyType: PropertyType
  details: PropertyDetails
  agent: ListingAgent
  photos: PropertyPhoto[]
  description: string
  features: string[]
  schools: School[]
  neighborhood: NeighborhoodInfo
  marketData: PropertyMarketData
  listedDate: Date
  updatedDate: Date
}

export interface PropertyAddress {
  street: string
  city: string
  state: string
  zipCode: string
  county?: string
  latitude?: number
  longitude?: number
}

export interface PropertyDetails {
  bedrooms: number
  bathrooms: number
  squareFootage: number
  lotSize: number
  yearBuilt: number
  garage?: number
  stories?: number
  basement?: boolean
  pool?: boolean
  fireplace?: boolean
}

export interface ListingAgent {
  id: string
  name: string
  email: string
  phone: string
  license: string
  brokerage: string
}

export interface PropertyPhoto {
  id: string
  url: string
  caption?: string
  order: number
  type: 'exterior' | 'interior' | 'aerial' | 'floorplan'
}

export interface School {
  name: string
  type: 'elementary' | 'middle' | 'high'
  rating?: number
  distance: number // miles
}

export interface NeighborhoodInfo {
  name: string
  walkScore?: number
  crimeRating?: string
  demographics?: Record<string, any>
  amenities: string[]
}

export interface PropertyMarketData {
  priceHistory: PriceHistoryEntry[]
  comparables: ComparableProperty[]
  marketTrends: MarketTrend[]
  daysOnMarket: number
  pricePerSquareFoot: number
}

export interface PriceHistoryEntry {
  date: Date
  price: number
  event: 'listed' | 'price-change' | 'sold' | 'withdrawn'
}

export interface ComparableProperty {
  id: string
  address: string
  price: number
  squareFootage: number
  bedrooms: number
  bathrooms: number
  soldDate: Date
  distance: number // miles
}

export interface MarketTrend {
  period: string
  averagePrice: number
  medianPrice: number
  daysOnMarket: number
  inventoryLevel: number
  priceChange: number // percentage
}

export type ContactStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'showing-scheduled'
  | 'offer-made'
  | 'under-contract'
  | 'closed'
  | 'lost'
  | 'nurturing'

export type PropertyType =
  | 'single-family'
  | 'condo'
  | 'townhouse'
  | 'multi-family'
  | 'land'
  | 'commercial'
  | 'investment'

export type ListingStatus =
  | 'active'
  | 'pending'
  | 'sold'
  | 'withdrawn'
  | 'expired'
  | 'coming-soon'

export type ActivityType =
  | 'call'
  | 'email'
  | 'meeting'
  | 'showing'
  | 'open-house'
  | 'follow-up'
  | 'contract'
  | 'closing'
  | 'note'

// Integration Event Types
export interface IntegrationEvent {
  id: string
  type: IntegrationEventType
  integrationId: string
  workflowId?: string
  timestamp: Date
  data: Record<string, any>
  status: 'success' | 'failed' | 'warning'
  message?: string
  retryCount?: number
}

export type IntegrationEventType =
  | 'sync-started'
  | 'sync-completed'
  | 'sync-failed'
  | 'record-created'
  | 'record-updated'
  | 'record-deleted'
  | 'webhook-received'
  | 'rate-limit-hit'
  | 'authentication-failed'
  | 'configuration-changed'

// API Response Types
export interface IntegrationAPIResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  pagination?: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
  metadata?: Record<string, any>
}

export interface IntegrationListResponse extends IntegrationAPIResponse<Integration[]> {
  filters?: {
    category?: IntegrationCategory
    status?: IntegrationStatus
    search?: string
  }
}

export interface WorkflowListResponse extends IntegrationAPIResponse<IntegrationWorkflow[]> {
  stats?: {
    total: number
    active: number
    failed: number
  }
}