import { tokens } from './tokens.js';

export { tokens };

export type ThemePreference = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export type BrandScale = keyof typeof tokens.color.brand.evergreen;
export type NeutralScale = keyof typeof tokens.color.neutral;
export type SpacingScale = keyof typeof tokens.spacing;
export type RadiusScale = keyof typeof tokens.radius;
export type FontSizeScale = keyof typeof tokens.typography.fontSize;

export default tokens;
