import assert from 'node:assert';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  Button,
  IconButton,
  Input,
  Checkbox,
  Switch,
  RadioGroup,
  Dialog,
  Tabs,
  Accordion,
  Breadcrumbs,
  DataTable,
  Spinner,
  InlineAlert,
  Toast,
} from '../dist/index.js';

console.log('--- Running Accessibility & ARIA Contract Verification ---');

// 1. Button contract
{
  const html = renderToString(React.createElement(Button, { variant: 'primary', disabled: true }, 'Submit'));
  assert(html.includes('disabled=""') || html.includes('disabled'), 'Disabled button must contain disabled attribute');
  assert(html.includes('aria-disabled="true"'), 'Disabled button must set aria-disabled="true"');

  const loadingHtml = renderToString(React.createElement(Button, { loading: true }, 'Save'));
  assert(loadingHtml.includes('aria-busy="true"'), 'Loading button must set aria-busy="true"');
  assert(loadingHtml.includes('kui-spin') || loadingHtml.includes('svg'), 'Loading button must render spinner SVG element');
  console.log('[PASS] Button a11y & loading contracts');
}

// 2. IconButton contract
{
  const html = renderToString(React.createElement(IconButton, { 'aria-label': 'Close panel', icon: React.createElement('span', null, 'x') }));
  assert(html.includes('aria-label="Close panel"'), 'IconButton must render explicit aria-label');
  console.log('[PASS] IconButton a11y label contract');
}

// 3. Form Input contract (id association, error, aria-describedby)
{
  const html = renderToString(React.createElement(Input, {
    label: 'API Key Name',
    description: 'Unique internal identifier',
    error: 'Name is required',
    required: true,
  }));
  assert(html.includes('<label'), 'Input with label prop must render label element');
  assert(html.includes('for='), 'Input label must have htmlFor attribute');
  assert(html.includes('aria-invalid="true"'), 'Input with error must have aria-invalid="true"');
  assert(html.includes('role="alert"'), 'Input error message must have role="alert"');
  assert(html.includes('aria-describedby='), 'Input must link description and error via aria-describedby');
  assert(html.includes('aria-required="true"') || html.includes('required=""') || html.includes('required'), 'Input with required must indicate requirement');
  console.log('[PASS] Input label and error linkage contracts');
}

// 4. Switch contract
{
  const html = renderToString(React.createElement(Switch, {
    label: 'Enable mTLS',
    checked: true,
    onChange: () => {},
  }));
  assert(html.includes('role="switch"'), 'Switch must render role="switch"');
  assert(html.includes('aria-checked="true"'), 'Checked switch must render aria-checked="true"');
  console.log('[PASS] Switch role and aria-checked contract');
}

// 5. RadioGroup contract
{
  const html = renderToString(React.createElement(RadioGroup, {
    label: 'Encryption Standard',
    name: 'enc',
    value: 'aes256',
    options: [
      { label: 'AES-256-GCM', value: 'aes256' },
      { label: 'ChaCha20-Poly1305', value: 'chacha' },
    ],
    onChange: () => {},
  }));
  assert(html.includes('role="radiogroup"'), 'RadioGroup must have role="radiogroup"');
  assert(html.includes('aria-labelledby='), 'RadioGroup must have aria-labelledby');
  assert(html.includes('type="radio"'), 'RadioGroup options must be type="radio"');
  assert(html.includes('checked=""') || html.includes('checked'), 'Selected radio must be checked');
  console.log('[PASS] RadioGroup role and selection contract');
}

// 6. Checkbox contract (including indeterminate / aria-label)
{
  const html = renderToString(React.createElement(Checkbox, {
    'aria-label': 'Select row 1',
    checked: true,
    onChange: () => {},
  }));
  assert(html.includes('type="checkbox"'), 'Checkbox must be type="checkbox"');
  assert(html.includes('aria-label="Select row 1"'), 'Pure checkbox must render aria-label');
  console.log('[PASS] Checkbox pure and label contracts');
}

