# 核心依赖

## Cargo.toml 推荐配置

```toml
[package]
name = "app-name"
version = "1.0.0"
edition = "2021"

[dependencies]
# Web 框架
axum = { version = "0.8", features = ["tokio", "json"] }
tower = "0.3"
tower-http = { version = "0.5", features = ["cors", "compression"] }

# 异步运行时
tokio = { version = "1.0", features = ["full"] }

# 序列化
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

# 数据库
sqlx = { version = "0.8", features = ["postgres", "runtime-tokio-rustls"] }

# 认证
jsonwebtoken = "9.2"
bcrypt = "0.17"

# 验证
validator = { version = "0.18", features = ["derive"] }

# API 文档
utoipa = { version = "5", features = ["axum_extras"] }
utoipa-swagger-ui = { version = "9", features = ["axum"] }

# 日志
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter"] }

# 错误处理
thiserror = "1.0"

# 配置
dotenvy = "0.15"
envy = "0.4"

# 时间处理
chrono = { version = "0.4", features = ["serde"] }

# 异步 trait
async-trait = "0.1"

# UUID
uuid = { version = "1.0", features = ["v4", "serde"] }

[dev-dependencies]
tokio-test = "0.4"
mockall = "0.13"
```

## 版本规范

- Rust Edition: 2021
- 异步运行时: Tokio 1.x
- 数据库: PostgreSQL + sqlx 0.8+
- 认证: JWT + bcrypt
- API 文档: OpenAPI + Swagger UI
