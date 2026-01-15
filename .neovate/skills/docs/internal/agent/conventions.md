# Code & Documentation Conventions

## Naming Conventions

### axum_backend

#### File Names
- Source files: `snake_case.rs` (e.g., `auth.rs`, `article.rs`)
- Module files: `mod.rs` in directories
- Test files: `<module>_test.rs` in `tests/` directory

#### Code Naming
- **Functions**: `kebab-case` (e.g., `login_handler`, `get_current_user`)
- **Structs**: `PascalCase` (e.g., `UserService`, `AppState`)
- **Traits**: `PascalCase` with `Repo` suffix (e.g., `UserRepo`, `ArticleRepo`)
- **Enums**: `PascalCase` (e.g., `AppError`, `Role`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `MAX_RETRIES`)
- **Variables**: `snake_case` (e.g., `user_repo`, `hashed_password`)

#### Handler Naming
- Route paths: Resource plural (e.g., `/articles`, `/users`)
- Handler functions: `<action>_<resource>` (e.g., `create_article`, `get_user`)

### nextjs_frontend

#### File Names
- Component files: `kebab-case.tsx` (e.g., `user-card.tsx`, `article-list.tsx`)
- Page files: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- Hook files: `use<Name>.ts` (e.g., `useAuth.ts`, `useDebounce.ts`)
- API files: `<resource>.ts` (e.g., `articles.ts`, `auth.ts`)

#### Code Naming
- **Components**: `PascalCase` (e.g., `UserCard`, `ArticleList`)
- **Props interfaces**: `<Component>Props` (e.g., `UserCardProps`, `ButtonProps`)
- **Hooks**: `use<Name>` (e.g., `useAuth`, `useLocalStorage`)
- **Types/Interfaces**: `PascalCase` (e.g., `Article`, `ApiResponse`)
- **Functions**: `camelCase` (e.g., `fetchArticles`, `handleSubmit`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `API_BASE_URL`)

### Documentation File Names

**All documentation files** (both root-level and within skills):
- Use `snake_case.md` format (e.g., `error_handling.md`, `data_fetching.md`)
- Use descriptive names focused on a single topic
- Use Chinese for document titles

## File Organization

### axum_backend Directory Structure

```
src/
├── api/                      # API Layer
│   ├── handlers/             # One file per resource
│   │   ├── auth.rs
│   │   ├── article.rs
│   │   └── mod.rs
│   ├── middleware.rs         # All middleware in one file
│   ├── routes.rs             # Router setup
│   ├── utils.rs              # API utilities
│   └── mod.rs
├── service/                  # Service Layer
│   ├── user_service.rs
│   ├── article_service.rs
│   └── mod.rs
├── repository/               # Repository Layer
│   ├── traits/               # Repository trait definitions
│   │   ├── user_repo.rs
│   │   ├── article_repo.rs
│   │   └── mod.rs
│   ├── implementations/      # Concrete implementations
│   │   ├── postgres_user_repo.rs
│   │   └── mod.rs
│   └── mod.rs
├── domain/                   # Domain Layer
│   ├── models/               # Domain models
│   │   ├── user.rs
│   │   ├── article.rs
│   │   └── mod.rs
│   ├── errors.rs            # Custom error types
│   └── mod.rs
├── infrastructure/           # Infrastructure Layer
│   ├── config.rs            # Configuration
│   ├── database.rs          # Database setup
│   ├── auth.rs              # Auth utilities
│   ├── logging.rs           # Logging config
│   └── mod.rs
├── main.rs                  # Application entry
└── state.rs                 # App state definition

tests/                        # Integration tests
├── handlers/
├── services/
└── repositories/

migrations/                   # SQLx migrations
```

### nextjs_frontend Directory Structure

```
src/
├── app/                      # App Router (Next.js 13+)
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   ├── (route-group)/       # Route groups (no path segment)
│   │   └── dashboard/
│   │       └── page.tsx
│   ├── @parallel/          # Parallel routes
│   │   └── page.tsx
│   ├── [id]/                # Dynamic routes
│   │   └── page.tsx
│   │   └── layout.tsx
│   ├── [...catchAll]/       # Catch-all routes
│   │   └── page.tsx
│   ├── api/                 # Route Handlers
│   │   ├── articles/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   └── auth/
│   │       └── login/
│   │           └── route.ts
│   └── actions.ts           # Server Actions
│
├── components/
│   ├── ui/                  # Reusable base components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── modal.tsx
│   ├── forms/               # Form components
│   │   ├── login-form.tsx
│   │   └── article-form.tsx
│   ├── layout/              # Layout components
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── footer.tsx
│   └── features/            # Business components
│       ├── article-list.tsx
│       ├── user-profile.tsx
│       └── article-card.tsx
│
├── lib/                     # Utilities and helpers
│   ├── api.ts               # API client
│   ├── utils.ts             # General utilities
│   └── cn.ts                # Classname utility (clsx/tailwind-merge)
│
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
│
├── store/                   # State management (Zustand)
│   ├── useAuthStore.ts
│   └── useArticleStore.ts
│
├── types/                   # TypeScript types
│   ├── article.ts
│   ├── user.ts
│   └── api.ts
│
└── styles/                  # Additional styles
    └── globals.css
```

