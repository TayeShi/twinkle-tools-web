# 开发指南

## 技术栈

- **框架**: Next.js 16.0.7
- **语言**: TypeScript 5
- **UI 库**: Radix UI Themes 3.2.1
- **样式**: SCSS
- **包管理器**: Bun

## 开发要求

### UI 组件使用规范

1. **优先使用 Radix UI 组件**
   - 所有 UI 交互元素（按钮、表单、对话框、下拉菜单等）应优先使用 Radix UI 组件库
   - Radix UI 提供了无障碍、可定制的基础组件，确保应用的一致性和可访问性
   - 参考文档: https://www.radix-ui.com/themes/docs/overview/getting-started

2. **SCSS 样式补充**
   - 当 Radix UI 组件的样式无法满足需求时，使用 SCSS 进行补充定制
   - 遵循 BEM (Block Element Modifier) 命名规范编写 CSS 类名
   - 使用 SCSS 变量管理主题色、间距、字体大小等
   - 保持样式文件的模块化，与组件一一对应

3. **组件开发流程**
   - 创建组件时，首先检查 Radix UI 是否提供了类似组件
   - 如需定制，在组件目录下创建对应的 SCSS 文件
   - 组件命名使用 PascalCase，样式文件使用 kebab-case
   - 示例：
     ```
     components/
     ├── Button/
     │   ├── index.tsx      # 使用 Radix UI Button 组件
     │   └── button.module.scss  # 自定义样式补充
     ```

### 代码规范

- 遵循 ESLint 规则，运行 `bun run lint` 检查代码
- 使用 TypeScript 严格模式，确保类型安全
- 组件 props 类型定义清晰，使用 interface 或 type
- 保持代码简洁，避免不必要的嵌套和重复

### 开发环境

- 使用 Bun 作为包管理器：`bun install`、`bun run dev`
- 开发服务器：`bun run dev`，访问 http://localhost:3000
- 构建生产版本：`bun run build`
- 启动生产服务器：`bun run start`

## 目录结构

```
├── app/                 # Next.js App Router 目录
├── components/          # React 组件
├── docs/                # 项目文档
├── public/              # 静态资源
├── utils/               # 工具函数
├── package.json         # 项目依赖和脚本
├── tsconfig.json        # TypeScript 配置
└── next.config.ts       # Next.js 配置
```

## 注意事项

- 确保所有组件都具有良好的无障碍支持
- 考虑响应式设计，适配不同屏幕尺寸
- 保持组件的可复用性和可测试性
- 定期更新依赖，确保使用最新的稳定版本
