import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define schema for image upload
const formUploadSchema = z.object({
  image: z.string().nonempty("Image is required"),
  type: z.enum(["user", "member", "material", "team"]).default("user"),
});

// Define schema for deleting image
const formDeleteSchema = z.object({
  public_id: z.string().nonempty("Public ID is required"),
});

// Helper to get folder based on type
const getFolder = (type: string) => {
  switch (type) {
    case "user":
      return "music-school-management/users-photo";
    case "member":
      return "music-school-management/members-photo";
    case "material":
      return "music-school-management/material-photo";
    case "team":
      return "music-school-management/teams-photo";
    default:
      return "music-school-management/others";
  }
};

const app = new Hono()

  // ✅ Upload Image
  .post("/", zValidator("json", formUploadSchema), async (c) => {
    const { image, type } = c.req.valid("json");

    try {
      const folder = getFolder(type);
      const result = await cloudinary.uploader.upload(image, {
        folder,
        resource_type: "image",
      });

      return c.json(
        {
          link: result.secure_url,
          public_id: result.public_id,
        },
        201
      );
    } catch (error) {
      console.error("Upload error:", error);
      return c.json({ error: "Error uploading image." }, 400);
    }
  })

  // ✅ Delete Image
  .delete("/", zValidator("json", formDeleteSchema), async (c) => {
    const { public_id } = c.req.valid("json");

    try {
      const res = await cloudinary.uploader.destroy(public_id);

      if (res.result !== "ok") {
        return c.json({ error: "Failed to delete image." }, 400);
      }

      return c.json({ success: true }, 200);
    } catch (error) {
      console.error("Delete error:", error);
      return c.json({ error: "Error deleting image." }, 500);
    }
  });

export default app;
