# 架构设计原则

## 📋 架构概述

Twinkle Tools 采用模块化、可扩展的架构设计，注重代码解耦、可维护性和团队协作效率。本文档定义了项目的架构原则和设计模式。

## 🎯 核心设计原则

### 1. 单一职责原则 (SRP)
每个模块、组件、函数都应该有且仅有一个职责。

#### 示例
```typescript
// ✅ 推荐：职责单一
export class CalculatorEngine {
  calculate(expression: string): number {
    // 只负责计算逻辑
  }
}

export class CalculatorDisplay {
  update(value: string): void {
    // 只负责显示逻辑
  }
}

// ❌ 避免：职责混合
export class Calculator {
  calculate(expression: string): number { /* 计算逻辑 */ }
  updateDisplay(value: string): void { /* 显示逻辑 */ }
  saveHistory(record: HistoryRecord): void { /* 存储逻辑 */ }
  exportHistory(format: string): string { /* 导出逻辑 */ }
}
```

### 2. 开闭原则 (OCP)
对扩展开放，对修改关闭。

#### 示例
```typescript
// ✅ 推荐：通过扩展实现新功能
interface Tool {
  id: string;
  name: string;
  execute(config: ToolConfig): void;
}

abstract class BaseTool implements Tool {
  abstract id: string;
  abstract name: string;
  
  // 通用逻辑，对修改关闭
  protected validateConfig(config: ToolConfig): boolean {
    return config !== null;
  }
  
  abstract execute(config: ToolConfig): void; // 对扩展开放
}

class CalculatorTool extends BaseTool {
  id = 'calculator';
  name = '计算器';
  
  execute(config: CalculatorConfig): void {
    // 具体实现
  }
}

class ColorPickerTool extends BaseTool {
  id = 'color-picker';
  name = '颜色选择器';
  
  execute(config: ColorPickerConfig): void {
    // 具体实现
  }
}
```

### 3. 依赖倒置原则 (DIP)
高层模块不应依赖低层模块，两者都应依赖抽象。

#### 示例
```typescript
// ✅ 推荐：依赖抽象
interface StorageService {
  save(key: string, data: any): Promise<void>;
  load(key: string): Promise<any>;
  remove(key: string): Promise<void>;
}

class LocalStorageService implements StorageService {
  async save(key: string, data: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  async load(key: string): Promise<any> {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }
  
  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}

class SettingsManager {
  constructor(private storage: StorageService) {}
  
  async saveSettings(settings: UserSettings): Promise<void> {
    await this.storage.save('user-settings', settings);
  }
}

// 依赖注入
const settingsManager = new SettingsManager(new LocalStorageService());
```

---

## 🏗 分层架构

### 架构层次

```
┌─────────────────────────────────────┐
│           表示层 (UI)              │  ← React 组件、页面
├─────────────────────────────────────┤
│         应用层 (Application)         │  ← 业务逻辑、用例
├─────────────────────────────────────┤
│         领域层 (Domain)            │  ← 业务实体、规则
├─────────────────────────────────────┤
│       基础设施层 (Infrastructure)   │  ← 外部服务、数据访问
└─────────────────────────────────────┘
```

### 层次职责

#### 1. 表示层 (Presentation Layer)
```typescript
// app/calculator/page.tsx
export default function CalculatorPage() {
  return (
    <div className="container mx-auto py-8">
      <ToolHeader title="计算器" />
      <CalculatorArea />
      <ToolSettings />
    </div>
  );
}

// components/tools/Calculator/CalculatorArea.tsx
export function CalculatorArea() {
  const calculator = useCalculator();
  
  return (
    <Card>
      <Display value={calculator.state.display} />
      <Keypad onInput={calculator.input} />
    </Card>
  );
}
```

