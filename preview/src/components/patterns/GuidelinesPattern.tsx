import React from 'react';
import {
  Heading,
  Text,
  Stack,
  Inline,
  Card,
  Badge,
} from '@kaleemmolani/react';

import { CheckIcon, XIcon, ShieldIcon } from '../common/Icons';
import { ContrastAuditPattern } from './ContrastAudit';

export const GuidelinesPattern: React.FC = () => {
  return (
    <Stack gap={6}>
      {/* Design Principles Banner */}
      <Card
        variant="bordered"
        style={{
          backgroundColor: 'var(--kui-color-surface-subtle)',
          borderLeft: '4px solid var(--kui-color-brand)',
        }}
      >
        <Stack gap={2}>
          <Inline gap={2} align="center">
            <ShieldIcon size={18} />
            <Heading as="h2" variant="section">
              Design Guidelines & Quality Principles
            </Heading>
          </Inline>
          <Text variant="body" color="secondary">
            Kaleem UI enforces a personal, utilitarian design philosophy: evergreen and mint identity,
            balanced density, subtle rounding, modern sans-serif typography, and zero decorative bloat.
          </Text>
        </Stack>
      </Card>

      {/* Do / Don't Matrix */}
      <div>
        <Heading as="h3" variant="section" style={{ marginBottom: 'var(--kui-space-3)' }}>
          Component Authoring: Do's and Don'ts
        </Heading>
        <Stack gap={4}>
          {/* Pair 1: Form Toggles */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--kui-space-4)' }}>
            <Card
              variant="bordered"
              header={
                <Inline gap={2} align="center">
                  <Badge variant="success" size="sm" style={{ width: '72px', justifyContent: 'center' }}>
                    <CheckIcon size={12} />
                    <span>DO</span>
                  </Badge>
                  <Text variant="label">Use Checkbox in Deferred Forms</Text>
                </Inline>
              }
            >
              <Text variant="body">
                Use standard Checkboxes in forms that require a manual "Save" or "Submit" step.
                Keep label alignment clean on the left.
              </Text>
            </Card>
            <Card
              variant="bordered"
              header={
                <Inline gap={2} align="center">
                  <Badge variant="danger" size="sm" style={{ width: '72px', justifyContent: 'center' }}>
                    <XIcon size={12} />
                    <span>DON'T</span>
                  </Badge>
                  <Text variant="label">Don't Mix Switch in Deferred Forms</Text>
                </Inline>
              }
            >
              <Text variant="body">
                Do not use Switches for actions that are not immediate binary toggles. Switches imply
                instantaneous activation without a submit button.
              </Text>
            </Card>
          </div>

          {/* Pair 2: Accessible Names */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--kui-space-4)' }}>
            <Card
              variant="bordered"
              header={
                <Inline gap={2} align="center">
                  <Badge variant="success" size="sm" style={{ width: '72px', justifyContent: 'center' }}>
                    <CheckIcon size={12} />
                    <span>DO</span>
                  </Badge>
                  <Text variant="label">Always Provide aria-label on IconButtons</Text>
                </Inline>
              }
            >
              <Text variant="body">
                Ensure every standalone icon button defines a meaningful <code>aria-label</code> describing
                the action (e.g. "Copy credential token", "Revoke key").
              </Text>
            </Card>
            <Card
              variant="bordered"
              header={
                <Inline gap={2} align="center">
                  <Badge variant="danger" size="sm" style={{ width: '72px', justifyContent: 'center' }}>
                    <XIcon size={12} />
                    <span>DON'T</span>
                  </Badge>
                  <Text variant="label">Don't Rely Solely on Visual Icons</Text>
                </Inline>
              }
            >
              <Text variant="body">
                Never render icon-only buttons without an accessible text name. Tooltips alone do not replace
                canonical accessible naming.
              </Text>
            </Card>
          </div>

          {/* Pair 3: Tokens & Colors */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--kui-space-4)' }}>
            <Card
              variant="bordered"
              header={
                <Inline gap={2} align="center">
                  <Badge variant="success" size="sm" style={{ width: '72px', justifyContent: 'center' }}>
                    <CheckIcon size={12} />
                    <span>DO</span>
                  </Badge>
                  <Text variant="label">Consume Semantic CSS Custom Properties</Text>
                </Inline>
              }
            >
              <Text variant="body">
                Use tokens like <code>--kui-color-surface</code>, <code>--kui-color-text-primary</code>, and{' '}
                <code>--kui-color-focus-ring</code> to guarantee automatic light/dark adaptation.
              </Text>
            </Card>
            <Card
              variant="bordered"
              header={
                <Inline gap={2} align="center">
                  <Badge variant="danger" size="sm" style={{ width: '72px', justifyContent: 'center' }}>
                    <XIcon size={12} />
                    <span>DON'T</span>
                  </Badge>
                  <Text variant="label">Don't Hardcode Hex Values in Components</Text>
                </Inline>
              }
            >
              <Text variant="body">
                Never use raw hex colors (#fff, #111) in component styles. Hardcoded values fail during
                theme switches and cause high-contrast violations.
              </Text>
            </Card>
          </div>

          {/* Pair 4: Confirmation Workflows */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--kui-space-4)' }}>
            <Card
              variant="bordered"
              header={
                <Inline gap={2} align="center">
                  <Badge variant="success" size="sm" style={{ width: '72px', justifyContent: 'center' }}>
                    <CheckIcon size={12} />
                    <span>DO</span>
                  </Badge>
                  <Text variant="label">Use ConfirmationDialog for Destructive Acts</Text>
                </Inline>
              }
            >
              <Text variant="body">
                Gate secret revocations, token deletions, and destructive actions behind an explicit modal
                with a red destructive action trigger.
              </Text>
            </Card>
            <Card
              variant="bordered"
              header={
                <Inline gap={2} align="center">
                  <Badge variant="danger" size="sm" style={{ width: '72px', justifyContent: 'center' }}>
                    <XIcon size={12} />
                    <span>DON'T</span>
                  </Badge>
                  <Text variant="label">Don't Silently Delete or Over-Prompt</Text>
                </Inline>
              }
            >
              <Text variant="body">
                Do not trigger destructive operations immediately on click, and avoid confirmation dialogs
                for benign actions (e.g., closing a panel).
              </Text>
            </Card>
          </div>
        </Stack>
      </div>

      {/* Accessibility Requirements */}
      <div>
        <Heading as="h3" variant="section" style={{ marginBottom: 'var(--kui-space-3)' }}>
          Accessibility Architecture & Keyboard Standards
        </Heading>
        <Card variant="bordered">
          <Stack gap={3}>
            <Text variant="body">
              Kaleem UI is engineered to conform with <strong>WCAG 2.1 AA</strong> standards across all surfaces:
            </Text>
            <ul style={{ paddingLeft: 'var(--kui-space-5)', margin: 0, fontSize: 'var(--kui-font-size-sm)', lineHeight: 'var(--kui-line-height-relaxed)', color: 'var(--kui-color-text-secondary)' }}>
              <li><strong>Visible Focus Rings:</strong> Interactive elements display a dedicated 2px solid <code>--kui-color-focus-ring</code> outline on <code>:focus-visible</code>.</li>
              <li><strong>Keyboard Navigation:</strong> Tabs use Left/Right arrows, DropdownMenus support Up/Down arrows and Enter, Dialogs close on Escape.</li>
              <li><strong>Form Controls:</strong> Labels and error messages are programmatically connected via <code>htmlFor</code> and <code>aria-describedby</code>.</li>
              <li><strong>Reduced Motion:</strong> All CSS animations, pulse effects, and transitions respect <code>@media (prefers-reduced-motion: reduce)</code>.</li>
            </ul>
          </Stack>
        </Card>
      </div>

      {/* WCAG Contrast Audit Report */}
      <div>
        <Heading as="h3" variant="section" style={{ marginBottom: 'var(--kui-space-3)' }}>
          Automated Token Contrast Audit Report
        </Heading>
        <ContrastAuditPattern />
      </div>
    </Stack>
  );
};
