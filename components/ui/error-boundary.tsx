"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  className?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={cn("flex items-center justify-center min-h-[400px] p-4", this.props.className)}>
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <AlertTriangle className="h-12 w-12 text-red-500" />
              </div>
              <CardTitle className="text-red-700">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                <p>We&apos;re sorry, but something unexpected happened.</p>
                <p>Please try one of the options below.</p>
              </div>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="bg-red-50 border border-red-200 rounded p-3 text-xs">
                  <summary className="cursor-pointer font-medium text-red-700 mb-2">
                    Error Details (Development Only)
                  </summary>
                  <div className="space-y-2 text-red-600">
                    <div>
                      <strong>Error:</strong> {this.state.error.message}
                    </div>
                    <div>
                      <strong>Stack:</strong>
                      <pre className="whitespace-pre-wrap mt-1 text-xs">
                        {this.state.error.stack}
                      </pre>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="whitespace-pre-wrap mt-1 text-xs">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              <div className="flex flex-col space-y-2">
                <Button onClick={this.handleReset} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button onClick={this.handleReload} variant="outline" className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
                <Button onClick={this.handleGoHome} variant="ghost" className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                <p>If the problem persists, please contact support.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary for functional components
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const handleError = React.useCallback((error: Error) => {
    console.error("Error caught by useErrorHandler:", error);
    setError(error);
  }, []);

  // Throw error to be caught by error boundary
  if (error) {
    throw error;
  }

  return { handleError, resetError };
};

// Simple error display component
export const ErrorDisplay: React.FC<{
  error?: Error;
  title?: string;
  description?: string;
  onRetry?: () => void;
  onReset?: () => void;
  className?: string;
}> = ({
  error,
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
  onReset,
  className,
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-red-700 mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-md">{description}</p>
      
      {process.env.NODE_ENV === "development" && error && (
        <details className="mb-4 w-full max-w-md">
          <summary className="cursor-pointer text-sm text-red-600 mb-2">
            <Bug className="w-4 h-4 inline mr-1" />
            Error Details (Dev Only)
          </summary>
          <div className="text-left bg-red-50 border border-red-200 rounded p-3 text-xs text-red-600">
            <div className="mb-2">
              <strong>Message:</strong> {error.message}
            </div>
            <div>
              <strong>Stack:</strong>
              <pre className="whitespace-pre-wrap mt-1 text-xs max-h-32 overflow-y-auto">
                {error.stack}
              </pre>
            </div>
          </div>
        </details>
      )}

      <div className="flex gap-2">
        {onRetry && (
          <Button onClick={onRetry} size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
        {onReset && (
          <Button onClick={onReset} variant="outline" size="sm">
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};

// Network error specific component
export const NetworkErrorDisplay: React.FC<{
  onRetry?: () => void;
  className?: string;
}> = ({ onRetry, className }) => {
  return (
    <ErrorDisplay
      title="Network Error"
      description="Unable to connect to the server. Please check your internet connection and try again."
      onRetry={onRetry}
      className={className}
    />
  );
};

// Generic async error boundary wrapper
export const AsyncErrorBoundary: React.FC<{
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
  onError?: (error: Error) => void;
}> = ({ children, fallback, onError }) => {
  const [error, setError] = React.useState<Error | null>(null);
  const [retryCount, setRetryCount] = React.useState(0);

  const resetError = React.useCallback(() => {
    setError(null);
    setRetryCount(count => count + 1);
  }, []);

  React.useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  const handleError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  if (error) {
    if (fallback) {
      return <>{fallback(error, resetError)}</>;
    }

    return (
      <ErrorDisplay
        error={error}
        onRetry={resetError}
        title="Loading Error"
        description="Failed to load content. Please try again."
      />
    );
  }

  return (
    <ErrorBoundary onError={handleError}>
      <React.Suspense fallback={<div>Loading...</div>}>
        {React.cloneElement(children as React.ReactElement, { key: retryCount })}
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default ErrorBoundary;
