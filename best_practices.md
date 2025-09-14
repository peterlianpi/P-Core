# 📘 Project Best Practices

## 1. Project Purpose
P‑Core is a multi-tenant platform built with Next.js (App Router), React, Hono (for API routing), and Prisma (PostgreSQL) that provides feature‑based modules such as student management, course scheduling, attendance tracking, library and church management, feedback collection, and version/release management. Security is enforced end‑to‑end using NextAuth (Edge+Node split), organization role/permission checks, and database‑level Row‑Level Security (RLS).

## 2. Project Structure
- Feature‑based organization. Keep UI, API, validation, and domain logic co‑located by feature.
- Key directories and roles:
  - app/: Next.js App Router pages/layouts and API entry (Hono under app/api/[[...route]]). Global styles in app/globals.css.
  - app/api/[[...route]]/: Hono router entry (route.ts) and domain route modules (e.g., version.ts, org.ts, feedback.ts, dashboard.ts, superadmin.ts). Public routes registered before the organization security middleware; protected routes after it.
  - components/: Reusable UI, Tailwind/ShadCN based components (including ui/, admin‑components/, etc.).
  - features/: Feature modules grouped by domain (system/, school‑management/, organization‑management/, dashboard/). Each feature may include components/, api/, lib/, types/ as needed.
  - lib/: Core libraries (auth, db, security/tenant, utils, schemas, mail, telegram, org services). Centralized error handling (lib/utils/api‑errors.ts), RLS helpers (lib/db/rls.sql), security middleware (lib/security/tenant.ts).
  - prisma/: Prisma schema and migrations. Multi‑schema strategy (auth, domain) with orgId scoping.
  - hooks/: Custom React hooks (auth/session, role, device, store, upload, etc.).
  - providers/: React context providers.
  - config/: Build/configuration (e.g., prisma.ts).
  - docs/: Authoritative documentation (architecture, security, RLS, features, reviews, development guides, folder structure, changelogs).
  - tests/: Vitest configuration and tests (unit/integration, setup mocks, some e2e scaffolding).
  - scripts/: Utility scripts (performance monitoring, setup, etc.).
- Entry points:
  - API: app/api/[[...route]]/route.ts (Hono app + global middleware + public/protected routes).
  - Auth guard: middleware.ts (Edge runtime auth for route access control).
  - Prisma: prisma/schema.prisma and lib/db/client singleton.

## 3. Test Strategy
- Frameworks: Vitest + React Testing Library; Playwright available for e2e.
- Setup:
  - tests/setup.ts configures jsdom, adds RTL matchers, mocks browser APIs, Next.js modules (next/navigation, next/image, next/link), next‑auth/react, and Prisma clients used in tests.
  - vitest.config.ts uses environment: jsdom, global test patterns, coverage (v8) with 70% baseline thresholds and path alias @ -> project root.
