# Kaleem UI

**A personal design system and React component library for modern web applications.**

[![CI](https://github.com/kaleem/kaleem-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/kaleem/kaleem-ui/actions)
[![Version](https://img.shields.io/badge/version-1.0.0-167653.svg)](./CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-83F0C0.svg)](./LICENSE)

Kaleem UI provides a unified visual language, accessible React primitives, high-order application patterns, and automated quality gates for personal and internal web applications built with AI coding agents.

---

## Product Principles

1. **One Shared Visual Identity**: Natural evergreen forest brand (`#102C27` / `#167653`), cool mint accents (`#83F0C0`), and mineral-tinted warm neutrals.
2. **Product-Specific Architecture**: Utilitarian, flexible components that adapt to task requirements rather than forcing a generic dashboard template.
3. **Accessibility First**: WCAG 2.1 AA contrast invariants verified by automated assertions, full keyboard navigation, explicit ARIA bindings, and native HTML5 top-layer dialogs.
4. **Progressive Disclosure & Balanced Density**: Structured forms, disclosure accordions, responsive tabs, and compact tables.
5. **Zero Decorative Slop**: No purposeless gradients, decorative icon bloat, fake testimonials, or animation without function.

---

## Package Architecture

| Package | Version | Description |
| :--- | :--- | :--- |
| [`@kaleem-ui/tokens`](./packages/tokens) | `1.0.0` | Canonical semantic CSS custom properties (`themes.css`) and typed JS token object |
| [`@kaleem-ui/react`](./packages/react) | `1.0.0` | 45 accessible React primitives, composite application patterns, and layout components |
| [`preview`](./preview) | `1.0.0` | Interactive design catalog (Foundations, Primitives, Patterns, Guidelines) and reference app |
| [`apps/standalone-app`](./apps/standalone-app) | `1.0.0` | Reference sample consumer application verifying standalone consumption |

---

## Quick Start

```bash
# Install packages
pnpm add @kaleem-ui/tokens @kaleem-ui/react
```

### 1. Import Theme Stylesheet
```tsx
import '@kaleem-ui/tokens/themes.css';
```

### 2. Wrap App with ThemeProvider
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@kaleem-ui/react';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultPreference="system">
    <App />
  </ThemeProvider>
);
```

### 3. Consume Components
```tsx
import { Button, Card, DataTable, Badge, PageHeader } from '@kaleem-ui/react';

export function WorkloadView() {
  return (
    <Card variant="bordered" header={<PageHeader title="Cluster Gateway" />}>
      <Button variant="primary">Provision Key</Button>
    </Card>
  );
}
```

---

## Verification & Quality Gates

Run the verification suite across the monorepo:

```bash
# Typecheck all packages
pnpm typecheck

# Lint all code
pnpm lint

# Run contrast and a11y contract test suites
pnpm test

# Verify package release and consumer consumption
pnpm release:check

# Run preview development server
pnpm --filter preview dev
```

---

## Documentation Map

- [`AGENTS.md`](./AGENTS.md): Agent rules and discovery protocols.
- [`docs/INSTALLATION_AND_USAGE.md`](./docs/INSTALLATION_AND_USAGE.md): Detailed installation, theme switching, and component usage guides.
- [`docs/MIGRATION_GUIDE.md`](./docs/MIGRATION_GUIDE.md): Migration guide from ad-hoc styles to Kaleem UI v1.0.
- [`docs/RELEASE_PROCESS.md`](./docs/RELEASE_PROCESS.md): Quality gates, SemVer rules, and release checklist.
- [`CHANGELOG.md`](./CHANGELOG.md): Complete release history.
