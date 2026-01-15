# 认证与授权

## JWT Claims 结构

```rust
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Claims {
    pub user_id: i32,
    pub email: String,
    pub exp: usize,
}
```

## JWT 生成

```rust
use jsonwebtoken::{encode, EncodingKey, Header};

fn generate_jwt(user_id: i32, email: String, secret: &str) -> Result<String, AppError> {
    let expiration = Utc::now()
        .checked_add_signed(Duration::days(7))
        .expect("valid timestamp")
        .timestamp();

    let claims = Claims {
        user_id,
        email,
        exp: expiration as usize,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_ref()),
    )
    .map_err(|_| AppError::InternalServerError)
}
```

## JWT 验证

```rust
use jsonwebtoken::{decode, DecodingKey, Validation};

fn decode_jwt(token: &str, secret: &str) -> Result<Claims, AppError> {
    decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::default(),
    )
    .map(|data| data.claims)
    .map_err(|_| AppError::Unauthorized)
}
```

## 密码哈希

```rust
use bcrypt::{hash, verify, DEFAULT_COST};

fn hash_password(password: &str) -> Result<String, AppError> {
    hash(password, DEFAULT_COST).map_err(|_| AppError::InternalServerError)
}

fn verify_password(password: &str, hash: &str) -> Result<bool, AppError> {
    verify(password, hash).map_err(|_| AppError::InternalServerError)
}
```

## 认证流程

1. 客户端发送凭证到 `POST /auth/login`
2. Service 验证邮箱格式和密码
3. Repository 根据 email 获取用户
4. bcrypt 验证密码哈希
5. 生成 JWT（包含 user_id、email、过期时间）
6. 返回 token 给客户端

## 受保护路由

1. 客户端发送 `Authorization: Bearer <token>`
2. 认证中间件提取并验证 JWT
3. 用户 ID 添加到请求 extensions
4. Handler 提取 user_id 并调用 service

## 提取当前用户

```rust
use axum::extract::Request;

pub async fn extract_user_id(request: Request) -> Result<i32, AppError> {
    request
        .extensions()
        .get::<i32>()
        .copied()
        .ok_or(AppError::Unauthorized)
}
```
