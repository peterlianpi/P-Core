# P-Core Architecture Refactor Plan

## 🎯 Objectives
Transform P-Core into a production-ready, secure, and maintainable system by addressing critical architectural issues and implementing best practices.

## 🚨 Critical Issues Being Fixed

### 1. Cross-Database Consistency
**Problem**: No transaction support between user-database and features-database
**Solution**: Consolidate into single database with Postgres schemas

### 2. Manual Tenancy 
**Problem**: Missing Row-Level Security enforcement, manual orgId filtering
**Solution**: Implement PostgreSQL RLS policies for automatic tenant isolation

### 3. Connection Pooling
**Problem**: Dual Prisma clients risk connection exhaustion
**Solution**: Single Prisma client with singleton pattern

### 4. CORS Conflicts
**Problem**: Duplicate policies in Next.js config vs Hono
**Solution**: Centralize CORS in Hono middleware only

## 📁 New Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── (protected)/              # Protected routes
│   │   ├── dashboard/            # Dashboard pages
│   │   └── [orgId]/              # Organization-scoped pages
│   └── api/                      # API route handlers
│       └── [[...route]]/         # Hono catch-all router
├── features/                     # Domain-driven features
│   ├── auth/                     # Authentication feature
│   │   ├── api/                  # Auth API hooks
│   │   ├── components/           # Auth components
│   │   ├── hooks/                # Auth custom hooks
│   │   └── types/                # Auth types & schemas
│   ├── organizations/            # Organization management
│   ├── school-management/        # Education domain
│   │   ├── students/             # Student management
│   │   ├── courses/              # Course management
│   │   └── schedules/            # Schedule management
│   └── shared/                   # Shared feature utilities
├── lib/                          # Core utilities
│   ├── db/                       # Database layer
│   │   ├── client.ts             # Single Prisma client
│   │   ├── connection.ts         # Connection management
│   │   └── rls.ts                # Row-Level Security helpers
│   ├── security/                 # Security utilities
│   │   ├── auth.ts               # Authentication helpers
│   │   ├── rbac.ts               # Role-based access control
│   │   └── tenant.ts             # Multi-tenant security
│   ├── api/                      # API utilities
│   │   ├── hono-client.ts        # Type-safe Hono client
│   │   ├── middleware.ts         # API middleware
│   │   └── routes/               # API route modules
│   └── utils/                    # General utilities
├── components/                   # Shared UI components
│   ├── ui/                       # Base UI components (shadcn)
│   ├── forms/                    # Form components
│   └── layout/                   # Layout components
├── prisma/                       # Single Prisma setup
│   ├── schema.prisma             # Unified schema with schemas
│   ├── migrations/               # Database migrations
│   └── seed.ts                   # Database seeding
└── types/                        # Global types
    ├── api.ts                    # API types
    ├── auth.ts                   # Auth types
    └── database.ts               # Database types
```

## 🗄️ Database Schema Consolidation

### Before (Dual Databases)
```
prisma-user-database/
├── User, Account, Organization
└── UserOrganization, TwoFactorToken

prisma-features-database/  
├── Student, Course, Schedule
└── Purchase, Payment
```

### After (Single Database with Schemas)
```sql
-- Single PostgreSQL database with schemas
CREATE SCHEMA auth;      -- Authentication & authorization
CREATE SCHEMA domain;    -- Business domain data
```

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  schemas  = ["auth", "domain"]
}

// Auth schema models
model User {
  @@schema("auth")
  // ... user fields
}

// Domain schema models  
model Student {
  @@schema("domain")
  // ... student fields with RLS
}
```

## 🔐 Row-Level Security Implementation

### RLS Policies for Automatic Tenant Isolation
```sql
-- Enable RLS on all domain tables
ALTER TABLE domain.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain.courses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY students_tenant_isolation ON domain.students
  USING (org_id = current_setting('app.current_org_id'));

CREATE POLICY courses_tenant_isolation ON domain.courses  
  USING (org_id = current_setting('app.current_org_id'));
```

## 🔧 Implementation Phases

### Phase 1: Database Consolidation ✅
- [ ] Create unified Prisma schema
- [ ] Migrate data from dual databases
- [ ] Update connection configuration
- [ ] Implement singleton Prisma client

### Phase 2: Security Hardening ✅
- [ ] Implement Row-Level Security
- [ ] Create RLS helper functions
- [ ] Update middleware for tenant context
- [ ] Add security headers consolidation

### Phase 3: API Restructuring ✅
- [ ] Reorganize Hono routes
- [ ] Implement consistent error handling
- [ ] Add comprehensive validation
- [ ] Migrate money fields to Decimal

### Phase 4: Frontend Refactoring ✅
- [ ] Update API hooks patterns
- [ ] Implement consistent error handling
- [ ] Add loading states management
- [ ] Update folder structure

### Phase 5: Documentation & Testing ✅
- [ ] Add comprehensive code documentation
- [ ] Create API documentation
- [ ] Implement security testing
- [ ] Add performance monitoring

## 📊 Expected Benefits

### Security Improvements
- ✅ Automatic tenant isolation via RLS
- ✅ Defense-in-depth security model
- ✅ Centralized security policies
- ✅ Audit trail for all data access

### Performance Gains
- ✅ Single connection pool
- ✅ Reduced database round trips
- ✅ Better query optimization
- ✅ Improved caching strategies

### Maintainability
- ✅ Cleaner code organization
- ✅ Type-safe API contracts
- ✅ Consistent error handling
- ✅ Better development experience

## 🚀 Migration Strategy

### Data Migration
1. Export data from dual databases
2. Transform to unified schema
3. Import with proper org_id mapping
4. Validate data integrity

### Code Migration
1. Update imports and references
2. Refactor API endpoints
3. Update client-side hooks
4. Test thoroughly

### Deployment
1. Blue-green deployment strategy
2. Database migration during maintenance window
3. Gradual rollout with monitoring
4. Rollback plan if needed

---

*This refactor will transform P-Core into a enterprise-grade application with proper security, performance, and maintainability.*
