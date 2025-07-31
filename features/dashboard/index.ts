// Dashboard Feature Module
// Export all dashboard features and components

// API exports
export * from "./api";

// Default export for dynamic imports
const DashboardFeature = {
  name: "Dashboard",
  version: "1.0.0",
  category: "system" as const,
  features: [
    "analytics",
    "activity",
    "stats"
  ]
};

export default DashboardFeature;
