import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--- Simulating Consumer Application Integration ---');

// 1. Resolve tokens from packages/tokens
const tokensPath = path.join(rootDir, 'packages', 'tokens', 'dist', 'index.js');
const themesCssPath = path.join(rootDir, 'packages', 'tokens', 'src', 'themes.css');

assert(fs.existsSync(tokensPath), 'Consumer requires tokens dist/index.js');
assert(fs.existsSync(themesCssPath), 'Consumer requires themes.css');

const tokensModule = await import(pathToFileURL(tokensPath).href);
assert(tokensModule.tokens, 'Consumer must be able to import tokens object');
assert(tokensModule.tokens.color?.brand?.evergreen?.[500], 'Token evergreen-500 must be available');
assert.strictEqual(tokensModule.tokens.color.brand.evergreen[500], '#167653');
console.log('[PASS] Consumer successfully read JS design tokens & verified brand scale');

// 2. Resolve react primitives and renderToString
const reactPkgPath = path.join(rootDir, 'packages', 'react', 'dist', 'index.js');
const reactDomServerPath = path.join(rootDir, 'packages', 'react', 'node_modules', 'react-dom', 'server.js');
const reactPkgUrl = pathToFileURL(reactPkgPath).href;
const reactDomServerUrl = pathToFileURL(reactDomServerPath).href;
const reactPath = path.join(rootDir, 'packages', 'react', 'node_modules', 'react', 'index.js');
const React = (await import(pathToFileURL(reactPath).href)).default;
const reactDomServer = await import(reactDomServerUrl);
const KaleemReact = await import(reactPkgUrl);

// 3. Construct a representative consumer screen
const ConsumerScreen = () => {
  return React.createElement(
    KaleemReact.Container,
    { size: 'lg' },
    React.createElement(KaleemReact.PageHeader, {
      title: 'Consumer Workload Dashboard',
      description: 'Clean external application consumption test',
      breadcrumbs: [
        { label: 'Platform', href: '#' },
        { label: 'Workloads', current: true },
      ],
      actions: React.createElement(
        KaleemReact.Button,
        { variant: 'primary', size: 'md' },
        'Deploy Workload'
      ),
    }),
    React.createElement(
      KaleemReact.Card,
      { variant: 'bordered' },
      React.createElement(KaleemReact.DataTable, {
        data: [
          { id: 'app-1', name: 'Payments Gateway', status: 'Healthy' },
          { id: 'app-2', name: 'User Authentication Node', status: 'Healthy' },
        ],
        keyExtractor: (item) => item.id,
        columns: [
          { key: 'name', header: 'Service Name' },
          { key: 'status', header: 'Health Status' },
        ],
      })
    )
  );
};

// 4. Render to string and assert output
const renderedHtml = reactDomServer.renderToString(React.createElement(ConsumerScreen));

assert(renderedHtml.includes('Consumer Workload Dashboard'), 'Rendered HTML must contain PageHeader title');
assert(renderedHtml.includes('Deploy Workload'), 'Rendered HTML must contain Button label');
assert(renderedHtml.includes('kui-btn-primary'), 'Rendered HTML must contain Button primary class');
assert(renderedHtml.includes('Payments Gateway'), 'Rendered HTML must contain table row data');
assert(renderedHtml.includes('<table'), 'Rendered HTML must contain semantic table element');

console.log('[PASS] Consumer screen composed and rendered to string with 0 runtime errors');
console.log('✓ Consumer integration verification passed successfully.');
