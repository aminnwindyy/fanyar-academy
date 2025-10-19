import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const level = searchParams.get('level')
    const search = searchParams.get('search')

    let whereClause: any = {
      isActive: true
    }

    if (category && category !== 'all') {
      whereClause.category = {
        name: category
      }
    }

    if (level) {
      whereClause.level = level
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { content: { contains: search } }
      ]
    }

    const courses = await db.course.findMany({
      where: whereClause,
      include: {
        category: true,
        teacher: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      content,
      imageUrl,
      price,
      duration,
      level,
      categoryId,
      teacherId
    } = body

    const course = await db.course.create({
      data: {
        title,
        description,
        content,
        imageUrl,
        price: parseInt(price),
        duration: parseInt(duration),
        level,
        categoryId,
        teacherId
      },
      include: {
        category: true,
        teacher: true
      }
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}