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

### 5. 高内聚低耦合
模块应该有明确的职责，模块间的依赖关系要简单明了。

### 6. 🎨 用户体验优先 🌟
代码实现应该服务于优秀的用户体验，通过视觉美化提升产品吸引力。

### 7. 📏 美观与实用平衡 ⚖️
在追求美观的同时，不能牺牲功能的可用性和性能。

---

## 🎨 文案美化要求 🌟

### 💡 核心理念
- **🎯 情感化设计**：通过色彩和emoji传达正确的情感状态
- **🌈 视觉层次**：使用渐变色和对比度建立清晰的视觉层次
- **✨ 适度装饰**：美化元素要适度，不能影响功能使用
- **♿ 包容性设计**：确保所有用户都能正常使用，包括辅助功能用户

### 🎨 色彩使用规范

#### 🌈 情感色彩映射
| 状态 | 颜色 | Emoji | 使用场景 |
|------|------|-------|---------|
| 🎉 成功完成 | `green-500` | ✅ | 任务完成、操作成功 |
| ⚡️ 进行中 | `blue-500` | ⏳ | 加载状态、处理中 |
| ⚠️ 需注意 | `yellow-500` | ⚠️ | 警告提示、注意事项 |
| 🚫 错误失败 | `red-500` | ❌ | 错误提示、失败状态 |
| 💡 信息提示 | `purple-500` | ℹ️ | 帮助信息、功能说明 |
| 🎨 主要操作 | `gradient-to-r from-blue-500 to-purple-600` | 🚀 | 主要按钮、核心功能 |

#### 🎭 渐变色应用
```typescript
// ✅ 推荐：使用渐变增强视觉层次
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    渐变标题效果
  </h3>
</div>
```

### 😊 Emoji 使用规范

#### 🏷️ 分类标识系统
```typescript
// 🎯 工具分类 emoji 映射
const TOOL_EMOJIS = {
  calculator: '🧮',      // 计算器类
  colorPicker: '🎨',     // 颜色选择器
  textFormatter: '📝',    // 文本格式化
  timer: '⏰',           // 倒计时器
  imageCompressor: '🖼️',  // 图片压缩
  passwordGenerator: '🔐', // 密码生成器
  jsonFormatter: '💻',    // JSON格式化
  qrCode: '📱',         // 二维码
};
```

#### 📊 状态指示系统
```typescript
// 🎯 状态 emoji 系统
const STATUS_EMOJIS = {
  idle: '💤',           // 空闲状态
  loading: '⏳',        // 加载中
  processing: '⚡️',     // 处理中
  success: '✅',        // 成功
  error: '❌',          // 错误
  warning: '⚠️',       // 警告
  info: 'ℹ️',          // 信息
  completed: '🎉',      // 完成
};
```

#### 🚀 动作指示系统
```typescript
// 🎯 动作 emoji 系统
const ACTION_EMOJIS = {
  create: '➕',         // 创建
  edit: '✏️',           // 编辑
  delete: '🗑️',         // 删除
  save: '💾',           // 保存
  download: '📥',        // 下载
  upload: '📤',          // 上传
  copy: '📋',           // 复制
  refresh: '🔄',         // 刷新
  settings: '⚙️',       // 设置
  search: '🔍',         // 搜索
};
```

### 🎪 组件美化实践

#### 🎯 按钮美化标准
```typescript
// ✅ 推荐：标准按钮美化模式
const ActionButton = ({ emoji, text, variant, ...props }) => (
  <Button 
    variant={variant}
    className={cn(
      variant === 'default' && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      "transition-all duration-200 hover:scale-105"
    )}
    {...props}
  >
    <span className="mr-2">{emoji}</span>
    {text}
  </Button>
);

// 使用示例
<ActionButton emoji="🚀" text="开始压缩" />
<ActionButton emoji="💾" text="保存" variant="outline" />
<ActionButton emoji="⚙️" text="设置" variant="ghost" />
```

#### 📋 卡片美化标准
```typescript
// ✅ 推荐：标准卡片美化模式
const FeatureCard = ({ icon, title, description, color }) => (
  <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-6">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
```

#### 📊 数据展示美化
```typescript
// ✅ 推荐：数据展示美化
const StatsCard = ({ emoji, value, label, color }) => (
  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
    <div className="text-3xl mb-2">{emoji}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
```

### 🎬 动效使用规范

#### ✨ 基础动效
```typescript
// ✅ 推荐：微交互动效
const InteractiveIcon = ({ emoji, children }) => (
  <div className="group">
    <span className="text-2xl transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 inline-block">
      {emoji}
    </span>
    {children}
  </div>
);
```

#### 🎉 成功动画
```typescript
// ✅ 推荐：成功状态动画
const SuccessMessage = () => (
  <div className="flex flex-col items-center p-8 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
    <div className="text-6xl mb-4 animate-bounce">🎉</div>
    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
      处理完成！
    </h3>
  </div>
);
```

#### ⚡ 加载状态
```typescript
// ✅ 推荐：加载状态美化
const LoadingIndicator = () => (
  <div className="flex items-center space-x-3">
    <div className="flex space-x-1">
      <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🌟</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>✨</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>💫</span>
    </div>
    <span className="text-muted-foreground">处理中...</span>
  </div>
);
```

### 📱 响应式美化

#### 🎨 响应式Emoji
```typescript
// ✅ 推荐：响应式图标大小
const ResponsiveEmoji = ({ emoji, size = 'base' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <span className={`${sizeClasses[size]} sm:text-lg md:text-xl lg:text-2xl`}>
      {emoji}
    </span>
  );
};
```

### 🚀 实施检查清单

实现组件时请使用以下检查清单：

#### 🎨 视觉设计
- [ ] 🌈 颜色使用是否符合情感色彩映射？
- [ ] 😊 Emoji 使用是否一致且相关？
- [ ] 🎭 渐变效果是否增强视觉层次？
- [ ] ✨ 动效是否适度且有意义？

#### 📱 响应式设计
- [ ] 📏 在移动端显示是否正常？
- [ ] 🖥️ 在桌面端显示是否优秀？
- [ ] 📱 Emoji 大小是否适配不同屏幕？

#### ♿ 可访问性
- [ ] 🔍 屏幕阅读器能否识别emoji？
- [ ] 🎨 颜色对比度是否足够？
- [ ] ⚡ 动效是否会导致晕动症？

#### 🎯 功能完整性
- [ ] 🎯 美化是否影响功能使用？
- [ ] ⚡ 性能是否因美化而降低？
- [ ] 💾 加载速度是否仍然快速？

> 💡 **注意**：更多详细的美化指南请参考 [文案设计规范](./content-design-standards.md)

---

## 🏗 架构要求

### 1. 分层架构
严格遵循分层架构原则，确保层间依赖关系清晰：

```
表示层 (UI) → 应用层 (Business Logic) → 领域层 (Domain) → 基础设施层 (Infrastructure)
```

#### 实施要求
```typescript
// ✅ 推荐：遵循分层结构
// hooks/useCalculator.ts - 应用层
export function useCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  
  const calculate = useCallback(() => {
    const result = calculatorEngine.evaluate(state.expression); // 调用领域层
    dispatch({ type: 'SET_RESULT', payload: result });
  }, [state.expression]);
  
  return { state, calculate };
}

// domain/calculator/CalculatorEngine.ts - 领域层
export class CalculatorEngine {
  evaluate(expression: string): number {
    // 纯业务逻辑，不依赖UI或存储
  }
}

// ❌ 避免：跨层调用
export function CalculatorDisplay() {
  // UI 组件直接操作存储（违反分层原则）
  useEffect(() => {
    localStorage.setItem('result', result);
  }, [result]);
}
```

### 2. 模块解耦
每个工具模块应该是独立的功能单元，减少模块间的直接依赖。

#### 模块边界
```typescript
// ✅ 推荐：定义清晰的模块接口
// modules/calculator/index.ts
export interface CalculatorModule {
  createTool(config?: CalculatorConfig): CalculatorTool;
  useCalculator(): CalculatorHook;
  components: CalculatorComponents;
}

export const calculatorModule: CalculatorModule = {
  createTool: (config) => new CalculatorTool(config),
  useCalculator: () => useCalculator(),
  components: {
    Display,
    Keypad,
    History,
  },
};

// ❌ 避免：模块间直接依赖
// 在颜色选择器中直接导入计算器
import { CalculatorEngine } from '../calculator/engine'; // 违反模块解耦
```

### 3. 依赖倒置
高层模块不应依赖低层模块，两者都应依赖抽象。

#### 接口定义
```typescript
// ✅ 推荐：定义服务接口
// interfaces/StorageService.ts
export interface StorageService {
  save<T>(key: string, data: T): Promise<void>;
  load<T>(key: string): Promise<T | null>;
  remove(key: string): Promise<void>;
}

// 实现类依赖接口
export class LocalStorageService implements StorageService {
  async save<T>(key: string, data: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  // ...
}

// 使用依赖注入
export function SettingsManager({ storage }: { storage: StorageService }) {
  const saveSettings = async (settings: UserSettings) => {
    await storage.save('settings', settings);
  };
  
  return { saveSettings };
}
```

### 4. 事件驱动通信
使用事件总线进行模块间通信，减少直接依赖。

```typescript
// ✅ 推荐：事件驱动通信
// lib/EventBus.ts
export class EventBus {
  private listeners: Map<string, Set<Function>> = new Map();
  
  emit(event: string, data: any): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }
  
  on(event: string, handler: Function): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
    
    return () => {
      this.listeners.get(event)!.delete(handler);
    };
  }
}

// 使用示例
// 计算器模块发送事件
const eventBus = new EventBus();
const handleResult = (result: number) => {
  eventBus.emit('calculator:result', { result, timestamp: Date.now() });
};

// 历史记录模块监听事件
eventBus.on('calculator:result', (data) => {
  console.log('新的计算结果:', data);
});
```

---

## 🎨 文案美化要求 🌟

### 💡 核心理念
- **🎯 情感化设计**：通过色彩和emoji传达正确的情感状态
- **🌈 视觉层次**：使用渐变色和对比度建立清晰的视觉层次
- **✨ 适度装饰**：美化元素要适度，不能影响功能使用
- **♿ 包容性设计**：确保所有用户都能正常使用，包括辅助功能用户

### 🎨 色彩使用规范

#### 🌈 情感色彩映射
| 状态 | 颜色 | Emoji | 使用场景 |
|------|------|-------|---------|
| 🎉 成功完成 | `green-500` | ✅ | 任务完成、操作成功 |
| ⚡️ 进行中 | `blue-500` | ⏳ | 加载状态、处理中 |
| ⚠️ 需注意 | `yellow-500` | ⚠️ | 警告提示、注意事项 |
| 🚫 错误失败 | `red-500` | ❌ | 错误提示、失败状态 |
| 💡 信息提示 | `purple-500` | ℹ️ | 帮助信息、功能说明 |
| 🎨 主要操作 | `gradient-to-r from-blue-500 to-purple-600` | 🚀 | 主要按钮、核心功能 |

#### 🎭 渐变色应用
```typescript
// ✅ 推荐：使用渐变增强视觉层次
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    渐变标题效果
  </h3>
</div>
```

### 😊 Emoji 使用规范

#### 🏷️ 分类标识系统
```typescript
// 🎯 工具分类 emoji 映射
const TOOL_EMOJIS = {
  calculator: '🧮',      // 计算器类
  colorPicker: '🎨',     // 颜色选择器
  textFormatter: '📝',    // 文本格式化
  timer: '⏰',           // 倒计时器
  imageCompressor: '🖼️',  // 图片压缩
  passwordGenerator: '🔐', // 密码生成器
  jsonFormatter: '💻',    // JSON格式化
  qrCode: '📱',         // 二维码
};
```

#### 📊 状态指示系统
```typescript
// 🎯 状态 emoji 系统
const STATUS_EMOJIS = {
  idle: '💤',           // 空闲状态
  loading: '⏳',        // 加载中
  processing: '⚡️',     // 处理中
  success: '✅',        // 成功
  error: '❌',          // 错误
  warning: '⚠️',       // 警告
  info: 'ℹ️',          // 信息
  completed: '🎉',      // 完成
};
```

#### 🚀 动作指示系统
```typescript
// 🎯 动作 emoji 系统
const ACTION_EMOJIS = {
  create: '➕',         // 创建
  edit: '✏️',           // 编辑
  delete: '🗑️',         // 删除
  save: '💾',           // 保存
  download: '📥',        // 下载
  upload: '📤',          // 上传
  copy: '📋',           // 复制
  refresh: '🔄',         // 刷新
  settings: '⚙️',       // 设置
  search: '🔍',         // 搜索
};
```

### 🎪 组件美化实践

#### 🎯 按钮美化标准
```typescript
// ✅ 推荐：标准按钮美化模式
const ActionButton = ({ emoji, text, variant, ...props }) => (
  <Button 
    variant={variant}
    className={cn(
      variant === 'default' && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      "transition-all duration-200 hover:scale-105"
    )}
    {...props}
  >
    <span className="mr-2">{emoji}</span>
    {text}
  </Button>
);

// 使用示例
<ActionButton emoji="🚀" text="开始压缩" />
<ActionButton emoji="💾" text="保存" variant="outline" />
<ActionButton emoji="⚙️" text="设置" variant="ghost" />
```

