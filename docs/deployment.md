# 构建部署指南

## 🚀 部署概述

Twinkle Tools 是一个基于 Next.js 14 的现代 Web 应用，支持多种部署方式。本指南涵盖了从开发到生产环境的完整部署流程。

### 部署目标
- 🌐 **静态生成** - 适用于内容网站
- ⚡ **服务端渲染** - 适用于动态应用
- 🔄 **混合模式** - 结合两者优势
- 📱 **移动应用** - PWA 或原生应用

---

## 🏗 构建配置

### 基础构建命令
```bash
# 使用 Bun (推荐)
bun run build

# 使用 npm
npm run build

# 使用 yarn
yarn build
```

### 构建输出分析
```bash
# 启用包分析
ANALYZE=true bun run build

# 查看构建详情
bun run build --debug
```

### 环境变量配置
创建 `.env.production`：
```bash
# 生产环境配置
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME="Twinkle Tools"
NEXT_PUBLIC_APP_DESCRIPTION="实用工具集合"

# API 配置
API_BASE_URL=https://api.your-domain.com

# 第三方服务
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
SENTRY_DSN=https://xxxxx@xxxx.ingest.sentry.io/xxxxx

# 性能优化
NEXT_MINIMIZE=true
NEXT_OPTIMIZE_FONTS=true
NEXT_OPTIMIZE_IMAGES=true
```

---

## 📦 静态部署 (推荐)

### Vercel 部署
```bash
# 1. 安装 Vercel CLI
bun add -D vercel

# 2. 登录 Vercel
bunx vercel login

# 3. 部署项目
bunx vercel --prod

# 4. 配置域名
bunx vercel domains add your-domain.com
```

#### vercel.json 配置
```json
{
  "version": 2,
  "buildCommand": "bun run build",
  "outputDirectory": ".next",
  "installCommand": "bun install",
  "framework": "nextjs",
  "functions": {
    "app/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

### Netlify 部署
```bash
# 1. 安装 Netlify CLI
bun add -D netlify-cli

# 2. 登录 Netlify
bunx netlify login

# 3. 构建项目
bun run build && bunx netlify export

# 4. 部署
bunx netlify deploy --prod --dir=out
```

#### netlify.toml 配置
```toml
[build]
  command = "bun run build && bunx next export"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"
  BUN_VERSION = "latest"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 404

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### GitHub Pages 部署
```bash
# 1. 配置 next.config.ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

# 2. 构建项目
bun run build

# 3. 部署到 gh-pages 分支
bun add -D gh-pages
bunx gh-pages -d out -b main
```

---

## 🐳 Docker 部署

### 多阶段构建 Dockerfile
```dockerfile
# 基础镜像
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 依赖安装阶段
FROM base AS deps
RUN npm install -g bun
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# 构建阶段
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN bun run build

# 运行阶段
FROM node:18-alpine AS runner
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
      - NEXT_PUBLIC_APP_URL=https://your-domain.com
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### Nginx 配置
```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:3000;
    }

    server {
        listen 80;
        server_name your-domain.com;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name your-domain.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;

        location / {
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # 静态资源缓存
        location /_next/static/ {
            proxy_pass http://app;
            add_header Cache-Control "public, max-age=31536000, immutable";
        }
    }
}
```

---

## ☁️ 云平台部署

### AWS 部署
```bash
# 1. 安装 AWS CLI
pip install awscli

# 2. 配置 AWS 凭证
aws configure

# 3. 使用 AWS Amplify
npm install -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish
```

### Google Cloud Platform
```bash
# 1. 安装 gcloud CLI
curl https://sdk.cloud.google.com | bash

# 2. 登录
gcloud auth login

# 3. 部署到 Cloud Run
gcloud builds submit --tag gcr.io/PROJECT_ID/twinkle-tools
gcloud run deploy --image gcr.io/PROJECT_ID/twinkle-tools --platform managed
```

### Microsoft Azure
```bash
# 1. 安装 Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# 2. 登录
az login

