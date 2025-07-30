/* eslint-disable @next/next/no-img-element */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { toast } from "sonner";
import { useUploadImage } from "../api/use-upload-image";
import type { ImageOwnerType } from "@/lib/schemas/image-schemas";

// Use the canonical ImageOwnerType for type safety and consistency
// This should match the backend and shared schema (e.g., "USER", "MEMBER", etc.)
type Props = {
  ownerId: string;
  ownerType: ImageOwnerType; // Now required for type safety
  feature: "profile" | "cover" | "gallery" | "thumbnail" | "logo"; // Required for image upload
  canEdit?: boolean;
  fileRef: any;
  isClient: boolean;
  imageUrl: string | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
};

const CustomUploadImagePage = ({
  ownerId,
  feature,
  ownerType,
  canEdit,
  fileRef,
  isClient,
  imageUrl,
  setImageUrl,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const uploadImageMutation = useUploadImage();

  const handleUploadImage = async (e: any) => {
    e.preventDefault();

    if (!e.target.files) {
      throw new Error("No file selected for profile");
    }
    const file = e.target.files[0];
    startTransition(async () => {
      let fileLink = "";
      // Handle image upload if there's an image in the form
      if (isClient) {
        const reader = new FileReader();
        reader.onload = async () => {
          fileLink = reader.result as string;

          // Log the payload before mutation
          console.log("[FRONTEND] Uploading image with:", { imageData: fileLink, ownerType, ownerId, feature });
          // Pass the required 'feature' property to the mutation
          uploadImageMutation.mutate(
            { imageData: fileLink, ownerType, ownerId, feature },
            {
              onSuccess: (response) => {
                const link = response?.data?.url; // Assuming the backend returns { data: { url: "URL" } }
                console.log("[FRONTEND] Upload success response:", response);
                setImageUrl(link);
                console.log("[FRONTEND] image link:", link);
                toast.success("Image uploaded successfully!");
              },
              onError: (error) => {
                console.error("[FRONTEND] Upload error:", error);
                toast.error("Error uploading image");
              },
            }
          );
        };

        reader.readAsDataURL(file);
      }
    });
  };
  return (
    <section className="w-full md:col-span-1 space-y-2 flex flex-col items-center rounded-md">
      <div className="w-24 h-24 border border-emerald-600 rounded-md overflow-hidden ">
        <img
          src={imageUrl ? imageUrl : "/image/profile.png"}
          alt="Avatar"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="w-56">
        <Input
          {...fileRef}
          disabled={isPending || !canEdit}
          accept="image/*"
          type="file"
          onChange={handleUploadImage}
        />
      </div>
    </section>
  );
};

export default CustomUploadImagePage;
