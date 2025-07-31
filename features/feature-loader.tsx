"use client";

import React, { Suspense, lazy, useMemo } from "react";
import { featureRegistry, hasFeaturePermission } from "./feature-registry";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useOrgData } from "./organization-management";
import { useData } from "@/providers/data-provider";

interface FeatureLoaderProps {
  featureId: string;
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  className?: string;
}

import { OrganizationRole } from "@/shared/types/organization-role";
// Utility to get the user's org role for the current org context
function useCurrentOrgRole() {
  const user = useCurrentUser();
  const {orgId}=useData()
  const { organizations } = useOrgData();

  // Find the user's membership in the current org
  const orgMembership = organizations?.find(
    (org) => org.organization.id === orgId && org.userId === user?.id
  );

  // Map string role to enum if needed
  const roleString = orgMembership?.role;
  const orgRole = roleString && typeof roleString === "string"
    ? OrganizationRole[roleString as keyof typeof OrganizationRole]
    : undefined;

  // Return the org role, or undefined if not found
  return orgRole;
}

// Feature permission wrapper
export function FeatureGuard({
  featureId,
  children,
  fallback = null,
}: {
  featureId: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const orgRole = useCurrentOrgRole();

  // Check if feature is enabled
  if (!featureRegistry.isEnabled(featureId)) {
    return <>{fallback}</>;
  }

  // Check user permissions
  if (orgRole && !hasFeaturePermission(featureId, orgRole)) {
    return (
      <Alert className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          You don't have permission to access this feature.
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
}

// Dynamic feature loader
export function FeatureLoader({
  featureId,
  children,
  fallback,
  errorFallback,
  className,
}: FeatureLoaderProps) {
  const orgRole = useCurrentOrgRole();

  // Create lazy component with error boundary
  const LazyFeature = useMemo(() => {
    if (!featureRegistry.isEnabled(featureId)) {
      return null;
    }

    return lazy(async () => {
      try {
        const feature = await featureRegistry.loadFeature(featureId);
        return { default: feature.default || feature };
      } catch (error) {
        console.error(`Failed to load feature ${featureId}:`, error);
        throw error;
      }
    });
  }, [featureId]);

  // Feature not enabled
  if (!LazyFeature) {
    return fallback ? <>{fallback}</> : null;
  }

  // Permission check
  if (orgRole && !hasFeaturePermission(featureId, orgRole)) {
    return (
      <Alert className={className}>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          You don't have permission to access this feature.
        </AlertDescription>
      </Alert>
    );
  }

  const defaultFallback = (
    <div className={className}>
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-32 w-full mb-4" />
      <Skeleton className="h-8 w-1/2" />
    </div>
  );

  const defaultErrorFallback = (
    <Alert className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Failed to load feature. Please try again later.
      </AlertDescription>
    </Alert>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <ErrorBoundary fallback={errorFallback || defaultErrorFallback}>
        <LazyFeature />
        {children}
      </ErrorBoundary>
    </Suspense>
  );
}

// Feature list component
export function EnabledFeaturesList({
  category,
}: {
  category?: "domain" | "system";
}) {
  const enabledFeatures = featureRegistry.getEnabledFeatures(category);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {category
          ? `${category.charAt(0).toUpperCase() + category.slice(1)} Features`
          : "All Features"}
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {enabledFeatures.map((feature) => (
          <div key={feature.id} className="p-4 border rounded-lg">
            <h4 className="font-medium">{feature.name}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {feature.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                v{feature.version}
              </span>
              {feature.requiredRole && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {feature.requiredRole}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Simple error boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Feature loading error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Utility hooks
export function useFeature(featureId: string) {
  const orgRole = useCurrentOrgRole();

  return {
    isEnabled: featureRegistry.isEnabled(featureId),
    hasPermission: orgRole ? hasFeaturePermission(featureId, orgRole) : false,
    feature: featureRegistry.getFeature(featureId),
    load: () => featureRegistry.loadFeature(featureId),
  };
}

export function useEnabledFeatures(category?: "domain" | "system") {
  return featureRegistry.getEnabledFeatures(category);
}
