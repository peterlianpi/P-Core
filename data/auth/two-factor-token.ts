import { prisma } from "@/lib/db/client";
import crypto from "crypto";

/**
 * Retrieve a two-factor token by the provided token value.
 * @param {string} token - The token to search for in the two-factor token table.
 * @returns {object | null} The two-factor token object if found, or null if not found or an error occurs.
 */
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    // SECURITY: Tokens are stored hashed; hash the incoming token before lookup.
    const hashed = crypto.createHash("sha256").update(token).digest("hex");
    const twoFactorToken = await prisma.twoFactorToken.findUnique({
      where: { token: hashed },
    });
    return twoFactorToken;
  } catch (error) {
    console.error("Error fetching two-factor token by token:", error);
    return null;
  }
};

/**
 * Retrieve a two-factor token by the provided email address.
 * @param {string} email - The email address to search for in the two-factor token table.
 * @returns {object | null} The two-factor token object if found, or null if not found or an error occurs.
 */
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch (error) {
    console.error("Error fetching two-factor token by email:", error);
    return null;
  }
};
