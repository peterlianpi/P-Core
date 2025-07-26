import { OrganizationRole } from "@prisma/client";
import { useSession } from "next-auth/react";

// Define the structure of a member and their organization roles
type Member = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  organization: {
    id: string;
    role: OrganizationRole;
  }[];
};

/**
 * Hook to get the current user's role in the selected organization.
 * @param members - The list of all members.
 * @param selectedOrgId - The currently selected organization ID.
 * @returns The role of the current user in the selected organization.
 */
export const useCurrentMemberRole = (
  members: Member[],
  selectedOrgId: string | null | undefined
): OrganizationRole | undefined => {
  const { data: session } = useSession();

  if (!session?.user?.email || !selectedOrgId) return undefined;

  // Find current user from member list by email (most reliable in default NextAuth setup)
  const currentMember = members.find(
    (member) => member.email === session.user?.email
  );

  // Get role in the selected org
  const role = currentMember?.organization.find(
    (org) => org.id === selectedOrgId
  )?.role;

  return role;
};

/**
 * Hook to check if the current user is an OWNER in the selected organization.
 * @param members - The list of all members.
 * @param selectedOrgId - The currently selected organization ID.
 * @returns true if the user is an "OWNER", false otherwise.
 */
export const useIsOrgOwner = (
  members: Member[],
  selectedOrgId: string | null | undefined
): boolean => {
  const role = useCurrentMemberRole(members, selectedOrgId);
  return role === "OWNER";
};
