"use client";

import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input"; // Adjust as needed
import { UseFormRegisterReturn } from "react-hook-form";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/use-current-user";

function ImageUpload({
  fileRef,
  isPending,
}: {
  fileRef: UseFormRegisterReturn<"image">;
  isPending?: boolean;
}) {
  const user = useCurrentUser();
  const [imgSrc, setImgSrc] = useState<string | null>(user?.image || null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgSrc(url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-4 gap-4">
      {imgSrc && (
        <Image
          src={!imgSrc ? "/image/profile.png" : imgSrc}
          // Use a placeholder image if imgSrc is null
          className="rounded-xl items-center"
          width={100}
          objectFit="cover"
          height={100}
          alt="Preview"
        />
      )}
      <Input
        {...fileRef}
        onChange={handleImageChange}
        disabled={isPending}
        accept="image/*"
        type="file"
      />
    </div>
  );
}

export default ImageUpload;
