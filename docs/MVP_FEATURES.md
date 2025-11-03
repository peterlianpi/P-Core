# P-Core MVP Features Documentation

This document outlines the MVP (Minimum Viable Product) implementation for the four core features of P-Core.

## 📋 Overview

The MVP includes four essential features:

1. **User Management** - User registration, authentication, and administration
2. **Notifications Management** - In-app and email notifications with preferences
3. **Organizations Management** - Multi-tenant organization and membership management
4. **Subscriptions Management** - Subscription plans, billing, and usage tracking

## 🏗️ Architecture

### Database Schema

All MVP features use PostgreSQL with the following schemas:
- `auth` schema - Authentication, users, organizations, notifications, subscriptions
- `domain` schema - Business logic and application data

### Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: Radix UI, Tailwind CSS v3
- **State Management**: Zustand (global), TanStack Query (server state)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js

## 1️⃣ User Management

### Features Implemented

✅ **User Profile Management**
- View and edit profile (name, email, avatar)
- Change password
- Delete account
- Two-factor authentication status

✅ **User Administration (Admin/Super Admin)**
- List all users with search and filtering
- View user details and organizations
- Update user roles
- Suspend/activate user accounts
- User statistics dashboard

### API Endpoints

```typescript
// User Profile
GET    /api/users/me                    // Get current user
PATCH  /api/users/me                    // Update profile
DELETE /api/users/me                    // Delete account
POST   /api/users/me/password           // Change password

// Admin Operations
GET    /api/admin/users                 // List all users (paginated)
GET    /api/admin/users/:id             // Get user by ID
PATCH  /api/admin/users/:id/role        // Update user role
PATCH  /api/admin/users/:id/status      // Suspend/activate user
GET    /api/admin/users/stats           // User statistics
```

### Components

- `UserManagementTable` - Admin table for managing users
- `UserStatsCards` - Statistics overview cards

### Usage

```typescript
import { useCurrentUser, useUpdateProfile } from '@/features/user-management';

function ProfilePage() {
  const { data: user } = useCurrentUser();
  const updateProfile = useUpdateProfile();
  
  // Use the hooks...
}
```

## 2️⃣ Notifications Management

### Features Implemented

✅ **In-App Notifications**
- Notification center with unread count
- Mark as read/unread
- Delete notifications
- Real-time updates (30s polling)

✅ **User Preferences**
- Email notifications toggle
- In-app notifications toggle
- Category-based preferences (system, account, social, promotional)
- Frequency controls (immediate, daily, weekly, never)

✅ **Notification Templates**
- Reusable templates with variable substitution
- Multiple notification types (email, in-app)
- Template management (admin)

### API Endpoints

```typescript
// User Notifications
GET    /api/notifications                    // Get user notifications
GET    /api/notifications/unread-count       // Get unread count
PUT    /api/notifications/:id/read           // Mark as read
PUT    /api/notifications/read-all           // Mark all as read
DELETE /api/notifications/:id                // Delete notification

// Preferences
GET    /api/notifications/preferences        // Get preferences
PUT    /api/notifications/preferences        // Update preferences

// Admin
GET    /api/notifications/templates          // Get templates
GET    /api/notifications/statistics         // Get statistics
```

### Components

- `NotificationList` - List of notifications
- `NotificationPreferences` - Preferences management UI
- `NotificationBell` - Bell icon with unread count

### Usage

```typescript
import { useNotifications, useUnreadCount } from '@/features/notifications/mvp';

function NotificationCenter() {
  const { data: notifications } = useNotifications();
  const { data: unreadCount } = useUnreadCount();
  
  // Use the hooks...
}
```

## 3️⃣ Organizations Management

### Features Implemented

✅ **Organization CRUD**
- Create organization with details
- Update organization settings
- Archive/delete organization
- Organization types (SCHOOL, CHURCH, LIBRARY, etc.)

✅ **Membership Management**
- Invite users via email
- Accept/decline invitations
- List organization members
- Assign organization roles
- Remove members
- Transfer ownership

✅ **Organization Context**
- Organization switcher
- Default organization preference
- Multi-tenant data isolation

### API Endpoints

```typescript
// Organizations
GET    /api/organizations                    // Get user's organizations
POST   /api/organizations                    // Create organization
GET    /api/organizations/:id                // Get organization details
PATCH  /api/organizations/:id                // Update organization
DELETE /api/organizations/:id                // Delete organization

// Membership
GET    /api/organizations/:id/members        // List members
POST   /api/organizations/:id/invite         // Invite user
PATCH  /api/organizations/:id/members/:userId/role  // Update member role
DELETE /api/organizations/:id/members/:userId       // Remove member
GET    /api/organizations/:id/dashboard      // Organization dashboard
```

### Components

- `OrganizationTable` - List of organizations
- `OrganizationSwitcher` - Switch between organizations
- `MemberManagement` - Manage organization members