#### 2. 应用层 (Application Layer)
```typescript
// hooks/useCalculator.ts
export function useCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  
  const inputNumber = useCallback((num: string) => {
    dispatch({ type: 'INPUT_NUMBER', payload: num });
  }, []);
  
  const calculate = useCallback(() => {
    dispatch({ type: 'CALCULATE' });
  }, []);
  
  return {
    state,
    inputNumber,
    calculate,
  };
}

// usecases/calculator.usecase.ts
export class CalculatorUseCase {
  constructor(
    private engine: CalculatorEngine,
    private storage: HistoryStorage
  ) {}
  
  async executeCalculation(expression: string): Promise<number> {
    const result = this.engine.evaluate(expression);
    
    await this.storage.save({
      expression,
      result,
      timestamp: new Date(),
    });
    
    return result;
  }
}
```

#### 3. 领域层 (Domain Layer)
```typescript
// domain/calculator/engine.ts
export class CalculatorEngine {
  private operators: Map<string, (a: number, b: number) => number> = new Map([
    ['+', (a, b) => a + b],
    ['-', (a, b) => a - b],
    ['*', (a, b) => a * b],
    ['/', (a, b) => {
      if (b === 0) throw new DivisionByZeroError();
      return a / b;
    }],
  ]);
  
  evaluate(expression: string): number {
    // 计算逻辑，不依赖外部服务
    const tokens = this.parse(expression);
    return this.compute(tokens);
  }
  
  private parse(expression: string): Token[] {
    // 解析逻辑
  }
  
  private compute(tokens: Token[]): number {
    // 计算逻辑
  }
}

// domain/calculator/errors.ts
export class DivisionByZeroError extends Error {
  constructor() {
    super('除数不能为零');
    this.name = 'DivisionByZeroError';
  }
}
```

#### 4. 基础设施层 (Infrastructure Layer)
```typescript
// infrastructure/storage/local-storage.repository.ts
export class LocalStorageRepository<T> {
  constructor(private key: string) {}
  
  async save(data: T): Promise<void> {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
  
  async load(): Promise<T | null> {
    const item = localStorage.getItem(this.key);
    return item ? JSON.parse(item) : null;
  }
  
  async remove(): Promise<void> {
    localStorage.removeItem(this.key);
  }
}

// infrastructure/api/calculator.api.ts
export class CalculatorApiService {
  constructor(private httpClient: HttpClient) {}
  
  async validateExpression(expression: string): Promise<boolean> {
    const response = await this.httpClient.post('/api/validate', { expression });
    return response.data.isValid;
  }
}
```

---

## 🧩 模块化设计

### 模块边界

#### 1. 工具模块
```typescript
// modules/calculator/index.ts
export { CalculatorTool } from './tool';
export { CalculatorEngine } from './domain/engine';
export { useCalculator } from './hooks/useCalculator';
export { CalculatorArea, Display, Keypad } from './components';
export type { CalculatorConfig, CalculatorState } from './types';

// 模块接口
export interface CalculatorModule {
  // 对外暴露的 API
  createTool(config?: CalculatorConfig): CalculatorTool;
  useCalculator(): ReturnType<typeof useCalculator>;
  components: {
    CalculatorArea: typeof CalculatorArea;
    Display: typeof Display;
    Keypad: typeof Keypad;
  };
}

// 模块工厂
export const calculatorModule: CalculatorModule = {
  createTool: (config) => new CalculatorTool(config),
  useCalculator,
  components: {
    CalculatorArea,
    Display,
    Keypad,
  },
};
```

#### 2. 共享模块
```typescript
// shared/ui/index.ts
export { Card, CardContent, CardHeader, CardTitle } from './card';
export { Button } from './button';
export { Badge } from './badge';
export type { CardProps, ButtonProps, BadgeProps } from './types';

// shared/utils/index.ts
export { cn } from './cn';
export { debounce, throttle } from './timing';
export { formatDate, formatNumber } from './format';
export type { FormatOptions } from './types';

// shared/hooks/index.ts
export { useLocalStorage } from './useLocalStorage';
export { useDebounce } from './useDebounce';
export { useTheme } from './useTheme';
```

### 依赖管理

