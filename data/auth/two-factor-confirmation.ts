import prisma from "@/lib/db/client";

/**
 * Retrieve the two-factor confirmation record by the provided userId.
 * @param {string} userId - The user ID to search for in the two-factor confirmation table.
 * @returns {object | null} The two-factor confirmation record if found, or null if not found or an error occurs.
 */
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique({
      where: { userId },
    });
    return twoFactorConfirmation;
  } catch (error) {
    console.error("Error fetching two-factor confirmation by userId:", error);
    return null;
  }
};
