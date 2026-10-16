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
  Pagination,
  Stepper,
  MetricCard,
  Timeline,
  Toast,
  ToastProvider,
  ChartContainer,
  Sparkline,
  BarChart,
  DonutChart,
  Spinner,
  InlineAlert,
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

// 11. DataTable contract (semantic table, row selection, sorting, pagination slot)
{
  const html = renderToString(React.createElement(DataTable, {
    data: [{ id: '1', name: 'Gateway 1', status: 'Active' }],
    keyExtractor: (item) => item.id,
    selectable: true,
    selectedKeys: ['1'],
    sortConfig: { key: 'name', direction: 'asc' },
    columns: [
      { key: 'name', header: 'Node Name', sortable: true },
      { key: 'status', header: 'Status' },
    ],
    pagination: React.createElement('div', { id: 'table-pagination-test' }, 'Pagination Slot'),
  }));
  assert(html.includes('<table'), 'DataTable must render semantic <table> element');
  assert(html.includes('<thead'), 'DataTable must render <thead>');
  assert(html.includes('<tbody'), 'DataTable must render <tbody>');
  assert(html.includes('aria-selected="true"'), 'Selected table row must set aria-selected="true"');
  assert(html.includes('aria-sort="ascending"'), 'Sorted column must set aria-sort="ascending"');
  assert(html.includes('Sort by Node Name'), 'Sortable column header must have descriptive aria-label');
  assert(html.includes('id="table-pagination-test"'), 'DataTable must render pagination container when passed');
  assert(html.includes('data-height-mode="auto"'), 'DataTable default must have data-height-mode="auto"');

  const fillHtml = renderToString(React.createElement(DataTable, {
    data: [{ id: '1', name: 'Gateway 1', status: 'Active' }],
    keyExtractor: (item) => item.id,
    heightMode: 'fill',
    columns: [{ key: 'name', header: 'Node Name' }],
  }));
  assert(fillHtml.includes('data-height-mode="fill"'), 'DataTable fill mode must set data-height-mode="fill"');
  assert(fillHtml.includes('sticky'), 'DataTable fill mode must render sticky header');

  const fullHeightHtml = renderToString(React.createElement(DataTable, {
    data: [{ id: '1', name: 'Gateway 1', status: 'Active' }],
    keyExtractor: (item) => item.id,
    fullHeight: true,
    columns: [{ key: 'name', header: 'Node Name' }],
  }));
  assert(fullHeightHtml.includes('data-height-mode="fill"'), 'DataTable fullHeight prop must activate fill mode');
  console.log('[PASS] DataTable semantic structure, sorting, pagination, and heightMode contracts');
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

// 13. Pagination primitive contract
{
  const pagHtml = renderToString(React.createElement(Pagination, {
    currentPage: 2,
    totalPages: 5,
    totalItems: 48,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50],
    onPageChange: () => {},
    onPageSizeChange: () => {},
    ariaLabel: 'Key list pagination',
  }));
  assert(pagHtml.includes('<nav'), 'Pagination must be wrapped in a <nav> landmark');
  assert(pagHtml.includes('aria-label="Key list pagination"'), 'Pagination must have an accessible label');
  assert(pagHtml.includes('aria-current="page"'), 'Active page must have aria-current="page"');
  assert(pagHtml.includes('aria-label="Previous page"'), 'Previous button must have aria-label');
  assert(pagHtml.includes('aria-label="Next page"'), 'Next button must have aria-label');
  assert(pagHtml.includes('Rows per page'), 'Page size dropdown must have accessible label');
  console.log('[PASS] Pagination navigation and aria-current contracts');
}

// 14. ToastProvider contract (live region, container)
{
  const tHtml = renderToString(React.createElement(ToastProvider, null, React.createElement('div', null, 'App Content')));
  assert(tHtml.includes('role="region"'), 'ToastProvider must render notification live region');
  assert(tHtml.includes('aria-label="Notifications"'), 'ToastProvider must label notifications region');
  assert(tHtml.includes('App Content'), 'ToastProvider must render child tree');
  console.log('[PASS] ToastProvider live region and container contracts');
}