## 4️⃣ Subscriptions Management

### Features Implemented

✅ **Subscription Plans**
- Display available plans (Basic, Professional, Enterprise)
- Plan comparison with features
- Monthly/yearly billing options
- Savings calculation for annual billing

✅ **Subscription Lifecycle**
- Plan selection and checkout
- Trial period (14 days)
- Subscription activation
- Plan upgrade/downgrade
- Subscription cancellation

✅ **Usage Tracking**
- Track users vs plan limit
- Track storage usage vs limit
- Track API calls vs limit
- Usage alerts (80%, 100%)

✅ **Billing Management**
- Invoice history
- Payment status tracking
- Next billing date

### API Endpoints

```typescript
// Subscriptions
GET    /api/subscriptions/plans             // Get available plans
GET    /api/subscriptions/current           // Get current subscription
POST   /api/subscriptions/checkout          // Create checkout session
POST   /api/subscriptions/upgrade           // Upgrade/downgrade plan
POST   /api/subscriptions/cancel            // Cancel subscription

// Billing
GET    /api/subscriptions/invoices          // Get invoices
GET    /api/subscriptions/usage             // Get usage statistics

// Admin
GET    /api/admin/subscriptions/analytics   // Subscription analytics
```

### Components

- `SubscriptionPlans` - Display and select plans
- `CurrentSubscription` - Current subscription status
- `UsageOverview` - Usage statistics with progress bars

### Usage

```typescript
import { useSubscriptionPlans, useCurrentSubscription } from '@/features/subscriptions';

function SubscriptionsPage() {
  const { data: plans } = useSubscriptionPlans();
  const { data: subscription } = useCurrentSubscription(orgId);
  
  // Use the hooks...
}
```

## 🔐 Security

### Row-Level Security (RLS)

All domain tables include `orgId` for multi-tenant isolation:

```sql
-- Example RLS policy
CREATE POLICY "Users can only access their org data"
  ON domain.students
  FOR ALL
  USING (org_id IN (
    SELECT organization_id 
    FROM auth.user_organizations 
    WHERE user_id = current_user_id()
  ));
```

### Role-Based Access Control

- **SUPER_ADMIN**: Full system access
- **ADMIN**: Organization management + domain features
- **EDITOR**: Domain features within organization
- **MEMBER/VIEWER**: Read-only access

## 📊 Database Migration

Run the migration to add MVP features:

```bash
# Apply the migration
psql $DATABASE_URL -f prisma/migrations/add_mvp_features.sql

# Or use Prisma
bun run db:push
```

## 🚀 Getting Started

### 1. Install Dependencies

Dependencies are already in package.json:
- `@tanstack/react-query` - Server state management
- `sonner` - Toast notifications

### 2. Run Database Migration

```bash
bun run db:push
```

### 3. Access the Features

- **User Management**: `/users` (Admin only)
- **Notifications**: `/notifications`
- **Organizations**: `/organizations`
- **Subscriptions**: `/subscriptions`

## 📈 Implementation Status

### Phase 1 (Completed) ✅
- [x] User Management types, API, hooks
- [x] Notifications types, API, hooks, components
- [x] Subscriptions types, API, hooks, components
- [x] Database schema and migration
- [x] UI components for all features

### Phase 2 (Next Steps)
- [ ] API route implementations
- [ ] Email service integration
- [ ] Stripe payment integration
- [ ] Webhook handlers
- [ ] Testing and validation

### Phase 3 (Future)
- [ ] Advanced analytics
- [ ] Automated notifications
- [ ] Usage-based billing
- [ ] Custom subscription plans

## 🎯 Success Metrics

Track these metrics to measure MVP success:

- **User Management**: Registration → Activation rate > 80%
- **Notifications**: Delivery rate > 95%, Open rate > 40%
- **Organizations**: Avg members per org > 3
- **Subscriptions**: Trial → Paid conversion > 25%

## 🔗 Related Documentation

- [Feature Architecture](./features/README.md)
- [API Documentation](./API.md)
- [Database Schema](../prisma/schema.prisma)
- [Deployment Guide](./DEPLOYMENT.md)

## 💡 Tips

1. **Organizations & Subscriptions**: Keep them separate for flexibility
2. **Notifications**: Start with email + in-app, add SMS later
3. **Subscriptions**: Use Stripe webhooks for reliable billing
4. **Testing**: Test with multiple organizations to verify RLS

## 🐛 Troubleshooting

### Common Issues

**Issue**: Can't see notifications
- Check notification preferences are enabled
- Verify user has notifications in database
- Check polling interval (30s default)

**Issue**: Subscription checkout fails
- Verify Stripe API keys are set
- Check organization has valid details
- Ensure plan is active

**Issue**: User can't access organization
- Verify user is member of organization
- Check organization role permissions
- Verify RLS policies are applied

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review the code comments
3. Check the feature README files
4. Contact the development team