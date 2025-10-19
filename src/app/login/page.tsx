'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowRight, Phone, Shield, CheckCircle, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const router = useRouter()

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      })

      const data = await response.json()

      if (response.ok) {
        setShowOtp(true)
        setMessageType('success')
        setMessage(`کد تایید به شماره ${phone} ارسال شد. (کد تست: ${data.otp})`)
      } else {
        setMessageType('error')
        setMessage(data.error || 'خطا در ارسال کد تایید')
      }
    } catch (error) {
      setMessageType('error')
      setMessage('خطا در ارتباط با سرور')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, otp }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        
        setMessageType('success')
        setMessage('ورود با موفقیت انجام شد!')
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        setMessageType('error')
        setMessage(data.error || 'کد تایید نامعتبر است')
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
              <Shield className="h-8 w-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              ورود به آکادمی فنیار
            </CardTitle>
            <CardDescription className="text-gray-600">
              تحت نظر دانشگاه فردوسی مشهد
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showOtp ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    شماره تلفن همراه
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="tel"
                      placeholder="09123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pr-10 text-right"
                      required
                      pattern="^09[0-9]{9}$"
                      title="شماره تلفن باید با 09 شروع شده و 11 رقم باشد"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'در حال ارسال...' : 'ارسال کد تایید'}
                  <ChevronLeft className="mr-2 h-4 w-4" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    کد تایید
                  </label>
                  <Input
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="text-center text-lg"
                    maxLength={6}
                    required
                    pattern="[0-9]{6}"
                    title="کد تایید باید 6 رقم باشد"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'در حال بررسی...' : 'تایید و ورود'}
                  <CheckCircle className="mr-2 h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setShowOtp(false)
                    setOtp('')
                    setMessage('')
                  }}
                >
                  تغییر شماره تلفن
                </Button>
              </form>
            )}

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
                حساب کاربری ندارید؟{' '}
                <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                  ثبت نام کنید
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