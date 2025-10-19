import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { phone, name, email } = await request.json()

    if (!phone || !name) {
      return NextResponse.json(
        { error: 'Phone number and name are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { phone }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this phone number already exists' },
        { status: 400 }
      )
    }

    // Create new user
    const user = await db.user.create({
      data: {
        phone,
        name,
        email: email || null
      }
    })

    return NextResponse.json({
      message: 'Registration successful',
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      token: 'registered-user-token-' + user.id
    }, { status: 201 })

  } catch (error) {
    console.error('Error registering user:', error)
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    )
  }
}