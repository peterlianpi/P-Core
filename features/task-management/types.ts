/**
 * Task Management Types
 * 
 * Type definitions for the task management feature with full CRUD support
 * and local persistence capabilities.
 */

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

/**
 * Core Task interface
 * Represents a single task item in the system
 */
export interface Task {
  /** Unique identifier for the task */
  id: string;
  /** Task title/name */
  title: string;
  /** Detailed description of the task */
  description: string;
  /** Current status of the task */
  status: TaskStatus;
  /** Priority level */
  priority: TaskPriority;
  /** Due date for the task */
  dueDate: Date | null;
  /** Tags for categorization */
  tags: string[];
  /** User ID who created the task */
  userId: string;
  /** Timestamp when task was created */
  createdAt: Date;
  /** Timestamp when task was last updated */
  updatedAt: Date;
  /** Flag indicating if task is synced with server */
  isSynced?: boolean;
}

/**
 * Data required to create a new task
 */
export interface CreateTaskData {
  title: string;
  description: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date | null;
  tags?: string[];
}

/**
 * Data that can be updated in an existing task
 */
export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date | null;
  tags?: string[];
}

/**
 * Filter options for task queries
 */
export interface TaskFilters {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  tags?: string[];
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

/**
 * Sort options for task lists
 */
export interface TaskSortOptions {
  field: 'createdAt' | 'updatedAt' | 'dueDate' | 'priority' | 'title';
  direction: 'asc' | 'desc';
}

/**
 * Pagination options
 */
export interface PaginationOptions {
  page: number;
  pageSize: number;
}

/**
 * Task list response with pagination
 */
export interface TaskListResponse {
  tasks: Task[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Local storage sync status
 */
export interface SyncStatus {
  lastSyncAt: Date | null;
  pendingChanges: number;
  isSyncing: boolean;
  error: string | null;
}

/**
 * Task statistics
 */
export interface TaskStats {
  total: number;
  byStatus: Record<TaskStatus, number>;
  byPriority: Record<TaskPriority, number>;
  overdue: number;
  completedToday: number;
  completedThisWeek: number;
}