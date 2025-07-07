import { userDBPrismaClient } from "@/lib/prisma-client/user-prisma-client";


/**
 * Retrieve a two-factor token by the provided token value.
 * 
 * This function queries the `twoFactorToken` table in the database
 * to find the token that matches the provided `token` value.
 * 
 * @param {string} token - The token to search for in the two-factor token table.
 * @returns {object | null} The two-factor token object if found, or null if not found or an error occurs.
 */
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    // Query the database to find the two-factor token by its value.
    const twoFactorToken = await userDBPrismaClient.twoFactorToken.findUnique({
      where: { token },
    });

    // Return the two-factor token if found.
    return twoFactorToken;
  } catch (error) {
    // If an error occurs during the query, return null.
    console.error("Error fetching two-factor token by token:", error); // Optional: log the error for debugging
    return null;
  }
};

/**
 * Retrieve a two-factor token by the provided email address.
 * 
 * This function queries the `twoFactorToken` table in the database
 * to find the first two-factor token associated with the provided `email`.
 * 
 * @param {string} email - The email address to search for in the two-factor token table.
 * @returns {object | null} The two-factor token object if found, or null if not found or an error occurs.
 */
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    // Query the database to find the first two-factor token associated with the email.
    const twoFactorToken = await userDBPrismaClient.twoFactorToken.findFirst({
      where: { email },
    });

    // Return the two-factor token if found.
    return twoFactorToken;
  } catch (error) {
    // If an error occurs during the query, return null.
    console.error("Error fetching two-factor token by email:", error); // Optional: log the error for debugging
    return null;
  }
};
