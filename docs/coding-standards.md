# 开发规范文档

## 📋 代码规范概述

本文档定义了 Twinkle Tools 项目的开发规范，包括编码风格、命名约定、文件组织、Git 提交规范等。遵循这些规范有助于保持代码质量和团队协作效率。

## 🎯 编程原则

### 1. 可读性优先
代码应该易于阅读和理解，优先考虑可读性而不是代码的简洁性。

### 2. 一致性原则
在整个项目中保持一致的编码风格和命名约定。

### 3. 简洁性原则
编写简单、直接的代码，避免过度复杂的实现。

### 4. 可维护性
编写易于维护和扩展的代码，考虑未来的需求变化。

---

## 📝 TypeScript 编码规范

### 1. 类型定义

#### 接口命名
```typescript
// ✅ 推荐：使用 PascalCase，以 I 开头表示接口
interface IToolConfig {
  name: string;
  version: string;
}

interface ICalculatorState {
  display: string;
  previousValue: number | null;
}

// ✅ 推荐：使用描述性的类型名称
type ToolCategory = 'math' | 'design' | 'text' | 'time' | 'security' | 'development';
type ThemeMode = 'light' | 'dark' | 'system';
```

#### 类型别名 vs 接口
```typescript
// ✅ 推荐：使用 type 表示联合类型或复杂类型
type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
};

type EventCallback = (event: Event) => void;

// ✅ 推荐：使用 interface 表示对象结构
interface UserSettings {
  theme: ThemeMode;
  language: string;
  notifications: boolean;
}
```

#### 泛型使用
```typescript
// ✅ 推荐：使用有意义的泛型参数名
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface BaseTool<T = any> {
  id: string;
  name: string;
  config: T;
}

// ✅ 推荐：为泛型添加约束
interface ToolWithConfig<T extends Record<string, any>> {
  name: string;
  config: T;
  execute: (config: T) => void;
}
```

### 2. 函数和类

#### 函数声明
```typescript
// ✅ 推荐：使用箭头函数
const calculateResult = (a: number, b: number): number => {
  return a + b;
};

// ✅ 推荐：为函数参数提供类型
const formatText = (
  text: string, 
  options: { uppercase?: boolean; trim?: boolean } = {}
): string => {
  let result = text;
  if (options.uppercase) result = result.toUpperCase();
  if (options.trim) result = result.trim();
  return result;
};
```

#### 类定义
```typescript
// ✅ 推荐：使用 PascalCase 命名类
export class Calculator {
  private display: string = '0';
  private previousValue: number | null = null;

  // ✅ 推荐：使用 public/protected/private 修饰符
  public addNumber(num: string): void {
    // 实现
  }

  // ✅ 推荐：使用 getter/setter
  get currentDisplay(): string {
    return this.display;
  }
}
```

### 3. 错误处理

#### 自定义错误类型
```typescript
// ✅ 推荐：定义自定义错误类
export class ToolError extends Error {
  constructor(
    message: string,
    public readonly toolName: string,
    public readonly code?: string
  ) {
    super(message);
    this.name = 'ToolError';
  }
}

// ✅ 推荐：使用错误处理
const executeTool = async (toolName: string): Promise<void> => {
  try {
    // 工具执行逻辑
  } catch (error) {
    if (error instanceof ToolError) {
      console.error(`工具 ${error.toolName} 执行失败:`, error.message);
    } else {
      console.error('未知错误:', error);
    }
    throw error;
  }
};
```

---

## 🏗 React/Next.js 规范

### 1. 组件定义

#### 函数组件
```typescript
// ✅ 推荐：使用 React.FC 类型
interface CalculatorProps {
  initialMode?: 'basic' | 'scientific';
  onResult?: (result: number) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ 
  initialMode = 'basic', 
  onResult 
}) => {
  // 组件实现
};

// ✅ 推荐：使用 forwardRef
export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
CustomButton.displayName = 'CustomButton';
```