#### 依赖方向规则
```
表示层 → 应用层 → 领域层
    ↓         ↓         ↓
基础设施层 ← ← ← ← ← ← ← ←

原则：
1. 上层可以依赖下层
2. 下层不能依赖上层
3. 同层之间不能直接依赖（通过接口通信）
4. 依赖倒置：高层和低层都依赖抽象
```

#### 模块通信
```typescript
// 事件驱动的模块间通信
export class EventBus {
  private listeners: Map<string, Function[]> = new Map();
  
  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }
  
  emit(event: string, data: any): void {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }
  
  off(event: string, callback: Function): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }
}

// 使用示例
export const eventBus = new EventBus();

// 模块 A 发送事件
export function CalculatorTool() {
  const handleResult = (result: number) => {
    eventBus.emit('calculator:result', { result, tool: 'calculator' });
  };
  
  return <Calculator onResult={handleResult} />;
}

// 模块 B 监听事件
export function HistoryLogger() {
  useEffect(() => {
    const handleResult = (data: { result: number; tool: string }) => {
      console.log(`${data.tool} 计算结果: ${data.result}`);
    };
    
    eventBus.on('calculator:result', handleResult);
    
    return () => {
      eventBus.off('calculator:result', handleResult);
    };
  }, []);
}
```

---

## 🔧 依赖注入

### 容器配置

```typescript
// container/container.ts
export class DIContainer {
  private services: Map<string, any> = new Map();
  private factories: Map<string, () => any> = new Map();
  
  register<T>(token: string, factory: () => T): void {
    this.factories.set(token, factory);
  }
  
  registerInstance<T>(token: string, instance: T): void {
    this.services.set(token, instance);
  }
  
  resolve<T>(token: string): T {
    if (this.services.has(token)) {
      return this.services.get(token);
    }
    
    const factory = this.factories.get(token);
    if (!factory) {
      throw new Error(`Service ${token} not registered`);
    }
    
    const instance = factory();
    this.services.set(token, instance);
    return instance;
  }
}

// 服务注册
export const container = new DIContainer();

// 接口定义
export const SERVICE_TOKENS = {
  STORAGE_SERVICE: 'StorageService',
  CALCULATOR_ENGINE: 'CalculatorEngine',
  HISTORY_STORAGE: 'HistoryStorage',
  HTTP_CLIENT: 'HttpClient',
} as const;

// 服务注册
container.register(SERVICE_TOKENS.STORAGE_SERVICE, () => new LocalStorageService());
container.register(SERVICE_TOKENS.CALCULATOR_ENGINE, () => new CalculatorEngine());
container.register(SERVICE_TOKENS.HISTORY_STORAGE, () => new HistoryStorage(
  container.resolve(SERVICE_TOKENS.STORAGE_SERVICE)
));
```

### 使用依赖注入

```typescript
// 使用示例
export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const engine = container.resolve<CalculatorEngine>(SERVICE_TOKENS.CALCULATOR_ENGINE);
  const historyStorage = container.resolve<HistoryStorage>(SERVICE_TOKENS.HISTORY_STORAGE);
  
  const calculator = useMemo(() => 
    new CalculatorUseCase(engine, historyStorage), 
    [engine, historyStorage]
  );
  
  return (
    <CalculatorContext.Provider value={calculator}>
      {children}
    </CalculatorContext.Provider>
  );
}

// Hook 中使用
export function useCalculatorEngine() {
  const calculator = useContext(CalculatorContext);
  if (!calculator) {
    throw new Error('useCalculatorEngine must be used within CalculatorProvider');
  }
  
  return calculator;
}
```

---

## 🔄 状态管理解耦

### 状态分层

```typescript
// 全局状态
export interface GlobalState {
  theme: ThemeMode;
  user: UserState;
  notifications: NotificationState;
}

// 模块状态
export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  history: HistoryRecord[];
}

export interface ColorPickerState {
  selectedColor: string;
  recentColors: string[];
  palette: Color[];
}
```

### 状态管理模式

