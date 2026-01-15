# 表单处理和验证

## React Hook Form + Zod

### 安装依赖

```bash
npm install react-hook-form zod @hookform/resolvers
```

### 表单验证 Schema

```tsx
// lib/schemas.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('无效的邮箱地址'),
  password: z.string().min(8, '密码至少 8 个字符'),
})

export const createArticleSchema = z.object({
  title: z.string().min(1, '标题不能为空').max(200, '标题最多 200 个字符'),
  content: z.string().min(1, '内容不能为空'),
  tags: z.array(z.string()).optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type CreateArticleInput = z.infer<typeof createArticleSchema>
```

### 登录表单

```tsx
// components/forms/login-form.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginInput } from '@/lib/schemas'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('登录失败')

      const { token } = await response.json()
      localStorage.setItem('token', token)
      router.push('/dashboard')
    } catch (error) {
      alert(error instanceof Error ? error.message : '登录失败')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          邮箱
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 w-full p-2 border rounded"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          密码
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="mt-1 w-full p-2 border rounded"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {isSubmitting ? '登录中...' : '登录'}
      </button>
    </form>
  )
}
```

### 创建文章表单

```tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createArticleSchema, type CreateArticleInput } from '@/lib/schemas'
import { useRouter } from 'next/navigation'

export default function CreateArticleForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CreateArticleInput>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: { tags: [] },
  })

  const tags = watch('tags') || []

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setValue('tags', [...tags, tag])
    }
  }

  const removeTag = (index: number) => {
    setValue('tags', tags.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: CreateArticleInput) => {
    try {
      await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      router.push('/articles')
    } catch (error) {
      alert(error instanceof Error ? error.message : '创建失败')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          标题
        </label>
        <input
          id="title"
          {...register('title')}
          className="w-full p-2 border rounded"
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium">
          内容
        </label>
        <textarea
          id="content"
          rows={5}
          {...register('content')}
          className="w-full p-2 border rounded"
        />
        {errors.content && (
          <p className="text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">标签</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="添加标签"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTag(e.currentTarget.value)
                e.currentTarget.value = ''
              }
            }}
            className="flex-1 p-2 border rounded"
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="hover:text-red-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {isSubmitting ? '创建中...' : '创建'}
      </button>
    </form>
  )
}
```

## Server Actions 表单

```tsx
// app/actions.ts
'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'

const createArticleSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
})

export async function createArticle(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  const result = createArticleSchema.safeParse({ title, content })

  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  await db.article.create({
    data: { title, content },
  })

  redirect('/articles')
}

// app/articles/create/page.tsx
import { createArticle } from '@/app/actions'

export default function CreateArticlePage() {
  return (
    <form action={createArticle} className="space-y-4">
      <input name="title" placeholder="标题" className="w-full p-2 border rounded" />
      <textarea name="content" placeholder="内容" rows={5} className="w-full p-2 border rounded" />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        创建
      </button>
    </form>
  )
}
```

## 常用 Zod 验证规则

```tsx
import { z } from 'zod'

export const schema = z.object({
  // 字符串
  name: z.string().min(1).max(100),
  email: z.string().email(),
  url: z.string().url(),

  // 数字
  age: z.number().min(18).max(120),
  price: z.number().positive(),

  // 日期
  birthday: z.coerce.date(),
  startDate: z.coerce.date().min(new Date()),

  // 枚举
  status: z.enum(['active', 'inactive', 'pending']),

  // 可选
  nickname: z.string().optional(),

  // 可空
  bio: z.string().nullable(),

  // 默认值
  role: z.string().default('user'),

  // 自定义验证
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, '必须包含大写字母')
    .regex(/[0-9]/, '必须包含数字'),

  // 数组
  tags: z.array(z.string()).min(1).max(5),

  // 对象
  address: z.object({
    street: z.string(),
    city: z.string(),
  }),

  // 联合类型
  phone: z.union([z.string().length(10), z.string().length(11)]),
})
```

## 表单复用组件

```tsx
// components/ui/input.tsx
import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium">{label}</label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full p-2 border rounded',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

// 使用
import Input from '@/components/ui/input'

<Input
  label="邮箱"
  {...register('email')}
  error={errors.email?.message}
  type="email"
/>
```
