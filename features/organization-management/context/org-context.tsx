// context/OrgDataContext.tsx
"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { OrganizationRole, OrganizationType } from "@/lib/types/database";

type Org = {
  organization: {
    id: string;
    name: string;
    logoImage?: string | undefined;
    description?: string | undefined;
    startedAt?: Date | null | undefined;
    type?: OrganizationType,
  };
  role?: string | undefined;
  userId?:string|undefined;
};

type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  organization: {
    id: string;
    role: OrganizationRole;
    status: string;
  }[];
};

type OrgDataContextType = {
  organizations: Org[];
  users: User[];
};

const OrgDataContext = createContext<OrgDataContextType | null>(null);

export const OrgDataProvider = ({
  children,
  organizations,
  users,
}: {
  children: ReactNode;
  organizations: Org[];
  users: User[];
}) => {
  return (
    <OrgDataContext.Provider value={{ organizations, users }}>
      {children}
    </OrgDataContext.Provider>
  );
};

export const useOrgData = () => {
  const context = useContext(OrgDataContext);
  if (!context) {
    throw new Error("useOrgData must be used inside OrgDataProvider");
  }
  return context;
};
