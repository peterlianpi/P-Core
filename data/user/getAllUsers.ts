import { prisma } from "@/lib/db/client";

/**
 * Retrieve all users from the database.
 * @returns {object[] | null} An array of user objects if found, or null if an error occurs.
 */
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        id: true,
        email: true,
        image: true,
        organizations: {
          select: {
            organizationId: true,
            role: true,
            status: true,
          },
        },
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    return null;
  }
};
