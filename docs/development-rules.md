# 开发规则

## 1. 依赖管理

### 1.1 包管理器

项目使用Bun作为包管理器和运行时，请确保使用Bun进行依赖管理：

```bash
# 安装依赖
bun install

# 安装新依赖
bun add react react-dom

# 安装开发依赖
bun add -d typescript @types/react

# 卸载依赖
bun remove react-dom
```

### 1.2 依赖锁文件

项目使用`bun.lock`文件锁定依赖版本，确保在不同环境下安装的依赖版本一致。请不要手动修改`bun.lock`文件，而是通过Bun命令自动更新。

### 1.3 依赖版本管理

- 生产依赖：使用固定版本号，确保生产环境的稳定性
- 开发依赖：可以使用较新的版本，便于开发体验

## 2. 分支管理策略

### 2.1 分支类型

| 分支类型 | 命名规则 | 用途 |
|----------|----------|------|
| 主分支 | main | 稳定的生产代码 |
| 开发分支 | develop | 集成新功能的开发分支 |
| 功能分支 | feature/feature-name | 新功能开发 |
| Bug修复分支 | bugfix/bug-description | bug修复 |
| 紧急修复分支 | hotfix/hotfix-description | 紧急生产修复 |
| 文档分支 | docs/doc-title | 文档更新 |

### 2.2 分支流程

1. 从`main`分支创建`develop`分支
2. 从`develop`分支创建功能分支或Bug修复分支
3. 功能开发或Bug修复完成后，提交Pull Request到`develop`分支
4. 代码审查通过后，合并到`develop`分支
5. 定期从`develop`分支创建Release分支，进行测试和发布准备
6. 发布准备完成后，提交Pull Request到`main`分支
7. 代码审查通过后，合并到`main`分支，并打标签
8. 从`main`分支创建Hotfix分支，进行紧急修复
9. 紧急修复完成后，提交Pull Request到`main`和`develop`分支

### 2.3 Pull Request规则

- 每个Pull Request应对应一个功能或Bug修复
- Pull Request标题应清晰描述修改内容
- Pull Request描述应包含修改的目的、范围和测试结果
- 所有测试必须通过才能合并
- 必须经过至少一次代码审查才能合并
- 合并前必须解决所有冲突

## 3. 代码质量

### 3.1 ESLint规则

项目使用ESLint进行代码质量检查，请确保代码符合ESLint规则：

```bash
# 运行ESLint检查
bun lint

# 自动修复ESLint错误
bun lint --fix
```

### 3.2 TypeScript类型检查

项目使用TypeScript进行类型检查，请确保所有代码都有正确的类型定义：

```bash
# 运行TypeScript检查
bun tsc --noEmit
```

### 3.3 代码格式化

项目使用Prettier进行代码格式化，请确保代码符合Prettier规则：

```bash
# 运行Prettier格式化
bun prettier --write .
```

### 3.4 代码审查

所有代码修改必须经过代码审查才能合并到主分支：

- 代码审查应关注代码质量、可读性、可维护性和性能
- 代码审查应检查是否符合项目的编码规范
- 代码审查应检查是否有安全漏洞
- 代码审查应检查是否有测试用例

## 4. 测试策略

### 4.1 测试类型

| 测试类型 | 框架 | 文件位置 | 命令 |
|----------|------|----------|------|
| 单元测试 | Vitest | `*.test.ts` | `bun test` |
| 组件测试 | Vitest + React Testing Library | `*.test.tsx` | `bun test` |
| 端到端测试 | Playwright | `e2e/` | `bun e2e` |

### 4.2 测试覆盖率

- 关键功能的测试覆盖率应达到100%
- 核心组件的测试覆盖率应达到80%以上
- 整体测试覆盖率应达到70%以上

### 4.3 测试开发流程

1. 编写测试用例
2. 运行测试，确保测试失败
3. 编写代码，实现功能
4. 运行测试，确保测试通过
5. 优化代码，确保代码质量
6. 再次运行测试，确保测试通过

### 4.4 测试命名规范

测试文件应与被测试文件同名，并添加`.test`后缀：

- 组件测试：`Button.test.tsx`
- 工具函数测试：`formatters.test.ts`
- 页面测试：`home.test.tsx`

## 5. 组件开发流程

