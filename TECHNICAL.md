# مستندات فنی آکادمی فنیار

## 🏗️ معماری پروژه

### ساختار کلی
پروژه بر اساس معماری **Full-Stack Next.js** با استفاده از **App Router** طراحی شده است:

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Side (Frontend)                  │
├─────────────────────────────────────────────────────────────┤
│  • React Components (TypeScript)                           │
│  • Tailwind CSS + shadcn/ui                                │
│  • Framer Motion (Animations)                              │
│  • Client-side State Management                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js App Router                        │
├─────────────────────────────────────────────────────────────┤
│  • API Routes (Server-side)                                │
│  • Server Components                                        │
│  • Middleware                                              │
│  • Route Handlers                                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                               │
├─────────────────────────────────────────────────────────────┤
│  • Prisma ORM                                              │
│  • SQLite Database                                         │
│  • Real-time (Socket.IO)                                   │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 جزئیات فنی

### فرانت‌اند

#### کامپوننت‌ها
```typescript
// ساختار کامپوننت‌ها
src/components/
├── ui/                    // کامپوننت‌های پایه shadcn/ui
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
└── [custom-components]/    // کامپوننت‌های سفارشی پروژه
```

#### هوک‌های سفارشی
```typescript
// هوک‌های استفاده شده
src/hooks/
├── use-toast.ts           // مدیریت نوتیفیکیشن‌ها
├── use-mobile.ts          // تشخیص دستگاه موبایل
└── [custom-hooks]/        // هوک‌های سفارشی پروژه
```

#### استیت‌منیجمنت
- **Client State**: استفاده از React Hooks (useState, useEffect)
- **Server State**: فراخوانی API در کامپوننت‌های سرور
- **Form State**: مدیریت فرم‌ها با React Hook Form

### بک‌اند

#### API Routes
```typescript
// ساختار API
src/app/api/
├── auth/                  // احراز هویت
│   ├── register/route.ts
│   ├── send-otp/route.ts
│   └── verify-otp/route.ts
├── courses/               // مدیریت دوره‌ها
├── categories/            // دسته‌بندی‌ها
├── teachers/              // مدرسین
├── enrollments/           // ثبت‌نام‌ها
└── contact/               // تماس با ما
```

#### ساختار API Route
```typescript
export async function GET(request: NextRequest) {
  try {
    // منطق API
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error message' },
      { status: 500 }
    )
  }
}
```

### پایگاه داده

#### مدل Prisma
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:../db/custom.db"
}

model User {
  id        String   @id @default(cuid())
  phone     String   @unique
  name      String?
  email     String?
  avatar    String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  enrollments Enrollment[]
}

model Course {
  id          String      @id @default(cuid())
  title       String
  description String
  content     String
  imageUrl    String?
  price       Float
  duration    Int
  level       Level
  categoryId  String
  teacherId   String
  isActive    Boolean     @default(true)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  
  category    Category    @relation(fields: [categoryId], references: [id])
  teacher     Teacher     @relation(fields: [teacherId], references: [id])
  enrollments Enrollment[]
}

enum Level {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}
```

## 🔐 امنیت

### احراز هویت
```typescript
// سیستم OTP-based authentication
1. کاربر شماره تلفن را وارد می‌کند
2. کد ۶ رقمی به شماره ارسال می‌شود (در محیط تست نمایش داده می‌شود)
3. کاربر کد را وارد می‌کند
4. توکن JWT ایجاد می‌شود
5. اطلاعات کاربر در localStorage ذخیره می‌شود
```

### محافظت از داده‌ها
- **Input Validation**: اعتبارسنجی تمام ورودی‌ها
- **SQL Injection Prevention**: استفاده از Prisma ORM
- **XSS Protection**: escaping خودکار در React
- **CORS**: تنظیمات امنیتی برای API

## 🚀 Performance

### بهینه‌سازی‌ها

#### ۱. Code Splitting
```typescript
// تقسیم کد به صورت خودکار با Next.js
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
})
```

#### ۲. Image Optimization
```typescript
// بهینه‌سازی تصاویر
import Image from 'next/image'

<Image
  src="/course-image.jpg"
  alt="Course"
  width={500}
  height={300}
  priority={true}
/>
```

#### ۳. Caching Strategy
```typescript
// کش کردن داده‌های API
export async function GET() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // 1 hour
  })
  return data.json()
}
```

### معیارهای عملکرد
- **FCP**: < 1.5s
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## 🔄 Real-time Features

### Socket.IO Integration
```typescript
// src/lib/socket.ts
import { Server } from 'socket.io'

export const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? false 
      : ['http://localhost:3000']
  }
})

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  
  socket.on('join-course', (courseId) => {
    socket.join(`course-${courseId}`)
  })
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})
```

### استفاده در کلاینت
```typescript
// کامپوننت کلاینت برای Socket.IO
'use client'

import { useEffect } from 'react'
import io from 'socket.io-client'

export default function ChatComponent() {
  useEffect(() => {
    const socket = io()
    
    socket.on('message', (message) => {
      console.log('New message:', message)
    })
    
    return () => socket.disconnect()
  }, [])
}
```

## 🧪 تست

### ساختار تست
```typescript
// __tests__/components/
├── Button.test.tsx
├── Card.test.tsx
└── ...

// __tests__/api/
├── auth.test.ts
├── courses.test.ts
└── ...

// __tests__/utils/
├── validation.test.ts
└── helpers.test.ts
```

### مثال تست
```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
  
  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    screen.getByText('Click me').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## 📦 دیپلوی

### Vercel (توصیه شده)
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### Environment Variables
```bash
# .env.local
DATABASE_URL="file:../db/custom.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### Docker
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## 🔧 توسعه

### ESLint Configuration
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error"
  }
}
```

### Prettier Configuration
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 📊 مانیتورینگ

### معیارهای مهم
- **Performance**: سرعت بارگذاری صفحات
- **Error Rate**: نرخ خطاهای API
- **User Engagement**: تعامل کاربران
- **Conversion Rate**: نرخ ثبت‌نام در دوره‌ها

### ابزارها
- **Vercel Analytics**: تحلیل عملکرد
- **Sentry**: مانیتورینگ خطاها
- **Google Analytics**: تحلیل ترافیک
- **Hotjar**: تحلیل رفتار کاربران

## 🔄 CI/CD

### GitHub Actions
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build
      run: npm run build
      
    - name: Lint
      run: npm run lint
```

## 🚨 خطاهای رایج

### ۱. خطای اتصال به پایگاه داده
```bash
# راه‌حل
npx prisma db push
npx prisma generate
```

### ۲. خطای CORS
```typescript
// راه‌حل در API Route
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
```

### ۳. خطای TypeScript
```bash
# راه‌حل
npm run build
# بررسی خطاها و اصلاح آن‌ها
```

---

**توسعه‌دهنده: امین رضایی**  
**آخرین به‌روزرسانی: ۲۰۲۴**