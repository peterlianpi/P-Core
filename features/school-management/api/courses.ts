/**
 * Course Management API Hooks
 * React Query hooks for course CRUD operations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Course,
  CreateCourseRequest,
  UpdateCourseRequest,
  CourseFilters
} from '../types';

// Mock data for development
const mockCourses: Course[] = [
  {
    id: '1',
    code: 'MATH101',
    name: 'Introduction to Mathematics',
    description: 'Basic mathematics concepts and problem solving',
    credits: 3,
    duration: 60, // hours
    price: 299.99,
    maxStudents: 30,
    status: 'ACTIVE',
    imageUrl: 'https://via.placeholder.com/300x200',
    orgId: 'org1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    code: 'ENG201',
    name: 'English Literature',
    description: 'Study of classic and modern English literature',
    credits: 4,
    duration: 75,
    price: 349.99,
    maxStudents: 25,
    status: 'ACTIVE',
    imageUrl: 'https://via.placeholder.com/300x200',
    orgId: 'org1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    code: 'SCI301',
    name: 'Advanced Physics',
    description: 'Quantum physics and modern scientific theories',
    credits: 5,
    duration: 90,
    price: 499.99,
    maxStudents: 20,
    status: 'ACTIVE',
    imageUrl: 'https://via.placeholder.com/300x200',
    orgId: 'org1',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// API Functions
const fetchCourses = async (filters: CourseFilters = {}): Promise<Course[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredCourses = [...mockCourses];

  // Apply filters
  if (filters.status) {
    filteredCourses = filteredCourses.filter(c => c.status === filters.status);
  }
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredCourses = filteredCourses.filter(c =>
      c.name.toLowerCase().includes(searchLower) ||
      c.code.toLowerCase().includes(searchLower) ||
      c.description?.toLowerCase().includes(searchLower)
    );
  }

  return filteredCourses;
};

const fetchCourseById = async (id: string): Promise<Course | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockCourses.find(c => c.id === id) || null;
};

const createCourse = async (data: CreateCourseRequest): Promise<Course> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const newCourse: Course = {
    id: Date.now().toString(),
    code: data.code,
    name: data.name,
    description: data.description,
    credits: data.credits,
    duration: data.duration,
    price: data.price,
    maxStudents: data.maxStudents,
    status: 'ACTIVE',
    orgId: 'org1', // In real app, get from context
    createdAt: new Date(),
    updatedAt: new Date()
  };

  mockCourses.push(newCourse);
  return newCourse;
};

const updateCourse = async (id: string, data: UpdateCourseRequest): Promise<Course> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockCourses.findIndex(c => c.id === id);
  if (index === -1) {
    throw new Error('Course not found');
  }

  const updatedCourse = {
    ...mockCourses[index],
    ...data,
    updatedAt: new Date()
  };

  mockCourses[index] = updatedCourse;
  return updatedCourse;
};

const deleteCourse = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = mockCourses.findIndex(c => c.id === id);
  if (index === -1) {
    throw new Error('Course not found');
  }

  mockCourses.splice(index, 1);
};

// React Query Hooks
export const useCourses = (filters: CourseFilters = {}) => {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: () => fetchCourses(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => fetchCourseById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCourseRequest }) =>
      updateCourse(id, data),
    onSuccess: (updatedCourse) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.setQueryData(['course', updatedCourse.id], updatedCourse);
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};

// Utility hooks
export const useCourseStats = () => {
  return useQuery({
    queryKey: ['course-stats'],
    queryFn: async () => {
      const courses = await fetchCourses();
      return {
        total: courses.length,
        active: courses.filter(c => c.status === 'ACTIVE').length,
        inactive: courses.filter(c => c.status === 'INACTIVE').length,
        archived: courses.filter(c => c.status === 'ARCHIVED').length,
        totalCredits: courses.reduce((sum, c) => sum + c.credits, 0),
        averagePrice: courses.length > 0
          ? courses.reduce((sum, c) => sum + c.price, 0) / courses.length
          : 0,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const usePopularCourses = (limit: number = 5) => {
  return useQuery({
    queryKey: ['popular-courses', limit],
    queryFn: async () => {
      const courses = await fetchCourses({ status: 'ACTIVE' });
      // In real app, sort by enrollment count
      return courses.slice(0, limit);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
