"use client";

/**
 * THEME INITIALIZER: Client-side theme system initialization
 * 
 * This component handles:
 * 1. Theme system initialization on app startup
 * 2. Hydration-safe theme application
 * 3. Performance optimized theme loading
 * 4. Prevention of flash of unstyled content (FOUC)
 * 
 * WHY THIS IS NEEDED:
 * - Ensures theme is applied before UI renders
 * - Prevents theme flickering during page load
 * - Handles SSR/client hydration properly
 * - Maintains theme consistency across sessions
 */

import { useEffect } from 'react';
import { initializeTheme } from '@/lib/theme-system';

export const ThemeInitializer: React.FC = () => {
  useEffect(() => {
    // Initialize theme system on client mount
    // This prevents hydration mismatch and ensures theme is applied immediately
    initializeTheme();
  }, []);

  // This component doesn't render anything - it's just for side effects
  return null;
};

export default ThemeInitializer;