```typescript
// store/calculator.store.ts
export class CalculatorStore {
  private state: CalculatorState;
  private listeners: Set<() => void> = new Set();
  
  constructor(initialState: CalculatorState) {
    this.state = initialState;
  }
  
  getState(): CalculatorState {
    return { ...this.state };
  }
  
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  
  private notify(): void {
    this.listeners.forEach(listener => listener());
  }
  
  dispatch(action: CalculatorAction): void {
    this.state = calculatorReducer(this.state, action);
    this.notify();
  }
}

// 使用 React Context 集成
export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => new CalculatorStore(initialCalculatorState));
  const [state, setState] = useState(store.getState());
  
  useEffect(() => {
    return store.subscribe(() => {
      setState(store.getState());
    });
  }, [store]);
  
  return (
    <CalculatorContext.Provider value={{ store, state, dispatch: store.dispatch.bind(store) }}>
      {children}
    </CalculatorContext.Provider>
  );
}
```

---

## 🎛 配置管理

### 配置分层

```typescript
// config/environment.config.ts
export interface EnvironmentConfig {
  apiUrl: string;
  enableAnalytics: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  features: {
    darkMode: boolean;
    betaFeatures: boolean;
    advancedTools: boolean;
  };
}

// 开发环境
export const developmentConfig: EnvironmentConfig = {
  apiUrl: 'http://localhost:3001/api',
  enableAnalytics: false,
  logLevel: 'debug',
  features: {
    darkMode: true,
    betaFeatures: true,
    advancedTools: true,
  },
};

// 生产环境
export const productionConfig: EnvironmentConfig = {
  apiUrl: 'https://api.twinkle-tools.com',
  enableAnalytics: true,
  logLevel: 'warn',
  features: {
    darkMode: true,
    betaFeatures: false,
    advancedTools: false,
  },
};

// 配置工厂
export function createConfig(): EnvironmentConfig {
  const env = process.env.NODE_ENV;
  
  switch (env) {
    case 'development':
      return developmentConfig;
    case 'production':
      return productionConfig;
    default:
      return developmentConfig;
  }
}
```

### 工具配置

```typescript
// tools/calculator/config.ts
export interface CalculatorConfig {
  mode: 'basic' | 'scientific' | 'programmer';
  precision: number;
  enableHistory: boolean;
  maxHistoryItems: number;
  theme: 'light' | 'dark' | 'auto';
  shortcuts: {
    [key: string]: string;
  };
}

// 默认配置
export const defaultCalculatorConfig: CalculatorConfig = {
  mode: 'basic',
  precision: 10,
  enableHistory: true,
  maxHistoryItems: 50,
  theme: 'auto',
  shortcuts: {
    'Escape': 'clear',
    'Enter': 'calculate',
    'Backspace': 'delete',
  },
};

// 配置合并
export function mergeCalculatorConfig(
  base: CalculatorConfig,
  override: Partial<CalculatorConfig>
): CalculatorConfig {
  return {
    ...base,
    ...override,
    shortcuts: {
      ...base.shortcuts,
      ...override.shortcuts,
    },
  };
}
```

---

## 🧪 测试解耦

### 测试分层

```typescript
// 领域层测试
describe('CalculatorEngine', () => {
  let engine: CalculatorEngine;
  
  beforeEach(() => {
    engine = new CalculatorEngine();
  });
  
  it('should calculate addition correctly', () => {
    const result = engine.evaluate('2 + 3');
    expect(result).toBe(5);
  });
  
  it('should throw error for division by zero', () => {
    expect(() => engine.evaluate('1 / 0')).toThrow(DivisionByZeroError);
  });
});

// 应用层测试
describe('CalculatorUseCase', () => {
  let useCase: CalculatorUseCase;
  let mockEngine: jest.Mocked<CalculatorEngine>;
  let mockStorage: jest.Mocked<HistoryStorage>;
  
  beforeEach(() => {
    mockEngine = createMockCalculatorEngine();
    mockStorage = createMockHistoryStorage();
    useCase = new CalculatorUseCase(mockEngine, mockStorage);
  });
  
  it('should save calculation to history', async () => {
    mockEngine.evaluate.mockReturnValue(5);
    mockStorage.save.mockResolvedValue(undefined);
    
    const result = await useCase.executeCalculation('2 + 3');
    
    expect(result).toBe(5);
    expect(mockStorage.save).toHaveBeenCalledWith({
      expression: '2 + 3',
      result: 5,
      timestamp: expect.any(Date),
    });
  });
});

// UI 测试
describe('CalculatorArea', () => {
  it('should render calculator components', () => {
    render(
      <CalculatorContext.Provider value={mockCalculatorContext}>
        <CalculatorArea />
      </CalculatorContext.Provider>
    );
    
    expect(screen.getByTestId('calculator-display')).toBeInTheDocument();
    expect(screen.getByTestId('calculator-keypad')).toBeInTheDocument();
  });
});
```

