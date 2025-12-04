# 项目结构

## 1. 目录结构概览

Chestnut项目采用清晰的目录结构，便于开发和维护。以下是项目的核心目录结构：

```
chestnut/
├── app/                  # Next.js App Router目录
├── components/           # UI组件
├── lib/                  # 第三方库封装
├── utils/                # 工具函数
├── store/                # 状态管理
├── styles/               # 样式文件
├── stories/              # Storybook组件故事
├── docs/                 # 项目文档
├── public/               # 静态资源
├── types/                # TypeScript类型定义
├── e2e/                  # 端到端测试
├── .next/                # 构建产物（自动生成）
├── node_modules/         # 依赖包（自动生成）
├── .git/                 # Git仓库（自动生成）
├── package.json          # 项目配置
├── bun.lock              # Bun依赖锁文件
├── next.config.ts        # Next.js配置
├── tsconfig.json         # TypeScript配置
├── eslint.config.mjs     # ESLint配置
├── tailwind.config.js    # Tailwind CSS配置
├── postcss.config.mjs    # PostCSS配置
├── .gitignore            # Git忽略文件
└── README.md             # 项目说明文档
```

## 2. 核心目录详解

### 2.1 app/ - Next.js App Router目录

App Router是Next.js 13+引入的新路由系统，用于构建React Server Components和Client Components。

```
app/
├── layout.tsx            # 根布局组件
├── page.tsx              # 根页面
├── not-found.tsx         # 404页面
├── error.tsx             # 错误页面
├── loading.tsx           # 加载状态组件
├── (ssr)/                # SSR路由组
│   ├── layout.tsx        # SSR布局
│   └── page.tsx          # SSR首页
└── (csr)/                # CSR路由组
    ├── layout.tsx        # CSR布局
    └── game/             # 游戏相关页面
        └── page.tsx      # 游戏页面
```

**说明**：
- `layout.tsx`：定义页面布局，包括导航栏、页脚等
- `page.tsx`：定义页面内容
- `(ssr)/`：用于SEO敏感页面，采用服务器端渲染
- `(csr)/`：用于交互性强的页面，采用客户端渲染

### 2.2 components/ - UI组件

存放项目的UI组件，按照功能模块进行组织。

```
components/
├── Button/               # 按钮组件
│   ├── Button.tsx        # 组件实现
│   ├── Button.test.tsx   # 组件测试
│   └── index.ts          # 组件导出
├── Card/                 # 卡片组件
├── Input/                # 输入框组件
├── Modal/                # 模态框组件
├── Navbar/               # 导航栏组件
└── Footer/               # 页脚组件
```

**说明**：
- 每个组件对应一个目录，包含组件实现、测试和导出文件
- 组件命名采用PascalCase
- 组件目录命名与组件名称一致

### 2.3 lib/ - 第三方库封装

存放第三方库的封装和配置，便于统一管理和使用。

```
lib/
├── api/                  # API请求封装
│   ├── client.ts         # API客户端
│   └── endpoints.ts      # API端点定义
├── auth/                 # 认证相关
├── analytics/            #  analytics配置
└── logger/               # 日志配置
```

**说明**：
- 按照功能模块封装第三方库
- 提供统一的API接口，便于在项目中使用

### 2.4 utils/ - 工具函数

存放项目中使用的工具函数，按照功能进行分类。

```
utils/
├── formatters/           # 格式化工具
├── validators/           # 验证工具
├── helpers/              # 辅助函数
└── constants/            # 常量定义
```

**说明**：
- 工具函数应具有通用性，不依赖具体业务逻辑
- 按照功能分类存放，便于查找和使用

### 2.5 store/ - 状态管理

存放项目的状态管理相关代码，使用Zustand或其他状态管理库。

```
store/
├── user.ts               # 用户状态
├── theme.ts              # 主题状态
└── index.ts              # 状态管理导出
```

**说明**：
- 按照功能模块划分状态
- 提供统一的状态管理接口

### 2.6 styles/ - 样式文件

存放项目的全局样式和样式变量。

```
styles/
├── globals.css           # 全局样式
├── variables.css         # 样式变量
└── theme.css             # 主题样式
```

**说明**：
- 使用Tailwind CSS的`@apply`指令定义自定义样式
- 样式变量用于统一管理颜色、字体等样式属性

### 2.7 stories/ - Storybook组件故事

存放Storybook组件故事，用于组件开发和文档。

```
stories/
├── Button.stories.tsx    # 按钮组件故事
├── Card.stories.tsx      # 卡片组件故事
└── Input.stories.tsx     # 输入框组件故事
```

