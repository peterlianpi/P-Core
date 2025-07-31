// School Management Feature Module
// Export all school management features and components

// Re-export from features directory
export * from "./features/students";
export * from "./features/courses";
export * from "./features/schedule";
export * from "./features/lesson-books";
export * from "./features/overview";
export * from "./features/transactions";
export * from "./features/teachers";

// API Client
export * from "./lib/api-client";

// Components
export * from "./components";

// Default export for dynamic imports
const SchoolManagementFeature = {
  name: "School Management",
  version: "2.0.0",
  category: "domain" as const,
  features: [
    "students",
    "courses",
    "schedule", 
    "lesson-books",
    "overview",
    "transactions",
    "teachers"
  ]
};

export default SchoolManagementFeature;
