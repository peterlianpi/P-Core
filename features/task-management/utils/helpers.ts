/**
 * Task Management Helper Utilities
 * 
 * Utility functions for task operations, filtering, and statistics
 */

import type { Task, TaskFilters, TaskSortOptions, TaskStats } from '../types';
import { TaskStatus, TaskPriority } from '../types';

/**
 * Generates a unique ID for a task
 * @returns Unique string ID
 */
export function generateTaskId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Filters tasks based on provided criteria
 * @param tasks - Array of tasks to filter
 * @param filters - Filter criteria
 * @returns Filtered array of tasks
 */
export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  let filtered = [...tasks];

  // Filter by status
  if (filters.status && filters.status.length > 0) {
    filtered = filtered.filter(task => filters.status!.includes(task.status));
  }

  // Filter by priority
  if (filters.priority && filters.priority.length > 0) {
    filtered = filtered.filter(task => filters.priority!.includes(task.priority));
  }

  // Filter by tags
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(task =>
      filters.tags!.some(tag => task.tags.includes(tag))
    );
  }

  // Filter by search term
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
    );
  }

  // Filter by date range
  if (filters.dateRange) {
    filtered = filtered.filter(task => {
      if (!task.dueDate) return false;
      return (
        task.dueDate >= filters.dateRange!.start &&
        task.dueDate <= filters.dateRange!.end
      );
    });
  }

  return filtered;
}

/**
 * Sorts tasks based on provided options
 * @param tasks - Array of tasks to sort
 * @param options - Sort options
 * @returns Sorted array of tasks
 */
export function sortTasks(tasks: Task[], options: TaskSortOptions): Task[] {
  const sorted = [...tasks];

  sorted.sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (options.field) {
      case 'priority':
        const priorityOrder = {
          [TaskPriority.URGENT]: 4,
          [TaskPriority.HIGH]: 3,
          [TaskPriority.MEDIUM]: 2,
          [TaskPriority.LOW]: 1,
        };
        aValue = priorityOrder[a.priority];
        bValue = priorityOrder[b.priority];
        break;
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'dueDate':
        aValue = a.dueDate?.getTime() ?? Infinity;
        bValue = b.dueDate?.getTime() ?? Infinity;
        break;
      case 'createdAt':
        aValue = a.createdAt.getTime();
        bValue = b.createdAt.getTime();
        break;
      case 'updatedAt':
        aValue = a.updatedAt.getTime();
        bValue = b.updatedAt.getTime();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return options.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return options.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
}

/**
 * Checks if a task is overdue
 * @param task - Task to check
 * @returns True if task is overdue
 */
export function isTaskOverdue(task: Task): boolean {
  if (!task.dueDate || task.status === TaskStatus.COMPLETED) return false;
  return task.dueDate < new Date();
}

/**
 * Calculates task statistics
 * @param tasks - Array of tasks
 * @returns Task statistics
 */
export function calculateTaskStats(tasks: Task[]): TaskStats {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());

  const stats: TaskStats = {
    total: tasks.length,
    byStatus: {
      [TaskStatus.TODO]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.COMPLETED]: 0,
      [TaskStatus.ARCHIVED]: 0,
    },
    byPriority: {
      [TaskPriority.LOW]: 0,
      [TaskPriority.MEDIUM]: 0,
      [TaskPriority.HIGH]: 0,
      [TaskPriority.URGENT]: 0,
    },
    overdue: 0,
    completedToday: 0,
    completedThisWeek: 0,
  };

  tasks.forEach(task => {
    // Count by status
    stats.byStatus[task.status]++;

    // Count by priority
    stats.byPriority[task.priority]++;

    // Count overdue
    if (isTaskOverdue(task)) {
      stats.overdue++;
    }

    // Count completed today
    if (
      task.status === TaskStatus.COMPLETED &&
      task.updatedAt >= today
    ) {
      stats.completedToday++;
    }

    // Count completed this week
    if (
      task.status === TaskStatus.COMPLETED &&
      task.updatedAt >= weekStart
    ) {
      stats.completedThisWeek++;
    }
  });

  return stats;
}

/**
 * Gets all unique tags from tasks
 * @param tasks - Array of tasks
 * @returns Array of unique tags
 */
export function getAllTags(tasks: Task[]): string[] {
  const tagSet = new Set<string>();
  tasks.forEach(task => {
    task.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

/**
 * Formats a date for display
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date | null): string {
  if (!date) return 'No due date';
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

/**
 * Gets color class for task priority
 * @param priority - Task priority
 * @returns Tailwind color class
 */
export function getPriorityColor(priority: TaskPriority): string {
  switch (priority) {
    case TaskPriority.URGENT:
      return 'text-red-600 bg-red-50 border-red-200';
    case TaskPriority.HIGH:
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case TaskPriority.MEDIUM:
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case TaskPriority.LOW:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

/**
 * Gets color class for task status
 * @param status - Task status
 * @returns Tailwind color class
 */
export function getStatusColor(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.TODO:
      return 'text-gray-600 bg-gray-50 border-gray-200';
    case TaskStatus.IN_PROGRESS:
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case TaskStatus.COMPLETED:
      return 'text-green-600 bg-green-50 border-green-200';
    case TaskStatus.ARCHIVED:
      return 'text-purple-600 bg-purple-50 border-purple-200';
  }
}