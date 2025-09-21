// src/app/api/ghl/webhook/route.ts
// Main webhook endpoint for GHL integration

import { NextRequest, NextResponse } from 'next/server'

// Simple webhook handler for now
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('🔔 GHL Webhook received:', body.type)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ GHL webhook processing failed:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}