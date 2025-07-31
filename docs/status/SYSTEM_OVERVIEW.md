# P-Core System Overview & Architecture

## 🏗️ **System Architecture**

P-Core is a **multi-tenant, feature-based educational management platform** built with modern web technologies and enterprise-grade security.

### **Core Technology Stack**
- **Frontend**: Next.js 15 + React 18 + TypeScript + Tailwind CSS
- **Backend**: Hono.js API framework with Edge Runtime support
- **Database**: PostgreSQL with Prisma ORM (unified schema approach)
- **Authentication**: NextAuth.js with JWT optimization
- **Security**: Multi-tenant RLS (Row Level Security)
- **Logging**: Dual-channel (Database + Telegram) with comprehensive tracking

## 📊 **Database Architecture**

### **Unified Schema Design**
The system uses a **single PostgreSQL database** with **logical schema separation**:

```sql
-- auth schema: Authentication & Authorization
- users, accounts, sessions
- organizations, roles, permissions
- telegram_settings, update_logs

-- domain schema: Business Logic
- students, courses, lesson_books
- choirs, books, purchases
- schedules, course_status_logs
```

### **Multi-Tenant Security (RLS)**
- **Organization-based isolation** using Row Level Security
- **Automatic tenant context** injection in all queries  
- **Security middleware** validates org access in API routes

## 🔐 **Authentication & Authorization System**

### **User Roles Hierarchy**
```
SUPERADMIN → Global system access
    ↓
ADMIN → Organization-wide access
    ↓  
EDITOR → Content management access
    ↓
VIEWER → Read-only access
```

### **Session Management**
- **JWT-optimized** NextAuth configuration
- **Edge-compatible** authentication for middleware
- **Security headers** and CORS protection
- **Two-factor authentication** support

## 🚀 **Feature Management System**

### **Dynamic Feature Registry**
Located in `/features/feature-registry.ts`:

```typescript
// Features are categorized and can be enabled/disabled
DOMAIN_FEATURES = {
  "organization-management": { enabled: true, requiredRole: "ADMIN" },
  "school-management": { enabled: true, dependencies: ["organization-management"] },
  // ... more features
}
```

### **Feature Loading Architecture**
- **Lazy loading** with `features/feature-loader.tsx`
- **Permission-based** feature access control
- **Dynamic imports** for performance optimization
- **Dependency management** between features

## 📋 **Logging & Monitoring System**

### **Multi-Channel Logging Architecture**

#### **1. Database Logging (`UpdateLog` table)**
```typescript
// Stores all system activities
{
  id: string,
  name: string,        // Activity title
  message: string,     // Detailed message  
  type: "INFO" | "WARNING" | "ERROR",
  date: DateTime,
  updatedBy: string,   // User ID or "SYSTEM"
  orgId?: string       // Organization context (optional)
}
```

#### **2. Telegram Integration**
```typescript
// lib/telegram/telegram.ts
export async function sendTelegramLog({
  userId?: string,
  orgId?: string, 
  role?: UserRole,
  title: string,
  message: string,
  type?: LogType,
  metadata?: Record<string, any>
})
```

**Enhanced Features:**
- ✅ **Organization validation** before logging
- ✅ **Automatic fallback** to environment variables
- ✅ **Message formatting** with emojis and context
- ✅ **Timeout protection** (10 seconds)
- ✅ **Delivery tracking** and failure reporting
- ✅ **Length constraints** to prevent DB errors

### **Activity Tracking System**

#### **User Activity Tracking**
```typescript
// actions/auth/track-system-activities.ts
trackLogin({ value, userId, role })       // User login events
trackLogout({ value })                    // User logout events  
trackRegister({ value })                  // New user registration
trackUpdate({ value })                    // Profile updates
trackTwoFactorEnabled({ value })          // 2FA security events
trackEmailChange({ old, new })            // Email changes
// ... 15+ tracked events
```

#### **System Event Categories**
1. **Authentication Events**: Login, logout, registration, 2FA
2. **Profile Management**: Email changes, password updates  
3. **Organization Events**: Org creation, member management
4. **Security Events**: Failed logins, permission changes
5. **System Events**: Feature usage, API calls

## 🛡️ **Security & Error Handling**

### **Enhanced Error Handler (`lib/error-handler.ts`)**

#### **Security Features**
- **Information sanitization** prevents sensitive data leakage
- **Structured logging** with security context
- **Environment-aware** error details (dev vs prod)
- **Request correlation** with unique request IDs

#### **Error Types & Handling**
```typescript
handleError(c, error, 500, 'INTERNAL_ERROR')           // Generic errors
handleValidationError(c, validationError)              // Input validation  
handleAuthorizationError(c, message)                   // Access denied
handleDatabaseError(c, dbError)                        // Prisma/DB errors
handleRateLimitError(c, retryAfter)                     // Rate limiting
```

#### **Database Error Translation**
- **P2002** → "Record already exists" (409)
- **P2025** → "Record not found" (404)  
- **P2003** → "Data constraint violation" (400)

