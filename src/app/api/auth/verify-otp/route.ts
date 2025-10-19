import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json()

    if (!phone || !otp) {
      return NextResponse.json(
        { error: 'Phone number and OTP are required' },
        { status: 400 }
      )
    }

    // In production, verify the OTP from your database or Redis
    // For demo purposes, we'll accept any 6-digit OTP
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      )
    }

    // Find or create user
    const user = await db.user.upsert({
      where: { phone },
      update: {},
      create: { phone }
    })

    // Create a simple session token (in production, use JWT)
    const sessionToken = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      token: sessionToken
    })

  } catch (error) {
    console.error('Error verifying OTP:', error)
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    )
  }
}