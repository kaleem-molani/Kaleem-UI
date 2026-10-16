import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--- Verifying Release Integrity & Package Outputs ---');

// 1. Verify @kaleem-ui/tokens
{
  const tokensDir = path.join(rootDir, 'packages', 'tokens');
  const pkg = JSON.parse(fs.readFileSync(path.join(tokensDir, 'package.json'), 'utf8'));

  assert.strictEqual(pkg.name, '@kaleem-ui/tokens');
  assert.strictEqual(pkg.type, 'module', 'tokens package must be ESM module');
  assert(pkg.exports['.'], 'tokens package must export root');
  assert(pkg.exports['./themes.css'], 'tokens package must export ./themes.css');
  assert(pkg.exports['./tokens.json'], 'tokens package must export ./tokens.json');

  assert(fs.existsSync(path.join(tokensDir, 'dist', 'index.js')), 'tokens dist/index.js must exist');
  assert(fs.existsSync(path.join(tokensDir, 'dist', 'index.d.ts')), 'tokens dist/index.d.ts must exist');

  const css = fs.readFileSync(path.join(tokensDir, 'src', 'themes.css'), 'utf8');
  assert(css.includes('--kui-color-brand'), 'themes.css must define --kui-color-brand');
  assert(css.includes('--kui-color-canvas'), 'themes.css must define --kui-color-canvas');
  assert(css.includes('--kui-color-surface'), 'themes.css must define --kui-color-surface');
  assert(css.includes('@media (prefers-color-scheme: dark)'), 'themes.css must support system dark scheme');

  console.log('[PASS] @kaleem-ui/tokens export structure and CSS bundle verified');
}

// 2. Verify @kaleem-ui/react
{
  const reactDir = path.join(rootDir, 'packages', 'react');
  const pkg = JSON.parse(fs.readFileSync(path.join(reactDir, 'package.json'), 'utf8'));

  assert.strictEqual(pkg.name, '@kaleem-ui/react');
  assert.strictEqual(pkg.type, 'module', 'react package must be ESM module');
  assert(pkg.exports['.'], 'react package must export root');

  assert(fs.existsSync(path.join(reactDir, 'dist', 'index.js')), 'react dist/index.js must exist');
  assert(fs.existsSync(path.join(reactDir, 'dist', 'index.d.ts')), 'react dist/index.d.ts must exist');

  // Verify no rogue dependencies
  const deps = Object.keys(pkg.dependencies || {});
  assert.deepStrictEqual(deps, ['@kaleem-ui/tokens'], 'react package must only depend on @kaleem-ui/tokens');

  assert(pkg.peerDependencies?.react, 'react must be in peerDependencies');
  assert(pkg.peerDependencies?.['react-dom'], 'react-dom must be in peerDependencies');

  console.log('[PASS] @kaleem-ui/react clean dependency footprint and dist outputs verified');
}

// 3. Verify Version Alignment
{
  const tokensPkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'packages', 'tokens', 'package.json'), 'utf8'));
  const reactPkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'packages', 'react', 'package.json'), 'utf8'));
  assert.strictEqual(tokensPkg.version, reactPkg.version, 'Package versions must be aligned');
  assert.strictEqual(tokensPkg.version, '1.0.0', 'Version should match milestone target 1.0.0');
  console.log(`[PASS] Version alignment verified at v${tokensPkg.version}`);
}

console.log('✓ Release integrity checks completed successfully.');
