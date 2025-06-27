"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "../form-error";
import { UserRole } from "@/prisma-user-database/user-database-client-types";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  return <>{children}</>;
};
