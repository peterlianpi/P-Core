# 📝 P-Core Coding Standards

This document outlines the coding standards, conventions, and best practices for the P-Core project. Following these guidelines ensures consistency, maintainability, and high code quality across the entire codebase.

---

## 🎯 **Core Principles**

### **1. Type Safety First**
- **Zero `any` types**: Use proper TypeScript types throughout
- **Strict mode enabled**: No implicit any, strict null checks
- **Interface over type**: Prefer interfaces for object shapes
- **Generic constraints**: Use proper generic constraints

### **2. Performance by Design**
- **Lazy loading**: Load components and features on demand
- **Memoization**: Use React.memo, useMemo, useCallback appropriately
- **Bundle optimization**: Tree shaking and code splitting
- **Database efficiency**: Optimized queries with proper indexing

### **3. Developer Experience**
- **Self-documenting code**: Clear naming and structure
- **Comprehensive comments**: JSDoc for public APIs
- **Error handling**: Graceful error handling with user feedback
- **Testing**: Write testable, modular code

### **4. Security Consciousness**
- **Input validation**: Validate all user inputs
- **SQL injection prevention**: Use Prisma ORM properly
- **XSS protection**: Sanitize outputs
- **Authentication**: Proper session management

---

## 📁 **Project Structure Standards**

### **Feature-Based Organization**
```
src/
├── features/                    # Domain-specific features
│   ├── school-management/       # School management domain
│   │   ├── api/                # API hooks and utilities
│   │   ├── components/         # Feature-specific components
│   │   ├── hooks/              # Custom hooks
│   │   ├── types/              # TypeScript types
│   │   └── index.ts            # Feature exports
│   ├── church-management/      # Church management domain
│   └── shared/                 # Shared feature utilities
├── components/                 # Reusable UI components
│   ├── ui/                     # ShadCN UI components
│   ├── forms/                  # Form components
│   ├── tables/                 # Data table components
│   └── layout/                 # Layout components
├── lib/                        # Core libraries and utilities
│   ├── auth/                   # Authentication utilities
│   ├── db/                     # Database utilities
│   ├── utils/                  # General utilities
│   └── types/                  # Global types
└── app/                        # Next.js App Router pages
```

### **File Naming Conventions**
```typescript
// Components: PascalCase
UserProfile.tsx
StudentTable.tsx
OrganizationSettings.tsx

// Hooks: camelCase with 'use' prefix
useStudents.ts
useOrganization.ts
useAuth.ts

// Utilities: camelCase
formatDate.ts
validateEmail.ts
apiClient.ts

// Types: PascalCase with descriptive names
UserTypes.ts
DatabaseSchemas.ts
ApiResponses.ts

// Constants: SCREAMING_SNAKE_CASE
API_ENDPOINTS.ts
ERROR_MESSAGES.ts
FEATURE_FLAGS.ts
```

---

## 🔧 **TypeScript Standards**

### **Type Definitions**
```typescript
// ✅ Good: Descriptive interface names
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Good: Generic constraints
interface ApiResponse<T extends Record<string, unknown>> {
  data: T;
  success: boolean;
  message?: string;
}

// ❌ Bad: Generic any type
interface BadApiResponse {
  data: any; // Avoid this!
  success: boolean;
}

// ✅ Good: Union types for specific values
type UserRole = 'ADMIN' | 'MANAGER' | 'MEMBER';
type OrganizationType = 'SCHOOL' | 'CHURCH' | 'LIBRARY';

// ✅ Good: Utility types
type CreateUserRequest = Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateUserRequest = Partial<Pick<UserProfile, 'name' | 'email'>>;
```

### **Function Signatures**
```typescript
// ✅ Good: Explicit return types for public functions
export async function createUser(
  data: CreateUserRequest
): Promise<ApiResponse<UserProfile>> {
  // Implementation
}

// ✅ Good: Generic functions with constraints
export function createApiHook<T extends Record<string, unknown>>(
  endpoint: string
): UseQueryResult<ApiResponse<T>> {
  // Implementation
}

// ✅ Good: Optional parameters with defaults
export function formatDate(
  date: Date,
  format: 'short' | 'long' = 'short'
): string {
  // Implementation
}
```

### **Error Handling**
```typescript
// ✅ Good: Custom error types
export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public code: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// ✅ Good: Result pattern for error handling
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

export async function safeApiCall<T>(
  apiCall: () => Promise<T>
): Promise<Result<T>> {
  try {
    const data = await apiCall();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
}
```

---

## ⚛️ **React Component Standards**

