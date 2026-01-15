# 中间件

## 中间件栈模板

```rust
use axum::Router;
use axum::middleware::{from_fn};

Router::new()
    .merge(public_routes)
    .merge(protected_routes.layer(from_fn(auth_middleware)))
    .layer(from_fn(logging_middleware))
```

- **日志中间件**（外层）：应用于所有路由
- **认证中间件**（内层）：仅应用于受保护路由

## 日志中间件

```rust
use axum::{
    http::{HeaderMap, Request},
    middleware::Next,
    response::Response,
};

pub async fn logging_middleware(
    headers: HeaderMap,
    request: Request,
    next: Next,
) -> Response {
    let start = std::time::Instant::now();
    let method = request.method().clone();
    let uri = request.uri().clone();
    let path = uri.path();

    let response = next.run(request).await;

    let duration = start.elapsed();
    let status = response.status();

    tracing::info!(
        method = %method,
        path = %path,
        status = %status,
        duration_ms = duration.as_millis(),
        "{} {} {} {:?}",
        method,
        path,
        status,
        duration
    );

    response
}
```

## JWT 认证中间件

```rust
use axum::{
    extract::{Request, State},
    http::StatusCode,
    middleware::Next,
    response::Response,
};
use jsonwebtoken::{decode, DecodingKey, Validation};

pub async fn auth_middleware(
    State(state): State<AppState>,
    request: Request,
    next: Next,
) -> Result<Response, StatusCode> {
    let auth_header = request
        .headers()
        .get("Authorization")
        .and_then(|h| h.to_str().ok());

    if let Some(auth_value) = auth_header {
        if let Some(token) = auth_value.strip_prefix("Bearer ") {
            match decode_jwt(token, &state.jwt_secret) {
                Ok(claims) => {
                    // 将用户 ID 添加到 request extensions
                    let mut request = request;
                    request.extensions_mut().insert(claims.user_id);
                    return Ok(next.run(request).await);
                }
                Err(_) => return Err(StatusCode::UNAUTHORIZED),
            }
        }
    }

    Err(StatusCode::UNAUTHORIZED)
}
```

## 速率限制中间件

```toml
[dependencies]
tower-governor = "0.4"
```

```rust
use tower_governor::{Governor, GovernorConfigBuilder};

let governor_conf = Box::new(
    GovernorConfigBuilder::default()
        .per_second(10)
        .burst_size(20)
        .finish()
        .unwrap(),
);

Router::new()
    .route("/", get(handler))
    .layer(Governor::new(&governor_conf))
```

## 压缩中间件

```rust
use tower_http::compression::CompressionLayer;

Router::new()
    .route("/", get(handler))
    .layer(CompressionLayer::new())
```

## 超时中间件

```rust
use tower::timeout::TimeoutLayer;
use std::time::Duration;

Router::new()
    .layer(TimeoutLayer::new(Duration::from_secs(30)))
```
