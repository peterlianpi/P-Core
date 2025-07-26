import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { getOptionalOrganizationContext, optionalPermission } from "@/lib/security/tenant";
import { 
  ImageUploadSchema,
  ImageDeleteSchema,
  ImageListSchema
} from "@/schemas/image-schemas";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to get Cloudinary folder based on owner type and feature
const getCloudinaryFolder = (ownerType: string, feature: string = "profile", orgId?: string) => {
  const baseFolder = "p-core";
  const orgFolder = orgId ? `org-${orgId}` : "global";
  
  switch (ownerType.toLowerCase()) {
    case "user":
      return `${baseFolder}/${orgFolder}/users/${feature}`;
    case "organization":
      return `${baseFolder}/organizations/${feature}`;
    case "student":
      return `${baseFolder}/${orgFolder}/students/${feature}`;
    case "member":
      return `${baseFolder}/${orgFolder}/members/${feature}`;
    case "book":
      return `${baseFolder}/${orgFolder}/books/${feature}`;
    case "course":
      return `${baseFolder}/${orgFolder}/courses/${feature}`;
    case "lesson":
      return `${baseFolder}/${orgFolder}/lessons/${feature}`;
    case "schedule":
      return `${baseFolder}/${orgFolder}/schedules/${feature}`;
    default:
      return `${baseFolder}/${orgFolder}/others/${feature}`;
  }
};

// Helper to generate image public ID
const generatePublicId = (ownerType: string, ownerId: string, feature: string) => {
  const timestamp = Date.now();
  return `${ownerType.toLowerCase()}_${ownerId}_${feature}_${timestamp}`;
};