#### 📋 卡片美化标准
```typescript
// ✅ 推荐：标准卡片美化模式
const FeatureCard = ({ icon, title, description, color }) => (
  <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-6">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
```

#### 📊 数据展示美化
```typescript
// ✅ 推荐：数据展示美化
const StatsCard = ({ emoji, value, label, color }) => (
  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
    <div className="text-3xl mb-2">{emoji}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
```

### 🎬 动效使用规范

#### ✨ 基础动效
```typescript
// ✅ 推荐：微交互动效
const InteractiveIcon = ({ emoji, children }) => (
  <div className="group">
    <span className="text-2xl transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 inline-block">
      {emoji}
    </span>
    {children}
  </div>
);
```

#### 🎉 成功动画
```typescript
// ✅ 推荐：成功状态动画
const SuccessMessage = () => (
  <div className="flex flex-col items-center p-8 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
    <div className="text-6xl mb-4 animate-bounce">🎉</div>
    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
      处理完成！
    </h3>
  </div>
);
```

#### ⚡ 加载状态
```typescript
// ✅ 推荐：加载状态美化
const LoadingIndicator = () => (
  <div className="flex items-center space-x-3">
    <div className="flex space-x-1">
      <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🌟</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>✨</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>💫</span>
    </div>
    <span className="text-muted-foreground">处理中...</span>
  </div>
);
```

### 📱 响应式美化

#### 🎨 响应式Emoji
```typescript
// ✅ 推荐：响应式图标大小
const ResponsiveEmoji = ({ emoji, size = 'base' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <span className={`${sizeClasses[size]} sm:text-lg md:text-xl lg:text-2xl`}>
      {emoji}
    </span>
  );
};
```

### 🚀 实施检查清单

实现组件时请使用以下检查清单：

#### 🎨 视觉设计
- [ ] 🌈 颜色使用是否符合情感色彩映射？
- [ ] 😊 Emoji 使用是否一致且相关？
- [ ] 🎭 渐变效果是否增强视觉层次？
- [ ] ✨ 动效是否适度且有意义？

#### 📱 响应式设计
- [ ] 📏 在移动端显示是否正常？
- [ ] 🖥️ 在桌面端显示是否优秀？
- [ ] 📱 Emoji 大小是否适配不同屏幕？

#### ♿ 可访问性
- [ ] 🔍 屏幕阅读器能否识别emoji？
- [ ] 🎨 颜色对比度是否足够？
- [ ] ⚡ 动效是否会导致晕动症？

#### 🎯 功能完整性
- [ ] 🎯 美化是否影响功能使用？
- [ ] ⚡ 性能是否因美化而降低？
- [ ] 💾 加载速度是否仍然快速？

> 💡 **注意**：更多详细的美化指南请参考 [文案设计规范](./content-design-standards.md)

---

## 📦 模块化开发要求

### 1. 目录结构规范
每个工具模块必须遵循统一的目录结构：

```
modules/[tool-name]/
├── index.ts              # 模块导出接口
├── types.ts              # 类型定义
├── components/           # UI 组件
│   ├── index.ts         # 组件导出
│   ├── ToolHeader.tsx
│   ├── ToolArea.tsx
│   └── ToolSettings.tsx
├── hooks/                # 自定义 Hooks
│   ├── useTool.ts       # 主要业务逻辑
│   └── index.ts
├── domain/               # 领域层
│   ├── engine.ts        # 核心算法
│   ├── types.ts         # 领域类型
│   └── index.ts
├── infrastructure/      # 基础设施层
│   ├── storage.ts       # 存储实现
│   ├── api.ts          # API 调用
│   └── index.ts
└── __tests__/           # 测试文件
    ├── component.test.tsx
    ├── hook.test.ts
    └── domain.test.ts
```

### 2. 模块接口规范
每个模块必须导出标准化的接口：

```typescript
// ✅ 推荐：标准化模块接口
export interface ToolModule<TConfig = any, TState = any> {
  // 基本信息
  readonly id: string;
  readonly name: string;
  readonly version: string;
  
  // 创建工具实例
  createTool(config?: TConfig): Tool<TConfig, TState>;
  
  // Hook
  useTool(config?: TConfig): ToolHook<TState>;
  
  // 组件
  readonly components: {
    ToolArea: React.ComponentType<any>;
    ToolSettings?: React.ComponentType<any>;
    ToolHeader?: React.ComponentType<any>;
  };
  
  // 类型
  readonly types: {
    Config: TConfig;
    State: TState;
  };
}
```

### 3. 配置管理
每个工具必须有明确的配置接口：

```typescript
// ✅ 推荐：配置接口定义
export interface ToolConfig {
  // 基础配置
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
  
  // 工具特定配置
  precision?: number;
  enableHistory?: boolean;
  
  // 扩展配置
  [key: string]: any;
}

// 默认配置
export const defaultToolConfig: ToolConfig = {
  theme: 'auto',
  language: 'zh-CN',
  precision: 10,
  enableHistory: true,
};
```

---

## 🎨 文案美化要求 🌟

### 💡 核心理念
- **🎯 情感化设计**：通过色彩和emoji传达正确的情感状态
- **🌈 视觉层次**：使用渐变色和对比度建立清晰的视觉层次
- **✨ 适度装饰**：美化元素要适度，不能影响功能使用
- **♿ 包容性设计**：确保所有用户都能正常使用，包括辅助功能用户

### 🎨 色彩使用规范

#### 🌈 情感色彩映射
| 状态 | 颜色 | Emoji | 使用场景 |
|------|------|-------|---------|
| 🎉 成功完成 | `green-500` | ✅ | 任务完成、操作成功 |
| ⚡️ 进行中 | `blue-500` | ⏳ | 加载状态、处理中 |
| ⚠️ 需注意 | `yellow-500` | ⚠️ | 警告提示、注意事项 |
| 🚫 错误失败 | `red-500` | ❌ | 错误提示、失败状态 |
| 💡 信息提示 | `purple-500` | ℹ️ | 帮助信息、功能说明 |
| 🎨 主要操作 | `gradient-to-r from-blue-500 to-purple-600` | 🚀 | 主要按钮、核心功能 |

#### 🎭 渐变色应用
```typescript
// ✅ 推荐：使用渐变增强视觉层次
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    渐变标题效果
  </h3>
</div>
```

### 😊 Emoji 使用规范

#### 🏷️ 分类标识系统
```typescript
// 🎯 工具分类 emoji 映射
const TOOL_EMOJIS = {
  calculator: '🧮',      // 计算器类
  colorPicker: '🎨',     // 颜色选择器
  textFormatter: '📝',    // 文本格式化
  timer: '⏰',           // 倒计时器
  imageCompressor: '🖼️',  // 图片压缩
  passwordGenerator: '🔐', // 密码生成器
  jsonFormatter: '💻',    // JSON格式化
  qrCode: '📱',         // 二维码
};
```

#### 📊 状态指示系统
```typescript
// 🎯 状态 emoji 系统
const STATUS_EMOJIS = {
  idle: '💤',           // 空闲状态
  loading: '⏳',        // 加载中
  processing: '⚡️',     // 处理中
  success: '✅',        // 成功
  error: '❌',          // 错误
  warning: '⚠️',       // 警告
  info: 'ℹ️',          // 信息
  completed: '🎉',      // 完成
};
```

#### 🚀 动作指示系统
```typescript
// 🎯 动作 emoji 系统
const ACTION_EMOJIS = {
  create: '➕',         // 创建
  edit: '✏️',           // 编辑
  delete: '🗑️',         // 删除
  save: '💾',           // 保存
  download: '📥',        // 下载
  upload: '📤',          // 上传
  copy: '📋',           // 复制
  refresh: '🔄',         // 刷新
  settings: '⚙️',       // 设置
  search: '🔍',         // 搜索
};
```

### 🎪 组件美化实践

#### 🎯 按钮美化标准
```typescript
// ✅ 推荐：标准按钮美化模式
const ActionButton = ({ emoji, text, variant, ...props }) => (
  <Button 
    variant={variant}
    className={cn(
      variant === 'default' && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      "transition-all duration-200 hover:scale-105"
    )}
    {...props}
  >
    <span className="mr-2">{emoji}</span>
    {text}
  </Button>
);

// 使用示例
<ActionButton emoji="🚀" text="开始压缩" />
<ActionButton emoji="💾" text="保存" variant="outline" />
<ActionButton emoji="⚙️" text="设置" variant="ghost" />
```

#### 📋 卡片美化标准
```typescript
// ✅ 推荐：标准卡片美化模式
const FeatureCard = ({ icon, title, description, color }) => (
  <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-6">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
```

#### 📊 数据展示美化
```typescript
// ✅ 推荐：数据展示美化
const StatsCard = ({ emoji, value, label, color }) => (
  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
    <div className="text-3xl mb-2">{emoji}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
```

### 🎬 动效使用规范

#### ✨ 基础动效
```typescript
// ✅ 推荐：微交互动效
const InteractiveIcon = ({ emoji, children }) => (
  <div className="group">
    <span className="text-2xl transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 inline-block">
      {emoji}
    </span>
    {children}
  </div>
);
```

#### 🎉 成功动画
```typescript
// ✅ 推荐：成功状态动画
const SuccessMessage = () => (
  <div className="flex flex-col items-center p-8 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
    <div className="text-6xl mb-4 animate-bounce">🎉</div>
    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
      处理完成！
    </h3>
  </div>
);
```

#### ⚡ 加载状态
```typescript
// ✅ 推荐：加载状态美化
const LoadingIndicator = () => (
  <div className="flex items-center space-x-3">
    <div className="flex space-x-1">
      <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🌟</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>✨</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>💫</span>
    </div>
    <span className="text-muted-foreground">处理中...</span>
  </div>
);
```

### 📱 响应式美化

#### 🎨 响应式Emoji
```typescript
// ✅ 推荐：响应式图标大小
const ResponsiveEmoji = ({ emoji, size = 'base' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <span className={`${sizeClasses[size]} sm:text-lg md:text-xl lg:text-2xl`}>
      {emoji}
    </span>
  );
};
```

### 🚀 实施检查清单

实现组件时请使用以下检查清单：

#### 🎨 视觉设计
- [ ] 🌈 颜色使用是否符合情感色彩映射？
- [ ] 😊 Emoji 使用是否一致且相关？
- [ ] 🎭 渐变效果是否增强视觉层次？
- [ ] ✨ 动效是否适度且有意义？

#### 📱 响应式设计
- [ ] 📏 在移动端显示是否正常？
- [ ] 🖥️ 在桌面端显示是否优秀？
- [ ] 📱 Emoji 大小是否适配不同屏幕？

#### ♿ 可访问性
- [ ] 🔍 屏幕阅读器能否识别emoji？
- [ ] 🎨 颜色对比度是否足够？
- [ ] ⚡ 动效是否会导致晕动症？

#### 🎯 功能完整性
- [ ] 🎯 美化是否影响功能使用？
- [ ] ⚡ 性能是否因美化而降低？
- [ ] 💾 加载速度是否仍然快速？

> 💡 **注意**：更多详细的美化指南请参考 [文案设计规范](./content-design-standards.md)

---

## 🔧 代码组织要求

### 1. 导入导出规范

#### 导入顺序
```typescript
// ✅ 推荐：按依赖层级导入
// 1. React 和 Next.js 相关
import React, { useState, useEffect, useCallback } from 'react';
import { NextRouter } from 'next/router';

// 2. 第三方库
import { clsx } from 'clsx';
import { format } from 'date-fns';

// 3. 项目接口和类型
import type { StorageService } from '@/interfaces/StorageService';
import type { ToolConfig } from '@/types/tool';

// 4. 共享组件和工具
import { Card, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

// 5. 当前模块相关
import { useToolState } from '@/hooks/useToolState';
import { ToolArea } from './ToolArea';
import type { CalculatorState } from './types';

// ❌ 避免：混乱的导入顺序
import { Card } from '@/components/ui';
import React from 'react';
import { useState } from 'react';
import format from 'date-fns';
import { Button } from '@/components/ui';
```

#### 导出规范
```typescript
// ✅ 推荐：明确的导出
// 主要功能导出
export { CalculatorTool } from './CalculatorTool';
export { useCalculator } from './useCalculator';
export { CalculatorEngine } from './domain/CalculatorEngine';

// 类型导出
export type { CalculatorConfig, CalculatorState } from './types';

// 默认导出（主要组件）
export { default as Calculator } from './Calculator';

// ❌ 避免：混合导出方式
export CalculatorTool from './CalculatorTool'; // 不一致
export { CalculatorEngine } from './domain/CalculatorEngine';
export default CalculatorTool; // 与命名导出冲突
```

### 2. 类型定义规范

#### 接口设计
```typescript
// ✅ 推荐：清晰的接口设计
export interface Tool<TConfig = any, TResult = any> {
  // 基本属性
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly description: string;
  
  // 配置相关
  config: TConfig;
  setConfig(config: Partial<TConfig>): void;
  
  // 执行相关
  execute(input: any): Promise<TResult>;
  validate(input: any): boolean;
  
  // 状态相关
  getState(): ToolState;
  reset(): void;
}

// 扩展接口
export interface AdvancedTool<TConfig, TResult> extends Tool<TConfig, TResult> {
  // 高级功能
  batch(inputs: any[]): Promise<TResult[]>;
  stream?(input: AsyncIterable<any>): AsyncIterable<TResult>;
  cancel?(): void;
}
```

