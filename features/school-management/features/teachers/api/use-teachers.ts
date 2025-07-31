"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/api/hono-client";
import { toast } from "sonner";

// Types
export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  department: string;
  specialization: string;
  status: "active" | "on-leave" | "inactive";
  employmentType: "full-time" | "part-time" | "contract";
  joiningDate: string;
  experience: string;
  qualifications: string[];
  courses: string[];
  students: number;
  rating: number;
  salary: number;
  performance: {
    attendance: number;
    studentSatisfaction: number;
    courseCompletion: number;
  };
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  createdAt: string;
  updatedAt: string;
  orgId: string;
}

export interface CreateTeacherData {
  name: string;
  email: string;
  phone: string;
  department: string;
  specialization: string;
  employmentType: "full-time" | "part-time" | "contract";
  joiningDate: string;
  experience: string;
  qualifications: string[];
  salary: number;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
}

export interface UpdateTeacherData extends Partial<CreateTeacherData> {
  status?: "active" | "on-leave" | "inactive";
  avatar?: string;
  courses?: string[];
  performance?: {
    attendance: number;
    studentSatisfaction: number;
    courseCompletion: number;
  };
}

// API Hooks

// Get all teachers
export const useGetTeachers = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const response = await client.api.teachers.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch teachers");
      }
      return response.json();
    },
  });
};

// Get teacher by ID
export const useGetTeacher = (id: string) => {
  return useQuery({
    queryKey: ["teachers", id],
    queryFn: async () => {
      const response = await client.api.teachers[":id"].$get({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch teacher");
      }
      return response.json();
    },
    enabled: !!id,
  });
};

// Create teacher
export const useCreateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTeacherData) => {
      const response = await client.api.teachers.$post({
        json: data,
      });
      if (!response.ok) {
        throw new Error("Failed to create teacher");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("Teacher created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create teacher: " + error.message);
    },
  });
};

// Update teacher
export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateTeacherData }) => {
      const response = await client.api.teachers[":id"].$patch({
        param: { id },
        json: data,
      });
      if (!response.ok) {
        throw new Error("Failed to update teacher");
      }
      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({ queryKey: ["teachers", id] });
      toast.success("Teacher updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update teacher: " + error.message);
    },
  });
};

// Delete teacher
export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await client.api.teachers[":id"].$delete({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to delete teacher");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("Teacher deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete teacher: " + error.message);
    },
  });
};

// Get teacher statistics
export const useGetTeacherStats = () => {
  return useQuery({
    queryKey: ["teachers", "stats"],
    queryFn: async () => {
      const response = await client.api.teachers.stats.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch teacher statistics");
      }
      return response.json();
    },
  });
};

// Bulk operations
export const useBulkDeleteTeachers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await client.api.teachers.bulk.delete.$post({
        json: { ids },
      });
      if (!response.ok) {
        throw new Error("Failed to delete teachers");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("Teachers deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete teachers: " + error.message);
    },
  });
};

// Update teacher status
export const useUpdateTeacherStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      id, 
      status 
    }: { 
      id: string; 
      status: "active" | "on-leave" | "inactive" 
    }) => {
      const response = await client.api.teachers[":id"].status.$patch({
        param: { id },
        json: { status },
      });
      if (!response.ok) {
        throw new Error("Failed to update teacher status");
      }
      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({ queryKey: ["teachers", id] });
      toast.success("Teacher status updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update teacher status: " + error.message);
    },
  });
};

// Assign course to teacher
export const useAssignCourseToTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      teacherId, 
      courseId 
    }: { 
      teacherId: string; 
      courseId: string 
    }) => {
      const response = await client.api.teachers[":id"].courses.$post({
        param: { id: teacherId },
        json: { courseId },
      });
      if (!response.ok) {
        throw new Error("Failed to assign course");
      }
      return response.json();
    },
    onSuccess: (_, { teacherId }) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({ queryKey: ["teachers", teacherId] });
      toast.success("Course assigned successfully");
    },
    onError: (error) => {
      toast.error("Failed to assign course: " + error.message);
    },
  });
};

// Remove course from teacher
export const useRemoveCourseFromTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      teacherId, 
      courseId 
    }: { 
      teacherId: string; 
      courseId: string 
    }) => {
      const response = await client.api.teachers[":id"].courses[":courseId"].$delete({
        param: { id: teacherId, courseId },
      });
      if (!response.ok) {
        throw new Error("Failed to remove course");
      }
      return response.json();
    },
    onSuccess: (_, { teacherId }) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({ queryKey: ["teachers", teacherId] });
      toast.success("Course removed successfully");
    },
    onError: (error) => {
      toast.error("Failed to remove course: " + error.message);
    },
  });
};
