# Code Patterns & Best Practices

*Last Updated: January 26, 2025*

## 🎯 **Coding Standards for P-Core**

This document establishes consistent patterns to improve code quality, maintainability, and team productivity.

---

## 🏗️ **API Route Patterns**

### **✅ Recommended Hono API Pattern**
```typescript
// /app/api/[[...route]]/students.ts
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { 
  organizationSecurityMiddleware,
  requirePermission,
  getOrganizationContext 
} from "@/lib/security/tenant";

const students = new Hono()
  // Apply security middleware to all routes
  .use("*", organizationSecurityMiddleware)

  // GET /api/students - List students with pagination
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        page: z.string().optional().default("1"),
        limit: z.string().optional().default("20"),
        search: z.string().optional(),
        isActive: z.string().optional().default("true")
      })
    ),
    requirePermission("read:students"),
    async (c) => {
      try {
        const { page, limit, search, isActive } = c.req.valid("query");
        const orgContext = getOrganizationContext(c);
        
        const where = {
          isActive: isActive === "true",
          ...(search && {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } }
            ]
          })
        };

        const [students, total] = await Promise.all([
          prisma.student.findMany({
            where,
            skip: (parseInt(page) - 1) * parseInt(limit),
            take: parseInt(limit),
            orderBy: { createdAt: "desc" }
          }),
          prisma.student.count({ where })
        ]);

        return c.json({
          data: students,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit))
          }
        });
      } catch (error) {
        console.error("Failed to fetch students:", error);
        return c.json({ error: "Failed to fetch students" }, 500);
      }
    }
  )

  // POST /api/students - Create student
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string().min(1).max(100),
        email: z.string().email().max(255),
        phone: z.string().optional(),
        dateOfBirth: z.string().optional()
      })
    ),
    requirePermission("write:students"),
    async (c) => {
      try {
        const data = c.req.valid("json");
        const orgContext = getOrganizationContext(c);

        const student = await prisma.student.create({
          data: {
            ...data,
            organizationId: orgContext.organizationId,
            createdBy: orgContext.userId
          }
        });

        return c.json({ data: student }, 201);
      } catch (error) {
        if (error.code === "P2002") {
          return c.json({ error: "Student with this email already exists" }, 409);
        }
        console.error("Failed to create student:", error);
        return c.json({ error: "Failed to create student" }, 500);
      }
    }
  );

export default students;
```

### **Key Pattern Elements:**
1. **Security First:** Always apply security middleware
2. **Validation:** Use Zod for all inputs
3. **Permissions:** Check permissions at route level
4. **Pagination:** Include pagination for list endpoints
5. **Error Handling:** Consistent error responses
6. **TypeScript:** Full type safety throughout

---

## 🎣 **React Query Hook Patterns**

### **✅ Recommended Data Fetching Pattern**
```typescript
// /features/students/api/use-students.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
}

export interface StudentsParams {
  orgId: string;
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

// Query Keys Factory
export const studentKeys = {
  all: ["students"] as const,
  lists: () => [...studentKeys.all, "list"] as const,
  list: (params: StudentsParams) => [...studentKeys.lists(), params] as const,
  details: () => [...studentKeys.all, "detail"] as const,
  detail: (id: string) => [...studentKeys.details(), id] as const,
};

// API Functions
async function fetchStudents(params: StudentsParams) {
  const queryString = new URLSearchParams({
    orgId: params.orgId,
    page: params.page?.toString() || "1",
    limit: params.limit?.toString() || "20",
    ...(params.search && { search: params.search }),
    ...(params.isActive !== undefined && { isActive: params.isActive.toString() })
  });

  const response = await fetch(`/api/students?${queryString}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  
  return response.json();
}

async function createStudent(data: Omit<Student, "id" | "createdAt">) {
  const response = await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create student");
  }

  return response.json();
}

