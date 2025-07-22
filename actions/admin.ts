"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@/prisma-user-database/user-database-client-types";


export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allowed Server Action!" };
  }
  return { error: "Forbidden Server Action!" };
};
