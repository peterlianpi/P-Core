import { currentUser } from "./auth";
import { getUserById } from "@/data/user";

/**
 * Fetches the full user profile from the database using the session user ID.
 * Ensures server always has the latest and complete user data.
 *
 * @returns {Promise<object | undefined>} The full user object, or undefined if not authenticated.
 */
export const getServerUser = async () => {
  // Get the user from the session (may only have partial fields)
  const sessionUser = await currentUser();
  if (!sessionUser?.id) return undefined;

  // Fetch the full user profile from the database
  const fullUser = await getUserById(sessionUser.id);
  return fullUser;
};