// Hooks
export function useStudents(params: StudentsParams) {
  return useQuery({
    queryKey: studentKeys.list(params),
    queryFn: () => fetchStudents(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!params.orgId,
    select: (data) => ({
      students: data.data,
      pagination: data.pagination
    })
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStudent,
    onSuccess: (data, variables) => {
      // Invalidate and refetch students list
      queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
      
      toast.success(`Student ${variables.name} created successfully`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create student");
    }
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: studentKeys.detail(id),
    queryFn: () => fetchStudent(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000 // 10 minutes for details
  });
}
```

---

## 🧩 **Component Patterns**

### **✅ Recommended Component Structure**
```typescript
// /components/students/student-list.tsx
"use client";

import { useState } from "react";
import { useStudents, useCreateStudent } from "@/features/students/api/use-students";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { LoadingSpinner } from "@/components/ui/loading";
import { EmptyState } from "@/components/ui/empty-state";

// Props interface with clear naming
interface StudentListProps {
  organizationId: string;
  canCreate?: boolean;
  canEdit?: boolean;
  onStudentSelect?: (student: Student) => void;
  className?: string;
}

// Main component with descriptive name
export function StudentList({
  organizationId,
  canCreate = false,
  canEdit = false,
  onStudentSelect,
  className
}: StudentListProps) {
  // State management
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Data fetching
  const {
    data,
    isLoading,
    error,
    refetch
  } = useStudents({
    orgId: organizationId,
    search: search || undefined,
    page
  });

  const createStudent = useCreateStudent();

  // Event handlers
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1); // Reset to first page
  };

  const handleCreateStudent = async (studentData: CreateStudentData) => {
    await createStudent.mutateAsync(studentData);
    refetch(); // Refresh the list
  };

  // Loading state
  if (isLoading) {
    return <LoadingSpinner className="h-32" />;
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load students</p>
        <Button onClick={() => refetch()} variant="outline" className="mt-2">
          Try Again
        </Button>
      </div>
    );
  }

  // Empty state
  if (!data?.students?.length) {
    return (
      <EmptyState
        title="No students found"
        description={search ? "Try adjusting your search" : "Add your first student to get started"}
        action={canCreate ? (
          <Button onClick={() => setShowCreateModal(true)}>
            Add Student
          </Button>
        ) : undefined}
      />
    );
  }

  // Main render
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header with search and actions */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Search students..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        
        {canCreate && (
          <Button onClick={() => setShowCreateModal(true)}>
            Add Student
          </Button>
        )}
      </div>

      {/* Data table */}
      <DataTable
        data={data.students}
        columns={studentColumns}
        pagination={data.pagination}
        onPageChange={setPage}
        onRowClick={onStudentSelect}
      />
    </div>
  );
}

// Column definitions (separate for reusability)
const studentColumns = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name"
  },
  {
    id: "email", 
    header: "Email",
    accessorKey: "email"
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "default" : "secondary"}>
        {row.original.isActive ? "Active" : "Inactive"}
      </Badge>
    )
  }
];
```

### **Component Best Practices:**
1. **Clear Props Interface:** Well-defined TypeScript interfaces
2. **State Management:** Minimal local state, leverage React Query
3. **Error Handling:** Loading, error, and empty states
4. **Accessibility:** Proper ARIA labels and keyboard navigation
5. **Reusability:** Configurable through props

---

## 🔒 **Security Patterns**

### **✅ Route Protection Pattern**
```typescript
// Middleware approach
export function requireRole(minRole: string) {
  return async (c: Context, next: () => Promise<void>) => {
    const orgContext = getOrganizationContext(c);
    
    if (!hasRoleLevel(orgContext.role, minRole)) {
      return c.json(
        { 
          error: `Minimum role required: ${minRole}`,
          code: "INSUFFICIENT_ROLE" 
        },
        403
      );
    }

    await next();
  };
}

// Usage in routes
app.delete("/students/:id", 
  requireRole("ADMIN"),
  async (c) => { /* handler */ }
);
```

### **✅ Input Validation Pattern**
```typescript
// Comprehensive validation schemas
const CreateStudentSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(100, "Name too long")
    .regex(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed"),
  
  email: z.string()
    .email("Invalid email format")
    .max(255, "Email too long")
    .toLowerCase(),
    
  phone: z.string()
    .regex(/^\+?[\d\s-()]+$/, "Invalid phone format")
    .optional(),
    
  dateOfBirth: z.string()
    .datetime("Invalid date format")
    .optional()
    .refine(date => {
      if (!date) return true;
      const age = new Date().getFullYear() - new Date(date).getFullYear();
      return age >= 13 && age <= 100;
    }, "Invalid age range")
});
```

---

## 🗄️ **Database Patterns**

### **✅ Prisma Query Patterns**
```typescript
// Efficient queries with proper relations
async function getStudentsWithCourses(orgId: string, limit: number = 20) {
  return prisma.student.findMany({
    where: {
      isActive: true,
      // organizationId filter handled by RLS
    },
    include: {
      enrollments: {
        where: { status: "ACTIVE" },
        include: {
          course: {
            select: { id: true, name: true, code: true }
          }
        }
      },
      _count: {
        select: { enrollments: true }
      }
    },
    take: limit,
    orderBy: { createdAt: "desc" }
  });
}

