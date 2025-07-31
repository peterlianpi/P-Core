// Re-export the standardized image upload hooks
export { 
  useImageUpload as useUploadImage,
  useImageDelete,
  useImageUpdate,
  useImages,
  useEntityImages,
  usePrimaryImage,
  useFileImageUpload,
  fileToBase64,
  imageKeys
} from "@/hooks/use-image-upload";
