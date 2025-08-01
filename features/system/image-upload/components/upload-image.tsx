/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { useUploadImage } from "../api/use-upload-image";
import type { ImageOwnerType } from "@/lib/schemas/image-schemas";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";

// Use the canonical ImageOwnerType for type safety and consistency
// This should match the backend and shared schema (e.g., "USER", "MEMBER", etc.)
type Props = {
  ownerId: string;
  ownerType: ImageOwnerType;
  feature: "profile" | "cover" | "gallery" | "thumbnail" | "logo";
  canEdit?: boolean;
  fileRef: any;
  isClient: boolean;
  orgId?: string;
  imageUrl: string | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  className?: string; // For parent-level control
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
  orgId,
  className = "",
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const uploadImageMutation = useUploadImage();
  const inputRef = useRef<HTMLInputElement>(null);
  const user = useCurrentUser();

  // Handle file input change and preview image
  const handleUploadImage = async (e: any) => {
    e.preventDefault();
    if (!e.target.files) {
      throw new Error("No file selected for profile");
    }
    const file = e.target.files[0];
    startTransition(async () => {
      let fileLink = "";
      if (isClient) {
        const reader = new FileReader();
        reader.onload = async () => {
          fileLink = reader.result as string;
          uploadImageMutation.mutate(
            { imageData: fileLink, ownerType, ownerId, feature, orgId },
            {
              onSuccess: (response) => {
                const link = response?.data?.url;
                setImageUrl(link);
                toast.success("Image uploaded successfully!");
              },
              onError: (error) => {
                toast.error("Error uploading image");
              },
            }
          );
        };
        reader.readAsDataURL(file);
      }
    });
  };

  // Trigger file input click
  const triggerImageUpload = () => {
    inputRef.current?.click();
  };

  // Get initials for avatar fallback from current user
  const getInitials = () => {
    if (user?.name) {
      return user.name.split(" ").map((n) => n[0]).join("") || "U";
    }
    return "U";
  };

  return (
    <section className={`w-full flex flex-col items-center rounded-md ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Responsive avatar size: larger on desktop */}
        <Avatar className="h-24 w-24 md:h-32 md:w-32 border border-emerald-600 shadow-md">
          <AvatarImage src={imageUrl || "/image/profile.png"} alt={user?.name || "Avatar"} />
          <AvatarFallback className="text-lg md:text-2xl">{getInitials()}</AvatarFallback>
        </Avatar>
        {/* Camera icon as button, absolutely positioned bottom-right over avatar */}
        {canEdit && (
          <Button
            type="button"
            onClick={triggerImageUpload}
            className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-background rounded-full p-2 shadow hover:bg-accent transition-colors border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            size="icon"
            variant="outline"
            disabled={isPending}
            aria-label="Change profile image"
          >
            <Camera className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
        )}
      </div>
      {/* Hidden file input */}
      <Input
        {...fileRef}
        ref={inputRef}
        disabled={isPending || !canEdit}
        accept="image/*"
        type="file"
        onChange={handleUploadImage}
        className="hidden"
      />
    </section>
  );
};

export default CustomUploadImagePage;
