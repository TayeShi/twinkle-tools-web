# 快速开始

## 1. 环境准备

### 1.1 安装Bun

Chestnut项目使用Bun作为包管理器和运行时。请确保已安装Bun：

```bash
# 使用curl安装Bun
curl -fsSL https://bun.sh/install | bash

# 验证安装
bun --version
```

### 1.2 安装依赖

在项目根目录下执行以下命令安装依赖：

```bash
bun install
```

## 2. 开发流程

### 2.1 启动开发服务器

```bash
bun dev
```

开发服务器将在 `http://localhost:3000` 启动。

### 2.2 构建生产版本

```bash
bun build
```

构建产物将生成在 `.next` 目录中。

### 2.3 启动生产服务器

```bash
bun start
```

生产服务器将在 `http://localhost:3000` 启动。

### 2.4 运行代码质量检查

```bash
bun lint
```

### 2.5 运行测试

```bash
bun test
```

### 2.6 启动Storybook

```bash
bun storybook
```

Storybook将在 `http://localhost:6006` 启动。

## 3. 项目配置

### 3.1 环境变量

项目使用 `.env` 文件管理环境变量。请在项目根目录下创建 `.env` 文件，并根据需要配置以下环境变量：

```bash
# 基础配置
NEXT_PUBLIC_APP_NAME=Chestnut
NEXT_PUBLIC_APP_VERSION=1.0.0

# API配置
NEXT_PUBLIC_API_URL=https://api.example.com

# 其他配置
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### 3.2 构建配置

项目使用Next.js的默认构建配置，可在 `next.config.ts` 文件中进行自定义配置：

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 自定义配置
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
```

## 4. 目录结构

项目采用清晰的目录结构，便于开发和维护：

```
chestnut/
├── app/                  # Next.js App Router目录
│   ├── layout.tsx        # 根布局
│   ├── (ssr)/            # SSR路由组
│   │   ├── layout.tsx    # SSR布局
│   │   └── page.tsx      # SSR首页
│   └── (csr)/            # CSR路由组
│       └── game/         # 游戏相关页面
├── components/           # UI组件
├── lib/                  # 第三方库封装
├── utils/                # 工具函数
├── store/                # 状态管理
├── styles/               # 样式文件
├── stories/              # Storybook组件故事
├── docs/                 # 项目文档
└── public/               # 静态资源
```

## 5. 路由架构

项目支持混合渲染，包括SSR和CSR：

- **SSR路由**：位于`app/(ssr)/`目录，用于SEO敏感页面
- **CSR路由**：位于`app/(csr)/`目录，用于交互性强的页面

## 6. 组件开发

### 6.1 创建组件

组件应创建在 `components/` 目录下，建议按照功能模块进行组织：

```bash
# 创建组件目录
mkdir -p components/Button

# 创建组件文件
cat > components/Button/Button.tsx << EOF
'use client';

import * as React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-medium transition-colors
        ${variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
        ${variant === 'secondary' ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : ''}
        ${variant === 'danger' ? 'bg-red-600 text-white hover:bg-red-700' : ''}
        ${size === 'sm' ? 'text-sm px-3 py-1' : ''}
        ${size === 'lg' ? 'text-lg px-6 py-3' : ''}
      `}
    >
      {children}
    </button>
  );
};
EOF
```

### 6.2 创建Storybook故事

为组件创建Storybook故事，位于 `stories/` 目录下：

```bash
# 创建Storybook故事文件
cat > stories/Button.stories.tsx << EOF
import { Button } from '../components/Button/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'danger'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
  },
};

export const Default = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'md',
  },
};

export const Danger = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
    size: 'md',
  },
};
EOF
```

## 7. 测试开发

### 7.1 创建单元测试

为组件创建单元测试，位于组件目录下：

```bash
# 创建单元测试文件
cat > components/Button/Button.test.tsx << EOF
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Test Button</Button>);
    fireEvent.click(screen.getByText('Test Button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render with correct variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByText('Secondary Button');
    expect(button).toHaveClass('bg-gray-200');
  });
});
EOF
```

## 8. 部署流程

### 8.1 本地预览

在部署前，建议先在本地预览生产构建：

```bash
bun build
bun start
```

### 8.2 部署到Vercel

1. 登录Vercel账号
2. 点击"New Project"
3. 选择项目仓库
4. 配置环境变量
5. 点击"Deploy"

### 8.3 部署到Netlify

1. 登录Netlify账号
2. 点击"New site from Git"
3. 选择项目仓库
4. 配置构建命令和输出目录
   - Build command: `bun build`
   - Publish directory: `.next`
5. 配置环境变量
6. 点击"Deploy site"

## 9. 常见问题

### 9.1 依赖安装失败

如果依赖安装失败，请尝试：

```bash
# 清理缓存
rm -rf node_modules bun.lock

# 重新安装依赖
bun install
```

### 9.2 开发服务器启动失败

如果开发服务器启动失败，请检查：

- 端口是否被占用
- 环境变量是否配置正确
- 依赖是否安装完整

### 9.3 构建失败

如果构建失败，请检查：

- TypeScript类型是否正确
- 代码是否符合ESLint规则
- 依赖是否兼容

## 10. 后续步骤

- [项目结构](project-structure.md)：了解项目的目录结构和文件组织
- [开发规则](development-rules.md)：了解项目的开发流程和规范
- [UI规则](ui-rules.md)：了解项目的UI设计规范和组件库使用指南
- [组件库指南](component-library.md)：了解组件库的详细使用说明
