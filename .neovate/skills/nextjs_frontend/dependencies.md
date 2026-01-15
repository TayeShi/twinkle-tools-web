# 核心依赖

## package.json 推荐配置

```json
{
  "name": "nextjs-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,css,md}\""
  },
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^16.0.0",
    "prettier": "^3.0.0",
    "prettier-plugin-tailwindcss": "^0.5.0"
  }
}
```

## 基础依赖

| 依赖 | 版本 | 说明 |
|------|------|------|
| next | ^16.0.0 | Next.js 框架 |
| react | ^19.0.0 | React 库 |
| react-dom | ^19.0.0 | React DOM |

## 常用依赖

### UI 组件

```json
{
  "dependencies": {
    "lucide-react": "^0.400.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "class-variance-authority": "^0.7.0"
  }
}
```

### 表单和验证

```json
{
  "dependencies": {
    "react-hook-form": "^7.51.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.3.0"
  }
}
```

### 状态管理

```json
{
  "dependencies": {
    "zustand": "^4.5.0"
  }
}
```

### 数据获取

```json
{
  "dependencies": {
    "swr": "^2.2.0"
  }
}
```

### 样式

```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

### Radix UI（无样式组件）

```json
{
  "dependencies": {
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5"
  }
}
```

### 工具函数

```json
{
  "dependencies": {
    "date-fns": "^3.3.0",
    "nanoid": "^5.0.6"
  }
}
```

### 通知

```json
{
  "dependencies": {
    "sonner": "^1.4.3"
  }
}
```

### 动画

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0"
  }
}
```

### 暗色模式

```json
{
  "dependencies": {
    "next-themes": "^0.3.0"
  }
}
```

### 开发依赖

```json
{
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.3.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^16.0.0",
    "prettier": "^3.2.0",
    "prettier-plugin-tailwindcss": "^0.5.11",
    "@next/bundle-analyzer": "^16.0.0"
  }
}
```

### 测试

```json
{
  "devDependencies": {
    "jest": "^29.7.0",
    "@testing-library/react": "^14.2.0",
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/user-event": "^14.5.0"
  }
}
```

## 初始化新项目

```bash
# 使用 create-next-app
npx create-next-app@latest my-app --typescript --tailwind --app

# 安装常用依赖
npm install lucide-react clsx tailwind-merge zustand swr react-hook-form zod @hookform/resolvers date-fns sonner next-themes
npm install -D prettier prettier-plugin-tailwindcss @next/bundle-analyzer
```

## lib/utils.ts 工具文件

```tsx
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 格式化日期
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 相对时间
export function timeAgo(date: string | Date): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)

  const intervals = [
    { label: '年', seconds: 31536000 },
    { label: '月', seconds: 2592000 },
    { label: '周', seconds: 604800 },
    { label: '天', seconds: 86400 },
    { label: '小时', seconds: 3600 },
    { label: '分钟', seconds: 60 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds)
    if (count >= 1) {
      return `${count}${interval.label}前`
    }
  }

  return '刚刚'
}

// 截断文本
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

// 生成 slug
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
```
