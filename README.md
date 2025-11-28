# Twinkle Tools - 实用工具集合

> 一个现代化的在线工具集网站，为开发者和设计师提供便捷、实用的日常工具服务。

## ✨ 特性

- 🎨 **现代化设计** - 采用渐变色、emoji、微动效的现代化界面设计
- 🌈 **情感化体验** - 通过色彩和emoji传达正确的情感状态，提升用户体验
- 📱 **响应式布局** - 完美适配桌面端和移动端设备
- ⚡ **高性能** - 基于 Next.js 14 的 App Router 和服务端渲染
- 🔒 **安全可靠** - 本地数据处理，保护用户隐私
- 🌙 **深色模式** - 支持浅色/深色主题切换
- 🎭 **视觉层次** - 清晰的视觉层次，避免界面单调
- 🛠 **丰富工具** - 涵盖开发、设计、文本处理等多个领域
- ♿ **可访问性** - 确保所有用户都能获得良好体验

## 🚀 快速开始

### 环境要求

- Node.js 18.0.0+
- Bun 1.0.0+ (推荐)
- 现代浏览器

### 安装依赖

```bash
# 使用 Bun (推荐)
bun install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 启动开发服务器

```bash
# 使用 Bun
bun run dev

# 或使用 npm
npm run dev

# 或使用 yarn
yarn dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📦 构建部署

```bash
# 构建生产版本
bun run build

# 启动生产服务器
bun run start
```

## 🛠 技术栈

- **前端框架**: Next.js 14 (App Router)
- **开发语言**: TypeScript
- **样式方案**: Tailwind CSS 4.0
- **组件库**: shadcn/ui (基于 Radix UI)
- **图标库**: Lucide React
- **运行时**: Bun

## 📚 文档

我们提供了详细的项目文档，帮助您快速上手和深入了解项目：

### 📖 核心文档
- [项目概述](./docs/overview.md) - 项目简介和核心特性
- [技术栈](./docs/tech-stack.md) - 技术选型和依赖说明
- [项目结构](./docs/project-structure.md) - 目录结构详解
- [架构设计原则](./docs/architecture-principles.md) - 架构设计和解耦规范

### 🛠 开发指南
- [环境搭建](./docs/setup.md) - 开发环境配置指南
- [开发规范](./docs/coding-standards.md) - 代码规范和最佳实践
- [开发工作流程](./docs/development-workflow.md) - 完整开发流程规范
- [🎨 文案设计规范](./docs/content-design-standards.md) - 色彩、emoji、美化标准
- [组件库](./docs/components.md) - UI 组件库使用指南

### 📦 模块文档
- [首页模块](./docs/modules/homepage.md) - 首页功能模块文档
- [工具模块](./docs/modules/tools.md) - 各工具模块文档
- [布局组件](./docs/modules/layout.md) - 公共布局组件文档

### 🚀 部署运维
- [构建部署](./docs/deployment.md) - 项目构建和部署指南
- [性能优化](./docs/performance.md) - 性能优化建议

## 🛠 工具分类

### 🔢 数学工具
- [计算器](./calculator) - 基础运算和科学计算
- 单位转换 - 长度、重量、温度等单位转换
- 进制转换 - 二进制、八进制、十进制、十六进制转换

### 🎨 设计工具
- [颜色选择器](./color-picker) - 专业颜色选择和格式转换
- [图片压缩](./image-compressor) - 在线图片压缩和格式转换
- 尺寸计算 - 屏幕尺寸、分辨率计算

### 📝 文本工具
- [文本格式化](./text-formatter) - 文本转换、格式化和处理
- 编码解码 - Base64、URL、HTML 实体编码
- 正则测试 - 正则表达式测试和生成

### ⏰ 时间工具
- [倒计时器](./timer) - 精确的倒计时和计时
- 时区转换 - 全球时区时间转换
- 时间戳转换 - Unix 时间戳转换

### 🔐 安全工具
- [密码生成器](./password-generator) - 安全随机密码生成
- 哈希生成器 - MD5、SHA256 等哈希计算
- 加密解密 - AES、DES 等加密算法

### 💻 开发工具
- [JSON 格式化](./json-formatter) - JSON 数据格式化和验证
- [SQL 格式化](./sql-formatter) - SQL 代码格式化和美化
- [URL 编解码](./url-encoder) - URL 编码和解码处理

## 🤝 贡献指南

我们欢迎所有形式的贡献！请阅读 [贡献指南](./CONTRIBUTING.md) 了解详情。

### 开发流程

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 代码规范

- 使用 TypeScript 进行类型安全开发
- 遵循 ESLint 和 Prettier 配置
- 组件和函数使用 PascalCase 命名
- 文件和变量使用 camelCase 命名
- 🎨 遵循[文案设计规范](./docs/content-design-standards.md)，通过色彩和emoji美化界面
- 🎭 确保界面美观且不单调，提升用户体验
- 提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](./LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Lucide](https://lucide.dev/) - 图标库
- [Radix UI](https://www.radix-ui.com/) - 无障碍组件基础

## 📞 联系我们

- 项目主页: [Twinkle Tools](https://github.com/your-username/twinkle-tools-web)
- 问题反馈: [GitHub Issues](https://github.com/your-username/twinkle-tools-web/issues)
- 邮箱: contact@twinkle-tools.com

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！
