# Project Development Guidelines

Authoritative guidance for building, testing, securing, documenting, and deploying this project.
Stack: Next.js (App Router), React, Prisma, Hono, Tailwind CSS, ShadCN UI

How to use this doc
- What: Standards we follow.
- Why: Rationale to make decisions obvious.
- How: Concrete steps/patterns to implement.
- Always keep docs in /docs up-to-date when you add/change features.

Contents
1. Code Quality & Structure
2. Styling
3. Documentation & Comments
4. DevOps & CI/CD
5. Security & Authentication
6. Feature Requirements
7. General Best Practices
8. Testing Strategy
9. API Guidelines (Hono)
10. Environment & Secrets
11. Database & Migrations (Prisma)
12. Observability & Monitoring
13. Readiness Checklists
14. References

---

1) Code Quality & Structure
- What
  - Clean, modular, feature-based code with strict typing.
  - Clear separation between UI, domain logic, and data access.
- Why
  - Improves maintainability, reuse, testability, and onboarding speed.
- How
  - Feature-based layout (example):
    - features/
      - school-management/
        - features/
          - students-management/
            - api/
            - components/
            - lib/
            - types/
        - lib/
        - components/
    - app/api/[[...route]]/ (Hono route modules grouped by domain)
    - lib/ (auth, db, security, mail, utils)
    - data/ (small Prisma wrappers: getUserById, getXById, etc.)
  - Next.js boundaries
    - Node-only: Prisma, Nodemailer, file system (do not import into middleware/Edge runtime).
    - Edge: middleware and auth.edge should not import Prisma or Node-only modules.
  - Naming
    - Components: PascalCase; files/folders: kebab-case or lowerCamelCase.
  - Reuse & performance
    - Co-locate zod schemas; reuse types; memoize and paginate; select/include with Prisma to avoid overfetch.
  - Error handling
    - Use centralized utilities (e.g., handleApiError) to avoid leaking stack traces.

2) Styling
- What
  - Tailwind CSS utilities; ShadCN UI components.
- Why
  - Consistent, accessible UI with rapid development.
- How
  - Follow design tokens and theme in tailwind.config.ts; keep responsive-first design.
  - Accessibility: proper aria-attributes, focus states, color contrast.
  - Prefer composition and utility classes over ad-hoc inline styles.

3) Documentation & Comments
- What
  - Clear, concise comments for public functions, complex logic, security-sensitive code.
  - Always update /docs with new or changed behavior.
- Why
  - Documents decisions and flows, reduces tribal knowledge, improves reliability.
- How
  - Add feature docs under /docs/features or guides/.
  - Architecture decisions under /docs/architecture (ADR-style notes for major changes).
  - Update CHANGELOGs when external behaviors change.
  - Security/auth changes summarized in /docs/SECURITY_AUTH_UPDATE.md (what/why/how).

4) DevOps & CI/CD
- What
  - Automated, reproducible pipelines for code quality and delivery.
- Why
  - Faster feedback, safer releases, lower MTTR.
- How
  - Pipeline order: install -> type-check -> lint -> test -> build -> deploy.
  - Prisma:
    - db:generate before commit when schema changes; db:migrate (dev), db:migrate:deploy (prod).
  - Caching: node_modules and .next cache in CI.
  - Deployment: Vercel recommended; Hono routes exported with handle(app) are compatible.
  - Previews for PRs; gated merges on checks (type-check, lint, unit tests passing).

5) Security & Authentication
- What
  - NextAuth with Node/Edge split, RLS-backed multi-tenant authorization, least privilege.
- Why
  - Protects user data, isolates tenants, and supports scalable deployments.
- How
  - NextAuth
    - Node runtime: lib/auth/auth.ts with PrismaAdapter, secure callbacks, JWT caching.
    - Edge runtime: lib/auth/auth.edge.ts for middleware.ts to read auth securely.
  - Tokens (verification/reset/2FA)
    - Stored hashed (SHA-256) in DB; generation via lib/tokens.ts; compare by hashing incoming tokens.
  - Routes
    - Do not add protected pages to publicRoutes (lib/auth/routes.ts).
    - middleware.ts protects non-public routes and prevents redirect loops.
  - APIs (Hono)
    - app/api/[[...route]]/route.ts registers protected domain routes under organizationSecurityMiddleware.
    - Inside handlers use getOrganizationContext() and requirePermission("<action:resource>").
  - Roles
    - Default roles: SUPERADMIN, OWNER, ADMIN, MANAGER, MEMBER, ACCOUNTANT, OFFICE_STAFF.
    - If your product uses teacher/student semantics:
      - Teacher -> MANAGER or ADMIN based on need; Student -> MEMBER.
    - Update role permissions in lib/security/tenant.ts if adding new actions.
  - Additional recommendations
    - Rate limit auth endpoints; ensure secure headers (already via Hono secure-headers).
    - Strong password policy, account verification, optional 2FA.
    - Log auth and permission denials for audit.

