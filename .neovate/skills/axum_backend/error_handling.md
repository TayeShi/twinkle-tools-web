# 错误处理

## AppError 枚举定义

```rust
use thiserror::Error;
use axum::{http::StatusCode, response::{IntoResponse, Json}};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug, utoipa::ToSchema)]
pub struct ErrorDetails {
    #[serde(rename = "type")]
    error_type: String,
    message: String,
    details: Option<String>,
    request_id: String,
}

#[derive(Error, Debug)]
pub enum AppError {
    #[error("Resource not found: {0}")]
    NotFound(String),

    #[error("Database error: {0}")]
    DatabaseError(#[from] sqlx::Error),

    #[error("Validation error: {0}")]
    ValidationError(String),

    #[error("Unauthorized access")]
    Unauthorized,

    #[error("Email already exists")]
    EmailAlreadyExists,

    #[error("Internal server error")]
    InternalServerError,

    #[error("Password mismatch")]
    PasswordMismatch,

    #[error("User not active")]
    UserNotActive,
}
```

## IntoResponse 实现

```rust
impl IntoResponse for AppError {
    fn into_response(self) -> axum::response::Response {
        let status_code = match self {
            AppError::NotFound(_) => StatusCode::NOT_FOUND,
            AppError::ValidationError(_) => StatusCode::BAD_REQUEST,
            AppError::Unauthorized => StatusCode::UNAUTHORIZED,
            AppError::EmailAlreadyExists => StatusCode::CONFLICT,
            AppError::InternalServerError => StatusCode::INTERNAL_SERVER_ERROR,
            AppError::PasswordMismatch => StatusCode::UNAUTHORIZED,
            AppError::UserNotActive => StatusCode::UNAUTHORIZED,
            AppError::DatabaseError(_) => StatusCode::INTERNAL_SERVER_ERROR,
        };

        let error_type = match self {
            AppError::NotFound(_) => "NOT_FOUND",
            AppError::ValidationError(_) => "BAD_REQUEST",
            AppError::Unauthorized => "UNAUTHORIZED",
            AppError::EmailAlreadyExists => "CONFLICT",
            AppError::InternalServerError => "INTERNAL_SERVER_ERROR",
            AppError::PasswordMismatch => "UNAUTHORIZED",
            AppError::UserNotActive => "UNAUTHORIZED",
            AppError::DatabaseError(_) => "INTERNAL_SERVER_ERROR",
        };

        let message = format!("{}", self);

        let error_details = ErrorDetails {
            error_type: error_type.to_string(),
            message,
            details: None,
            request_id: Uuid::new_v4().to_string(),
        };

        (status_code, Json(error_details)).into_response()
    }
}
```

## HTTP 状态码映射

| 状态码 | 场景 |
|--------|------|
| 200 OK | 成功 |
| 201 Created | 创建成功 |
| 400 Bad Request | 请求参数错误 |
| 401 Unauthorized | 未认证 |
| 403 Forbidden | 权限不足 |
| 404 Not Found | 资源不存在 |
| 409 Conflict | 资源冲突 |
| 500 Internal Server Error | 服务器错误 |
