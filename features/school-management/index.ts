// School Management Feature Module
// Export all school management features and components

// Re-export from features directory
export * from "./features/students";
export * from "./features/students-management";
export * from "./features/courses";
export * from "./features/schedule";
export * from "./features/lesson-books";
export * from "./features/overview";
export * from "./features/transactions";

// API Client
export * from "./lib/api-client";

// Default export for dynamic imports
const SchoolManagementFeature = {
  name: "School Management",
  version: "1.0.0",
  category: "domain" as const,
  features: [
    "students",
    "students-management",
    "courses",
    "schedule", 
    "lesson-books",
    "overview",
    "transactions"
  ]
};

export default SchoolManagementFeature;
