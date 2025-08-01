import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image for settings (user profile images)
 * @param imageData - Base64 encoded image data
 * @returns Promise<string | { error: string }> - Returns image URL or error
 */
export async function uploadImageSettings(imageData: string): Promise<string | { error: string }> {
  try {
    if (!imageData || typeof imageData !== 'string') {
      return { error: "Invalid image data provided" };
    }
    if (!imageData.startsWith('data:image/')) {
      return { error: "Invalid image format. Must be a valid base64 data URL" };
    }
    const timestamp = Date.now();
    const publicId = `user_settings_${timestamp}`;
    const folder = "p-core/users/profile";
    try {
      await cloudinary.api.create_folder(folder);
    } catch (folderError: unknown) {
      const errorMessage = folderError instanceof Error ? folderError.message : String(folderError);
      if (!errorMessage.includes('already exists')) {
        console.warn(`Could not create folder ${folder}:`, errorMessage);
      }
    }
    const result = await cloudinary.uploader.upload(imageData, {
      folder,
      public_id: publicId,
      resource_type: "image",
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" },
        { quality: "auto" },
        { fetch_format: "auto" }
      ],
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      max_file_size: 5000000,
    });
    if (!result.secure_url) {
      return { error: "Failed to get image URL from Cloudinary" };
    }
    return result.secure_url;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error uploading image to Cloudinary:", errorMessage);
    if (errorMessage.includes('Invalid image file')) {
      return { error: "Invalid image file format" };
    } else if (errorMessage.includes('File size too large')) {
      return { error: "Image file is too large. Please use an image smaller than 5MB" };
    } else if (errorMessage.includes('Invalid credentials')) {
      return { error: "Image upload service is not properly configured" };
    } else {
      return { error: "Failed to upload image. Please try again." };
    }
  }
}

/**
 * Delete image from Cloudinary
 * @param imageUrl - Full Cloudinary image URL
 * @returns Promise<boolean> - Success/failure status
 */
export async function deleteImageSettings(imageUrl: string): Promise<boolean> {
  try {
    if (!imageUrl || typeof imageUrl !== 'string') {
      return false;
    }
    const urlParts = imageUrl.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    const publicIdWithFormat = lastPart.split('.')[0];
    const uploadIndex = urlParts.indexOf('upload');
    if (uploadIndex === -1) {
      console.warn('Invalid Cloudinary URL format:', imageUrl);
      return false;
    }
    const pathParts = urlParts.slice(uploadIndex + 2);
    pathParts[pathParts.length - 1] = publicIdWithFormat;
    const fullPublicId = pathParts.join('/');
    const result = await cloudinary.uploader.destroy(fullPublicId);
    return result.result === 'ok';
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error deleting image from Cloudinary:", errorMessage);
    return false;
  }
}
