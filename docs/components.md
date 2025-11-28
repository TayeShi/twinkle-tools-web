# 组件库使用指南

## 📚 shadcn/ui 组件库

shadcn/ui 是一个基于 Radix UI 和 Tailwind CSS 构建的现代化组件库。它不是传统的 npm 包，而是一个可以复制到项目中的组件集合，提供完全的自定义能力。

### 🎯 核心特性
- 🎨 **完全可定制** - 组件代码在您的项目中，可以随意修改
- ♿ **无障碍优先** - 基于 Radix UI，遵循 WAI-ARIA 规范
- 📱 **响应式设计** - 内置响应式支持
- 🌙 **主题系统** - 支持浅色/深色主题
- 🚀 **TypeScript 原生** - 完整的类型支持
- 📦 **按需使用** - 只添加您需要的组件

## 🛠 已安装组件

### Button (按钮)
**位置**: `@/components/ui/button`  
**用途**: 用户交互的主要入口

#### 变体 (variants)
```typescript
// 基础变体
<Button>默认按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="outline">边框按钮</Button>
<Button variant="ghost">幽灵按钮</Button>
<Button variant="destructive">危险按钮</Button>
<Button variant="link">链接按钮</Button>

// 尺寸变体
<Button size="sm">小按钮</Button>
<Button size="default">默认大小</Button>
<Button size="lg">大按钮</Button>
<Button size="icon">图标按钮</Button>

// 状态
<Button disabled>禁用按钮</Button>
<Button loading>加载中</Button>
```

#### 高级用法
```typescript
// 作为子组件
<Button asChild>
  <Link href="/tools">访问工具</Link>
</Button>

// 自定义样式
<Button className="bg-gradient-to-r from-blue-500 to-purple-600">
  渐变按钮
</Button>

// 带图标
<Button>
  <Calculator className="mr-2 h-4 w-4" />
  计算器
</Button>
```

### Card (卡片)
**位置**: `@/components/ui/card`  
**用途**: 内容容器和信息展示

#### 组件结构
```typescript
<Card>
  <CardHeader>
    <CardTitle>卡片标题</CardTitle>
    <CardDescription>卡片描述</CardDescription>
  </CardHeader>
  <CardContent>
    {/* 主要内容 */}
  </CardContent>
  <CardFooter>
    {/* 底部操作区 */}
  </CardFooter>
</Card>
```

#### 使用示例
```typescript
// 工具卡片
<Card className="group hover:shadow-lg transition-all duration-300">
  <CardHeader className="pb-3">
    <CardTitle className="text-lg">工具名称</CardTitle>
  </CardHeader>
  <CardContent>
    <CardDescription>工具描述信息</CardDescription>
  </CardContent>
</Card>

// 信息卡片
<Card className="bg-gradient-to-br from-blue-50 to-purple-50">
  <CardContent className="pt-6">
    <div className="flex items-center space-x-4">
      <div className="p-2 bg-blue-100 rounded-lg">
        <Calculator className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <h3 className="font-semibold">计算器</h3>
        <p className="text-sm text-muted-foreground">在线计算工具</p>
      </div>
    </div>
  </CardContent>
</Card>
```

### Badge (徽章)
**位置**: `@/components/ui/badge`  
**用途**: 状态标识和分类标签

#### 变体使用
```typescript
// 基础徽章
<Badge>默认</Badge>
<Badge variant="secondary">次要</Badge>
<Badge variant="destructive">危险</Badge>
<Badge variant="outline">边框</Badge>

// 自定义样式
<Badge className="bg-blue-500 hover:bg-blue-600">分类标签</Badge>

// 不同尺寸
<Badge className="text-xs">小徽章</Badge>
<Badge className="text-sm">标准徽章</Badge>
<Badge className="text-base">大徽章</Badge>
```

#### 实际应用
```typescript
// 工具分类
<Badge variant="secondary">数学工具</Badge>
<Badge variant="secondary">设计工具</Badge>
<Badge variant="secondary">开发工具</Badge>

// 状态标识
<Badge className="bg-green-500">可用</Badge>
<Badge className="bg-yellow-500">维护中</Badge>
<Badge className="bg-red-500">不可用</Badge>
```

### NavigationMenu (导航菜单)
**位置**: `@/components/ui/navigation-menu`  
**用途**: 复杂的导航交互

#### 基础结构
```typescript
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>触发器</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* 下拉内容 */}
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

#### 简化导航
```typescript
// 本项目中的简化使用
<nav className="hidden md:flex items-center space-x-6">
  <Link href="#" className="text-sm font-medium hover:text-primary">首页</Link>
  <Link href="#tools" className="text-sm font-medium hover:text-primary">工具集</Link>
  <Link href="#about" className="text-sm font-medium hover:text-primary">关于</Link>
