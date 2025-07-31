import { useRef, useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { UseFormRegisterReturn } from "react-hook-form";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

/**
 * ImageUpload component for uploading and previewing user images.
 * - Shows current user image or selected file preview.
 * - Uses Tailwind CSS and ShadCN UI.
 */
function ImageUpload({
  fileRef,
  isPending = false,
  size = "md",
  disabled = false,
}: {
  fileRef: UseFormRegisterReturn<"image">;
  isPending?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}) {
  const user = useCurrentUser();
  // State to hold the selected image preview URL
  const [selectedImage, setSelectedImage] = useState<string | null>(user?.image || null);
  // Ref for the file input to trigger it programmatically
  const inputRef = useRef<HTMLInputElement>(null);

  // Tailwind size classes for different avatar/button/icon sizes
  const sizeClasses = {
    sm: { avatar: "h-16 w-16", button: "h-6 w-6 -bottom-1 -right-1", icon: "h-3 w-3" },
    md: { avatar: "h-20 w-20", button: "h-7 w-7 -bottom-1 -right-1", icon: "h-3 w-3" },
    lg: { avatar: "h-24 w-24", button: "h-8 w-8 -bottom-2 -right-2", icon: "h-4 w-4" },
  };

  // Handle file input change and preview image
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  // Trigger file input click
  const triggerImageUpload = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  // Get user initials for avatar fallback
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("") || "U";

  // Fallback UI if user is not loaded
  if (!user) return <div>Loading...</div>;

  return (
    <div className="relative inline-block">
      <Avatar className={sizeClasses[size].avatar}>
        <AvatarImage src={selectedImage || "/placeholder.svg"} alt={user?.name || "User"} />
        <AvatarFallback className={size === "lg" ? "text-lg" : "text-sm"}>{initials}</AvatarFallback>
      </Avatar>
      <Button
        type="button"
        size="icon"
        variant="outline"
        disabled={disabled}
        className={`absolute ${sizeClasses[size].button} rounded-full bg-background hover:bg-accent transition-colors`}
        onClick={triggerImageUpload}
      >
        <Camera className={sizeClasses[size].icon} />
      </Button>
      <Input
        {...fileRef}
        ref={inputRef}
        type="file"
        onChange={handleImageChange}
        className="hidden"
        disabled={isPending}
        accept="image/*"
      />
    </div>
  );
}

export default ImageUpload;
