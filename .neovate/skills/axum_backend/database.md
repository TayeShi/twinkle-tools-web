# 数据库操作

## 数据库连接池配置

```rust
use sqlx::{PgPool, ConnectOptions};
use sqlx::postgres::PgConnectOptions;

let pool = PgPool::connect_with(
    config.database_url
        .parse::<PgConnectOptions>()
        .expect("无法解析数据库连接选项")
        .max_connections(20)
        .min_connections(5)
        .acquire_timeout(Duration::from_secs(30))
        .idle_timeout(Duration::from_secs(600))
        .max_lifetime(Duration::from_secs(1800))
        .disable_statement_logging()
)
.await
.expect("无法连接到数据库");
```

## 查询模式

### 带结果映射的查询

```rust
let user = query_as!(
    User,
    "SELECT id, email, password_hash, is_active FROM users WHERE id = $1",
    id
)
.fetch_optional(&self.pool)
.await?;
```

### 不带映射的查询（更新/插入）

```rust
query!(
    "UPDATE articles SET title = $1 WHERE id = $2",
    title,
    id
)
.execute(&self.pool)
.await?;
```

## 分页

### 分页参数

```rust
#[derive(Deserialize)]
pub struct PaginationParams {
    pub page: Option<i32>,
    pub per_page: Option<i32>,
}
```

### 分页响应

```rust
pub struct PaginatedResponse<T> {
    pub items: Vec<T>,
    pub total: i64,
    pub page: i32,
    pub per_page: i32,
}
```

### Offset 计算

```rust
let page = query_params.page.unwrap_or(1);
let per_page = query_params.per_page.unwrap_or(10).min(100);
let offset = (page - 1) * per_page;
```

## JSONB 使用

```rust
use serde_json::Value;

query!(
    "INSERT INTO memory_cards (title, content) VALUES ($1, $2)",
    title,
    content_jsonb as Value,
)
.execute(&self.pool)
.await?;
```

## 数组列使用

### 按数组包含过滤

```rust
query_as!(
    Article,
    "SELECT * FROM articles WHERE tags && $1",
    &tag_filter as &[String]
)
.fetch_all(&self.pool)
.await?;
```

### 插入数组

```rust
query!(
    "INSERT INTO articles (title, tags) VALUES ($1, $2)",
    title,
    &tags_vec as &[String]
)
.execute(&self.pool)
.await?;
```

## 数据库迁移

### 方式一：自动初始化

```rust
async fn init_db_tables(pool: &PgPool) {
    sqlx::query(r#"
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT NOW()
        )
    "#).execute(pool).await.unwrap();
}
```

### 方式二：使用 sqlx-cli（推荐生产环境）

```bash
# 安装 sqlx-cli
cargo install sqlx-cli --no-default-features --features rustls,postgres

# 创建迁移
sqlx migrate add create_users_table

# 运行迁移
sqlx migrate run

# 回滚迁移
sqlx migrate revert
```

迁移文件位置：`migrations/*.sql`
