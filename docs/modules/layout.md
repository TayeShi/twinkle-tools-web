# 布局组件文档

## 📋 布局系统概述

Twinkle Tools 采用模块化的布局系统，通过 Next.js 14 的 App Router 和 Layout 组件实现统一的页面结构和样式。布局系统负责定义页面的基础结构、导航、主题和全局样式。

### 核心布局组件
- **根布局** (`app/layout.tsx`) - 应用程序的基础容器
- **导航栏** - 页面顶部的导航系统
- **页脚** - 页面底部信息区域
- **容器** - 响应式内容容器

---

## 🏗 根布局组件

### 文件位置
`app/layout.tsx`

### 组件结构
```typescript
// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Twinkle Tools - 实用工具集合",
  description: "一个集成了各种实用小工具的网站，提供便捷的在线工具服务",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

### 功能特性

#### 字体系统
```typescript
// 主字体 - Geist Sans (无衬线)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",  // 字体交换策略
});

// 代码字体 - Geist Mono (等宽)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
```

#### 元数据配置
```typescript
export const metadata: Metadata = {
  // 基础信息
  title: "Twinkle Tools - 实用工具集合",
  description: "一个集成了各种实用小工具的网站，提供便捷的在线工具服务",
  
  // SEO 优化
  keywords: ["工具", "在线工具", "计算器", "格式化", "转换"],
  authors: [{ name: "Twinkle Tools Team" }],
  
  // Open Graph
  openGraph: {
    title: "Twinkle Tools - 实用工具集合",
    description: "一个集成了各种实用小工具的网站，提供便捷的在线工具服务",
    type: "website",
    locale: "zh_CN",
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Twinkle Tools - 实用工具集合",
    description: "一个集成了各种实用小工具的网站，提供便捷的在线工具服务",
  },
  
  // 视口和主题
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  
  // 图标
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  
  // 主题色
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
```

---

## 🎨 全局样式系统

### 文件位置
`app/globals.css`

### 样式结构
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS 变量定义 */
@layer base {
  :root {
    /* 主题色彩系统 */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
    
    /* 字体变量 */
    --font-geist-sans: 'Geist', system-ui, -apple-system, sans-serif;
    --font-geist-mono: 'Geist Mono', ui-monospace, SFMono-Regular, monospace;
  }

  .dark {
    /* 深色主题色彩 */
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

/* 基础样式重置 */
@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
  
  /* 滚动条样式 */
  ::-webkit-scrollbar {
    @apply w-2;
  }
  
  ::-webkit-scrollbar-track {
    @apply bg-transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    @apply bg-muted-foreground/20 rounded-full;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-muted-foreground/30;
  }
}

/* 组件样式 */
@layer components {
  /* 容器样式 */
  .container {
    @apply mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl;
  }
  
  /* 渐变背景 */
  .gradient-bg {
    @apply bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800;
  }
  
  /* 卡片阴影 */
  .card-shadow {
    @apply shadow-sm hover:shadow-md transition-shadow duration-200;
  }
  
  /* 按钮动画 */
  .btn-scale {
    @apply transform active:scale-95 transition-transform duration-100;
  }
}
```

---

## 🧩 导航组件系统

### Header 组件 (内嵌在首页)
```typescript
// 在 app/page.tsx 中的导航栏实现
<header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
  <div className="container mx-auto px-4 py-4">
    <div className="flex items-center justify-between">
      {/* 品牌标识 */}
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Twinkle Tools
        </h1>
      </div>
      
      {/* 导航菜单 */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link 
          href="#" 
          className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
        >
          首页
        </Link>
        <Link 
          href="#tools" 
          className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
        >
          工具集
        </Link>
        <Link 
          href="#about" 
          className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
        >
          关于
        </Link>
      </nav>
    </div>
  </div>
</header>
```

### 导航特性

#### 响应式设计
```css
/* 桌面端导航 */
nav {
  @apply hidden md:flex items-center space-x-6;
}

/* 移动端导航 (未来扩展) */
.mobile-nav {
  @apply md:hidden fixed inset-0 bg-background z-50;
}
```

#### 毛玻璃效果
```css
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* 半透明背景 */
.bg-white\/80 {
  background-color: rgba(255, 255, 255, 0.8);
}
```

---

## 📱 响应式容器系统

### 容器组件
```typescript
// lib/container.tsx
interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export function Container({ 
  children, 
  size = 'lg', 
  className = '' 
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}
```

### 网格系统
```typescript
// lib/grid.tsx
interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Grid({ 
  children, 
  cols = 3, 
  gap = 'md',
  className = '' 
}: GridProps) {
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
    12: 'grid-cols-12'
  };

  const gapClasses = {
    sm: 'gap-2 sm:gap-3',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8'
  };

  return (
    <div className={`grid ${colsClasses[cols]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}
```

---

## 🌙 主题系统

### 主题提供者 (未来扩展)
```typescript
// components/theme-provider.tsx
"use client"

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'twinkle-tools-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
      return
    }
    
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')
  
  return context
}
```

### 主题切换按钮
```typescript
// components/theme-toggle.tsx
"use client"

