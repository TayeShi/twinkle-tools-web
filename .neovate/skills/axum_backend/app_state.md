# 应用状态

## AppState 结构

```rust
use std::sync::Arc;
use sqlx::PgPool;

#[derive(Clone)]
pub struct AppState {
    pub db_pool: Arc<PgPool>,
    pub user_service: Arc<UserService<PostgresUserRepo>>,
    pub article_service: Arc<ArticleService<PostgresArticleRepo>>,
}
```

## 在 main.rs 中初始化

```rust
use crate::state::AppState;

async fn main() -> Result<()> {
    // 初始化数据库连接池
    let pool = init_database_pool(&config).await?;

    // 初始化 repositories
    let user_repo = PostgresUserRepo::new(pool.clone());
    let article_repo = PostgresArticleRepo::new(pool.clone());

    // 初始化 services
    let user_service = Arc::new(UserService::new(user_repo));
    let article_service = Arc::new(ArticleService::new(article_repo));

    // 创建应用状态
    let state = AppState {
        db_pool: Arc::new(pool),
        user_service,
        article_service,
    };

    // ... 创建路由并启动服务器
}
```

## 在 Handler 中使用 State

```rust
pub async fn get_articles(
    State(state): State<AppState>,
    Query(params): Query<PaginationParams>,
) -> Result<Json<PaginatedArticleResponse>, AppError> {
    let articles = state
        .article_service
        .list_articles(params.page, params.per_page)
        .await?;

    Ok(Json(articles))
}
```

## 注入到 Router

```rust
let app = Router::new()
    .route("/articles", get(get_articles))
    .route("/articles/:id", get(get_article))
    .with_state(state);
```
