import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { uploadImage } from "@/data/upload-image-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const formUploadSchema = z.object({
  image: z.string().nonempty("Image is required"), // Validate non-empty string
});

const app = new Hono()

  // POST: Upload an image
  .post("/", zValidator("json", formUploadSchema), async (c) => {
    const values = c.req.valid("json");
    let link = "";

    try {
      if (typeof values.image === "string" && values.image.trim() !== "") {
        // Call the upload function
        const fileLink = await uploadImage(values.image);

        if (typeof fileLink === "string") {
          link = fileLink; // Success: Assign the file link
        } else if (fileLink && fileLink.error) {
          return c.json({ error: fileLink.error }, 400); // Error from uploadImage
        }
      } else {
        return c.json({ error: "Invalid image data" }, 400); // Handle invalid image input
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return c.json({ error: "Error uploading image." }, 400);
    }

    return c.json({ link }, 201); // Success response
  });

export default app;
