# 状态管理

## React Hooks（本地状态）

```tsx
'use client'

import { useState, useEffect } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  )
}
```

## Context API（全局状态）

### 创建 Context

```tsx
// contexts/auth-context.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: number
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const { token, user } = await response.json()
    localStorage.setItem('token', token)
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

### 使用 Context

```tsx
// app/layout.tsx
import { AuthProvider } from '@/contexts/auth-context'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

// components/user-profile.tsx
'use client'

import { useAuth } from '@/contexts/auth-context'

export default function UserProfile() {
  const { user, logout } = useAuth()

  return (
    <div>
      <p>用户: {user?.email}</p>
      <button onClick={logout}>退出登录</button>
    </div>
  )
}
```

## Zustand（推荐用于复杂状态）

### 安装

```bash
npm install zustand
```

### 创建 Store

```tsx
// store/auth-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: number
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  initialize: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: async (email: string, password: string) => {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })

        const data = await response.json()
        set({ user: data.user, token: data.token })
      },

      logout: () => {
        set({ user: null, token: null })
      },

      initialize: () => {
        const token = localStorage.getItem('token')
        if (token) {
          set({ token })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
)
```

### 使用 Store

```tsx
'use client'

import { useAuthStore } from '@/store/auth-store'

export default function LoginForm() {
  const { login } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
  }

  return <form onSubmit={handleSubmit}>...</form>
}

// 选择特定值（优化性能）
export default function UserProfile() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return <div>...</div>
}
```

## Server Actions（服务端状态）

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
// app/articles/create/page.tsx
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

## SWR（数据获取和缓存）

### 安装

```bash
npm install swr
```

### 创建 Fetcher

```tsx
// lib/fetcher.ts
export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.')
  }
  return response.json()
}
```

### 使用 SWR Hook

```tsx
'use client'

import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

export default function ArticleList() {
  const { data, error, isLoading } = useSWR<Article[]>('/api/articles', fetcher)

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
})
```

## React Query（替代 SWR）

```bash
npm install @tanstack/react-query
```

```tsx
// app/layout.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

'use client'

import { useQuery } from '@tanstack/react-query'

export default function ArticleList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: () => fetch('/api/articles').then((res) => res.json()),
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
```

## 状态管理选择建议

| 场景 | 推荐方案 |
|------|----------|
| 组件内简单状态 | useState |
| 组件间共享（少量） | Context API |
| 全局状态（复杂） | Zustand |
| 服务端状态 | Server Actions / SWR / React Query |
| 表单状态 | React Hook Form / Zod |
