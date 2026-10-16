import React, { useEffect, useState } from 'react';
import { ThemeContext, STORAGE_KEY } from './theme-context-def.js';
import type { ThemePreference, ResolvedTheme } from './theme-types.js';

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultPreference?: ThemePreference;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultPreference = 'system',
  storageKey = STORAGE_KEY,
}) => {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => {
    try {
      const stored = localStorage.getItem(storageKey) as ThemePreference;
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    } catch {
      // In SSR or restricted storage environments
    }
    return defaultPreference;
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  useEffect(() => {
    const getSystemTheme = (): ResolvedTheme => {
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    };

    const updateResolved = () => {
      const resolved = preference === 'system' ? getSystemTheme() : preference;
      setResolvedTheme(resolved);
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', resolved);
        document.documentElement.style.colorScheme = resolved;
      }
    };

    updateResolved();

    if (preference === 'system' && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => updateResolved();
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [preference]);

  const setPreference = (newPref: ThemePreference) => {
    setPreferenceState(newPref);
    try {
      localStorage.setItem(storageKey, newPref);
    } catch {
      // Storage unavailable
    }
  };

  return (
    <ThemeContext.Provider value={{ preference, resolvedTheme, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
};
