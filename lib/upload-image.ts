/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/imageUpload.ts
import { uploadImage } from "@/data/upload-image-cloudinary"; // Import the uploadImage function

export const handleImageUpload = async (
  name: string,
  imageFile: any
): Promise<string> => {
  let imageUrl = ""; // Default value for imageUrl

  // If the request contains an image, upload it to Cloudinary
  if (imageFile) {
    try {
      const fileLink = await uploadImage(imageFile);

      // Check if the result is a string (successful upload)
      if (typeof fileLink === "string") {
        imageUrl = fileLink; // Use the image URL if upload is successful
      } else {
        throw new Error("Error uploading image");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      // You can either throw an error or return an empty string, depending on your use case.
      imageUrl = ""; // Return an empty string if upload fails
    }
  }

  return imageUrl; // Always return a string (empty if no image or upload fails)
};
