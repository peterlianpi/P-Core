# 🔗 P-Core Backend Integration Guide

## Overview

Your optimized P-Core system currently uses a **mock database** for development. This guide shows how to integrate it with your **real backend** while maintaining all optimizations.

## 📋 Current Architecture

### Mock Database Setup
- **Database:** In-memory mock data
- **Trigger:** `DATABASE_URL` contains "mock" or `USE_MOCK_DB=true`
- **Location:** `lib/db/client.ts`
- **Data:** 7 test users across all roles

### Real Database Setup
- **Database:** PostgreSQL (production)
- **Trigger:** Standard DATABASE_URL
- **Schema:** Prisma schema (`prisma/schema.prisma`)
- **Migration:** `prisma migrate deploy`

---

## 🚀 Integration Steps

### Step 1: Environment Configuration

#### Current Development Setup
```bash
# .env.local (Development)
DATABASE_URL="postgresql://mock:mock@localhost:5432/mock_db"
USE_MOCK_DB=true  # Optional, auto-detected from URL
```

#### Production Backend Setup
```bash
# .env.local (Production)
DATABASE_URL="postgresql://username:password@host:port/database"
USE_MOCK_DB=false  # or remove this line
```

### Step 2: Database Schema Alignment

#### Check Your Prisma Schema
```bash
# Verify your schema matches the application expectations
npx prisma db push --preview-feature
```

#### Required Tables/Models
Your backend must include these models:
- `User` (id, email, name, role, isActive, password, emailVerified, etc.)
- `Account`, `Session`, `VerificationToken` (NextAuth)
- `Organization`, `UserOrganization` (if using org features)

### Step 3: User Data Migration

#### Option A: Migrate Existing Users
```sql
-- Export from your current database
pg_dump -h your-host -U your-user -d your-db -t users > users_backup.sql

-- Import to new database
psql -h new-host -U new-user -d new-db < users_backup.sql
```

#### Option B: Create Admin Users
```sql
-- Create initial admin user
INSERT INTO "User" (id, email, name, role, "isActive", "emailVerified", password)
VALUES (
  'admin-1',
  'admin@yourcompany.com',
  'System Admin',
  'ADMIN',
  true,
  NOW(),
  '$2a$12$...' -- bcrypt hash of your password
);
```

### Step 4: API Route Configuration

#### Current Setup (Mock + Real DB)
```typescript
// app/api/users/route.ts
export async function GET(request: NextRequest) {
  // Uses mock data when USE_MOCK_DB=true
  if (process.env.USE_MOCK_DB === 'true') {
    // Return mock data
    return NextResponse.json(mockUsers);
  }

  // Uses real database
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
```

#### Production Setup (Real DB Only)
```typescript
// Remove mock logic for production
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true
    }
  });
  return NextResponse.json(users);
}
```

### Step 5: Authentication Integration

#### NextAuth Configuration
```typescript
// lib/auth/auth.config.ts
export default {
  providers: [
    // Your existing providers
    Credentials({
      async authorize(credentials) {
        // Connect to your real user database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          };
        }
        return null;
      }
    })
  ]
}
```

### Step 6: Middleware Updates

#### Development vs Production
```typescript
// middleware.ts
export default function middleware(req: NextRequest) {
  // In development, allow API access for testing
  if (process.env.NODE_ENV === 'development' &&
      req.nextUrl.pathname.startsWith('/api/users')) {
    return NextResponse.next();
  }

  // Production: strict authentication required
  if (!isLoggedIn(req) && !isPublicRoute(req.nextUrl.pathname)) {
    return Response.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}
```

---

## 🔄 Transition Strategy

### Phase 1: Parallel Development
```
┌─────────────────┐    ┌─────────────────┐
│   Mock DB       │    │   Real DB       │
│   (Development) │    │   (Staging)     │
│                 │    │                 │
│ ✅ Fast         │    │ ✅ Production   │
│ ✅ Isolated     │    │ ✅ Real Data    │
│ ✅ No Setup     │    │ ❌ Slower       │
└─────────────────┘    └─────────────────┘
```