### 5.1 组件分类

- **Server Components**：用于静态内容和SEO敏感页面
- **Client Components**：用于交互性强的页面和组件

### 5.2 组件开发步骤

1. 确定组件类型（Server Component或Client Component）
2. 创建组件目录和文件
3. 编写组件代码，包括类型定义、Props接口等
4. 编写组件测试
5. 编写Storybook故事
6. 运行测试，确保测试通过
7. 运行Storybook，查看组件效果
8. 提交代码，进行代码审查

### 5.3 组件命名规范

- 组件名称应使用PascalCase
- 组件目录名称应与组件名称一致
- 组件文件名称应与组件名称一致

### 5.4 组件Props规范

- Props接口应使用`Props`后缀命名（如`ButtonProps`）
- Props应包含完整的类型定义
- 可选Props应使用`?`标记
- Props应提供合理的默认值

### 5.5 组件样式规范

- 使用Tailwind CSS进行样式开发
- 组件样式应封装在组件内部
- 避免使用全局样式
- 支持主题切换
- 支持响应式设计

## 6. 状态管理

### 6.1 状态管理库

项目使用Zustand进行状态管理，用于管理客户端状态：

```bash
# 安装Zustand
bun add zustand
```

### 6.2 状态管理原则

- 尽量使用React的内置状态管理（useState, useContext）
- 对于复杂状态，使用Zustand进行管理
- 状态应按照功能模块进行划分
- 状态应具有清晰的类型定义

### 6.3 Zustand Store示例

```typescript
import { create } from 'zustand';

interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  setUser: (user: UserState['user']) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
```

## 7. API开发

### 7.1 API封装

所有API请求应封装在`lib/api/`目录下，便于统一管理和维护：

```typescript
// lib/api/client.ts

import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // 添加认证token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

// lib/api/endpoints.ts

import apiClient from './client';

export const getUser = async (id: string) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (user: { name: string; email: string }) => {
  const response = await apiClient.post('/users', user);
  return response.data;
};
```

### 7.2 API调用规范

- 所有API调用应使用封装的API客户端
- API调用应处理错误情况
- API调用应使用async/await语法
- API调用应在Client Components中进行

## 8. 错误处理

### 8.1 全局错误处理

项目使用Next.js的`error.tsx`文件进行全局错误处理：

```typescript
'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold text-red-600">发生错误</h2>
      <p className="mt-4 text-gray-600">{error.message}</p>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={() => reset()}
      >
        重试
      </button>
    </div>
  );
}
```

### 8.2 局部错误处理

在组件中应使用try/catch语法处理局部错误：

```typescript
'use client';

import { useState } from 'react';

export default function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // ...
}
```

## 9. 性能优化

### 9.1 代码分割

使用Next.js的自动代码分割功能，将代码分割为多个小的JavaScript文件，减少初始加载时间：

```typescript
// 使用动态导入进行代码分割
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
```

### 9.2 图片优化

使用Next.js的`Image`组件进行图片优化：

```typescript
import Image from 'next/image';

export default function ProductImage() {
  return (
    <Image
      src="/product.jpg"
      alt="Product Image"
      width={500}
      height={500}
      priority
    />
  );
}
```

### 9.3 缓存策略

使用Next.js的缓存策略优化数据获取：

```typescript
// 使用fetch的缓存选项
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'force-cache', // 缓存数据
    next: {
      revalidate: 60, // 60秒后重新验证
    },
  });
  const data = await res.json();

  return {
    props: { data },
  };
}
```

### 9.4 避免不必要的渲染

使用React的`memo`、`useMemo`和`useCallback`优化组件渲染：

```typescript
'use client';

import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(({ data, onUpdate }) => {
  // 昂贵的计算
  const processedData = useMemo(() => {
    return data.map(item => item * 2);
  }, [data]);

  const handleUpdate = useCallback(() => {
    onUpdate(processedData);
  }, [onUpdate, processedData]);

  return (
    <div>
      {processedData.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
});
```

## 10. 后续步骤

- [UI规则](ui-rules.md)：了解项目的UI设计规范和组件库使用指南
- [组件库指南](component-library.md)：了解组件库的详细使用说明
- [测试指南](testing-guide.md)：了解项目的测试策略和方法
