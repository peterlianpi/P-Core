import { useSession } from "next-auth/react";

/**
 * Custom hook to retrieve the current user's data from the session.
 *
 * @returns {object | undefined} The user object from the session, or undefined if the session is not available.
 */
export const useCurrentUser = () => {
  const { data: session, status } = useSession(); // Destructure `data` to get session

  console.log("Client session : ", session)

  if (status === "authenticated") {
    // Ensure session data is available before accessing the user object
    return session?.user;
  }
};
