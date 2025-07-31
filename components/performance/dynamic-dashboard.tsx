/**
 * Dynamic Dashboard Component Loader
 * 
 * Optimizes compilation time by lazy-loading heavy dashboard components
 * Only loads the charts and analytics when actually needed
 */

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Dashboard loading skeleton
const DashboardSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-32" />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Skeleton className="h-96" />
      <Skeleton className="h-96" />
    </div>
  </div>
);

// Chart loading skeleton
const ChartSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-64 w-full" />
  </div>
);

// Dynamically import heavy components with loading states
export const DynamicTransactionsDashboard = dynamic(
  () => import('@/features/school-management/features/transactions/components/transactions-dashboard'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false // Disable SSR for heavy components to speed up initial load
  }
);

export const DynamicTeachersDashboard = dynamic(
  () => import('@/features/school-management/features/teachers/components/teachers-dashboard'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false
  }
);

export const DynamicSchoolAnalytics = dynamic(
  () => import('@/features/school-management/components/dashboard/school-analytics-dashboard'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false
  }
);

// Recharts components (heavy charting library)
export const DynamicAreaChart = dynamic(
  () => import('recharts').then(mod => ({ default: mod.AreaChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false
  }
);

export const DynamicBarChart = dynamic(
  () => import('recharts').then(mod => ({ default: mod.BarChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false
  }
);

export const DynamicLineChart = dynamic(
  () => import('recharts').then(mod => ({ default: mod.LineChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false
  }
);

export const DynamicPieChart = dynamic(
  () => import('recharts').then(mod => ({ default: mod.PieChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false
  }
);

// Organization management components
export const DynamicOrganizationUserManagement = dynamic(
  () => import('@/features/organization-management/components/organization-user-management'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false
  }
);

// Wrapper component with proper error boundary
export function DynamicDashboardWrapper({ 
  children, 
  fallback = <DashboardSkeleton /> 
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}

export default DynamicDashboardWrapper;
