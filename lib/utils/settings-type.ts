import { $Enums } from "@prisma/client";

export type Organization = {
  role: $Enums.OrganizationUserRole | null;
  organization: {
    name: string;
    id: number;
    description: string | null;
    startedAt: Date | null;
    logoImage: string | null;
  };
};
