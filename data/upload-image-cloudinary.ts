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
    // Validate input
    if (!imageData || typeof imageData !== 'string') {
      return { error: "Invalid image data provided" };
    }

    // Check if it's a valid base64 data URL
    if (!imageData.startsWith('data:image/')) {
      return { error: "Invalid image format. Must be a valid base64 data URL" };
    }

    // Generate unique public ID for settings images
    const timestamp = Date.now();
    const publicId = `user_settings_${timestamp}`;
    const folder = "p-core/users/profile";

    // Ensure folder exists
    try {
      await cloudinary.api.create_folder(folder);
    } catch (folderError: unknown) {
      // Folder might already exist - continue
      const errorMessage = folderError instanceof Error ? folderError.message : String(folderError);
      if (!errorMessage.includes('already exists')) {
        console.warn(`Could not create folder ${folder}:`, errorMessage);
      }
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(imageData, {
      folder,
      public_id: publicId,
      resource_type: "image",
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" }, // Profile image optimization
        { quality: "auto" },
        { fetch_format: "auto" }
      ],
      // Additional options for profile images
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      max_file_size: 5000000, // 5MB limit
    });

    if (!result.secure_url) {
      return { error: "Failed to get image URL from Cloudinary" };
    }

    return result.secure_url;

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error uploading image to Cloudinary:", errorMessage);
    
    // Return user-friendly error messages
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

    // Extract public ID from Cloudinary URL
    // URL format: https://res.cloudinary.com/[cloud]/image/upload/v[version]/[folder]/[public_id].[format]
    const urlParts = imageUrl.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    const publicIdWithFormat = lastPart.split('.')[0]; // Remove file extension
    
    // Find the version number and construct the full public ID path
    const uploadIndex = urlParts.indexOf('upload');
    if (uploadIndex === -1) {
      console.warn('Invalid Cloudinary URL format:', imageUrl);
      return false;
    }

    // Get everything after 'upload/v[version]/' 
    const pathParts = urlParts.slice(uploadIndex + 2); // Skip 'upload' and version
    pathParts[pathParts.length - 1] = publicIdWithFormat; // Replace last part with cleaned public ID
    const fullPublicId = pathParts.join('/');

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(fullPublicId);
    
    return result.result === 'ok';

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error deleting image from Cloudinary:", errorMessage);
    return false;
  }
}
