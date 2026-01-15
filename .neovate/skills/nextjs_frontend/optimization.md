# 性能优化

## 图片优化

```tsx
import Image from 'next/image'

// 基础用法
<Image
  src="/images/profile.jpg"
  alt="用户头像"
  width={200}
  height={200}
/>

// 响应式图片
<Image
  src="/hero.jpg"
  alt="首页横幅"
  fill
  priority
  className="object-cover"
/>

// 远程图片
<Image
  src="https://example.com/image.jpg"
  alt="远程图片"
  width={500}
  height={300}
/>
```

## next.config.js 配置

```js
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
  // 压缩
  compress: true,
  // SWC 压缩
  swcMinify: true,
}

export default nextConfig
```

## 代码分割

```tsx
// 动态导入（组件级别）
'use client'

import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('@/components/heavy'),
  {
    loading: () => <p>加载中...</p>,
    ssr: false, // 禁用 SSR
  }
)

export default function Page() {
  return <HeavyComponent />
}

// 带命名导出的动态导入
const Modal = dynamic(
  () => import('@/components/modal').then((mod) => mod.Modal),
  { loading: () => <p>加载中...</p> }
)
```

## 懒加载

```tsx
// 路由级别的懒加载（自动）
// Next.js 自动为每个路由创建独立的 bundle

// 图片懒加载
<Image
  src="/image.jpg"
  loading="lazy" // 懒加载
  alt="图片"
  width={500}
  height={300}
/>
```

## 数据缓存

```tsx
// 静态数据缓存（默认）
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }, // 缓存 1 小时
  })

  return <div>{/* ... */}</div>
}

// 增量静态再生成（ISR）
export const revalidate = 3600 // 页面级别

export default async function Page() {
  const data = await fetch('https://api.example.com/data')
  return <div>{/* ... */}</div>
}

// 按标签重新验证
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { tags: ['articles'] },
  })
  return <div>{/* ... */}</div>
}

// 在 API 路由中触发重新验证
import { revalidateTag } from 'next/cache'

export async function POST() {
  revalidateTag('articles')
  return Response.json({ revalidated: true })
}
```

## 字体优化

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // 优化加载
  variable: '--font-inter',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

## Script 优化

```tsx
import Script from 'next/script'

export default function Page() {
  return (
    <div>
      <Script
        src="https://example.com/script.js"
        strategy="afterInteractive" // 页面交互后加载
      />
      <Script
        src="https://example.com/analytics.js"
        strategy="lazyOnload" // 浏览器空闲时加载
      />
      <Script
        src="https://example.com/critical.js"
        strategy="beforeInteractive" // 页面可交互前加载
      />
    </div>
  )
}
```

## 预加载

```tsx
// 预加载下一页
import { useRouter } from 'next/navigation'

export default function Card({ article }) {
  const router = useRouter()

  const handleMouseEnter = () => {
    router.prefetch(`/articles/${article.id}`)
  }

  return (
    <div onMouseEnter={handleMouseEnter}>
      {/* ... */}
    </div>
  )
}
```

## 虚拟列表

```tsx
// 使用 react-window
import { FixedSizeList } from 'react-window'

export default function LongList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].title}
    </div>
  )

  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  )
}
```

## Memo 优化

```tsx
'use client'

import { memo } from 'react'

const ExpensiveComponent = memo(({ data }) => {
  // 复杂渲染逻辑
  return <div>{data.title}</div>
})

// 使用自定义比较函数
const ArticleCard = memo(({ article }) => {
  return <div>{article.title}</div>
}, (prev, next) => prev.article.id === next.article.id)
```

## useCallback 和 useMemo

```tsx
'use client'

import { useState, useCallback, useMemo } from 'react'

export default function List({ items }) {
  const [filter, setFilter] = useState('')

  // 缓存过滤后的结果
  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(filter.toLowerCase())
    )
  }, [items, filter])

  // 缓存回调函数
  const handleItemClick = useCallback((id: number) => {
    console.log('Clicked:', id)
  }, [])

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {filteredItems.map((item) => (
        <div key={item.id} onClick={() => handleItemClick(item.id)}>
          {item.title}
        </div>
      ))}
    </div>
  )
}
```

## Bundle 分析

```bash
# 安装
npm install @next/bundle-analyzer

# next.config.mjs
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)

# 运行分析
ANALYZE=true npm run build
```

## Lighthouse 检查

```bash
# 使用 Chrome DevTools Lighthouse
# 检查性能、可访问性、最佳实践、SEO

# 或使用 CLI
npm install -g lighthouse
lighthouse https://example.com
```

## 性能监控

```tsx
'use client'

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'web-vital') {
            console.log(entry.name, entry.value)
            // 发送到分析服务
          }
        })
      })

      observer.observe({ entryTypes: ['web-vital'] })

      return () => observer.disconnect()
    }
  }, [])

  return null
}
```