// 15. MetricCard contract
{
  const mHtml = renderToString(React.createElement(MetricCard, {
    label: 'Ingestion Latency',
    value: '42.4ms',
    delta: '-12.8%',
    deltaType: 'decrease',
    deltaSentiment: 'positive',
    subtext: 'vs previous 30 days',
  }));
  assert(mHtml.includes('Ingestion Latency'), 'MetricCard must display label');
  assert(mHtml.includes('uppercase'), 'MetricCard must set uppercase style');
  assert(mHtml.includes('42.4ms'), 'MetricCard must display main value');
  assert(mHtml.includes('-12.8%'), 'MetricCard must display trend delta');
  assert(mHtml.includes('vs previous 30 days'), 'MetricCard must display subtext');
  console.log('[PASS] MetricCard telemetry and delta sentiment contracts');
}

// 16. Timeline contract
{
  const tmHtml = renderToString(React.createElement(Timeline, {
    items: [
      { id: 't1', title: 'TLS Cert Renewed', timestamp: '5m ago', status: 'success' },
      { id: 't2', title: 'Key Revocation', timestamp: '1h ago', status: 'danger' },
    ],
  }));
  assert(tmHtml.includes('<ol'), 'Timeline must use semantic ordered list');
  assert(tmHtml.includes('<li'), 'Timeline must render list items');
  assert(tmHtml.includes('TLS Cert Renewed'), 'Timeline must display event title');
  assert(tmHtml.includes('5m ago'), 'Timeline must display timestamp');
  console.log('[PASS] Timeline list semantics and event track contracts');
}

// 17. Stepper contract
{
  const stHtml = renderToString(React.createElement(Stepper, {
    steps: [
      { id: 's1', title: 'Identity' },
      { id: 's2', title: 'Scopes', optional: true },
      { id: 's3', title: 'Review' },
    ],
    activeStep: 1,
  }));
  assert(stHtml.includes('<nav'), 'Stepper must be wrapped in a <nav> landmark');
  assert(stHtml.includes('aria-current="step"'), 'Active step must set aria-current="step"');
  assert(stHtml.includes('(Optional)'), 'Optional step must display indicator');
  console.log('[PASS] Stepper progress navigation and aria-current contracts');
}

// 18. Charts contract (ChartContainer, Sparkline, BarChart, DonutChart)
{
  const cHtml = renderToString(React.createElement(ChartContainer, {
    title: 'Cluster Throughput',
    subtitle: 'Megabits per second',
    legend: React.createElement('div', null, 'Legend'),
  }, React.createElement(Sparkline, { data: [10, 20, 15, 30, 25, 40] })));
  assert(cHtml.includes('role="img"'), 'ChartContainer must set role="img"');
  assert(cHtml.includes('aria-label="Cluster Throughput"'), 'ChartContainer must have accessible label');
  assert(cHtml.includes('<svg'), 'Sparkline must render SVG element');

  const dHtml = renderToString(React.createElement(DonutChart, {
    segments: [
      { label: 'Active', value: 80 },
      { label: 'Idle', value: 20 },
    ],
    centerLabel: '100 Nodes',
  }));
  assert(dHtml.includes('100 Nodes'), 'DonutChart must display center metric readout');
  assert(dHtml.includes('Active: 80'), 'DonutChart segment must render accessible title');

  const bHtml = renderToString(React.createElement(BarChart, {
    data: [{ label: 'Mon', value: 120 }, { label: 'Tue', value: 180 }],
  }));
  assert(bHtml.includes('Mon'), 'BarChart must render categorical labels');
  assert(bHtml.includes('180'), 'BarChart must render bar value');
  console.log('[PASS] Zero-dependency SVG Charts accessibility & rendering contracts');
}

console.log('✓ All 18 accessibility & ARIA contracts verified successfully.');
