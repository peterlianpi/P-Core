// Image Upload System Feature
// Export all image upload components and utilities

// Component exports
export * from "./components/upload-image-show";

// Default export for dynamic imports
const ImageUploadFeature = {
  name: "Image Upload",
  version: "1.0.0",
  category: "system" as const,
  critical: false
};

export default ImageUploadFeature;
