// Import the authentication module

import { auth } from "./auth/auth";


/**
 * Fetches the current user from the authentication session.
 * @returns The user object from the session, or undefined if no session exists.
 */
export const currentUser = async () => {
  // Retrieve the current authentication session
  const session = await auth()

  // Return the user object if the session exists, otherwise return undefined
  return session?.user;
};

/**
 * Fetches the role of the current user from the authentication session.
 * @returns The role of the user, or undefined if no session or user exists.
 */
export const currentRole = async () => {
  // Retrieve the current authentication session
  const session = await auth();

  // Return the user's role if available, otherwise return undefined
  return session?.user?.role;
};
