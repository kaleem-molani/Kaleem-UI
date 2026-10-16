import assert from 'node:assert';
import * as KaleemReact from '../dist/index.js';

const expectedExports = [
  'Button',
  'IconButton',
  'Badge',
  'Avatar',
  'Separator',
  'InlineAlert',
  'Input',
  'Select',
  'Checkbox',
  'Switch',
  'Textarea',
  'RadioGroup',
  'Heading',
  'Text',
  'Container',
  'Stack',
  'Inline',
  'Grid',
  'Spinner',
  'Skeleton',
  'Tooltip',
  'Dialog',
  'Popover',
  'DropdownMenu',
  'Tabs',
  'Accordion',
  'Breadcrumbs',
  'PageHeader',
  'Card',
  'FormField',
  'FormLayout',
  'SearchField',
  'FilterBar',
  'DataTable',
  'EmptyState',
  'ConfirmationDialog',
  'Toast',
  'AppShell',
  'ThemeProvider',
  'useTheme',
  'SunIcon',
  'MoonIcon',
  'MonitorIcon',
  'CheckIcon',
  'AlertCircleIcon'
];

for (const name of expectedExports) {
  assert(KaleemReact[name] !== undefined, `Missing export ${name} from @kaleem-ui/react`);
  assert(typeof KaleemReact[name] === 'function', `Export ${name} should be a callable function or component`);
}

console.log(`All ${expectedExports.length} core primitives, application patterns, overlays, and hooks verified in @kaleem-ui/react.`);

import('./verify-a11y-contracts.js');