import { useTheme } from '@/components/theme-provider'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="h-9 w-9"
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">切换主题</span>
    </Button>
  )
}
```

---

## 📄 页脚组件

### Footer 组件 (内嵌在首页)
```typescript
// 在 app/page.tsx 中的页脚实现
<footer id="about" className="border-t bg-white dark:bg-slate-900 py-8 px-4">
  <div className="container mx-auto text-center">
    <p className="text-slate-600 dark:text-slate-400">
      © 2024 Twinkle Tools. 致力于提供优质的在线工具服务
    </p>
  </div>
</footer>
```

### 页脚特性扩展 (未来)
```typescript
// components/footer.tsx
export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <span className="font-semibold">Twinkle Tools</span>
            </div>
            <p className="text-sm text-muted-foreground">
              为开发者和设计师打造的实用工具集合
            </p>
          </div>
          
          {/* 工具分类 */}
          <div className="space-y-4">
            <h3 className="font-semibold">工具分类</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/math">数学工具</Link></li>
              <li><Link href="/design">设计工具</Link></li>
              <li><Link href="/development">开发工具</Link></li>
            </ul>
          </div>
          
          {/* 资源链接 */}
          <div className="space-y-4">
            <h3 className="font-semibold">资源</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/docs">文档</Link></li>
              <li><Link href="/api">API</Link></li>
              <li><Link href="/support">支持</Link></li>
            </ul>
          </div>
          
          {/* 社交链接 */}
          <div className="space-y-4">
            <h3 className="font-semibold">关注我们</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <GitHub className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Twinkle Tools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

---

## 🔧 布局配置

### Tailwind 配置优化
```javascript
// tailwind.config.ts
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // 字体系统
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      
      // 自定义动画
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

---

## 📐 布局最佳实践

### 1. 一致性原则
```typescript
// ✅ 推荐：使用统一的容器
<Container size="lg">
  <Content />
</Container>

// ✅ 推荐：使用统一的间距
<div className="space-y-6 md:space-y-8">
  {/* 内容 */}
</div>
```

### 2. 响应式优先
```typescript
// ✅ 推荐：移动端优先
<Grid cols={3} gap="md">
  {/* 内容 */}
</Grid>

// ✅ 推荐：渐进式增强
<div className="py-8 md:py-12 lg:py-16">
  {/* 内容 */}
</div>
```

### 3. 语义化标签
```typescript
// ✅ 推荐：使用语义化 HTML
<header> {/* 页头 */}</header>
<main>  {/* 主内容 */}</main>
<footer> {/* 页脚 */}</footer>
<nav>   {/* 导航 */}</nav>
<section> {/* 区块 */}</section>
```

### 4. 可访问性
```typescript
// ✅ 推荐：添加语义化属性
<header role="banner">
  <nav aria-label="主导航">
    <ul>
      <li><a href="#" aria-current="page">首页</a></li>
    </ul>
  </nav>
</header>

<main role="main" aria-label="主要内容">
  {/* 内容 */}
</main>
```

---

## 🔄 布局性能优化

### 1. CSS 优化
```css
/* 使用 CSS 变量减少重复 */
:root {
  --container-padding: 1rem;
  --section-spacing: 4rem;
}

/* 避免过度嵌套 */
.content-section {
  @apply py-16 px-4;
}

/* 使用 will-change 优化动画 */
.card-hover {
  will-change: transform, box-shadow;
}
```

### 2. 组件懒加载
```typescript
// 动态导入重型组件
const HeavyChart = dynamic(() => import('@/components/chart'), {
  loading: () => <div>加载中...</div>,
  ssr: false,
})
```

### 3. 图片优化
```typescript
// 使用 Next.js Image 组件
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Hero section"
  width={1200}
  height={600}
  priority
  className="object-cover"
/>
```

通过这套完整的布局系统，Twinkle Tools 能够提供一致、美观、高性能的用户界面，为后续的功能开发奠定了坚实的基础。