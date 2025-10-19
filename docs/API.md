# مستندات API آکادمی فنیار

## 🌐 overview

این مستندات تمام API endpoints موجود در پروژه آکادمی فنیار را توضیح می‌دهد. تمام APIها از فرمت JSON استفاده می‌کنند و از استانداردهای HTTP پیروی می‌کنند.

**Base URL:** `http://localhost:3000/api`

## 🔐 احراز هویت (Authentication)

### ثبت نام کاربر جدید

**POST** `/auth/register`

ثبت نام کاربر جدید با شماره تلفن و اطلاعات شخصی.

#### Request Body:
```json
{
  "phone": "09123456789",
  "name": "علی رضایی",
  "email": "ali@example.com"
}
```

#### Response (201 Created):
```json
{
  "message": "Registration successful",
  "user": {
    "id": "cuid123...",
    "phone": "09123456789",
    "name": "علی رضایی",
    "email": "ali@example.com",
    "avatar": null
  },
  "token": "registered-user-token-cuid123..."
}
```

#### Error Response (400 Bad Request):
```json
{
  "error": "User with this phone number already exists"
}
```

#### Error Response (500 Internal Server Error):
```json
{
  "error": "Failed to register user"
}
```

---

### ارسال کد تایید (OTP)

**POST** `/auth/send-otp`

ارسال کد تایید ۶ رقمی به شماره تلفن کاربر.

#### Request Body:
```json
{
  "phone": "09123456789"
}
```

#### Response (200 OK):
```json
{
  "message": "OTP sent successfully",
  "otp": "123456"
}
```

**نکته:** در محیط تولید، کد OTP فقط در لاگ سرور نمایش داده می‌شود.

#### Error Response (400 Bad Request):
```json
{
  "error": "Phone number is required"
}
```

---

### تایید کد و ورود

**POST** `/auth/verify-otp`

تایید کد OTP و ورود کاربر به سیستم.

#### Request Body:
```json
{
  "phone": "09123456789",
  "otp": "123456"
}
```

#### Response (200 OK):
```json
{
  "message": "Login successful",
  "user": {
    "id": "cuid123...",
    "phone": "09123456789",
    "name": "علی رضایی",
    "email": "ali@example.com",
    "avatar": null
  },
  "token": "base64-encoded-token"
}
```

#### Error Response (400 Bad Request):
```json
{
  "error": "Invalid OTP"
}
```

---

## 📚 مدیریت دوره‌ها (Courses)

### دریافت لیست دوره‌ها

**GET** `/courses`

دریافت لیست تمام دوره‌های فعال.

#### Query Parameters:
- `categoryId` (اختیاری): فیلتر بر اساس دسته‌بندی
- `teacherId` (اختیاری): فیلتر بر اساس مدرس
- `level` (اختیاری): فیلتر بر اساس سطح (BEGINNER, INTERMEDIATE, ADVANCED)

#### Response (200 OK):
```json
[
  {
    "id": "cuid123...",
    "title": "آموزش React.js",
    "description": "دوره کامل آموزش React.js از مقدماتی تا پیشرفته",
    "content": "محتوای کامل دوره...",
    "imageUrl": "https://example.com/image.jpg",
    "price": 299000,
    "duration": 40,
    "level": "INTERMEDIATE",
    "categoryId": "cat123...",
    "teacherId": "teacher123...",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "category": {
      "id": "cat123...",
      "name": "برنامه نویسی",
      "description": "دوره‌های برنامه نویسی"
    },
    "teacher": {
      "id": "teacher123...",
      "name": "دکتر احمدی",
      "email": "ahmadi@example.com",
      "expertise": "React, Node.js"
    }
  }
]
```

---

### دریافت جزئیات دوره

**GET** `/courses/[id]`

دریافت اطلاعات کامل یک دوره خاص.

#### Path Parameters:
- `id`: شناسه دوره