### **API Security Middleware**
```typescript
// app/api/[[...route]]/route.ts
app.use("*", timeout(30000))              // Request timeout
app.use("*", secureHeaders())             // Security headers
app.use("*", organizationSecurityMiddleware) // RLS enforcement
```

## 🔄 **API Architecture** 

### **Hono.js Framework Benefits**
- **Type-safe** API client generation
- **Edge Runtime** compatible
- **Built-in middleware** ecosystem
- **Performance optimized** routing

### **Route Organization**
```
/api/
  ├── org.ts              # Organization management
  ├── students.ts         # Student management  
  ├── courses.ts          # Course management
  ├── members.ts          # Member management
  ├── dashboard.ts        # Analytics & reporting
  └── [...15+ endpoints]
```

### **Request Lifecycle**
1. **Security Headers** applied
2. **CORS validation** performed
3. **Authentication** verified (NextAuth)
4. **Organization context** established (RLS)
5. **Route handler** executed
6. **Response formatting** and logging
7. **Error handling** if needed

## 🎨 **UI/UX Architecture**

### **Component System**
- **Radix UI** primitives for accessibility
- **shadcn/ui** components for consistency  
- **Tailwind CSS** for styling
- **Custom animations** for enhanced UX

### **Error & Loading States**
- **404 Page** with fun animations (`app/not-found.tsx`)
- **Access Denied** with role-based messaging  
- **Global Error** handling with recovery options
- **Loading states** with particle animations
- **Error boundaries** for fault tolerance

### **Feature-Based Navigation**
```typescript
// components/app-sidebar-enhanced.tsx
// Dynamically loads navigation based on enabled features
// and user permissions
```

## 🔧 **Development & Operations**

### **Build & Development Commands**
```bash
npm run dev          # Development server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint checks  
npm run generate     # Prisma client generation
npm run migrate      # Database migrations
npm run studio       # Prisma Studio (DB management)
npm run seed         # Database seeding
```

### **Environment Configuration**
```env
# Core Database
DATABASE_URL=postgresql://...

# Authentication  
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...

# Telegram Logging (Optional)
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...

# Feature Flags
NEXT_PUBLIC_FEATURE_SCHOOL_MANAGEMENT=true
```

## 📈 **Monitoring & Analytics**

### **System Health Monitoring**
- **Database connectivity** checks (`lib/db/client.ts`)
- **API response times** tracking
- **Error rate monitoring** via structured logging
- **User activity analytics** via dashboard

### **Telegram Notification Categories**
- **🚨 ERROR**: Critical system failures
- **⚠️ WARNING**: Important system events  
- **ℹ️ INFO**: General activity logging
- **📝 DEFAULT**: Miscellaneous events

### **Performance Optimizations**
- **Connection pooling** for database
- **JWT optimization** for auth
- **Lazy loading** for features
- **Edge Runtime** for middleware
- **Turbopack** for development builds

## 🔮 **Future Enhancements**

### **Planned Improvements**
1. **Real-time notifications** with WebSockets
2. **Advanced analytics** dashboard
3. **Audit trail** system with detailed change tracking
4. **API rate limiting** with Redis
5. **File upload** system with cloud storage
6. **Mobile app** support via React Native
7. **Plugin system** for third-party integrations

### **Scalability Considerations**
- **Horizontal scaling** with load balancers
- **Database sharding** for large datasets
- **CDN integration** for static assets
- **Caching layers** with Redis
- **Microservices** migration path

## 📖 **Development Notes**

### **Code Organization Principles**
1. **Feature-based** directory structure
2. **Separation of concerns** (API, UI, business logic)
3. **Type safety** throughout the application
4. **Security-first** approach to data handling
5. **Comprehensive logging** for debugging and monitoring

### **Key Files to Understand**
- `features/feature-registry.ts` - Feature management system
- `lib/telegram/telegram.ts` - Enhanced logging system  
- `lib/error-handler.ts` - Security-focused error handling
- `lib/db/client.ts` - Database connection and RLS
- `auth.ts` - Authentication configuration
- `middleware.ts` - Request security and routing

### **Testing Strategy**
- **No test framework** currently configured
- **Manual testing** workflows established
- **Database migrations** testing in staging
- **Error handling** validation in development
- **Feature flag** testing across environments

---

## 🏆 **System Strengths**

✅ **Multi-tenant architecture** with proper data isolation  
✅ **Comprehensive logging** with dual-channel delivery  
✅ **Feature-based modularity** for scalability  
✅ **Security-first design** with sanitized error handling  
✅ **Type-safe development** with TypeScript throughout  
✅ **Modern tech stack** with performance optimization  
✅ **Flexible authentication** with role-based access  
✅ **Enhanced error recovery** with user-friendly interfaces  

The P-Core system represents a **robust, scalable, and secure** educational management platform with **enterprise-grade** logging, monitoring, and error handling capabilities.
