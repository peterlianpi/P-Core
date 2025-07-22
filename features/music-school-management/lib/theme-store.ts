import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ThemeSettings } from "./types"

interface ThemeStore {
  settings: ThemeSettings
  updateSettings: (settings: Partial<ThemeSettings>) => void
  resetSettings: () => void
}

const defaultSettings: ThemeSettings = {
  primaryColor: "#3B82F6",
  secondaryColor: "#10B981",
  accentColor: "#8B5CF6",
  fontSize: "medium",
  borderRadius: "medium",
  mode: "system",
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      resetSettings: () => set({ settings: defaultSettings }),
    }),
    {
      name: "theme-settings",
    },
  ),
)
