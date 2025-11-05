import { useSession } from 'next-auth/react';

/**
 * Custom hook to retrieve the current user's data from NextAuth session.
 * Uses the authenticated session data instead of mock data.
 *
 * @returns {object} The current authenticated user object or null if not authenticated.
 */
export const useCurrentUser = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return null; // Still loading
  }

  if (status === 'unauthenticated' || !session?.user) {
    return null; // Not authenticated
  }

  return session.user; // Return the authenticated user
};
