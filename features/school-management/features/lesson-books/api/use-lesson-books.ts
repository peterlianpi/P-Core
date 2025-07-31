"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/api/hono-client";
import { toast } from "sonner";

// Types
export interface LessonBook {
  id: string;
  title: string;
  description?: string;
  subject: string;
  grade: string;
  author: string;
  publisher?: string;
  isbn?: string;
  edition?: string;
  publicationYear?: number;
  language: string;
  price: number;
  currency: string;
  totalPages?: number;
  chapters: LessonBookChapter[];
  courseId?: string;
  courseName?: string;
  isActive: boolean;
  coverImage?: string;
  attachments: string[];
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  orgId: string;
}

export interface LessonBookChapter {
  id: string;
  title: string;
  description?: string;
  chapterNumber: number;
  pages?: number;
  objectives: string[];
  resources: string[];
  exercises: string[];
}

export interface CreateLessonBookData {
  title: string;
  description?: string;
  subject: string;
  grade: string;
  author: string;
  publisher?: string;
  isbn?: string;
  edition?: string;
  publicationYear?: number;
  language: string;
  price: number;
  currency?: string;
  totalPages?: number;
  courseId?: string;
  coverImage?: string;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  chapters: Omit<LessonBookChapter, "id">[];
}

export interface UpdateLessonBookData extends Partial<CreateLessonBookData> {
  isActive?: boolean;
  attachments?: string[];
}

export interface LessonBookFilters {
  subject?: string;
  grade?: string;
  difficulty?: string;
  courseId?: string;
  isActive?: boolean;
  search?: string;
}

// API Hooks

// Get all lesson books with filters
export const useGetLessonBooks = (filters?: LessonBookFilters) => {
  return useQuery({
    queryKey: ["lesson-books", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) params.append(key, String(value));
        });
      }
      
      const response = await client.api["lesson-books"].$get({
        query: Object.fromEntries(params),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch lesson books");
      }
      return response.json();
    },
  });
};

// Get lesson book by ID
export const useGetLessonBook = (id: string) => {
  return useQuery({
    queryKey: ["lesson-books", id],
    queryFn: async () => {
      const response = await client.api["lesson-books"][":id"].$get({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch lesson book");
      }
      return response.json();
    },
    enabled: !!id,
  });
};

// Create lesson book
export const useCreateLessonBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateLessonBookData) => {
      const response = await client.api["lesson-books"].$post({
        json: data,
      });
      if (!response.ok) {
        throw new Error("Failed to create lesson book");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lesson-books"] });
      toast.success("Lesson book created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create lesson book: " + error.message);
    },
  });
};

// Update lesson book
export const useUpdateLessonBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateLessonBookData }) => {
      const response = await client.api["lesson-books"][":id"].$patch({
        param: { id },
        json: data,
      });
      if (!response.ok) {
        throw new Error("Failed to update lesson book");
      }
      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["lesson-books"] });
      queryClient.invalidateQueries({ queryKey: ["lesson-books", id] });
      toast.success("Lesson book updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update lesson book: " + error.message);
    },
  });
};

// Delete lesson book
export const useDeleteLessonBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await client.api["lesson-books"][":id"].$delete({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to delete lesson book");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lesson-books"] });
      toast.success("Lesson book deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete lesson book: " + error.message);
    },
  });
};

// Toggle lesson book status
export const useToggleLessonBookStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const response = await client.api["lesson-books"][":id"].status.$patch({
        param: { id },
        json: { isActive },
      });
      if (!response.ok) {
        throw new Error("Failed to update lesson book status");
      }
      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["lesson-books"] });
      queryClient.invalidateQueries({ queryKey: ["lesson-books", id] });
      toast.success("Lesson book status updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update lesson book status: " + error.message);
    },
  });
};

// Get lesson book statistics
export const useGetLessonBookStats = () => {
  return useQuery({
    queryKey: ["lesson-books", "stats"],
    queryFn: async () => {
      const response = await client.api["lesson-books"].stats.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch lesson book statistics");
      }
      return response.json();
    },
  });
};

// Bulk operations
export const useBulkDeleteLessonBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await client.api["lesson-books"].bulk.delete.$post({
        json: { ids },
      });
      if (!response.ok) {
        throw new Error("Failed to delete lesson books");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lesson-books"] });
      toast.success("Lesson books deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete lesson books: " + error.message);
    },
  });
};

// Assign lesson book to course
export const useAssignLessonBookToCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      lessonBookId, 
      courseId 
    }: { 
      lessonBookId: string; 
      courseId: string 
    }) => {
      const response = await client.api["lesson-books"][":id"].assign.$post({
        param: { id: lessonBookId },
        json: { courseId },
      });
      if (!response.ok) {
        throw new Error("Failed to assign lesson book to course");
      }
      return response.json();
    },
    onSuccess: (_, { lessonBookId }) => {
      queryClient.invalidateQueries({ queryKey: ["lesson-books"] });
      queryClient.invalidateQueries({ queryKey: ["lesson-books", lessonBookId] });
      toast.success("Lesson book assigned to course successfully");
    },
    onError: (error) => {
      toast.error("Failed to assign lesson book to course: " + error.message);
    },
  });
};

// Upload lesson book attachment
export const useUploadLessonBookAttachment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      lessonBookId, 
      file 
    }: { 
      lessonBookId: string; 
      file: File 
    }) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await client.api["lesson-books"][":id"].attachments.$post({
        param: { id: lessonBookId },
        form: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload attachment");
      }
      return response.json();
    },
    onSuccess: (_, { lessonBookId }) => {
      queryClient.invalidateQueries({ queryKey: ["lesson-books"] });
      queryClient.invalidateQueries({ queryKey: ["lesson-books", lessonBookId] });
      toast.success("Attachment uploaded successfully");
    },
    onError: (error) => {
      toast.error("Failed to upload attachment: " + error.message);
    },
  });
};
