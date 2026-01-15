# 技术方案

## 核心架构

### 纯 WASM 架构

所有图片处理逻辑都通过 WASM 库完成，Canvas 仅用于预览和结果展示。

## 技术栈

### 核心技术
- Next.js (App Router, SSR/SSG)
- React (客户端组件)
- sharp-wasm (图片处理)
- Zustand (状态管理)
- Tailwind CSS (样式)
- TypeScript (类型安全)

### 辅助工具
- Worker (多线程处理)
- Web Storage (本地缓存用户设置)
- IndexedDB (本地存储大文件)

### 构建与部署
- Vercel (Next.js 托管，自动优化图片/字体)
- 静态生成 (工具页面 SSG，无需数据库)

## 项目结构

```
app/
  tools/
    image/
      compress/
        page.tsx (SSR 页面组件)
        components/
          CompressTool.tsx (客户端组件)
      convert/
        page.tsx
        components/
          ConvertTool.tsx
      resize/
        page.tsx
        components/
          ResizeTool.tsx
      crop/
        page.tsx
        components/
          CropTool.tsx

components/
  ToolLayout.tsx (共享工具布局)
  FileUploader.tsx (文件上传组件)
  ImagePreview.tsx (图片预览组件)

stores/
  imageToolStore.ts (Zustand 状态管理)

workers/
  imageWorker.ts (WASM Worker)

types/
  errors.ts (错误类型定义)
```

## 架构分层

### 1. 处理层 (Processor Layer)

**ImageProcessor**: 统一封装 sharp-wasm 处理所有图片操作

核心功能模块:
- 格式转换: convert(file: File, format: string, quality: number)
- 压缩: compress(file: File, quality: number)
- 缩放: resize(file: File, width: number, height: number, fit: string)
- 裁剪: crop(file: File, x: number, y: number, width: number, height: number)

Worker 管理:
- 在 Worker 中运行 WASM 处理，避免阻塞主线程
- 统一接口: process(operation: string, file: File, options: object): Promise<Blob>

### 2. 状态管理层 (State Layer)

使用 Zustand 创建全局状态管理:

```typescript
interface ImageToolState {
  currentTool: string
  originalFile: File | null
  processedBlob: Blob | null
  previewUrl: string
  processingStatus: 'idle' | 'processing' | 'completed' | 'error'
  errorMessage: string | null
  wasmLoaded: boolean
  workerReady: boolean
  setOriginalFile: (file: File) => void
  setProcessedBlob: (blob: Blob) => void
  setProcessingStatus: (status: ProcessingStatus) => void
  setError: (error: string) => void
  reset: () => void
}
```

### 3. 组件层 (UI Layer)

**SSR 页面组件 (page.tsx)**:
- 导出 metadata 用于 SEO (title, description, keywords)
- 渲染工具包装布局 (header、footer、工具说明)
- 动态生成工具介绍内容 (从配置文件读取)
- 预渲染静态 HTML，提升首屏加载速度
- 内嵌结构化数据 (JSON-LD) 增强搜索引擎理解

**客户端工具组件 (Tool.tsx)**:
- 标记 'use client'，处理所有交互逻辑
- 加载 WASM Worker
- 文件上传、预览、处理、下载功能
- 使用 Zustand 管理状态

**核心组件**:
- ToolLayout: 响应式布局，工具导航栏，SEO 内容区域
- FileUploader: 文件上传 (拖拽上传、点击选择)
- ImagePreview: 对比滑块预览 (原图/处理后)
- ConfigForm: 工具参数配置表单

## 数据流

### 初始化阶段
1. 页面加载 → SSR 渲染 → 返回 HTML + SEO metadata
2. 客户端 hydration → 加载 WASM Worker
3. Worker 就绪 → 设置 workerReady: true

### 文件上传阶段
1. 用户选择文件 → setOriginalFile(file)
2. 生成本地预览 URL → setPreviewUrl(url)
3. 重置处理状态 → processingStatus: 'idle'

### 处理阶段
1. 用户点击处理 → setProcessingStatus('processing')
2. 发送消息到 Worker (file + options)
3. Worker 调用 WASM 处理 → 返回 Blob
4. setProcessedBlob(result) → setProcessingStatus('completed')

### 下载阶段
1. 用户点击下载 → 创建 a 标签 → 触发下载

## WASM Worker 设计

### Worker 结构

