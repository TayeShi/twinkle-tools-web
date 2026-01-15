# Repositories - 数据访问层

## Repository Trait 模式

```rust
use async_trait::async_trait;

#[async_trait]
pub trait UserRepo: Send + Sync {
    async fn get_by_id(&self, id: i32) -> Result<Option<User>>;
    async fn get_by_email(&self, email: &str) -> Result<Option<User>>;
    async fn create(&self, email: String, password_hash: String) -> Result<User>;
    async fn update(&self, id: i32, updates: UserUpdate) -> Result<User>;
    async fn delete(&self, id: i32) -> Result<()>;
}
```

## PostgreSQL 实现模板

```rust
use sqlx::PgPool;
use super::traits::UserRepo;

pub struct PostgresUserRepo {
    pool: PgPool,
}

impl PostgresUserRepo {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }
}

#[async_trait]
impl UserRepo for PostgresUserRepo {
    async fn get_by_id(&self, id: i32) -> Result<Option<User>> {
        let user = query_as!(
            User,
            "SELECT id, email, password_hash, is_active FROM users WHERE id = $1",
            id
        )
        .fetch_optional(&self.pool)
        .await?;
        Ok(user)
    }

    async fn create(&self, email: String, password_hash: String) -> Result<User> {
        let user = query_as!(
            User,
            "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *",
            email,
            password_hash
        )
        .fetch_one(&self.pool)
        .await?;
        Ok(user)
    }
}
```

## 命名约定

- Trait 文件：`traits/<resource>_repo.rs`
- 实现文件：`implementations/postgres_<resource>_repo.rs`
- Trait 名：`<Resource>Repo`
- 实现名：`<Database><Resource>Repo`（如 `PostgresUserRepo`）
- 方法名：`snake_case`（如 `find_by_id`、`create`）
