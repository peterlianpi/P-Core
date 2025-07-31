/**
 * SECURITY & MONITORING: Enhanced Error Handling System
 * 
 * This module provides secure error handling that:
 * 1. Prevents sensitive information leakage in error messages
 * 2. Provides structured logging for security monitoring
 * 3. Standardizes error responses across the API
 * 4. Enables proper error tracking and alerting
 * 
 * WHY THIS IS IMPORTANT:
 * - Prevents PII and sensitive data from being exposed in logs
 * - Provides consistent error format for client applications
 * - Enables security monitoring and incident response
 * - Improves debugging while maintaining security
 */

import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

/**
 * Standard error response format
 * Consistent structure across all API endpoints
 */
interface ErrorResponse {
  error: string;
  code: string;
  timestamp: string;
  requestId?: string;
  details?: any;
}

/**
 * Error severity levels for monitoring and alerting
 */
enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

/**
 * SECURITY: Sanitize error messages to prevent information disclosure
 * 
 * This function removes sensitive information from error messages that could
 * help attackers understand the system architecture or access patterns.
 * 
 * @param error - Original error object
 * @returns Sanitized error message safe for client consumption
 */
function sanitizeErrorMessage(error: unknown): string {
  let message = 'An unexpected error occurred';

  if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string') {
    message = (error as any).message;
  }

  // Remove sensitive patterns that could reveal system information
  const sanitizedMessage = message
    // Remove file paths that could reveal system structure
    .replace(/\/[a-zA-Z0-9_\-\.\/]+\.(ts|js|tsx|jsx)/g, '[file]')
    // Remove database connection strings
    .replace(/postgresql:\/\/[^\/\s]+/g, '[database]')
    // Remove API keys and tokens
    .replace(/[a-f0-9]{32,}/gi, '[token]')
    // Remove email addresses (except in validation errors)
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[email]')
    // Remove IP addresses
    .replace(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g, '[ip]');

  return sanitizedMessage;
}

/**
 * MONITORING: Enhanced logging with security context
 * 
 * Logs errors with appropriate detail level based on environment
 * and includes security-relevant context for monitoring.
 * 
 * @param error - Error object to log
 * @param context - Request context for additional info
 * @param severity - Error severity level
 */
function logError(error: unknown, context?: any, severity: ErrorSeverity = ErrorSeverity.MEDIUM) {
  const timestamp = new Date().toISOString();
  const requestId = context?.get?.('requestId') || 'unknown';
  const userId = context?.get?.('validatedUser')?.userId || 'anonymous';
  const orgId = context?.get?.('validatedUser')?.orgId || 'unknown';
  const method = context?.req?.method || 'unknown';
  const url = context?.req?.url || 'unknown';
  const userAgent = context?.req?.header?.('user-agent') || 'unknown';

  // Helper function to safely get error properties
  function getErrorProperty<T extends string>(prop: T, defaultValue: string): string {
    if (typeof error === 'object' && error !== null && prop in error && typeof (error as any)[prop] === 'string') {
      return (error as any)[prop];
    }
    return defaultValue;
  }

  // Create structured log entry for monitoring systems
  const logEntry = {
    timestamp,
    severity,
    requestId,
    userId,
    orgId,
    method,
    url,
    userAgent,
    error: {
      message: getErrorProperty('message', 'Unknown error'),
      stack: process.env.NODE_ENV === 'development' && typeof error === 'object' && error !== null && 'stack' in error ? (error as any).stack : undefined,
      code: getErrorProperty('code', 'UNKNOWN_ERROR'),
      name: getErrorProperty('name', 'Error')
    }
  };

  // Log with appropriate level based on severity
  switch (severity) {
    case ErrorSeverity.CRITICAL:
      console.error('🚨 CRITICAL ERROR:', JSON.stringify(logEntry, null, 2));
      break;
    case ErrorSeverity.HIGH:
      console.error('❌ HIGH SEVERITY ERROR:', JSON.stringify(logEntry, null, 2));
      break;
    case ErrorSeverity.MEDIUM:
      console.warn('⚠️  MEDIUM SEVERITY ERROR:', JSON.stringify(logEntry, null, 2));
      break;
    case ErrorSeverity.LOW:
      console.info('ℹ️  LOW SEVERITY ERROR:', JSON.stringify(logEntry, null, 2));
      break;
  }

  // TODO: Send critical errors to monitoring service (Sentry, DataDog, etc.)
  if (severity === ErrorSeverity.CRITICAL) {
    // await sendToMonitoringService(logEntry);
  }
}

/**
 * SECURITY: Standard error response handler
 * 
 * Creates consistent, secure error responses that don't leak sensitive information
 * while providing enough detail for debugging in development environments.
 * 
 * @param c - Hono context object
 * @param error - Error object or message
 * @param statusCode - HTTP status code (default: 500)
 * @param errorCode - Application-specific error code
 * @param severity - Error severity for logging
 * @returns JSON error response
 */
