# 路由和导航

## Link 导航

```tsx
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <Link href="/">首页</Link>
      <Link href="/articles">文章</Link>
      <Link href="/about">关于</Link>
    </nav>
  )
}

// 动态路由
<Link href={`/articles/${article.id}`}>查看文章</Link>

// 查询参数
<Link href="/articles?page=2">下一页</Link>

// 带对象参数
<Link
  href={{
    pathname: '/articles',
    query: { page: '2', sort: 'desc' },
  }}
>
  排序
</Link>
```

## 编程式导航

```tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function ArticleList() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleNavigation = () => {
    // 简单导航
    router.push('/articles')

    // 带查询参数
    router.push('/articles?page=2')

    // 动态路由
    router.push(`/articles/${articleId}`)

    // 替换当前历史
    router.replace('/login')

    // 后退
    router.back()

    // 刷新
    router.refresh()

    // 读取查询参数
    const page = searchParams.get('page') || '1'
  }

  return <button onClick={handleNavigation}>导航</button>
}
```

## 动态路由

```tsx
// app/articles/[id]/page.tsx
import { notFound } from 'next/navigation'

export default async function ArticlePage({
  params,
}: {
  params: { id: string }
}) {
  const article = await getArticleById(params.id)

  if (!article) {
    notFound()
  }

  return <div>{article.title}</div>
}
```

## 捕获所有路由

```tsx
// app/[...slug]/page.tsx
export default async function CatchAllPage({
  params,
}: {
  params: { slug: string[] }
}) {
  return <div>路径: {params.slug.join('/')}</div>
}

// app/shop/[...product]/page.tsx
// 匹配 /shop/a, /shop/a/b, /shop/a/b/c
```

## 路由组

```tsx
// app/(auth)/login/page.tsx
// app/(auth)/register/page.tsx
// app/(dashboard)/layout.tsx
// app/(dashboard)/page.tsx
// app/(dashboard)/articles/page.tsx

// 路由组不会影响 URL，只用于组织和共享布局
```

## 并行路由

```tsx
// app/@dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  settings,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  settings: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        {children}
        {analytics}
        {settings}
      </div>
    </div>
  )
}

// app/dashboard/@dashboard/analytics/page.tsx
// app/dashboard/@dashboard/settings/page.tsx
```

## 拦截路由

```tsx
// app/(.)photo/[id]/page.tsx
// 拦截 /photo/[id] 并以模态框显示

import { useRouter } from 'next/navigation'

export default function PhotoModal({ params }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <button onClick={() => router.back()}>关闭</button>
        <img src={`/photos/${params.id}`} />
      </div>
    </div>
  )
}
```

## 中间件

```tsx
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard', '/profile']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

## 404 处理

```tsx
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">页面未找到</p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        返回首页
      </Link>
    </div>
  )
}

// app/[...not-found]/page.tsx
// 自定义 404 页面（覆盖默认）
```

## 重定向

```tsx
// app/dashboard/page.tsx
import { redirect } from 'next/navigation'

export default function DashboardPage() {
  const user = getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return <div>欢迎, {user.name}</div>
}

// 永久重定向
import { permanentRedirect } from 'next/navigation'

permanentRedirect('/new-path')
```

## 页面间传参

### URL 参数

```tsx
// app/search/page.tsx
export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string }
}) {
  return (
    <div>
      <p>搜索: {searchParams.q}</p>
      <p>分类: {searchParams.category}</p>
    </div>
  )
}
```

### 使用状态传递

```tsx
'use client'

import { useRouter } from 'next/navigation'

export default function ArticleCard({ article }) {
  const router = useRouter()

  const handleClick = () => {
    // 使用 router state 传递数据
    router.push(`/articles/${article.id}`, {
      state: { from: 'list' },
    })
  }

  return <div onClick={handleClick}>{article.title}</div>
}
```

## 面包屑导航

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <nav className="flex items-center gap-2">
      <Link href="/" className="text-blue-600">
        首页
      </Link>
      {segments.map((segment, index) => (
        <div key={index} className="flex items-center gap-2">
          <span>/</span>
          <Link
            href={`/${segments.slice(0, index + 1).join('/')}`}
            className="text-blue-600"
          >
            {segment}
          </Link>
        </div>
      ))}
    </nav>
  )
}
```

## 激活链接高亮

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function NavLink({
  href,
  children,
  exact = false,
}: {
  href: string
  children: React.ReactNode
  exact?: boolean
}) {
  const pathname = usePathname()

  const isActive = exact
    ? pathname === href
    : pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={cn(
        'px-4 py-2 rounded',
        isActive
          ? 'bg-blue-500 text-white'
          : 'text-gray-700 hover:bg-gray-200'
      )}
    >
      {children}
    </Link>
  )
}
```
