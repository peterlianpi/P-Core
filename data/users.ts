import { db } from "@/lib/db";

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
    const users = await db.user.findMany({
      select: {
        name: true,
        id: true,
        image: true,
        UserOrganization: {
          select: {
            organizationId: true,
            role: true,
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
