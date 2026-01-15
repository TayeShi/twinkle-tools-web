# 开发命令

## 核心 Cargo 命令

```bash
# 构建项目
cargo build

# 生产环境构建（优化）
cargo build --release

# 运行开发服务器
cargo run

# 运行测试
cargo test

# 快速检查代码（不编译）
cargo check

# 格式化代码
cargo fmt

# 运行 linter
cargo clippy
```

## 测试命令

```bash
# 运行所有测试
cargo test

# 运行特定测试文件
cargo test auth_test

# 运行测试并显示输出
cargo test -- --nocapture

# 运行特定测试
cargo test test_user_register_logic
```

## Docker 命令

```bash
# 构建 Docker 镜像
docker build -t app-name .

# 运行容器
docker run -p 8080:8080 -e DATABASE_URL="postgres://..." app-name

# 使用环境变量文件运行容器
docker run -p 8080:8080 --env-file .env app-name

# Docker Compose 启动
docker-compose up -d

# Docker Compose 停止
docker-compose down

# 查看日志
docker-compose logs -f
```

## 数据库迁移命令（sqlx-cli）

```bash
# 创建迁移
sqlx migrate add create_users_table

# 运行迁移
sqlx migrate run

# 回滚迁移
sqlx migrate revert

# 查看迁移状态
sqlx migrate info
```

## 依赖管理

```bash
# 添加依赖
cargo add serde

# 添加开发依赖
cargo add --dev tokio-test

# 更新依赖
cargo update

# 检查过期依赖
cargo outdated
```
