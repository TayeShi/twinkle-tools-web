# AUXM 后端开发技能

## 适用范围

此技能集适用于基于 Rust + Axum + PostgreSQL 的 RESTful API 项目。

## 何时使用

当项目需要遵循 AUXM 后端架构模式时使用，包括：
- 四层架构（API/Service/Repository/Domain）
- Repository Trait 模式
- 依赖注入设计
- JWT 认证
- OpenAPI 文档

## 文件说明

| 文件 | 说明 |
|------|------|
| project_structure.md | 推荐的项目目录结构 |
| handlers.md | Handler 代码模板和模式 |
| services.md | Service 层实现模式 |
| repositories.md | Repository Trait 和实现模式 |
| error_handling.md | 错误处理和响应格式 |
| middleware.md | 中间件实现（日志、认证、速率限制） |
| database.md | 数据库操作和迁移 |
| authentication.md | JWT 认证和密码哈希 |
| openapi.md | OpenAPI/Swagger 文档配置 |
| docker.md | Docker 配置和部署 |
| app_state.md | 应用状态管理 |
| validation.md | 请求数据验证 |
| development.md | 开发命令 |
| dependencies.md | 核心依赖配置 |

## 技术栈

- Runtime: Tokio 1.x
- Web Framework: Axum 0.8
- Database: PostgreSQL + sqlx 0.8
- Auth: JWT + bcrypt
- API Docs: OpenAPI + Swagger UI
- Validation: validator
