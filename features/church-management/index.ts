// Church Management Feature Module
// Export all church management features and components

// Re-export from features directory
export * from "./features/members";
export * from "./features/choirs";

// API Client
export * from "./lib/api-client";

// Default export for dynamic imports
const ChurchManagementFeature = {
  name: "Church Management",
  version: "1.0.0",
  category: "domain" as const,
  features: [
    "members",
    "choirs", 
    "homes",
    "khawk",
    "youth",
    "veng"
  ]
};

export default ChurchManagementFeature;
