import { useSession } from "next-auth/react";

type Role = "OWNER" | "ADMIN" | "MEMBER" | "ACCOUNTANT" | "OFFICE_STAFF";

type Member = {
  id: string;
  organization: {
    id: string;
    role: Role | null;
  }[];
};

/**
 * Gets the current user's role from the member list and selected org.
 */
export const useCurrentMemberRole = (
  members: Member[],
  selectedOrgId: string | null | undefined
) => {
  const { data: session } = useSession();

  if (!session || !selectedOrgId) return undefined;

  const currentMember = members.find((m) => m.id === session.user?.id);

  const role = currentMember?.organization.find(
    (org) => org.id === selectedOrgId
  )?.role;

  return role;
};
