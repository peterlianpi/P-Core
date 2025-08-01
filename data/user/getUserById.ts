import prisma from "@/lib/db/client";

/**
 * Retrieve a user by their ID.
 * @param {string} id - The unique ID of the user to search for.
 * @returns {object | null} The user object if found, or null if not found or an error occurs.
 */
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};
