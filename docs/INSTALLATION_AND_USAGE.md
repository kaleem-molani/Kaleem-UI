# Installation and Usage Guide

Kaleem UI is a modular React component library and token-driven design system engineered with personal evergreen and cool mint aesthetics.

## Installation

### Via Package Manager (npm / pnpm / yarn)

```bash
pnpm add @kaleem-ui/tokens @kaleem-ui/react
# or
npm install @kaleem-ui/tokens @kaleem-ui/react
```

### Peer Dependencies
Kaleem UI requires React 18 or 19:
```bash
pnpm add react react-dom
```

---

## Getting Started

### 1. Import Canonical Semantic Tokens
Import the compiled CSS variables stylesheet at the root of your application (e.g., `main.tsx`, `App.tsx`, or `_app.tsx`):

```tsx
// Imports light/dark theme CSS custom properties and resets
import '@kaleem-ui/tokens/themes.css';
```

### 2. Wrap Application in ThemeProvider
The `ThemeProvider` manages automatic system preference synchronization (`@media (prefers-color-scheme: dark)`) and manual light/dark overrides:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@kaleem-ui/react';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultPreference="system">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

### 3. Consume Primitives & Application Patterns

#### Buttons & Actions
```tsx
import { Button, IconButton } from '@kaleem-ui/react';

export function ActionRow() {
  return (
    <div style={{ display: 'flex', gap: 'var(--kui-space-3)' }}>
      <Button variant="primary" size="md" onClick={() => console.log('Primary')}>
        Provision Token
      </Button>
      <Button variant="outline" size="md">
        Cancel
      </Button>
      <IconButton
        aria-label="Refresh telemetry"
        variant="ghost"
        icon={<span>⟳</span>}
      />
    </div>
  );
}
```

#### Page Header & Cards
```tsx
import { PageHeader, Card, Text, Button } from '@kaleem-ui/react';

export function DashboardHeader() {
  return (
    <div>
      <PageHeader
        title="Microservice Perimeters"
        description="Active mutual TLS authentication credentials"
        breadcrumbs={[
          { label: 'Security', href: '/security' },
          { label: 'Perimeters', current: true },
        ]}
        actions={<Button variant="primary">New Perimeter</Button>}
      />

      <Card
        variant="bordered"
        header={<Text variant="label">Active Workload Node</Text>}
      >
        <Text variant="body">Production mesh cluster running smoothly across 3 availability zones.</Text>
      </Card>
    </div>
  );
}
```

#### Data Tables with Multi-Row Selection
```tsx
import { DataTable, Badge } from '@kaleem-ui/react';
import { useState } from 'react';

interface ServiceKey {
  id: string;
  name: string;
  status: 'Active' | 'Revoked';
}

export function KeysTable() {
  const [selected, setSelected] = useState<string[]>(['1']);

  const keys: ServiceKey[] = [
    { id: '1', name: 'Billing Webhook', status: 'Active' },
    { id: '2', name: 'Legacy Ingress', status: 'Revoked' },
  ];

  return (
    <DataTable
      data={keys}
      keyExtractor={(item) => item.id}
      selectable
      selectedKeys={selected}
      onSelectionChange={setSelected}
      columns={[
        { key: 'name', header: 'Key Name' },
        {
          key: 'status',
          header: 'Status',
          render: (item) => (
            <Badge variant={item.status === 'Active' ? 'success' : 'danger'} dot size="sm">
              {item.status}
            </Badge>
          ),
        },
      ]}
    />
  );
}
```

#### Modal Dialogs
```tsx
import { Dialog, Button } from '@kaleem-ui/react';
import { useState } from 'react';

export function ProvisionModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Create Service Secret"
        description="Assign credential scopes for automated background jobs."
        actions={
          <Button variant="primary" onClick={() => setOpen(false)}>
            Confirm
          </Button>
        }
      >
        <p>Dialog body content using native HTML5 modal top-layer.</p>
      </Dialog>
    </>
  );
}
```
