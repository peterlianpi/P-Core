/**
 * Schedule Management API Hooks
 * React Query hooks for schedule CRUD operations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Schedule,
  CreateScheduleRequest,
  ScheduleFilters
} from '../types';

// Mock data for development
const mockSchedules: Schedule[] = [
  {
    id: '1',
    courseId: '1',
    course: {
      id: '1',
      code: 'MATH101',
      name: 'Introduction to Mathematics',
      description: 'Basic mathematics concepts and problem solving',
      credits: 3,
      duration: 60,
      price: 299.99,
      maxStudents: 30,
      status: 'ACTIVE',
      orgId: 'org1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    startDate: new Date('2024-09-01'),
    endDate: new Date('2024-12-15'),
    startTime: '09:00',
    endTime: '10:30',
    daysOfWeek: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
    room: 'Room 101',
    instructor: 'Dr. Smith',
    maxCapacity: 30,
    enrolledCount: 25,
    status: 'ONGOING',
    orgId: 'org1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    courseId: '2',
    course: {
      id: '2',
      code: 'ENG201',
      name: 'English Literature',
      description: 'Study of classic and modern English literature',
      credits: 4,
      duration: 75,
      price: 349.99,
      maxStudents: 25,
      status: 'ACTIVE',
      orgId: 'org1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    startDate: new Date('2024-09-02'),
    endDate: new Date('2024-12-16'),
    startTime: '11:00',
    endTime: '12:30',
    daysOfWeek: ['TUESDAY', 'THURSDAY'],
    room: 'Room 205',
    instructor: 'Prof. Johnson',
    maxCapacity: 25,
    enrolledCount: 22,
    status: 'ONGOING',
    orgId: 'org1',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// API Functions
const fetchSchedules = async (filters: ScheduleFilters = {}): Promise<Schedule[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredSchedules = [...mockSchedules];

  // Apply filters
  if (filters.courseId) {
    filteredSchedules = filteredSchedules.filter(s => s.courseId === filters.courseId);
  }
  if (filters.status) {
    filteredSchedules = filteredSchedules.filter(s => s.status === filters.status);
  }
  if (filters.startDate && filters.endDate) {
    const startDate = new Date(filters.startDate);
    const endDate = new Date(filters.endDate);
    filteredSchedules = filteredSchedules.filter(s =>
      s.startDate >= startDate && s.endDate <= endDate
    );
  }

  return filteredSchedules;
};

const fetchScheduleById = async (id: string): Promise<Schedule | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockSchedules.find(s => s.id === id) || null;
};

const createSchedule = async (data: CreateScheduleRequest): Promise<Schedule> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  // Get course data (in real app, this would be fetched from API)
  const course = mockSchedules.find(s => s.courseId === data.courseId)?.course;
  if (!course) {
    throw new Error('Course not found');
  }

  const newSchedule: Schedule = {
    id: Date.now().toString(),
    courseId: data.courseId,
    course,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    startTime: data.startTime,
    endTime: data.endTime,
    daysOfWeek: data.daysOfWeek,
    room: data.room,
    instructor: data.instructor,
    maxCapacity: data.maxCapacity,
    enrolledCount: 0,
    status: 'SCHEDULED',
    orgId: 'org1', // In real app, get from context
    createdAt: new Date(),
    updatedAt: new Date()
  };

  mockSchedules.push(newSchedule);
  return newSchedule;
};

const updateSchedule = async (id: string, data: Partial<CreateScheduleRequest>): Promise<Schedule> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockSchedules.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error('Schedule not found');
  }

  const updatedSchedule = {
    ...mockSchedules[index],
    ...data,
    startDate: data.startDate ? new Date(data.startDate) : mockSchedules[index].startDate,
    endDate: data.endDate ? new Date(data.endDate) : mockSchedules[index].endDate,
    updatedAt: new Date()
  };

  mockSchedules[index] = updatedSchedule;
  return updatedSchedule;
};

const deleteSchedule = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = mockSchedules.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error('Schedule not found');
  }

  mockSchedules.splice(index, 1);
};

// React Query Hooks
export const useSchedules = (filters: ScheduleFilters = {}) => {
  return useQuery({
    queryKey: ['schedules', filters],
    queryFn: () => fetchSchedules(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSchedule = (id: string) => {
  return useQuery({
    queryKey: ['schedule', id],
    queryFn: () => fetchScheduleById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
};

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateScheduleRequest> }) =>
      updateSchedule(id, data),
    onSuccess: (updatedSchedule) => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.setQueryData(['schedule', updatedSchedule.id], updatedSchedule);
    },
  });
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
};

// Utility hooks
export const useScheduleStats = () => {
  return useQuery({
    queryKey: ['schedule-stats'],
    queryFn: async () => {
      const schedules = await fetchSchedules();
      return {
        total: schedules.length,
        scheduled: schedules.filter(s => s.status === 'SCHEDULED').length,
        ongoing: schedules.filter(s => s.status === 'ONGOING').length,
        completed: schedules.filter(s => s.status === 'COMPLETED').length,
        cancelled: schedules.filter(s => s.status === 'CANCELLED').length,
        totalCapacity: schedules.reduce((sum, s) => sum + s.maxCapacity, 0),
        totalEnrolled: schedules.reduce((sum, s) => sum + s.enrolledCount, 0),
        averageUtilization: schedules.length > 0
          ? schedules.reduce((sum, s) => sum + (s.enrolledCount / s.maxCapacity), 0) / schedules.length * 100
          : 0,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpcomingSchedules = (limit: number = 10) => {
  return useQuery({
    queryKey: ['upcoming-schedules', limit],
    queryFn: async () => {
      const schedules = await fetchSchedules({
        status: 'ONGOING',
        startDate: new Date().toISOString(),
      });

      // Sort by start date and limit
      return schedules
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
        .slice(0, limit);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSchedulesByCourse = (courseId: string) => {
  return useQuery({
    queryKey: ['schedules-by-course', courseId],
    queryFn: () => fetchSchedules({ courseId }),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000,
  });
};
