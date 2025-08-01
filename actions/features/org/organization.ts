"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { trackOrganizationCreatedBy } from "@/actions/auth/track-system-activities";
import { organizationSchema } from "@/features/organization-management/schemas";
import { ApiError, handleApiError, handleError } from "@/lib/utils/api-errors";

// Standard API response type for all organization actions
export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};
import { OrganizationsAPISchema } from "@/lib/schemas";
import { OrganizationType } from "@prisma/client";


const context = '' as any;

export async function getOrganizationsByUserId(userId: string | undefined): Promise<ApiResponse<any>> {
  if (!userId) {
    return { success: true, data: [] };
  }
  const userOrganizations = await prisma.userOrganization.findMany({
    where: { userId },
    select: {
      userId: true,
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
  if (!result.success) {
    console.error("Zod validation error in getOrganizationsByUserId:", result.error.flatten());
    return { success: false, error: "Invalid organization data" };
  }

  return { success: true, data: result.data };
}

type CreateOrganizationInput = z.infer<typeof organizationSchema>;

export async function createOrganization(userId: string, values: CreateOrganizationInput): Promise<ApiResponse<any>> {
  try {
    // 1. Validate input with the dedicated Zod schema on the server.
    const validatedData = organizationSchema.parse(values);

    // 2. Check for uniqueness to provide clear error messages.
    const existingOrg = await prisma.organization.findFirst({
      where: { name: validatedData.name, createdById: userId },
    });
    if (existingOrg) {
      throw new ApiError("An organization with this name already exists.", 409);
    }

    // 3. Use a transaction for atomic creation of organization and user link.
    const newOrganization = await prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: {
          ...validatedData,
          createdBy: { connect: { id: userId } },
        },
      });

      await tx.userOrganization.create({
        data: {
          userId,
          organizationId: organization.id,
          role: "OWNER",
        },
      });
      return organization;
    });

    await trackOrganizationCreatedBy({
      userId: newOrganization.createdById,
      organizationId: newOrganization.id,
    });

    revalidatePath("/organization");
    return { success: true, data: newOrganization };

  } catch (error) {
    const apiError = handleApiError(context, error, "Failed to create organization");
    return {
      success: false,
      data: undefined,
      error: apiError?.error || (typeof apiError === 'string' ? apiError : 'Failed to create organization'),
    };
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
}): Promise<ApiResponse<{ name: string }>> {
  try {
    // Transform the type to the correct enum if provided
    const updateData = {
      ...value,
      type: value.type ? (value.type.toUpperCase() as OrganizationType) : undefined,
    };

    const updated = await prisma.organization.update({
      where: { id: organizationId },
      data: updateData,
    });
    revalidatePath("/organization"); // Optional: revalidate page

    return { success: true, data: { name: updated.name } };
  } catch (error: unknown) {
    const apiError = handleError(error, "Failed to update organization");
    return {
      success: false,
      data: undefined,
      error: apiError?.error || (typeof apiError === 'string' ? apiError : 'Failed to update organization'),
    };
  }
}

export async function deleteOrganization(organizationId: string): Promise<ApiResponse<any>> {
  if (!organizationId) return { success: false, error: "Organization ID is required" };

  try {
    // Delete related userOrganization links (optional)
    await prisma.userOrganization.deleteMany({
      where: { organizationId },
    });

    const deleted = await prisma.organization.delete({
      where: { id: organizationId },
    });
    revalidatePath("/organization"); // Optional: revalidate page

    return { success: true, data: deleted };
  } catch (error: unknown) {
    const apiError = handleError(error, "Failed to delete organization");
    return {
      success: false,
      data: undefined,
      error: apiError?.error || (typeof apiError === 'string' ? apiError : 'Failed to delete organization'),
    };
  }
}
