# 页面和布局

## 页面组件模板

```tsx
// app/articles/[id]/page.tsx
import { notFound } from 'next/navigation'
import { getArticleById } from '@/lib/api'

export default async function ArticlePage({
  params,
}: {
  params: { id: string }
}) {
  const article = await getArticleById(params.id)

  if (!article) {
    notFound()
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  )
}
```

## Server Components vs Client Components

### Server Component (默认)

```tsx
// 适用于：数据获取、渲染纯 UI
export default async function Page() {
  const data = await fetchData()

  return <div>{data.title}</div>
}
```

### Client Component

```tsx
'use client'

// 适用于：交互、状态、浏览器 API、Hooks
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

## 布局组件模板

```tsx
// app/(dashboard)/layout.tsx
import { ReactNode } from 'react'
import Header from '@/components/layout/header'
import Sidebar from '@/components/layout/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
```

## 根布局

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My App',
  description: 'Description',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

## 加载状态

```tsx
// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
    </div>
  )
}
```

## 错误处理

```tsx
// app/error.tsx
'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">出错了</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        重试
      </button>
    </div>
  )
}
```

## 404 页面

```tsx
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="mb-4">页面未找到</p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        返回首页
      </Link>
    </div>
  )
}
```

## 元数据

```tsx
// 静态元数据
export const metadata: Metadata = {
  title: 'My Page',
  description: 'Page description',
}

// 动态元数据
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const data = await fetchArticle(params.id)

  return {
    title: data.title,
    description: data.excerpt,
  }
}
```

## 流式渲染

```tsx
import { Suspense } from 'react'

export default async function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ArticleList />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <RelatedArticles />
      </Suspense>
    </div>
  )
}
```