#### Response (200 OK):
```json
{
  "id": "cuid123...",
  "title": "آموزش React.js",
  "description": "دوره کامل آموزش React.js از مقدماتی تا پیشرفته",
  "content": "محتوای کامل دوره...",
  "imageUrl": "https://example.com/image.jpg",
  "price": 299000,
  "duration": 40,
  "level": "INTERMEDIATE",
  "categoryId": "cat123...",
  "teacherId": "teacher123...",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "category": {
    "id": "cat123...",
    "name": "برنامه نویسی",
    "description": "دوره‌های برنامه نویسی"
  },
  "teacher": {
    "id": "teacher123...",
    "name": "دکتر احمدی",
    "email": "ahmadi@example.com",
    "bio": "مدرس دانشگاه و توسعه‌دهنده ارشد",
    "imageUrl": "https://example.com/teacher.jpg",
    "expertise": "React, Node.js",
    "experience": 10
  }
}
```

#### Error Response (404 Not Found):
```json
{
  "error": "Course not found"
}
```

---

## 📂 دسته‌بندی‌ها (Categories)

### دریافت لیست دسته‌بندی‌ها

**GET** `/categories`

دریافت لیست تمام دسته‌بندی‌ها به همراه تعداد دوره‌های هر دسته.

#### Response (200 OK):
```json
[
  {
    "id": "cat123...",
    "name": "برنامه نویسی",
    "description": "دوره‌های برنامه نویسی وب و موبایل",
    "icon": "code",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "_count": {
      "courses": 15
    }
  },
  {
    "id": "cat456...",
    "name": "طراحی گرافیک",
    "description": "دوره‌های طراحی و گرافیک",
    "icon": "palette",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "_count": {
      "courses": 8
    }
  }
]
```

---

## 👨‍🏫 مدرسین (Teachers)

### دریافت لیست مدرسین

**GET** `/teachers`

دریافت لیست تمام مدرسین فعال.

