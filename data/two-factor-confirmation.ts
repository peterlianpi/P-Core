import { userDBPrismaClient } from "@/lib/prisma-client/user-prisma-client";


/**
 * Retrieve the two-factor confirmation record by the provided userId.
 * 
 * This function queries the `twoFactorConfirmation` table in the database
 * to find the confirmation record associated with the provided `userId`.
 * 
 * @param {string} userId - The user ID to search for in the two-factor confirmation table.
 * @returns {object | null} The two-factor confirmation record if found, or null if not found or an error occurs.
 */
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    // Query the database to find the two-factor confirmation by userId.
    const twoFactorConfirmation = await userDBPrismaClient.twoFactorConfirmation.findUnique({
      where: { userId },
    });

    // Return the two-factor confirmation record if found.
    return twoFactorConfirmation;
  } catch (error) {
    // If an error occurs during the query, return null.
    console.error("Error fetching two-factor confirmation by userId:", error); // Optional: log the error for debugging
    return null;
  }
};
