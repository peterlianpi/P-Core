import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (
  name: string,
  file: string
): Promise<string | { error: string }> => {
  let link = "";

  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "church-member-management/profile-avatar",
      resource_type: "image",
    });
  
    
    link = result.secure_url;
  
    return link;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return { error: "Error uploading image to Cloudinary." };
  }
};
