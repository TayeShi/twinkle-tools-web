# Architecture Patterns

## Repository Structure

```
power-skills/
├── Meta-docs (governance layer)
│   ├── README.md              # Project overview and usage
│   ├── AGENTS.md              # AI agent workflow guidance
│   └── SKILLS_STANDARD.md     # Standard format for creating skills
│
├── Skill directories (content layer)
│   ├── axum_backend/          # Rust + Axum + PostgreSQL skills
│   │   ├── SKILL.md           # Entry point (required)
│   │   ├── project_structure.md
│   │   ├── handlers.md
│   │   ├── services.md
│   │   ├── repositories.md
│   │   ├── error_handling.md
│   │   ├── middleware.md
│   │   ├── database.md
│   │   ├── authentication.md
│   │   ├── openapi.md
│   │   ├── docker.md
│   │   ├── app_state.md
│   │   ├── validation.md
│   │   ├── development.md
│   │   └── dependencies.md
│   │
│   └── nextjs_frontend/       # Next.js 16 + React 19 skills
│       ├── SKILL.md           # Entry point (required)
│       ├── project_structure.md
│       ├── pages_and_layouts.md
│       ├── components.md
│       ├── data_fetching.md
│       ├── state_management.md
│       ├── api_client.md
│       ├── forms.md
│       ├── routing.md
│       ├── styling.md
│       ├── hooks.md
│       ├── error_handling.md
│       ├── optimization.md
│       ├── development.md
│       └── dependencies.md
```

## Skill Organization Pattern

### Standard Skill Structure

Each skill follows a consistent structure:

1. **SKILL.md** (Required) - The manifest file containing:
   - `## 适用范围` - Applicable technology scope
   - `## 何时使用` - Trigger scenarios for using this skill
   - `## 文件说明` - Table listing all files and their purposes
   - `## 技术栈` - Key technologies and versions

2. **Topic-focused files** - Each file covers ONE concept:
   - Overview/definition
   - Code templates (complete, import-ready)
   - Naming conventions
   - Best practices
   - Examples

### Progressive Disclosure Pattern

AI agents navigate documentation in layers:

```
Layer 1: AGENTS.md (governance)
    ↓
Layer 2: <skill>/SKILL.md (overview)
    ↓
Layer 3: <skill>/<topic>.md (on-demand)
```

## axum_backend Architecture Pattern

### Four-Layer Clean Architecture

```
┌─────────────────────────────────────┐
│   API Layer (api/handlers/)         │  ← HTTP handlers, routing
├─────────────────────────────────────┤
│   Service Layer (service/)          │  ← Business logic
├─────────────────────────────────────┤
│   Repository Layer (repository/)   │  ← Data access (traits + impls)
├─────────────────────────────────────┤
│   Domain Layer (domain/)           │  ← Domain models, errors
└─────────────────────────────────────┘
```

### Key Patterns

- **Repository Trait Pattern**: Abstract data access with trait definitions
- **Dependency Injection**: Services receive repo implementations via generic type
- **Arc Wrapping**: All services wrapped in `Arc` for async sharing
- **Error Handling**: Unified `AppError` enum with `thiserror` and `IntoResponse`

### Request Flow

```
HTTP Request
    → Router
    → Logger Middleware
    → Auth Middleware (protected routes)
    → Handler (extract State/Path/Query/Body)
    → Service (business logic)
    → Repository (database query)
    → Response mapping (DTO)
    → Response JSON
    → Logger Middleware (log timing/status)
```

## nextjs_frontend Architecture Pattern

### Next.js App Router Structure

```
app/
├── layout.tsx           # Root layout
├── page.tsx             # Home page
├── (route-group)/       # Route groups (no path segment)
│   └── dashboard/
│       └── page.tsx
├── @dashboard/          # Parallel routes
│   └── page.tsx
├── api/                 # Route Handlers
│   └── articles/
│       └── route.ts
└── actions.ts           # Server Actions
```

### Component Organization

```
components/
├── ui/              # Reusable base components
│   ├── button.tsx
│   ├── input.tsx
│   └── card.tsx
├── forms/           # Form components
│   └── login-form.tsx
├── layout/          # Layout components
│   ├── header.tsx
│   └── sidebar.tsx
└── features/        # Business components
    ├── article-list.tsx
    └── user-profile.tsx
```

### Key Patterns

- **Server Components First**: Default to Server Components, use `'use client'` only when needed
- **Data Fetching**: `fetch` with caching/revalidation, SWR/React Query for client data
- **State Management**: Context API for simple state, Zustand for complex client state
- **Forms**: React Hook Form + Zod for client forms, Server Actions for server forms

## Documentation Content Standards

### Code Block Requirements

- **All code blocks must specify language**: ````rust`, ````typescript`, ````bash`
- **Templates include all necessary imports**: Copy-paste ready
- **Realistic variable/type names**: No placeholders like `MyType`
- **Key comments for clarity**: Explain why, not just what

### File Organization Standards

| Pattern | axum_backend | nextjs_frontend |
|---------|--------------|-----------------|
| **Directory names** | `snake_case` | `kebab-case` (files) |
| **File names** | `snake_case.md` | `kebab-case.md` |
| **Document titles** | Chinese | Chinese |
| **Function names** | `kebab-case` | N/A (client functions) |
| **Component names** | N/A | `PascalCase` |
| **Service names** | `PascalCase` | N/A |

### Cross-Skill Patterns

| Pattern | axum_backend | nextjs_frontend |
|---------|--------------|-----------------|
| **Error Handling** | `AppError` enum + `IntoResponse` | `ApiError` class + Error boundaries |
| **State Management** | `AppState` struct with `Arc<>` | Zustand / Context API |
| **Testing** | `cargo test` with tokio-test | Jest + React Testing Library |
| **API Documentation** | utoipa + Swagger UI | Relies on backend docs |

## Key Abstractions

### axum_backend

- **Repository Trait**: `UserRepo`, `ArticleRepo` - Abstract data access
- **Service Pattern**: `UserService<T: UserRepo>` - Generic over repo impl
- **App State**: `AppState` struct - Centralized dependency container
- **Error Type**: `AppError` enum - Unified error handling

### nextjs_frontend

- **API Client**: `ApiClient` class - Typed HTTP client with error handling
- **Custom Hooks**: `useAuth`, `useFetch` - Reusable state/logic
- **Components**: Separation of UI, forms, layout, features
- **Route Handlers**: Server-side API endpoints in `app/api/`

## Configuration Management

### axum_backend

- **Environment**: `envy` crate loads from `.env`
- **Database**: `PgPool` from sqlx with connection pooling
- **Validation**: `validator` crate with derive macros
- **OpenAPI**: `utoipa` with derive macros for schema generation

### nextjs_frontend

- **Environment**: `process.env` via `.env.local`
- **TypeScript**: `tsconfig.json` with strict mode
- **Tailwind**: `tailwind.config.ts`
- **State**: Zustand stores, React Context providers
