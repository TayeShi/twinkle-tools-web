# AUXM 后端项目结构

## 推荐目录结构

```
src/
├── api/                      # API 层
│   ├── handlers/             # 请求处理器（每个资源一个文件）
│   │   ├── auth.rs
│   │   ├── article.rs
│   │   └── ...
│   ├── middleware.rs         # 中间件
│   ├── routes.rs             # 路由定义
│   └── utils.rs              # API 工具
├── service/                  # Service 层
│   ├── user_service.rs
│   ├── article_service.rs
│   └── ...
├── repository/               # Repository 层
│   ├── traits/               # Repository 接口
│   │   ├── user_repo.rs
│   │   └── ...
│   └── implementations/      # 数据库实现
│       ├── postgres_user_repo.rs
│       └── ...
├── domain/                   # 领域层
│   ├── models/               # 领域模型
│   │   ├── user.rs
│   │   ├── article.rs
│   │   └── ...
│   ├── errors.rs            # 自定义错误
│   └── mod.rs
├── infrastructure/           # 基础设施
│   ├── config.rs            # 配置管理
│   ├── database.rs          # 数据库初始化
│   ├── auth.rs              # 认证工具
│   └── logging.rs           # 日志配置
├── main.rs                  # 应用入口
└── state.rs                 # 应用状态

tests/                       # 集成测试
migrations/                  # 数据库迁移
docs/agent/                  # 开发文档
```

## 请求处理流程

1. HTTP 请求到达 Router
2. 日志中间件记录请求
3. 认证中间件验证 JWT（受保护路由）
4. Handler 提取参数（State/Path/Query/Body）
5. Service 执行业务逻辑
6. Repository 执行数据库查询
7. 响应映射为 DTO 并返回
8. 日志中间件记录耗时和状态码
