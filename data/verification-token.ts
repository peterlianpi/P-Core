import { prisma } from "@/lib/db/client";


/**
 * Retrieve a verification token by the user's email.
 * 
 * This function queries the `verificationToken` table in the database
 * to find the verification token associated with the provided email address.
 * 
 * @param {string} email - The email address to search for in the `verificationToken` table.
 * @returns {object | null} The verification token object if found, or null if not found or an error occurs.
 */
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    // Query the database to find the verification token by email.
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });

    // Return the verification token object if found.
    return verificationToken;
  } catch (error) {
    // If an error occurs during the query, log the error and return null.
    console.error("Error fetching verification token by email:", error); // Optional: log the error for debugging
    return null;
  }
};

/**
 * Retrieve a verification token by its unique token.
 * 
 * This function queries the `verificationToken` table in the database
 * to find the verification token that matches the provided token.
 * 
 * @param {string} token - The unique verification token to search for in the `verificationToken` table.
 * @returns {object | null} The verification token object if found, or null if not found or an error occurs.
 */
export const getVerificationTokenByToken = async (token: string) => {
  try {
    // Query the database to find the verification token by token.
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });

    // Return the verification token object if found.
    return verificationToken;
  } catch (error) {
    // If an error occurs during the query, log the error and return null.
    console.error("Error fetching verification token by token:", error); // Optional: log the error for debugging
    return null;
  }
};
