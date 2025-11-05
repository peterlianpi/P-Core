/**
 * Student Management API Hooks
 * React Query hooks for student CRUD operations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Student,
  CreateStudentRequest,
  UpdateStudentRequest,
  StudentFilters,
  StudentDashboard
} from '../types';

// Mock data for development
const mockStudents: Student[] = [
  {
    id: '1',
    number: 'STU001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@school.com',
    phone: '+1234567890',
    dateOfBirth: new Date('2005-05-15'),
    gender: 'MALE',
    address: '123 Main St, City, State',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1234567891',
    enrollmentDate: new Date('2023-09-01'),
    status: 'ACTIVE',
    grade: '10',
    section: 'A',
    imageUrl: 'https://via.placeholder.com/150',
    orgId: 'org1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    number: 'STU002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@school.com',
    phone: '+1234567892',
    dateOfBirth: new Date('2006-03-20'),
    gender: 'FEMALE',
    address: '456 Oak Ave, City, State',
    emergencyContact: 'Bob Smith',
    emergencyPhone: '+1234567893',
    enrollmentDate: new Date('2023-09-01'),
    status: 'ACTIVE',
    grade: '9',
    section: 'B',
    orgId: 'org1',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// API Functions
const fetchStudents = async (filters: StudentFilters = {}): Promise<Student[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredStudents = [...mockStudents];

  // Apply filters
  if (filters.status) {
    filteredStudents = filteredStudents.filter(s => s.status === filters.status);
  }
  if (filters.grade) {
    filteredStudents = filteredStudents.filter(s => s.grade === filters.grade);
  }
  if (filters.section) {
    filteredStudents = filteredStudents.filter(s => s.section === filters.section);
  }
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredStudents = filteredStudents.filter(s =>
      s.firstName.toLowerCase().includes(searchLower) ||
      s.lastName.toLowerCase().includes(searchLower) ||
      s.email?.toLowerCase().includes(searchLower) ||
      s.number.toLowerCase().includes(searchLower)
    );
  }

  return filteredStudents;
};

const fetchStudentById = async (id: string): Promise<Student | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockStudents.find(s => s.id === id) || null;
};

const createStudent = async (data: CreateStudentRequest): Promise<Student> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const newStudent: Student = {
    id: Date.now().toString(),
    number: data.number,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
    gender: data.gender,
    address: data.address,
    emergencyContact: data.emergencyContact,
    emergencyPhone: data.emergencyPhone,
    enrollmentDate: new Date(),
    status: 'ACTIVE',
    grade: data.grade,
    section: data.section,
    orgId: 'org1', // In real app, get from context
    createdAt: new Date(),
    updatedAt: new Date()
  };

  mockStudents.push(newStudent);
  return newStudent;
};

const updateStudent = async (id: string, data: UpdateStudentRequest): Promise<Student> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockStudents.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error('Student not found');
  }

  const updatedStudent = {
    ...mockStudents[index],
    ...data,
    dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : mockStudents[index].dateOfBirth,
    updatedAt: new Date()
  };

  mockStudents[index] = updatedStudent;
  return updatedStudent;
};

const deleteStudent = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = mockStudents.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error('Student not found');
  }

  mockStudents.splice(index, 1);
};

const fetchStudentDashboard = async (): Promise<StudentDashboard> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    recentEnrollments: [],
    upcomingSchedules: [],
    pendingPayments: [],
    completedCourses: []
  };
};

// React Query Hooks
export const useStudents = (filters: StudentFilters = {}) => {
  return useQuery({
    queryKey: ['students', filters],
    queryFn: () => fetchStudents(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useStudent = (id: string) => {
  return useQuery({
    queryKey: ['student', id],
    queryFn: () => fetchStudentById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStudentRequest }) =>
      updateStudent(id, data),
    onSuccess: (updatedStudent) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.setQueryData(['student', updatedStudent.id], updatedStudent);
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};

export const useStudentDashboard = () => {
  return useQuery({
    queryKey: ['student-dashboard'],
    queryFn: fetchStudentDashboard,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Utility hooks
export const useStudentStats = () => {
  return useQuery({
    queryKey: ['student-stats'],
    queryFn: async () => {
      const students = await fetchStudents();
      return {
        total: students.length,
        active: students.filter(s => s.status === 'ACTIVE').length,
        graduated: students.filter(s => s.status === 'GRADUATED').length,
        suspended: students.filter(s => s.status === 'SUSPENDED').length,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};