### Phase 2: Gradual Migration
```bash
# 1. Keep mock for development
USE_MOCK_DB=true  # Development

# 2. Test with real DB
USE_MOCK_DB=false # Staging

# 3. Deploy to production
# Remove USE_MOCK_DB entirely
```

### Phase 3: Production Deployment
```bash
# Environment variables for production
DATABASE_URL="postgresql://prod-user:prod-pass@prod-host:5432/prod-db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://yourdomain.com"

# Deploy
npm run build
npm start
```

---

## 🛠️ Code Changes Required

### 1. Update Database Client
```typescript
// lib/db/client.ts - No changes needed!
// Automatically switches based on DATABASE_URL
```

### 2. Update API Routes
```typescript
// app/api/users/route.ts
// Remove development authentication bypass
if (process.env.NODE_ENV !== 'development') {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### 3. Update Environment Variables
```bash
# .env.local (development)
DATABASE_URL="postgresql://mock:mock@localhost:5432/mock_db"

# .env.production (production)
DATABASE_URL="postgresql://real-user:real-pass@real-host:5432/real-db"
```

---

## 🔍 Testing Integration

### Development Testing
```bash
# Test with mock data
USE_MOCK_DB=true npm run dev

# Test with real data
USE_MOCK_DB=false npm run dev
```

### API Testing
```bash
# Test user API
curl http://localhost:3000/api/users

# Test authentication
curl -X POST http://localhost:3000/api/auth/signin/credentials \
  -d "email=admin@yourcompany.com&password=yourpassword"
```

### Database Testing
```bash
# Check database connection
npx prisma db push

# View data
npx prisma studio
```

---

## 🚨 Common Issues & Solutions

### Issue 1: Authentication Fails
**Problem:** Users can't login with real database
**Solution:**
```typescript
// Check password hashing
const user = await prisma.user.findUnique({ where: { email } });
const validPassword = await bcrypt.compare(password, user.password);
```

### Issue 2: API Returns 401/403
**Problem:** API routes block access
**Solution:** Check middleware configuration and session handling

### Issue 3: Database Connection Fails
**Problem:** Can't connect to production database
**Solution:**
```bash
# Test connection
psql "postgresql://user:pass@host:port/db"

# Check environment variables
echo $DATABASE_URL
```

### Issue 4: Schema Mismatch
**Problem:** Database schema doesn't match Prisma schema
**Solution:**
```bash
# Update database schema
npx prisma migrate deploy

# Reset if needed
npx prisma migrate reset
```

---

## 📊 Performance Considerations

### Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX idx_user_email ON "User"(email);
CREATE INDEX idx_user_role ON "User"(role);
CREATE INDEX idx_user_active ON "User"("isActive");
```

### Connection Pooling
```typescript
// lib/db/client.ts
const client = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
```

### Caching Strategy
```typescript
// For frequently accessed data
import { unstable_cache } from 'next/cache';

export const getUsers = unstable_cache(
  () => prisma.user.findMany(),
  ['users'],
  { revalidate: 300 } // 5 minutes
);
```

---

## 🔐 Security Checklist

- [ ] **Environment Variables:** Never commit secrets
- [ ] **Database Credentials:** Use strong passwords
- [ ] **API Authentication:** All routes protected
- [ ] **Password Hashing:** bcrypt with salt rounds ≥12
- [ ] **Session Security:** Secure cookies, short expiry
- [ ] **CORS Policy:** Restrict to your domain
- [ ] **Rate Limiting:** Implement API rate limits
- [ ] **Input Validation:** Sanitize all inputs

---

## 🚀 Deployment Ready

### Pre-Deployment Checklist
- [ ] Database schema migrated
- [ ] Environment variables set
- [ ] Authentication tested
- [ ] API endpoints working
- [ ] Performance optimized
- [ ] Security reviewed

### Deployment Commands
```bash
# Build optimized version
npm run build

# Start production server
npm start

# Or with PM2
pm2 start npm --name "p-core" -- start
```

---

## 📞 Support

If you encounter issues during integration:

1. **Check logs:** `npm run dev` output
2. **Test database:** `npx prisma studio`
3. **Verify environment:** `echo $DATABASE_URL`
4. **API testing:** Use Postman/Insomnia

**Your optimized P-Core system is designed for seamless backend integration!** 🎯
