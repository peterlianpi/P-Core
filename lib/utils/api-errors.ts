import { Context } from 'hono';

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

export function handleApiError(c: Context, error: unknown) {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return c.json({
      error: error.message,
      code: error.code || 'API_ERROR',
    }, error.statusCode);
  }

  if (error instanceof Error) {
    // Database/Prisma specific errors
    if (error.message.includes('Unique constraint')) {
      return c.json({
        error: 'A record with this information already exists',
        code: 'DUPLICATE_RECORD',
      }, 400);
    }

    if (error.message.includes('Foreign key constraint')) {
      return c.json({
        error: 'Cannot perform this action due to related records',
        code: 'RELATED_RECORDS_EXIST',
      }, 400);
    }

    if (error.message.includes('Record to update not found')) {
      return c.json({
        error: 'Record not found',
        code: 'NOT_FOUND',
      }, 404);
    }

    // Development: Show detailed error messages
    if (process.env.NODE_ENV === 'development') {
      return c.json({
        error: error.message,
        code: 'INTERNAL_ERROR',
        stack: error.stack,
      }, 500);
    }
  }

  // Production: Generic error message
  return c.json({
    error: 'An unexpected error occurred',
    code: 'INTERNAL_ERROR',
  }, 500);
}
