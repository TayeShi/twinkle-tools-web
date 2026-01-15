# 错误处理

## Error Boundaries

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
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div>
        <h2 className="text-2xl font-bold">出错了</h2>
        <p className="text-gray-600 mt-2">
          {error.message || '页面加载时发生错误'}
        </p>
      </div>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        重试
      </button>
    </div>
  )
}
```

## Not Found 页面

```tsx
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">页面未找到</h2>
        <p className="text-gray-600">
          您访问的页面可能已被删除或暂时不可用
        </p>
      </div>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        返回首页
      </Link>
    </div>
  )
}

// 动态路由的 404
// app/articles/[...not-found]/page.tsx
export default function ArticlesNotFound() {
  return <div>文章不存在</div>
}
```

## API 错误处理

```tsx
// lib/api.ts
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

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = '请求失败'
    let details: unknown

    try {
      const errorData = await response.json()
      message = errorData.message || message
      details = errorData
    } catch {
      message = response.statusText || message
    }

    throw new ApiError(message, response.status, details)
  }

  return response.json()
}

export async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options)
  return handleResponse<T>(response)
}
```

## 使用 API 错误处理

```tsx
'use client'

import { useState } from 'react'
import { ApiError } from '@/lib/api'
import { login } from '@/lib/api/auth'

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err) {
      if (err instanceof ApiError) {
        switch (err.status) {
          case 401:
            setError('邮箱或密码错误')
            break
          case 429:
            setError('请求过于频繁，请稍后再试')
            break
          default:
            setError(err.message || '登录失败')
        }
      } else {
        setError('网络错误，请检查连接')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded mb-4">
          {error}
        </div>
      )}
      {/* 表单字段 */}
    </form>
  )
}
```

## Toast 通知

```tsx
// components/ui/toast.tsx
'use client'

import { createContext, useContext, useState } from 'react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (message: string, type: Toast['type']) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: Toast['type']) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded shadow-lg ${
              {
                success: 'bg-green-500 text-white',
                error: 'bg-red-500 text-white',
                warning: 'bg-yellow-500 text-white',
                info: 'bg-blue-500 text-white',
              }[toast.type]
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
```

```tsx
// 使用
import { useToast } from '@/components/ui/toast'

export default function MyComponent() {
  const { addToast } = useToast()

  const handleClick = async () => {
    try {
      await doSomething()
      addToast('操作成功', 'success')
    } catch (error) {
      addToast('操作失败', 'error')
    }
  }
}
```

## 异步加载错误

```tsx
'use client'

import { Suspense } from 'react'
import ErrorBoundary from './error-boundary'

function AsyncComponent() {
  throw new Error('加载失败')
}

export default function Page() {
  return (
    <ErrorBoundary fallback={<div>加载失败，请刷新重试</div>}>
      <Suspense fallback={<div>加载中...</div>}>
        <AsyncComponent />
      </Suspense>
    </ErrorBoundary>
  )
}
```

## 表单验证错误

```tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('无效的邮箱格式'),
  password: z.string().min(8, '密码至少 8 个字符'),
})

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      await login(data)
    } catch (error) {
      // 服务器返回的错误
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && (
        <p className="text-red-500">{errors.email.message}</p>
      )}

      <input type="password" {...register('password')} />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '登录中...' : '登录'}
      </button>
    </form>
  )
}
```

## 全局错误日志

```tsx
// lib/error-logger.ts
export function logError(error: unknown, context?: Record<string, unknown>) {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : error,
    context,
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  }

  console.error('Error logged:', errorInfo)

  // 发送到错误监控服务（如 Sentry）
  if (typeof window !== 'undefined') {
    // sendToSentry(errorInfo)
  }
}

// 使用
try {
  await someOperation()
} catch (error) {
  logError(error, { component: 'LoginForm', action: 'submit' })
}
```
