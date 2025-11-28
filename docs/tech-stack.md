# 技术栈详解

## 🛠 核心技术

### 前端框架
#### Next.js 14
- **版本**: 16.0.5
- **特性**: 
  - App Router (新路由系统)
  - Server Components (服务端组件)
  - Turbopack (快速构建工具)
  - 自动代码分割和优化
- **选择原因**: 
  - 优秀的性能和 SEO
  - 强大的开发体验
  - 活跃的社区支持

#### React 19
- **版本**: 19.2.0
- **特性**: 
  - 并发特性
  - Suspense 支持
  - Server Components
- **角色**: UI 框架核心

### 开发语言
#### TypeScript
- **版本**: 5.x
- **配置**: 严格模式 + 路径别名
- **优势**: 
  - 类型安全
  - 更好的 IDE 支持
  - 减少运行时错误

### 样式方案
#### Tailwind CSS 4.0
- **版本**: ^4
- **特性**: 
  - 原子化 CSS
  - 响应式设计
  - 暗色模式支持
- **配置**: 
  ```javascript
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-geist-sans)'],
          mono: ['var(--font-geist-mono)'],
        },
      },
    },
    plugins: [],
  }
  ```

### UI 组件库
#### shadcn/ui
- **版本**: Latest
- **基础**: Radix UI + Tailwind CSS
- **特性**: 
  - 高度可定制
  - 完全无障碍
  - TypeScript 原生支持
- **已安装组件**:
  - `button` - 按钮组件
  - `card` - 卡片组件
  - `badge` - 徽章组件
  - `navigation-menu` - 导航菜单

### 图标库
#### Lucide React
- **版本**: ^0.555.0
- **特性**: 
  - 美观的图标设计
  - Tree-shaking 支持
  - SVG 渲染
- **使用示例**:
  ```tsx
  import { Calculator, Palette, FileText } from 'lucide-react';
  ```

## 📦 依赖包详解

### 核心依赖
```json
{
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.4",    // Radix UI 基础组件
    "class-variance-authority": "^0.7.1",  // CSS 类名变体管理
    "clsx": "^2.1.1",                      // 条件类名工具
    "lucide-react": "^0.555.0",           // 图标库
    "next": "16.0.5",                      // Next.js 框架
    "react": "19.2.0",                     // React 核心库
    "react-dom": "19.2.0",                 // React DOM
    "tailwind-merge": "^3.4.0"             // Tailwind 类名合并
  }
}
```

### 开发依赖
```json
{
  "devDependencies": {
    "@tailwindcss/postcss": "^4",          // PostCSS 插件
    "@types/node": "^24.10.1",             // Node.js 类型定义
    "@types/react": "^19",                 // React 类型定义
    "@types/react-dom": "^19",             // React DOM 类型定义
    "eslint": "^9",                        // 代码检查工具
    "eslint-config-next": "16.0.5",        // Next.js ESLint 配置
    "tailwindcss": "^4",                   // Tailwind CSS 核心
    "typescript": "^5"                     // TypeScript 编译器
  }
}
```

## ⚙️ 构建工具

### Bun
- **角色**: 包管理器 + 运行时
- **优势**: 
  - 更快的安装速度
  - 原生 TypeScript 支持
  - 内置测试和打包工具
- **命令**:
  ```bash
  bun install    # 安装依赖
  bun run dev    # 开发服务器
  bun run build  # 构建项目
  bun run start  # 生产服务器
  ```

### Next.js 配置
```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 配置选项 */
  experimental: {
    // 实验性功能
  },
  images: {
    // 图片优化配置
  },
  env: {
    // 环境变量
  },
};

export default nextConfig;
```

## 🔧 开发工具配置

### TypeScript 配置
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"]
    }
  }
}
```

### ESLint 配置
```javascript
// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
```

### PostCSS 配置
```javascript
// postcss.config.mjs
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 🏗 项目架构模式

### 文件结构模式
采用 **Feature-based** (功能导向) 结构：
```
src/
├── app/              # App Router 页面
├── components/       # 可复用组件
│   ├── ui/          # 基础 UI 组件
│   └── features/    # 功能组件
├── lib/             # 工具库和配置
├── hooks/           # 自定义 Hooks
├── types/           # TypeScript 类型定义
└── public/          # 静态资源
```

### 组件设计模式
1. **原子设计**: Button, Badge 等基础组件
2. **复合组件**: Card 内嵌 Header/Content
3. **容器组件**: 页面级别的布局组件
4. **功能组件**: 具体工具的实现组件

### 状态管理
- **本地状态**: React useState/useReducer
- **全局状态**: Context API (必要时)
- **服务端状态**: Next.js Data Fetching
- **持久化**: localStorage/SessionStorage

## 🔄 数据流

### 客户端渲染流
```
用户交互 → React Event → State Update → UI Re-render
```

### 服务端渲染流
```
Request → Next.js → React Server Component → HTML → Client
```

### 混合渲染模式
- **静态部分**: 服务端渲染 (SEO 友好)
- **交互部分**: 客户端渲染 (动态功能)
- **数据部分**: ISR/SSR 按需选择

## 🚀 性能优化策略

### 代码分割
- **路由级分割**: Next.js 自动处理
- **组件级分割**: React.lazy()
- **第三方库分割**: 动态导入

### 资源优化
- **图片优化**: Next.js Image 组件
- **字体优化**: Next.js Font 优化
- **CSS 优化**: Tailwind CSS Tree-shaking

### 运行时优化
- **React 18+**: 并发渲染
- **Memoization**: React.memo/useMemo/useCallback
- **虚拟化**: 大列表虚拟滚动 (必要时)

---

## 📊 技术决策记录

### 为什么选择 Next.js?
- ✅ 强大的 SEO 支持
- ✅ 优秀的开发体验
- ✅ 丰富的生态系统
- ✅ Vercel 官方支持

### 为什么选择 shadcn/ui?
- ✅ 高度可定制性
- ✅ 基于 Radix UI 的无障碍设计
- ✅ TypeScript 原生支持
- ✅ 完整的设计系统

### 为什么使用 Bun?
- ✅ 更快的包管理
- ✅ 内置 TypeScript 支持
- ✅ 一体化工具链
- ✅ 现代化的 JavaScript 运行时