// 7. Dialog contract (HTML5 dialog, aria-modal, title association)
{
  const html = renderToString(React.createElement(Dialog, {
    open: true,
    title: 'Confirm Revocation',
    description: 'This will terminate downstream TLS connections',
    onClose: () => {},
  }, 'Body content'));
  assert(html.includes('<dialog'), 'Dialog must render HTML5 <dialog> element');
  assert(html.includes('aria-modal="true"'), 'Dialog must specify aria-modal="true"');
  assert(html.includes('aria-labelledby='), 'Dialog must associate title via aria-labelledby');
  assert(html.includes('aria-describedby='), 'Dialog must associate description via aria-describedby');
  console.log('[PASS] HTML5 Dialog modal and ARIA contracts');
}

// 8. Tabs contract (tablist, tab, selected, tabpanel)
{
  const html = renderToString(React.createElement(Tabs, {
    ariaLabel: 'Configuration Tabs',
    defaultTab: 'tab1',
    items: [
      { id: 'tab1', label: 'General', content: 'General content' },
      { id: 'tab2', label: 'Security', content: 'Security content' },
    ],
  }));
  assert(html.includes('role="tablist"'), 'Tabs container must have role="tablist"');
  assert(html.includes('aria-label="Configuration Tabs"'), 'Tablist must have accessible label');
  assert(html.includes('role="tab"'), 'Tab items must have role="tab"');
  assert(html.includes('aria-selected="true"'), 'Active tab must have aria-selected="true"');
  assert(html.includes('aria-controls='), 'Tabs must link to tabpanel via aria-controls');
  assert(html.includes('role="tabpanel"'), 'Tab content must have role="tabpanel"');
  console.log('[PASS] Tabs tablist and tabpanel contracts');
}

// 9. Accordion contract (aria-expanded, aria-controls, region)
{
  const html = renderToString(React.createElement(Accordion, {
    defaultExpanded: ['a1'],
    items: [
      { id: 'a1', title: 'Why is mTLS enforced?', content: 'Ensures mutual client identity.' },
    ],
  }));
  assert(html.includes('aria-expanded='), 'Accordion trigger must have aria-expanded');
  assert(html.includes('aria-controls='), 'Accordion trigger must have aria-controls');
  assert(html.includes('role="region"'), 'Accordion content panel must have role="region"');
  console.log('[PASS] Accordion disclosure and region contracts');
}

// 10. Breadcrumbs contract
{
  const html = renderToString(React.createElement(Breadcrumbs, {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Certificates', href: '/certs' },
      { label: 'Ingress Key', current: true },
    ],
  }));
  assert(html.includes('aria-label="Breadcrumbs"') || html.includes('aria-label="Breadcrumb"'), 'Breadcrumbs must have aria-label');
  assert(html.includes('<ol'), 'Breadcrumbs must use ordered list');
  assert(html.includes('aria-current="page"'), 'Current breadcrumb must have aria-current="page"');
  console.log('[PASS] Breadcrumbs hierarchy and aria-current contracts');
}

// 11. DataTable contract (semantic table, row selection)
{
  const html = renderToString(React.createElement(DataTable, {
    data: [{ id: '1', name: 'Gateway 1', status: 'Active' }],
    keyExtractor: (item) => item.id,
    selectable: true,
    selectedKeys: ['1'],
    columns: [
      { key: 'name', header: 'Node Name' },
      { key: 'status', header: 'Status' },
    ],
  }));
  assert(html.includes('<table'), 'DataTable must render semantic <table> element');
  assert(html.includes('<thead'), 'DataTable must render <thead>');
  assert(html.includes('<tbody'), 'DataTable must render <tbody>');
  assert(html.includes('aria-selected="true"'), 'Selected table row must set aria-selected="true"');
  console.log('[PASS] DataTable semantic structure and selection contracts');
}

// 12. Spinner & Feedback contracts
{
  const spHtml = renderToString(React.createElement(Spinner, { label: 'Loading telemetry' }));
  assert(spHtml.includes('role="status"'), 'Spinner must have role="status"');
  assert(spHtml.includes('Loading telemetry'), 'Spinner must announce label');

  const alertHtml = renderToString(React.createElement(InlineAlert, { variant: 'danger', title: 'Node down' }, 'Failure message'));
  assert(alertHtml.includes('role="alert"'), 'Danger alert must have role="alert"');

  const toastHtml = renderToString(React.createElement(Toast, { message: 'Settings saved', variant: 'success' }));
  assert(toastHtml.includes('role="status"'), 'Success toast must have role="status"');
  console.log('[PASS] Spinner, InlineAlert, and Toast live region contracts');
}

console.log('✓ All 12 accessibility & ARIA contracts verified successfully.');
