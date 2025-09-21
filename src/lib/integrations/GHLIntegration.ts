// src/lib/integrations/GHLIntegration.ts
// GoHighLevel Sub-Account Integration for EmpoweredAgent.ai

interface GHLConfig {
  locationId: string // Your GHL sub-account ID
  apiKey: string // GHL API key
  webhookSecret: string // For validating incoming webhooks
  baseUrl: string // GHL API base URL
  automations: {
    demoBookedWorkflow: string // Workflow ID for demo bookings
    contactFormWorkflow: string // Workflow ID for contact forms
    urgentLeadWorkflow: string // Workflow ID for urgent leads
  }
  pipelines: {
    demosPipeline: string // Pipeline ID for demo leads
    contactsPipeline: string // Pipeline ID for contact form leads
  }
  customFields: {
    leadScore: string // Custom field ID for lead scoring
    source: string // Custom field ID for traffic source
    urgency: string // Custom field ID for urgency level
  }
}

class GHLIntegration {
  private config: GHLConfig
  private apiHeaders: Record<string, string>

  constructor(config: GHLConfig) {
    this.config = config
    this.apiHeaders = {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    }
  }

  /**
   * 📅 CALENDAR BOOKING INTEGRATION
   * When someone books a demo, create lead and trigger GHL workflows
   */
  async handleCalendarBooking(bookingData: any) {
    try {
      console.log('📅 Processing calendar booking through GHL...')

      // 1. Create contact in GHL
      const contact = await this.createOrUpdateContact({
        firstName: bookingData.name?.split(' ')[0] || '',
        lastName: bookingData.name?.split(' ').slice(1).join(' ') || '',
        email: bookingData.email,
        phone: bookingData.phone,
        source: 'Calendar Booking',
        customFields: {
          [this.config.customFields.leadScore]: this.calculateLeadScore(bookingData, 'demo'),
          [this.config.customFields.source]: `Calendar: ${bookingData.provider || 'Unknown'}`,
          [this.config.customFields.urgency]: 'High'
        },
        tags: ['Demo Booked', 'High Intent', 'Calendar Lead']
      })

      // 2. Create opportunity in demos pipeline
      const opportunity = await this.createOpportunity({
        contactId: contact.id,
        pipelineId: this.config.pipelines.demosPipeline,
        name: `Demo - ${bookingData.name} (${bookingData.company || 'Unknown'})`,
        monetaryValue: 50000, // Estimated deal value
        source: 'Calendar Booking',
        customFields: {
          meeting_date: bookingData.start_time,
          meeting_type: bookingData.meeting_type,
          calendar_provider: bookingData.provider
        }
      })

      // 3. Trigger GHL automation workflow
      await this.triggerWorkflow(this.config.automations.demoBookedWorkflow, {
        contactId: contact.id,
        opportunityId: opportunity.id,
        meetingDetails: {
          date: bookingData.start_time,
          type: bookingData.meeting_type,
          link: bookingData.meeting_link
        }
      })

      // 4. Create calendar event in GHL
      await this.createCalendarEvent({
        title: `Demo with ${bookingData.name}`,
        startTime: bookingData.start_time,
        endTime: bookingData.end_time,
        contactId: contact.id,
        description: `Demo booking from ${bookingData.provider}`,
        location: bookingData.meeting_link
      })

      console.log('✅ Calendar booking processed successfully in GHL')
      return { success: true, contactId: contact.id, opportunityId: opportunity.id }

    } catch (error) {
      console.error('❌ GHL calendar booking failed:', error)
      throw error
    }
  }

