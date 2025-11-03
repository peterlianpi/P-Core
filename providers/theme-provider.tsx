"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
  useTheme
} from "next-themes";
import { initializeTheme, useThemeStore } from "@/lib/theme-system";

function ThemeSynchronizer() {
  const { theme: nextTheme, setTheme: setNextTheme } = useTheme();
  const {
    isDarkMode,
    toggleDarkMode,
    setPalette,
    useCustomColors,
    currentPalette,
    customColors
  } = useThemeStore();

  // Synchronize next-themes with custom theme store
  React.useEffect(() => {
    const shouldBeDark = nextTheme === 'dark' || (nextTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (shouldBeDark !== isDarkMode) {
      // Update the custom theme store to match next-themes
      if (shouldBeDark && !isDarkMode) {
        toggleDarkMode();
      } else if (!shouldBeDark && isDarkMode) {
        toggleDarkMode();
      }
    }
  }, [nextTheme, isDarkMode, toggleDarkMode]);

  // Listen for system theme changes
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (nextTheme === 'system') {
        // Update custom theme store when system theme changes
        const shouldBeDark = e.matches;
        if (shouldBeDark !== isDarkMode) {
          toggleDarkMode();
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [nextTheme, isDarkMode, toggleDarkMode]);

  return null;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Initialize the custom theme system
    initializeTheme();
    setMounted(true);
  }, []);

  return (
    <NextThemesProvider {...props}>
      {mounted && <ThemeSynchronizer />}
      {children}
    </NextThemesProvider>
  );
}