#### 泛型使用
```typescript
// ✅ 推荐：有意义的泛型约束
export interface Repository<T, K = string> {
  // 基础 CRUD
  create(data: T): Promise<T>;
  read(key: K): Promise<T | null>;
  update(key: K, data: Partial<T>): Promise<T>;
  delete(key: K): Promise<boolean>;
  
  // 批量操作
  createMany(data: T[]): Promise<T[]>;
  readMany(keys: K[]): Promise<T[]>;
  
  // 查询
  find(predicate: (item: T) => boolean): Promise<T[]>;
  findOne(predicate: (item: T) => boolean): Promise<T | null>;
}

// 具体实现
export class LocalStorageRepository<T> implements Repository<T, string> {
  constructor(private keyPrefix: string) {}
  
  async create(data: T): Promise<T> {
    const key = `${this.keyPrefix}_${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  }
  
  // ... 其他方法实现
}
```

### 3. 错误处理规范

#### 错误类型定义
```typescript
// ✅ 推荐：结构化错误处理
// 基础错误类
export abstract class BaseError extends Error {
  abstract readonly code: string;
  abstract readonly category: 'validation' | 'business' | 'system' | 'network';
  
  constructor(
    message: string,
    public readonly context?: Record<string, any>
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

// 具体错误类
export class ValidationError extends BaseError {
  readonly code = 'VALIDATION_ERROR';
  readonly category = 'validation';
  
  constructor(
    field: string,
    value: any,
    expected: string
  ) {
    super(`Field '${field}' validation failed: ${expected}, got ${value}`, {
      field,
      value,
      expected,
    });
  }
}

export class BusinessRuleError extends BaseError {
  readonly code = 'BUSINESS_RULE_ERROR';
  readonly category = 'business';
  
  constructor(rule: string, reason: string) {
    super(`Business rule violation: ${rule} - ${reason}`, {
      rule,
      reason,
    });
  }
}
```

#### 错误处理策略
```typescript
// ✅ 推荐：分层错误处理
// 表示层错误处理
export function useErrorHandler() {
  const handleError = useCallback((error: Error) => {
    if (error instanceof BaseError) {
      switch (error.category) {
        case 'validation':
          toast.error(`验证错误: ${error.message}`);
          break;
        case 'business':
          toast.error(`操作失败: ${error.message}`);
          break;
        case 'system':
          toast.error('系统错误，请稍后重试');
          break;
        case 'network':
          toast.error('网络错误，请检查连接');
          break;
      }
    } else {
      toast.error('未知错误，请联系客服');
    }
    
    // 错误上报
    if (process.env.NODE_ENV === 'production') {
      reportError(error);
    }
  }, []);
  
  return { handleError };
}

// 应用层错误处理
export class CalculatorUseCase {
  async calculate(expression: string): Promise<number> {
    try {
      this.validateExpression(expression);
      return this.engine.evaluate(expression);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error; // 验证错误直接传递
      }
      
      // 业务错误转换为领域错误
      throw new BusinessRuleError(
        'CALCULATION_FAILED',
        `无法计算表达式: ${expression}`
      );
    }
  }
  
  private validateExpression(expression: string): void {
    if (!expression.trim()) {
      throw new ValidationError('expression', expression, 'non-empty string');
    }
    
    if (expression.length > 1000) {
      throw new ValidationError('expression', expression, 'max 1000 characters');
    }
  }
}
```

---

## 🎨 文案美化要求 🌟

### 💡 核心理念
- **🎯 情感化设计**：通过色彩和emoji传达正确的情感状态
- **🌈 视觉层次**：使用渐变色和对比度建立清晰的视觉层次
- **✨ 适度装饰**：美化元素要适度，不能影响功能使用
- **♿ 包容性设计**：确保所有用户都能正常使用，包括辅助功能用户

### 🎨 色彩使用规范

#### 🌈 情感色彩映射
| 状态 | 颜色 | Emoji | 使用场景 |
|------|------|-------|---------|
| 🎉 成功完成 | `green-500` | ✅ | 任务完成、操作成功 |
| ⚡️ 进行中 | `blue-500` | ⏳ | 加载状态、处理中 |
| ⚠️ 需注意 | `yellow-500` | ⚠️ | 警告提示、注意事项 |
| 🚫 错误失败 | `red-500` | ❌ | 错误提示、失败状态 |
| 💡 信息提示 | `purple-500` | ℹ️ | 帮助信息、功能说明 |
| 🎨 主要操作 | `gradient-to-r from-blue-500 to-purple-600` | 🚀 | 主要按钮、核心功能 |

#### 🎭 渐变色应用
```typescript
// ✅ 推荐：使用渐变增强视觉层次
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    渐变标题效果
  </h3>
</div>
```

### 😊 Emoji 使用规范

#### 🏷️ 分类标识系统
```typescript
// 🎯 工具分类 emoji 映射
const TOOL_EMOJIS = {
  calculator: '🧮',      // 计算器类
  colorPicker: '🎨',     // 颜色选择器
  textFormatter: '📝',    // 文本格式化
  timer: '⏰',           // 倒计时器
  imageCompressor: '🖼️',  // 图片压缩
  passwordGenerator: '🔐', // 密码生成器
  jsonFormatter: '💻',    // JSON格式化
  qrCode: '📱',         // 二维码
};
```

#### 📊 状态指示系统
```typescript
// 🎯 状态 emoji 系统
const STATUS_EMOJIS = {
  idle: '💤',           // 空闲状态
  loading: '⏳',        // 加载中
  processing: '⚡️',     // 处理中
  success: '✅',        // 成功
  error: '❌',          // 错误
  warning: '⚠️',       // 警告
  info: 'ℹ️',          // 信息
  completed: '🎉',      // 完成
};
```

#### 🚀 动作指示系统
```typescript
// 🎯 动作 emoji 系统
const ACTION_EMOJIS = {
  create: '➕',         // 创建
  edit: '✏️',           // 编辑
  delete: '🗑️',         // 删除
  save: '💾',           // 保存
  download: '📥',        // 下载
  upload: '📤',          // 上传
  copy: '📋',           // 复制
  refresh: '🔄',         // 刷新
  settings: '⚙️',       // 设置
  search: '🔍',         // 搜索
};
```

### 🎪 组件美化实践

#### 🎯 按钮美化标准
```typescript
// ✅ 推荐：标准按钮美化模式
const ActionButton = ({ emoji, text, variant, ...props }) => (
  <Button 
    variant={variant}
    className={cn(
      variant === 'default' && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      "transition-all duration-200 hover:scale-105"
    )}
    {...props}
  >
    <span className="mr-2">{emoji}</span>
    {text}
  </Button>
);

// 使用示例
<ActionButton emoji="🚀" text="开始压缩" />
<ActionButton emoji="💾" text="保存" variant="outline" />
<ActionButton emoji="⚙️" text="设置" variant="ghost" />
```

#### 📋 卡片美化标准
```typescript
// ✅ 推荐：标准卡片美化模式
const FeatureCard = ({ icon, title, description, color }) => (
  <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-6">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
```

#### 📊 数据展示美化
```typescript
// ✅ 推荐：数据展示美化
const StatsCard = ({ emoji, value, label, color }) => (
  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
    <div className="text-3xl mb-2">{emoji}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
```

### 🎬 动效使用规范

#### ✨ 基础动效
```typescript
// ✅ 推荐：微交互动效
const InteractiveIcon = ({ emoji, children }) => (
  <div className="group">
    <span className="text-2xl transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 inline-block">
      {emoji}
    </span>
    {children}
  </div>
);
```

#### 🎉 成功动画
```typescript
// ✅ 推荐：成功状态动画
const SuccessMessage = () => (
  <div className="flex flex-col items-center p-8 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
    <div className="text-6xl mb-4 animate-bounce">🎉</div>
    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
      处理完成！
    </h3>
  </div>
);
```

#### ⚡ 加载状态
```typescript
// ✅ 推荐：加载状态美化
const LoadingIndicator = () => (
  <div className="flex items-center space-x-3">
    <div className="flex space-x-1">
      <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🌟</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>✨</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>💫</span>
    </div>
    <span className="text-muted-foreground">处理中...</span>
  </div>
);
```

### 📱 响应式美化

#### 🎨 响应式Emoji
```typescript
// ✅ 推荐：响应式图标大小
const ResponsiveEmoji = ({ emoji, size = 'base' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <span className={`${sizeClasses[size]} sm:text-lg md:text-xl lg:text-2xl`}>
      {emoji}
    </span>
  );
};
```

### 🚀 实施检查清单

实现组件时请使用以下检查清单：

#### 🎨 视觉设计
- [ ] 🌈 颜色使用是否符合情感色彩映射？
- [ ] 😊 Emoji 使用是否一致且相关？
- [ ] 🎭 渐变效果是否增强视觉层次？
- [ ] ✨ 动效是否适度且有意义？

#### 📱 响应式设计
- [ ] 📏 在移动端显示是否正常？
- [ ] 🖥️ 在桌面端显示是否优秀？
- [ ] 📱 Emoji 大小是否适配不同屏幕？

#### ♿ 可访问性
- [ ] 🔍 屏幕阅读器能否识别emoji？
- [ ] 🎨 颜色对比度是否足够？
- [ ] ⚡ 动效是否会导致晕动症？

#### 🎯 功能完整性
- [ ] 🎯 美化是否影响功能使用？
- [ ] ⚡ 性能是否因美化而降低？
- [ ] 💾 加载速度是否仍然快速？

> 💡 **注意**：更多详细的美化指南请参考 [文案设计规范](./content-design-standards.md)

---

## 🧪 测试要求

### 1. 测试分层
每个层级的测试重点不同：

```typescript
// 领域层测试：纯函数测试
describe('CalculatorEngine', () => {
  it('should calculate correctly', () => {
    const engine = new CalculatorEngine();
    expect(engine.evaluate('2 + 3')).toBe(5);
  });
});

// 应用层测试：业务逻辑测试
describe('CalculatorUseCase', () => {
  it('should save calculation to history', async () => {
    const mockStorage = createMockStorage();
    const useCase = new CalculatorUseCase(engine, mockStorage);
    
    await useCase.calculate('2 + 3');
    
    expect(mockStorage.save).toHaveBeenCalledWith({
      expression: '2 + 3',
      result: 5,
      timestamp: expect.any(Date),
    });
  });
});

// UI 测试：组件交互测试
describe('Calculator', () => {
  it('should update display when number clicked', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('3'));
    
    expect(screen.getByDisplayValue('53')).toBeInTheDocument();
  });
});
```

### 2. Mock 规范
```typescript
// ✅ 推荐：清晰的 Mock 定义
// __mocks__/StorageService.ts
export class MockStorageService implements StorageService {
  private storage: Map<string, any> = new Map();
  
  async save<T>(key: string, data: T): Promise<void> {
    this.storage.set(key, data);
  }
  
  async load<T>(key: string): Promise<T | null> {
    return this.storage.get(key) || null;
  }
  
  async remove(key: string): Promise<void> {
    this.storage.delete(key);
  }
  
  // 测试辅助方法
  clear(): void {
    this.storage.clear();
  }
  
