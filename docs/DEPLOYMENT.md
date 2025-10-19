# راهنمای استقرار پروژه آکادمی فنیار

این راهنما مراحل کامل استقرار پروژه آکادمی فنیار در محیط‌های مختلف را توضیح می‌دهد.

## 📋 پیش‌نیازها

### سیستم مورد نیاز:
- **Node.js 18+** (نسخه LTS توصیه می‌شود)
- **npm 9+** یا **yarn 1.22+**
- **Git** برای مدیریت نسخه
- **حافظه RAM:** حداقل 2GB
- **فضای دیسک:** حداقل 1GB

### نرم‌افزارهای اختیاری:
- **Docker** برای کانتینرسازی
- **PM2** برای مدیریت پروسس‌ها
- **Nginx** برای reverse proxy

## 🚀 استقرار محلی (Local Development)

### ۱. کلون کردن پروژه:
```bash
git clone https://github.com/aminnwindyy/fanyar-academy.git
cd fanyar-academy
```

### ۲. نصب پکیج‌ها:
```bash
npm install
# یا
yarn install
```

### ۳. تنظیم متغیرهای محیطی:
```bash
# ایجاد فایل .env.local
cp .env.example .env.local

# ویرایش فایل .env.local
nano .env.local
```

محتوای فایل `.env.local`:
```bash
# Database
DATABASE_URL="file:./db/custom.db"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"

# Optional: External services
# SMTP_HOST="smtp.gmail.com"
# SMTP_PORT="587"
# SMTP_USER="your-email@gmail.com"
# SMTP_PASS="your-app-password"
```

### ۴. راه‌اندازی دیتابیس:
```bash
# پوش کردن اسکیما به دیتابیس
npm run db:push

# (اختیاری) مشاهده دیتابیس با Prisma Studio
npm run db:studio

# (اختیاری) اجرای دیتای نمونه
npm run seed
```

### ۵. اجرای پروژه:
```bash
# حالت توسعه
npm run dev

# یا برای اجرای نسخه تولید
npm run build
npm start
```

پروژه در `http://localhost:3000` در دسترس خواهد بود.

---

## 🐳 استقرار با Docker

### ۱. ساخت Dockerfile:
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### ۲. ساخت docker-compose.yml:
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=file:./db/custom.db
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=your-production-secret
    volumes:
      - ./db:/app/db
    restart: unless-stopped

  # Optional: Nginx reverse proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped
```

### ۳. اجرا با Docker:
```bash
# ساخت و اجرا
docker-compose up -d

# مشاهده لاگ‌ها
docker-compose logs -f

# توقف
docker-compose down
```

---

## ☁️ استقرار در Vercel (توصیه شده)

### ۱. آماده‌سازی پروژه:
```bash
# نصب Vercel CLI
npm i -g vercel

# لاگین به حساب Vercel
vercel login
```

### ۲. تنظیم متغیرهای محیطی در Vercel:
```bash
# تنظیم متغیرهای محیطی
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
```

### ۳. استقرار:
```bash
# استقرار اولیه
vercel

# استقرار به production
vercel --prod
```

### ۴. تنظیم دیتابیس خارجی (برای Vercel):
برای Vercel، استفاده از دیتابیس خارجی مانند **PlanetScale** یا **Supabase** توصیه می‌شود:

```bash
# نصب PlanetScale
npm install @planetscale/database

# تنظیم connection string
DATABASE_URL="mysql://user:pass@host/db?sslaccept=strict"
```

---

## 🚀 استقرار در Netlify

### ۱. آماده‌سازی پروژه:
```bash
# نصب Netlify CLI
npm install -g netlify-cli

# لاگین
netlify login
```

### ۲. ساخت فایل netlify.toml:
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### ۳. استقرار:
```bash
# استقرار
netlify deploy --prod

# یا با drag & drop در سایت Netlify
```

---

## 🐧 استقرار در سرور لینوکس (Ubuntu/Debian)

### ۱. نصب Node.js:
```bash
# نصب Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# بررسی نسخه‌ها
node --version
npm --version
```

### ۲. نصب PM2:
```bash
# نصب PM2 برای مدیریت پروسس‌ها
sudo npm install -g pm2
```

### ۳. آماده‌سازی پروژه:
```bash
# کلون کردن پروژه
git clone https://github.com/aminnwindyy/fanyar-academy.git
cd fanyar-academy

# نصب پکیج‌ها
npm install --production

# ساخت پروژه
npm run build

# تنظیم متغیرهای محیطی
nano .env.production
```

### ۴. ساخت فایل PM2:
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'faniar-academy',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
```

### ۵. اجرا با PM2:
```bash
# اجرا
pm2 start ecosystem.config.js --env production

# ذخیره تنظیمات
pm2 save

# اجرا خودکار بعد از ریبوت
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

### ۶. تنظیم Nginx (اختیاری):
```nginx
# /etc/nginx/sites-available/faniar-academy
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

