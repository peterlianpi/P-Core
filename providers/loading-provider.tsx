"use client";

import React, { createContext, useContext, useState } from "react";

// Define the type for the context value
type LoadingContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  orgId: number | undefined;
  setOrgId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

// Create the context with a default value of `undefined`
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export function LoadingProvider({ children }: Props) {
  const [loading, setLoading] = useState(false);
  const [orgId, setOrgId] = useState<number | undefined>(undefined);

  return (
    <LoadingContext.Provider value={{ loading, setLoading, orgId, setOrgId }}>
      {children}
    </LoadingContext.Provider>
  );
}

// Custom hook to use the LoadingContext
export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
