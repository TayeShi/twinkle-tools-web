# Services - 业务逻辑层

## Service 模式模板

```rust
use std::sync::Arc;
use crate::repository::traits::UserRepo;

pub struct UserService<T: UserRepo> {
    user_repo: Arc<T>,
}

impl<T: UserRepo + Send + Sync> UserService<T> {
    pub fn new(user_repo: T) -> Self {
        Self {
            user_repo: Arc::new(user_repo),
        }
    }

    pub async fn create_user(&self, email: String, password: String) -> Result<User, AppError> {
        // 业务逻辑
        let hashed_password = bcrypt::hash(&password, 12)?;
        let user = self.user_repo.create(email, hashed_password).await?;
        Ok(user)
    }
}
```

## 在 main.rs 中实例化

```rust
let user_service = Arc::new(UserService {
    user_repo: PostgresUserRepo::new(pool.clone()),
});
```

所有服务用 `Arc` 包装以便在异步任务间共享状态。

## 命名约定

- 文件名：`<resource>_service.rs`（如 `user_service.rs`）
- 结构体名：`<Resource>Service`（如 `UserService`）
- 方法名：`snake_case`（如 `create_user`、`get_by_email`）