فعال‌سازی سایت:
```bash
sudo ln -s /etc/nginx/sites-available/faniar-academy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔒 تنظیم SSL با Let's Encrypt

### ۱. نصب Certbot:
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

### ۲. دریافت گواهی SSL:
```bash
sudo certbot --nginx -d your-domain.com
```

### ۳. تمدید خودکار:
```bash
sudo crontab -e
# اضافه کردن خط زیر:
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 📊 مانیتورینگ و لاگ‌ها

### ۱. مشاهده لاگ‌های PM2:
```bash
# مشاهده لاگ‌ها
pm2 logs

# مشاهده لاگ‌های یک اپ خاص
pm2 logs faniar-academy

# مشاهده لاگ‌ها در فایل
pm2 logs faniar-academy --lines 1000 > app.log
```

### ۲. مانیتورینگ وضعیت:
```bash
# مشاهده وضعیت اپ‌ها
pm2 status

# مشاهده جزئیات
pm2 show faniar-academy

# مانیتورینگ زنده
pm2 monit
```

### ۳. تنظیم لاگ‌های سیستم:
```bash
# مشاهده لاگ‌های systemd
sudo journalctl -u pm2 -f

# مشاهده لاگ‌های Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 🔄 به‌روزرسانی و نگهداری

### ۱. به‌روزرسانی پروژه:
```bash
# کشیدن تغییرات جدید
git pull origin main

# نصب پکیج‌های جدید
npm install

# ساخت مجدد پروژه
npm run build

# ری‌استارت با PM2
pm2 restart faniar-academy
```

### ۲. پشتیبان‌گیری از دیتابیس:
```bash
# ایجاد پشتیبان
cp db/custom.db backups/custom-$(date +%Y%m%d-%H%M%S).db

# پشتیبان‌گیری خودکار (با cron)
crontab -e
# اضافه کردن خط زیر:
0 2 * * * cp /path/to/fanyar-academy/db/custom.db /path/to/backups/custom-$(date +\%Y\%m\%d-\%H\%M\%S).db
```

### ۳. پاک‌سازی:
```bash
# پاک‌سازی لاگ‌های قدیمی PM2
pm2 flush

# پاک‌سازی پکیج‌های قدیمی
npm prune

# پاک‌سازی فایل‌های build قدیمی
rm -rf .next
npm run build
```

---

## 🚨 عیب‌یابی مشکلات رایج

### ۱. خطاهای Node.js:
```bash
# افزایش حافظه
export NODE_OPTIONS="--max-old-space-size=4096"

# بررسی ورژن‌ها
node --version
npm --version
```

### ۲. خطاهای دیتابیس:
```bash
# بررسی اتصال دیتابیس
npm run db:push

# بازسازی دیتابیس
rm db/custom.db
npm run db:push
npm run seed
```

### ۳. خطاهای پورت:
```bash
# بررسی پورت‌های فعال
sudo netstat -tlnp | grep :3000

# کشتن پروسس‌های قدیمی
sudo pkill -f "node"
```

### ۴. خطاهای دسترسی:
```bash
# تنظیم دسترسی‌های صحیح
sudo chown -R ubuntu:ubuntu /path/to/faniar-academy
chmod -R 755 /path/to/faniar-academy
```

---

## 📈 بهینه‌سازی عملکرد

### ۱. بهینه‌سازی Node.js:
```javascript
// در package.json
"scripts": {
  "start": "node --max-old-space-size=4096 server.js"
}
```

### ۲. بهینه‌سازی Nginx:
```nginx
# در nginx.conf
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

# Cache static files
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### ۳. بهینه‌سازی PM2:
```javascript
// در ecosystem.config.js
module.exports = {
  apps: [{
    name: 'faniar-academy',
    script: 'npm',
    args: 'start',
    instances: 'max', // استفاده از تمام CPU cores
    exec_mode: 'cluster',
    max_memory_restart: '1G'
  }]
};
```

---

## 🔧 ابزارهای مفید

### ۱. ابزارهای مانیتورینگ:
- **PM2 Monit**: `pm2 monit`
- **htop**: `sudo apt install htop`
- **iotop**: `sudo apt install iotop`

### ۲. ابزارهای دیباگ:
- **curl**: برای تست API
- **Postman**: برای تست کامل API
- **Chrome DevTools**: برای دیباگ فرانت‌اند

### ۳. ابزارهای تحلیل:
- **Google Analytics**: برای تحلیل ترافیک
- **Sentry**: برای مانیتورینگ خطاها
- **LogRocket**: برای ری‌پلی سشن‌های کاربر

---

**توسعه‌دهنده: امین وندی**  
**آخرین به‌روزرسانی: ۲۰۲۴**