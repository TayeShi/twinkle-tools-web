# Development Commands

## axum_backend (Rust + Axum)

### Build Commands

```bash
# Build project
cargo build

# Build with optimizations
cargo build --release

# Check code without building
cargo check
```

### Test Commands

```bash
# Run all tests
cargo test

# Run specific test file
cargo test auth_test

# Show test output
cargo test -- --nocapture

# Run specific test
cargo test test_user_register_logic
```

### Linting & Formatting

```bash
# Format code
cargo fmt

# Check formatting without changing files
cargo fmt -- --check

# Run Clippy linter
cargo clippy

# Fix Clippy warnings automatically
cargo clippy --fix
```

### Database Commands (SQLx)

```bash
# Create new migration
sqlx migrate add <migration_name>

# Run migrations
sqlx migrate run

# Revert last migration
sqlx migrate revert

# Prepare database for compile-time checks
cargo sqlx prepare
```

### OpenAPI Documentation

```bash
# Generate OpenAPI spec (if configured)
cargo run --bin generate-openapi
```

## nextjs_frontend (Next.js 16 + TypeScript)

### Development

```bash
# Start development server
npm run dev

# Start production server
npm run start
```

### Build Commands

```bash
# Build for production
npm run build

# Build and analyze bundle size
npm run build && npm run analyze
```

### Linting & Formatting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint -- --fix

# Format code with Prettier
npm run format

# Check format without changing files
npm run format -- --check
```

### Test Commands

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Update snapshots
npm test -- -u
```

### Type Checking

```bash
# Run TypeScript compiler
npm run typecheck
```

### Environment Variables

```bash
# Validate environment variables
npm run validate-env
```

## Repository Maintenance

### Git Operations

```bash
# Show all tracked files
git status

# Show skill directory structure
tree axum_backend/
tree nextjs_frontend/
```

### Documentation Validation

```bash
# Verify SKILL.md format (manual checklist)
# Check:
# - 适用范围 section exists
# - 何时使用 section exists
# - 文件说明 table is complete
# - 技术栈 section exists
```

### Adding New Skills

```bash
# Create new skill directory structure
mkdir -p <skill_name>/
touch <skill_name>/SKILL.md

# Copy and edit template from SKILLS_STANDARD.md
```

## CI/CD Commands (If Configured)

```bash
# Run full CI pipeline locally
npm run ci

# Deploy to production (if configured)
npm run deploy
```