- Organization:
  - tests/<domain or area>/*.test.(ts|tsx) for unit/integration tests.
  - Use tests/setup.ts for shared mocks. Prefer unit tests for utilities/services and integration tests for Hono endpoints and auth/permission flows.
- Mocking Guidelines:
  - Mock next‑auth/react session for authenticated paths.
  - Mock Prisma for unit tests; prefer exercising real validation + Hono route composition in integration tests.
  - Mock browser APIs (IntersectionObserver, ResizeObserver) as provided in setup.
- Philosophy:
  - Unit tests for pure logic (utils, services, validators).
  - Integration tests for API routes (Hono groups, middleware, permission checks, org context/RLS scoping).
  - Limited e2e for critical user journeys.

## 4. Code Style
- Language/Typing:
  - TypeScript everywhere. Exported APIs should be typed. Prefer explicit return types on exported functions.
  - Use zod for validation; co‑locate schemas with the feature or place shared ones under lib/schemas.
- React/Next:
  - Co‑locate feature components and hooks under features/<feature>.
  - Keep components focused on presentation; move data access and heavy logic into lib/services or API routes/server actions.
  - Use TanStack Query for server state and react‑hook‑form + @hookform/resolvers/zod for forms.
- Naming:
  - Components: PascalCase; hooks: useThing; files/folders: kebab‑case (or lower‑camel consistently as already used), barrel index.ts for exports where helpful.
  - API routes grouped by domain file names (e.g., version.ts, org.ts) under app/api/[[...route]].
- Documentation/Comments:
  - Add concise comments for public APIs, complex logic, and all security‑sensitive code.
  - Update /docs whenever behaviors or architecture change (see docs/PROJECT_DEVELOPMENT_GUIDELINES.md).
- Error handling:
  - For Hono routes, throw errors or use ApiError; rely on app.onError + handleApiError in lib/utils/api‑errors.ts for consistent responses (Zod, Prisma known errors, prod/dev behavior).
  - For server actions, use handleError from lib/utils/api‑errors.ts.
- Async/Performance:
  - Prefer async/await, handle rejections. Use Prisma select/include, indexes, and pagination. Memoize where appropriate.

## 5. Common Patterns
- Hono API Composition:
  - Global middleware: logger, secureHeaders, CORS, timeout, then centralized onError.
  - Public routes are registered before organizationSecurityMiddleware; Protected routes are registered after `.use(organizationSecurityMiddleware)`.
  - Use zod and @hono/zod‑validator for input validation.
- Multi‑Tenancy & Security:
  - organizationSecurityMiddleware validates access, sets RLS context via set_org_context, attaches orgContext to Hono Context.
  - Use getOrganizationContext(c), requirePermission("action:resource"), requireRole("ROLE"), and requireSuperadmin() where applicable.
  - Database RLS policies in lib/db/rls.sql; every domain table includes org_id and enforces tenant isolation.
- Authentication:
  - Edge: lib/auth/auth.edge.ts for middleware.ts; Node: lib/auth/auth.ts for server code (ensures Prisma stays out of Edge bundles).
  - Public/auth routes configured in lib/auth/routes.ts; middleware.ts handles redirects and guards.
- UI/Styling:
  - Tailwind CSS with design tokens in globals.css; ShadCN UI (Radix primitives) for accessible components. Compose via utility classes; prefer reusable components in components/ui/.
- Utilities:
  - Centralized errors (lib/utils/api‑errors.ts), tokens, org services, mail, logging, theme system.

## 6. Do's and Don'ts
- Do
  - Group by feature; co‑locate UI, API, validation, and domain logic.
  - Protect all domain API routes with organizationSecurityMiddleware, then use requirePermission/requireRole for fine‑grained checks.
  - Validate all inputs with zod; return consistent error JSON via handleApiError.
  - Keep Prisma out of Edge runtime (do not import Prisma in middleware or edge code).
  - Use environment variables for secrets; never hardcode secrets or tokens.
  - Write tests for critical flows (auth, permissions, CRUD) and keep coverage ≥ thresholds.
  - Use Tailwind utility classes + ShadCN components; maintain a11y and consistent theming.
  - Add comments to clarify intent, security assumptions, and non‑obvious logic.
- Don't
  - Don’t bypass RLS or forget to set org context in protected API routes.
  - Don’t put heavy logic directly in React components.
  - Don’t leak stack traces or PII in production responses/logs.
  - Don’t commit .env or secrets to VCS.
  - Don’t create type‑less or unvalidated API endpoints.

## 7. Tools & Dependencies
- Key Libraries
  - Runtime/UI: next, react, react‑dom, next‑themes, lucide‑react, framer‑motion.
  - API: hono, @hono/zod‑validator.
  - Auth: next‑auth, @auth/prisma‑adapter.
  - Data: @prisma/client, prisma.
  - Forms/Data Fetching: react‑hook‑form, @hookform/resolvers, zod, @tanstack/react‑query.
  - Styling: tailwindcss, tailwindcss‑animate, class‑variance‑authority, clsx, shadcn (via components), radix‑ui.
  - Misc: nodemailer/resend (mail), cloudinary (images), date‑fns.
- Dev & QA
  - Vitest (+ @vitest/ui, @testing‑library/*, jsdom), Playwright, ESLint (+ Next/Tailwind plugins), Prettier (+ tailwind plugin), Husky + lint‑staged.
- Scripts (package.json)
  - dev/build/start via Bun; type‑check, lint, format; prisma db:*; test, test:watch, test:coverage; performance scripts; prepare (husky install).
- Setup Instructions
  1) bun install
  2) Copy .env and set required vars (DATABASE_URL, NEXTAUTH_SECRET, NEXT_PUBLIC_APP_URL, SMTP/Resend, Cloudinary, Telegram, etc.). See docs/ and package.json.
  3) bun run db:generate && bun run db:migrate (or db:push for prototyping)
  4) (Optional) Apply RLS policies: bun run db:rls (ensure DATABASE_URL points to your DB)
  5) bun run dev
  6) bunx vitest run (or bunx vitest watch) for tests; ensure tests/setup.ts is used by vitest.config.ts

## 8. Other Notes
- When generating new code:
  - Follow feature‑based structure (features/<feature>/{components,api,lib,types}).
  - For APIs, integrate with Hono under app/api/[[...route]] and register routes in the appropriate public/protected section. Validate with zod; use handleApiError.
  - Enforce org security using organizationSecurityMiddleware and permission/role checks. Never import Prisma into Edge runtime.
  - Use Tailwind + ShadCN patterns; ensure accessibility and consistent theming.
  - Reuse utilities from lib/ (tokens, utils, services) and types from Prisma when applicable.
- Roles & Permissions:
  - Core roles include SUPERADMIN, OWNER, ADMIN, MANAGER, MEMBER, ACCOUNTANT, OFFICE_STAFF (see lib/security/tenant.ts). Map teacher/student semantics to existing roles (e.g., Teacher -> MANAGER/ADMIN; Student -> MEMBER). Extend ROLE_PERMISSIONS when adding new capabilities.
- Domain Focus:
  - Student management, course scheduling, attendance, versions, feedback, library & church modules. All domain models include orgId and are RLS‑guarded.
- CI/CD & Ops:
  - Recommended pipeline: install → type‑check → lint → test → build → deploy. Cache node_modules and .next. Use Vercel or compatible infra. Document workflows in /docs; keep CHANGELOGs updated.
- Documentation:
  - Keep docs/ authoritative (architecture, RLS, security updates, feature guides). Update docs when adding or modifying features, and include migration notes for schema or API changes.
