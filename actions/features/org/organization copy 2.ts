import { db } from "@/lib/db";
import { OrganizationsAPISchema } from "@/schemas";

// ✅ Get Organizations
export async function getOrganizationsByUserId(userId: string | undefined) {
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
      }, // Include organization details
    },
  });

  const result = OrganizationsAPISchema.safeParse(userOrganizations);

  if (!result.success) {
    throw new Error("Invalid data");
  }

  return result;
}

export async function createOrganization({
  userId,
  value,
}: {
  userId: string;
  value: {
    name: string;
    description: string | undefined;
    logoImage: string | undefined;
    startedAt: Date | undefined;
  };
}) {
  // Start a transaction to create both the organization and the UserOrganization relation
  const result = await db.$transaction(async (prisma) => {
    // Create the organization
    const organization = await prisma.organization.create({
      data: {
        name: value.name, // Ensure you're passing the necessary fields
        description: value.description,
        logoImage: value.logoImage,
        startedAt: value.startedAt,
        createdBy: {
          connect: {
            id: userId, // Associate the organization with the user
          },
        },
      },
    });

    // Create the relation between the user and the organization
    await prisma.userOrganization.create({
      data: {
        userId, // Associate the user with the organization
        organizationId: organization.id,
        role: "OWNER", // You can customize the role as needed
      },
    });

    return organization; // Return the newly created organization
  });

  return result;
}

export async function getOrganizationsById(id: string | undefined) {
  const userOrganizations = await db.userOrganization.findMany({
    where: { id },
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
      }, // Include organization details
    },
  });

  const result = OrganizationsAPISchema.safeParse(userOrganizations);

  if (!result.success) {
    throw new Error("Invalid data");
  }

  return result;
}
