/**
 * Local Storage Utilities
 * 
 * Handles local persistence of tasks with sync capabilities
 */

import type { Task, SyncStatus } from '../types';

const STORAGE_KEYS = {
  TASKS: 'tasks_local_storage',
  SYNC_STATUS: 'tasks_sync_status',
  PENDING_CHANGES: 'tasks_pending_changes',
} as const;

/**
 * Retrieves all tasks from local storage
 * @returns Array of tasks or empty array if none exist
 */
export function getTasksFromStorage(): Task[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (!stored) return [];
    
    const tasks = JSON.parse(stored);
    // Parse dates back to Date objects
    return tasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
    }));
  } catch (error) {
    console.error('Error reading tasks from storage:', error);
    return [];
  }
}

/**
 * Saves tasks to local storage
 * @param tasks - Array of tasks to save
 */
export function saveTasksToStorage(tasks: Task[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to storage:', error);
  }
}

/**
 * Adds a single task to local storage
 * @param task - Task to add
 */
export function addTaskToStorage(task: Task): void {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);
}

/**
 * Updates a task in local storage
 * @param taskId - ID of task to update
 * @param updates - Partial task data to update
 */
export function updateTaskInStorage(taskId: string, updates: Partial<Task>): void {
  const tasks = getTasksFromStorage();
  const index = tasks.findIndex(t => t.id === taskId);
  
  if (index !== -1) {
    tasks[index] = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date(),
    };
    saveTasksToStorage(tasks);
  }
}

/**
 * Removes a task from local storage
 * @param taskId - ID of task to remove
 */
export function removeTaskFromStorage(taskId: string): void {
  const tasks = getTasksFromStorage();
  const filtered = tasks.filter(t => t.id !== taskId);
  saveTasksToStorage(filtered);
}

/**
 * Clears all tasks from local storage
 */
export function clearTasksFromStorage(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.TASKS);
}

/**
 * Gets sync status from local storage
 */
export function getSyncStatus(): SyncStatus {
  if (typeof window === 'undefined') {
    return {
      lastSyncAt: null,
      pendingChanges: 0,
      isSyncing: false,
      error: null,
    };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SYNC_STATUS);
    if (!stored) {
      return {
        lastSyncAt: null,
        pendingChanges: 0,
        isSyncing: false,
        error: null,
      };
    }
    
    const status = JSON.parse(stored);
    return {
      ...status,
      lastSyncAt: status.lastSyncAt ? new Date(status.lastSyncAt) : null,
    };
  } catch (error) {
    console.error('Error reading sync status:', error);
    return {
      lastSyncAt: null,
      pendingChanges: 0,
      isSyncing: false,
      error: null,
    };
  }
}

/**
 * Updates sync status in local storage
 */
export function updateSyncStatus(status: Partial<SyncStatus>): void {
  if (typeof window === 'undefined') return;
  
  const current = getSyncStatus();
  const updated = { ...current, ...status };
  
  try {
    localStorage.setItem(STORAGE_KEYS.SYNC_STATUS, JSON.stringify(updated));
  } catch (error) {
    console.error('Error updating sync status:', error);
  }
}

/**
 * Tracks pending changes for sync
 */
export function addPendingChange(change: { type: 'create' | 'update' | 'delete'; taskId: string; data?: any }): void {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PENDING_CHANGES);
    const changes = stored ? JSON.parse(stored) : [];
    changes.push({ ...change, timestamp: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.PENDING_CHANGES, JSON.stringify(changes));
    
    // Update sync status
    updateSyncStatus({ pendingChanges: changes.length });
  } catch (error) {
    console.error('Error adding pending change:', error);
  }
}

/**
 * Gets all pending changes
 */
export function getPendingChanges(): any[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PENDING_CHANGES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading pending changes:', error);
    return [];
  }
}

/**
 * Clears pending changes after successful sync
 */
export function clearPendingChanges(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(STORAGE_KEYS.PENDING_CHANGES);
  updateSyncStatus({ pendingChanges: 0, lastSyncAt: new Date() });
}