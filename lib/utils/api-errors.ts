import { Context } from 'hono';
import { ZodError } from 'zod';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// For API routes with Hono context
export function handleApiError(c: Context | null, error: unknown, defaultMessage?: string): Response | { error: string; code?: string } {
  console.error('API Error:', error);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const message = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
    if (c) {
      return c.json({
        error: 'Validation failed',
        details: message,
        code: 'VALIDATION_ERROR',
      }, 400);
    }
    return { error: 'Validation failed', code: 'VALIDATION_ERROR' };
  }

  if (error instanceof ApiError) {
    if (c) {
      return c.json({
        error: error.message,
        code: error.code || 'API_ERROR',
      }, error.statusCode);
    }
    return { error: error.message, code: error.code || 'API_ERROR' };
  }

  if (error instanceof Error) {
    // Database/Prisma specific errors
    if (error.message.includes('Unique constraint')) {
      const message = 'A record with this information already exists';
      if (c) {
        return c.json({
          error: message,
          code: 'DUPLICATE_RECORD',
        }, 400);
      }
      return { error: message, code: 'DUPLICATE_RECORD' };
    }

    if (error.message.includes('Foreign key constraint')) {
      const message = 'Cannot perform this action due to related records';
      if (c) {
        return c.json({
          error: message,
          code: 'RELATED_RECORDS_EXIST',
        }, 400);
      }
      return { error: message, code: 'RELATED_RECORDS_EXIST' };
    }

    if (error.message.includes('Record to update not found')) {
      const message = 'Record not found';
      if (c) {
        return c.json({
          error: message,
          code: 'NOT_FOUND',
        }, 404);
      }
      return { error: message, code: 'NOT_FOUND' };
    }

    // Development: Show detailed error messages
    if (process.env.NODE_ENV === 'development') {
      if (c) {
        return c.json({
          error: error.message,
          code: 'INTERNAL_ERROR',
          stack: error.stack,
        }, 500);
      }
      return { error: error.message, code: 'INTERNAL_ERROR' };
    }
  }

  // Production: Generic error message
  const message = defaultMessage || 'An unexpected error occurred';
  if (c) {
    return c.json({
      error: message,
      code: 'INTERNAL_ERROR',
    }, 500);
  }
  return { error: message, code: 'INTERNAL_ERROR' };
}

// For server actions without Hono context
export function handleError(error: unknown, defaultMessage?: string): { error: string; code?: string } {
  return handleApiError(null, error, defaultMessage) as { error: string; code?: string };
}
