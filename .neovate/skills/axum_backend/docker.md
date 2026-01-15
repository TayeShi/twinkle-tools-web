# Docker 和部署

## Dockerfile（多阶段构建）

```dockerfile
# 构建阶段
FROM rust:1.83 as builder
WORKDIR /app

# 复制依赖文件
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release --bins
RUN rm -rf src

# 复制源代码
COPY src ./src
RUN touch src/main.rs
RUN cargo build --release --bins

# 运行阶段
FROM debian:bookworm-slim

# 安装运行时依赖
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 创建非 root 用户
RUN useradd -m -u 1000 appuser
USER appuser

COPY --from=builder /app/target/release/app-name /usr/local/bin/app-name

EXPOSE 8080
CMD ["app-name"]
```

## 健康检查

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1
```

## Docker Compose（本地开发）

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgres://user:password@db:5432/app
      - JWT_SECRET=your-secret
      - ENV=development
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=app
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

## 优雅关闭

```rust
use tokio::signal;
use axum::Router;
use std::time::Duration;

async fn shutdown_signal() {
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }

    tracing::info!("signal received, starting graceful shutdown");
}

// 在 main 中使用
axum::serve(listener, app)
    .with_graceful_shutdown(shutdown_signal())
    .await
    .unwrap();
```

## 环境变量

必需的环境变量：
- `DATABASE_URL` - 数据库连接字符串
- `JWT_SECRET` - JWT 签名密钥（至少 32 字节）
- `ENV` - 环境（development/production）
- `SERVICE_PORT` - 服务端口（默认：8080）

## 配置结构

```rust
#[derive(Debug, Deserialize, Clone)]
pub struct Config {
    pub port: u16,
    pub host: String,
    pub database_url: String,
    pub jwt_secret: String,
    pub env: String,
}

impl Config {
    pub fn from_env() -> Result<Self, envy::Error> {
        envy::prefixed("APP_")
            .from_env()
    }
}
```

## .env 文件示例

```env
DATABASE_URL=postgres://user:password@localhost:5432/db_name
JWT_SECRET=your-secret-key-at-least-32-bytes-long
ENV=development
SERVICE_PORT=8080
```
