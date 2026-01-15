# Testing Conventions

## axum_backend (Rust + Axum)

### Test Framework

- **Framework**: Built-in Rust testing (`cargo test`)
- **Async Runtime**: `tokio-test = "0.4"` for async tests
- **Mocking**: `mockall = "0.13"` for repository mocking

### Test Organization

```
tests/                       # Integration tests
├── handlers/
│   ├── auth_test.rs        # Authentication handlers
│   └── article_test.rs     # Article handlers
├── services/
│   ├── user_service_test.rs
│   └── article_service_test.rs
└── repositories/
    ├── user_repo_test.rs
    └── article_repo_test.rs

src/                         # Unit tests (in modules)
├── handlers/
│   └── auth.rs (with #[cfg(test)])
├── service/
│   └── user_service.rs (with #[cfg(test)])
└── repository/
    └── postgres_user_repo.rs (with #[cfg(test)])
```

### Test Commands

```bash
# Run all tests
cargo test

# Run specific test file
cargo test auth_test

# Show test output (print statements)
cargo test -- --nocapture

# Run specific test function
cargo test test_user_register_logic

# Run tests in release mode
cargo test --release

# Run tests with specific filters
cargo test user
```

### Test Patterns

#### Unit Test (with #[cfg(test)])

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_password_hashing() {
        let password = "password123";
        let hash = bcrypt::hash(password, 12).unwrap();

        assert!(bcrypt::verify(password, &hash).unwrap());
    }
}
```

#### Integration Test (in tests/)

```rust
// tests/handlers/auth_test.rs
use axum::http::{StatusCode, Request};
use tower::ServiceExt;

#[tokio::test]
async fn test_login_success() {
    let app = create_test_app();

    let response = app
        .oneshot(
            Request::builder()
                .uri("/auth/login")
                .body(axum::body::Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(response.status(), StatusCode::OK);
}
```

#### Mock Repository Test

```rust
use mockall::mock;
use mockall::predicate::*;

mock! {
    UserRepo {}

    #[async_trait::async_trait]
    impl UserRepo for UserRepo {
        async fn create(&self, email: String, password: String) -> Result<User>;
        async fn find_by_email(&self, email: String) -> Result<Option<User>>;
    }
}

#[tokio::test]
async fn test_user_service_create() {
    let mut mock_repo = MockUserRepo::new();
    mock_repo
        .expect_create()
        .returning(|_, _| Ok(User {
            id: 1,
            email: "test@example.com".to_string(),
            password_hash: "hash".to_string(),
        }));

    let service = UserService::new(mock_repo);
    let user = service.create_user("test@example.com".to_string(), "pass".to_string()).await.unwrap();

    assert_eq!(user.id, 1);
}
```

### Naming Conventions

- Test files: `<module>_test.rs` (integration tests) or `tests/` directory
- Test functions: `test_<scenario>` (snake_case)
- Async tests: `#[tokio::test]` attribute

### Test Setup

```rust
// Helper to create test app
async fn create_test_app() -> Router {
    let pool = create_test_pool().await;
    let state = AppState::new(pool).await;
    Router::new().route("/auth/login", post(login_handler)).with_state(state)
}
```

## nextjs_frontend (Next.js 16 + TypeScript)

### Test Framework

- **Framework**: Jest + React Testing Library
- **Dependencies**:
  ```json
  {
    "jest@^29.7.0",
    "@testing-library/react@^14.2.0",
    "@testing-library/jest-dom@^6.4.0",
    "@testing-library/user-event@^14.5.0"
  }
  ```

### Test Organization

```
src/
├── __tests__/                  # Test directory
│   ├── components/
│   │   ├── ArticleCard.test.tsx
│   │   └── Button.test.tsx
│   ├── hooks/
│   │   └── useAuth.test.ts
│   ├── pages/
│   │   └── articles.test.tsx
│   └── utils/
│       └── api.test.ts
├── components/
│   └── ArticleCard.tsx         # Co-located test: ArticleCard.test.tsx
└── setupTests.ts              # Test setup file
```

### Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- ArticleCard.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="ArticleCard"

# Update snapshots
npm test -- -u
```

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
  ],
}
```

### Test Patterns

#### Component Test

```tsx
// src/__tests__/components/ArticleCard.test.tsx
import { render, screen } from '@testing-library/react'
import ArticleCard from '@/components/features/article-card'

describe('ArticleCard', () => {
  it('renders article title', () => {
    const article = {
      id: 1,
      title: 'Test Article',
      excerpt: 'Test excerpt',
      createdAt: '2025-01-14',
      tags: ['react'],
    }

    render(<ArticleCard {...article} />)

    expect(screen.getByText('Test Article')).toBeInTheDocument()
  })

  it('renders article tags', () => {
    const article = {
      id: 1,
      title: 'Test',
      excerpt: 'Excerpt',
      createdAt: '2025-01-14',
      tags: ['react', 'nextjs'],
    }

    render(<ArticleCard {...article} />)

    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.getByText('nextjs')).toBeInTheDocument()
  })
})
```

#### Hook Test

```tsx
// src/__tests__/hooks/useAuth.test.ts
import { renderHook, act } from '@testing-library/react'
import useAuth from '@/hooks/useAuth'

describe('useAuth', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
  })

  it('logs in successfully', async () => {
    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.login('test@example.com', 'password')
    })

    expect(result.current.isAuthenticated).toBe(true)
  })
})
```

#### API Client Test

```tsx
// src/__tests__/utils/api.test.ts
import { apiClient } from '@/lib/api'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('/api/articles', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, title: 'Test Article' }
      ])
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('apiClient', () => {
  it('fetches articles', async () => {
    const articles = await apiClient.getArticles()

    expect(articles).toHaveLength(1)
    expect(articles[0].title).toBe('Test Article')
  })
})
```

#### Form Test

```tsx
// src/__tests__/forms/LoginForm.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '@/components/forms/login-form'

describe('LoginForm', () => {
  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    // Assert submission
  })
})
```

### Test Setup

```tsx
// src/setupTests.ts
import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
}))
```

### Naming Conventions

- Test files: `<Component>.test.tsx` or `<hook>.test.ts`
- Test directories: `__tests__/` or co-located
- Test suites: `describe('<Component>', () => ...)`
- Test cases: `it('does something', () => ...)`

### Mock/Fixtures

```tsx
// src/__tests__/fixtures/articles.ts
export const mockArticle = {
  id: 1,
  title: 'Test Article',
  excerpt: 'Test excerpt',
  createdAt: '2025-01-14',
  tags: ['react'],
}

export const mockArticles = [mockArticle]
```

## version-iteration (Conceptual)

### Test Hierarchy (Planned)

```
/tests
├── acceptance/         # Acceptance tests per VERSION-SPEC
│   └── <feature>/
├── contract/           # Contract tests (OpenAPI validation)
│   └── <feature>/
└── regression/         # Regression test suite
    └── <version>/
```

### Test Workflow

1. Run tests after each sub-feature implementation
2. Incremental verification approach
3. Compare against baseline from previous version
