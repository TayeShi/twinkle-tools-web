# OpenAPI 文档

## Schema 文档模板

```rust
#[derive(Deserialize, Serialize, ToSchema)]
pub struct CreateUserRequest {
    #[schema(example = "user@example.com")]
    pub email: String,

    #[schema(min_length = 8)]
    pub password: String,
}

#[derive(Deserialize, Serialize, ToSchema)]
pub struct LoginResponse {
    #[schema(example = "eyJhbGc...")]
    pub token: String,
}

#[derive(Deserialize, Serialize, ToSchema)]
pub struct ArticleResponse {
    pub id: i32,
    pub title: String,
    pub content: String,
    pub tags: Vec<String>,
}
```

## 分页响应 Schema

```rust
#[derive(Deserialize, Serialize, ToSchema)]
pub struct PaginatedResponse<T> {
    pub items: Vec<T>,
    pub total: i64,
    pub page: i32,
    pub per_page: i32,
}

// 泛型需要使用 ToSchema trait 的 into_schema 方法
#[derive(ToSchema)]
pub struct PaginatedArticleResponse {
    pub items: Vec<ArticleResponse>,
    pub total: i64,
    pub page: i32,
    pub per_page: i32,
}
```

## 错误响应 Schema

```rust
#[derive(Deserialize, Serialize, ToSchema)]
pub struct ErrorDetails {
    #[serde(rename = "type")]
    pub error_type: String,
    pub message: String,
    pub details: Option<String>,
    pub request_id: String,
}
```

## 启用 Swagger UI

```rust
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

#[derive(OpenApi)]
#[openapi(
    paths(
        health_handler,
        login_handler,
        register_handler,
    ),
    components(schemas(
        HealthData,
        LoginRequest,
        LoginResponse,
        CreateUserRequest,
        ErrorDetails,
    ))
)]
struct ApiDoc;

let app = Router::new()
    .merge(SwaggerUi::new("/swagger-ui")
        .url("/api-docs/openapi.json", ApiDoc::openapi()))
    // ... 其他路由
;
```

访问 Swagger UI：`http://localhost:8080/swagger-ui`
访问 OpenAPI JSON：`http://localhost:8080/api-docs/openapi.json`
