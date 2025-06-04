import { useSession } from "next-auth/react";

/**
 * Custom hook to retrieve the current user's role from the session.
 *
 * @returns {string | undefined} The role of the current user, or undefined if the session is not available.
 */
export const useCurrentRole = () => {
  const { data: session } = useSession(); // Destructure `data` to get session

  // Ensure session data is available before accessing the user's role
  return session?.user?.role;
};
