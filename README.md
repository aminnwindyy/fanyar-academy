# آکادمی فنیار - Faniar Academy

یک پلتفرم آموزشی مدرن و کامل تحت نظر دانشگاه فردوسی مشهد

![Faniar Academy](https://img.shields.io/badge/Faniar-Academy-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)

## 📖 معرفی پروژه

آکادمی فنیار یک پلتفرم آموزشی پیشرفته است که برای ارائه دوره‌های فنی و مهندسی تحت نظر دانشگاه فردوسی مشهد طراحی شده است. این پروژه با استفاده از مدرن‌ترین تکنولوژی‌های وب توسعه یافته و امکانات کاملی برای مدیریت دوره‌ها، دانشجویان و فرآیند آموزش را فراهم می‌کند.

## ✨ ویژگی‌های اصلی

### 🎓 قابلیت‌های آموزشی
- **سیستم مدیریت دوره**: ایجاد، ویرایش و مدیریت دوره‌های آموزشی
- **دسته‌بندی دوره‌ها**: سازماندهی دوره‌ها در دسته‌بندی‌های مختلف
- **سطوح مهارتی**: پشتیبانی از دوره‌های مقدماتی، متوسط و پیشرفته
- **مدیریت مدرسین**: اطلاعات و تخصص مدرسین هر دوره
- **سیستم ثبت‌نام**: ثبت‌نام آسان دانشجویان در دوره‌های مورد نظر

### 👤 مدیریت کاربران
- **احراز هویت مدرن**: سیستم ورود و ثبت‌نام با OTP
- **داشبورد شخصی**: مشاهده دوره‌های ثبت‌نام شده و پیشرفت تحصیلی
- **پروفایل کاربری**: مدیریت اطلاعات شخصی و تماس
- **پیگیری پیشرفت**: نمایش درصد پیشرفت در هر دوره

### 🎨 طراحی و تجربه کاربری
- **رابط کاربری مدرن**: طراحی با Tailwind CSS و shadcn/ui
- **ریسپانسیو کامل**: پشتیبانی از تمام دستگاه‌ها
- **انیمیشن‌های جذاب**: استفاده از Framer Motion
- **تم تیره/روشن**: قابلیت تغییر تم (در آینده)
- **ناوبری هوشمند**: هدر با آیکون‌های وسط‌چین در دسکتاپ

### 🚀 قابلیت‌های فنی
- **وب‌سوکت**: ارتباطات real-time با Socket.IO
- **API کامل**: RESTful API برای تمام عملیات
- **پایگاه داده**: Prisma ORM با SQLite
- **امنیت بالا**: محافظت از داده‌های کاربران
- **بهینه‌سازی**: کدنویسی بهینه و سریع

## 🛠️ تکنولوژی‌های استفاده شده

### فرانت‌اند
- **Next.js 15**: فریمورک اصلی با App Router
- **TypeScript 5**: تایپ‌اسکریپت برای کدنویسی امن
- **Tailwind CSS 4**: فریمورک CSS مدرن
- **shadcn/ui**: کامپوننت‌های آماده و زیبا
- **Framer Motion**: انیمیشن‌های روان
- **Lucide React**: آیکون‌های مدرن

### بک‌اند
- **Node.js**: محیط اجرایی سرور
- **Prisma ORM**: مدیریت پایگاه داده
- **SQLite**: پایگاه داده سبک و سریع
- **Socket.IO**: ارتباطات real-time
- **Next.js API Routes**: ساخت API

### ابزارهای توسعه
- **ESLint**: کنترل کیفیت کد
- **Prettier**: فرمت‌دهی کد
- **Git**: کنترل نسخه
- **Nodemon**: ری‌استارت خودکار سرور

## 📋 پیش‌نیازها

برای اجرای این پروژه به موارد زیر نیاز دارید:

- **Node.js** نسخه 18 یا بالاتر
- **npm** یا **yarn** برای مدیریت پکیج‌ها
- **Git** برای کلون کردن پروژه

## 🚀 نصب و راه‌اندازی

### ۱. کلون کردن پروژه
```bash
git clone https://github.com/aminnwindyy/fanyar-academy.git
cd fanyar-academy
```

### ۲. نصب پکیج‌ها
```bash
npm install
```

### ۳. تنظیم پایگاه داده
```bash
# ایجاد و همگام‌سازی پایگاه داده
npx prisma db push

# (اختیاری) مشاهده داده‌ها با Prisma Studio
npx prisma studio
```

### ۴. اجرای پروژه
```bash
# حالت توسعه
npm run dev

# حالت پروداکشن
npm run build
npm start
```

پروژه در آدرس `http://localhost:3000` در دسترس خواهد بود.

## 📁 ساختار پروژه

```
fanyar-academy/
├── src/
│   ├── app/                    # صفحات Next.js
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # احراز هویت
│   │   │   ├── courses/       # مدیریت دوره‌ها
│   │   │   ├── categories/    # دسته‌بندی‌ها
│   │   │   ├── teachers/      # مدرسین
│   │   │   ├── enrollments/   # ثبت‌نام‌ها
│   │   │   └── contact/       # تماس با ما
│   │   ├── dashboard/         # داشبورد کاربری
│   │   ├── login/             # صفحه ورود
│   │   ├── register/          # صفحه ثبت‌نام
│   │   ├── courses/           # جزئیات دوره‌ها
│   │   └── page.tsx           # صفحه اصلی
│   ├── components/            # کامپوننت‌های React
│   │   └── ui/               # کامپوننت‌های shadcn/ui
│   ├── hooks/                # هوک‌های سفارشی
│   └── lib/                  # کتابخانه‌ها و ابزارها
│       ├── db.ts             # اتصال به پایگاه داده
│       ├── utils.ts          # توابع کمکی
│       └── socket.ts         # تنظیمات Socket.IO
├── prisma/
│   └── schema.prisma         # مدل‌های پایگاه داده
├── public/                   # فایل‌های استاتیک
├── db/                       # فایل پایگاه داده SQLite
├── seed.ts                   # داده‌های اولیه
└── README.md                 # مستندات پروژه
```

## 🗄️ مدل‌های پایگاه داده

### User (کاربر)
```typescript
interface User {
  id: string
  phone: string
  name?: string
  email?: string
  avatar?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Course (دوره)
```typescript
interface Course {
  id: string
  title: string
  description: string
  content: string
  imageUrl?: string
  price: number
  duration: number
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  categoryId: string
  teacherId: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Category (دسته‌بندی)
```typescript
interface Category {
  id: string
  name: string
  description?: string
  icon?: string
  createdAt: Date
  updatedAt: Date
}
```

### Teacher (مدرس)
```typescript
interface Teacher {
  id: string
  name: string
  email: string
  bio?: string
  imageUrl?: string
  expertise: string
  experience: number
  createdAt: Date
  updatedAt: Date
}
```

### Enrollment (ثبت‌نام)
```typescript
interface Enrollment {
  id: string
  userId: string
  courseId: string
  status: 'ACTIVE' | 'COMPLETED' | 'PENDING'
  progress: number
  enrolledAt: Date
  updatedAt: Date
}
```

## 🌐 مستندات API

### احراز هویت

#### ثبت‌نام
```http
POST /api/auth/register
Content-Type: application/json

{
  "phone": "09123456789",
  "name": "علی رضایی",
  "email": "ali@example.com"
}
```

#### ارسال کد OTP
```http
POST /api/auth/send-otp
Content-Type: application/json

{
  "phone": "09123456789"
}
```

#### تایید کد OTP
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "phone": "09123456789",
  "otp": "123456"
}
```

### دوره‌ها

#### دریافت همه دوره‌ها
```http
GET /api/courses
```

#### دریافت دوره‌های یک دسته‌بندی
```http
GET /api/courses?categoryId=category-id
```

### دسته‌بندی‌ها
```http
GET /api/categories
```

### مدرسین
```http
GET /api/teachers
```

### ثبت‌نام در دوره
```http
POST /api/enrollments
Content-Type: application/json

{
  "userId": "user-id",
  "courseId": "course-id"
}
```

### دریافت ثبت‌نام‌های کاربر
```http
GET /api/enrollments?userId=user-id
```

## 🎨 راهنمای طراحی

### رنگ‌بندی
- **آبی اصلی**: `#2563eb` (blue-600)
- **آبی روشن**: `#3b82f6` (blue-500)
- **خاکستری**: `#6b7280` (gray-500)
- **سفید**: `#ffffff` (white)
- **سیاه**: `#000000` (black)

### فونت‌ها
- **فونت اصلی**: سیستم فونت پیش‌فرض
- **فونت عناوین**: وزن‌های bold و semibold
- **فونت متن**: وزن normal و medium

### کامپوننت‌ها
- **کارت**: استفاده از `Card` از shadcn/ui
- **دکمه**: استفاده از `Button` با استایل‌های مختلف
- **فرم**: استفاده از `Form` با اعتبارسنجی
- **جدول**: استفاده از `Table` برای نمایش داده‌ها

## 🚀 دیپلوی

### Vercel (توصیه شده)
```bash
# نصب Vercel CLI
npm i -g vercel

# دیپلوی
vercel
```

### Netlify
```bash
# بیلد پروژه
npm run build

# آپلود پوشه .next
```

### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 تست

```bash
# اجرای تست‌ها
npm test

# تست با کاورج
npm run test:coverage
```

## 📊 عملکرد

### بهینه‌سازی‌ها
- **Lazy Loading**: بارگذاری تنبل کامپوننت‌ها
- **Image Optimization**: بهینه‌سازی تصاویر
- **Code Splitting**: تقسیم کد به بخش‌های کوچک
- **Caching**: کش کردن داده‌های پراستفاده

### معیارها
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔧 توسعه

### افزودن ویژگی جدید
1. ایجاد مدل جدید در `prisma/schema.prisma`
2. ساخت API Route در `src/app/api/`
3. ساخت کامپوننت در `src/components/`
4. افزودن صفحه در `src/app/`

### کدنویسی
- استفاده از TypeScript برای تایپ‌سیفیکیشن
- رعایت اصول SOLID
- نوشتن کامنت‌های مفید
- استفاده از ESLint و Prettier

## 🤝 مشارکت

برای مشارکت در پروژه:

1. فورک کردن پروژه
2. ایجاد شاخه جدید: `git checkout -b feature/new-feature`
3. کامیت تغییرات: `git commit -m 'Add new feature'`
4. پوش به شاخه: `git push origin feature/new-feature`
5. ایجاد Pull Request

## 📝 لاگ تغییرات

### v1.0.0 (تاریخ انتشار)
- ✅ پیاده‌سازی سیستم احراز هویت کامل
- ✅ ساخت داشبورد کاربری
- ✅ مدیریت دوره‌ها و دسته‌بندی‌ها
- ✅ طراحی ریسپانسیو و مدرن
- ✅ پیاده‌سازی API کامل
- ✅ اتصال به پایگاه داده
- ✅ پشتیبانی از Socket.IO

## 🐞 باگ‌های شناخته شده

- [ ] بهبود سیستم بارگذاری تصاویر
- [ ] افزودن قابلیت جستجوی پیشرفته
- [ ] پیاده‌سازی سیستم نظرسنجی
- [ ] افزودن قابلیت چت آنلاین

## 📞 تماس

- **توسعه‌دهنده**: امین رضایی
- **ایمیل**: amin@example.com
- **گیت‌هاب**: [@aminnwindyy](https://github.com/aminnwindyy)
- **لینکدین**: [امین رضایی](https://linkedin.com/in/amin-rezaei)

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است. برای اطلاعات بیشتر به فایل [LICENSE](LICENSE) مراجعه کنید.

## 🙏 تشکر

- از تیم دانشگاه فردوسی مشهد برای حمایت
- از جامعه اوپن‌سورس برای ابزارهای عالی
- از شما برای استفاده از این پروژه

---

**آکادمی فنیار - ساختن آینده‌ای روشن‌تر با آموزش‌های باکیفیت** 🚀