// Ensure you have the correct import

import { userDBPrismaClient } from "@/lib/prisma-client/user-prisma-client";

/**
 * Retrieve all organizations where the given user is a member.
 *
 * @param {string} userId - The unique ID of the user.
 * @returns {Array} List of organizations or an empty array if none found.
 */
export const getOrganizationsByUserId = async (userId: string) => {
  try {
    if (!userId) return [];

    // Fetch organizations where the user is associated via UserOrganization
    const organizations = await userDBPrismaClient.organization.findMany({
      where: {
        UserOrganization: {
          some: {
            userId: userId, // Filter by userId in the UserOrganization relation
          },
        },
      },
      include: {
        UserOrganization: true, // Include the related UserOrganization table to ensure the relation is fetched
      },
    });

    return organizations;
  } catch (error) {
    console.error("Error fetching organizations:", error); // Handle any errors
    return [];
  }
};