### Skill Directory Structure (Repository)

```
<skill_name>/
├── SKILL.md                # Entry point (REQUIRED)
├── project_structure.md    # Recommended project structure
├── <topic>.md             # Focused topic documents
└── ...
```

## Import Organization

### axum_backend

```rust
// 1. Standard library
use std::sync::Arc;
use std::collections::HashMap;

// 2. External crates (alphabetical)
use axum::{
    extract::{State, Path, Query},
    response::Json,
};
use chrono::Utc;
use serde::Deserialize;
use sqlx::PgPool;

// 3. Local modules
use crate::domain::models::User;
use crate::service::UserService;
use crate::repository::traits::UserRepo;
```

### nextjs_frontend

```typescript
// 1. External dependencies (npm packages)
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

// 2. Internal modules (@/ alias)
import { apiClient } from '@/lib/api'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/button'
import { useAuthStore } from '@/store/useAuthStore'
import type { Article } from '@/types/article'
```

## Code Style Beyond Linters

### axum_backend

#### Error Handling Pattern

```rust
// Always return Result<T, AppError>
pub async fn get_user_by_id(
    State(state): State<AppState>,
    Path(id): Path<i32>,
) -> Result<Json<UserResponse>, AppError>
```

#### Repository Implementation Pattern

```rust
impl<T: UserRepo + Send + Sync> UserService<T> {
    pub fn new(user_repo: T) -> Self {
        Self {
            user_repo: Arc::new(user_repo),
        }
    }
}
```

#### Handler Signature Template

```rust
pub async fn handler_name(
    headers: HeaderMap,                     // For auth token
    State(state): State<AppState>,          // App state injection
    Path(param): Path<Type>,                // URL params
    Query(query): Query<Struct>,            // Query string
    Json(payload): Json<Type>,              // Request body
) -> Result<Json<Response>, AppError>
```

### nextjs_frontend

#### Component Props Pattern

```typescript
// Use interface for components with complex props
export interface ArticleCardProps {
  id: number
  title: string
  excerpt: string
  createdAt: string
  tags: string[]
  className?: string
}

// Use type alias for simple props
export type BadgeProps = {
  variant?: 'success' | 'warning' | 'error'
  children: React.ReactNode
}
```

#### Server Component Pattern

```typescript
// Default: Server Component (no 'use client')
import { getAllArticles } from '@/lib/api'

export default async function ArticlesPage() {
  const articles = await getAllArticles()

  return (
    <div>
      {articles.map(article => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </div>
  )
}
```

#### Client Component Pattern

```typescript
'use client'  // Only add when needed (interactivity)

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

#### API Function Pattern

```typescript
export async function getArticles(): Promise<Article[]> {
  const response = await fetch(`${API_BASE_URL}/articles`)
  if (!response.ok) {
    throw new ApiError('Failed to fetch articles')
  }
  return response.json()
}
```

## Documentation Content Standards

### Code Block Format

**All code blocks must specify language:**

````rust
// Rust code block
use axum::Json;
````

````typescript
// TypeScript code block
import { useState } from 'react'
````

````bash
# Shell command
cargo build
````

### Template Completeness

Code templates must include:
- **All necessary imports** - Copy-paste ready
- **Realistic types/variables** - No placeholders like `MyType`
- **Proper error handling** - Match the pattern
- **Comments** - Explain why, not just what

### Section Organization

Each documentation file should follow:
1. **Overview** - Brief purpose statement
2. **Code Templates** - Complete, import-ready examples
3. **Naming Conventions** - Unified naming rules
4. **Best Practices** - Recommended approaches and warnings
5. **Examples** - Full usage demonstrations

## Version Control Conventions

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat: add JWT authentication middleware

Implements JWT-based authentication for protected routes.
- Adds auth middleware
- Adds token validation
- Updates handler signatures

Refs: #123
```

### Branch Naming

```
feature/<feature-name>
fix/<issue-description>
refactor/<area>
```

## Environment Variables

### axum_backend

```bash
# Naming: SCREAMING_SNAKE_CASE, service-specific prefix optional
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
RUST_LOG=info
PORT=3000
```

### nextjs_frontend

```bash
# Naming: SCREAMING_SNAKE_CASE, NEXT_PUBLIC_ prefix for client-side
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret
```
