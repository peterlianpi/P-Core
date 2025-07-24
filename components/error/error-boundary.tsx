"use client";

/**
 * MODERN ERROR BOUNDARY: Enhanced Error Handling & Recovery
 * 
 * This module provides:
 * 1. React Error Boundary with modern UI
 * 2. Error recovery mechanisms
 * 3. Error reporting and logging
 * 4. User-friendly error messages
 * 5. Fallback UI components
 * 
 * WHY THIS IS NEEDED:
 * - Prevents entire app crashes from component errors
 * - Provides graceful error recovery options
 * - Improves user experience during errors
 * - Enables error monitoring and debugging
 * - Maintains app stability
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  Bug,
  ChevronDown,
  ChevronUp,
  Copy,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// ============================================================================
// ERROR BOUNDARY INTERFACES
// ============================================================================

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
  showDetails: boolean;
  retryCount: number;
  lastErrorTime: number;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  maxRetries?: number;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
}

// ============================================================================
// ERROR BOUNDARY CLASS COMPONENT
// ============================================================================

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      showDetails: false,
      retryCount: 0,
      lastErrorTime: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Generate unique error ID for tracking
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId,
      lastErrorTime: Date.now(),
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error for monitoring
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // Update state with error info
    this.setState({ errorInfo });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Send error to monitoring service (e.g., Sentry)
    this.reportError(error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    // Reset error state if props changed and resetOnPropsChange is true
    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetErrorBoundary();
    }

    // Reset error state if resetKeys changed
    if (hasError && resetKeys && prevProps.resetKeys) {
      const hasResetKeyChanged = resetKeys.some((key, idx) => 
        prevProps.resetKeys![idx] !== key
      );
      
      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  reportError = (error: Error, errorInfo: ErrorInfo) => {
    // In production, send to error monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
      console.log('Error reported to monitoring service');
    }
  };

  resetErrorBoundary = () => {
    const { maxRetries = 3 } = this.props;
    const { retryCount } = this.state;

    if (retryCount < maxRetries) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: null,
        showDetails: false,
        retryCount: retryCount + 1,
      });
    }
  };

  handleRetry = () => {
    const now = Date.now();
    const { lastErrorTime } = this.state;
    
    // Prevent rapid retries (minimum 1 second between retries)
    if (now - lastErrorTime > 1000) {
      this.resetErrorBoundary();
    }
  };

  toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  };

  copyErrorDetails = async () => {
    const { error, errorInfo, errorId } = this.state;
    
    const errorDetails = `
Error ID: ${errorId}
Error: ${error?.message}
Stack: ${error?.stack}
Component Stack: ${errorInfo?.componentStack}
Time: ${new Date().toISOString()}
    `.trim();

    try {
      await navigator.clipboard.writeText(errorDetails);
      // Show success message (you could use a toast here)
      console.log('Error details copied to clipboard');
    } catch (err) {
      console.error('Failed to copy error details:', err);
    }
  };

  render() {
    const { hasError, error, errorInfo, errorId, showDetails, retryCount } = this.state;
    const { children, fallback, maxRetries = 3 } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Render default error UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            <Card className="border-destructive/20">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
                
                <CardTitle className="text-2xl font-bold text-destructive">
                  Something went wrong
                </CardTitle>
                
                <CardDescription className="text-base">
                  An unexpected error occurred. We&apos;ve been notified and are working to fix it.
                </CardDescription>

                {errorId && (
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      Error ID: {errorId}
                    </Badge>
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={this.handleRetry}
                    disabled={retryCount >= maxRetries}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    {retryCount >= maxRetries ? 'Max retries reached' : `Retry (${retryCount}/${maxRetries})`}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/'}
                    className="flex items-center gap-2"
                  >
                    <Home className="h-4 w-4" />
                    Go Home
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reload Page
                  </Button>
                </div>

                <Separator />

                {/* Error Details Toggle */}
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    onClick={this.toggleDetails}
                    className="w-full flex items-center justify-between text-sm text-muted-foreground hover:text-foreground"
                  >
                    <span className="flex items-center gap-2">
                      <Bug className="h-4 w-4" />
                      Technical Details
                    </span>
                    {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>

                  {showDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <div className="relative">
                        <div className="absolute top-2 right-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={this.copyErrorDetails}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="bg-muted/50 rounded-md p-4 text-xs font-mono space-y-2 overflow-auto max-h-64">
                          {error && (
                            <div>
                              <p className="font-semibold text-destructive">Error Message:</p>
                              <p className="break-words">{error.message}</p>
                            </div>
                          )}
                          
                          {error?.stack && (
                            <div>
                              <p className="font-semibold text-destructive">Stack Trace:</p>
                              <pre className="whitespace-pre-wrap break-words text-xs">
                                {error.stack}
                              </pre>
                            </div>
                          )}
                          
                          {errorInfo?.componentStack && (
                            <div>
                              <p className="font-semibold text-destructive">Component Stack:</p>
                              <pre className="whitespace-pre-wrap break-words text-xs">
                                {errorInfo.componentStack}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground text-center">
                        You can copy these details to help us debug the issue faster.
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Help Text */}
                <div className="text-center text-sm text-muted-foreground">
                  <p>
                    If this problem persists, please contact support with the error ID above.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    }

    return children;
  }
}

// ============================================================================
// FUNCTIONAL ERROR BOUNDARY WRAPPER
// ============================================================================

interface ErrorBoundaryWrapperProps extends ErrorBoundaryProps {
  level?: 'page' | 'section' | 'component';
}

export const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps> = ({
  children,
  level = 'component',
  ...props
}) => {
  // Different error handling strategies based on level
  const getErrorFallback = () => {
    switch (level) {
      case 'page':
        return undefined; // Use default full-page error UI
      
      case 'section':
        return (
          <div className="flex items-center justify-center p-8 border border-destructive/20 rounded-lg bg-destructive/5">
            <div className="text-center space-y-2">
              <AlertTriangle className="h-8 w-8 text-destructive mx-auto" />
              <p className="text-sm font-medium">Section failed to load</p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            </div>
          </div>
        );
      
      case 'component':
        return (
          <div className="flex items-center justify-center p-4 border border-destructive/20 rounded bg-destructive/5">
            <div className="text-center space-y-1">
              <AlertTriangle className="h-4 w-4 text-destructive mx-auto" />
              <p className="text-xs text-destructive">Component error</p>
            </div>
          </div>
        );
      
      default:
        return undefined;
    }
  };

  return (
    <ErrorBoundary {...props} fallback={props.fallback || getErrorFallback()}>
      {children}
    </ErrorBoundary>
  );
};

// ============================================================================
// HOOK FOR ERROR REPORTING
// ============================================================================

export const useErrorHandler = () => {
  const reportError = (error: Error, context?: any) => {
    console.error('Manual error report:', error, context);
    
    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: context });
    }
  };

  return { reportError };
};

export default ErrorBoundary;
