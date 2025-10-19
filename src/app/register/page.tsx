'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowRight, Phone, User, Mail, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    email: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        
        setMessageType('success')
        setMessage('ثبت نام با موفقیت انجام شد! در حال انتقال به داشبورد...')
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        setMessageType('error')
        setMessage(data.error || 'خطا در ثبت نام')
      }
    } catch (error) {
      setMessageType('error')
      setMessage('خطا در ارتباط با سرور')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4"
            >
              <User className="h-8 w-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              ثبت نام در آکادمی فنیار
            </CardTitle>
            <CardDescription className="text-gray-600">
              تحت نظر دانشگاه فردوسی مشهد
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نام و نام خانوادگی *
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="علی رضایی"
                    value={formData.name}
                    onChange={handleChange}
                    className="pr-10 text-right"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  شماره تلفن همراه *
                </label>
                <div className="relative">
                  <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="09123456789"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pr-10 text-right"
                    required
                    pattern="^09[0-9]{9}$"
                    title="شماره تلفن باید با 09 شروع شده و 11 رقم باشد"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ایمیل (اختیاری)
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="ali@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pr-10 text-right"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'در حال ثبت نام...' : 'ثبت نام'}
                <CheckCircle className="mr-2 h-4 w-4" />
              </Button>
            </form>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <Alert className={messageType === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
                  <AlertDescription className={messageType === 'error' ? 'text-red-800' : 'text-green-800'}>
                    {message}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                قبلا ثبت نام کرده‌اید؟{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                  وارد شوید
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                بازگشت به صفحه اصلی
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}