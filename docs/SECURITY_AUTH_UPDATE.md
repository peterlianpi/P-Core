# Security & Authentication Update

This document summarizes the improvements made to authentication, authorization, and multi-tenant security, and provides guidance on how to work with the updated system.

## What Changed

1. Token Security (All flows)
- Email verification, password reset, and 2FA tokens are now stored as SHA-256 hashes.
- Token lookup functions hash incoming plain tokens before DB queries.
- Generation uses crypto.randomBytes for strong entropy.

2. Register & Login Flows
- Registration and unverified login paths now use the centralized secure token generator.
- Email delivery is environment-aware: Resend on Edge; SMTP (Nodemailer) on Node.
- 2FA validation uses constant verification against hashed tokens.

3. Route Protection (Web + API)
- Removed /dashboard from public routes; requires authentication via middleware.
- Hono router consolidates protected routes under organizationSecurityMiddleware.
- Permissions enforced via requirePermission() and org context.

4. Role-Based Permissions
- Expanded permission matrix to match feature APIs (students, courses, schedules, feedback, purchases, versions, and organization management).
- Roles remain hierarchical: SUPERADMIN > OWNER > ADMIN > MANAGER > MEMBER, with ACCOUNTANT/OFFICE_STAFF having scoped powers.

5. Prisma import fixes
- Fixed a broken Prisma import path in lib/org-security.ts to use the central client.

## Why These Changes

- Prevent token leakage and replay by storing one-way hashed tokens.
- Align all auth flows to a single secure token lifecycle, reducing bugs and drift.
- Enforce least-privilege access and consistent org scoping, preventing tenant data leakage.
- Ensure Edge/Node runtimes both send emails reliably without runtime conflicts.
- Eliminate build/runtime errors from inconsistent imports.

## How It Works

### Token Lifecycle
- Generation (lib/tokens.ts)
  - Uses crypto.randomBytes for tokens.
  - Stores SHA-256 hash in DB; returns the plain token only for email/SMS.
- Verification (data/*-token.ts)
  - Hash incoming token before DB query and comparison.

### Register & Login
- Register (actions/auth/register.ts)
  - Creates user, generates a verification token, sends via email.
- Login (actions/auth/login.ts)
  - If email not verified, re-sends verification token.
  - For 2FA-enabled accounts, sends 6-digit code and validates hashed token.

### Session & Middleware
- NextAuth Node (lib/auth/auth.ts) handles Prisma adapter, callbacks, and JWT caching.
- Edge-compatible auth (lib/auth/auth.edge.ts) used by middleware.ts.
- middleware.ts protects non-public routes and avoids redirect loops.

### API Routing & Multi-Tenant Security
- app/api/[[...route]]/route.ts groups protected routes under organizationSecurityMiddleware.
- lib/security/tenant.ts
  - Validates org access, sets DB RLS context per request.
  - Exposes requirePermission(permission) and requireRole(minRole) helpers.
  - Provides getOrganizationContext for handlers.

### Roles & Permissions (lib/security/tenant.ts)
- SUPERADMIN: Full access across orgs and system endpoints.
- OWNER/ADMIN: Full org-level management; ADMIN slightly restricted vs OWNER.
- MANAGER: CRUD on students/courses/schedules; minimal destructive operations.
- ACCOUNTANT: Purchase management and financial operations.
- OFFICE_STAFF: Schedules management.
- MEMBER: Read-only access to assigned resources.

## Developer Guidelines (Project-Specific)

- When creating tokens (verification/reset/2FA), always use lib/tokens.ts.
- For any token validation, do not compare plain tokens against the DB.
- For any organization-scoped API handler:
  - Ensure it is registered under the protected group in app/api/[[...route]]/route.ts.
  - Use requirePermission() and getOrganizationContext() in the handler.
  - Scope Prisma queries by orgId and let RLS enforce additional isolation.
- Keep new permissions aligned with the naming pattern used in routes.
- Avoid importing Prisma directly in Edge code.
- UI: ensure any new protected pages are not added to publicRoutes in lib/auth/routes.ts.

## Operational Notes

- Environment Variables
  - RESEND_API_KEY for Resend provider
  - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS for Nodemailer provider
  - NEXT_PUBLIC_APP_URL used for CORS allow-list
  - DATABASE_URL for Prisma
- Health Endpoints
  - /api/health, /api/health/db for basic availability checks

## References

- NextAuth: https://authjs.dev
- Hono: https://hono.dev
- Prisma: https://www.prisma.io
- Zod: https://zod.dev

## Change Map

- actions/auth/register.ts: use generateVerificationToken
- actions/auth/login.ts: re-send verification with generateVerificationToken; retain 2FA security
- lib/auth/routes.ts: remove /dashboard from publicRoutes
- lib/security/tenant.ts: expanded ROLE_PERMISSIONS matrix
- lib/org-security.ts: fix prisma import
- app/api/[[...route]]/route.ts: move version and feedback under secured group
- data/*-token.ts and data/auth/*-token.ts: hash incoming tokens before lookup