# 3. 部署到 Azure Static Web Apps
az staticwebapp create \
  --name twinkle-tools \
  --resource-group my-resource-group \
  --source https://github.com/your-username/twinkle-tools \
  --branch main \
  --location "centralus"
```

---

## 🔧 CI/CD 配置

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
          
      - name: Install dependencies
        run: bun install --frozen-lockfile
        
      - name: Build
        run: bun run build
        env:
          NEXT_PUBLIC_APP_URL: ${{ secrets.NEXT_PUBLIC_APP_URL }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### GitLab CI/CD
```yaml
# .gitlab-ci.yml
stages:
  - build
  - deploy

variables:
  NODE_VERSION: "18"
  BUN_VERSION: "latest"

build:
  stage: build
  image: node:$NODE_VERSION
  before_script:
    - curl -fsSL https://bun.sh/install | bash
    - export BUN_INSTALL="$HOME/.bun"
    - export PATH="$BUN_INSTALL/bin:$PATH"
  script:
    - bun install --frozen-lockfile
    - bun run build
  artifacts:
    paths:
      - .next/
      - out/

deploy:
  stage: deploy
  image: alpine:latest
  dependencies:
    - build
  script:
    - apk add --no-cache rsync openssh-client
    - rsync -avz out/ user@server:/var/www/twinkle-tools/
  only:
    - main
```

---

## 🔍 性能优化

### 构建优化
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  // 压缩配置
  compress: true,
  
  // 实验性功能
  experimental: {
    // 启用 Turbopack
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // 图片优化
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 字体优化
  optimizeFonts: true,
  
  // 实验性功能
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Webpack 配置
  webpack: (config, { isServer }) => {
    // 优化包大小
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    
    return config;
  },
}
```

### 运行时优化
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  // 预加载关键资源
  preload: [
    {
      url: '/fonts/geist-sans.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
  ],
  
  // DNS 预获取
  dnsPrefetch: ['https://fonts.googleapis.com'],
  
  // 预连接
  preconnect: ['https://fonts.gstatic.com'],
}
```

---

## 🔒 安全配置

### HTTPS 配置
```nginx
# 强制 HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS 配置
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    # SSL 证书
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # SSL 配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;
    
    # 安全头
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
```

### 环境变量安全
```bash
# 加密敏感数据
NEXT_PUBLIC_APP_KEY=encrypted_key_here
API_SECRET=encrypted_secret_here

# 使用加密服务
bunx @vercel/encrypted-env-cli encrypt
```

---

## 📊 监控和日志

### 性能监控
```typescript
// lib/monitoring.ts
export function reportWebVitals(metric: NextWebVitalsMetric) {
  // 发送到分析服务
  if (process.env.NODE_ENV === 'production') {
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }
}
```

### 错误监控
```typescript
// app/layout.tsx
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

---

## 🔄 部署检查清单

### 部署前检查
- [ ] 环境变量配置完整
- [ ] 构建成功无错误
- [ ] 性能指标达标
- [ ] 安全配置就绪
- [ ] 备份当前版本
- [ ] 通知相关人员

### 部署后验证
- [ ] 网站可访问
- [ ] 功能正常运行
- [ ] 性能指标良好
- [ ] 错误监控正常
- [ ] SEO 标签正确
- [ ] 移动端适配

### 回滚准备
- [ ] 备份版本可用
- [ ] 回滚脚本就绪
- [ ] 回滚流程文档
- [ ] 紧急联系人

---

## 📈 成本优化

### 静态部署成本
- **Vercel**: Hobby 计划免费，Pro 计划 $20/月
- **Netlify**: Starter 计划免费，Pro 计划 $19/月
- **GitHub Pages**: 完全免费
- **Cloudflare Pages**: 免费计划

### 服务器部署成本
- **VPS**: $5-20/月 (根据配置)
- **CDN**: $0-10/月 (根据流量)
- **域名**: $10-15/年
- **SSL 证书**: 免费 (Let's Encrypt)

---

通过遵循这个部署指南，您可以安全、高效地将 Twinkle Tools 部署到生产环境。记住定期备份和监控，确保应用的稳定运行。