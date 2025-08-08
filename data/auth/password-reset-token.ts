import { prisma } from "@/lib/db/client";
import crypto from "crypto";

/**
 * Retrieve a password reset token by the provided token value.
 * @param {string} token - The token to search for in the password reset token table.
 * @returns {object | null} The password reset token object if found, or null if not found or an error occurs.
 */
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    // SECURITY: Tokens are stored hashed; hash the incoming token before lookup.
    const hashed = crypto.createHash("sha256").update(token).digest("hex");
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token: hashed },
    });
    return passwordResetToken;
  } catch (error) {
    console.error("Error fetching password reset token by token:", error);
    return null;
  }
};

/**
 * Retrieve a password reset token by the provided email address.
 * @param {string} email - The email address to search for in the password reset token table.
 * @returns {object | null} The password reset token object if found, or null if not found or an error occurs.
 */
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch (error) {
    console.error("Error fetching password reset token by email:", error);
    return null;
  }
};
