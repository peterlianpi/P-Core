/**
 * Task Validation Utilities
 * 
 * Validation functions for task data with detailed error messages
 */

import { z } from 'zod';
import { TaskStatus, TaskPriority } from '../types';

/**
 * Zod schema for task creation
 */
export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters')
    .trim(),
  description: z
    .string()
    .max(2000, 'Description must be less than 2000 characters')
    .default(''),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.TODO),
  priority: z.nativeEnum(TaskPriority).default(TaskPriority.MEDIUM),
  dueDate: z.date().nullable().optional(),
  tags: z.array(z.string()).default([]),
});

/**
 * Zod schema for task updates
 */
export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters')
    .trim()
    .optional(),
  description: z
    .string()
    .max(2000, 'Description must be less than 2000 characters')
    .optional(),
  status: z.nativeEnum(TaskStatus).optional(),
  priority: z.nativeEnum(TaskPriority).optional(),
  dueDate: z.date().nullable().optional(),
  tags: z.array(z.string()).optional(),
});

/**
 * Validates task creation data
 * @param data - Data to validate
 * @returns Validation result with parsed data or errors
 */
export function validateCreateTask(data: unknown) {
  return createTaskSchema.safeParse(data);
}

/**
 * Validates task update data
 * @param data - Data to validate
 * @returns Validation result with parsed data or errors
 */
export function validateUpdateTask(data: unknown) {
  return updateTaskSchema.safeParse(data);
}

/**
 * Validates a task ID
 * @param id - ID to validate
 * @returns True if valid, false otherwise
 */
export function isValidTaskId(id: unknown): id is string {
  return typeof id === 'string' && id.length > 0;
}

/**
 * Validates due date is not in the past
 * @param date - Date to validate
 * @returns True if valid, false otherwise
 */
export function isValidDueDate(date: Date | null): boolean {
  if (!date) return true;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return date >= now;
}

/**
 * Formats validation errors for display
 * @param errors - Zod errors
 * @returns Formatted error messages
 */
export function formatValidationErrors(errors: z.ZodError): Record<string, string> {
  const formatted: Record<string, string> = {};
  
  errors.errors.forEach(error => {
    const path = error.path.join('.');
    formatted[path] = error.message;
  });
  
  return formatted;
}