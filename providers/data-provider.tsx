"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useCurrentUser } from "../hooks/use-current-user";

// Define the type for the context value
type DataContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  orgId: string;
  setOrgId: React.Dispatch<React.SetStateAction<string>>;
  isAddTeam: boolean;
  setIsAddTeam: React.Dispatch<React.SetStateAction<boolean>>;
  isEditTeam: boolean;
  setIsEditTeam: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export function DataProvider({ children }: Props) {
  const user = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [orgId, setOrgId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("orgId") || "";
    }
    return "";
  });
  const [isAddTeam, setIsAddTeam] = useState(false);
  const [isEditTeam, setIsEditTeam] = useState(false);

  const isOrgIdSet = useRef(false); // Track if orgId has been initialized

  // Load orgId from user.defaultOrgId (if it exists and isn't already set)
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      user &&
      user.defaultOrgId &&
      !isOrgIdSet.current
    ) {
      const storedOrgId = localStorage.getItem("orgId");
      if (!storedOrgId) {
        setOrgId(user.defaultOrgId);
        localStorage.setItem("orgId", user.defaultOrgId); // Store in localStorage
      }
      isOrgIdSet.current = true;
    }
  }, [user]);

  // Update localStorage when orgId changes
  useEffect(() => {
    if (typeof window !== "undefined" && orgId) {
      localStorage.setItem("orgId", orgId);
    }
  }, [orgId]);

  return (
    <DataContext.Provider
      value={{
        loading,
        setLoading,
        orgId,
        setOrgId,
        isAddTeam,
        setIsAddTeam,
        isEditTeam,
        setIsEditTeam,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// Custom hook to use the DataContext
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