6) Feature Requirements
- What
  - Modular features like Students, Courses/Schedules, Attendance, Library, Feedback, Versions.
- Why
  - Consistent patterns reduce defects and simplify extension.
- How
  - For each domain:
    - API routes under app/api/[[...route]]/<domain>.ts; protect with organizationSecurityMiddleware and requirePermission.
    - Validation via zod; use zValidator for query/body/params.
    - Data scoped by orgId using getOrganizationContext() and let RLS enforce isolation.
    - UI follows Tailwind + ShadCN patterns and hooks for data fetching (TanStack Query).

7) General Best Practices
- What
  - Guardrails for maintainability and quality.
- Why
  - Prevents regressions, enables predictable development.
- How
  - Keep PRs small and focused; include tests and docs.
  - Avoid heavy logic in React components; push to lib/services and server actions.
  - Never commit secrets; prefer env var stores.
  - Prefer async/await; avoid unhandled promise rejections; type all exports.

8) Testing Strategy
- What
  - Unit + integration + limited e2e where it matters.
- Why
  - Confidence in critical paths (auth, permissions, CRUD flows).
- How
  - Unit tests with Vitest; mock next-auth/react (see tests/setup.ts).
  - Integration: exercise Hono endpoints (supertest/playwright), assert permissions and org scoping.
  - Coverage on core modules (auth, tokens, security middleware, data services).

9) API Guidelines (Hono)
- What
  - Predictable, secure API design.
- Why
  - Enables consistent client usage and safer server code.
- How
  - Group endpoints by domain file; register protected domains in the secured group.
  - Validate inputs with zod; return structured errors via handleApiError.
  - Pagination for list endpoints; consistent shape: { data, pagination } or domain-specific (students + pagination).
  - Consider OpenAPI annotations in future for auto-docs.

10) Environment & Secrets
- What
  - Correct, secure configuration across environments.
- Why
  - Prevents outages and leaks; simplifies onboarding.
- How
  - Required (non-exhaustive):
    - DATABASE_URL, NEXTAUTH_SECRET
    - NEXT_PUBLIC_APP_URL (CORS allow-list)
    - RESEND_API_KEY (Edge mail), SMTP_HOST/PORT/USER/PASS (Node mail)
    - TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (feedback)
  - Keep .env.local out of VCS; rotate secrets regularly.

11) Database & Migrations (Prisma)
- What
  - Stable schema evolution with tenant isolation.
- Why
  - Prevents accidental data loss; enforces org scoping and performance.
- How
  - Use lib/db/client Prisma singleton. Do not import Prisma into Edge code.
  - RLS context set via organizationSecurityMiddleware (set_org_context/clear_org_context functions).
  - Migrations: bun run db:generate, db:migrate (dev), db:migrate:deploy (prod).
  - Index frequently filtered columns; prefer soft deletes; maintain createdAt/updatedAt.

12) Observability & Monitoring
- What
  - Visibility into health, performance, and security.
- Why
  - Faster incident response; helps spot regressions.
- How
  - Logging: structured logs; do not log PII or secrets.
  - Metrics: @vercel/analytics for client; consider server metrics for latency & errors.
  - Auditing: log permission denials and security-relevant events.

13) Readiness Checklists
- Feature PR checklist
  - [ ] Feature follows feature-based structure under features/<domain>
  - [ ] API routes protected with organizationSecurityMiddleware and requirePermission
  - [ ] Zod validation for all inputs; pagination on list endpoints
  - [ ] Prisma queries scoped and efficient (select/include, indexes)
  - [ ] Tests (unit/integration) added
  - [ ] Docs updated under /docs/features or /docs/guides
  - [ ] CHANGELOG updated if external behavior changed
- Security checklist
  - [ ] Tokens stored hashed and verified via lib/tokens.ts
  - [ ] No Prisma imported in Edge code
  - [ ] Public routes reviewed (lib/auth/routes.ts)
  - [ ] Permissions updated in lib/security/tenant.ts if needed
  - [ ] Secure headers and CORS rules validated

14) References
- Project docs
  - docs/SECURITY_AUTH_UPDATE.md (auth/security what/why/how)
  - docs/PROJECT_OVERVIEW.md (high-level)
  - docs/FOLDER_STRUCTURE.md (directory conventions)
  - docs/mail-system.md (mail providers & templates)
  - docs/RLSDocumentation.md (Row-Level Security)
- External
  - NextAuth: https://authjs.dev
  - Hono: https://hono.dev
  - Prisma: https://www.prisma.io
  - Tailwind CSS: https://tailwindcss.com
  - ShadCN UI: https://ui.shadcn.com
  - Zod: https://zod.dev
  - Resend: https://resend.com
  - Nodemailer: https://nodemailer.com
