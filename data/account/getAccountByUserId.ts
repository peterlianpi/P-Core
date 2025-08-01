import { prisma } from "@/lib/db/client";

/**
 * Retrieve the account associated with a specific userId from the database.
 * @param {string} userId - The user ID to look for in the account table.
 * @returns {object | null} The account object if found, or null if no account is found or if an error occurs.
 */
export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: { userId },
    });
    return account;
  } catch (error) {
    console.error("Error fetching account by userId:", error);
    return null;
  }
};
