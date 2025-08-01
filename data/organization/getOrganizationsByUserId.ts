import { prisma } from "@/lib/db/client";

/**
 * Retrieve all organizations where the given user is a member.
 * @param {string} userId - The unique ID of the user.
 * @returns {Array} List of organizations or an empty array if none found.
 */
export const getOrganizationsByUserId = async (userId: string) => {
  try {
    if (!userId) return [];
    const organizations = await prisma.organization.findMany({
      where: {
        users: {
          some: { userId },
        },
      },
      include: {
        users: true,
      },
    });
    return organizations;
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return [];
  }
};