#### Hook 定义
```typescript
// ✅ 推荐：以 use 开头命名
export function useCalculator(initialMode: string = 'basic') {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    mode: initialMode,
  });

  const calculate = useCallback((operation: string) => {
    // 计算逻辑
  }, []);

  return {
    state,
    calculate,
  };
}

// ✅ 推荐：为自定义 Hook 添加返回类型
type UseThemeReturn = {
  theme: ThemeMode;
  toggleTheme: () => void;
  isDark: boolean;
};

export function useTheme(): UseThemeReturn {
  // Hook 实现
}
```

### 2. 组件结构

#### 文件结构
```typescript
// ✅ 推荐：按功能组织代码
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';

interface CalculatorToolProps {
  className?: string;
}

export function CalculatorTool({ className }: CalculatorToolProps) {
  // 1. 状态定义
  const [value, setValue] = useState<string>('0');
  
  // 2. 副作用
  useEffect(() => {
    // 初始化逻辑
  }, []);
  
  // 3. 事件处理函数
  const handleNumberClick = useCallback((num: string) => {
    setValue(prev => prev === '0' ? num : prev + num);
  }, []);
  
  // 4. 渲染
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>计算器</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 内容 */}
      </CardContent>
    </Card>
  );
}
```

### 3. 样式和类名

#### Tailwind CSS 使用
```typescript
// ✅ 推荐：使用响应式类名
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 内容 */}
</div>

// ✅ 推荐：使用条件类名
<div className={cn(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class',
  className
)}>

// ✅ 推荐：使用语义化类名
<button className="btn btn-primary btn-lg">
  提交
</button>
```

---

## 📁 文件和目录规范

### 1. 命名约定

#### 文件命名
```
// ✅ 推荐：PascalCase for components
Calculator.tsx
ColorPicker.tsx
PasswordGenerator.tsx

// ✅ 推荐：camelCase for utilities
dateUtils.ts
colorHelpers.ts
stringFormatter.ts

// ✅ 推荐：kebab-case for directories
components/
tools/
hooks/
utils/

// ✅ 推荐：index.ts for barrels
components/ui/index.ts
hooks/index.ts
utils/index.ts
```

#### 目录结构
```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # 路由组
│   ├── api/               # API 路由
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # 组件
│   ├── ui/               # 基础 UI 组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── index.ts      # 导出文件
│   ├── features/         # 功能组件
│   │   ├── calculator/
│   │   ├── color-picker/
│   │   └── index.ts
│   └── layout/           # 布局组件
├── hooks/               # 自定义 Hooks
│   ├── useCalculator.ts
│   ├── useTheme.ts
│   └── index.ts
├── lib/                 # 工具库
│   ├── utils.ts
│   ├── constants.ts
│   ├── types.ts
│   └── index.ts
├── types/               # 类型定义
│   ├── tool.ts
│   ├── user.ts
│   └── index.ts
└── public/              # 静态资源
    ├── icons/
    └── images/
```

### 2. 导入导出规范

#### 导入顺序
```typescript
// 1. React 相关
import React, { useState, useEffect } from 'react';
import { NextRouter } from 'next/router';

// 2. 第三方库
import { clsx } from 'clsx';
import { format } from 'date-fns';

// 3. 内部组件 (使用 @/ 别名)
import { Card } from '@/components/ui/card';
import { Calculator } from '@/components/features/calculator';

// 4. 工具函数和类型
import { formatDate } from '@/lib/utils';
import type { ToolConfig } from '@/types/tool';

// 5. 相对路径导入
import { ToolHeader } from './ToolHeader';
import { ToolSettings } from './ToolSettings';
```

#### 导出规范
```typescript
// ✅ 推荐：命名导出
export const Calculator: React.FC<CalculatorProps> = () => {
  // 实现
};

export const useCalculator = () => {
  // 实现
};

// ✅ 推荐：使用 barrel exports
// components/ui/index.ts
export { Button } from './button';
export { Card } from './card';
export { Badge } from './badge';

// ✅ 推荐：类型导出
export type CalculatorState = {
  display: string;
  mode: string;
};
```

---

## 🎨 样式规范

### 1. Tailwind CSS 规范

#### 类名组织
```typescript
// ✅ 推荐：按逻辑分组
<div className="container mx-auto px-4 py-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        标题
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        内容
      </p>
    </div>
  </div>
</div>
```

