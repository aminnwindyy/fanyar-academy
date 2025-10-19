import { db } from './src/lib/db'

async function main() {
  // Clear existing data
  await db.contactMessage.deleteMany()
  await db.course.deleteMany()
  await db.teacher.deleteMany()
  await db.category.deleteMany()

  // Create technical categories only
  const webDevCategory = await db.category.create({
    data: {
      name: 'توسعه وب',
      description: 'دوره‌های آموزشی توسعه وب و برنامه نویسی فرانت‌اند و بک‌اند',
      icon: 'code'
    }
  })

  const mobileDevCategory = await db.category.create({
    data: {
      name: 'توسعه موبایل',
      description: 'دوره‌های آموزشی توسعه اپلیکیشن موبایل',
      icon: 'smartphone'
    }
  })

  const dataScienceCategory = await db.category.create({
    data: {
      name: 'علم داده و هوش مصنوعی',
      description: 'دوره‌های آموزشی علم داده، یادگیری ماشین و هوش مصنوعی',
      icon: 'brain'
    }
  })

  const devOpsCategory = await db.category.create({
    data: {
      name: 'DevOps و زیرساخت',
      description: 'دوره‌های آموزشی DevOps، Docker، Kubernetes و مدیریت سرور',
      icon: 'server'
    }
  })

  const securityCategory = await db.category.create({
    data: {
      name: 'امنیت سایبری',
      description: 'دوره‌های آموزشی امنیت شبکه، تست نفوذ و امنیت اپلیکیشن',
      icon: 'shield'
    }
  })

  // Create teachers
  const teacher1 = await db.teacher.create({
    data: {
      name: 'دکتر علی رضایی',
      email: 'ali.rezaei@faniyar.ir',
      bio: 'عضو هیئت علمی دانشگاه فردوسی و متخصص توسعه وب با بیش از 15 سال سابقه کار',
      expertise: 'JavaScript, React, Node.js, TypeScript',
      experience: 15
    }
  })

  const teacher2 = await db.teacher.create({
    data: {
      name: 'دکتر مریم احمدی',
      email: 'maryam.ahmadi@faniyar.ir',
      bio: 'استادیار دانشگاه فردوسی و متخصص React و Next.js با پروژه‌های صنعتی متعدد',
      expertise: 'React, Next.js, TypeScript, GraphQL',
      experience: 12
    }
  })

  const teacher3 = await db.teacher.create({
    data: {
      name: 'دکتر رضا حسینی',
      email: 'reza.hosseini@faniyar.ir',
      bio: 'عضو هیئت علمی دانشگاه فردوسی و متخصص علم داده و هوش مصنوعی',
      expertise: 'Python, Machine Learning, Deep Learning, TensorFlow',
      experience: 18
    }
  })

  const teacher4 = await db.teacher.create({
    data: {
      name: 'دکتر امیر ابراهیمی',
      email: 'amir.ebrahimi@faniyar.ir',
      bio: 'متخصص توسعه موبایل و DevOps با سابقه کار در شرکت‌های بزرگ فناوری',
      expertise: 'Flutter, React Native, Docker, Kubernetes',
      experience: 10
    }
  })

  const teacher5 = await db.teacher.create({
    data: {
      name: 'دکتر سارا محمدی',
      email: 'sara.mohammadi@faniyar.ir',
      bio: 'متخصص امنیت سایبری و تست نفوذ با گواهینامه‌های بین‌المللی',
      expertise: 'Cybersecurity, Penetration Testing, Network Security',
      experience: 14
    }
  })

  // Create technical courses
  await db.course.createMany({
    data: [
      {
        title: 'برنامه نویسی وب مقدماتی (HTML, CSS, JavaScript)',
        description: 'شروع به یادگیری برنامه نویسی وب از صفر تا ساختن پروژه‌های واقعی',
        content: 'در این دوره شما با مبانی برنامه نویسی وب شامل HTML5، CSS3 و JavaScript ES6+ آشنا می‌شوید و چندین پروژه عملی انجام می‌دهید.',
        price: 2500000,
        duration: 48,
        level: 'BEGINNER',
        categoryId: webDevCategory.id,
        teacherId: teacher1.id,
        imageUrl: '/courses/web-fundamentals.jpg'
      },
      {
        title: 'React پیشرفته و Next.js',
        description: 'یادگیری React، Redux، Next.js و ساخت اپلیکیشن‌های وب مدرن',
        content: 'در این دوره مفاهیم پیشرفته React، مدیریت state با Redux، SSR و SSG با Next.js را به صورت عملی یاد می‌گیرید.',
        price: 3500000,
        duration: 64,
        level: 'ADVANCED',
        categoryId: webDevCategory.id,
        teacherId: teacher2.id,
        imageUrl: '/courses/react-nextjs.jpg'
      },
      {
        title: 'Node.js و بک‌اند توسعه',
        description: 'ساخت API و بک‌اند با Node.js، Express و MongoDB',
        content: 'در این دوره ساخت RESTful API، مدیریت دیتابیس، احراز هویت و مفاهیم بک‌اند را با Node.js یاد می‌گیرید.',
        price: 3200000,
        duration: 56,
        level: 'INTERMEDIATE',
        categoryId: webDevCategory.id,
        teacherId: teacher1.id,
        imageUrl: '/courses/nodejs-backend.jpg'
      },
      {
        title: 'پایتون برای علم داده',
        description: 'آموزش پایتون، NumPy، Pandas و کتابخانه‌های علم داده',
        content: 'در این دوره پایتون و کتابخانه‌های مورد نیاز برای تحلیل داده و علم داده را به صورت عملی یاد می‌گیرید.',
        price: 4000000,
        duration: 80,
        level: 'INTERMEDIATE',
        categoryId: dataScienceCategory.id,
        teacherId: teacher3.id,
        imageUrl: '/courses/python-data-science.jpg'
      },
      {
        title: 'یادگیری ماشین و هوش مصنوعی',
        description: 'آموزش الگوریتم‌های ML، TensorFlow و پروژه‌های واقعی هوش مصنوعی',
        content: 'در این دوره با الگوریتم‌های یادگیری ماشین، شبکه‌های عصبی و TensorFlow برای ساخت پروژه‌های هوش مصنوعی آشنا می‌شوید.',
        price: 4500000,
        duration: 96,
        level: 'ADVANCED',
        categoryId: dataScienceCategory.id,
        teacherId: teacher3.id,
        imageUrl: '/courses/machine-learning.jpg'
      },
      {
        title: 'توسعه موبایل با Flutter',
        description: 'ساخت اپلیکیشن موبایل برای اندروید و iOS با فلاتر',
        content: 'در این دوره ساخت اپلیکیشن‌های موبایل مدرن با Flutter، مدیریت state و اتصال به API را یاد می‌گیرید.',
        price: 3000000,
        duration: 60,
        level: 'INTERMEDIATE',
        categoryId: mobileDevCategory.id,
        teacherId: teacher4.id,
        imageUrl: '/courses/flutter-mobile.jpg'
      },
      {
        title: 'DevOps و Docker',
        description: 'آموزش Docker، Kubernetes و CI/CD برای توسعه نرم‌افزار',
        content: 'در این دوره مفاهیم DevOps، کانتینرسازی با Docker، اورکستریشن با Kubernetes و CI/CD را یاد می‌گیرید.',
        price: 3800000,
        duration: 72,
        level: 'INTERMEDIATE',
        categoryId: devOpsCategory.id,
        teacherId: teacher4.id,
        imageUrl: '/courses/devops-docker.jpg'
      },
      {
        title: 'امنیت سایبری و تست نفوذ',
        description: 'آموزش اصول امنیت شبکه، تست نفوذ و محافظت از سیستم‌ها',
        content: 'در این دوره با اصول امنیت سایبری، روش‌های تست نفوذ و محافظت از سیستم‌ها در برابر حملات آشنا می‌شوید.',
        price: 4200000,
        duration: 84,
        level: 'ADVANCED',
        categoryId: securityCategory.id,
        teacherId: teacher5.id,
        imageUrl: '/courses/cybersecurity.jpg'
      }
    ]
  })

  console.log('Database seeded successfully with technical courses!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })