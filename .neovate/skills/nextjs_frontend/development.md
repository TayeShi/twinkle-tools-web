# 开发命令

## 核心命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 类型检查
npm run type-check

# Lint
npm run lint

# 格式化代码
npm run format
```

## package.json 脚本

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,css,md}\""
  }
}
```

## TypeScript 配置

```json
// tsconfig.json
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
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## ESLint 配置

```js
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "prefer-const": "error",
    "no-unused-vars": "warn",
    "@typescript-eslint/no-unused-vars": "warn"
  }
}
```

## Prettier 配置

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

## 环境变量

```env
# .env.local (本地开发)
NEXT_PUBLIC_API_URL=http://localhost:8080
DATABASE_URL=postgresql://...

# .env.production (生产环境)
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...

# .env.test (测试)
NEXT_PUBLIC_API_URL=http://localhost:8081
```

## Gitignore

```gitignore
# dependencies
node_modules
.pnp
.pnp.js

# testing
coverage

# next.js
.next/
out/
build
dist

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env.production

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

## 创建新页面

```bash
# 创建页面
mkdir -p app/new-page
touch app/new-page/page.tsx

# 创建 API 路由
mkdir -p app/api/endpoint
touch app/api/endpoint/route.ts
```

## 安装常用依赖

```bash
# UI 组件
npm install lucide-react clsx tailwind-merge

# 表单
npm install react-hook-form zod @hookform/resolvers

# 状态管理
npm install zustand

# 数据获取
npm install swr

# 日期处理
npm install date-fns

# 通知
npm install sonner

# 对话框
npm install @radix-ui/react-dialog

# 下拉菜单
npm install @radix-ui/react-dropdown-menu

# Tooltip
npm install @radix-ui/react-tooltip
```

## 调试技巧

```tsx
'use client'

// 使用 React DevTools
// 使用 console.log
console.log('Debug:', { data })

// 使用 debugger
debugger

// 条件渲染调试
{process.env.NODE_ENV === 'development' && (
  <div>Debug info: {JSON.stringify(data)}</div>
)}
```

## 测试

```bash
# 安装测试依赖
npm install -D jest @testing-library/react @testing-library/jest-dom

# 运行测试
npm test

# 测试覆盖率
npm test -- --coverage
```

## 部署

```bash
# Vercel（推荐）
npm install -g vercel
vercel
vercel --prod

# Docker
docker build -t nextjs-app .
docker run -p 3000:3000 nextjs-app

# 传统服务器
npm run build
npm start
```
