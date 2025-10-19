'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star, Clock, Users, Award, BookOpen, Phone, Mail, MapPin, Play, CheckCircle, ArrowRight, Menu, X, ChevronLeft, Home, Info } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  // Fetch courses and categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          fetch('/api/courses'),
          fetch('/api/categories')
        ])
        
        const coursesData = await coursesRes.json()
        const categoriesData = await categoriesRes.json()
        
        setCourses(coursesData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const categoryOptions = ['all', ...categories.map(cat => cat.name)]

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category?.name === selectedCategory)

  const stats = [
    { icon: Users, label: 'دانشجو', value: '500+' },
    { icon: BookOpen, label: 'دوره آموزشی', value: '50+' },
    { icon: Award, label: 'مدرس حرفه‌ای', value: '15+' },
    { icon: Star, label: 'رضایت دانشجو', value: '98%' }
  ]

  const features = [
    'آموزش عملی و پروژه محور',
    'پشتیبانی 24/7',
    'گواهی معتبر پایان دوره',
    'کلاس‌های آنلاین و حضوری',
    'قیمت مناسب و کیفیت بالا',
    'به‌روزترین سرفصل‌ها'
  ]

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
        // Show success message
        alert('پیام شما با موفقیت ارسال شد!')
      } else {
        alert('خطا در ارسال پیام. لطفاً دوباره تلاش کنید.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('خطا در ارسال پیام. لطفاً دوباره تلاش کنید.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">فنیار</h1>
              </div>
            </div>
            
            <div className="hidden md:block flex-1">
              <div className="flex items-center justify-center space-x-8 space-x-reverse">
                <a href="#home" className="flex flex-col items-center text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  <Home className="h-5 w-5 mb-1" />
                  <span>خانه</span>
                </a>
                <a href="#courses" className="flex flex-col items-center text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  <BookOpen className="h-5 w-5 mb-1" />
                  <span>دوره‌ها</span>
                </a>
                <a href="#about" className="flex flex-col items-center text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  <Info className="h-5 w-5 mb-1" />
                  <span>درباره ما</span>
                </a>
                <a href="#contact" className="flex flex-col items-center text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  <Phone className="h-5 w-5 mb-1" />
                  <span>تماس با ما</span>
                </a>
                <Link href="/login">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Award className="ml-2 h-4 w-4" />
                    شروع یادگیری
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#home" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium" onClick={() => setIsMenuOpen(false)}>خانه</a>
              <a href="#courses" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium" onClick={() => setIsMenuOpen(false)}>دوره‌ها</a>
              <a href="#about" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium" onClick={() => setIsMenuOpen(false)}>درباره ما</a>
              <a href="#contact" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium" onClick={() => setIsMenuOpen(false)}>تماس با ما</a>
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2">
                    شروع یادگیری
                  </Button>
                </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <motion.section 
        id="home" 
        className="relative bg-gradient-to-br from-blue-50 to-white py-20 lg:py-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-center lg:text-right"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                آکادمی <span className="text-blue-600">فنیار</span>
                <div className="text-2xl lg:text-3xl text-gray-600 mt-2">
                  تحت نظر <span className="text-blue-800 font-semibold">دانشگاه فردوسی مشهد</span>
                </div>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                با بهترین دوره‌های آموزشی فنی و مهندسی، مهارت‌های مورد نیاز آینده را بیاموزید و در مسیر حرفه‌ای خود پیشرو باشید.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                  <Link href="/login" className="flex items-center">
                    ورود به سیستم
                    <ChevronLeft className="mr-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                  <Play className="ml-2 h-5 w-5" />
                  معرفی آکادمی
                </Button>
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="aspect-w-16 aspect-h-9">
                <motion.div 
                  className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div 
                        key={index} 
                        className="bg-white rounded-xl p-4 text-center shadow-sm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              چرا آکادمی فنیار را انتخاب کنید؟
            </h2>
            <p className="text-xl text-gray-600">
              ما بهترین امکانات را برای یادگیری شما فراهم کرده‌ایم
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="flex items-center space-x-reverse space-x-3 bg-white p-4 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              >
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Courses Section */}
      <motion.section 
        id="courses" 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              دوره‌های آموزشی ما
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              جدیدترین و به‌روزترین دوره‌های آموزشی را در فنیار پیدا کنید
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categoryOptions.map((category) => (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="mb-2"
                  >
                    {category === 'all' ? 'همه دوره‌ها' : category}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                  <div className="bg-white p-6 rounded-b-lg shadow-sm">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {filteredCourses.map((course: any, index) => (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                      <motion.div 
                        className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-100 to-blue-50 h-48 flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BookOpen className="h-16 w-16 text-blue-600" />
                      </motion.div>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={
                            course.level === 'BEGINNER' ? 'default' : 
                            course.level === 'INTERMEDIATE' ? 'secondary' : 'destructive'
                          }>
                            {course.level === 'BEGINNER' ? 'مقدماتی' : 
                             course.level === 'INTERMEDIATE' ? 'متوسط' : 'پیشرفته'}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="h-4 w-4 text-yellow-400 ml-1" />
                            4.8
                          </div>
                        </div>
                        <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                        <CardDescription className="text-sm">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 ml-1" />
                              {course.duration} ساعت
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 ml-1" />
                              {Math.floor(Math.random() * 200) + 50} دانشجو
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">مدرس: {course.teacher?.name}</span>
                            <span className="text-lg font-bold text-blue-600">
                              {course.price.toLocaleString()} تومان
                            </span>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link href={`/courses/${course.id}`}>
                              <Button className="w-full bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-700 transition-colors">
                                مشاهده دوره
                              </Button>
                            </Link>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="py-16 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                درباره آکادمی فنیار
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                آکادمی فنیار به عنوان یکی از مراکز آموزشی پیشرو تحت نظر دانشگاه فردوسی مشهد، با هدف ارائه آموزش‌های باکیفیت و کاربردی در حوزه‌های مختلف فنی و مهندسی تاسیس شده است.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                ما معتقدیم که یادگیری باید عملی و پروژه محور باشد و با بهره‌گیری از اساتید برجسته دانشگاهی و متخصصان صنعت، بهترین آموزش‌ها را به شما ارائه می‌دهیم.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">8+</div>
                  <div className="text-gray-600">سال سابقه فعالیت</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">2000+</div>
                  <div className="text-gray-600">فارغ‌التحصیل</div>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="aspect-w-16 aspect-h-9">
                <div className="bg-white rounded-xl p-6 text-center">
                  <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">مأموریت ما</h3>
                  <p className="text-gray-600">
                    توانمندسازی مهندسان و متخصصان برای ورود به دنیای فناوری و موفقیت در مسیر شغلی با آموزش‌های استاندارد و روز دنیا
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              با ما در تماس باشید
            </h2>
            <p className="text-xl text-gray-600">
              سوالی دارید؟ ما اینجا هستیم تا کمک کنیم
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نام و نام خانوادگی
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="text-right"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ایمیل
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="text-right"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    شماره تماس
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="text-right"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    موضوع
                  </label>
                  <Select onValueChange={(value) => setFormData({...formData, subject: value})}>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="موضوع را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">سوال عمومی</SelectItem>
                      <SelectItem value="course">اطلاعات دوره</SelectItem>
                      <SelectItem value="registration">ثبت نام</SelectItem>
                      <SelectItem value="support">پشتیبانی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    پیام
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="text-right"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  ارسال پیام
                </Button>
              </form>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">اطلاعات تماس</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-reverse space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">021-12345678</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">info@faniyar.ir</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">تهران، خیابان ولیعصر، پلاک 123</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">ساعات کاری</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>شنبه تا چهارشنبه</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>پنج‌شنبه</span>
                    <span>9:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>جمعه</span>
                    <span>تعطیل</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">فنیار</h3>
              <p className="text-gray-400">
                آکادمی تخصصی آموزش فناوری اطلاعات
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">دوره‌ها</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">برنامه نویسی</a></li>
                <li><a href="#" className="hover:text-white transition-colors">طراحی وب</a></li>
                <li><a href="#" className="hover:text-white transition-colors">موبایل</a></li>
                <li><a href="#" className="hover:text-white transition-colors">علم داده</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">خدمات</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">آموزش حضوری</a></li>
                <li><a href="#" className="hover:text-white transition-colors">آموزش آنلاین</a></li>
                <li><a href="#" className="hover:text-white transition-colors">مشاوره شغلی</a></li>
                <li><a href="#" className="hover:text-white transition-colors">پروژه محور</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">دنبال کنید</h4>
              <div className="flex space-x-reverse space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-sm">ت</span>
                  </div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-sm">ا</span>
                  </div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-sm">ل</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 1403 آکادمی فنیار. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}