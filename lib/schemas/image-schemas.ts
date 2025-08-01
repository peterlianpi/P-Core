// Comprehensive Zod schemas for image-related validations
import { z } from "zod";

// Image owner types enum schema
export const ImageOwnerTypeSchema = z.enum([
  "USER",
  "ORGANIZATION", 
  "STUDENT",
  "MEMBER",
  "BOOK",
  "OTHER"
]);

// Image features enum schema
export const ImageFeatureSchema = z.enum([
  "profile",
  "cover",
  "gallery", 
  "thumbnail",
  "logo"
]);

// Base64 image data validation
export const Base64ImageSchema = z
  .string()
  .min(1, "Image data is required")
  .refine(
    (data) => {
      // Check if it's a valid base64 data URL for images
      const imageDataUrlPattern = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/;
      return imageDataUrlPattern.test(data);
    },
    {
      message: "Invalid image format. Must be a base64 data URL for JPEG, PNG, GIF, or WebP",
    }
  )
  .refine(
    (data) => {
      try {
        // Extract base64 part and check if it's valid
        const base64Part = data.split(',')[1];
        if (!base64Part) return false;
        
        // Check if base64 is valid
        const decoded = atob(base64Part);
        return decoded.length > 0;
      } catch {
        return false;
      }
    },
    {
      message: "Invalid base64 encoding",
    }
  )
  .refine(
    (data) => {
      try {
        // Check file size (limit to 10MB)
        const base64Part = data.split(',')[1];
        const sizeInBytes = (base64Part.length * 3) / 4;
        const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
        return sizeInBytes <= maxSizeInBytes;
      } catch {
        return false;
      }
    },
    {
      message: "Image size must be less than 10MB",
    }
  );

// Image upload schema
export const ImageUploadSchema = z.object({
  imageData: Base64ImageSchema,
  ownerType: ImageOwnerTypeSchema,
  ownerId: z.string().min(1, "Owner ID is required"),
  feature: ImageFeatureSchema.optional().default("profile"),
  alt: z.string().optional(), // Alt text for accessibility
  description: z.string().optional(),
  orgId:z.string().optional()
});

// Image update schema
export const ImageUpdateSchema = z.object({
  imageData: Base64ImageSchema.optional(),
  feature: ImageFeatureSchema.optional(),
  alt: z.string().optional(),
  description: z.string().optional(),
});

// Image deletion schema
export const ImageDeleteSchema = z.object({
  imageId: z.string().min(1, "Image ID is required"),
});

// Batch image deletion schema
export const BatchImageDeleteSchema = z.object({
  imageIds: z.array(z.string().min(1)).min(1, "At least one image ID is required"),
});

// Image list/query schema
export const ImageListSchema = z.object({
  ownerType: ImageOwnerTypeSchema.optional(),
  ownerId: z.string().optional(),
  feature: ImageFeatureSchema.optional(),
  page: z.string().optional().default("1").transform(Number),
  limit: z.string().optional().default("20").transform(Number),
});

// Image response schema (for API responses)
export const ImageResponseSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  publicId: z.string(),
  feature: ImageFeatureSchema,
  ownerType: ImageOwnerTypeSchema,
  ownerId: z.string(),
  alt: z.string().optional(),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Standardized API response schemas
export const ImageUploadResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    id: z.string(),
    url: z.string().url(),
    publicId: z.string(),
    feature: ImageFeatureSchema,
  }),
});

export const ImageListResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(ImageResponseSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    pages: z.number(),
  }).optional(),
});

export const ImageDeleteResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
});

// Error response schema
export const ImageErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  details: z.any().optional(),
});

// Combined response schema (success or error)
export const ImageAPIResponseSchema = z.union([
  ImageUploadResponseSchema,
  ImageListResponseSchema,
  ImageDeleteResponseSchema,
  ImageErrorResponseSchema,
]);

// User profile image schemas
export const UserImageUploadSchema = ImageUploadSchema.extend({
  ownerType: z.literal("USER"),
  feature: z.enum(["profile", "cover"]).optional().default("profile"),
});

// Organization image schemas
export const OrganizationImageUploadSchema = ImageUploadSchema.extend({
  ownerType: z.literal("ORGANIZATION"),
  feature: z.enum(["logo", "cover", "gallery"]).optional().default("logo"),
});

// Student image schemas
export const StudentImageUploadSchema = ImageUploadSchema.extend({
  ownerType: z.literal("STUDENT"),
  feature: z.enum(["profile", "gallery"]).optional().default("profile"),
});

// Member image schemas
export const MemberImageUploadSchema = ImageUploadSchema.extend({
  ownerType: z.literal("MEMBER"),
  feature: z.enum(["profile", "gallery"]).optional().default("profile"),
});

// Book image schemas
export const BookImageUploadSchema = ImageUploadSchema.extend({
  ownerType: z.literal("BOOK"),
  feature: z.enum(["cover", "gallery", "thumbnail"]).optional().default("cover"),
});

// Utility function to get appropriate schema based on owner type
export function getImageSchemaForOwnerType(ownerType: string) {
  switch (ownerType.toUpperCase()) {
    case "USER":
      return UserImageUploadSchema;
    case "ORGANIZATION":
      return OrganizationImageUploadSchema;
    case "STUDENT":
      return StudentImageUploadSchema;
    case "MEMBER":
      return MemberImageUploadSchema;
    case "BOOK":
      return BookImageUploadSchema;
    default:
      return ImageUploadSchema;
  }
}

// Type exports for TypeScript
export type ImageOwnerType = z.infer<typeof ImageOwnerTypeSchema>;
export type ImageFeature = z.infer<typeof ImageFeatureSchema>;
export type ImageUploadInput = z.infer<typeof ImageUploadSchema>;
export type ImageUpdateInput = z.infer<typeof ImageUpdateSchema>;
export type ImageDeleteInput = z.infer<typeof ImageDeleteSchema>;
export type ImageListInput = z.infer<typeof ImageListSchema>;
export type ImageResponse = z.infer<typeof ImageResponseSchema>;
export type ImageUploadResponse = z.infer<typeof ImageUploadResponseSchema>;
export type ImageListResponse = z.infer<typeof ImageListResponseSchema>;
export type ImageDeleteResponse = z.infer<typeof ImageDeleteResponseSchema>;
export type ImageErrorResponse = z.infer<typeof ImageErrorResponseSchema>;
