import { prisma } from "@/lib/db/client";
import crypto from "crypto";

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
    // SECURITY: Tokens are stored hashed; hash the incoming token before lookup.
    const hashed = crypto.createHash("sha256").update(token).digest("hex");
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token: hashed },
    });
    return verificationToken;
  } catch (error) {
    console.error("Error fetching verification token by token:", error);
    return null;
  }
};
