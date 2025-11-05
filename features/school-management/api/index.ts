/**
 * School Management API Exports
 * Centralized exports for all school management API hooks
 */

// Student API hooks
export {
  useStudents,
  useStudent,
  useCreateStudent,
  useUpdateStudent,
  useDeleteStudent,
  useStudentDashboard,
  useStudentStats,
} from './students';

// Course API hooks
export {
  useCourses,
  useCourse,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
  useCourseStats,
  usePopularCourses,
} from './courses';

// Schedule API hooks
export {
  useSchedules,
  useSchedule,
  useCreateSchedule,
  useUpdateSchedule,
  useDeleteSchedule,
  useScheduleStats,
  useUpcomingSchedules,
  useSchedulesByCourse,
} from './schedules';

// Re-export types for convenience
export type {
  Student,
  Course,
  Schedule,
  StudentCourse,
  LessonBook,
  Purchase,
  CreateStudentRequest,
  UpdateStudentRequest,
  CreateCourseRequest,
  UpdateCourseRequest,
  CreateScheduleRequest,
  EnrollStudentRequest,
  StudentFilters,
  CourseFilters,
  ScheduleFilters,
  SchoolStats,
  StudentDashboard,
  AdminDashboard,
} from '../types';
