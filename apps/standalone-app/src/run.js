import assert from 'node:assert';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { tokens } from '@kaleemmolani/tokens';
import {
  Button,
  Card,
  PageHeader,
  DataTable,
  Badge,
  Container,
  ThemeProvider,
} from '@kaleemmolani/react';

console.log('--- Verifying Standalone Consumer Application ---');

// 1. Verify Tokens
assert(tokens.color.brand.evergreen[500] === '#167653', 'Brand token must be accessible');
assert(tokens.color.brand.evergreen[300] === '#83F0C0', 'Accent token must be accessible');
console.log('[PASS] Standalone app loaded @kaleemmolani/tokens correctly');


// 2. Verify Component Composition
function StandaloneDashboard() {
  return React.createElement(
    ThemeProvider,
    { defaultPreference: 'system' },
    React.createElement(
      Container,
      { size: 'md' },
      React.createElement(PageHeader, {
        title: 'Microservice Cluster Overview',
        description: 'Deployed across isolated virtual private clouds',
        breadcrumbs: [
          { label: 'Infrastructure', href: '#' },
          { label: 'Clusters', current: true },
        ],
        actions: React.createElement(Button, { variant: 'primary' }, 'Deploy Node'),
      }),
      React.createElement(
        Card,
        { variant: 'bordered' },
        React.createElement(DataTable, {
          data: [
            { id: 'node-1', name: 'US-East Core Router', status: 'Healthy' },
            { id: 'node-2', name: 'EU-Central Relay Node', status: 'Healthy' },
          ],
          keyExtractor: (item) => item.id,
          columns: [
            { key: 'name', header: 'Node Identity' },
            {
              key: 'status',
              header: 'Status',
              render: (item) =>
                React.createElement(
                  Badge,
                  { variant: 'success', dot: true, size: 'sm' },
                  item.status
                ),
            },
          ],
        })
      )
    )
  );
}

const html = renderToString(React.createElement(StandaloneDashboard));

assert(html.includes('Microservice Cluster Overview'), 'Rendered output must include title');
assert(html.includes('Deploy Node'), 'Rendered output must include button label');
assert(html.includes('US-East Core Router'), 'Rendered output must include table row');
assert(html.includes('kui-badge'), 'Rendered output must include badge');

console.log('[PASS] Standalone app successfully rendered full UI component tree to string');
console.log('✓ Standalone consumer verification PASSED.');
