# 组件开发

## 命名约定

- 文件名：`kebab-case.tsx`（如 `user-card.tsx`）
- 组件名：`PascalCase`（如 `UserCard`）
- Props 接口：`<Component>Props`（如 `UserCardProps`）

## 基础 UI 组件模板

```tsx
// components/ui/button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded font-medium transition-colors',
          {
            'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
            'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
            'bg-red-500 text-white hover:bg-red-600': variant === 'danger',
          },
          {
            'px-3 py-1 text-sm': size === 'sm',
            'px-4 py-2': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export default Button
```

## 数据展示组件

```tsx
// components/features/article-card.tsx
import Link from 'next/link'

export interface ArticleCardProps {
  id: number
  title: string
  excerpt: string
  createdAt: string
  tags: string[]
}

export default function ArticleCard({
  id,
  title,
  excerpt,
  createdAt,
  tags,
}: ArticleCardProps) {
  return (
    <article className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <Link href={`/articles/${id}`}>
        <h2 className="text-xl font-bold mb-2 hover:text-blue-600">
          {title}
        </h2>
      </Link>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </span>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
```

## 组合组件

```tsx
// components/features/article-list.tsx
import { getAllArticles } from '@/lib/api'
import ArticleCard, { ArticleCardProps } from './article-card'

export default async function ArticleList() {
  const articles = await getAllArticles()

  return (
    <div className="grid gap-4">
      {articles.map((article: ArticleCardProps) => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </div>
  )
}
```

## 表单组件

```tsx
// components/forms/login-form.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('登录失败')
      }

      const { token } = await response.json()
      localStorage.setItem('token', token)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        登录
      </button>
    </form>
  )
}
```

## Props 类型定义

```tsx
// 组件 Props 使用接口定义
export interface CardProps {
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

// 组件 Props 使用类型别名（更简单）
export type BadgeProps = {
  variant?: 'success' | 'warning' | 'error'
  children: React.ReactNode
}
```

## 组件导出

```tsx
// 单一导出
export default function MyComponent() {
  return <div>...</div>
}

// 命名导出
export function MyComponent() {
  return <div>...</div>
}
```

## 组件文件组织

```
components/
├── ui/              # 可复用的基础组件
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── modal.tsx
├── forms/           # 表单组件
│   └── login-form.tsx
├── layout/          # 布局组件
│   ├── header.tsx
│   └── sidebar.tsx
└── features/        # 业务组件
    ├── article-list.tsx
    └── user-profile.tsx
```
