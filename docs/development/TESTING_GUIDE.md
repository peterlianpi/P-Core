# Testing Guide for P-Core

This guide explains how to write, organize, and run tests in the P-Core project using Vitest, React Testing Library, and Bun. It covers unit, integration, and end-to-end (e2e) testing, as well as best practices for a Next.js + Bun + Prisma + Hono stack.

---

## 1. Testing Tools Used

- **Vitest**: Fast, Vite-native test runner for unit/integration tests.
- **@testing-library/react**: For testing React components.
- **@testing-library/jest-dom**: Custom matchers for DOM assertions.
- **Supertest**: For API endpoint testing.
- **Playwright**: For e2e/browser automation (optional, for advanced scenarios).
- **Bun**: Used to run all scripts for speed and compatibility.

---

## 2. Test Organization

- **Unit Tests**: Place next to the code under `__tests__` or as `*.test.ts(x)` files.
  - Example: `components/Button/Button.test.tsx`
- **Integration Tests**: Place in `test/` or next to features.
  - Example: `features/school-management/__tests__/enrollment.integration.test.ts`
- **E2E Tests**: Place in `test/e2e/` (if using Playwright or similar).

---

## 3. Writing Tests

### Example: React Component Test
```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Example: API Route Test (Hono)
```ts
import { app } from '@/lib/api/app';
import request from 'supertest';

describe('API /api/hello', () => {
  it('returns hello world', async () => {
    const res = await request(app.fetch).get('/api/hello');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Hello, world!');
  });
});
```

---

## 4. Running Tests

All test scripts use Bun for speed. Run these from your project root:

| Script             | Command                        | Description                       |
|--------------------|--------------------------------|-----------------------------------|
| Run all tests      | `bun run test`                 | Runs all tests (Vitest)           |
| Watch mode         | `bun run test:watch`           | Re-runs tests on file changes     |
| Vitest UI          | `bun run test:ui`              | Interactive UI for test results   |
| Coverage report    | `bun run test:coverage`        | Generates code coverage report    |

### Example:
```bash
bun run test
bun run test:watch
bun run test:ui
bun run test:coverage
```

---

## 5. Best Practices

- **Test all features**: Write tests for components, API routes, and business logic.
- **Use descriptive test names**: Make it clear what each test checks.
- **Mock external services**: Use mocks for email, database, or third-party APIs.
- **Keep tests isolated**: Avoid shared state between tests.
- **Check coverage**: Use `bun run test:coverage` to ensure critical code is tested.
- **CI Integration**: Add test scripts to your CI pipeline for automated checks.

---

## 6. Troubleshooting

- If you see errors about missing dependencies, run `bun install`.
- For issues with Bun compatibility, check the [Bun documentation](https://bun.sh/docs/test).
- For advanced test setup, see [Vitest docs](https://vitest.dev/), [Testing Library docs](https://testing-library.com/docs/), and [Playwright docs](https://playwright.dev/).

---

## 7. References
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/)
- [Bun Test Runner](https://bun.sh/docs/test)
- [Playwright](https://playwright.dev/)
- [Supertest](https://github.com/ladjs/supertest)

---

*For more details, see the main README and docs/development/TESTING_GUIDE.md.*