---

## 📏 代码质量指标

### 解耦度评估

```typescript
// 依赖关系分析
interface ModuleMetrics {
  name: string;
  dependencies: string[];
  coupling: 'low' | 'medium' | 'high';
  cohesion: 'low' | 'medium' | 'high';
  fanIn: number;  // 依赖此模块的模块数
  fanOut: number; // 此模块依赖的模块数
}

// 代码分析工具
export class CodeAnalyzer {
  analyzeModule(modulePath: string): ModuleMetrics {
    // 分析依赖关系
    // 计算耦合度
    // 评估内聚性
  }
  
  generateDependencyGraph(): DependencyGraph {
    // 生成依赖图
  }
}
```

### 质量检查清单

```typescript
// 自动化检查
export const qualityChecks = {
  circularDependencies: () => {
    // 检查循环依赖
  },
  unusedDependencies: () => {
    // 检查未使用的依赖
  },
  moduleCoupling: () => {
    // 检查模块耦合度
  },
  testCoverage: () => {
    // 检查测试覆盖率
  },
  codeComplexity: () => {
    // 检查代码复杂度
  },
};
```

---

## 🔄 重构指导

### 识别代码异味

```typescript
// 1. 长方法
// ❌ 违反单一职责
function processToolData(data: any[]): Result[] {
  // 100+ 行代码
  // 数据验证
  // 数据转换
  // 业务逻辑
  // 结果格式化
  // 错误处理
}

// ✅ 重构为多个小方法
function processToolData(data: any[]): Result[] {
  const validData = validateData(data);
  const transformedData = transformData(validData);
  const results = applyBusinessLogic(transformedData);
  return formatResults(results);
}

function validateData(data: any[]): ValidData[] { /* 验证逻辑 */ }
function transformData(data: ValidData[]): TransformedData[] { /* 转换逻辑 */ }
function applyBusinessLogic(data: TransformedData[]): RawResult[] { /* 业务逻辑 */ }
function formatResults(results: RawResult[]): Result[] { /* 格式化逻辑 */ }

// 2. 紧耦合
// ❌ 直接依赖具体实现
export class ToolManager {
  private calculator = new CalculatorTool();
  private colorPicker = new ColorPickerTool();
  private passwordGenerator = new PasswordGeneratorTool();
}

// ✅ 依赖抽象
export class ToolManager {
  constructor(
    private tools: Map<string, Tool> // 依赖 Tool 接口
  ) {}
}

// 3. 重复代码
// ❌ 重复的验证逻辑
function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string) {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone);
}

// ✅ 提取通用验证器
export class Validator {
  static validate(value: string, pattern: RegExp): boolean {
    return pattern.test(value);
  }
  
  static email(email: string) {
    return this.validate(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }
  
  static phone(phone: string) {
    return this.validate(phone, /^\+?[\d\s-()]+$/);
  }
}
```

### 重构步骤

1. **识别问题** - 使用代码分析工具发现异味
2. **编写测试** - 确保重构不破坏功能
3. **小步重构** - 逐步改进代码结构
4. **验证结果** - 运行测试确保功能正常
5. **优化性能** - 在结构优化后进行性能优化

---

通过遵循这些架构设计原则，Twinkle Tools 将成为一个高度解耦、易于维护、可扩展的现代化 Web 应用。