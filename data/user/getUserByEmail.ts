import prisma from "@/lib/db/client";

/**
 * Retrieve a user by their email address.
 * @param {string} email - The email address of the user to search for.
 * @returns {object | null} The user object if found, or null if not found or an error occurs.
 */
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};
