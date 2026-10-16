import { useContext } from 'react';
import { ThemeContext } from './theme-context-def.js';
import type { ThemeContextType } from './theme-types.js';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