### **Component Structure**
```typescript
// ✅ Good: Component with proper TypeScript
import React from 'react';
import { cn } from '@/lib/utils';

/**
 * UserCard component displays user information in a card format
 * 
 * @param user - User data to display
 * @param onEdit - Callback when edit button is clicked
 * @param className - Additional CSS classes
 */
interface UserCardProps {
  user: UserProfile;
  onEdit?: (userId: string) => void;
  className?: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  className
}) => {
  // Event handlers
  const handleEditClick = () => {
    onEdit?.(user.id);
  };

  return (
    <div className={cn('p-4 border rounded-lg', className)}>
      <h3 className="font-semibold">{user.name}</h3>
      <p className="text-muted-foreground">{user.email}</p>
      <p className="text-sm">Role: {user.role}</p>
      
      {onEdit && (
        <button
          onClick={handleEditClick}
          className="mt-2 px-3 py-1 bg-primary text-primary-foreground rounded"
        >
          Edit
        </button>
      )}
    </div>
  );
};

// Export for easier imports
export default UserCard;
```

### **Custom Hooks**
```typescript
// ✅ Good: Custom hook with proper typing
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

/**
 * Hook for managing user data operations
 * 
 * @param organizationId - Organization context
 * @returns User management operations and state
 */
export function useUsers(organizationId: string) {
  const queryClient = useQueryClient();

  // Query for fetching users
  const usersQuery = useQuery({
    queryKey: ['users', organizationId],
    queryFn: () => apiClient.getUsers(organizationId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation for creating users
  const createUserMutation = useMutation({
    mutationFn: (data: CreateUserRequest) => 
      apiClient.createUser(organizationId, data),
    onSuccess: () => {
      // Invalidate and refetch users
      queryClient.invalidateQueries({ queryKey: ['users', organizationId] });
    },
  });

  return {
    // Data
    users: usersQuery.data,
    isLoading: usersQuery.isLoading,
    error: usersQuery.error,
    
    // Actions
    createUser: createUserMutation.mutate,
    isCreating: createUserMutation.isPending,
    
    // Utilities
    refetch: usersQuery.refetch,
  };
}
```

### **Form Components**
```typescript
// ✅ Good: Form with validation using react-hook-form + zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation schema
const userFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['ADMIN', 'MANAGER', 'MEMBER']),
});

type UserFormData = z.infer<typeof userFormSchema>;

interface UserFormProps {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => Promise<void>;
  isLoading?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false
}) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialData,
  });

  const handleSubmit = async (data: UserFormData) => {
    try {
      await onSubmit(data);
      form.reset();
    } catch (error) {
      // Handle error (show toast, etc.)
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      {/* Form fields implementation */}
    </form>
  );
};
```

---

## 🔌 **API Development Standards**

### **Hono.js Route Structure**
```typescript
// ✅ Good: Type-safe API route with validation
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const app = new Hono();

// Request/Response schemas
const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['ADMIN', 'MANAGER', 'MEMBER']),
});

const userResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  createdAt: z.string(),
});

// Route implementation
app.post(
  '/users',
  zValidator('json', createUserSchema),
  async (c) => {
    try {
      const data = c.req.valid('json');
      const orgId = c.get('organizationId'); // From middleware
      
      // Create user with proper error handling
      const user = await createUser(orgId, data);
      
      return c.json({
        success: true,
        data: user,
        message: 'User created successfully'
      });
    } catch (error) {
      return handleApiError(c, error);
    }
  }
);

export default app;
```

### **Database Operations**
```typescript
// ✅ Good: Database operations with proper error handling
import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

/**
 * Create a new user in the specified organization
 * 
 * @param organizationId - Organization context
 * @param userData - User data to create
 * @returns Created user data
 */
export async function createUser(
  organizationId: string,
  userData: CreateUserRequest
): Promise<UserProfile> {
  try {
    // Use transaction for data consistency
    const user = await prisma.$transaction(async (tx) => {
      // Create user
      const newUser = await tx.user.create({
        data: {
          ...userData,
          organizations: {
            create: {
              organizationId,
              role: userData.role,
            }
          }
        },
        include: {
          organizations: {
            include: {
              organization: true
            }
          }
        }
      });

      // Log activity
      await tx.updateLog.create({
        data: {
          name: 'User Created',
          message: `User ${newUser.name} was created`,
          type: 'INFO',
          orgId: organizationId,
          updatedBy: 'SYSTEM'
        }
      });

      return newUser;
    });

    return user;
  } catch (error) {
    // Handle Prisma-specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ValidationError('Email already exists', 'email', 'DUPLICATE_EMAIL');
      }
    }
    
    throw error;
  }
}
```

