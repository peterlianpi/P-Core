// Teachers Feature - School Management
// Complete teachers management system

export * from "./components/teachers-dashboard";
export * from "./components/teacher-form";
export * from "./api/use-teachers";

// Feature configuration
export const TeachersFeature = {
  name: 'teachers',
  enabled: true,
  version: '1.0.0',
  routes: [
    { path: '/school-management/teachers', name: 'Teachers' },
    { path: '/school-management/teachers/new', name: 'Add Teacher' },
  ],
  permissions: ['VIEW_TEACHERS', 'MANAGE_TEACHERS'],
};

// Main exports
export { default as TeachersDashboard } from "./components/teachers-dashboard";
export { default as TeacherForm } from "./components/teacher-form";
