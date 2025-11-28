'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { RestaurantConfig } from '@/hooks/useRestaurantConfig';

type ConfigContextType = {
  config: RestaurantConfig;
  loading: boolean;
  error: Error | null;
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children, initialConfig }: { children: ReactNode; initialConfig: RestaurantConfig }) {
  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ config: initialConfig, loading: false, error: null }), [initialConfig]);

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
