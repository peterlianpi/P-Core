/* eslint-disable @next/next/no-img-element */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { toast } from "sonner";
import { useUploadImage } from "../api/use-upload-image";

type Props = {
  fileRef: any;
  isClient: boolean;
  imageUrl: string | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
};

const CustomUploadImagePage = ({
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

          uploadImageMutation.mutate(
            { image: fileLink },
            {
              onSuccess: (response: any) => {
                const link = response?.link; // Assuming the backend returns { link: "URL" }
                setImageUrl(link);
                toast.success("Image uploaded successfully!");
              },
              onError: (error) => {
                console.error(error);
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
    <section className="md:col-span-1 space-y-2 flex flex-col items-center rounded-md">
      <div className="w-24 h-24 border border-emerald-600 rounded-md overflow-hidden ">
        <img
          src={imageUrl ? imageUrl : "/image/profile.png"}
          alt="Avatar"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="w-20">
        <Input
          {...fileRef}
          disabled={isPending}
          accept="image/*"
          type="file"
          onChange={handleUploadImage}
        />
      </div>
    </section>
  );
};

export default CustomUploadImagePage;
