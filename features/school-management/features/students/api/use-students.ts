import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// Types
export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  enrollmentDate: Date;
  status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'TRANSFERRED';
  gradeLevel?: string;
  section?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  medicalInfo?: string;
  notes?: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  enrollments?: any[];
  grades?: any[];
  attendance?: any[];
  _count?: {
    enrollments: number;
  };
}

export interface CreateStudentData {
  studentId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  enrollmentDate: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'TRANSFERRED';
  gradeLevel?: string;
  section?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  medicalInfo?: string;
  notes?: string;
}

export interface UpdateStudentData extends Partial<Omit<CreateStudentData, 'studentId'>> {}

export interface StudentsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'TRANSFERRED';
  gradeLevel?: string;
  section?: string;
}

export interface StudentsResponse {
  data: Student[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// API functions
const api = {
  getStudents: async (params: StudentsQueryParams = {}): Promise<StudentsResponse> => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(`/api/students?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }
    return response.json();
  },

  getStudent: async (id: string): Promise<{ data: Student }> => {
    const response = await fetch(`/api/students/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch student');
    }
    return response.json();
  },

  createStudent: async (data: CreateStudentData): Promise<{ data: Student }> => {
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create student');
    }
    return response.json();
  },

  updateStudent: async (id: string, data: UpdateStudentData): Promise<{ data: Student }> => {
    const response = await fetch(`/api/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update student');
    }
    return response.json();
  },

  deleteStudent: async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`/api/students/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete student');
    }
    return response.json();
  },

  getStudentEnrollments: async (id: string): Promise<{ data: any[] }> => {
    const response = await fetch(`/api/students/${id}/enrollments`);
    if (!response.ok) {
      throw new Error('Failed to fetch student enrollments');
    }
    return response.json();
  },

  getStudentGrades: async (id: string): Promise<{ data: any[] }> => {
    const response = await fetch(`/api/students/${id}/grades`);
    if (!response.ok) {
      throw new Error('Failed to fetch student grades');
    }
    return response.json();
  },
};

// Query keys
export const studentsKeys = {
  all: ['students'] as const,
  lists: () => [...studentsKeys.all, 'list'] as const,
  list: (params: StudentsQueryParams) => [...studentsKeys.lists(), params] as const,
  details: () => [...studentsKeys.all, 'detail'] as const,
  detail: (id: string) => [...studentsKeys.details(), id] as const,
  enrollments: (id: string) => [...studentsKeys.detail(id), 'enrollments'] as const,
  grades: (id: string) => [...studentsKeys.detail(id), 'grades'] as const,
};

// Hooks
export function useStudents(params: StudentsQueryParams = {}) {
  return useQuery({
    queryKey: studentsKeys.list(params),
    queryFn: () => api.getStudents(params),
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: studentsKeys.detail(id),
    queryFn: () => api.getStudent(id),
    enabled: !!id,
  });
}

export function useStudentEnrollments(id: string) {
  return useQuery({
    queryKey: studentsKeys.enrollments(id),
    queryFn: () => api.getStudentEnrollments(id),
    enabled: !!id,
  });
}

export function useStudentGrades(id: string) {
  return useQuery({
    queryKey: studentsKeys.grades(id),
    queryFn: () => api.getStudentGrades(id),
    enabled: !!id,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentsKeys.lists() });
      toast.success('Student created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStudentData }) =>
      api.updateStudent(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: studentsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: studentsKeys.detail(id) });
      toast.success('Student updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentsKeys.lists() });
      toast.success('Student deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