**说明**：
- 每个组件对应一个故事文件
- 故事文件命名采用`组件名.stories.tsx`格式
- 用于组件的开发、测试和文档

### 2.8 docs/ - 项目文档

存放项目的文档，包括介绍、快速开始、开发规则等。

```
docs/
├── introduction.md       # 项目概述
├── getting-started.md    # 快速开始
├── project-structure.md  # 项目结构
├── development-rules.md  # 开发规则
├── ui-rules.md           # UI规则
├── component-library.md  # 组件库指南
├── testing-guide.md      # 测试指南
├── deployment-guide.md   # 部署指南
└── contributing-guide.md # 贡献指南
```

**说明**：
- 文档采用Markdown格式
- 按照功能模块组织文档
- 便于项目成员查阅和学习

### 2.9 public/ - 静态资源

存放项目的静态资源，如图片、字体、图标等。

```
public/
├── images/               # 图片资源
├── fonts/                # 字体资源
├── icons/                # 图标资源
└── favicon.ico           # 网站图标
```

**说明**：
- 静态资源可以直接通过URL访问
- 按照资源类型分类存放

### 2.10 types/ - TypeScript类型定义

存放项目的TypeScript类型定义。

```
types/
├── api.ts                # API类型定义
├── user.ts               # 用户类型定义
└── common.ts             # 通用类型定义
```

**说明**：
- 类型定义应具有通用性，便于在项目中复用
- 按照功能模块分类存放

### 2.11 e2e/ - 端到端测试

存放项目的端到端测试代码，使用Playwright或Cypress。

```
e2e/
├── auth.spec.ts          # 认证相关测试
├── home.spec.ts          # 首页测试
└── game.spec.ts          # 游戏页面测试
```

**说明**：
- 端到端测试用于测试完整的用户流程
- 按照功能模块分类存放

## 3. 配置文件详解

### 3.1 package.json - 项目配置

定义项目的名称、版本、依赖和脚本。

```json
{
  "name": "chestnut",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest",
    "storybook": "storybook dev -p 6006"
  },
  "dependencies": {
    "next": "16.0.7",
    "react": "19.2.0",
    "react-dom": "19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.0.7",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### 3.2 next.config.ts - Next.js配置

配置Next.js的构建和运行选项。

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
```

### 3.3 tsconfig.json - TypeScript配置

配置TypeScript的编译选项。

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

### 3.4 eslint.config.mjs - ESLint配置

配置ESLint的代码质量规则。

```javascript
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
];
```

### 3.5 tailwind.config.js - Tailwind CSS配置

配置Tailwind CSS的主题和插件。

```javascript/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
```

## 4. 文件命名规范

### 4.1 组件文件

- 组件文件命名：`组件名.tsx`（如`Button.tsx`）
- 组件测试文件命名：`组件名.test.tsx`（如`Button.test.tsx`）
- 组件故事文件命名：`组件名.stories.tsx`（如`Button.stories.tsx`）
- 组件导出文件命名：`index.ts`（如`index.ts`）

### 4.2 页面文件

- 页面文件命名：`page.tsx`（如`page.tsx`）
- 布局文件命名：`layout.tsx`（如`layout.tsx`）
- 404页面命名：`not-found.tsx`（如`not-found.tsx`）
- 错误页面命名：`error.tsx`（如`error.tsx`）
- 加载状态文件命名：`loading.tsx`（如`loading.tsx`）

### 4.3 工具函数文件

- 工具函数文件命名：`功能名.ts`（如`formatters.ts`）
- 常量文件命名：`constants.ts`（如`constants.ts`）

### 4.4 类型定义文件

- 类型定义文件命名：`类型名.ts`（如`user.ts`）

## 5. 代码组织原则

1. **模块化设计**：将功能拆分为独立的模块，便于复用和维护
2. **单一职责原则**：每个组件或函数只负责一个功能
3. **关注点分离**：将UI、逻辑、数据分离
4. **可测试性**：编写可测试的代码，便于单元测试和集成测试
5. **可扩展性**：设计具有扩展性的代码，便于添加新功能
6. **可读性**：编写清晰、易读的代码，便于团队协作

## 6. 后续步骤

- [开发规则](development-rules.md)：了解项目的开发流程和规范
- [UI规则](ui-rules.md)：了解项目的UI设计规范和组件库使用指南
- [组件库指南](component-library.md)：了解组件库的详细使用说明
- [测试指南](testing-guide.md)：了解项目的测试策略和方法
