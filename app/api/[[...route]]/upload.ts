import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { uploadImage } from "@/data/upload-image-cloudinary";
import { handleError } from "@/lib/error-handler";
import { 
  organizationSecurityMiddleware, 
  getOrganizationContext,
  requirePermission 
} from "@/lib/security/tenant";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validation schemas
const uploadImageSchema = z.object({
  image: z.string().min(1, "Image data is required"),
  folder: z.string().optional(),
  filename: z.string().optional(),
});

const uploadFileSchema = z.object({
  file: z.string().min(1, "File data is required"),
  folder: z.string().optional(),
  filename: z.string().optional(),
  type: z.enum(["image", "document", "video", "audio"]).default("image"),
});

const app = new Hono()
  // Apply security middleware
  .use("*", organizationSecurityMiddleware)

  // POST /upload - Upload an image
  .post(
    "/",
    zValidator("json", uploadImageSchema),
    requirePermission("create:uploads"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const { image, folder, filename } = c.req.valid("json");

        // Validate image data format
        if (!image.startsWith('data:image/')) {
          return c.json({ error: 'Invalid image format. Must be base64 data URL' }, 400);
        }

        // Call the upload function with additional context
        const uploadOptions = {
          folder: folder || `org-${orgContext.organizationId}`,
          public_id: filename,
          resource_type: 'image' as const,
          transformation: {
            quality: 'auto:best',
            fetch_format: 'auto',
          },
        };

        const fileLink = await uploadImage(image, uploadOptions);

        if (typeof fileLink === "string") {
          return c.json({ 
            url: fileLink,
            folder: uploadOptions.folder,
            success: true 
          }, 201);
        } else if (fileLink && 'error' in fileLink) {
          return c.json({ error: fileLink.error }, 400);
        } else {
          return c.json({ error: 'Upload failed with unknown error' }, 500);
        }

      } catch (error) {
        return handleError(c, error, 500, 'IMAGE_UPLOAD_ERROR');
      }
    }
  )

  // POST /upload/file - Upload any file type
  .post(
    "/file",
    zValidator("json", uploadFileSchema),
    requirePermission("create:uploads"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const { file, folder, filename, type } = c.req.valid("json");

        // Validate file data format based on type
        const validPrefixes = {
          image: ['data:image/'],
          document: ['data:application/pdf', 'data:application/msword', 'data:text/'],
          video: ['data:video/'],
          audio: ['data:audio/'],
        };

        const isValidType = validPrefixes[type].some(prefix => file.startsWith(prefix));
        if (!isValidType) {
          return c.json({ 
            error: `Invalid file format for type ${type}`,
            expectedFormats: validPrefixes[type] 
          }, 400);
        }

        // Upload with appropriate resource type
        const uploadOptions = {
          folder: folder || `org-${orgContext.organizationId}/${type}s`,
          public_id: filename,
          resource_type: type === 'image' ? 'image' : 'raw' as const,
        };

        const fileLink = await uploadImage(file, uploadOptions);

        if (typeof fileLink === "string") {
          return c.json({ 
            url: fileLink,
            type,
            folder: uploadOptions.folder,
            success: true 
          }, 201);
        } else if (fileLink && 'error' in fileLink) {
          return c.json({ error: fileLink.error }, 400);
        } else {
          return c.json({ error: 'Upload failed with unknown error' }, 500);
        }

      } catch (error) {
        return handleError(c, error, 500, 'FILE_UPLOAD_ERROR');
      }
    }
  )

  // GET /upload/signed-url - Get signed URL for direct upload
  .get(
    "/signed-url",
    zValidator("query", z.object({
      filename: z.string(),
      type: z.enum(["image", "document", "video", "audio"]).default("image"),
    })),
    requirePermission("create:uploads"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const { filename, type } = c.req.valid("query");

        const timestamp = Math.round(new Date().getTime() / 1000);
        const folder = `org-${orgContext.organizationId}/${type}s`;

        const signature = cloudinary.utils.api_sign_request({
          timestamp,
          folder,
          public_id: filename,
          resource_type: type === 'image' ? 'image' : 'raw',
        }, process.env.CLOUDINARY_API_SECRET!);

        return c.json({
          signature,
          timestamp,
          folder,
          public_id: filename,
          cloud_name: process.env.CLOUDINARY_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/${type === 'image' ? 'image' : 'raw'}/upload`,
        });

      } catch (error) {
        return handleError(c, error, 500, 'SIGNED_URL_ERROR');
      }
    }
  );

export default app;
