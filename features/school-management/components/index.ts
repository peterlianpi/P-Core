// School Management Components Index
// Export all reusable components

// Dashboard components
export * from "./dashboard/school-analytics-dashboard";
export { default as SchoolAnalyticsDashboard } from "./dashboard/school-analytics-dashboard";

// Filter components
export * from "./filters/date-range-picker";

// Student components
export * from "./students/student-performance-chart";
export { default as StudentPerformanceChart } from "./students/student-performance-chart";

// Course components
export * from "./courses/course-analytics";
export { default as CourseAnalytics } from "./courses/course-analytics";

// Re-export overview components for convenience
export * from "../features/overview";
