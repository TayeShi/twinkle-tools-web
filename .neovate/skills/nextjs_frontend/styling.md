# 样式管理

## Tailwind CSS 基础

```tsx
// 常用类
<div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
  <h1 className="text-2xl font-bold text-gray-900">标题</h1>
  <p className="text-gray-600">描述文本</p>
</div>

// Flex 布局
<div className="flex items-center justify-between gap-4">
  <div>左边</div>
  <div>右边</div>
</div>

// Grid 布局
<div className="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

// 响应式
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 列（移动端），2 列（平板），3 列（桌面） */}
</div>
```

## 条件样式

```tsx
import { cn } from '@/lib/utils'

export default function Button({
  variant = 'primary',
  disabled,
  ...props
}) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded font-medium transition-colors',
        {
          'bg-blue-500 text-white hover:bg-blue-600':
            variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300':
            variant === 'secondary',
          'bg-green-500 text-white hover:bg-green-600':
            variant === 'success',
          'bg-red-500 text-white hover:bg-red-600':
            variant === 'danger',
        },
        'disabled:opacity-50 disabled:cursor-not-allowed'
      )}
      disabled={disabled}
      {...props}
    />
  )
}
```

## CSS Modules

```css
/* components/card.module.css */
.card {
  @apply bg-white rounded-lg shadow p-6;
}

.card:hover {
  @apply shadow-md transition-shadow;
}

.title {
  @apply text-xl font-bold text-gray-900 mb-2;
}
```

```tsx
import styles from './card.module.css'

export default function Card({ title, children }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  )
}
```

## 全局样式

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}

@layer components {
  .btn {
    @apply px-4 py-2 rounded font-medium transition-colors;
  }

  .btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }
}
```

## 动画

```tsx
'use client'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
    </div>
  )
}

// 淡入动画
export default function FadeIn({ children }) {
  return (
    <div className="animate-in fade-in duration-500">
      {children}
    </div>
  )
}

// 悬停效果
<div className="group">
  <div className="group-hover:scale-105 transition-transform">
    悬停放大
  </div>
</div>
```

## Dark Mode

```tsx
'use client'

import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
```

```tsx
// 在组件中使用暗色模式类名
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 className="text-xl dark:text-2xl">标题</h1>
</div>
```

## CSS 变量

```css
/* app/globals.css */
@layer base {
  :root {
    --primary: 210 100% 50%;
    --primary-foreground: 210 100% 98%;
    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;
  }

  .dark {
    --primary: 210 100% 50%;
    --primary-foreground: 210 100% 98%;
    --muted: 210 40% 16%;
    --muted-foreground: 215 16% 85%;
  }
}

@layer utilities {
  .bg-primary {
    @apply bg-primary;
  }

  .text-primary-foreground {
    @apply text-primary-foreground;
  }
}
```

```tsx
export default function Button() {
  return (
    <button className="bg-primary text-primary-foreground">
      点击
    </button>
  )
}
```

## 图标

```tsx
import { Heart, Search, User } from 'lucide-react'

export default function Icons() {
  return (
    <div className="flex gap-4">
      <Heart className="w-6 h-6 text-red-500" />
      <Search className="w-6 h-6 text-gray-500" />
      <User className="w-6 h-6 text-blue-500" />
    </div>
  )
}
```

## 响应式断点

```tsx
export default function ResponsiveLayout() {
  return (
    <div>
      {/* 移动端 */}
      <div className="block md:hidden">
        <MobileNav />
      </div>

      {/* 平板和桌面 */}
      <div className="hidden md:block">
        <DesktopNav />
      </div>

      {/* 仅桌面 */}
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>
    </div>
  )
}
```

## 第三方 UI 库

### shadcn/ui

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
```

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>卡片标题</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="输入内容" />
        <Button>提交</Button>
      </CardContent>
    </Card>
  )
}
```

### Headless UI

```tsx
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

export default function Modal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogPanel>
        <DialogTitle>标题</DialogTitle>
        <p>内容</p>
        <button onClick={onClose}>关闭</button>
      </DialogPanel>
    </Dialog>
  )
}
```
