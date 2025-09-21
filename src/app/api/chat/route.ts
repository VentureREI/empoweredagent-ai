import { NextRequest, NextResponse } from 'next/server'
import { agents } from '@/lib/agents'

export async function POST(request: NextRequest) {
  let slug = ''
  let messages: any[] = []

  try {
    const body = await request.json()
    slug = body.slug
    messages = body.messages

    // Find the agent by slug
    const agent = agents.find(a => a.slug === slug)
    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }

    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('Missing OPENAI_API_KEY environment variable')
      return NextResponse.json({
        error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.'
      }, { status: 500 })
    }

    // Call OpenAI API
    console.log('Making OpenAI API call...')
    const requestBody = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: agent.systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }
    console.log('Request body:', JSON.stringify(requestBody, null, 2))

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    })

    console.log('OpenAI response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenAI API Error:', errorData)
      return NextResponse.json({
        error: 'Failed to get response from AI service',
        details: errorData
      }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Chat API Error:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    console.error('Environment check - API Key exists:', !!process.env.OPENAI_API_KEY)
    console.error('Agent slug:', slug)
    console.error('Messages count:', messages?.length)

    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Chat API is running',
    availableAgents: agents.map(agent => ({
      slug: agent.slug,
      name: agent.name,
      tagline: agent.tagline
    }))
  })
}