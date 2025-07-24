// Library Management Feature Module
// Export all library management features and components

// Re-export from features directory
export * from "./features/books";

// API Client
export * from "./lib/api-client";

// Default export for dynamic imports
const LibraryManagementFeature = {
  name: "Library Management",
  version: "1.0.0",
  category: "domain" as const,
  features: [
    "books",
    "loans",
    "inventory"
  ]
};

export default LibraryManagementFeature;