  /**
   * 📝 CONTACT FORM INTEGRATION
   * When someone submits contact form, create lead and trigger workflows
   */
  async handleContactFormSubmission(formData: any) {
    try {
      console.log('📝 Processing contact form through GHL...')

      // 1. Calculate lead score and priority
      const leadScore = this.calculateLeadScore(formData, 'contact')
      const priority = this.determinePriority(formData, leadScore)

      // 2. Create contact in GHL
      const contact = await this.createOrUpdateContact({
        firstName: formData.name?.split(' ')[0] || '',
        lastName: formData.name?.split(' ').slice(1).join(' ') || '',
        email: formData.email,
        phone: formData.phone,
        companyName: formData.company,
        source: 'Website Contact Form',
        customFields: {
          [this.config.customFields.leadScore]: leadScore,
          [this.config.customFields.source]: `Contact Form: ${formData.subject}`,
          [this.config.customFields.urgency]: priority,
          message: formData.message,
          interested_agents: formData.interested_agents?.join(', ') || '',
          budget_range: formData.budget_range || '',
          timeline: formData.timeline || ''
        },
        tags: this.generateTags(formData, leadScore, priority)
      })

      // 3. Create opportunity in contacts pipeline
      const opportunity = await this.createOpportunity({
        contactId: contact.id,
        pipelineId: this.config.pipelines.contactsPipeline,
        name: `Contact - ${formData.name} (${formData.company || 'Unknown'})`,
        monetaryValue: this.estimateDealValue(formData),
        source: 'Contact Form',
        customFields: {
          inquiry_type: formData.subject,
          message: formData.message,
          priority: priority
        }
      })

      // 4. Trigger appropriate workflow based on priority
      const workflowId = priority === 'High' || priority === 'Urgent' 
        ? this.config.automations.urgentLeadWorkflow
        : this.config.automations.contactFormWorkflow

      await this.triggerWorkflow(workflowId, {
        contactId: contact.id,
        opportunityId: opportunity.id,
        priority: priority,
        leadScore: leadScore
      })

      console.log('✅ Contact form processed successfully in GHL')
      return { success: true, contactId: contact.id, opportunityId: opportunity.id }

    } catch (error) {
      console.error('❌ GHL contact form processing failed:', error)
      throw error
    }
  }

  /**
   * 👤 CREATE OR UPDATE CONTACT
   */
  private async createOrUpdateContact(contactData: any) {
    // First, check if contact exists
    const existingContact = await this.findContactByEmail(contactData.email)

    if (existingContact) {
      // For now, just return existing contact
      // TODO: Implement updateContact method if needed
      return existingContact
    } else {
      // Create new contact
      return await this.createContact(contactData)
    }
  }

  private async createContact(contactData: any) {
    const response = await fetch(`${this.config.baseUrl}/contacts/`, {
      method: 'POST',
      headers: this.apiHeaders,
      body: JSON.stringify({
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        email: contactData.email,
        phone: contactData.phone,
        companyName: contactData.companyName,
        source: contactData.source,
        locationId: this.config.locationId,
        customFields: contactData.customFields,
        tags: contactData.tags
      })
    })

    if (!response.ok) {
      throw new Error(`GHL Create Contact failed: ${response.status}`)
    }

    const result = await response.json()
    console.log('✅ Contact created in GHL:', result.contact.id)
    return result.contact
  }

  private async findContactByEmail(email: string) {
    const response = await fetch(
      `${this.config.baseUrl}/contacts/search/duplicate?locationId=${this.config.locationId}&email=${email}`,
      { headers: this.apiHeaders }
    )

    if (!response.ok) return null

    const result = await response.json()
    return result.contact || null
  }

  /**
   * 💰 CREATE OPPORTUNITY
   */
  private async createOpportunity(opportunityData: any) {
    const response = await fetch(`${this.config.baseUrl}/opportunities/`, {
      method: 'POST',
      headers: this.apiHeaders,
      body: JSON.stringify({
        pipelineId: opportunityData.pipelineId,
        locationId: this.config.locationId,
        contactId: opportunityData.contactId,
        name: opportunityData.name,
        monetaryValue: opportunityData.monetaryValue,
        source: opportunityData.source,
        customFields: opportunityData.customFields
      })
    })

    if (!response.ok) {
      throw new Error(`GHL Create Opportunity failed: ${response.status}`)
    }

    const result = await response.json()
    console.log('✅ Opportunity created in GHL:', result.opportunity.id)
    return result.opportunity
  }

