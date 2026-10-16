import { createContext } from 'react';
import type { ThemeContextType } from './theme-types.js';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const STORAGE_KEY = 'kaleem-ui-theme-preference';
