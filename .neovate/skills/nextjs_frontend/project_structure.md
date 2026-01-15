# Next.js 项目结构

## 推荐目录结构

```
app/                         # App Router 页面
├── (auth)/                  # 认证路由组
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── (dashboard)/             # 仪表板路由组
│   ├── layout.tsx           # 仪表板布局
│   ├── page.tsx             # 首页
│   └── articles/
│       ├── page.tsx         # 列表页
│       └── [id]/
│           └── page.tsx     # 详情页
├── api/                     # API 路由
│   └── auth/
│       └── route.ts
├── layout.tsx               # 根布局
├── page.tsx                 # 首页
├── globals.css              # 全局样式
└── loading.tsx              # 加载状态

components/                  # 组件目录
├── ui/                      # 基础 UI 组件
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── ...
├── forms/                   # 表单组件
│   ├── login-form.tsx
│   └── article-form.tsx
├── layout/                  # 布局组件
│   ├── header.tsx
│   ├── sidebar.tsx
│   └── footer.tsx
└── features/                # 功能组件
    ├── article-list.tsx
    └── user-profile.tsx

lib/                         # 工具函数
├── api.ts                   # API 客户端
├── auth.ts                  # 认证工具
├── utils.ts                 # 通用工具
└── validators.ts            # 验证函数

hooks/                       # 自定义 Hooks
├── useAuth.ts
├── useDebounce.ts
└── usePagination.ts

store/                       # 状态管理
├── index.ts                 # Store 入口
├── auth-store.ts            # 认证状态
└── article-store.ts         # 业务状态

types/                       # 类型定义
├── api.ts                   # API 类型
├── models.ts                # 数据模型
└── index.ts

styles/                      # 样式文件（非 Tailwind）
└── custom.css

public/                      # 静态资源
├── images/
└── favicon.ico

middleware.ts                # 中间件
next.config.mjs              # Next.js 配置
tailwind.config.ts           # Tailwind 配置
tsconfig.json                # TypeScript 配置
package.json
```

## 路由组

路由组（括号）用于组织文件而不影响 URL 路径：
- `(auth)` - 认证相关页面，无共享布局
- `(dashboard)` - 需要认证的页面，共享布局

## 特殊文件

| 文件 | 说明 |
|------|------|
| layout.tsx | 该路径下的布局组件 |
| page.tsx | 页面组件 |
| loading.tsx | 加载状态 |
| error.tsx | 错误边界 |
| not-found.tsx | 404 页面 |
| route.ts | API 路由 |
