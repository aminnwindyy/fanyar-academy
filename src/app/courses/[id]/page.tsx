'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Clock, Users, Award, BookOpen, ChevronLeft, ChevronRight, Play, User } from 'lucide-react'
import Link from 'next/link'

interface Course {
  id: string
  title: string
  description: string
  content: string
  price: number
  duration: number
  level: string
  imageUrl?: string
  teacher: {
    id: string
    name: string
    bio: string
    expertise: string
    experience: number
  }
  category: {
    id: string
    name: string
    description: string
  }
}

interface User {
  id: string
  phone: string
  name?: string
  email?: string
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Fetch course details
    fetchCourse()
  }, [params.id])

  const fetchCourse = async () => {
    try {
      const response = await fetch('/api/courses')
      if (response.ok) {
        const courses = await response.json()
        const foundCourse = courses.find((c: Course) => c.id === params.id)
        if (foundCourse) {
          setCourse(foundCourse)
          
          // Check if user is enrolled
          if (userData) {
            checkEnrollment(foundCourse.id)
          }
        } else {
          router.push('/#courses')
        }
      }
    } catch (error) {
      console.error('Error fetching course:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkEnrollment = async (courseId: string) => {
    try {
      const userData = localStorage.getItem('user')
      if (userData) {
        const user = JSON.parse(userData)
        const response = await fetch(`/api/enrollments?userId=${user.id}`)
        if (response.ok) {
          const enrollments = await response.json()
          const enrolled = enrollments.some((e: any) => e.courseId === courseId)
          setIsEnrolled(enrolled)
        }
      }
    } catch (error) {
      console.error('Error checking enrollment:', error)
    }
  }

  const handleEnroll = async () => {
    if (!user || !course) return

    setEnrolling(true)
    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          courseId: course.id
        }),
      })

      if (response.ok) {
        setIsEnrolled(true)
      }
    } catch (error) {
      console.error('Error enrolling in course:', error)
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">دوره یافت نشد</h1>
          <Link href="/#courses">
            <Button className="bg-blue-600 hover:bg-blue-700">
              بازگشت به دوره‌ها
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                فنیار
              </Link>
              <span className="mr-4 text-gray-500">|</span>
              <span className="text-gray-600">جزئیات دوره</span>
            </div>
            
            <div className="flex items-center space-x-reverse space-x-4">
              {user ? (
                <Link href="/dashboard">
                  <Button variant="outline">
                    داشبورد
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button variant="outline">
                    ورود
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link href="/#courses" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ChevronRight className="ml-2 h-4 w-4" />
            بازگشت به دوره‌ها
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            {/* Course Header */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={
                    course.level === 'BEGINNER' ? 'default' : 
                    course.level === 'INTERMEDIATE' ? 'secondary' : 'destructive'
                  }>
                    {course.level === 'BEGINNER' ? 'مقدماتی' : 
                     course.level === 'INTERMEDIATE' ? 'متوسط' : 'پیشرفته'}
                  </Badge>
                  <Badge variant="outline">
                    {course.category.name}
                  </Badge>
                </div>
                <CardTitle className="text-2xl lg:text-3xl">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg h-64 flex items-center justify-center mb-6">
                  <BookOpen className="h-24 w-24 text-blue-600" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg font-semibold">{course.duration}</div>
                    <div className="text-sm text-gray-600">ساعت آموزش</div>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-lg font-semibold">156</div>
                    <div className="text-sm text-gray-600">دانشجو</div>
                  </div>
                  <div className="text-center">
                    <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-lg font-semibold">گواهی</div>
                    <div className="text-sm text-gray-600">معتبر</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="text-xl font-semibold mb-4">توضیحات دوره</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {course.content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            {/* Teacher Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">مدرس دوره</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-reverse space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{course.teacher.name}</h4>
                    <p className="text-sm text-gray-600">
                      {course.teacher.experience} سال سابقه
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  {course.teacher.bio}
                </p>
                <div className="text-sm">
                  <span className="font-semibold">تخصص:</span>
                  <p className="text-gray-600">{course.teacher.expertise}</p>
                </div>
              </CardContent>
            </Card>

            {/* Enrollment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ثبت نام در دوره</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {course.price.toLocaleString()} تومان
                  </div>
                  <p className="text-gray-600">
                    دسترسی نامحدود به محتوای دوره
                  </p>
                </div>

                {isEnrolled ? (
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <p className="text-green-800 font-medium">
                        شما در این دوره ثبت نام کرده‌اید
                      </p>
                    </div>
                    <Link href="/dashboard">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Play className="ml-2 h-4 w-4" />
                        مشاهده دوره
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {user ? (
                      <Button
                        onClick={handleEnroll}
                        disabled={enrolling}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {enrolling ? 'در حال ثبت نام...' : 'ثبت نام در دوره'}
                      </Button>
                    ) : (
                      <Link href="/login">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          ورود و ثبت نام
                        </Button>
                      </Link>
                    )}
                  </div>
                )}

                <div className="mt-6 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full ml-2"></div>
                    <span>دسترسی مادام‌العمر</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full ml-2"></div>
                    <span>گواهی پایان دوره معتبر</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full ml-2"></div>
                    <span>پشتیبانی 24/7</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full ml-2"></div>
                    <span>به‌روزرسانی رایگان محتوا</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}