```typescript
// workers/imageWorker.ts
self.onmessage = async (e) => {
  const { operation, file, options } = e.data
  
  try {
    if (!sharp) {
      sharp = await import('sharp-wasm')
    }
    
    const buffer = await file.arrayBuffer()
    const image = sharp(Buffer.from(buffer))
    
    switch(operation) {
      case 'compress':
        result = await processCompress(image, options)
        break
      case 'convert':
        result = await processConvert(image, options)
        break
      case 'resize':
        result = await processResize(image, options)
        break
      case 'crop':
        result = await processCrop(image, options)
        break
    }
    
    const blob = new Blob([result], { type: options.outputFormat })
    self.postMessage({ success: true, blob })
  } catch (error) {
    self.postMessage({ success: false, error: error.message })
  }
}
```

### Worker 管理
- 单例模式，全局共享一个 Worker 实例
- 支持任务队列，多个操作按顺序执行
- 错误边界捕获 WASM 异常

## 错误处理机制

### 错误类型定义

```typescript
enum ErrorType {
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  UNSUPPORTED_FORMAT = 'UNSUPPORTED_FORMAT',
  WASM_LOAD_FAILED = 'WASM_LOAD_FAILED',
  WORKER_TIMEOUT = 'WORKER_TIMEOUT',
  PROCESSING_FAILED = 'PROCESSING_FAILED'
}
```

### 错误处理策略

**文件验证**:
- 上传时检查文件类型
- 检查文件大小限制 (如最大 50MB)
- 实时显示验证错误

**WASM 加载错误**:
- 网络失败 → 显示"加载失败，请刷新重试"
- WASM 不兼容 → 检测浏览器，显示"您的浏览器不支持"

**Worker 通信错误**:
- 超时 (30 秒) → 取消任务，提示"处理超时，请尝试较小的图片"
- 消息格式错误 → 记录日志，提示"发生错误，请重试"

**处理错误**:
- 内存不足 → 减小处理尺寸，提示"图片过大，已自动降低质量"
- 格式不支持 → 提示"该格式暂不支持"

### UI 错误展示
- Toast 通知 (非阻塞)
- 错误详情面板 (可折叠)
- 重试按钮 (针对可恢复错误)

## 性能优化

### WASM 加载优化
- 代码分割: WASM 文件单独 chunk，按需加载
- 预加载: 页面加载时预加载 WASM (使用 link rel="preload")
- CDN 缓存: WASM 文件上传 CDN，长期缓存策略
- 压缩: 使用 brotli 压缩 WASM 文件 (减少 30-50% 体积)

### 图片处理优化
- 智能缩放: 上传时生成缩略图 (宽≤1920px) 用于预览
- 内存管理: Worker 处理完后释放 Buffer
- 并发控制: 同一时间只处理一个任务
- 大文件处理: 超过 20MB 提示用户分批处理

### 渲染性能优化
- 虚拟滚动: 多图预览时使用虚拟列表
- 图片懒加载: 预览图使用 Intersection Observer
- 图片格式: 预览图使用 WebP 格式
- React.memo: 优化组件重渲染

### 代码优化
- Tree-shaking: 只导入使用的 WASM 模块
- 动态导入: 工具组件按路由动态加载
- 服务端组件: SEO 内容使用服务端组件渲染

## 测试策略

### 测试分层

**单元测试**:
- Processor 核心逻辑测试 (参数验证、错误处理)
- Store 状态管理测试 (actions、状态转换)
- 工具函数测试 (格式检测、尺寸计算)

**组件测试**:
- SSR 页面组件渲染测试 (metadata 生成)
- 客户端工具组件交互测试 (上传、配置、下载)
- 布局组件响应式测试

**E2E 测试**:
- 完整用户流程: 访问页面 → 上传文件 → 配置选项 → 处理 → 下载
- 多工具集成测试
- SEO 元数据验证测试

### 测试工具
- Vitest + Testing Library (单元测试)
- Playwright (E2E 测试)
- Mock Service Worker (模拟 Worker)

### WASM 测试挑战
- Mock Worker 响应，避免实际加载 WASM
- 使用 fixture 图片进行集成测试
- CI 环境预加载 WASM 文件

## 设计原则

- YAGNI: 只实现当前需要的功能
- 渐进增强: 从图片工具开始，逐步添加文本/文件/开发者工具
- 性能优先: 所有处理在浏览器完成，零服务端依赖
- SEO 友好: SSR + metadata + 结构化数据
