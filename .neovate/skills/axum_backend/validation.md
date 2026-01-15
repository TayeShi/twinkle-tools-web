# 数据验证

## 使用 validator crate

```toml
[dependencies]
validator = { version = "0.18", features = ["derive"] }
```

## 请求验证

```rust
use validator::Validate;

#[derive(Deserialize, Validate)]
pub struct CreateUserRequest {
    #[validate(email)]
    pub email: String,

    #[validate(length(min = 8))]
    pub password: String,
}

#[derive(Deserialize, Validate)]
pub struct UpdateUserRequest {
    #[validate(email)]
    pub email: Option<String>,

    #[validate(length(min = 8))]
    pub password: Option<String>,
}
```

## 在 Handler 中验证

```rust
pub async fn register_handler(
    Json(payload): Json<CreateUserRequest>,
) -> Result<Json<LoginResponse>, AppError> {
    // 验证请求
    payload.validate().map_err(|e| {
        AppError::ValidationError(e.to_string())
    })?;

    // 继续处理...
    Ok(Json(response))
}
```

## 自定义验证

```rust
use validator::{ValidationError, ValidationErrors};

fn validate_password_strength(password: &str) -> Result<(), ValidationError> {
    if !password.chars().any(|c| c.is_ascii_uppercase()) {
        return Err(ValidationError::new("must contain uppercase letter"));
    }
    if !password.chars().any(|c| c.is_ascii_digit()) {
        return Err(ValidationError::new("must contain digit"));
    }
    Ok(())
}

#[derive(Deserialize, Validate)]
pub struct CreateUserRequest {
    #[validate(email)]
    pub email: String,

    #[validate(length(min = 8), custom = "validate_password_strength")]
    pub password: String,
}
```

## 可选字段验证

```rust
#[derive(Deserialize, Validate)]
pub struct UpdateArticleRequest {
    #[validate(length(min = 1, max = 200))]
    pub title: Option<String>,

    #[validate(length(min = 1))]
    pub content: Option<String>,

    #[validate(length(min = 1, max = 5))]
    pub tags: Option<Vec<String>>,
}
```
