"use server";

import { trackOrganizationCreatedBy } from "@/actions/auth/track-system-activities";
import { userDBPrismaClient } from "@/lib/prisma-client/user-prisma-client";
import { OrganizationsAPISchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export async function handleError(error: unknown, fallbackMessage: string) {
  if (error instanceof Error) {
    return { error: error.message || fallbackMessage };
  }
  return { error: fallbackMessage };
}

export async function getOrganizationsByUserId(userId: string | undefined) {
  const userOrganizations = await userDBPrismaClient.userOrganization.findMany({
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
          type: true,
        },
      },
    },
  });

  const result = OrganizationsAPISchema.safeParse(userOrganizations);
  if (result.error) {
    console.log("Error : ", result.error.message);
  }

  if (!result.success) throw new Error("Invalid data");

  return result;
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
    type?: string;
  };
}) {
  try {
    const result = await userDBPrismaClient.$transaction(async (prisma) => {
      const organization = await prisma.organization.create({
        data: {
          name: value.name,
          description: value.description,
          logoImage: value.logoImage,
          startedAt: value.startedAt,
          createdBy: { connect: { id: userId } },
          type: value.type,
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

    await trackOrganizationCreatedBy({
      userId: result.createdById,
      organizationId: result.id,
    });
    revalidatePath("/organization"); // Optional: revalidate page

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
    type?: string;
  };
}) {
  try {
    const updated = await userDBPrismaClient.organization.update({
      where: { id: organizationId },
      data: { ...value },
    });
    revalidatePath("/organization"); // Optional: revalidate page

    return { success: { name: updated.name } };
  } catch (error: unknown) {
    return handleError(error, "Failed to update organization");
  }
}

export async function deleteOrganization(organizationId: string) {
  if (!organizationId) return { error: "Organization ID is required" };

  try {
    // Delete related userOrganization links (optional)
    await userDBPrismaClient.userOrganization.deleteMany({
      where: { organizationId },
    });

    const deleted = await userDBPrismaClient.organization.delete({
      where: { id: organizationId },
    });
    revalidatePath("/organization"); // Optional: revalidate page

    return { success: deleted };
  } catch (error: unknown) {
    return handleError(error, "Failed to delete organization");
  }
}
