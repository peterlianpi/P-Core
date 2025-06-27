import { DefaultSession } from "next-auth";
import { UserRole } from "./prisma-user-database/user-database-client-types";


export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  defaultOrgId: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
