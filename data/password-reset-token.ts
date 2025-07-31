import { prisma } from "@/lib/db/client";


/**
 * Retrieve a password reset token by the provided token value.
 * 
 * This function queries the `passwordResetToken` table in the database
 * to find the token that matches the provided `token` value.
 * 
 * @param {string} token - The token to search for in the password reset token table.
 * @returns {object | null} The password reset token object if found, or null if not found or an error occurs.
 */
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    // Query the database to find the password reset token by its value.
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    // Return the password reset token if found.
    return passwordResetToken;
  } catch (error) {
    // If an error occurs during the query, return null.
    console.error("Error fetching password reset token by token:", error); // Optional: log the error for debugging
    return null;
  }
};

/**
 * Retrieve a password reset token by the provided email address.
 * 
 * This function queries the `passwordResetToken` table in the database
 * to find the first password reset token associated with the provided `email`.
 * 
 * @param {string} email - The email address to search for in the password reset token table.
 * @returns {object | null} The password reset token object if found, or null if not found or an error occurs.
 */
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    // Query the database to find the first password reset token associated with the email.
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email },
    });

    // Return the password reset token if found.
    return passwordResetToken;
  } catch (error) {
    // If an error occurs during the query, return null.
    console.error("Error fetching password reset token by email:", error); // Optional: log the error for debugging
    return null;
  }
};
