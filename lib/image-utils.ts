// Image utility functions for standardized image handling across all models
import { prisma } from "@/lib/db/client";

// Standard image field name for all models
export const IMAGE_FIELD = "imageUrl" as const;

// Image owner types matching Prisma enum
export type ImageOwnerType = "USER" | "ORGANIZATION" | "STUDENT" | "MEMBER" | "BOOK" | "OTHER";

// Standard image features
export const IMAGE_FEATURES = {
  PROFILE: "profile",
  COVER: "cover", 
  GALLERY: "gallery",
  THUMBNAIL: "thumbnail",
  LOGO: "logo",
} as const;

export type ImageFeature = typeof IMAGE_FEATURES[keyof typeof IMAGE_FEATURES];

// Get primary image for an entity
export async function getPrimaryImage(
  ownerType: ImageOwnerType,
  ownerId: string,
  orgId: string,
  feature: ImageFeature = IMAGE_FEATURES.PROFILE
): Promise<string | null> {
  try {
    const image = await prisma.image.findFirst({
      where: {
        ownerType,
        ownerId,
        orgId,
        feature,
      },
      orderBy: { createdAt: "desc" },
      select: { url: true }
    });

    return image?.url || null;
  } catch (error) {
    console.error("Error fetching primary image:", error);
    return null;
  }
}

// Get all images for an entity
export async function getEntityImages(
  ownerType: ImageOwnerType,
  ownerId: string,
  orgId: string,
  feature?: ImageFeature
): Promise<Array<{ id: string; url: string; feature: string; createdAt: Date }>> {
  try {
    const where: any = {
      ownerType,
      ownerId,
      orgId,
    };

    if (feature) {
      where.feature = feature;
    }

    const images = await prisma.image.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        url: true,
        feature: true,
        createdAt: true,
      }
    });

    return images;
  } catch (error) {
    console.error("Error fetching entity images:", error);
    return [];
  }
}

// Set primary image for an entity (helper for API responses)
export async function setEntityImageUrl<T extends Record<string, any>>(
  entity: T,
  ownerType: ImageOwnerType,
  orgId: string,
  feature: ImageFeature = IMAGE_FEATURES.PROFILE
): Promise<T & { [IMAGE_FIELD]: string | null }> {
  const imageUrl = await getPrimaryImage(ownerType, entity.id, orgId, feature);
  
  return {
    ...entity,
    [IMAGE_FIELD]: imageUrl,
  };
}

// Batch set image URLs for multiple entities
export async function setEntitiesImageUrls<T extends Record<string, any>>(
  entities: T[],
  ownerType: ImageOwnerType,
  orgId: string,
  feature: ImageFeature = IMAGE_FEATURES.PROFILE
): Promise<Array<T & { [IMAGE_FIELD]: string | null }>> {
  if (entities.length === 0) return [];

  try {
    // Get all entity IDs
    const entityIds = entities.map(entity => entity.id);

    // Fetch all images in one query
    const images = await prisma.image.findMany({
      where: {
        ownerType,
        ownerId: { in: entityIds },
        orgId,
        feature,
      },
      select: {
        ownerId: true,
        url: true,
      }
    });

    // Create a map for quick lookup
    const imageMap = new Map<string, string>();
    images.forEach(image => {
      if (!imageMap.has(image.ownerId)) {
        imageMap.set(image.ownerId, image.url);
      }
    });

    // Add image URLs to entities
    return entities.map(entity => ({
      ...entity,
      [IMAGE_FIELD]: imageMap.get(entity.id) || null,
    }));
  } catch (error) {
    console.error("Error setting entities image URLs:", error);
    // Return entities without images on error
    return entities.map(entity => ({
      ...entity,
      [IMAGE_FIELD]: null,
    }));
  }
}

// Helper to get the appropriate owner type for different models
export function getOwnerTypeForModel(modelName: string): ImageOwnerType {
  switch (modelName.toLowerCase()) {
    case "user":
      return "USER";
    case "organization":
      return "ORGANIZATION";
    case "student":
      return "STUDENT";
    case "member":
      return "MEMBER";
    case "book":
      return "BOOK";
    default:
      return "OTHER";
  }
}

// Cleanup orphaned images (images with no corresponding entity)
export async function cleanupOrphanedImages(orgId: string): Promise<number> {
  try {
    // Find images that don't have corresponding entities
    const orphanedImages = await prisma.image.findMany({
      where: { orgId },
      select: {
        id: true,
        ownerId: true,
        ownerType: true,
        publicId: true,
      }
    });

    let deletedCount = 0;

    for (const image of orphanedImages) {
      let entityExists = false;

      try {
        switch (image.ownerType) {
          case "USER":
            entityExists = !!(await prisma.user.findUnique({ 
              where: { id: image.ownerId },
              select: { id: true }
            }));
            break;
          case "ORGANIZATION":
            entityExists = !!(await prisma.organization.findUnique({ 
              where: { id: image.ownerId },
              select: { id: true }
            }));
            break;
          case "STUDENT":
            entityExists = !!(await prisma.student.findUnique({ 
              where: { id: image.ownerId },
              select: { id: true }
            }));
            break;
          case "MEMBER":
            entityExists = !!(await prisma.member.findUnique({ 
              where: { id: image.ownerId },
              select: { id: true }
            }));
            break;
          case "BOOK":
            entityExists = !!(await prisma.book.findUnique({ 
              where: { id: image.ownerId },
              select: { id: true }
            }));
            break;
        }

        if (!entityExists) {
          await prisma.image.delete({ where: { id: image.id } });
          deletedCount++;
          console.log(`Deleted orphaned image: ${image.publicId}`);
        }
      } catch (error) {
        console.error(`Error checking entity for image ${image.id}:`, error);
      }
    }

    return deletedCount;
  } catch (error) {
    console.error("Error cleaning up orphaned images:", error);
    return 0;
  }
}