  /**
   * ⚡ TRIGGER WORKFLOW
   */
  private async triggerWorkflow(workflowId: string, triggerData: any) {
    const response = await fetch(`${this.config.baseUrl}/workflows/${workflowId}/trigger`, {
      method: 'POST',
      headers: this.apiHeaders,
      body: JSON.stringify({
        locationId: this.config.locationId,
        contactId: triggerData.contactId,
        customFields: triggerData
      })
    })

    if (!response.ok) {
      throw new Error(`GHL Trigger Workflow failed: ${response.status}`)
    }

    console.log('✅ GHL Workflow triggered:', workflowId)
    return await response.json()
  }

  /**
   * 📅 CREATE CALENDAR EVENT
   */
  private async createCalendarEvent(eventData: any) {
    const response = await fetch(`${this.config.baseUrl}/calendars/events`, {
      method: 'POST',
      headers: this.apiHeaders,
      body: JSON.stringify({
        locationId: this.config.locationId,
        calendarId: 'default', // Use your calendar ID
        title: eventData.title,
        startTime: eventData.startTime,
        endTime: eventData.endTime,
        contactId: eventData.contactId,
        description: eventData.description,
        address: eventData.location
      })
    })

    if (!response.ok) {
      throw new Error(`GHL Create Calendar Event failed: ${response.status}`)
    }

    return await response.json()
  }

  /**
   * 🧮 BUSINESS LOGIC HELPERS
   */
  private calculateLeadScore(data: any, type: 'demo' | 'contact'): number {
    let score = 50 // Base score

    // Type-based scoring
    if (type === 'demo') score += 35 // Calendar bookings are high intent

    // Contact completeness
    if (data.phone) score += 10
    if (data.company) score += 15
    if (data.name?.split(' ').length > 1) score += 5

    // Message analysis (for contact forms)
    if (data.message) {
      const message = data.message.toLowerCase()
      if (message.includes('urgent')) score += 20
      if (message.includes('budget')) score += 15
      if (message.includes('immediately')) score += 15
      if (message.includes('enterprise')) score += 10
    }

    // Subject/inquiry type
    if (data.subject === 'demo') score += 25
    if (data.subject === 'partnership') score += 20

    // Business context
    if (data.budget_range && data.budget_range !== 'not-sure') score += 15
    if (data.timeline === 'immediate') score += 20
    if (data.interested_agents?.length > 0) score += 10

    return Math.min(Math.max(score, 0), 100)
  }

  private determinePriority(data: any, leadScore: number): string {
    if (leadScore >= 85 || data.message?.toLowerCase().includes('urgent')) return 'Urgent'
    if (leadScore >= 70 || data.subject === 'demo') return 'High'
    if (leadScore >= 50) return 'Medium'
    return 'Low'
  }

  private generateTags(data: any, leadScore: number, priority: string): string[] {
    const tags = ['Website Lead']

    // Priority tags
    tags.push(`Priority: ${priority}`)
    
    // Score-based tags
    if (leadScore >= 80) tags.push('Hot Lead')
    else if (leadScore >= 60) tags.push('Warm Lead')
    else tags.push('Cold Lead')

    // Source tags
    if (data.subject) tags.push(`Inquiry: ${data.subject}`)
    if (data.company) tags.push('Has Company')
    if (data.phone) tags.push('Has Phone')

    // Business context tags
    if (data.budget_range) tags.push(`Budget: ${data.budget_range}`)
    if (data.timeline) tags.push(`Timeline: ${data.timeline}`)
    if (data.interested_agents?.length > 0) tags.push('Interested in AI Agents')

    return tags
  }

  private estimateDealValue(data: any): number {
    // Estimate based on available information
    if (data.budget_range) {
      const budgetMap = {
        'over-500k': 750000,
        '100k-500k': 300000,
        '50k-100k': 75000,
        '10k-50k': 30000,
        'under-10k': 5000
      }
      return budgetMap[data.budget_range as keyof typeof budgetMap] || 50000
    }

    // Default estimates by inquiry type
    const typeMap = {
      demo: 50000,
      partnership: 100000,
      support: 10000,
      general: 25000
    }

    return typeMap[data.subject as keyof typeof typeMap] || 25000
  }
}

export default GHLIntegration
export type { GHLConfig }