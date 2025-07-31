"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { AccessDeniedPage } from "@/components/ui/access-denied-page";

interface UseAccessControlOptions {
  requiredRole?: string;
  requiredPermissions?: string[];
  fallback?: React.ReactNode;
  showAccessDenied?: boolean;
}

interface AccessControlResult {
  hasAccess: boolean;
  loading: boolean;
  user: any;
  renderContent: (children: React.ReactNode) => React.ReactNode;
  AccessDeniedComponent: React.ComponentType<any>;
}

export function useAccessControl(options: UseAccessControlOptions = {}): AccessControlResult {
  const { data: session, status } = useSession();
  const {
    requiredRole,
    requiredPermissions = [],
    fallback,
    showAccessDenied = true,
  } = options;

  const loading = status === "loading";
  const user = session?.user;

  // Check if user has required role
  const hasRequiredRole = !requiredRole || (user?.role && 
    (user.role === requiredRole || 
     user.role === "Super Admin" || // Super Admin has access to everything
     (requiredRole === "Viewer" && ["Editor", "Admin"].includes(user.role)) ||
     (requiredRole === "Editor" && user.role === "Admin")
    )
  );

  // Check if user has required permissions
  const hasRequiredPermissions = requiredPermissions.length === 0 || 
    (user?.permissions && requiredPermissions.every(permission => 
      user.permissions.includes(permission)
    ));

  const hasAccess = !!user && hasRequiredRole && hasRequiredPermissions;

  const AccessDeniedComponent = React.useMemo(() => {
    return function AccessDenied(props: any) {
      return (
        <AccessDeniedPage
          requiredRole={requiredRole}
          currentRole={user?.role}
          contactEmail="admin@p-core.com"
          {...props}
        />
      );
    };
  }, [requiredRole, user?.role]);

  const renderContent = React.useCallback((children: React.ReactNode) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (!user) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <h2 className="text-2xl font-semibold">Authentication Required</h2>
          <p className="text-muted-foreground">Please sign in to access this content.</p>
        </div>
      );
    }

    if (!hasAccess) {
      if (fallback) {
        return fallback;
      }
      
      if (showAccessDenied) {
        return <AccessDeniedComponent />;
      }
      
      return null;
    }

    return children;
  }, [loading, user, hasAccess, fallback, showAccessDenied, AccessDeniedComponent]);

  return {
    hasAccess,
    loading,
    user,
    renderContent,
    AccessDeniedComponent,
  };
}

// HOC for protecting components
export function withAccessControl<P extends object>(
  Component: React.ComponentType<P>,
  options: UseAccessControlOptions = {}
) {
  return function ProtectedComponent(props: P) {
    const { renderContent } = useAccessControl(options);
    
    return renderContent(<Component {...props} />);
  };
}

// Component wrapper for protecting routes
export function ProtectedRoute({
  children,
  ...options
}: UseAccessControlOptions & { children: React.ReactNode }) {
  const { renderContent } = useAccessControl(options);
  return renderContent(children);
}

// Role-based component rendering
export function RoleGuard({
  children,
  roles,
  fallback,
}: {
  children: React.ReactNode;
  roles: string[];
  fallback?: React.ReactNode;
}) {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  const hasAccess = userRole && (
    roles.includes(userRole) ||
    userRole === "Super Admin"
  );

  if (hasAccess) {
    return <>{children}</>;
  }

  return <>{fallback || null}</>;
}

// Permission-based component rendering
export function PermissionGuard({
  children,
  permissions,
  fallback,
}: {
  children: React.ReactNode;
  permissions: string[];
  fallback?: React.ReactNode;
}) {
  const { data: session } = useSession();
  const userPermissions = session?.user?.permissions || [];

  const hasAccess = permissions.every(permission => 
    userPermissions.includes(permission)
  );

  if (hasAccess) {
    return <>{children}</>;
  }

  return <>{fallback || null}</>;
}
