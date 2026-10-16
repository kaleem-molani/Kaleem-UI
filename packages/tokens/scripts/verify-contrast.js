import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tokensPath = path.resolve(__dirname, '../src/tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return [r, g, b];
}

function luminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrast(hex1, hex2) {
  const lum1 = luminance(...hexToRgb(hex1));
  const lum2 = luminance(...hexToRgb(hex2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const lightTheme = tokens.theme.light;
const darkTheme = tokens.theme.dark;
const semantic = tokens.color.semantic;

const lightChecks = [
  { name: 'Light Text Primary on Surface', fg: lightTheme.textPrimary, bg: lightTheme.surface, min: 4.5 },
  { name: 'Light Text Primary on Canvas', fg: lightTheme.textPrimary, bg: lightTheme.canvas, min: 4.5 },
  { name: 'Light Text Secondary on Surface', fg: lightTheme.textSecondary, bg: lightTheme.surface, min: 4.5 },
  { name: 'Light Text Muted Accessible on Surface', fg: lightTheme.textMutedAccessible, bg: lightTheme.surface, min: 4.5 },
  { name: 'Light Focus Ring on Surface (UI Component)', fg: lightTheme.focusRing, bg: lightTheme.surface, min: 3.0 },
  { name: 'Light Success Text on Success Surface', fg: semantic.success.light, bg: semantic.success.surfaceLight, min: 4.5 },
  { name: 'Light Warning Text on Warning Surface', fg: semantic.warning.light, bg: semantic.warning.surfaceLight, min: 4.5 },
  { name: 'Light Danger Text on Danger Surface', fg: semantic.danger.light, bg: semantic.danger.surfaceLight, min: 4.5 },
  { name: 'Light Info Text on Info Surface', fg: semantic.info.light, bg: semantic.info.surfaceLight, min: 4.5 }
];

const darkChecks = [
  { name: 'Dark Text Primary on Surface', fg: darkTheme.textPrimary, bg: darkTheme.surface, min: 4.5 },
  { name: 'Dark Text Primary on Canvas', fg: darkTheme.textPrimary, bg: darkTheme.canvas, min: 4.5 },
  { name: 'Dark Text Secondary on Surface', fg: darkTheme.textSecondary, bg: darkTheme.surface, min: 4.5 },
  { name: 'Dark Text Muted on Surface', fg: darkTheme.textMuted, bg: darkTheme.surface, min: 4.5 },
  { name: 'Dark Text Muted Accessible on Surface', fg: darkTheme.textMutedAccessible, bg: darkTheme.surface, min: 4.5 },
  { name: 'Dark Focus Ring on Surface (UI Component)', fg: darkTheme.focusRing, bg: darkTheme.surface, min: 3.0 },
  { name: 'Dark Success Text on Success Surface', fg: semantic.success.dark, bg: semantic.success.surfaceDark, min: 4.5 },
  { name: 'Dark Warning Text on Warning Surface', fg: semantic.warning.dark, bg: semantic.warning.surfaceDark, min: 4.5 },
  { name: 'Dark Danger Text on Danger Surface', fg: semantic.danger.dark, bg: semantic.danger.surfaceDark, min: 4.5 },
  { name: 'Dark Info Text on Info Surface', fg: semantic.info.dark, bg: semantic.info.surfaceDark, min: 4.5 }
];

let failed = 0;
for (const check of [...lightChecks, ...darkChecks]) {
  const ratio = contrast(check.fg, check.bg);
  const rounded = Math.round(ratio * 100) / 100;
  if (ratio >= check.min) {
    console.log(`[PASS] ${check.name}: ${rounded}:1 (min ${check.min}:1)`);
  } else {
    console.error(`[FAIL] ${check.name}: ${rounded}:1 (requires ${check.min}:1)`);
    failed++;
  }
}

assert.strictEqual(failed, 0, `Contrast verification failed with ${failed} violations.`);
console.log('\nAll WCAG 2.1 AA token contrast invariants passed successfully.');