---

## 🎨 **UI/UX Standards**

### **Component Styling**
```typescript
// ✅ Good: Consistent styling with Tailwind + ShadCN
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  trend = 'neutral',
  className
}) => {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-muted-foreground'
  };

  return (
    <Card className={cn('p-6', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className={cn('text-xs mt-1', trendColors[trend])}>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
```

### **Responsive Design**
```typescript
// ✅ Good: Mobile-first responsive design
export const ResponsiveTable: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="w-full">
      {/* Desktop table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                  <Button size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {data.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.email}</p>
              <Badge variant="secondary">{item.role}</Badge>
              <Button size="sm" className="w-full">Edit</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
```

---

## 🧪 **Testing Standards**

### **Unit Testing**
```typescript
// ✅ Good: Comprehensive unit test
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'ADMIN' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Role: ADMIN')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', async () => {
    const onEdit = vi.fn();
    render(<UserCard user={mockUser} onEdit={onEdit} />);
    
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    await waitFor(() => {
      expect(onEdit).toHaveBeenCalledWith('1');
    });
  });

  it('does not render edit button when onEdit is not provided', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });
});
```

### **API Testing**
```typescript
// ✅ Good: API endpoint testing
import { describe, it, expect, beforeEach } from 'vitest';
import { testClient } from '@/lib/test-utils';

describe('Users API', () => {
  beforeEach(async () => {
    // Setup test database
    await setupTestDatabase();
  });

  it('creates user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'MEMBER'
    };

    const response = await testClient.api.users.$post({
      json: userData
    });

    expect(response.status).toBe(201);
    
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data.name).toBe(userData.name);
  });

  it('validates required fields', async () => {
    const invalidData = {
      name: '', // Invalid: empty name
      email: 'invalid-email', // Invalid: bad email format
    };

    const response = await testClient.api.users.$post({
      json: invalidData
    });

    expect(response.status).toBe(400);
    
    const result = await response.json();
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
  });
});
```

---

## 📚 **Documentation Standards**

### **JSDoc Comments**
```typescript
/**
 * Formats a date according to the specified format and locale
 * 
 * @param date - The date to format
 * @param format - The format type ('short', 'long', 'iso')
 * @param locale - The locale for formatting (defaults to 'en-US')
 * @returns Formatted date string
 * 
 * @example
 * ```typescript
 * formatDate(new Date(), 'short') // "12/25/2023"
 * formatDate(new Date(), 'long') // "December 25, 2023"
 * ```
 */
export function formatDate(
  date: Date,
  format: 'short' | 'long' | 'iso' = 'short',
  locale: string = 'en-US'
): string {
  // Implementation
}
```

### **README Files**
```markdown
# Feature Name

Brief description of what this feature does.

## Overview

Detailed explanation of the feature's purpose and functionality.

## Usage

```typescript
// Code example showing how to use the feature
import { FeatureName } from './feature-name';

const result = FeatureName.doSomething();
```

## API Reference

### Functions

#### `functionName(param1, param2)`

Description of what the function does.

**Parameters:**
- `param1` (string): Description of parameter
- `param2` (number, optional): Description of optional parameter

**Returns:** Description of return value

## Examples

Practical examples of using the feature.

## Related

Links to related documentation or features.
```

---

## ✅ **Code Review Checklist**

### **Before Submitting PR**
- [ ] **Type Safety**: No `any` types, proper TypeScript usage
- [ ] **Performance**: Optimized queries, proper memoization
- [ ] **Security**: Input validation, proper error handling
- [ ] **Testing**: Unit tests for new functionality
- [ ] **Documentation**: JSDoc comments for public APIs
- [ ] **Accessibility**: Proper ARIA labels, keyboard navigation
- [ ] **Responsive**: Mobile-first design implementation
- [ ] **Error Handling**: Graceful error handling with user feedback

### **Code Quality**
- [ ] **Naming**: Clear, descriptive variable and function names
- [ ] **Structure**: Proper separation of concerns
- [ ] **Reusability**: Components and utilities are reusable
- [ ] **Consistency**: Follows established patterns
- [ ] **Comments**: Complex logic is well-documented
- [ ] **Imports**: Clean import statements, no unused imports
- [ ] **Exports**: Proper export patterns

---

## 🔧 **Tools & Configuration**

### **ESLint Configuration**
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### **Prettier Configuration**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

---

**Following these coding standards ensures that P-Core maintains high code quality, consistency, and maintainability as the project grows.**

---

*Last Updated: July 28, 2025*  
*Version: 2.0.0*  
*Review Schedule: Monthly*