// Transaction pattern for complex operations
async function enrollStudentInCourse(studentId: string, courseId: string) {
  return prisma.$transaction(async (tx) => {
    // Check enrollment limit
    const courseCapacity = await tx.course.findUnique({
      where: { id: courseId },
      select: { maxStudents: true, _count: { select: { enrollments: true } } }
    });

    if (courseCapacity._count.enrollments >= courseCapacity.maxStudents) {
      throw new Error("Course is full");
    }

    // Create enrollment
    const enrollment = await tx.studentCourse.create({
      data: {
        studentId,
        courseId,
        status: "ENROLLED",
        enrolledAt: new Date()
      }
    });

    // Log the action
    await tx.updateLog.create({
      data: {
        name: "Student Enrollment",
        message: `Student enrolled in course`,
        type: "INFO",
        metadata: { studentId, courseId }
      }
    });

    return enrollment;
  });
}
```

---

## 🚨 **Error Handling Patterns**

### **✅ Centralized Error Handling**
```typescript
// Custom error classes
export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`);
    this.name = "NotFoundError";
  }
}

// Error handler middleware
export async function handleApiError(c: Context, error: unknown) {
  console.error("API Error:", error);

  if (error instanceof ValidationError) {
    return c.json({
      error: error.message,
      code: "VALIDATION_ERROR",
      field: error.field
    }, 400);
  }

  if (error instanceof NotFoundError) {
    return c.json({
      error: error.message,
      code: "NOT_FOUND"
    }, 404);
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return c.json({
        error: "Resource already exists",
        code: "DUPLICATE_ERROR"
      }, 409);
    }
  }

  // Generic error
  return c.json({
    error: "Internal server error",
    code: "INTERNAL_ERROR"
  }, 500);
}
```

---

## 📝 **Documentation Patterns**

### **✅ JSDoc Comments**
```typescript
/**
 * Creates a new student in the organization
 * 
 * @param data - Student creation data
 * @param organizationId - The organization ID
 * @returns Promise resolving to created student
 * @throws {ValidationError} When input data is invalid
 * @throws {NotFoundError} When organization doesn't exist
 * 
 * @example
 * ```typescript
 * const student = await createStudent({
 *   name: "John Doe",
 *   email: "john@example.com"
 * }, "org-123");
 * ```
 */
export async function createStudent(
  data: CreateStudentData,
  organizationId: string
): Promise<Student> {
  // Implementation
}
```

### **✅ README Structure for Features**
```markdown
# Feature Name

Brief description of what this feature does.

## 📁 Structure
- `api/` - React Query hooks and API functions
- `components/` - React components
- `types/` - TypeScript type definitions

## 🚀 Usage
```typescript
// Example usage
```

## 🔒 Permissions
- `read:feature` - View feature data
- `write:feature` - Create/update feature data

## 🧪 Testing
```bash
npm run test features/feature-name
```
```

---

## 🎯 **Naming Conventions**

### **Files and Directories**
- `kebab-case` for files and directories
- `PascalCase` for React components
- `camelCase` for functions and variables

### **API Routes**
- RESTful naming: `/api/students`, `/api/students/:id`
- Use HTTP verbs correctly: GET, POST, PUT, DELETE
- Use plural nouns for collections

### **React Components**
- Descriptive names: `StudentList`, `CreateStudentModal`
- Avoid generic names: ~~`List`~~, ~~`Modal`~~

### **Database Tables**
- Plural names: `students`, `courses`, `enrollments`
- Clear relationships: `student_courses` for join tables

---

*Next Update: February 2025*
