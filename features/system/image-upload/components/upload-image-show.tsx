import { useRef, useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { UseFormRegisterReturn } from "react-hook-form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Camera } from "lucide-react";

/**
 * ImageUpload component using ShadCN UI Avatar for profile image selection and preview.
 * - Shows current or selected image in an Avatar.
 * - Camera icon as a button at the bottom-right of the avatar.
 * - Clicking the camera icon opens the file input for image selection.
 * - Uses Tailwind CSS and ShadCN UI for styling and positioning.
 */
function ImageUpload({
  fileRef,
  isPending,
}: {
  fileRef: UseFormRegisterReturn<"image">;
  isPending?: boolean;
}) {
  const user = useCurrentUser();
  const [imgSrc, setImgSrc] = useState<string | null>(user?.image || null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle file input change and preview image
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgSrc(url);
    }
  };

  // Trigger file input click
  const triggerImageUpload = () => {
    inputRef.current?.click();
  };

  // Get user initials for avatar fallback
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("") || "U";

  return (
    <div className="relative flex flex-col items-center justify-center mb-4 gap-4">
      {/* Avatar with image or fallback initials */}
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={imgSrc || "/image/profile.png"} alt={user?.name || "User"} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        {/* Camera icon as button, absolutely positioned bottom-right over avatar */}
        <button
          type="button"
          onClick={triggerImageUpload}
          className="absolute bottom-1 right-1 bg-background rounded-full p-2 shadow hover:bg-accent transition-colors border border-gray-200"
          aria-label="Change profile image"
          disabled={isPending}
        >
          <Camera className="h-5 w-5" />
        </button>
      </div>
      {/* Hidden file input */}
      <Input
        {...fileRef}
        ref={inputRef}
        onChange={handleImageChange}
        disabled={isPending}
        className="hidden"
        accept="image/*"
        type="file"
      />
    </div>
  );
}

export default ImageUpload;