  getAll(): Record<string, any> {
    return Object.fromEntries(this.storage);
  }
}
```

---

## 🎨 文案美化要求 🌟

### 💡 核心理念
- **🎯 情感化设计**：通过色彩和emoji传达正确的情感状态
- **🌈 视觉层次**：使用渐变色和对比度建立清晰的视觉层次
- **✨ 适度装饰**：美化元素要适度，不能影响功能使用
- **♿ 包容性设计**：确保所有用户都能正常使用，包括辅助功能用户

### 🎨 色彩使用规范

#### 🌈 情感色彩映射
| 状态 | 颜色 | Emoji | 使用场景 |
|------|------|-------|---------|
| 🎉 成功完成 | `green-500` | ✅ | 任务完成、操作成功 |
| ⚡️ 进行中 | `blue-500` | ⏳ | 加载状态、处理中 |
| ⚠️ 需注意 | `yellow-500` | ⚠️ | 警告提示、注意事项 |
| 🚫 错误失败 | `red-500` | ❌ | 错误提示、失败状态 |
| 💡 信息提示 | `purple-500` | ℹ️ | 帮助信息、功能说明 |
| 🎨 主要操作 | `gradient-to-r from-blue-500 to-purple-600` | 🚀 | 主要按钮、核心功能 |

#### 🎭 渐变色应用
```typescript
// ✅ 推荐：使用渐变增强视觉层次
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    渐变标题效果
  </h3>
</div>
```

### 😊 Emoji 使用规范

#### 🏷️ 分类标识系统
```typescript
// 🎯 工具分类 emoji 映射
const TOOL_EMOJIS = {
  calculator: '🧮',      // 计算器类
  colorPicker: '🎨',     // 颜色选择器
  textFormatter: '📝',    // 文本格式化
  timer: '⏰',           // 倒计时器
  imageCompressor: '🖼️',  // 图片压缩
  passwordGenerator: '🔐', // 密码生成器
  jsonFormatter: '💻',    // JSON格式化
  qrCode: '📱',         // 二维码
};
```

#### 📊 状态指示系统
```typescript
// 🎯 状态 emoji 系统
const STATUS_EMOJIS = {
  idle: '💤',           // 空闲状态
  loading: '⏳',        // 加载中
  processing: '⚡️',     // 处理中
  success: '✅',        // 成功
  error: '❌',          // 错误
  warning: '⚠️',       // 警告
  info: 'ℹ️',          // 信息
  completed: '🎉',      // 完成
};
```

#### 🚀 动作指示系统
```typescript
// 🎯 动作 emoji 系统
const ACTION_EMOJIS = {
  create: '➕',         // 创建
  edit: '✏️',           // 编辑
  delete: '🗑️',         // 删除
  save: '💾',           // 保存
  download: '📥',        // 下载
  upload: '📤',          // 上传
  copy: '📋',           // 复制
  refresh: '🔄',         // 刷新
  settings: '⚙️',       // 设置
  search: '🔍',         // 搜索
};
```

### 🎪 组件美化实践

#### 🎯 按钮美化标准
```typescript
// ✅ 推荐：标准按钮美化模式
const ActionButton = ({ emoji, text, variant, ...props }) => (
  <Button 
    variant={variant}
    className={cn(
      variant === 'default' && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      "transition-all duration-200 hover:scale-105"
    )}
    {...props}
  >
    <span className="mr-2">{emoji}</span>
    {text}
  </Button>
);

// 使用示例
<ActionButton emoji="🚀" text="开始压缩" />
<ActionButton emoji="💾" text="保存" variant="outline" />
<ActionButton emoji="⚙️" text="设置" variant="ghost" />
```

#### 📋 卡片美化标准
```typescript
// ✅ 推荐：标准卡片美化模式
const FeatureCard = ({ icon, title, description, color }) => (
  <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-6">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
```

#### 📊 数据展示美化
```typescript
// ✅ 推荐：数据展示美化
const StatsCard = ({ emoji, value, label, color }) => (
  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
    <div className="text-3xl mb-2">{emoji}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
```

### 🎬 动效使用规范

#### ✨ 基础动效
```typescript
// ✅ 推荐：微交互动效
const InteractiveIcon = ({ emoji, children }) => (
  <div className="group">
    <span className="text-2xl transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 inline-block">
      {emoji}
    </span>
    {children}
  </div>
);
```

#### 🎉 成功动画
```typescript
// ✅ 推荐：成功状态动画
const SuccessMessage = () => (
  <div className="flex flex-col items-center p-8 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
    <div className="text-6xl mb-4 animate-bounce">🎉</div>
    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
      处理完成！
    </h3>
  </div>
);
```

#### ⚡ 加载状态
```typescript
// ✅ 推荐：加载状态美化
const LoadingIndicator = () => (
  <div className="flex items-center space-x-3">
    <div className="flex space-x-1">
      <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🌟</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>✨</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>💫</span>
    </div>
    <span className="text-muted-foreground">处理中...</span>
  </div>
);
```

### 📱 响应式美化

#### 🎨 响应式Emoji
```typescript
// ✅ 推荐：响应式图标大小
const ResponsiveEmoji = ({ emoji, size = 'base' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <span className={`${sizeClasses[size]} sm:text-lg md:text-xl lg:text-2xl`}>
      {emoji}
    </span>
  );
};
```

### 🚀 实施检查清单

实现组件时请使用以下检查清单：

#### 🎨 视觉设计
- [ ] 🌈 颜色使用是否符合情感色彩映射？
- [ ] 😊 Emoji 使用是否一致且相关？
- [ ] 🎭 渐变效果是否增强视觉层次？
- [ ] ✨ 动效是否适度且有意义？

#### 📱 响应式设计
- [ ] 📏 在移动端显示是否正常？
- [ ] 🖥️ 在桌面端显示是否优秀？
- [ ] 📱 Emoji 大小是否适配不同屏幕？

#### ♿ 可访问性
- [ ] 🔍 屏幕阅读器能否识别emoji？
- [ ] 🎨 颜色对比度是否足够？
- [ ] ⚡ 动效是否会导致晕动症？

#### 🎯 功能完整性
- [ ] 🎯 美化是否影响功能使用？
- [ ] ⚡ 性能是否因美化而降低？
- [ ] 💾 加载速度是否仍然快速？

> 💡 **注意**：更多详细的美化指南请参考 [文案设计规范](./content-design-standards.md)

---

通过遵循这些严格的架构要求和开发规范，Twinkle Tools 将具有高度的可维护性、可扩展性和团队协作效率。

---

## 🎨 文案美化要求 🌟

### 💡 核心理念
- **🎯 情感化设计**：通过色彩和emoji传达正确的情感状态
- **🌈 视觉层次**：使用渐变色和对比度建立清晰的视觉层次
- **✨ 适度装饰**：美化元素要适度，不能影响功能使用
- **♿ 包容性设计**：确保所有用户都能正常使用，包括辅助功能用户

### 🎨 色彩使用规范

#### 🌈 情感色彩映射
| 状态 | 颜色 | Emoji | 使用场景 |
|------|------|-------|---------|
| 🎉 成功完成 | `green-500` | ✅ | 任务完成、操作成功 |
| ⚡️ 进行中 | `blue-500` | ⏳ | 加载状态、处理中 |
| ⚠️ 需注意 | `yellow-500` | ⚠️ | 警告提示、注意事项 |
| 🚫 错误失败 | `red-500` | ❌ | 错误提示、失败状态 |
| 💡 信息提示 | `purple-500` | ℹ️ | 帮助信息、功能说明 |
| 🎨 主要操作 | `gradient-to-r from-blue-500 to-purple-600` | 🚀 | 主要按钮、核心功能 |

#### 🎭 渐变色应用
```typescript
// ✅ 推荐：使用渐变增强视觉层次
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    渐变标题效果
  </h3>
</div>
```

### 😊 Emoji 使用规范

#### 🏷️ 分类标识系统
```typescript
// 🎯 工具分类 emoji 映射
const TOOL_EMOJIS = {
  calculator: '🧮',      // 计算器类
  colorPicker: '🎨',     // 颜色选择器
  textFormatter: '📝',    // 文本格式化
  timer: '⏰',           // 倒计时器
  imageCompressor: '🖼️',  // 图片压缩
  passwordGenerator: '🔐', // 密码生成器
  jsonFormatter: '💻',    // JSON格式化
  qrCode: '📱',         // 二维码
};
```

#### 📊 状态指示系统
```typescript
// 🎯 状态 emoji 系统
const STATUS_EMOJIS = {
  idle: '💤',           // 空闲状态
  loading: '⏳',        // 加载中
  processing: '⚡️',     // 处理中
  success: '✅',        // 成功
  error: '❌',          // 错误
  warning: '⚠️',       // 警告
  info: 'ℹ️',          // 信息
  completed: '🎉',      // 完成
};
```

#### 🚀 动作指示系统
```typescript
// 🎯 动作 emoji 系统
const ACTION_EMOJIS = {
  create: '➕',         // 创建
  edit: '✏️',           // 编辑
  delete: '🗑️',         // 删除
  save: '💾',           // 保存
  download: '📥',        // 下载
  upload: '📤',          // 上传
  copy: '📋',           // 复制
  refresh: '🔄',         // 刷新
  settings: '⚙️',       // 设置
  search: '🔍',         // 搜索
};
```

### 🎪 组件美化实践

#### 🎯 按钮美化标准
```typescript
// ✅ 推荐：标准按钮美化模式
const ActionButton = ({ emoji, text, variant, ...props }) => (
  <Button 
    variant={variant}
    className={cn(
      variant === 'default' && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      "transition-all duration-200 hover:scale-105"
    )}
    {...props}
  >
    <span className="mr-2">{emoji}</span>
    {text}
  </Button>
);

// 使用示例
<ActionButton emoji="🚀" text="开始压缩" />
<ActionButton emoji="💾" text="保存" variant="outline" />
<ActionButton emoji="⚙️" text="设置" variant="ghost" />
```

#### 📋 卡片美化标准
```typescript
// ✅ 推荐：标准卡片美化模式
const FeatureCard = ({ icon, title, description, color }) => (
  <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-6">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
```

#### 📊 数据展示美化
```typescript
// ✅ 推荐：数据展示美化
const StatsCard = ({ emoji, value, label, color }) => (
  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
    <div className="text-3xl mb-2">{emoji}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
```

### 🎬 动效使用规范

#### ✨ 基础动效
```typescript
// ✅ 推荐：微交互动效
const InteractiveIcon = ({ emoji, children }) => (
  <div className="group">
    <span className="text-2xl transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 inline-block">
      {emoji}
    </span>
    {children}
  </div>
);
```

#### 🎉 成功动画
```typescript
// ✅ 推荐：成功状态动画
const SuccessMessage = () => (
  <div className="flex flex-col items-center p-8 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
    <div className="text-6xl mb-4 animate-bounce">🎉</div>
    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
      处理完成！
    </h3>
  </div>
);
```

#### ⚡ 加载状态
```typescript
// ✅ 推荐：加载状态美化
const LoadingIndicator = () => (
  <div className="flex items-center space-x-3">
    <div className="flex space-x-1">
      <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🌟</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>✨</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>💫</span>
    </div>
    <span className="text-muted-foreground">处理中...</span>
  </div>
);
```

### 📱 响应式美化

#### 🎨 响应式Emoji
```typescript
// ✅ 推荐：响应式图标大小
const ResponsiveEmoji = ({ emoji, size = 'base' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <span className={`${sizeClasses[size]} sm:text-lg md:text-xl lg:text-2xl`}>
      {emoji}
    </span>
  );
};
```

### 🚀 实施检查清单

实现组件时请使用以下检查清单：

#### 🎨 视觉设计
- [ ] 🌈 颜色使用是否符合情感色彩映射？
- [ ] 😊 Emoji 使用是否一致且相关？
- [ ] 🎭 渐变效果是否增强视觉层次？
- [ ] ✨ 动效是否适度且有意义？

#### 📱 响应式设计
- [ ] 📏 在移动端显示是否正常？
- [ ] 🖥️ 在桌面端显示是否优秀？
- [ ] 📱 Emoji 大小是否适配不同屏幕？

#### ♿ 可访问性
- [ ] 🔍 屏幕阅读器能否识别emoji？
- [ ] 🎨 颜色对比度是否足够？
- [ ] ⚡ 动效是否会导致晕动症？

#### 🎯 功能完整性
- [ ] 🎯 美化是否影响功能使用？
- [ ] ⚡ 性能是否因美化而降低？
- [ ] 💾 加载速度是否仍然快速？

> 💡 **注意**：更多详细的美化指南请参考 [文案设计规范](./content-design-standards.md)

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

## 🎨 文案美化要求 🌟

### 💡 核心理念
- **🎯 情感化设计**：通过色彩和emoji传达正确的情感状态
- **🌈 视觉层次**：使用渐变色和对比度建立清晰的视觉层次
- **✨ 适度装饰**：美化元素要适度，不能影响功能使用
- **♿ 包容性设计**：确保所有用户都能正常使用，包括辅助功能用户

### 🎨 色彩使用规范

#### 🌈 情感色彩映射
| 状态 | 颜色 | Emoji | 使用场景 |
|------|------|-------|---------|
| 🎉 成功完成 | `green-500` | ✅ | 任务完成、操作成功 |
| ⚡️ 进行中 | `blue-500` | ⏳ | 加载状态、处理中 |
| ⚠️ 需注意 | `yellow-500` | ⚠️ | 警告提示、注意事项 |
| 🚫 错误失败 | `red-500` | ❌ | 错误提示、失败状态 |
| 💡 信息提示 | `purple-500` | ℹ️ | 帮助信息、功能说明 |
| 🎨 主要操作 | `gradient-to-r from-blue-500 to-purple-600` | 🚀 | 主要按钮、核心功能 |

#### 🎭 渐变色应用
```typescript
// ✅ 推荐：使用渐变增强视觉层次
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    渐变标题效果
  </h3>
</div>
```

### 😊 Emoji 使用规范

#### 🏷️ 分类标识系统
```typescript
// 🎯 工具分类 emoji 映射
const TOOL_EMOJIS = {
  calculator: '🧮',      // 计算器类
  colorPicker: '🎨',     // 颜色选择器
  textFormatter: '📝',    // 文本格式化
  timer: '⏰',           // 倒计时器
  imageCompressor: '🖼️',  // 图片压缩
  passwordGenerator: '🔐', // 密码生成器
  jsonFormatter: '💻',    // JSON格式化
  qrCode: '📱',         // 二维码
};
```

#### 📊 状态指示系统
```typescript
// 🎯 状态 emoji 系统
const STATUS_EMOJIS = {
  idle: '💤',           // 空闲状态
  loading: '⏳',        // 加载中
  processing: '⚡️',     // 处理中
  success: '✅',        // 成功
  error: '❌',          // 错误
  warning: '⚠️',       // 警告
  info: 'ℹ️',          // 信息
  completed: '🎉',      // 完成
};
```

#### 🚀 动作指示系统
```typescript
// 🎯 动作 emoji 系统
const ACTION_EMOJIS = {
  create: '➕',         // 创建
  edit: '✏️',           // 编辑
  delete: '🗑️',         // 删除
  save: '💾',           // 保存
  download: '📥',        // 下载
  upload: '📤',          // 上传
  copy: '📋',           // 复制
  refresh: '🔄',         // 刷新
  settings: '⚙️',       // 设置
  search: '🔍',         // 搜索
};
```

### 🎪 组件美化实践

#### 🎯 按钮美化标准
```typescript
// ✅ 推荐：标准按钮美化模式
const ActionButton = ({ emoji, text, variant, ...props }) => (
  <Button 
    variant={variant}
    className={cn(
      variant === 'default' && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      "transition-all duration-200 hover:scale-105"
    )}
    {...props}
  >
    <span className="mr-2">{emoji}</span>
    {text}
  </Button>
);

// 使用示例
<ActionButton emoji="🚀" text="开始压缩" />
<ActionButton emoji="💾" text="保存" variant="outline" />
<ActionButton emoji="⚙️" text="设置" variant="ghost" />
```

#### 📋 卡片美化标准
```typescript
// ✅ 推荐：标准卡片美化模式
const FeatureCard = ({ icon, title, description, color }) => (
  <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-6">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
```

#### 📊 数据展示美化
```typescript
// ✅ 推荐：数据展示美化
const StatsCard = ({ emoji, value, label, color }) => (
  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
    <div className="text-3xl mb-2">{emoji}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
```

### 🎬 动效使用规范

#### ✨ 基础动效
```typescript
// ✅ 推荐：微交互动效
const InteractiveIcon = ({ emoji, children }) => (
  <div className="group">
    <span className="text-2xl transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 inline-block">
      {emoji}
    </span>
    {children}
  </div>
);
```

#### 🎉 成功动画
```typescript
// ✅ 推荐：成功状态动画
const SuccessMessage = () => (
  <div className="flex flex-col items-center p-8 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
    <div className="text-6xl mb-4 animate-bounce">🎉</div>
    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
      处理完成！
    </h3>
  </div>
);
```

#### ⚡ 加载状态
```typescript
// ✅ 推荐：加载状态美化
const LoadingIndicator = () => (
  <div className="flex items-center space-x-3">
    <div className="flex space-x-1">
      <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🌟</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>✨</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>💫</span>
    </div>
    <span className="text-muted-foreground">处理中...</span>
  </div>
);
```

### 📱 响应式美化

#### 🎨 响应式Emoji
```typescript
// ✅ 推荐：响应式图标大小
const ResponsiveEmoji = ({ emoji, size = 'base' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <span className={`${sizeClasses[size]} sm:text-lg md:text-xl lg:text-2xl`}>
      {emoji}
    </span>
  );
};
```

### 🚀 实施检查清单

实现组件时请使用以下检查清单：

#### 🎨 视觉设计
- [ ] 🌈 颜色使用是否符合情感色彩映射？
- [ ] 😊 Emoji 使用是否一致且相关？
- [ ] 🎭 渐变效果是否增强视觉层次？
- [ ] ✨ 动效是否适度且有意义？

#### 📱 响应式设计
- [ ] 📏 在移动端显示是否正常？
- [ ] 🖥️ 在桌面端显示是否优秀？
- [ ] 📱 Emoji 大小是否适配不同屏幕？

#### ♿ 可访问性
- [ ] 🔍 屏幕阅读器能否识别emoji？
- [ ] 🎨 颜色对比度是否足够？
- [ ] ⚡ 动效是否会导致晕动症？

#### 🎯 功能完整性
- [ ] 🎯 美化是否影响功能使用？
- [ ] ⚡ 性能是否因美化而降低？
- [ ] 💾 加载速度是否仍然快速？

> 💡 **注意**：更多详细的美化指南请参考 [文案设计规范](./content-design-standards.md)

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

## 🎨 文案美化要求 🌟

### 💡 核心理念
- **🎯 情感化设计**：通过色彩和emoji传达正确的情感状态
- **🌈 视觉层次**：使用渐变色和对比度建立清晰的视觉层次
- **✨ 适度装饰**：美化元素要适度，不能影响功能使用
- **♿ 包容性设计**：确保所有用户都能正常使用，包括辅助功能用户

### 🎨 色彩使用规范

#### 🌈 情感色彩映射
| 状态 | 颜色 | Emoji | 使用场景 |
|------|------|-------|---------|
| 🎉 成功完成 | `green-500` | ✅ | 任务完成、操作成功 |
| ⚡️ 进行中 | `blue-500` | ⏳ | 加载状态、处理中 |
| ⚠️ 需注意 | `yellow-500` | ⚠️ | 警告提示、注意事项 |
| 🚫 错误失败 | `red-500` | ❌ | 错误提示、失败状态 |
| 💡 信息提示 | `purple-500` | ℹ️ | 帮助信息、功能说明 |
| 🎨 主要操作 | `gradient-to-r from-blue-500 to-purple-600` | 🚀 | 主要按钮、核心功能 |

#### 🎭 渐变色应用
```typescript
// ✅ 推荐：使用渐变增强视觉层次
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    渐变标题效果
  </h3>
</div>
```

### 😊 Emoji 使用规范

#### 🏷️ 分类标识系统
```typescript
// 🎯 工具分类 emoji 映射
const TOOL_EMOJIS = {
  calculator: '🧮',      // 计算器类
  colorPicker: '🎨',     // 颜色选择器
  textFormatter: '📝',    // 文本格式化
  timer: '⏰',           // 倒计时器
  imageCompressor: '🖼️',  // 图片压缩
  passwordGenerator: '🔐', // 密码生成器
  jsonFormatter: '💻',    // JSON格式化
  qrCode: '📱',         // 二维码
};
```

#### 📊 状态指示系统
```typescript
// 🎯 状态 emoji 系统
const STATUS_EMOJIS = {
  idle: '💤',           // 空闲状态
  loading: '⏳',        // 加载中
  processing: '⚡️',     // 处理中
  success: '✅',        // 成功
  error: '❌',          // 错误
  warning: '⚠️',       // 警告
  info: 'ℹ️',          // 信息
  completed: '🎉',      // 完成
};
```

#### 🚀 动作指示系统
```typescript
// 🎯 动作 emoji 系统
const ACTION_EMOJIS = {
  create: '➕',         // 创建
  edit: '✏️',           // 编辑
  delete: '🗑️',         // 删除
  save: '💾',           // 保存
  download: '📥',        // 下载
  upload: '📤',          // 上传
  copy: '📋',           // 复制
  refresh: '🔄',         // 刷新
  settings: '⚙️',       // 设置
  search: '🔍',         // 搜索
};
```

### 🎪 组件美化实践

#### 🎯 按钮美化标准
```typescript
// ✅ 推荐：标准按钮美化模式
const ActionButton = ({ emoji, text, variant, ...props }) => (
  <Button 
    variant={variant}
    className={cn(
      variant === 'default' && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      "transition-all duration-200 hover:scale-105"
    )}
    {...props}
  >
    <span className="mr-2">{emoji}</span>
    {text}
  </Button>
);

// 使用示例
<ActionButton emoji="🚀" text="开始压缩" />
<ActionButton emoji="💾" text="保存" variant="outline" />
<ActionButton emoji="⚙️" text="设置" variant="ghost" />
```

#### 📋 卡片美化标准
```typescript
// ✅ 推荐：标准卡片美化模式
const FeatureCard = ({ icon, title, description, color }) => (
  <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-6">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
```

#### 📊 数据展示美化
```typescript
// ✅ 推荐：数据展示美化
const StatsCard = ({ emoji, value, label, color }) => (
  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
    <div className="text-3xl mb-2">{emoji}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
```

### 🎬 动效使用规范

#### ✨ 基础动效
```typescript
// ✅ 推荐：微交互动效
const InteractiveIcon = ({ emoji, children }) => (
  <div className="group">
    <span className="text-2xl transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 inline-block">
      {emoji}
    </span>
    {children}
  </div>
);
```

#### 🎉 成功动画
```typescript
// ✅ 推荐：成功状态动画
const SuccessMessage = () => (
  <div className="flex flex-col items-center p-8 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
    <div className="text-6xl mb-4 animate-bounce">🎉</div>
    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
      处理完成！
    </h3>
  </div>
);
```

#### ⚡ 加载状态
```typescript
// ✅ 推荐：加载状态美化
const LoadingIndicator = () => (
  <div className="flex items-center space-x-3">
    <div className="flex space-x-1">
      <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🌟</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>✨</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>💫</span>
    </div>
    <span className="text-muted-foreground">处理中...</span>
  </div>
);
```

### 📱 响应式美化

#### 🎨 响应式Emoji
```typescript
// ✅ 推荐：响应式图标大小
const ResponsiveEmoji = ({ emoji, size = 'base' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <span className={`${sizeClasses[size]} sm:text-lg md:text-xl lg:text-2xl`}>
      {emoji}
    </span>
  );
};
```

### 🚀 实施检查清单

实现组件时请使用以下检查清单：

#### 🎨 视觉设计
- [ ] 🌈 颜色使用是否符合情感色彩映射？
- [ ] 😊 Emoji 使用是否一致且相关？
- [ ] 🎭 渐变效果是否增强视觉层次？
- [ ] ✨ 动效是否适度且有意义？

#### 📱 响应式设计
- [ ] 📏 在移动端显示是否正常？
- [ ] 🖥️ 在桌面端显示是否优秀？
- [ ] 📱 Emoji 大小是否适配不同屏幕？

#### ♿ 可访问性
- [ ] 🔍 屏幕阅读器能否识别emoji？
- [ ] 🎨 颜色对比度是否足够？
- [ ] ⚡ 动效是否会导致晕动症？

#### 🎯 功能完整性
- [ ] 🎯 美化是否影响功能使用？
- [ ] ⚡ 性能是否因美化而降低？
- [ ] 💾 加载速度是否仍然快速？

> 💡 **注意**：更多详细的美化指南请参考 [文案设计规范](./content-design-standards.md)

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

## 🎨 文案美化要求 🌟

### 💡 核心理念
- **🎯 情感化设计**：通过色彩和emoji传达正确的情感状态
- **🌈 视觉层次**：使用渐变色和对比度建立清晰的视觉层次
- **✨ 适度装饰**：美化元素要适度，不能影响功能使用
- **♿ 包容性设计**：确保所有用户都能正常使用，包括辅助功能用户

### 🎨 色彩使用规范

#### 🌈 情感色彩映射
| 状态 | 颜色 | Emoji | 使用场景 |
|------|------|-------|---------|
| 🎉 成功完成 | `green-500` | ✅ | 任务完成、操作成功 |
| ⚡️ 进行中 | `blue-500` | ⏳ | 加载状态、处理中 |
| ⚠️ 需注意 | `yellow-500` | ⚠️ | 警告提示、注意事项 |
| 🚫 错误失败 | `red-500` | ❌ | 错误提示、失败状态 |
| 💡 信息提示 | `purple-500` | ℹ️ | 帮助信息、功能说明 |
| 🎨 主要操作 | `gradient-to-r from-blue-500 to-purple-600` | 🚀 | 主要按钮、核心功能 |

#### 🎭 渐变色应用
```typescript
// ✅ 推荐：使用渐变增强视觉层次
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    渐变标题效果
  </h3>
</div>
```

### 😊 Emoji 使用规范

#### 🏷️ 分类标识系统
```typescript
// 🎯 工具分类 emoji 映射
const TOOL_EMOJIS = {
  calculator: '🧮',      // 计算器类
  colorPicker: '🎨',     // 颜色选择器
  textFormatter: '📝',    // 文本格式化
  timer: '⏰',           // 倒计时器
  imageCompressor: '🖼️',  // 图片压缩
  passwordGenerator: '🔐', // 密码生成器
  jsonFormatter: '💻',    // JSON格式化
  qrCode: '📱',         // 二维码
};
```

#### 📊 状态指示系统
```typescript
// 🎯 状态 emoji 系统
const STATUS_EMOJIS = {
  idle: '💤',           // 空闲状态
  loading: '⏳',        // 加载中
  processing: '⚡️',     // 处理中
  success: '✅',        // 成功
  error: '❌',          // 错误
  warning: '⚠️',       // 警告
  info: 'ℹ️',          // 信息
  completed: '🎉',      // 完成
};
```

#### 🚀 动作指示系统
```typescript
// 🎯 动作 emoji 系统
const ACTION_EMOJIS = {
  create: '➕',         // 创建
  edit: '✏️',           // 编辑
  delete: '🗑️',         // 删除
  save: '💾',           // 保存
  download: '📥',        // 下载
  upload: '📤',          // 上传
  copy: '📋',           // 复制
  refresh: '🔄',         // 刷新
  settings: '⚙️',       // 设置
  search: '🔍',         // 搜索
};
```

### 🎪 组件美化实践

#### 🎯 按钮美化标准
```typescript
// ✅ 推荐：标准按钮美化模式
const ActionButton = ({ emoji, text, variant, ...props }) => (
  <Button 
    variant={variant}
    className={cn(
      variant === 'default' && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      "transition-all duration-200 hover:scale-105"
    )}
    {...props}
  >
    <span className="mr-2">{emoji}</span>
    {text}
  </Button>
);

// 使用示例
<ActionButton emoji="🚀" text="开始压缩" />
<ActionButton emoji="💾" text="保存" variant="outline" />
<ActionButton emoji="⚙️" text="设置" variant="ghost" />
```

#### 📋 卡片美化标准
```typescript
// ✅ 推荐：标准卡片美化模式
const FeatureCard = ({ icon, title, description, color }) => (
  <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-6">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
```

#### 📊 数据展示美化
```typescript
// ✅ 推荐：数据展示美化
const StatsCard = ({ emoji, value, label, color }) => (
  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
    <div className="text-3xl mb-2">{emoji}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
```

### 🎬 动效使用规范

#### ✨ 基础动效
```typescript
// ✅ 推荐：微交互动效
const InteractiveIcon = ({ emoji, children }) => (
  <div className="group">
    <span className="text-2xl transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 inline-block">
      {emoji}
    </span>
    {children}
  </div>
);
```

#### 🎉 成功动画
```typescript
// ✅ 推荐：成功状态动画
const SuccessMessage = () => (
  <div className="flex flex-col items-center p-8 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
    <div className="text-6xl mb-4 animate-bounce">🎉</div>
    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
      处理完成！
    </h3>
  </div>
);
```

#### ⚡ 加载状态
```typescript
// ✅ 推荐：加载状态美化
const LoadingIndicator = () => (
  <div className="flex items-center space-x-3">
    <div className="flex space-x-1">
      <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🌟</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>✨</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>💫</span>
    </div>
    <span className="text-muted-foreground">处理中...</span>
  </div>
);
```

### 📱 响应式美化

#### 🎨 响应式Emoji
```typescript
// ✅ 推荐：响应式图标大小
const ResponsiveEmoji = ({ emoji, size = 'base' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <span className={`${sizeClasses[size]} sm:text-lg md:text-xl lg:text-2xl`}>
      {emoji}
    </span>
  );
};
```

### 🚀 实施检查清单

实现组件时请使用以下检查清单：

#### 🎨 视觉设计
- [ ] 🌈 颜色使用是否符合情感色彩映射？
- [ ] 😊 Emoji 使用是否一致且相关？
- [ ] 🎭 渐变效果是否增强视觉层次？
- [ ] ✨ 动效是否适度且有意义？

#### 📱 响应式设计
- [ ] 📏 在移动端显示是否正常？
- [ ] 🖥️ 在桌面端显示是否优秀？
- [ ] 📱 Emoji 大小是否适配不同屏幕？

#### ♿ 可访问性
- [ ] 🔍 屏幕阅读器能否识别emoji？
- [ ] 🎨 颜色对比度是否足够？
- [ ] ⚡ 动效是否会导致晕动症？

#### 🎯 功能完整性
- [ ] 🎯 美化是否影响功能使用？
- [ ] ⚡ 性能是否因美化而降低？
- [ ] 💾 加载速度是否仍然快速？

> 💡 **注意**：更多详细的美化指南请参考 [文案设计规范](./content-design-standards.md)

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

## 🎨 文案美化要求 🌟

### 💡 核心理念
- **🎯 情感化设计**：通过色彩和emoji传达正确的情感状态
- **🌈 视觉层次**：使用渐变色和对比度建立清晰的视觉层次
- **✨ 适度装饰**：美化元素要适度，不能影响功能使用
- **♿ 包容性设计**：确保所有用户都能正常使用，包括辅助功能用户

### 🎨 色彩使用规范

#### 🌈 情感色彩映射
| 状态 | 颜色 | Emoji | 使用场景 |
|------|------|-------|---------|
| 🎉 成功完成 | `green-500` | ✅ | 任务完成、操作成功 |
| ⚡️ 进行中 | `blue-500` | ⏳ | 加载状态、处理中 |
| ⚠️ 需注意 | `yellow-500` | ⚠️ | 警告提示、注意事项 |
| 🚫 错误失败 | `red-500` | ❌ | 错误提示、失败状态 |
| 💡 信息提示 | `purple-500` | ℹ️ | 帮助信息、功能说明 |
| 🎨 主要操作 | `gradient-to-r from-blue-500 to-purple-600` | 🚀 | 主要按钮、核心功能 |

#### 🎭 渐变色应用
```typescript
// ✅ 推荐：使用渐变增强视觉层次
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    渐变标题效果
  </h3>
</div>
```

### 😊 Emoji 使用规范

#### 🏷️ 分类标识系统
```typescript
// 🎯 工具分类 emoji 映射
const TOOL_EMOJIS = {
  calculator: '🧮',      // 计算器类
  colorPicker: '🎨',     // 颜色选择器
  textFormatter: '📝',    // 文本格式化
  timer: '⏰',           // 倒计时器
  imageCompressor: '🖼️',  // 图片压缩
  passwordGenerator: '🔐', // 密码生成器
  jsonFormatter: '💻',    // JSON格式化
  qrCode: '📱',         // 二维码
};
```

#### 📊 状态指示系统
```typescript
// 🎯 状态 emoji 系统
const STATUS_EMOJIS = {
  idle: '💤',           // 空闲状态
  loading: '⏳',        // 加载中
  processing: '⚡️',     // 处理中
  success: '✅',        // 成功
  error: '❌',          // 错误
  warning: '⚠️',       // 警告
  info: 'ℹ️',          // 信息
  completed: '🎉',      // 完成
};
```

#### 🚀 动作指示系统
```typescript
// 🎯 动作 emoji 系统
const ACTION_EMOJIS = {
  create: '➕',         // 创建
  edit: '✏️',           // 编辑
  delete: '🗑️',         // 删除
  save: '💾',           // 保存
  download: '📥',        // 下载
  upload: '📤',          // 上传
  copy: '📋',           // 复制
  refresh: '🔄',         // 刷新
  settings: '⚙️',       // 设置
  search: '🔍',         // 搜索
};
```

### 🎪 组件美化实践

#### 🎯 按钮美化标准
```typescript
// ✅ 推荐：标准按钮美化模式
const ActionButton = ({ emoji, text, variant, ...props }) => (
  <Button 
    variant={variant}
    className={cn(
      variant === 'default' && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      "transition-all duration-200 hover:scale-105"
    )}
    {...props}
  >
    <span className="mr-2">{emoji}</span>
    {text}
  </Button>
);

// 使用示例
<ActionButton emoji="🚀" text="开始压缩" />
<ActionButton emoji="💾" text="保存" variant="outline" />
<ActionButton emoji="⚙️" text="设置" variant="ghost" />
```

#### 📋 卡片美化标准
```typescript
// ✅ 推荐：标准卡片美化模式
const FeatureCard = ({ icon, title, description, color }) => (
  <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-6">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
```

#### 📊 数据展示美化
```typescript
// ✅ 推荐：数据展示美化
const StatsCard = ({ emoji, value, label, color }) => (
  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
    <div className="text-3xl mb-2">{emoji}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
```

### 🎬 动效使用规范

#### ✨ 基础动效
```typescript
// ✅ 推荐：微交互动效
const InteractiveIcon = ({ emoji, children }) => (
  <div className="group">
    <span className="text-2xl transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 inline-block">
      {emoji}
    </span>
    {children}
  </div>
);
```

#### 🎉 成功动画
```typescript
// ✅ 推荐：成功状态动画
const SuccessMessage = () => (
  <div className="flex flex-col items-center p-8 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
    <div className="text-6xl mb-4 animate-bounce">🎉</div>
    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
      处理完成！
    </h3>
  </div>
);
```

#### ⚡ 加载状态
```typescript
// ✅ 推荐：加载状态美化
const LoadingIndicator = () => (
  <div className="flex items-center space-x-3">
    <div className="flex space-x-1">
      <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🌟</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>✨</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>💫</span>
    </div>
    <span className="text-muted-foreground">处理中...</span>
  </div>
);
```

### 📱 响应式美化

#### 🎨 响应式Emoji
```typescript
// ✅ 推荐：响应式图标大小
const ResponsiveEmoji = ({ emoji, size = 'base' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <span className={`${sizeClasses[size]} sm:text-lg md:text-xl lg:text-2xl`}>
      {emoji}
    </span>
  );
};
```

### 🚀 实施检查清单

实现组件时请使用以下检查清单：

#### 🎨 视觉设计
- [ ] 🌈 颜色使用是否符合情感色彩映射？
- [ ] 😊 Emoji 使用是否一致且相关？
- [ ] 🎭 渐变效果是否增强视觉层次？
- [ ] ✨ 动效是否适度且有意义？

#### 📱 响应式设计
- [ ] 📏 在移动端显示是否正常？
- [ ] 🖥️ 在桌面端显示是否优秀？
- [ ] 📱 Emoji 大小是否适配不同屏幕？

#### ♿ 可访问性
- [ ] 🔍 屏幕阅读器能否识别emoji？
- [ ] 🎨 颜色对比度是否足够？
- [ ] ⚡ 动效是否会导致晕动症？

#### 🎯 功能完整性
- [ ] 🎯 美化是否影响功能使用？
- [ ] ⚡ 性能是否因美化而降低？
- [ ] 💾 加载速度是否仍然快速？

> 💡 **注意**：更多详细的美化指南请参考 [文案设计规范](./content-design-standards.md)

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

## 🎨 文案美化要求 🌟

### 💡 核心理念
- **🎯 情感化设计**：通过色彩和emoji传达正确的情感状态
- **🌈 视觉层次**：使用渐变色和对比度建立清晰的视觉层次
- **✨ 适度装饰**：美化元素要适度，不能影响功能使用
- **♿ 包容性设计**：确保所有用户都能正常使用，包括辅助功能用户

### 🎨 色彩使用规范

#### 🌈 情感色彩映射
| 状态 | 颜色 | Emoji | 使用场景 |
|------|------|-------|---------|
| 🎉 成功完成 | `green-500` | ✅ | 任务完成、操作成功 |
| ⚡️ 进行中 | `blue-500` | ⏳ | 加载状态、处理中 |
| ⚠️ 需注意 | `yellow-500` | ⚠️ | 警告提示、注意事项 |
| 🚫 错误失败 | `red-500` | ❌ | 错误提示、失败状态 |
| 💡 信息提示 | `purple-500` | ℹ️ | 帮助信息、功能说明 |
| 🎨 主要操作 | `gradient-to-r from-blue-500 to-purple-600` | 🚀 | 主要按钮、核心功能 |

#### 🎭 渐变色应用
```typescript
// ✅ 推荐：使用渐变增强视觉层次
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    渐变标题效果
  </h3>
</div>
```

### 😊 Emoji 使用规范

#### 🏷️ 分类标识系统
```typescript
// 🎯 工具分类 emoji 映射
const TOOL_EMOJIS = {
  calculator: '🧮',      // 计算器类
  colorPicker: '🎨',     // 颜色选择器
  textFormatter: '📝',    // 文本格式化
  timer: '⏰',           // 倒计时器
  imageCompressor: '🖼️',  // 图片压缩
  passwordGenerator: '🔐', // 密码生成器
  jsonFormatter: '💻',    // JSON格式化
  qrCode: '📱',         // 二维码
};
```

#### 📊 状态指示系统
```typescript
// 🎯 状态 emoji 系统
const STATUS_EMOJIS = {
  idle: '💤',           // 空闲状态
  loading: '⏳',        // 加载中
  processing: '⚡️',     // 处理中
  success: '✅',        // 成功
  error: '❌',          // 错误
  warning: '⚠️',       // 警告
  info: 'ℹ️',          // 信息
  completed: '🎉',      // 完成
};
```

#### 🚀 动作指示系统
```typescript
// 🎯 动作 emoji 系统
const ACTION_EMOJIS = {
  create: '➕',         // 创建
  edit: '✏️',           // 编辑
  delete: '🗑️',         // 删除
  save: '💾',           // 保存
  download: '📥',        // 下载
  upload: '📤',          // 上传
  copy: '📋',           // 复制
  refresh: '🔄',         // 刷新
  settings: '⚙️',       // 设置
  search: '🔍',         // 搜索
};
```

### 🎪 组件美化实践

#### 🎯 按钮美化标准
```typescript
// ✅ 推荐：标准按钮美化模式
const ActionButton = ({ emoji, text, variant, ...props }) => (
  <Button 
    variant={variant}
    className={cn(
      variant === 'default' && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      "transition-all duration-200 hover:scale-105"
    )}
    {...props}
  >
    <span className="mr-2">{emoji}</span>
    {text}
  </Button>
);

// 使用示例
<ActionButton emoji="🚀" text="开始压缩" />
<ActionButton emoji="💾" text="保存" variant="outline" />
<ActionButton emoji="⚙️" text="设置" variant="ghost" />
```

#### 📋 卡片美化标准
```typescript
// ✅ 推荐：标准卡片美化模式
const FeatureCard = ({ icon, title, description, color }) => (
  <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-6">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
```

#### 📊 数据展示美化
```typescript
// ✅ 推荐：数据展示美化
const StatsCard = ({ emoji, value, label, color }) => (
  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
    <div className="text-3xl mb-2">{emoji}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
```

### 🎬 动效使用规范

#### ✨ 基础动效
```typescript
// ✅ 推荐：微交互动效
const InteractiveIcon = ({ emoji, children }) => (
  <div className="group">
    <span className="text-2xl transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 inline-block">
      {emoji}
    </span>
    {children}
  </div>
);
```

#### 🎉 成功动画
```typescript
// ✅ 推荐：成功状态动画
const SuccessMessage = () => (
  <div className="flex flex-col items-center p-8 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
    <div className="text-6xl mb-4 animate-bounce">🎉</div>
    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
      处理完成！
    </h3>
  </div>
);
```

#### ⚡ 加载状态
```typescript
// ✅ 推荐：加载状态美化
const LoadingIndicator = () => (
  <div className="flex items-center space-x-3">
    <div className="flex space-x-1">
      <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🌟</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>✨</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>💫</span>
    </div>
    <span className="text-muted-foreground">处理中...</span>
  </div>
);
```

### 📱 响应式美化

#### 🎨 响应式Emoji
```typescript
// ✅ 推荐：响应式图标大小
const ResponsiveEmoji = ({ emoji, size = 'base' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <span className={`${sizeClasses[size]} sm:text-lg md:text-xl lg:text-2xl`}>
      {emoji}
    </span>
  );
};
```

### 🚀 实施检查清单

实现组件时请使用以下检查清单：

#### 🎨 视觉设计
- [ ] 🌈 颜色使用是否符合情感色彩映射？
- [ ] 😊 Emoji 使用是否一致且相关？
- [ ] 🎭 渐变效果是否增强视觉层次？
- [ ] ✨ 动效是否适度且有意义？

#### 📱 响应式设计
- [ ] 📏 在移动端显示是否正常？
- [ ] 🖥️ 在桌面端显示是否优秀？
- [ ] 📱 Emoji 大小是否适配不同屏幕？

#### ♿ 可访问性
- [ ] 🔍 屏幕阅读器能否识别emoji？
- [ ] 🎨 颜色对比度是否足够？
- [ ] ⚡ 动效是否会导致晕动症？

#### 🎯 功能完整性
- [ ] 🎯 美化是否影响功能使用？
- [ ] ⚡ 性能是否因美化而降低？
- [ ] 💾 加载速度是否仍然快速？

> 💡 **注意**：更多详细的美化指南请参考 [文案设计规范](./content-design-standards.md)

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

## 🎨 文案美化要求 🌟

### 💡 核心理念
- **🎯 情感化设计**：通过色彩和emoji传达正确的情感状态
- **🌈 视觉层次**：使用渐变色和对比度建立清晰的视觉层次
- **✨ 适度装饰**：美化元素要适度，不能影响功能使用
- **♿ 包容性设计**：确保所有用户都能正常使用，包括辅助功能用户

### 🎨 色彩使用规范

#### 🌈 情感色彩映射
| 状态 | 颜色 | Emoji | 使用场景 |
|------|------|-------|---------|
| 🎉 成功完成 | `green-500` | ✅ | 任务完成、操作成功 |
| ⚡️ 进行中 | `blue-500` | ⏳ | 加载状态、处理中 |
| ⚠️ 需注意 | `yellow-500` | ⚠️ | 警告提示、注意事项 |
| 🚫 错误失败 | `red-500` | ❌ | 错误提示、失败状态 |
| 💡 信息提示 | `purple-500` | ℹ️ | 帮助信息、功能说明 |
| 🎨 主要操作 | `gradient-to-r from-blue-500 to-purple-600` | 🚀 | 主要按钮、核心功能 |

#### 🎭 渐变色应用
```typescript
// ✅ 推荐：使用渐变增强视觉层次
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    渐变标题效果
  </h3>
</div>
```

### 😊 Emoji 使用规范

#### 🏷️ 分类标识系统
```typescript
// 🎯 工具分类 emoji 映射
const TOOL_EMOJIS = {
  calculator: '🧮',      // 计算器类
  colorPicker: '🎨',     // 颜色选择器
  textFormatter: '📝',    // 文本格式化
  timer: '⏰',           // 倒计时器
  imageCompressor: '🖼️',  // 图片压缩
  passwordGenerator: '🔐', // 密码生成器
  jsonFormatter: '💻',    // JSON格式化
  qrCode: '📱',         // 二维码
};
```

#### 📊 状态指示系统
```typescript
// 🎯 状态 emoji 系统
const STATUS_EMOJIS = {
  idle: '💤',           // 空闲状态
  loading: '⏳',        // 加载中
  processing: '⚡️',     // 处理中
  success: '✅',        // 成功
  error: '❌',          // 错误
  warning: '⚠️',       // 警告
  info: 'ℹ️',          // 信息
  completed: '🎉',      // 完成
};
```

#### 🚀 动作指示系统
```typescript
// 🎯 动作 emoji 系统
const ACTION_EMOJIS = {
  create: '➕',         // 创建
  edit: '✏️',           // 编辑
  delete: '🗑️',         // 删除
  save: '💾',           // 保存
  download: '📥',        // 下载
  upload: '📤',          // 上传
  copy: '📋',           // 复制
  refresh: '🔄',         // 刷新
  settings: '⚙️',       // 设置
  search: '🔍',         // 搜索
};
```

### 🎪 组件美化实践

#### 🎯 按钮美化标准
```typescript
// ✅ 推荐：标准按钮美化模式
const ActionButton = ({ emoji, text, variant, ...props }) => (
  <Button 
    variant={variant}
    className={cn(
      variant === 'default' && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      "transition-all duration-200 hover:scale-105"
    )}
    {...props}
  >
    <span className="mr-2">{emoji}</span>
    {text}
  </Button>
);

// 使用示例
<ActionButton emoji="🚀" text="开始压缩" />
<ActionButton emoji="💾" text="保存" variant="outline" />
<ActionButton emoji="⚙️" text="设置" variant="ghost" />
```

#### 📋 卡片美化标准
```typescript
// ✅ 推荐：标准卡片美化模式
const FeatureCard = ({ icon, title, description, color }) => (
  <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-6">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
```

#### 📊 数据展示美化
```typescript
// ✅ 推荐：数据展示美化
const StatsCard = ({ emoji, value, label, color }) => (
  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
    <div className="text-3xl mb-2">{emoji}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
```

### 🎬 动效使用规范

#### ✨ 基础动效
```typescript
// ✅ 推荐：微交互动效
const InteractiveIcon = ({ emoji, children }) => (
  <div className="group">
    <span className="text-2xl transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 inline-block">
      {emoji}
    </span>
    {children}
  </div>
);
```

#### 🎉 成功动画
```typescript
// ✅ 推荐：成功状态动画
const SuccessMessage = () => (
  <div className="flex flex-col items-center p-8 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
    <div className="text-6xl mb-4 animate-bounce">🎉</div>
    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
      处理完成！
    </h3>
  </div>
);
```

#### ⚡ 加载状态
```typescript
// ✅ 推荐：加载状态美化
const LoadingIndicator = () => (
  <div className="flex items-center space-x-3">
    <div className="flex space-x-1">
      <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🌟</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>✨</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>💫</span>
    </div>
    <span className="text-muted-foreground">处理中...</span>
  </div>
);
```

### 📱 响应式美化

#### 🎨 响应式Emoji
```typescript
// ✅ 推荐：响应式图标大小
const ResponsiveEmoji = ({ emoji, size = 'base' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <span className={`${sizeClasses[size]} sm:text-lg md:text-xl lg:text-2xl`}>
      {emoji}
    </span>
  );
};
```

### 🚀 实施检查清单

实现组件时请使用以下检查清单：

#### 🎨 视觉设计
- [ ] 🌈 颜色使用是否符合情感色彩映射？
- [ ] 😊 Emoji 使用是否一致且相关？
- [ ] 🎭 渐变效果是否增强视觉层次？
- [ ] ✨ 动效是否适度且有意义？

#### 📱 响应式设计
- [ ] 📏 在移动端显示是否正常？
- [ ] 🖥️ 在桌面端显示是否优秀？
- [ ] 📱 Emoji 大小是否适配不同屏幕？

#### ♿ 可访问性
- [ ] 🔍 屏幕阅读器能否识别emoji？
- [ ] 🎨 颜色对比度是否足够？
- [ ] ⚡ 动效是否会导致晕动症？

#### 🎯 功能完整性
- [ ] 🎯 美化是否影响功能使用？
- [ ] ⚡ 性能是否因美化而降低？
- [ ] 💾 加载速度是否仍然快速？

> 💡 **注意**：更多详细的美化指南请参考 [文案设计规范](./content-design-standards.md)

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

## 🎨 文案美化要求 🌟

### 💡 核心理念
- **🎯 情感化设计**：通过色彩和emoji传达正确的情感状态
- **🌈 视觉层次**：使用渐变色和对比度建立清晰的视觉层次
- **✨ 适度装饰**：美化元素要适度，不能影响功能使用
- **♿ 包容性设计**：确保所有用户都能正常使用，包括辅助功能用户

### 🎨 色彩使用规范

#### 🌈 情感色彩映射
| 状态 | 颜色 | Emoji | 使用场景 |
|------|------|-------|---------|
| 🎉 成功完成 | `green-500` | ✅ | 任务完成、操作成功 |
| ⚡️ 进行中 | `blue-500` | ⏳ | 加载状态、处理中 |
| ⚠️ 需注意 | `yellow-500` | ⚠️ | 警告提示、注意事项 |
| 🚫 错误失败 | `red-500` | ❌ | 错误提示、失败状态 |
| 💡 信息提示 | `purple-500` | ℹ️ | 帮助信息、功能说明 |
| 🎨 主要操作 | `gradient-to-r from-blue-500 to-purple-600` | 🚀 | 主要按钮、核心功能 |

#### 🎭 渐变色应用
```typescript
// ✅ 推荐：使用渐变增强视觉层次
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    渐变标题效果
  </h3>
</div>
```

### 😊 Emoji 使用规范

#### 🏷️ 分类标识系统
```typescript
// 🎯 工具分类 emoji 映射
const TOOL_EMOJIS = {
  calculator: '🧮',      // 计算器类
  colorPicker: '🎨',     // 颜色选择器
  textFormatter: '📝',    // 文本格式化
  timer: '⏰',           // 倒计时器
  imageCompressor: '🖼️',  // 图片压缩
  passwordGenerator: '🔐', // 密码生成器
  jsonFormatter: '💻',    // JSON格式化
  qrCode: '📱',         // 二维码
};
```

#### 📊 状态指示系统
```typescript
// 🎯 状态 emoji 系统
const STATUS_EMOJIS = {
  idle: '💤',           // 空闲状态
  loading: '⏳',        // 加载中
  processing: '⚡️',     // 处理中
  success: '✅',        // 成功
  error: '❌',          // 错误
  warning: '⚠️',       // 警告
  info: 'ℹ️',          // 信息
  completed: '🎉',      // 完成
};
```

#### 🚀 动作指示系统
```typescript
// 🎯 动作 emoji 系统
const ACTION_EMOJIS = {
  create: '➕',         // 创建
  edit: '✏️',           // 编辑
  delete: '🗑️',         // 删除
  save: '💾',           // 保存
  download: '📥',        // 下载
  upload: '📤',          // 上传
  copy: '📋',           // 复制
  refresh: '🔄',         // 刷新
  settings: '⚙️',       // 设置
  search: '🔍',         // 搜索
};
```

### 🎪 组件美化实践

#### 🎯 按钮美化标准
```typescript
// ✅ 推荐：标准按钮美化模式
const ActionButton = ({ emoji, text, variant, ...props }) => (
  <Button 
    variant={variant}
    className={cn(
      variant === 'default' && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      "transition-all duration-200 hover:scale-105"
    )}
    {...props}
  >
    <span className="mr-2">{emoji}</span>
    {text}
  </Button>
);

// 使用示例
<ActionButton emoji="🚀" text="开始压缩" />
<ActionButton emoji="💾" text="保存" variant="outline" />
<ActionButton emoji="⚙️" text="设置" variant="ghost" />
```

#### 📋 卡片美化标准
```typescript
// ✅ 推荐：标准卡片美化模式
const FeatureCard = ({ icon, title, description, color }) => (
  <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-6">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
```

#### 📊 数据展示美化
```typescript
// ✅ 推荐：数据展示美化
const StatsCard = ({ emoji, value, label, color }) => (
  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
    <div className="text-3xl mb-2">{emoji}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
```

### 🎬 动效使用规范

#### ✨ 基础动效
```typescript
// ✅ 推荐：微交互动效
const InteractiveIcon = ({ emoji, children }) => (
  <div className="group">
    <span className="text-2xl transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 inline-block">
      {emoji}
    </span>
    {children}
  </div>
);
```

#### 🎉 成功动画
```typescript
// ✅ 推荐：成功状态动画
const SuccessMessage = () => (
  <div className="flex flex-col items-center p-8 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
    <div className="text-6xl mb-4 animate-bounce">🎉</div>
    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
      处理完成！
    </h3>
  </div>
);
```

#### ⚡ 加载状态
```typescript
// ✅ 推荐：加载状态美化
const LoadingIndicator = () => (
  <div className="flex items-center space-x-3">
    <div className="flex space-x-1">
      <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🌟</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>✨</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>💫</span>
    </div>
    <span className="text-muted-foreground">处理中...</span>
  </div>
);
```

### 📱 响应式美化

#### 🎨 响应式Emoji
```typescript
// ✅ 推荐：响应式图标大小
const ResponsiveEmoji = ({ emoji, size = 'base' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <span className={`${sizeClasses[size]} sm:text-lg md:text-xl lg:text-2xl`}>
      {emoji}
    </span>
  );
};
```

### 🚀 实施检查清单

实现组件时请使用以下检查清单：

#### 🎨 视觉设计
- [ ] 🌈 颜色使用是否符合情感色彩映射？
- [ ] 😊 Emoji 使用是否一致且相关？
- [ ] 🎭 渐变效果是否增强视觉层次？
- [ ] ✨ 动效是否适度且有意义？

#### 📱 响应式设计
- [ ] 📏 在移动端显示是否正常？
- [ ] 🖥️ 在桌面端显示是否优秀？
- [ ] 📱 Emoji 大小是否适配不同屏幕？

#### ♿ 可访问性
- [ ] 🔍 屏幕阅读器能否识别emoji？
- [ ] 🎨 颜色对比度是否足够？
- [ ] ⚡ 动效是否会导致晕动症？

#### 🎯 功能完整性
- [ ] 🎯 美化是否影响功能使用？
- [ ] ⚡ 性能是否因美化而降低？
- [ ] 💾 加载速度是否仍然快速？

> 💡 **注意**：更多详细的美化指南请参考 [文案设计规范](./content-design-standards.md)

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

## 🎨 文案美化要求 🌟

### 💡 核心理念
- **🎯 情感化设计**：通过色彩和emoji传达正确的情感状态
- **🌈 视觉层次**：使用渐变色和对比度建立清晰的视觉层次
- **✨ 适度装饰**：美化元素要适度，不能影响功能使用
- **♿ 包容性设计**：确保所有用户都能正常使用，包括辅助功能用户

### 🎨 色彩使用规范

#### 🌈 情感色彩映射
| 状态 | 颜色 | Emoji | 使用场景 |
|------|------|-------|---------|
| 🎉 成功完成 | `green-500` | ✅ | 任务完成、操作成功 |
| ⚡️ 进行中 | `blue-500` | ⏳ | 加载状态、处理中 |
| ⚠️ 需注意 | `yellow-500` | ⚠️ | 警告提示、注意事项 |
| 🚫 错误失败 | `red-500` | ❌ | 错误提示、失败状态 |
| 💡 信息提示 | `purple-500` | ℹ️ | 帮助信息、功能说明 |
| 🎨 主要操作 | `gradient-to-r from-blue-500 to-purple-600` | 🚀 | 主要按钮、核心功能 |

#### 🎭 渐变色应用
```typescript
// ✅ 推荐：使用渐变增强视觉层次
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    渐变标题效果
  </h3>
</div>
```

### 😊 Emoji 使用规范

#### 🏷️ 分类标识系统
```typescript
// 🎯 工具分类 emoji 映射
const TOOL_EMOJIS = {
  calculator: '🧮',      // 计算器类
  colorPicker: '🎨',     // 颜色选择器
  textFormatter: '📝',    // 文本格式化
  timer: '⏰',           // 倒计时器
  imageCompressor: '🖼️',  // 图片压缩
  passwordGenerator: '🔐', // 密码生成器
  jsonFormatter: '💻',    // JSON格式化
  qrCode: '📱',         // 二维码
};
```

#### 📊 状态指示系统
```typescript
// 🎯 状态 emoji 系统
const STATUS_EMOJIS = {
  idle: '💤',           // 空闲状态
  loading: '⏳',        // 加载中
  processing: '⚡️',     // 处理中
  success: '✅',        // 成功
  error: '❌',          // 错误
  warning: '⚠️',       // 警告
  info: 'ℹ️',          // 信息
  completed: '🎉',      // 完成
};
```

#### 🚀 动作指示系统
```typescript
// 🎯 动作 emoji 系统
const ACTION_EMOJIS = {
  create: '➕',         // 创建
  edit: '✏️',           // 编辑
  delete: '🗑️',         // 删除
  save: '💾',           // 保存
  download: '📥',        // 下载
  upload: '📤',          // 上传
  copy: '📋',           // 复制
  refresh: '🔄',         // 刷新
  settings: '⚙️',       // 设置
  search: '🔍',         // 搜索
};
```

### 🎪 组件美化实践

#### 🎯 按钮美化标准
```typescript
// ✅ 推荐：标准按钮美化模式
const ActionButton = ({ emoji, text, variant, ...props }) => (
  <Button 
    variant={variant}
    className={cn(
      variant === 'default' && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      "transition-all duration-200 hover:scale-105"
    )}
    {...props}
  >
    <span className="mr-2">{emoji}</span>
    {text}
  </Button>
);

// 使用示例
<ActionButton emoji="🚀" text="开始压缩" />
<ActionButton emoji="💾" text="保存" variant="outline" />
<ActionButton emoji="⚙️" text="设置" variant="ghost" />
```

#### 📋 卡片美化标准
```typescript
// ✅ 推荐：标准卡片美化模式
const FeatureCard = ({ icon, title, description, color }) => (
  <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-6">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
```

#### 📊 数据展示美化
```typescript
// ✅ 推荐：数据展示美化
const StatsCard = ({ emoji, value, label, color }) => (
  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
    <div className="text-3xl mb-2">{emoji}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
```

### 🎬 动效使用规范

#### ✨ 基础动效
```typescript
// ✅ 推荐：微交互动效
const InteractiveIcon = ({ emoji, children }) => (
  <div className="group">
    <span className="text-2xl transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 inline-block">
      {emoji}
    </span>
    {children}
  </div>
);
```

#### 🎉 成功动画
```typescript
// ✅ 推荐：成功状态动画
const SuccessMessage = () => (
  <div className="flex flex-col items-center p-8 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
    <div className="text-6xl mb-4 animate-bounce">🎉</div>
    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
      处理完成！
    </h3>
  </div>
);
```

#### ⚡ 加载状态
```typescript
// ✅ 推荐：加载状态美化
const LoadingIndicator = () => (
  <div className="flex items-center space-x-3">
    <div className="flex space-x-1">
      <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🌟</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>✨</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>💫</span>
    </div>
    <span className="text-muted-foreground">处理中...</span>
  </div>
);
```

### 📱 响应式美化

#### 🎨 响应式Emoji
```typescript
// ✅ 推荐：响应式图标大小
const ResponsiveEmoji = ({ emoji, size = 'base' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <span className={`${sizeClasses[size]} sm:text-lg md:text-xl lg:text-2xl`}>
      {emoji}
    </span>
  );
};
```

### 🚀 实施检查清单

实现组件时请使用以下检查清单：

#### 🎨 视觉设计
- [ ] 🌈 颜色使用是否符合情感色彩映射？
- [ ] 😊 Emoji 使用是否一致且相关？
- [ ] 🎭 渐变效果是否增强视觉层次？
- [ ] ✨ 动效是否适度且有意义？

#### 📱 响应式设计
- [ ] 📏 在移动端显示是否正常？
- [ ] 🖥️ 在桌面端显示是否优秀？
- [ ] 📱 Emoji 大小是否适配不同屏幕？

#### ♿ 可访问性
- [ ] 🔍 屏幕阅读器能否识别emoji？
- [ ] 🎨 颜色对比度是否足够？
- [ ] ⚡ 动效是否会导致晕动症？

#### 🎯 功能完整性
- [ ] 🎯 美化是否影响功能使用？
- [ ] ⚡ 性能是否因美化而降低？
- [ ] 💾 加载速度是否仍然快速？

> 💡 **注意**：更多详细的美化指南请参考 [文案设计规范](./content-design-standards.md)

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

## 🎨 文案美化要求 🌟

### 💡 核心理念
- **🎯 情感化设计**：通过色彩和emoji传达正确的情感状态
- **🌈 视觉层次**：使用渐变色和对比度建立清晰的视觉层次
- **✨ 适度装饰**：美化元素要适度，不能影响功能使用
- **♿ 包容性设计**：确保所有用户都能正常使用，包括辅助功能用户

### 🎨 色彩使用规范

#### 🌈 情感色彩映射
| 状态 | 颜色 | Emoji | 使用场景 |
|------|------|-------|---------|
| 🎉 成功完成 | `green-500` | ✅ | 任务完成、操作成功 |
| ⚡️ 进行中 | `blue-500` | ⏳ | 加载状态、处理中 |
| ⚠️ 需注意 | `yellow-500` | ⚠️ | 警告提示、注意事项 |
| 🚫 错误失败 | `red-500` | ❌ | 错误提示、失败状态 |
| 💡 信息提示 | `purple-500` | ℹ️ | 帮助信息、功能说明 |
| 🎨 主要操作 | `gradient-to-r from-blue-500 to-purple-600` | 🚀 | 主要按钮、核心功能 |

#### 🎭 渐变色应用
```typescript
// ✅ 推荐：使用渐变增强视觉层次
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    渐变标题效果
  </h3>
</div>
```

### 😊 Emoji 使用规范

#### 🏷️ 分类标识系统
```typescript
// 🎯 工具分类 emoji 映射
const TOOL_EMOJIS = {
  calculator: '🧮',      // 计算器类
  colorPicker: '🎨',     // 颜色选择器
  textFormatter: '📝',    // 文本格式化
  timer: '⏰',           // 倒计时器
  imageCompressor: '🖼️',  // 图片压缩
  passwordGenerator: '🔐', // 密码生成器
  jsonFormatter: '💻',    // JSON格式化
  qrCode: '📱',         // 二维码
};
```

#### 📊 状态指示系统
```typescript
// 🎯 状态 emoji 系统
const STATUS_EMOJIS = {
  idle: '💤',           // 空闲状态
  loading: '⏳',        // 加载中
  processing: '⚡️',     // 处理中
  success: '✅',        // 成功
  error: '❌',          // 错误
  warning: '⚠️',       // 警告
  info: 'ℹ️',          // 信息
  completed: '🎉',      // 完成
};
```

#### 🚀 动作指示系统
```typescript
// 🎯 动作 emoji 系统
const ACTION_EMOJIS = {
  create: '➕',         // 创建
  edit: '✏️',           // 编辑
  delete: '🗑️',         // 删除
  save: '💾',           // 保存
  download: '📥',        // 下载
  upload: '📤',          // 上传
  copy: '📋',           // 复制
  refresh: '🔄',         // 刷新
  settings: '⚙️',       // 设置
  search: '🔍',         // 搜索
};
```

### 🎪 组件美化实践

#### 🎯 按钮美化标准
```typescript
// ✅ 推荐：标准按钮美化模式
const ActionButton = ({ emoji, text, variant, ...props }) => (
  <Button 
    variant={variant}
    className={cn(
      variant === 'default' && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      "transition-all duration-200 hover:scale-105"
    )}
    {...props}
  >
    <span className="mr-2">{emoji}</span>
    {text}
  </Button>
);

// 使用示例
<ActionButton emoji="🚀" text="开始压缩" />
<ActionButton emoji="💾" text="保存" variant="outline" />
<ActionButton emoji="⚙️" text="设置" variant="ghost" />
```

#### 📋 卡片美化标准
```typescript
// ✅ 推荐：标准卡片美化模式
const FeatureCard = ({ icon, title, description, color }) => (
  <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="p-6">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
```

#### 📊 数据展示美化
```typescript
// ✅ 推荐：数据展示美化
const StatsCard = ({ emoji, value, label, color }) => (
  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
    <div className="text-3xl mb-2">{emoji}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
```

### 🎬 动效使用规范

#### ✨ 基础动效
```typescript
// ✅ 推荐：微交互动效
const InteractiveIcon = ({ emoji, children }) => (
  <div className="group">
    <span className="text-2xl transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12 inline-block">
      {emoji}
    </span>
    {children}
  </div>
);
```

#### 🎉 成功动画
```typescript
// ✅ 推荐：成功状态动画
const SuccessMessage = () => (
  <div className="flex flex-col items-center p-8 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
    <div className="text-6xl mb-4 animate-bounce">🎉</div>
    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
      处理完成！
    </h3>
  </div>
);
```

#### ⚡ 加载状态
```typescript
// ✅ 推荐：加载状态美化
const LoadingIndicator = () => (
  <div className="flex items-center space-x-3">
    <div className="flex space-x-1">
      <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🌟</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>✨</span>
      <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>💫</span>
    </div>
    <span className="text-muted-foreground">处理中...</span>
  </div>
);
```

### 📱 响应式美化

#### 🎨 响应式Emoji
```typescript
// ✅ 推荐：响应式图标大小
const ResponsiveEmoji = ({ emoji, size = 'base' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <span className={`${sizeClasses[size]} sm:text-lg md:text-xl lg:text-2xl`}>
      {emoji}
    </span>
  );
};
```

### 🚀 实施检查清单

实现组件时请使用以下检查清单：

#### 🎨 视觉设计
- [ ] 🌈 颜色使用是否符合情感色彩映射？
- [ ] 😊 Emoji 使用是否一致且相关？
- [ ] 🎭 渐变效果是否增强视觉层次？
- [ ] ✨ 动效是否适度且有意义？

#### 📱 响应式设计
- [ ] 📏 在移动端显示是否正常？
- [ ] 🖥️ 在桌面端显示是否优秀？
- [ ] 📱 Emoji 大小是否适配不同屏幕？

#### ♿ 可访问性
- [ ] 🔍 屏幕阅读器能否识别emoji？
- [ ] 🎨 颜色对比度是否足够？
- [ ] ⚡ 动效是否会导致晕动症？

#### 🎯 功能完整性
- [ ] 🎯 美化是否影响功能使用？
- [ ] ⚡ 性能是否因美化而降低？
- [ ] 💾 加载速度是否仍然快速？

> 💡 **注意**：更多详细的美化指南请参考 [文案设计规范](./content-design-standards.md)

---

遵循这些开发规范，可以确保代码质量、提高团队协作效率，并使项目更易于维护和扩展。