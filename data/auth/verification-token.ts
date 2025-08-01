import { prisma } from "@/lib/db/client";

/**
 * Retrieve a verification token by the user's email.
 * @param {string} email - The email address to search for in the `verificationToken` table.
 * @returns {object | null} The verification token object if found, or null if not found or an error occurs.
 */
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    console.error("Error fetching verification token by email:", error);
    return null;
  }
};

/**
 * Retrieve a verification token by its unique token.
 * @param {string} token - The unique verification token to search for in the `verificationToken` table.
 * @returns {object | null} The verification token object if found, or null if not found or an error occurs.
 */
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    console.error("Error fetching verification token by token:", error);
    return null;
  }
};