#### Response (200 OK):
```json
[
  {
    "id": "teacher123...",
    "name": "دکتر احمدی",
    "email": "ahmadi@example.com",
    "bio": "مدرس دانشگاه و توسعه‌دهنده ارشد",
    "imageUrl": "https://example.com/teacher.jpg",
    "expertise": "React, Node.js, TypeScript",
    "experience": 10,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

## 📝 ثبت نام‌ها (Enrollments)

### ثبت نام در دوره

**POST** `/enrollments`

ثبت نام کاربر در یک دوره خاص.

#### Request Body:
```json
{
  "userId": "user123...",
  "courseId": "course123..."
}
```

#### Response (201 Created):
```json
{
  "message": "Enrollment successful",
  "enrollment": {
    "id": "enroll123...",
    "userId": "user123...",
    "courseId": "course123...",
    "status": "ACTIVE",
    "progress": 0,
    "enrolledAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "course": {
      "id": "course123...",
      "title": "آموزش React.js",
      "description": "دوره کامل آموزش React.js",
      "teacher": {
        "name": "دکتر احمدی"
      },
      "category": {
        "name": "برنامه نویسی"
      }
    }
  }
}
```

#### Error Response (400 Bad Request):
```json
{
  "error": "User is already enrolled in this course"
}
```

---

### دریافت دوره‌های کاربر

**GET** `/enrollments?userId=[userId]`

دریافت لیست دوره‌هایی که کاربر در آن‌ها ثبت نام کرده است.

#### Query Parameters:
- `userId` (اجباری): شناسه کاربر

#### Response (200 OK):
```json
[
  {
    "id": "enroll123...",
    "userId": "user123...",
    "courseId": "course123...",
    "status": "ACTIVE",
    "progress": 45.5,
    "enrolledAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "course": {
      "id": "course123...",
      "title": "آموزش React.js",
      "description": "دوره کامل آموزش React.js",
      "duration": 40,
      "level": "INTERMEDIATE",
      "price": 299000,
      "teacher": {
        "name": "دکتر احمدی"
      },
      "category": {
        "name": "برنامه نویسی"
      }
    }
  }
]
```

#### Error Response (400 Bad Request):
```json
{
  "error": "User ID is required"
}
```

---

## 📧 تماس با ما (Contact)

### ارسال پیام تماس

**POST** `/contact`

ارسال پیام کاربر به تیم پشتیبانی.

#### Request Body:
```json
{
  "name": "علی رضایی",
  "email": "ali@example.com",
  "phone": "09123456789",
  "subject": "سوال در مورد دوره‌ها",
  "message": "من می‌خواهم در دوره React.js ثبت نام کنم..."
}
```

#### Response (200 OK):
```json
{
  "message": "Contact form submitted successfully",
  "data": {
    "id": "contact123...",
    "name": "علی رضایی",
    "email": "ali@example.com",
    "phone": "09123456789",
    "subject": "سوال در مورد دوره‌ها",
    "message": "من می‌خواهم در دوره React.js ثبت نام کنم...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Error Response (400 Bad Request):
```json
{
  "error": "Name and message are required"
}
```

---

## 🔍 Health Check

### بررسی سلامت سرور

**GET** `/health`

بررسی وضعیت سلامت سرور و اتصال به دیتابیس.

#### Response (200 OK):
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "database": "connected",
  "version": "1.0.0"
}
```

---

## 🚨 کدهای خطا

| کد وضعیت | توضیح | مثال |
|---------|-------|------|
| 200 | موفقیت | درخواست با موفقیت انجام شد |
| 201 | ایجاد شده | منبع جدید با موفقیت ایجاد شد |
| 400 | درخواست نامعتبر | پارامترهای ورودی نامعتبر هستند |
| 404 | پیدا نشد | منبع مورد نظر وجود ندارد |
| 500 | خطای سرور | خطای داخلی سرور |

---

## 🔒 امنیت

### ۱. اعتبارسنجی ورودی‌ها
تمام ورودی‌ها قبل از پردازش اعتبارسنجی می‌شوند:
- شماره تلفن: فرمت `09xxxxxxxx`
- ایمیل: فرمت استاندارد ایمیل
- کد OTP: دقیقاً ۶ رقم عددی

### ۲. محدودیت نرخ (Rate Limiting)
برای جلوگیری از سوءاستفاده، درخواست‌ها محدود شده‌اند:
- ارسال OTP: حداکثر ۱ بار در دقیقه
- ثبت نام: حداکثر ۵ بار در ساعت

### ۳. توکن‌های امن
- توکن‌های جلسه با فرمت Base64
- توکن‌ها شامل timestamp برای انقضا هستند
- توکن‌ها در localStorage کلاینت ذخیره می‌شوند

---

## 📝 مثال‌های استفاده

### مثال ۱: جریان کامل ثبت نام و ورود

```javascript
// 1. ثبت نام کاربر
const registerResponse = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: '09123456789',
    name: 'علی رضایی',
    email: 'ali@example.com'
  })
})

const { user, token } = await registerResponse.json()
localStorage.setItem('user', JSON.stringify(user))
localStorage.setItem('token', token)

// 2. ورود با OTP
const otpResponse = await fetch('/api/auth/send-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone: '09123456789' })
})

const { otp } = await otpResponse.json()

// 3. تایید کد
const verifyResponse = await fetch('/api/auth/verify-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone: '09123456789', otp: '123456' })
})
```

### مثال ۲: دریافت دوره‌ها و ثبت نام

```javascript
// 1. دریافت لیست دوره‌ها
const coursesResponse = await fetch('/api/courses')
const courses = await coursesResponse.json()

// 2. ثبت نام در دوره
const enrollResponse = await fetch('/api/enrollments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: user.id,
    courseId: courses[0].id
  })
})

// 3. دریافت دوره‌های کاربر
const enrollmentsResponse = await fetch(`/api/enrollments?userId=${user.id}`)
const enrollments = await enrollmentsResponse.json()
```

---

## 🧪 تست API

### با curl:
```bash
# تست ثبت نام
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"phone":"09123456789","name":"علی رضایی"}'

# تست دریافت دوره‌ها
curl http://localhost:3000/api/courses

# تست health check
curl http://localhost:3000/api/health
```

### با Postman:
1. وارد کردن Base URL: `http://localhost:3000/api`
2. تنظیم Content-Type: `application/json`
3. استفاده از Body برای درخواست‌های POST

---

**توسعه‌دهنده: امین وندی**  
**آخرین به‌روزرسانی: ۲۰۲۴**