export function handleError(
  c: Context,
  error: unknown,
  statusCode: number = 500,
  errorCode: string = 'INTERNAL_ERROR',
  severity: ErrorSeverity = ErrorSeverity.MEDIUM
) {
  // Log error with context for monitoring
  logError(error, c, severity);

  // Create sanitized error response
  const errorResponse: ErrorResponse = {
    error: sanitizeErrorMessage(error),
    code: errorCode,
    timestamp: new Date().toISOString(),
    requestId: c.get('requestId') || undefined,
    // Include additional details only in development
    details: process.env.NODE_ENV === 'development' ? {
      originalMessage: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack?.split('\n').slice(0, 5) : undefined
    } : undefined
  };

  return c.json(errorResponse, statusCode as ContentfulStatusCode);
}

/**
 * VALIDATION: Handle validation errors specifically
 * 
 * Provides user-friendly error messages for validation failures
 * while maintaining security best practices.
 * 
 * @param c - Hono context object
 * @param validationError - Zod or other validation error
 * @returns JSON validation error response
 */
interface ValidationErrorWithIssues {
  issues?: unknown;
  details?: unknown;
}

export function handleValidationError(c: Context, validationError: unknown) {
  const errorMessage = 'Validation failed: Please check your input data';

  logError(validationError, c, ErrorSeverity.LOW);

  const hasIssues = (err: unknown): err is ValidationErrorWithIssues => {
    return typeof err === 'object' && err !== null && ('issues' in err || 'details' in err);
  };

  const errorResponse: ErrorResponse = {
    error: errorMessage,
    code: 'VALIDATION_ERROR',
    timestamp: new Date().toISOString(),
    requestId: c.get('requestId') || undefined,
    // Include validation details in development
    details: process.env.NODE_ENV === 'development' && hasIssues(validationError) ? {
      validationErrors: (validationError as ValidationErrorWithIssues).issues || (validationError as ValidationErrorWithIssues).details
    } : undefined
  };

  return c.json(errorResponse, 400);
}

/**
 * AUTHORIZATION: Handle authorization errors
 * 
 * Provides consistent responses for authorization failures
 * without revealing system information.
 * 
 * @param c - Hono context object
 * @param message - Optional custom message
 * @returns JSON authorization error response
 */
export function handleAuthorizationError(c: Context, message?: string) {
  const errorMessage = message || 'Access denied: Insufficient permissions';

  logError(new Error(errorMessage), c, ErrorSeverity.HIGH);

  const errorResponse: ErrorResponse = {
    error: errorMessage,
    code: 'AUTHORIZATION_ERROR',
    timestamp: new Date().toISOString(),
    requestId: c.get('requestId') || undefined
  };

  return c.json(errorResponse, 403);
}

/**
 * RATE LIMITING: Handle rate limit errors
 * 
 * Provides standardized rate limiting error responses
 * 
 * @param c - Hono context object
 * @param retryAfter - Seconds until client can retry
 * @returns JSON rate limit error response
 */
export function handleRateLimitError(c: Context, retryAfter?: number) {
  const errorMessage = 'Too many requests: Please slow down and try again later';

  logError(new Error(errorMessage), c, ErrorSeverity.MEDIUM);

  // Set retry-after header if provided
  if (retryAfter) {
    c.header('Retry-After', retryAfter.toString());
  }

  const errorResponse: ErrorResponse = {
    error: errorMessage,
    code: 'RATE_LIMIT_ERROR',
    timestamp: new Date().toISOString(),
    requestId: c.get('requestId') || undefined
  };

  return c.json(errorResponse, 429);
}

/**
 * DATABASE: Handle database-specific errors
 * 
 * Sanitizes database errors to prevent information disclosure
 * while providing useful feedback for development.
 * 
 * @param c - Hono context object
 * @param dbError - Database error object
 * @returns JSON database error response
 */
interface PrismaError {
  code?: string;
  message?: string;
}

export function handleDatabaseError(c: Context, dbError: unknown) {
  let errorMessage = 'Database operation failed';
  let errorCode = 'DATABASE_ERROR';
  let statusCode = 500;

  // Handle specific Prisma error types
  const prismaError = dbError as PrismaError;
  if (prismaError?.code === 'P2002') {
    errorMessage = 'A record with this information already exists';
    errorCode = 'DUPLICATE_ERROR';
    statusCode = 409;
  } else if (prismaError?.code === 'P2025') {
    errorMessage = 'The requested record was not found';
    errorCode = 'NOT_FOUND_ERROR';
    statusCode = 404;
  } else if (prismaError?.code === 'P2003') {
    errorMessage = 'This operation would violate a data constraint';
    errorCode = 'CONSTRAINT_ERROR';
    statusCode = 400;
  }

  logError(dbError, c, ErrorSeverity.HIGH);

  const hasPrismaProps = (err: unknown): err is PrismaError => {
    return typeof err === 'object' && err !== null && ('code' in err || 'message' in err);
  };

  const errorResponse: ErrorResponse = {
    error: errorMessage,
    code: errorCode,
    timestamp: new Date().toISOString(),
    requestId: c.get('requestId') || undefined,
    // Include Prisma error details in development
    details: process.env.NODE_ENV === 'development' && hasPrismaProps(dbError) ? {
      prismaCode: (dbError as PrismaError).code,
      prismaMessage: (dbError as PrismaError).message
    } : undefined
  };

  return c.json(errorResponse, statusCode as ContentfulStatusCode);
}

// Export error severity enum for use in other modules
export { ErrorSeverity };
