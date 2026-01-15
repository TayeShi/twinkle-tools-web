# API 客户端封装

## ApiClient 类

```tsx
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number>
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private getAuthHeader(): Record<string, string> | undefined {
    if (typeof window === 'undefined') return undefined

    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : undefined
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }

    return url.toString()
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let message = '请求失败'
      let details: unknown

      try {
        const errorData = await response.json()
        message = (errorData as { message?: string }).message || message
        details = errorData
      } catch {
        message = response.statusText || message
      }

      throw new ApiError(message, response.status, details)
    }

    return response.json()
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = this.buildUrl(endpoint, options.params)

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    })

    return this.handleResponse<T>(response)
  }

  async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params })
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body: data })
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body: data })
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', body: data })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const api = new ApiClient(API_BASE_URL)
export type { RequestOptions }
```

## 类型化 API 函数

```tsx
// lib/api/articles.ts
import { api } from '@/lib/api'

export interface Article {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  tags: string[]
}

export interface CreateArticleDto {
  title: string
  content: string
  tags?: string[]
}

export interface UpdateArticleDto {
  title?: string
  content?: string
  tags?: string[]
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  perPage: number
}

export const articlesApi = {
  getAll: (params?: { page?: number; perPage?: number }) =>
    api.get<PaginatedResponse<Article>>('/articles', params),

  getById: (id: number) =>
    api.get<Article>(`/articles/${id}`),

  create: (data: CreateArticleDto) =>
    api.post<Article>('/articles', data),

  update: (id: number, data: UpdateArticleDto) =>
    api.put<Article>(`/articles/${id}`, data),

  delete: (id: number) =>
    api.delete<void>(`/articles/${id}`),
}
```

## 使用 API 客户端

### Server Component

```tsx
import { articlesApi } from '@/lib/api/articles'

export default async function ArticlesPage() {
  const articles = await articlesApi.getAll({ page: 1, perPage: 10 })

  return (
    <div>
      {articles.items.map((article) => (
        <div key={article.id}>{article.title}</div>
      ))}
    </div>
  )
}
```

### Client Component

```tsx
'use client'

import { useState, useEffect } from 'react'
import { articlesApi, type Article } from '@/lib/api/articles'

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    articlesApi
      .getAll()
      .then((data) => setArticles(data.items))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>加载中...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>{article.title}</div>
      ))}
    </div>
  )
}
```

## 错误处理

```tsx
'use client'

import { ApiError } from '@/lib/api'

export default function CreateArticleForm() {
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setError(null)

    try {
      await articlesApi.create({ title, content })
      alert('创建成功')
    } catch (err) {
      if (err instanceof ApiError) {
        setError(`${err.status}: ${err.message}`)
      } else {
        setError('未知错误')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="text-red-500">{error}</div>}
      {/* 表单字段 */}
    </form>
  )
}
```

## 重试机制

```tsx
// lib/api.ts（扩展 ApiClient）

async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const maxRetries = 3
  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await this.fetch(endpoint, options)
    } catch (error) {
      lastError = error as Error

      // 仅对网络错误或 5xx 错误重试
      if (!this.shouldRetry(error)) {
        throw error
      }

      // 指数退避
      const delay = Math.pow(2, attempt) * 1000
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

private shouldRetry(error: unknown): boolean {
  if (error instanceof ApiError) {
    return error.status >= 500
  }
  return true // 网络错误
}
```

## 请求取消

```tsx
'use client'

import { useState, useEffect, useRef } from 'react'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Article[]>([])
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const search = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()

      try {
        const data = await api.get<Article[]>('/articles/search', {
          params: { q: query },
        }, {
          signal: abortControllerRef.current.signal,
        })
        setResults(data)
      } catch (err) {
        if (!abortControllerRef.current?.signal.aborted) {
          console.error(err)
        }
      }
    }

    const timeoutId = setTimeout(search, 300)
    setResults([])

    return () => {
      clearTimeout(timeoutId)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [query])

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索..."
      />
      {results.map((article) => (
        <div key={article.id}>{article.title}</div>
      ))}
    </div>
  )
}
```

## 环境变量

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080

# .env.production
NEXT_PUBLIC_API_URL=https://api.example.com
```

```tsx
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
```

## 认证拦截器

```tsx
// lib/api.ts（扩展 ApiClient）

private async handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 401) {
    // Token 过期，清除并跳转登录
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    throw new ApiError('未认证', 401)
  }

  if (!response.ok) {
    let message = '请求失败'
    let details: unknown

    try {
      const errorData = await response.json()
      message = (errorData as { message?: string }).message || message
      details = errorData
    } catch {
      message = response.statusText || message
    }

    throw new ApiError(message, response.status, details)
  }

  return response.json()
}
```
