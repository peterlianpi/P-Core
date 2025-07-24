// context/selected-org-context.tsx
"use client";

import { OrganizationType } from "@/features/org/helper/organization-type";
import { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type SelectedOrgContextType = {
  selectedOrg: OrganizationType;
  setSelectedOrg: (org: OrganizationType) => void;
  selectedOrgId: string;
  setSelectedOrgId: Dispatch<SetStateAction<string>>;
};

const SelectedOrgContext = createContext<SelectedOrgContextType | undefined>(
  undefined
);

export const SelectedOrgProvider = ({ children }: { children: ReactNode }) => {
  const [selectedOrg, setSelectedOrg] = useState<OrganizationType>({
    id: "",
    name: "",
    description: "",
    startedAt: new Date(), // ✅ Use `new Date()` instead of `Date()`
    logoImage: "",
    role: "",
    type: "school",
  });
  const [selectedOrgId, setSelectedOrgId] = useState("");

  return (
    <SelectedOrgContext.Provider
      value={{ selectedOrg, setSelectedOrg, selectedOrgId, setSelectedOrgId }}
    >
      {children}
    </SelectedOrgContext.Provider>
  );
};

export const useSelectedOrg = () => {
  const context = useContext(SelectedOrgContext);
  if (!context) {
    throw new Error("useSelectedOrg must be used inside SelectedOrgProvider");
  }
  return context;
};