</nav>
```

## 🎨 样式定制

### Tailwind CSS 配置
```javascript
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### CSS 变量
```css
/* globals.css */
@layer base {
  :root {
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
  }

  .dark {
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
```

## 🚀 添加新组件

### 使用 CLI 添加
```bash
# 添加基础组件
npx shadcn@latest add [component-name]

# 示例
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add tabs
```

### 手动创建组件
1. 在 `components/ui/` 目录下创建组件文件
2. 遵循现有的组件结构和命名规范
3. 使用 `cn` 工具函数合并类名
4. 添加 TypeScript 类型定义

#### 组件模板
```typescript
// components/ui/my-component.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  // 自定义属性
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("base-classes", className)}
      {...props}
    />
  )
)
MyComponent.displayName = "MyComponent"

export { MyComponent }
```

## 🎯 组件使用最佳实践

### 1. 组合模式
```typescript
// ✅ 推荐：组合使用现有组件
<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
    <CardDescription>描述</CardDescription>
  </CardHeader>
  <CardContent>
    <Button>操作</Button>
  </CardContent>
</Card>

// ❌ 避免：重复造轮子
<div className="border rounded-lg p-4">
  <h3>标题</h3>
  <p>描述</p>
  <button className="...">操作</button>
</div>
```

### 2. 类名合并
```typescript
// ✅ 推荐：使用 cn 函数
import { cn } from "@/lib/utils"

<div className={cn(
  "base-styles",
  isActive && "active-styles",
  className
)} />

// ❌ 避免：手动拼接类名
<div className={`base-styles ${isActive ? 'active-styles' : ''} ${className}`} />
```

### 3. 响应式设计
```typescript
// ✅ 推荐：响应式类名
<Card className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" />

// ✅ 推荐：响应式组件属性
<Button size={{ default: "sm", md: "default", lg: "lg" }}>
```

### 4. 主题支持
```typescript
// ✅ 推荐：使用主题变量
<div className="bg-background text-foreground border-border" />

// ❌ 避免：硬编码颜色
<div className="bg-white text-black border-gray-200" />
```

## 🔧 工具函数

### cn 函数
```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 使用示例
```typescript
import { cn } from "@/lib/utils"

// 合并类名，处理冲突
cn("px-4 py-2", "px-6") // 结果: "px-6 py-2"

// 条件类名
cn("base-class", isActive && "active-class")

// 动态类名
cn("flex", { "items-center": centerItems })
```

## 🎭 图标系统

### Lucide React 使用
```typescript
import { Calculator, Palette, FileText, Settings } from "lucide-react"

// 基础使用
<Calculator className="h-5 w-5" />

// 自定义颜色和大小
<Palette className="h-8 w-8 text-purple-500" />

// 按钮图标
<Button>
  <FileText className="mr-2 h-4 w-4" />
  文档
</Button>

// 状态图标
<Settings className="h-6 w-6 animate-spin" />
```

### 图标主题色
```typescript
// 根据工具类型设置颜色
const iconColors = {
  math: "text-blue-500",
  design: "text-purple-500",
  dev: "text-green-500",
  security: "text-red-500"
}

<Calculator className={`h-5 w-5 ${iconColors.math}`} />
```

## 📱 移动端适配

### 响应式断点
```css
/* Tailwind 默认断点 */
sm: 640px   /* 小屏幕 */
md: 768px   /* 中等屏幕 */
lg: 1024px  /* 大屏幕 */
xl: 1280px  /* 超大屏幕 */
2xl: 1536px /* 超超大屏幕 */
```

### 移动端优先
```typescript
// ✅ 推荐：移动端优先
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 内容 */}
</div>

// ❌ 避免：桌面端优先
<div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-1">
  {/* 内容 */}
</div>
```

## 🔄 组件状态管理

### 受控组件
```typescript
// 表单输入
const [value, setValue] = useState("")

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="输入内容"
/>
```

### 非受控组件
```typescript
// 使用 ref
const inputRef = useRef<HTMLInputElement>(null)

<Input
  ref={inputRef}
  defaultValue="默认值"
  placeholder="输入内容"
/>
```

## 🧪 组件测试

### 单元测试示例
```typescript
// __tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })
})
```

通过遵循这些指南，您可以充分利用 shadcn/ui 组件库的强大功能，创建美观、可访问且高度可定制的用户界面。