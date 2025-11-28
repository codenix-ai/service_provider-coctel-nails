'use client';

import { useEffect, memo } from 'react';
import { useConfig } from '@/context/ConfigContext';

/**
 * ThemeProvider applies theme colors from configuration to CSS variables
 * This allows dynamic theming based on backend configuration
 */
export const ThemeProvider = memo(function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { config } = useConfig();

  useEffect(() => {
    if (config?.theme?.colors) {
      const { colors } = config.theme;

      // Apply theme colors as CSS custom properties
      document.documentElement.style.setProperty('--color-primary', colors.primary);
      document.documentElement.style.setProperty('--color-primary-dark', colors.primaryDark);
      document.documentElement.style.setProperty('--color-primary-light', colors.primaryLight);
      document.documentElement.style.setProperty('--color-secondary', colors.secondary);
      document.documentElement.style.setProperty('--color-accent', colors.accent);
      document.documentElement.style.setProperty('--color-background', colors.background);
      document.documentElement.style.setProperty('--color-text', colors.text);
    }
  }, [config.theme]);

  return <>{children}</>;
});
