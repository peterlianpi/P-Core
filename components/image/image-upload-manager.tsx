"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Upload, Eye, Loader2, Image as ImageIcon } from "lucide-react";
import { useFileImageUpload, useEntityImages, useImageDelete } from "@/hooks/use-image-upload";
import type { ImageOwnerType, ImageFeature } from "@/lib/schemas/image-schemas";

interface ImageUploadManagerProps {
  ownerType: ImageOwnerType;
  ownerId: string;
  feature?: ImageFeature;
  maxImages?: number;
  allowedFeatures?: ImageFeature[];
  className?: string;
}

export function ImageUploadManager({
  ownerType,
  ownerId,
  feature = "profile",
  maxImages = 5,
  allowedFeatures = ["profile", "cover", "gallery"],
  className,
}: ImageUploadManagerProps) {
  const [selectedFeature, setSelectedFeature] = useState<ImageFeature>(feature);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hooks
  const { uploadFile, isUploading } = useFileImageUpload();
  const { data: imagesData, isLoading: loadingImages } = useEntityImages(
    ownerType,
    ownerId,
    selectedFeature
  );
  const deleteImageMutation = useImageDelete();

  const images = imagesData?.success ? imagesData.data : [];

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await uploadFile(file, ownerType, ownerId, selectedFeature);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteImageMutation.mutateAsync({ imageId });
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const canUploadMore = images.length < maxImages;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Image Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Feature Selection */}
        <div className="space-y-2">
          <Label>Image Feature</Label>
          <Select
            value={selectedFeature}
            onValueChange={(value) => setSelectedFeature(value as ImageFeature)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {allowedFeatures.map((feat) => (
                <SelectItem key={feat} value={feat}>
                  {feat.charAt(0).toUpperCase() + feat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Upload Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Upload Images</Label>
            <Badge variant="secondary">
              {images.length} / {maxImages}
            </Badge>
          </div>

          {canUploadMore && (
            <div className="space-y-2">
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={isUploading}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
              />
              <p className="text-sm text-muted-foreground">
                Supported formats: JPEG, PNG, GIF, WebP. Max size: 10MB.
              </p>
            </div>
          )}

          {!canUploadMore && (
            <p className="text-sm text-amber-600">
              Maximum number of images reached. Delete some images to upload more.
            </p>
          )}
        </div>

        {/* Images Grid */}
        <div className="space-y-4">
          <Label>Current Images</Label>
          
          {loadingImages ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Loading images...</span>
            </div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={image.url}
                      alt={`${selectedFeature} image`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => window.open(image.url, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteImage(image.id)}
                      disabled={deleteImageMutation.isPending}
                    >
                      {deleteImageMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Image info */}
                  <div className="mt-2 text-xs text-muted-foreground">
                    <p className="truncate">Feature: {image.feature}</p>
                    <p>
                      Uploaded: {new Date(image.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No images uploaded yet</p>
              <p className="text-sm">Upload your first {selectedFeature} image above</p>
            </div>
          )}
        </div>

        {/* Upload Status */}
        {isUploading && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <span className="text-sm text-blue-700">Uploading image...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Simple image display component for showing a single image
interface ImageDisplayProps {
  ownerType: ImageOwnerType;
  ownerId: string;
  feature?: ImageFeature;
  className?: string;
  fallback?: string;
  alt?: string;
}

export function ImageDisplay({
  ownerType,
  ownerId,
  feature = "profile",
  className = "h-10 w-10 rounded-full",
  fallback = "/default-avatar.png",
  alt = "Image",
}: ImageDisplayProps) {
  const { data: imagesData } = useEntityImages(ownerType, ownerId, feature);
  
  const primaryImage = imagesData?.success ? imagesData.data[0] : null;
  const imageUrl = primaryImage?.url || fallback;

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={`object-cover ${className}`}
      onError={(e) => {
        (e.target as HTMLImageElement).src = fallback;
      }}
    />
  );
}

// Avatar component specifically for profile images
export function Avatar({
  ownerType,
  ownerId,
  size = "md",
  className,
}: {
  ownerType: ImageOwnerType;
  ownerId: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  return (
    <ImageDisplay
      ownerType={ownerType}
      ownerId={ownerId}
      feature="profile"
      className={`rounded-full ${sizeClasses[size]} ${className || ""}`}
      alt="Profile picture"
    />
  );
}
