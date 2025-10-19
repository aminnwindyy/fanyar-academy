import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json()

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    
    // In a real app, you would send this OTP via SMS
    console.log(`OTP for ${phone}: ${otp}`)

    // Store OTP in memory or database (simplified for demo)
    // In production, use Redis or similar with expiration
    const user = await db.user.upsert({
      where: { phone },
      update: {},
      create: { phone }
    })

    // For demo purposes, we'll just return success
    // In production, you would verify the OTP sent via SMS
    return NextResponse.json({
      message: 'OTP sent successfully',
      userId: user.id,
      // For demo only - remove in production
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    })

  } catch (error) {
    console.error('Error sending OTP:', error)
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
}