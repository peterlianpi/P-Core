import prisma from "@/lib/db/client";

/**
 * Retrieve a user by their email address.
 *
 * This function queries the `user` table in the database
 * to find the user that matches the provided `email` value.
 *
 * @param {string} email - The email address of the user to search for in the `user` table.
 * @returns {object | null} The user object if found, or null if not found or an error occurs.
 */
export const getUserByEmail = async (email: string) => {
  try {
    // Query the database to find the user by email.
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Return the user object if found.
    return user;
  } catch (error) {
    // If an error occurs during the query, log the error and return null.
    console.error("Error fetching user by email:", error); // Optional: log the error for debugging
    return null;
  }
};

/**
 * Retrieve a user by their ID.
 *
 * This function queries the `user` table in the database
 * to find the user that matches the provided `id`.
 *
 * @param {string} id - The unique ID of the user to search for in the `user` table.
 * @returns {object | null} The user object if found, or null if not found or an error occurs.
 */
export const getUserById = async (id: string) => {
  try {
    // Query the database to find the user by ID.
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    // Return the user object if found.
    return user;
  } catch (error) {
    // If an error occurs during the query, log the error and return null.
    console.error("Error fetching user by ID:", error); // Optional: log the error for debugging
    return null;
  }
};
