import { prisma } from "@/lib/db/client";


/**
 * Retrieve all users from the database.
 *
 * This function queries the `user` table in the database
 * to fetch all user records.
 *
 * @returns {object[] | null} An array of user objects if found, or null if an error occurs.
 */
export const getAllUsers = async () => {
  try {
    // Query the database to fetch all users.
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

    // Return the array of users.
    return users;
  } catch (error) {
    // Log any errors and return null.
    console.error("Error fetching all users:", error);
    return null;
  }
};
