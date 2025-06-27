"use client";

import { createContext, useContext, useState } from "react";

const DataContext = createContext({
  isUpdated: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsUpdated: (val: boolean) => {},
});

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [isUpdated, setIsUpdated] = useState(false);

  return (
    <DataContext.Provider value={{ isUpdated, setIsUpdated }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
