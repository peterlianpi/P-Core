# Enhanced Role-Based Registration System

## Overview

The P-Core system now features an enhanced role-based registration system that allows users to select their account type during signup and automatically creates organizations for company registrations.

## Features

### 1. Role Selection During Registration

Users can now choose from three account types during registration:

- **Individual User**: Standard user account for personal use
- **Company/Organization**: Creates a new organization and makes the user the owner
- **Administrator**: Administrative account with elevated permissions

### 2. Automatic Organization Creation

When a user registers as a "Company/Organization":

- A new organization is automatically created
- The user becomes the owner (OrganizationRole.OWNER)
- The organization is set as the user's default organization
- Organization details are pre-populated with the provided company name

### 3. Enhanced Registration Form

The registration form now includes:

- Role selection dropdown with descriptions
- Company name field (required for company role)
- Visual role previews with feature highlights
- Improved user experience with clear guidance

### 4. Role-Based Dashboards

Different dashboard experiences based on user roles:

- **Super Admin**: Complete system oversight and management
- **Admin**: Organization management and user oversight
- **Company Owner**: Organization and team management
- **Individual User**: Personal workspace and resource access

### 5. Role-Based Navigation

Navigation menus adapt based on user roles:

- Common features for all users
- Admin-only sections for administrators
- Organization management for company owners
- Super admin exclusive features

## Technical Implementation

### Schema Changes

#### RegisterSchema Updates

```typescript
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  role: z.enum(["user", "admin", "company"]),
  companyName: z.string().optional(),
}).refine((data) => {
  // Company name required for company role
  if (data.role === "company" && !data.companyName) {
    return false;
  }
  return true;
}, {
  message: "Company name is required when registering as a company",
  path: ["companyName"],
});
```

### Registration Action Logic

The registration action now handles:

1. **Role Mapping**: Maps registration roles to UserRole enums
2. **User Creation**: Creates user with appropriate role
3. **Organization Creation**: For company role, creates organization and sets up ownership
4. **Default Organization**: Sets defaultOrgId for company owners

### Middleware Updates

Updated middleware to use NextAuth authentication with proper role-based access control:

- Protects all routes except public routes
- Redirects unauthenticated users to login
- Allows authenticated users to access protected content

## User Roles and Permissions

### UserRole Enum
- `USER`: Standard user with basic access
- `ADMIN`: Administrative access to user management
- `SUPERADMIN`: Complete system access
- `DEVELOPMENT`: Development/testing access

### OrganizationRole Enum
- `OWNER`: Full organization control
- `ADMIN`: Organization administration
- `MEMBER`: Standard organization member
- `VIEWER`: Read-only organization access

## Registration Flow

### Individual User Registration
1. User selects "Individual User" role
2. Provides name, email, password
3. Account created with USER role
4. Redirected to personal dashboard

### Company Registration
1. User selects "Company/Organization" role
2. Provides name, email, password, company name
3. User account created with USER role
4. Organization created with user as OWNER
5. Organization set as default for user
6. Redirected to organization dashboard

### Admin Registration
1. User selects "Administrator" role
2. Provides name, email, password
3. Account created with ADMIN role
4. Redirected to admin dashboard

## Dashboard Experiences

### Super Admin Dashboard
- System administration tools
- User management overview
- Analytics and reporting
- Security audit access
- Revenue and subscription metrics

### Admin Dashboard
- User administration within organization
- Organization settings management
- Reports and analytics
- System logs and alerts

### Company Owner Dashboard
- Team management tools
- Organization overview
- Project tracking
- Resource access management

### Individual User Dashboard
- Personal profile management
- Available organizations browser
- Resource library access
- Personal workspace features

## Navigation Components

### Role-Based Navigation
- Dynamic menu items based on user role
- Role-specific quick actions
- Organization stats for company owners
- Admin action shortcuts

### Sidebar Integration
- Role-aware sidebar content
- Contextual navigation options
- Quick access to frequently used features

## Security Considerations

### Authentication
- NextAuth.js integration with JWT
- 2FA support for enhanced security
- Secure password hashing with bcrypt

### Authorization
- Role-based access control (RBAC)
- Organization-level permissions
- API route protection

### Data Isolation
- Multi-tenant architecture
- Organization data separation
- User permission validation

## API Endpoints

### Registration
- `POST /api/auth/register` - Enhanced registration with role selection
- Supports organization creation for company role
- Email verification workflow

### User Management
- `GET /api/users` - List users (admin only)
- `PUT /api/users/{id}/role` - Update user role (admin only)
- `PUT /api/users/{id}/status` - Toggle user status (admin only)

### Organization Management
- `POST /api/organizations` - Create organization
- `GET /api/organizations` - List user organizations
- `PUT /api/organizations/{id}` - Update organization

## Testing

### Registration Scenarios
- Individual user registration
- Company registration with organization creation
- Admin registration
- Validation of required fields
- Email verification flow

### Role-Based Access
- Dashboard access by role
- Navigation menu filtering
- API endpoint authorization
- Organization ownership validation

## Future Enhancements

### Planned Features
- Organization invitation system
- Role-based email templates
- Advanced permission management
- Organization transfer capabilities
- Multi-organization membership

### Scalability Considerations
- Organization sharding for large deployments
- Role hierarchy system
- Custom role definitions
- Permission caching optimization

## Migration Guide

### Existing Users
- Existing users maintain their current roles
- No data migration required
- Backward compatibility maintained

### Database Updates
- New organization records for company registrations
- Updated user defaultOrgId fields
- Maintained existing user relationships

## Support and Documentation

### User Guides
- Registration walkthrough
- Role selection guide
- Organization management tutorial
- Admin panel documentation

### API Documentation
- Authentication endpoints
- User management APIs
- Organization APIs
- Role and permission schemas

### Troubleshooting
- Common registration issues
- Role assignment problems
- Organization creation failures
- Permission access issues

---

## Quick Start

1. **Register as Company**: Select "Company/Organization" during signup
2. **Provide Company Details**: Enter your company name
3. **Automatic Setup**: Organization created automatically
4. **Access Dashboard**: Use role-based dashboard for management
5. **Invite Team Members**: Start building your organization

This enhanced system provides a seamless onboarding experience while maintaining security and proper access controls.
