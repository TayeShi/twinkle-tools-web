# Handlers - 请求处理器

## Handler 签名模板

```rust
use axum::{
    extract::{State, Path, Query},
    http::HeaderMap,
    response::Json as AxumJson,
};

pub async fn handler_name(
    headers: HeaderMap,                     // 用于提取 auth token
    State(state): State<AppState>,          // App 状态注入
    Path(param): Path<Type>,                // URL 路径参数
    Query(query): Query<Struct>,            // 查询字符串参数
    Json(payload): Json<Type>,              // 请求体（JSON）
) -> Result<AxumJson<Response>, AppError>
```

## 命名约定

- 文件名：`<resource>.rs`（如 `auth.rs`、`article.rs`）
- 函数名：`kebab-case`（如 `login_handler`、`get_current_user`）
- 路由路径：资源复数形式（`/articles`、`/users`）

## 响应格式

### 成功响应（无包装信封）
```rust
Ok(AxumJson(UserInfoResponse { id, email, is_active }))
```

### 错误响应（结构化）
```rust
{
    "type": "ValidationError",
    "message": "Invalid email format",
    "details": {...},
    "request_id": "uuid"
}
```

## 健康检查端点

```rust
#[utoipa::path(
    get,
    path = "/health",
    tag = "health",
    responses(
        (status = 200, description = "服务健康状态", body = HealthData)
    )
)]
pub async fn health_handler() -> AxumJson<HealthData> {
    AxumJson(HealthData {
        status: "ok".to_string(),
        timestamp: chrono::Utc::now().to_rfc3339(),
        version: "1.0.0".to_string(),
    })
}
```

## OpenAPI 文档注解

```rust
#[utoipa::path(
    get,
    path = "/articles",
    params(
        ("page" = Option<i32>, Query, description = "页码"),
        ("per_page" = Option<i32>, Query, description = "每页数量")
    ),
    responses(
        (status = 200, description = "成功", body = PaginatedArticleResponse),
        (status = 400, description = "错误请求")
    ),
    tag = "articles"
)]
pub async fn get_articles(...) -> Result<Json<PaginatedArticleResponse>, AppError>
```
