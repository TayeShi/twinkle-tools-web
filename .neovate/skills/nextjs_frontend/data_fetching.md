# 数据获取

## Server Component 数据获取

```tsx
import { getAllArticles } from '@/lib/api'

export default async function ArticlesPage() {
  const articles = await getAllArticles()

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>{article.title}</div>
      ))}
    </div>
  )
}
```

## 使用 fetch

```tsx
// 基础用法
export default async function Page() {
  const response = await fetch('https://api.example.com/data')
  const data = await response.json()

  return <div>{data.title}</div>
}

// 缓存控制
export default async function Page() {
  // 强制缓存（默认）
  const data1 = await fetch('https://api.example.com/data', {
    cache: 'force-cache',
  })

  // 无缓存
  const data2 = await fetch('https://api.example.com/data', {
    cache: 'no-store',
  })

  // 重新验证（秒）
  const data3 = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 },
  })

  // 按标签重新验证
  const data4 = await fetch('https://api.example.com/data', {
    next: { tags: ['articles'] },
  })

  return <div>{data.title}</div>
}
```

## 重新验证缓存

```tsx
import { revalidateTag } from 'next/cache'
import { revalidatePath } from 'next/cache'

// 按标签重新验证
export async function POST() {
  revalidateTag('articles')
  return Response.json({ revalidated: true })
}

// 按路径重新验证
export async function POST() {
  revalidatePath('/articles')
  return Response.json({ revalidated: true })
}
```

## 动态参数

```tsx
export default async function ArticlePage({
  params,
}: {
  params: { id: string }
}) {
  const article = await getArticleById(parseInt(params.id))

  return <div>{article.title}</div>
}
```

## 搜索参数

```tsx
export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { page?: string; perPage?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const perPage = parseInt(searchParams.perPage || '10')

  const articles = await getArticles({ page, perPage })

  return <div>...</div>
}
```

## Route Handlers

### 基础路由

```tsx
// app/api/articles/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'

  const articles = await getArticles(parseInt(page))

  return NextResponse.json(articles)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const article = await createArticle(body)

  return NextResponse.json(article, { status: 201 })
}
```

### 动态路由

```tsx
// app/api/articles/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const article = await getArticleById(parseInt(params.id))

  if (!article) {
    return NextResponse.json(
      { message: 'Article not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(article)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const article = await updateArticle(parseInt(params.id), body)

  return NextResponse.json(article)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await deleteArticle(parseInt(params.id))

  return new NextResponse(null, { status: 204 })
}
```

## 流式数据

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

async function ArticleList() {
  const articles = await fetch('/api/articles').then(r => r.json())
  return <div>{/* 渲染列表 */}</div>
}
```

## SWR（数据获取和缓存）

### 安装

```bash
npm install swr
```

### 基础使用

```tsx
'use client'

import useSWR from 'swr'

async function fetcher(url: string) {
  const response = await fetch(url)
  if (!response.ok) throw new Error('请求失败')
  return response.json()
}

export default function ArticleList() {
  const { data, error, isLoading } = useSWR('/api/articles', fetcher)

  if (isLoading) return <div>加载中...</div>
  if (error) return <div>加载失败</div>

  return (
    <div>
      {data?.map((article) => (
        <div key={article.id}>{article.title}</div>
      ))}
    </div>
  )
}
```

### SWR 配置

```tsx
const { data } = useSWR('/api/articles', fetcher, {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60000,
  refreshInterval: 0,
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    if (error.status === 404) return
    if (retryCount >= 3) return
    setTimeout(() => revalidate({ retryCount }), 5000)
  },
})
```

### 自定义 Hook

```tsx
'use client'

import useSWR, { SWRConfiguration } from 'swr'

interface UseDataOptions extends SWRConfiguration {
  shouldFetch?: boolean
}

export function useData<T>(
  key: string | null,
  options: UseDataOptions = {}
) {
  const { shouldFetch = true, ...swrOptions } = options

  return useSWR<T>(
    shouldFetch ? key : null,
    fetcher,
    swrOptions
  )
}
```

## React Query

### 安装

```bash
npm install @tanstack/react-query
```

### 配置

```tsx
// app/providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

### 使用

```tsx
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export default function ArticleList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: () => fetch('/api/articles').then(r => r.json()),
  })

  if (isLoading) return <div>加载中...</div>
  if (error) return <div>加载失败</div>

  return (
    <div>
      {data?.map((article) => (
        <div key={article.id}>{article.title}</div>
      ))}
    </div>
  )
}

export function CreateArticleForm() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data) => fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      mutation.mutate(Object.fromEntries(formData))
    }}>
      {/* 表单字段 */}
    </form>
  )
}
```

## Server Actions

### 定义 Actions

```tsx
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createArticle(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  await db.article.create({
    data: { title, content },
  })

  revalidatePath('/articles')
  redirect('/articles')
}

export async function deleteArticle(id: number) {
  await db.article.delete({ where: { id } })

  revalidatePath('/articles')
}
```

### 使用 Actions

```tsx
import { createArticle } from '@/app/actions'

export default function CreateArticlePage() {
  return (
    <form action={createArticle}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">创建</button>
    </form>
  )
}
```

## 错误处理

```tsx
export async function getArticleById(id: number): Promise<Article> {
  try {
    const article = await api.get<Article>(`/articles/${id}`)
    return article
  } catch (error) {
    console.error('Failed to fetch article:', error)
    throw new Error('无法获取文章')
  }
}
```
