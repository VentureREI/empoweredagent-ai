import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for newsletter subscription
const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
  interests: z.array(z.string()).optional(),
  source: z.string().optional(), // Track where subscription came from
})

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 5 * 60 * 1000 // 5 minutes
  const maxRequests = 3

  const record = rateLimitStore.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return false
  }

  if (record.count >= maxRequests) {
    return true
  }

  record.count++
  return false
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Check rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many subscription attempts. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = newsletterSchema.parse(body)

    // Check if email is already subscribed (mock check)
    const isExistingSubscriber = await checkExistingSubscriber(validatedData.email)
    
    if (isExistingSubscriber) {
      return NextResponse.json(
        { 
          message: 'You\'re already subscribed to our newsletter!',
          success: true,
          alreadySubscribed: true
        },
        { status: 200 }
      )
    }

    // TODO: In production, integrate with your email service
    // Examples: Mailchimp, ConvertKit, SendGrid, Mailgun, etc.
    
    // Mock email service integration
    const subscriptionData = {
      email: validatedData.email,
      name: validatedData.name || '',
      interests: validatedData.interests || [],
      source: validatedData.source || 'website',
      subscribed_at: new Date().toISOString(),
      ip_address: ip,
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Log the subscription (in production, use proper logging)
    console.log('Newsletter subscription:', {
      timestamp: new Date().toISOString(),
      ip,
      email: validatedData.email,
      source: validatedData.source,
    })

    // TODO: Save to database
    // await saveNewsletterSubscription(subscriptionData)

    // TODO: Add to email service (example for Mailchimp)
    // await addToMailchimp(subscriptionData)

    // TODO: Send welcome email
    // await sendWelcomeEmail(validatedData.email, validatedData.name)

    // TODO: Track analytics event
    // await trackEvent('newsletter_subscription', {
    //   email: validatedData.email,
    //   source: validatedData.source
    // })

    return NextResponse.json(
      { 
        message: 'Successfully subscribed! Check your email for a welcome message.',
        success: true,
        subscriber_count: await getSubscriberCount() // Mock count
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Newsletter subscription error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid email address',
          details: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

// Unsubscribe endpoint
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const token = searchParams.get('token')

    if (!email || !token) {
      return NextResponse.json(
        { error: 'Email and unsubscribe token are required' },
        { status: 400 }
      )
    }

    // TODO: Verify unsubscribe token
    // const isValidToken = await verifyUnsubscribeToken(email, token)
    
    // TODO: Remove from email service
    // await removeFromMailchimp(email)

    // TODO: Update database
    // await updateSubscriptionStatus(email, 'unsubscribed')

    console.log('Newsletter unsubscription:', {
      timestamp: new Date().toISOString(),
      email,
    })

    return NextResponse.json(
      { 
        message: 'Successfully unsubscribed. We\'re sorry to see you go!',
        success: true
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Newsletter unsubscription error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

// Health check
export async function GET() {
  const stats = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    endpoint: 'Newsletter API',
    subscriber_count: await getSubscriberCount(),
    total_sent_this_month: 4, // Mock data
    open_rate: '34.2%', // Mock data
    click_rate: '8.7%', // Mock data
  }

  return NextResponse.json(stats)
}

// Mock functions (replace with actual implementations)
async function checkExistingSubscriber(email: string): Promise<boolean> {
  // Mock check - in production, check your database or email service
  const mockExistingEmails = [
    'test@example.com',
    'existing@user.com'
  ]
  return mockExistingEmails.includes(email.toLowerCase())
}

async function getSubscriberCount(): Promise<number> {
  // Mock count - in production, get from your email service or database
  return 25127
}

// Example integration functions (implement based on your email service)

/*
// Mailchimp integration example
async function addToMailchimp(data: any) {
  const response = await fetch(`https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
    method: 'POST',
    headers: {
      'Authorization': `apikey ${process.env.MAILCHIMP_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: data.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: data.name?.split(' ')[0] || '',
        LNAME: data.name?.split(' ').slice(1).join(' ') || '',
      },
      tags: data.interests || [],
      ip_signup: data.ip_address,
      timestamp_signup: data.subscribed_at,
    }),
  })

  if (!response.ok) {
    throw new Error(`Mailchimp API error: ${response.statusText}`)
  }

  return response.json()
}

// SendGrid integration example
async function sendWelcomeEmail(email: string, name?: string) {
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: email,
    from: 'hello@empoweredagent.ai',
    templateId: 'your-welcome-template-id',
    dynamicTemplateData: {
      name: name || 'there',
      unsubscribe_url: `${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}&token=generated_token`
    },
  }

  await sgMail.send(msg)
}
*/