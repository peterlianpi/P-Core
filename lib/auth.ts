// Authentication module using NextAuth

import { auth } from './auth/auth';

/**
 * Fetches the current authenticated user from NextAuth session.
 * @returns The authenticated user object or null if not authenticated.
 */
export const currentUser = async () => {
  const session = await auth();
  return session?.user || null;
};

/**
 * Fetches the role of the current authenticated user.
 * @returns The role of the authenticated user or null if not authenticated.
 */
export const currentRole = async () => {
  const user = await currentUser();
  return user?.role || null;
};
