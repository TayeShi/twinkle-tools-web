# 环境搭建指南

## 🚀 快速开始

### 系统要求
- **Node.js**: 18.0.0 或更高版本
- **Bun**: 1.0.0 或更高版本 (推荐)
- **操作系统**: Windows 10+, macOS 10.15+, Ubuntu 20.04+
- **内存**: 最少 4GB RAM (推荐 8GB+)
- **存储**: 最少 2GB 可用空间

### 安装 Bun (推荐)
```bash
# macOS / Linux
curl -fsSL https://bun.sh/install | bash

# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"

# 验证安装
bun --version
```

### 替代方案 (使用 npm/yarn)
如果您不使用 Bun，也可以使用传统的包管理器：
```bash
# 使用 npm
npm install -g npm@latest

# 使用 yarn
npm install -g yarn
```

---

## 📦 项目初始化

### 1. 克隆项目
```bash
git clone [repository-url] twinkle-tools-web
cd twinkle-tools-web
```

### 2. 安装依赖
```bash
# 使用 Bun (推荐)
bun install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 3. 环境变量配置
创建 `.env.local` 文件：
```bash
# 开发环境配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Twinkle Tools"
NEXT_PUBLIC_APP_DESCRIPTION="实用工具集合"

# 可选配置
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### 4. 启动开发服务器
```bash
# 使用 Bun
bun run dev

# 或使用 npm
npm run dev

# 或使用 yarn
yarn dev
```

### 5. 访问应用
打开浏览器访问：http://localhost:3000

---

## 🛠 开发环境配置

### VS Code 配置

#### 推荐扩展
创建 `.vscode/extensions.json`：
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "yzhang.markdown-all-in-one"
  ]
}
```

#### 工作区设置
创建 `.vscode/settings.json`：
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

### Git 配置

#### Git Hooks (可选)
安装 Husky 进行 Git 钩子管理：
```bash
bun add -D husky
bun pkg set scripts.prepare="husky install"
bun run prepare
bun husky add .husky/pre-commit "bun run lint && bun run type-check"
```

#### 提交信息规范
创建 `.gitmessage` 文件：
```
# <type>(<scope>): <subject>
#
# <body>
#
# <footer>

# Type should be one of the following:
# * feat (new feature)
# * fix (bug fix)
# * docs (documentation)
# * style (formatting, missing semi colons, etc; no code change)
# * refactor (refactoring production code)
# * test (adding tests, refactoring test; no production code change)
# * chore (updating build tasks, package manager configs, etc; no production code change)
```

---

## 🔧 IDE 配置详情

### TypeScript 配置

#### tsconfig.json 优化
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
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/app/*": ["./app/*"],
      "@/types/*": ["./types/*"]
    },
    "forceConsistentCasingInFileNames": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules", ".next", "dist", "build"]
}
```

### ESLint 配置

#### eslint.config.mjs 优化
```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "no-console": "warn",
      "react-hooks/exhaustive-deps": "warn"
    }
  }
];
```

### Prettier 配置

创建 `.prettierrc.json`：
```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "lf",
  "arrowParens": "avoid",
  "bracketSpacing": true,
  "jsxSingleQuote": false,
  "quoteProps": "as-needed"
}
```

---

## 🐳 Docker 配置 (可选)

### Dockerfile
```dockerfile
# 多阶段构建
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
COPY bun.lockb ./

# 依赖安装阶段
FROM base AS deps
RUN npm install -g bun
RUN bun install --frozen-lockfile

# 构建阶段
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN bun run build

# 运行阶段
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

---

## 🌐 网络配置

### 代理配置
如果需要通过代理访问网络，配置环境变量：
```bash
# HTTP 代理
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080

# Git 代理
git config --global http.proxy http://proxy.company.com:8080
git config --global https.proxy http://proxy.company.com:8080
```

### Bun 镜像配置 (中国用户)
```bash
# 使用国内镜像
bun config set registry https://registry.npmmirror.com
bun config set @bun:registry https://registry.npmmirror.com
```

---

## 📱 移动端开发

### iOS 开发
1. 安装 Xcode (从 App Store)
2. 安装 iOS 模拟器
3. 配置开发者证书

### Android 开发
1. 安装 Android Studio
2. 配置 Android SDK
3. 设置 Android 模拟器

### 调试工具
```bash
# 安装调试工具
bun add -D @capacitor/cli @capacitor/core @capacitor/android @capacitor/ios

# 初始化 Capacitor
npx cap init TwinkleTools com.twinkletools.app
npx cap add android
npx cap add ios
```

---

## 🔍 故障排除

### 常见问题

#### 1. 端口占用
```bash
# 查找占用端口的进程
lsof -ti:3000

# 杀死进程
kill -9 $(lsof -ti:3000)

# 或使用不同端口
bun run dev -- -p 3001
```

#### 2. 依赖安装失败
```bash
# 清理缓存
bun pm cache rm

# 删除 node_modules 重新安装
rm -rf node_modules bun.lockb
bun install

# 使用 yarn 替代
yarn install
```

#### 3. TypeScript 错误
```bash
# 检查 TypeScript 版本
bunx tsc --version

# 重新生成类型定义
bun run build
```

#### 4. 样式不生效
```bash
# 检查 Tailwind 配置
bunx tailwindcss --help

# 重新构建样式
bun run build
```

### 性能问题
```bash
# 启用详细日志
DEBUG=* bun run dev

# 分析构建性能
ANALYZE=true bun run build

# 内存使用监控
node --inspect bun run dev
```

---

## 🧪 测试环境

### 单元测试配置
```bash
# 安装测试框架
bun add -D vitest @testing-library/react @testing-library/jest-dom

# 配置 vitest
bunx vitest init
```

### E2E 测试配置
```bash
# 安装 Playwright
bun add -D @playwright/test

# 初始化配置
bunx playwright install

# 运行测试
bunx playwright test
```

---

## 📈 监控和分析

### 性能监控
```bash
# Lighthouse 分析
bun add -D @lhci/cli
bunx lhci autorun

# Bundle 分析
bun add -D @next/bundle-analyzer
```

### 错误监控
```bash
# Sentry 集成
bun add @sentry/nextjs
```

---

完成以上配置后，您的开发环境就已经搭建完成。现在可以开始愉快地开发了！记住保持工具更新，定期清理缓存，确保开发环境的最佳性能。