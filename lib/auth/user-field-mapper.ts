// Define a plain User interface for mapping/auth purposes
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string;
  isTwoFactorEnabled?: boolean;
  defaultOrgId?: string | null;
  image?: string | null;
  isOAuth?: boolean;
  // Add other fields as needed
}

/**
 * Maps a user object to the fields that should be included in the JWT/session.
 * Update this function whenever you add new user fields that need to be exposed to the session.
 *
 * @param user The full user object from the database
 * @returns An object containing only the fields to expose in JWT/session
 */
export function mapUserFieldsForAuth(user: Partial<User>) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isTwoFactorEnabled: user.isTwoFactorEnabled,
    defaultOrgId: user.defaultOrgId ?? null,
    image: user.image ?? null,
    isOAuth: user.isOAuth ?? false,
    // Add new fields here as needed
  };
}