#### 自定义 CSS
```typescript
// ✅ 推荐：使用 CSS 模块或内联样式
const customStyles = {
  '--custom-color': '#3b82f6',
} as React.CSSProperties;

<div style={customStyles} className="custom-component">
  {/* 内容 */}
</div>

// 或使用 CSS-in-JS
import { css } from '@emotion/react';

const styles = css`
  .custom-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    transition: all 0.3s ease;
  }
`;
```

### 2. 响应式设计

#### 断点使用
```typescript
// ✅ 推荐：移动端优先
<div className="w-full sm:w-auto md:w-1/2 lg:w-1/3 xl:w-1/4">
  {/* 内容 */}
</div>

// ✅ 推荐：使用一致的断点
<div className="hidden md:flex lg:hidden">
  {/* 在中等屏幕显示，大屏幕隐藏 */}
</div>
```

---

## 🔧 Git 提交规范

### 1. 提交信息格式

#### Conventional Commits
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### 类型说明
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式修改
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

#### 示例
```bash
# 新功能
git commit -m "feat(calculator): add scientific mode support"

# 修复 bug
git commit -m "fix(color-picker): fix hex color validation error"

# 文档更新
git commit -m "docs: update installation guide"

# 性能优化
git commit -m "perf(optimize): implement lazy loading for heavy components"
```

### 2. 分支命名

#### 分支类型
```
feature/功能名称
bugfix/问题描述
hotfix/紧急修复
release/版本号
docs/文档更新
```

#### 示例
```bash
git checkout -b feature/calculator-scientific-mode
git checkout -b bugfix/color-picker-validation
git checkout -b hotfix/security-patch
git checkout -b release/v1.0.0
```

---

## ✅ 代码质量检查

### 1. ESLint 配置

#### 规则示例
```javascript
module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    // 强制类型检查
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    
    // 代码风格
    'prefer-const': 'error',
    'no-var': 'error',
    
    // React 相关
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
  },
};
```

### 2. Prettier 配置

#### 格式化规则
```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "avoid"
}
```

### 3. 类型检查

#### 严格模式
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

---

## 🧪 测试规范

### 1. 测试文件命名

```
Button.test.tsx          # 单元测试
Button.integration.test.tsx  # 集成测试
Calculator.e2e.test.tsx  # 端到端测试
```

### 2. 测试结构

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from '@/components/Calculator';

describe('Calculator', () => {
  describe('基础功能', () => {
    it('应该正确显示初始值', () => {
      render(<Calculator />);
      expect(screen.getByDisplayValue('0')).toBeInTheDocument();
    });

    it('应该正确处理数字输入', () => {
      render(<Calculator />);
      
      fireEvent.click(screen.getByText('1'));
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('3'));
      
      expect(screen.getByDisplayValue('123')).toBeInTheDocument();
    });
  });
});
```

---

## 📝 注释规范

### 1. 文档注释

```typescript
/**
 * 计算两个数字的和
 * @param a - 第一个数字
 * @param b - 第二个数字
 * @returns 两个数字的和
 * @example
 * ```typescript
 * const result = add(1, 2); // 返回 3
 * ```
 */
export const add = (a: number, b: number): number => {
  return a + b;
};
```

### 2. 行内注释

```typescript
// ✅ 推荐：解释复杂逻辑
const result = complexCalculation(input, options); // 处理用户输入并进行格式化

// ✅ 推荐：标记 TODO
// TODO: 添加输入验证
const userInput = getInput();

// ✅ 推荐：解释为什么这样做
const useWorkerThread = true; // 使用 Worker 线程避免阻塞主线程
```

---

## 🔄 代码审查清单

### 提交前检查
- [ ] 代码符合项目的编码规范
- [ ] 所有功能都通过了单元测试
- [ ] 类型检查没有错误
- [ ] 代码覆盖率达标
- [ ] 文档已更新
- [ ] 性能测试通过

### 代码审查要点
- [ ] 代码逻辑是否清晰易懂
- [ ] 是否存在潜在的安全问题
- [ ] 是否有性能优化空间
- [ ] 是否正确处理了错误情况
- [ ] 组件是否可复用
- [ ] 是否考虑了可访问性

---

遵循这些开发规范，可以确保代码质量、提高团队协作效率，并使项目更易于维护和扩展。