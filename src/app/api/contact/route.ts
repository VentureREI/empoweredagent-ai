import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Contact form validation schema - matches frontend
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  phone: z.string().optional(),
  subject: z.enum(['general', 'demo', 'partnership', 'support', 'other']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  interested_agents: z.array(z.string()).optional().default([]),
  budget_range: z.enum(['under-10k', '10k-50k', '50k-100k', '100k-500k', 'over-500k', 'not-sure']).optional(),
  timeline: z.enum(['immediate', '1-3-months', '3-6-months', '6-12-months', 'exploring']).optional(),
  marketing_consent: z.boolean().optional().default(false)
})

type ContactFormData = z.infer<typeof contactFormSchema>

// Email sending function (using mock for now - replace with actual email service)
async function sendEmail(data: ContactFormData) {
  // TODO: Replace with actual email service (SendGrid, Resend, etc.)
  console.log('📧 Email would be sent:', {
    to: 'contact@empoweredagent.ai',
    subject: `New Contact Form Submission: ${data.subject}`,
    data
  })
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // For development, always succeed
  // In production, this would actually send the email
  return { success: true }
}

// Store contact submission (using mock for now - replace with actual database)
async function storeContact(data: ContactFormData) {
  // TODO: Replace with actual database storage (Supabase, PostgreSQL, etc.)
  console.log('💾 Contact would be stored in database:', data)
  
  // For development, always succeed
  // In production, this would store in database
  return { 
    success: true, 
    id: `contact_${Date.now()}`,
    created_at: new Date().toISOString()
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    console.log('📝 Contact form submission received:', body)

    // Validate the data using Zod
    const validationResult = contactFormSchema.safeParse(body)
    
    if (!validationResult.success) {
      // Format validation errors properly
      const errors = validationResult.error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code
      }))

      console.log('❌ Validation failed:', errors)

      return NextResponse.json(
        {
          success: false,
          error: 'validation_failed',
          message: 'Please check your form data and try again.',
          errors: errors
        },
        { status: 400 }
      )
    }

    const validData = validationResult.data

    // Process the valid data
    try {
      // Store in database
      const storeResult = await storeContact(validData)
      
      if (!storeResult.success) {
        throw new Error('Failed to store contact submission')
      }

      // Send email notification
      const emailResult = await sendEmail(validData)
      
      if (!emailResult.success) {
        throw new Error('Failed to send email notification')
      }

      console.log('✅ Contact form processed successfully')

      // Return success response
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you for your message! We\'ll get back to you soon.',
          data: {
            id: storeResult.id,
            submitted_at: storeResult.created_at
          }
        },
        { status: 200 }
      )

    } catch (processingError) {
      console.error('❌ Error processing contact form:', processingError)
      
      return NextResponse.json(
        {
          success: false,
          error: 'processing_failed',
          message: 'We encountered an issue processing your message. Please try again or contact us directly.',
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ Contact API error:', error)
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: 'invalid_json',
          message: 'Invalid request format. Please check your data and try again.',
        },
        { status: 400 }
      )
    }

    // Handle other unexpected errors
    return NextResponse.json(
      {
        success: false,
        error: 'internal_error',
        message: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: 'method_not_allowed',
      message: 'This endpoint only accepts POST requests.',
    },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    {
      success: false,
      error: 'method_not_allowed',
      message: 'This endpoint only accepts POST requests.',
    },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    {
      success: false,
      error: 'method_not_allowed',
      message: 'This endpoint only accepts POST requests.',
    },
    { status: 405 }
  )
}