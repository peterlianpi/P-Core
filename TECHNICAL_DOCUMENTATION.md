# P-Core System - Technical Documentation

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Database Design](#database-design)
5. [API Documentation](#api-documentation)
6. [Feature Modules](#feature-modules)
7. [Security Implementation](#security-implementation)
8. [Installation & Setup](#installation--setup)
9. [Environment Configuration](#environment-configuration)
10. [Development Guidelines](#development-guidelines)
11. [Deployment Guide](#deployment-guide)
12. [Troubleshooting](#troubleshooting)
13. [Known Limitations](#known-limitations)
14. [Roadmap](#roadmap)

## System Overview

**P-Core** is a flexible, pluggable, and reusable management system designed to support multiple domain types including:

- 🎓 Student Management
- ⛪ Church Member Management  
- 📦 Goods/Inventory Management

The system follows a modular architecture where each domain has its own custom fields and logic, but all share the same core CRUD structure, authentication, RBAC, and UI components.

### Key Features

- ✅ Multi-tenant organization system
- ✅ Role-based access control (SUPERADMIN, ADMIN, MANAGER, USER)
- ✅ Complete authentication flow with NextAuth.js v5
- ✅ Student management with course enrollment
- ✅ File upload capabilities (Cloudinary integration)
- ✅ Email notification system (Resend)
- ✅ Modern responsive UI with shadcn/ui
- ✅ Real-time data updates
- ✅ CSV import/export functionality
- ✅ Advanced search and filtering
- ✅ Dashboard with analytics

## Architecture

### Core Architecture Patterns

#### 1. **Dual Database Design**
- **User Database**: Authentication, organizations, roles, features
- **Features Database**: Domain-specific data (students, courses, purchases, etc.)

#### 2. **Feature-Based Module System**
```
/features/
├── students/           # Student management
├── org/               # Organization management  
├── school-management/ # Educational features
├── image-upload/      # File upload utilities
├── feedback/          # User feedback system
└── version/           # Version management
```

#### 3. **Layered Architecture**
```
┌─────────────────┐
│   UI Layer      │ ← Next.js App Router + shadcn/ui
├─────────────────┤
│ Business Logic  │ ← Server Actions + Zod Validation
├─────────────────┤
│   API Layer     │ ← Hono.js API Routes
├─────────────────┤
│   Data Layer    │ ← Prisma ORM + PostgreSQL
└─────────────────┘
```

#### 4. **Authentication Flow**
```
User → NextAuth.js → JWT → Middleware → Protected Routes
                    ↓
                Database Session Validation
```

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: Zustand, React Query
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend  
- **Runtime**: Node.js
- **API Framework**: Hono.js
- **Database**: PostgreSQL (dual database setup)
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5
- **Email Service**: Resend
- **File Storage**: Cloudinary
- **Validation**: Zod schemas

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript
- **Build Tool**: Next.js built-in (Turbopack)
- **Database Migrations**: Prisma Migrate

## Database Design

### User Database Schema
```sql
-- Core authentication and organization models
User (id, email, name, password, role, emailVerified, image, defaultOrgId)
Account (OAuth provider accounts)
Organization (id, name, type, isActive, logo, description)
UserOrganization (user-organization relationships with roles)
Feature (system features)
OrganizationFeatureAccess (feature permissions per org)

-- Security and tokens
VerificationToken (email verification)
PasswordResetToken (password reset flow)  
TwoFactorToken (2FA authentication)
TwoFactorConfirmation (2FA session management)

-- System management
VersionInfo (application version tracking)
Feedback (user feedback and feature requests)
UpdateLog (system update history)
TelegramSetting (notification integration)
```

### Features Database Schema
```sql
-- Educational management
Student (id, name, email, phone, orgId, courseId, status)
Course (id, title, description, price, duration, orgId)
LessonBook (id, title, description, price, courseId)
Teacher (id, name, email, expertise, orgId)
Room (id, name, capacity, location, orgId)

-- Enrollment and progress
StudentCourse (student-course relationships)
CourseStatusLog (enrollment status changes)
LessonProgress (individual lesson completion)

-- Scheduling system
Schedule (id, courseId, teacherId, roomId, dayOfWeek, startTime)
StudentSchedule (student schedule assignments)

-- Financial management
Purchase (id, studentId, amount, type, status, description)
Invoice (id, studentId, amount, items, status, dueDate)
```

### Relationships
```mermaid
erDiagram
    User ||--o{ UserOrganization : belongs_to
    Organization ||--o{ UserOrganization : has
    Organization ||--o{ Student : contains
    Student ||--o{ StudentCourse : enrolls_in
    Course ||--o{ StudentCourse : has
    Student ||--o{ Purchase : makes
    Course ||--o{ Schedule : scheduled_for
    Teacher ||--o{ Schedule : teaches
    Room ||--o{ Schedule : hosts
```

## API Documentation

### Authentication Endpoints
```typescript
POST /api/auth/register     // User registration
POST /api/auth/login        // User login  
POST /api/auth/logout       // User logout
POST /api/auth/reset        // Password reset
POST /api/auth/verify       // Email verification
```

### Organization Management
```typescript
GET    /api/org             // List user organizations
POST   /api/org             // Create organization
PUT    /api/org/:id         // Update organization
DELETE /api/org/:id         // Delete organization
POST   /api/org/invite      // Invite user to organization
PUT    /api/org/roles       // Update user roles
```

### Student Management
```typescript
GET    /api/students        // List students (with pagination)
POST   /api/students        // Create student
PUT    /api/students/:id    // Update student
DELETE /api/students/:id    // Delete student
POST   /api/students/bulk   // Bulk create students
GET    /api/students/stats  // Student statistics
```

### Course Management
```typescript
GET    /api/courses         // List courses
POST   /api/courses         // Create course
PUT    /api/courses/:id     // Update course
DELETE /api/courses/:id     // Delete course
```

### File Upload
```typescript
POST   /api/upload-image    // Upload image to Cloudinary
DELETE /api/upload-image    // Delete image from Cloudinary
```

## Feature Modules

### 1. **Authentication System**
**Location**: `/auth.ts`, `/auth.config.ts`

**Features**:
- JWT-based authentication
- OAuth providers (Google, GitHub)
- Email verification flow
- Password reset functionality  
- Two-factor authentication support
- Session management

**Security Measures**:
- bcryptjs password hashing
- CSRF protection
- Session rotation
- Rate limiting (planned)

### 2. **Organization Management**
**Location**: `/features/org/`

**Features**:
- Multi-tenant organization system
- Role-based permissions (SUPERADMIN, ADMIN, MANAGER, USER)
- User invitation system
- Organization settings and branding
- Member management

**Components**:
- Organization creation/editing forms
- Member invitation flow
- Role management interface
- Organization switcher

### 3. **Student Management**
**Location**: `/features/school-management/`

**Features**:
- Student CRUD operations
- Course enrollment management
- Progress tracking
- Bulk import via CSV
- Advanced search and filtering
- Student analytics

**Components**:
- Student data table with pagination
- Student profile management
- Course enrollment interface
- Progress tracking dashboard

### 4. **File Upload System**
**Location**: `/features/image-upload/`

**Features**:
- Cloudinary integration
- Image optimization
- Multiple file format support
- Secure upload with validation
- Image transformation capabilities

### 5. **Notification System**
**Location**: `/lib/mail/`, `/lib/telegram/`

**Features**:
- Email notifications via Resend
- Telegram integration (optional)
- Template-based messaging
- Bulk notification support

## Security Implementation

### Authentication Security
```typescript
// Password hashing
const hashedPassword = await bcryptjs.hash(password, 12);

// JWT token validation
export const { auth } = NextAuth({
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token }) {
      // Token validation logic
    }
  }
});
```

### Authorization Middleware
```typescript
// Route protection
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);
  
  if (isApiAuthRoute) return null;
  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(new URL("/auth/login", req.nextUrl));
  }
});
```

### Data Validation
```typescript
// Zod schema validation
const CreateStudentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  orgId: z.string().cuid("Invalid organization ID")
});
```

### Database Security
- Parameterized queries via Prisma ORM
- Row-level security (organization-based filtering)
- Input sanitization
- Connection pooling and limits

## Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn package manager

### Quick Start
```bash
# Clone repository
git clone https://github.com/your-username/p-core.git
cd p-core

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Setup databases
npm run migrate

# Generate Prisma clients
npm run generate

# Start development server
npm run dev
```

### Database Setup
```bash
# Create databases
createdb p_core_users
createdb p_core_features

# Run migrations
npm run migrate

# Seed initial data (optional)
npm run seed
```

## Environment Configuration

### Required Environment Variables
```bash
# Database Configuration
PPG_USER_DATABASE_URL="postgresql://user:pass@localhost:5432/p_core_users"
PPG_FEATURES_DATABASE_URL="postgresql://user:pass@localhost:5432/p_core_features"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email Service
RESEND_API_KEY="re_your_resend_api_key"

# File Upload
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"  
CLOUDINARY_API_SECRET="your_api_secret"

# Application
NEXT_PUBLIC_APP_NAME="P-Core"
NODE_ENV="development"
```

### Optional Configuration
```bash
# Telegram Integration
TELEGRAM_BOT_TOKEN="your_bot_token"

# AI Features
OPENAI_API_KEY="your_openai_key"

# OAuth Providers
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

## Development Guidelines

### Code Structure
```
/app/                    # Next.js App Router pages
├── (protected)/         # Protected routes
├── api/                # API routes
├── auth/               # Authentication pages
└── globals.css         # Global styles

/components/            # Reusable UI components
├── ui/                 # shadcn/ui components
├── auth/              # Authentication components
└── ...

/features/             # Feature modules
├── org/              # Organization management
├── school-management/ # Educational features
└── ...

/lib/                  # Utility libraries
├── db/               # Database configuration
├── mail/             # Email utilities
└── ...

/actions/             # Server actions
├── auth/            # Authentication actions
├── features/        # Feature-specific actions
└── core/            # Core system actions
```

### Coding Standards
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write Zod schemas for data validation
- Use React Hook Form for forms
- Implement proper error handling
- Write descriptive commit messages

### Component Guidelines
```typescript
// Component structure example
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ComponentProps {
  title: string;
  onSubmit: () => void;
}

export function Component({ title, onSubmit }: ComponentProps) {
  const [loading, setLoading] = useState(false);
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Button onClick={onSubmit} disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </Button>
    </div>
  );
}
```

## Deployment Guide

### Production Build
```bash
# Build application
npm run build

# Start production server
npm start
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Add environment variables in Vercel dashboard
```

### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Database Migration
```bash
# Production migration
npm run deploy

# Check migration status
npx prisma migrate status
```

## Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma client
npm run generate
```

#### Database Connection Issues
```bash
# Test database connectivity
npx prisma db pull

# Reset database (development only)
npm run reset1  # User database
npm run reset2  # Features database
```

#### Authentication Issues
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches deployment URL
- Ensure database tables are created
- Verify OAuth provider configuration

### Performance Optimization
- Enable Prisma Accelerate for production
- Implement Redis caching
- Optimize database queries
- Use Next.js Image optimization
- Enable gzip compression

## Known Limitations

### Current Limitations
1. **Notification System**: Database models not implemented yet
2. **Real-time Features**: WebSocket integration planned
3. **Advanced Analytics**: More detailed reporting needed
4. **Mobile App**: React Native version planned
5. **Bulk Operations**: Limited bulk editing capabilities

### Technical Debt
- Some TypeScript `any` types need proper typing
- Console.error/warn statements for debugging
- Missing comprehensive test suite
- Documentation could be more detailed

### Browser Support
- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Mobile browsers supported
- IE11 not supported

## Roadmap

### Phase 1 (Current)
- ✅ Core authentication system
- ✅ Organization management
- ✅ Student management basics
- ✅ File upload system
- ✅ Basic UI components

### Phase 2 (Next Quarter)
- 🔄 Notification system implementation
- 🔄 Advanced analytics dashboard
- 🔄 Real-time updates
- 🔄 Mobile responsiveness improvements
- 🔄 Performance optimizations

### Phase 3 (Future)
- 📋 Multi-language support
- 📋 Advanced reporting system  
- 📋 Mobile application
- 📋 API rate limiting
- 📋 Advanced security features

### Phase 4 (Long-term)
- 📋 AI-powered features
- 📋 Third-party integrations
- 📋 Advanced workflow automation
- 📋 Enterprise features
- 📋 Multi-region deployment

---

## Support

For technical support or questions:

- **Email**: peterpausianlian2020@gmail.com
- **Location**: Kalaymyo, Myanmar 🇲🇲
- **GitHub Issues**: Create an issue in the repository

## License

This project is proprietary software. All rights reserved.

---

*Last updated: December 2024*
*Version: 0.1.0*