const app = new Hono()
  // ✅ Upload Image
  .post(
    "/",
    zValidator("json", ImageUploadSchema),
    optionalPermission("write:images"),
    async (c) => {
      try {
        const { imageData, ownerType, ownerId, feature } = c.req.valid("json");
        const orgContext = getOptionalOrganizationContext(c);

        // Generate folder and public ID
        const folder = getCloudinaryFolder(ownerType, feature, orgContext?.organizationId);
        const publicId = generatePublicId(ownerType, ownerId, feature);

        // Ensure Cloudinary folder exists (create if needed)
        try {
          // Create nested folder structure step by step
          const folderParts = folder.split('/');
          let currentPath = '';
          
          for (const part of folderParts) {
          currentPath = currentPath ? `${currentPath}/${part}` : part;
          try {
            await cloudinary.api.create_folder(currentPath);
          } catch (folderError: unknown) {
            // Folder might already exist - that's fine
            const errorMessage = folderError instanceof Error ? folderError.message : String(folderError);
            if (!errorMessage.includes('already exists') && !errorMessage.includes('Bad Request')) {
            console.warn(`Could not create folder ${currentPath}:`, errorMessage);
          }
          }
          }
          } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn(`Failed to create folder structure for ${folder}:`, errorMessage);
        }

        // Upload to Cloudinary
        const cloudinaryResult = await cloudinary.uploader.upload(imageData, {
          folder,
          public_id: publicId,
          resource_type: "image",
          transformation: [
            { width: 800, height: 600, crop: "limit" }, // Optimize size
            { quality: "auto" }, // Auto quality
            { fetch_format: "auto" } // Auto format (WebP, etc.)
          ]
        });

        // Save image record to database
        const imageRecord = await prisma.image.create({
          data: {
            publicId: cloudinaryResult.public_id,
            url: cloudinaryResult.secure_url,
            folder,
            feature,
            ownerId,
            ownerType: ownerType as "USER" | "ORGANIZATION" | "STUDENT" | "MEMBER" | "BOOK" | "OTHER",
            orgId: orgContext?.organizationId || null,
          }
        });

        return c.json({
          success: true,
          data: {
            id: imageRecord.id,
            url: imageRecord.url,
            publicId: imageRecord.publicId,
            feature: imageRecord.feature,
          }
        }, 201);

      } catch (error) {
        console.error("Image upload error:", error);
        return c.json({ 
          success: false,
          error: "Failed to upload image" 
        }, 500);
      }
    }
  )

  // ✅ Get Images
  .get(
    "/",
    zValidator("query", ImageListSchema),
    optionalPermission("read:images"),
    async (c) => {
      try {
        const { ownerType, ownerId, feature } = c.req.valid("query");
        const orgContext = getOptionalOrganizationContext(c);

        const where: Record<string, unknown> = {};
        
        // Only filter by org if we have org context
        if (orgContext?.organizationId) {
          where.orgId = orgContext.organizationId;
        }

        if (ownerType) where.ownerType = ownerType;
        if (ownerId) where.ownerId = ownerId;
        if (feature) where.feature = feature;

        const images = await prisma.image.findMany({
          where,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            url: true,
            publicId: true,
            feature: true,
            ownerType: true,
            ownerId: true,
            createdAt: true,
          }
        });

        return c.json({
          success: true,
          data: images
        });

      } catch (error) {
        console.error("Get images error:", error);
        return c.json({ 
          success: false,
          error: "Failed to fetch images" 
        }, 500);
      }
    }
  )

  // ✅ Delete Image
  .delete(
    "/",
    zValidator("json", ImageDeleteSchema),
    optionalPermission("delete:images"),
    async (c) => {
      try {
        const { imageId } = c.req.valid("json");
        const orgContext = getOptionalOrganizationContext(c);

        // Find image record
        const where: Record<string, unknown> = { id: imageId };
        if (orgContext?.organizationId) {
          where.orgId = orgContext.organizationId;
        }
        
        const imageRecord = await prisma.image.findFirst({
          where
        });

        if (!imageRecord) {
          return c.json({ 
            success: false,
            error: "Image not found" 
          }, 404);
        }

        // Delete from Cloudinary
        const cloudinaryResult = await cloudinary.uploader.destroy(imageRecord.publicId);

        if (cloudinaryResult.result !== "ok") {
          console.warn("Cloudinary deletion failed:", cloudinaryResult);
          // Continue with database deletion even if Cloudinary fails
        }

        // Delete from database
        await prisma.image.delete({
          where: { id: imageId }
        });

        return c.json({
          success: true,
          message: "Image deleted successfully"
        });

      } catch (error) {
        console.error("Image deletion error:", error);
        return c.json({ 
          success: false,
          error: "Failed to delete image" 
        }, 500);
      }
    }
  )

  // ✅ Update Image (replace existing)
  .put(
    "/:imageId",
    zValidator("param", z.object({ imageId: z.string() })),
    zValidator("json", z.object({ 
      imageData: z.string().min(1, "Image data is required"),
      feature: z.string().optional()
    })),
    async (c) => {
      try {
        const { imageId } = c.req.valid("param");
        const { imageData, feature } = c.req.valid("json");
        const orgContext = getOptionalOrganizationContext(c);

        // Find existing image
        const where: Record<string, unknown> = { id: imageId };
        if (orgContext?.organizationId) {
          where.orgId = orgContext.organizationId;
        }
        
        const existingImage = await prisma.image.findFirst({
          where
        });

        if (!existingImage) {
          return c.json({ 
            success: false,
            error: "Image not found" 
          }, 404);
        }

        // Delete old image from Cloudinary
        await cloudinary.uploader.destroy(existingImage.publicId);

        // Upload new image
        const folder = getCloudinaryFolder(existingImage.ownerType, feature || existingImage.feature);
        const publicId = generatePublicId(existingImage.ownerType, existingImage.ownerId, feature || existingImage.feature);

        const cloudinaryResult = await cloudinary.uploader.upload(imageData, {
          folder,
          public_id: publicId,
          resource_type: "image",
          transformation: [
            { width: 800, height: 600, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" }
          ]
        });

        // Update database record
        const updatedImage = await prisma.image.update({
          where: { id: imageId },
          data: {
            publicId: cloudinaryResult.public_id,
            url: cloudinaryResult.secure_url,
            folder,
            ...(feature && { feature }),
          }
        });

        return c.json({
          success: true,
          data: {
            id: updatedImage.id,
            url: updatedImage.url,
            publicId: updatedImage.publicId,
            feature: updatedImage.feature,
          }
        });

      } catch (error) {
        console.error("Image update error:", error);
        return c.json({ 
          success: false,
          error: "Failed to update image" 
        }, 500);
      }
    }
  );

export default app;
