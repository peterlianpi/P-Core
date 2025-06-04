"use server";

import { db } from "@/lib/db";
import { OrganizationsAPISchema } from "@/schemas";

function handleError(error: unknown, fallbackMessage: string) {
  if (error instanceof Error) {
    return { error: error.message || fallbackMessage };
  }
  return { error: fallbackMessage };
}

export async function getOrganizationsByUserId(userId: string | undefined) {
  if (!userId) return { error: "User ID is required" };

  try {
    const userOrganizations = await db.userOrganization.findMany({
      where: { userId },
      select: {
        role: true,
        organization: {
          select: {
            id: true,
            name: true,
            description: true,
            startedAt: true,
            logoImage: true,
          },
        },
      },
    });

    const result = OrganizationsAPISchema.safeParse(userOrganizations);
    if (!result.success) throw new Error("Invalid data");

    return { success: result.data };
  } catch (error: unknown) {
    return handleError(error, "Failed to fetch organizations");
  }
}

export async function createOrganization({
  userId,
  value,
}: {
  userId: string;
  value: {
    name: string;
    description?: string;
    logoImage?: string;
    startedAt?: Date;
  };
}) {
  if (!userId) return { error: "User ID is required" };
  if (!value.name) return { error: "Organization name is required" };

  try {
    const result = await db.$transaction(async (prisma) => {
      const organization = await prisma.organization.create({
        data: {
          name: value.name,
          description: value.description,
          logoImage: value.logoImage,
          startedAt: value.startedAt,
          createdBy: { connect: { id: userId } },
        },
      });

      await prisma.userOrganization.create({
        data: {
          userId,
          organizationId: organization.id,
          role: "OWNER",
        },
      });

      return organization;
    });

    return { success: result };
  } catch (error: unknown) {
    return handleError(error, "Failed to create organization");
  }
}

export async function updateOrganization({
  organizationId,
  value,
}: {
  organizationId: string;
  value: {
    name?: string;
    description?: string;
    logoImage?: string;
    startedAt?: Date;
  };
}) {
  if (!organizationId) return { error: "Organization ID is required" };

  try {
    const updated = await db.organization.update({
      where: { id: organizationId },
      data: { ...value },
    });

    return { success: updated };
  } catch (error: unknown) {
    return handleError(error, "Failed to update organization");
  }
}

export async function deleteOrganization(organizationId: string) {
  if (!organizationId) return { error: "Organization ID is required" };

  try {
    // Delete related userOrganization links (optional)
    await db.userOrganization.deleteMany({
      where: { organizationId },
    });

    const deleted = await db.organization.delete({
      where: { id: organizationId },
    });

    return { success: deleted };
  } catch (error: unknown) {
    return handleError(error, "Failed to delete organization");
  }
}
