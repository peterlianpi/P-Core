/**
 * MODERN LOADING COMPONENTS: Performance Optimized Loading States
 * 
 * This module provides:
 * 1. Skeleton components for different content types
 * 2. Animated loading indicators
 * 3. Suspense-friendly loading states
 * 4. Accessibility compliant loading messages
 * 5. Performance optimized animations
 * 
 * WHY THIS IS NEEDED:
 * - Improves perceived performance with skeleton loading
 * - Provides consistent loading states across the app
 * - Reduces layout shift during content loading
 * - Enhances user experience with smooth animations
 * - Maintains accessibility standards
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// BASIC LOADING SPINNER
// ============================================================================

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className,
  label = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  return (
    <div className="flex items-center justify-center space-x-2" role="status" aria-label={label}>
      <Loader2 className={cn('animate-spin text-primary', sizeClasses[size], className)} />
      <span className="sr-only">{label}</span>
    </div>
  );
};

// ============================================================================
// SKELETON COMPONENTS
// ============================================================================

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, animate = true }) => (
  <div 
    className={cn(
      'rounded-md bg-muted',
      animate && 'animate-pulse',
      className
    )}
    aria-hidden="true"
  />
);

// Card skeleton for loading cards
export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('space-y-4 p-6 border rounded-lg', className)}>
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-4/6" />
    </div>
  </div>
);

// Table skeleton for loading tables
export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({ 
  rows = 5, 
  columns = 4 
}) => (
  <div className="space-y-4">
    {/* Header skeleton */}
    <div className="flex space-x-4">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className="h-6 flex-1" />
      ))}
    </div>
    
    {/* Row skeletons */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex space-x-4">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} className="h-8 flex-1" />
        ))}
      </div>
    ))}
  </div>
);

// ============================================================================
// ANIMATED LOADING STATES
// ============================================================================

interface LoadingDotsProps {
  className?: string;
  dotClassName?: string;
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({ className, dotClassName }) => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -10 },
  };

  return (
    <div className={cn('flex space-x-1', className)} aria-label="Loading">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn('w-2 h-2 bg-primary rounded-full', dotClassName)}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.2,
          }}
        />
      ))}
      <span className="sr-only">Loading</span>
    </div>
  );
};

// ============================================================================
// PROGRESS INDICATORS
// ============================================================================

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  showLabel?: boolean;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  className, 
  showLabel = true,
  label = 'Progress'
}) => (
  <div className={cn('w-full space-y-2', className)}>
    {showLabel && (
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{label}</span>
        <span>{Math.round(progress)}%</span>
      </div>
    )}
    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
      <motion.div
        className="h-full bg-primary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  </div>
);

// ============================================================================
// FULL PAGE LOADING
// ============================================================================

interface FullPageLoadingProps {
  message?: string;
  showProgress?: boolean;
  progress?: number;
}

export const FullPageLoading: React.FC<FullPageLoadingProps> = ({ 
  message = 'Loading...', 
  showProgress = false,
  progress = 0
}) => (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="text-center space-y-4 p-8">
      <LoadingSpinner size="xl" />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{message}</h3>
        {showProgress && (
          <ProgressBar 
            progress={progress} 
            className="w-64" 
            showLabel={false}
          />
        )}
      </div>
    </div>
  </div>
);

// ============================================================================
// LAZY LOADING WRAPPER
// ============================================================================

interface LazyLoadingProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export const LazyLoadingWrapper: React.FC<LazyLoadingProps> = ({ 
  children, 
  fallback,
  className 
}) => (
  <React.Suspense 
    fallback={
      fallback || (
        <div className={cn('flex items-center justify-center p-8', className)}>
          <LoadingSpinner />
        </div>
      )
    }
  >
    {children}
  </React.Suspense>
);

// ============================================================================
// REFRESH LOADING BUTTON
// ============================================================================

interface RefreshButtonProps {
  onClick: () => void;
  isLoading: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({ 
  onClick, 
  isLoading, 
  children = 'Refresh',
  className,
  disabled = false
}) => (
  <button
    onClick={onClick}
    disabled={isLoading || disabled}
    className={cn(
      'inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md',
      'bg-primary text-primary-foreground hover:bg-primary/90',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'transition-all duration-200',
      className
    )}
  >
    <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
    <span>{children}</span>
  </button>
);

// ============================================================================
// DATA LOADING STATES
// ============================================================================

interface DataLoadingStateProps {
  isLoading: boolean;
  error?: string | null;
  isEmpty?: boolean;
  children?: React.ReactNode;
  loadingSkeleton?: React.ReactNode;
  emptyState?: React.ReactNode;
  errorState?: React.ReactNode;
  onRetry?: () => void;
}

export const DataLoadingState: React.FC<DataLoadingStateProps> = ({
  isLoading,
  error,
  isEmpty = false,
  children,
  loadingSkeleton,
  emptyState,
  errorState,
  onRetry
}) => {
  if (isLoading) {
    return loadingSkeleton || <CardSkeleton />;
  }

  if (error) {
    return errorState || (
      <div className="text-center p-8 space-y-4">
        <p className="text-destructive">{error}</p>
        {onRetry && (
          <RefreshButton onClick={onRetry} isLoading={false}>
            Try Again
          </RefreshButton>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return emptyState || (
      <div className="text-center p-8 text-muted-foreground">
        <p>No data available</p>
      </div>
    );
  }

  return <>{children}</>;
};

// Export all components
export default {
  LoadingSpinner,
  Skeleton,
  CardSkeleton,
  TableSkeleton,
  LoadingDots,
  ProgressBar,
  FullPageLoading,
  LazyLoadingWrapper,
  RefreshButton,
  DataLoadingState,
};
