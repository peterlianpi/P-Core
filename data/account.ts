import { prisma } from "@/lib/db/client";


/**
 * Retrieve the account associated with a specific userId from the database.
 *
 * This function queries the `account` model in the database to find the first account
 * matching the provided `userId`. If no account is found or an error occurs,
 * it returns `null`.
 *
 * @param {string} userId - The user ID to look for in the account table.
 * @returns {object | null} The account object if found, or null if no account is found or if an error occurs.
 */
export const getAccountByUserId = async (userId: string) => {
  try {
    // Query the database to find the first account associated with the provided userId.
    const account = await prisma.account.findFirst({
      where: { userId },
    });

    // Return the account if found.
    return account;
  } catch (error) {
    // If an error occurs during the database query, return null.
    console.error("Error fetching account by userId:", error); // Optional: log the error for debugging
    return null;
  }
};
