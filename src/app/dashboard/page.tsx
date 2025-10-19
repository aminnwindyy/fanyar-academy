'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Clock, Award, User, LogOut, Play, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  phone: string
  name?: string
  email?: string
  avatar?: string
}

interface Enrollment {
  id: string
  status: string
  progress: number
  enrolledAt: string
  course: {
    id: string
    title: string
    description: string
    duration: number
    level: string
    price: number
    teacher: {
      name: string
    }
    category: {
      name: string
    }
  }
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (!userData || !token) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    // Fetch user enrollments
    fetchEnrollments(parsedUser.id)
  }, [router])

  const fetchEnrollments = async (userId: string) => {
    try {
      const response = await fetch(`/api/enrollments?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setEnrollments(data)
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/')
  }

  const handleEnroll = async (courseId: string) => {
    if (!user) return

    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          courseId
        }),
      })

      if (response.ok) {
        // Refresh enrollments
        fetchEnrollments(user.id)
      }
    } catch (error) {
      console.error('Error enrolling in course:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
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
              <span className="text-gray-600">داشبورد کاربری</span>
            </div>
            
            <div className="flex items-center space-x-reverse space-x-4">
              <div className="flex items-center space-x-reverse space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-700">{user.name || user.phone}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="ml-2 h-4 w-4" />
                خروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    خوش آمدید، {user.name || 'کاربر گرامی'}!
                  </h1>
                  <p className="text-blue-100">
                    به داشبورد آکادمی فنیار خوش آمدید. دوره‌های خود را دنبال کنید و مهارت‌های جدید بیاموزید.
                  </p>
                </div>
                <Award className="h-16 w-16 text-blue-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">دوره‌های ثبت نام شده</p>
                    <p className="text-2xl font-bold text-gray-900">{enrollments.length}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">میانگین پیشرفت</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {enrollments.length > 0 
                        ? Math.round(enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length)
                        : 0}%
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">ساعات آموزش</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {enrollments.reduce((acc, e) => acc + e.course.duration, 0)}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* My Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">دوره‌های من</CardTitle>
              <CardDescription>
                دوره‌هایی که در آن‌ها ثبت نام کرده‌اید
              </CardDescription>
            </CardHeader>
            <CardContent>
              {enrollments.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    هنوز در دوره‌ای ثبت نام نکرده‌اید
                  </h3>
                  <p className="text-gray-600 mb-6">
                    از بین دوره‌های آکادمی فنیار، دوره مورد نظر خود را انتخاب کنید
                  </p>
                  <Link href="/#courses">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      مشاهده دوره‌ها
                      <ChevronLeft className="mr-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrollments.map((enrollment, index) => (
                    <motion.div
                      key={enrollment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant={
                              enrollment.course.level === 'BEGINNER' ? 'default' : 
                              enrollment.course.level === 'INTERMEDIATE' ? 'secondary' : 'destructive'
                            }>
                              {enrollment.course.level === 'BEGINNER' ? 'مقدماتی' : 
                               enrollment.course.level === 'INTERMEDIATE' ? 'متوسط' : 'پیشرفته'}
                            </Badge>
                            <Badge variant="outline">
                              {enrollment.status === 'ACTIVE' ? 'فعال' : 
                               enrollment.status === 'COMPLETED' ? 'تکمیل شده' : 'در انتظار'}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{enrollment.course.title}</CardTitle>
                          <CardDescription>
                            {enrollment.course.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span>مدرس: {enrollment.course.teacher.name}</span>
                              <span>{enrollment.course.duration} ساعت</span>
                            </div>
                            
                            <div>
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span>پیشرفت</span>
                                <span>{Math.round(enrollment.progress)}%</span>
                              </div>
                              <Progress value={enrollment.progress} className="h-2" />
                            </div>

                            <Link href={`/courses/${enrollment.course.id}`}>
                              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                <Play className="ml-2 h-4 w-4" />
                                ادامه یادگیری
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}