import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  useTheme,
  Button,
  IconButton,
  Badge,
  Avatar,
  Separator,
  InlineAlert,
  Input,
  Select,
  Checkbox,
  Switch,
  Textarea,
  RadioGroup,
  Heading,
  Text,
  Container,
  Stack,
  Inline,
  Grid,
  Spinner,
  Skeleton,
  Tooltip,
  Dialog,
  Popover,
  DropdownMenu,
  Tabs,
  Accordion,
  PageHeader,
  Breadcrumbs,
  Card,
  FormField,
  FormLayout,
  FilterBar,
  SearchField,
  DataTable,
  EmptyState,
  ConfirmationDialog,
  Toast,
} from '@kaleem-ui/react';
import {
  DataTablePattern,
  EmptyStatePattern,
  LoadingStatePattern,
  ErrorStatePattern,
} from './components/patterns/TableAndStates';
import { SettingsFormPattern } from './components/patterns/SettingsForm';
import { FoundationsPattern } from './components/patterns/FoundationsPattern';
import { GuidelinesPattern } from './components/patterns/GuidelinesPattern';
import {
  KeyIcon,
  ShieldIcon,
  LayersIcon,
  SunIcon,
  MoonIcon,
  MonitorIcon,
  MenuIcon,
  XIcon,
  PlusIcon,
  CheckIcon,
  CopyIcon,
  TrashIcon,
  ExternalLinkIcon,
  SlidersIcon,
} from './components/common/Icons';
import './App.css';

type NavSection = 'credentials' | 'foundations' | 'components' | 'patterns' | 'guidelines';
type TableViewState = 'populated' | 'empty' | 'loading' | 'error';
type ViewportMode = 'desktop' | 'mobile';

const PreviewContent: React.FC = () => {
  const { preference, resolvedTheme, setPreference } = useTheme();
  const [activeSection, setActiveSection] = useState<NavSection>('credentials');
  const [tableViewState, setTableViewState] = useState<TableViewState>('populated');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Primitives interactive sandbox states
  const [btnLoading, setBtnLoading] = useState(false);
  const [testInput, setTestInput] = useState('kui-service-gateway');
  const [testTextarea, setTestTextarea] = useState('Ingests webhook payloads from external billing gateway.');
  const [testSelect, setTestSelect] = useState('us-east-1');
  const [testCheck, setTestCheck] = useState(true);
  const [testSwitch, setTestSwitch] = useState(true);
  const [testRadio, setTestRadio] = useState('standard');
  const [showAlert, setShowAlert] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [filterSearch, setFilterSearch] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>(['k1']);

  // Escape key handler for dialog and mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isCreateModalOpen) setIsCreateModalOpen(false);
        if (mobileNavOpen) setMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCreateModalOpen, mobileNavOpen]);

  // Scroll lock when modal or mobile drawer is open
  useEffect(() => {
    if (isCreateModalOpen || mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCreateModalOpen, mobileNavOpen]);

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'credentials':
        return 'API Credentials & Tokens';
      case 'foundations':
        return 'Design Foundations & Tokens';
      case 'components':
        return 'Component Primitives';
      case 'patterns':
        return 'Application Patterns';
      case 'guidelines':
        return 'Guidelines & WCAG Standards';
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case 'credentials':
        return 'Reference application screen demonstrating state transitions, adaptive themes, and narrow viewport simulation.';
      case 'foundations':
        return 'Evergreen and mint color scales, warm neutrals, typography hierarchy, 4px grid spacing, and border radii.';
      case 'components':
        return 'Atomic interactive building blocks using canonical evergreen-mint semantic variables.';
      case 'patterns':
        return 'High-order application patterns built entirely with Kaleem UI primitives: headers, forms, tables, filters, and overlays.';
      case 'guidelines':
        return 'Component authoring Do/Don\'t matrix, accessibility notes, and live token contrast verification.';
    }
  };

  return (
    <div className="kui-app-layout">
      {/* Mobile Drawer Backdrop */}
      {mobileNavOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--kui-color-overlay)',
            zIndex: 25,
          }}
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Application Sidebar */}
      <aside className={`kui-sidebar ${viewportMode === 'mobile' ? 'mobile-mode' : ''} ${mobileNavOpen ? 'open' : ''}`} aria-label="Main Navigation">
        <div className="kui-sidebar-header">
          <div className="kui-brand-badge">
            <div className="kui-brand-logo-mark">K</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 'var(--kui-font-weight-bold)', fontSize: 'var(--kui-font-size-sm)', letterSpacing: 'var(--kui-letter-spacing-tight)' }}>
                Kaleem UI
              </span>
              <span style={{ fontSize: '11px', color: 'var(--kui-color-text-muted)' }}>
                Design Preview v1.0
              </span>
            </div>
          </div>
          {mobileNavOpen && (
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              style={{ color: 'var(--kui-color-text-muted)', padding: '4px' }}
              aria-label="Close navigation"
            >
              <XIcon size={18} />
            </button>
          )}
        </div>

        <nav className="kui-sidebar-nav">
          <span className="kui-nav-group-label">Reference Application</span>
          <button
            type="button"
            className={`kui-nav-link ${activeSection === 'credentials' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('credentials');
              setMobileNavOpen(false);
            }}
          >
            <KeyIcon size={16} />
            <span>API Credentials</span>
          </button>

          <span className="kui-nav-group-label" style={{ marginTop: 'var(--kui-space-3)' }}>
            Design System Catalog
          </span>
          <button
            type="button"
            className={`kui-nav-link ${activeSection === 'foundations' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('foundations');
              setMobileNavOpen(false);
            }}
          >
            <SlidersIcon size={16} />
            <span>Foundations</span>
          </button>

          <button
            type="button"
            className={`kui-nav-link ${activeSection === 'components' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('components');
              setMobileNavOpen(false);
            }}
          >
            <LayersIcon size={16} />
            <span>Components</span>
          </button>

          <button
            type="button"
            className={`kui-nav-link ${activeSection === 'patterns' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('patterns');
              setMobileNavOpen(false);
            }}
          >
            <ShieldIcon size={16} />
            <span>Patterns</span>
          </button>

          <button
            type="button"
            className={`kui-nav-link ${activeSection === 'guidelines' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('guidelines');
              setMobileNavOpen(false);
            }}
          >
            <CheckIcon size={16} />
            <span>Guidelines & Quality</span>
          </button>
        </nav>

        <div className="kui-sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: 'var(--kui-color-text-muted)' }}>Scope</span>
            <Badge variant="neutral" size="sm">
              DEMO PREVIEW
            </Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--kui-color-success)',
              }}
            />
            <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)' }}>
              Core Infrastructure
            </span>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="kui-main-wrapper">
        {/* Top bar */}
        <header className="kui-topbar">
          <div className="kui-topbar-left">
            <button
              type="button"
              className="kui-btn kui-btn-ghost"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              style={{ display: 'inline-flex', padding: '6px' }}
              aria-label="Toggle navigation menu"
            >
              <MenuIcon size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)', fontSize: 'var(--kui-font-size-xs)' }}>
              <span style={{ color: 'var(--kui-color-text-muted)' }}>Platform</span>
              <span style={{ color: 'var(--kui-color-border-strong)' }}>/</span>
              <span style={{ color: 'var(--kui-color-text-primary)', fontWeight: 'var(--kui-font-weight-medium)' }}>
                {getSectionTitle()}
              </span>
            </div>
          </div>

          <div className="kui-topbar-right">
            {/* Viewport Simulation Selector */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--kui-color-surface-subtle)',
                border: '1px solid var(--kui-color-border)',
                borderRadius: 'var(--kui-radius-md)',
                padding: '2px',
              }}
            >
              <button
                type="button"
                className={`kui-theme-btn ${viewportMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setViewportMode('desktop')}
                title="Desktop View"
              >
                Desktop
              </button>
              <button
                type="button"
                className={`kui-theme-btn ${viewportMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setViewportMode('mobile')}
                title="Mobile Narrow Simulation (390px)"
              >
                Mobile (390px)
              </button>
            </div>

            {/* Theme Preference Switcher */}
            <div className="kui-theme-control" role="group" aria-label="Theme preference">
              <button
                type="button"
                className={`kui-theme-btn ${preference === 'system' ? 'active' : ''}`}
                onClick={() => setPreference('system')}
                title={`System Theme (${resolvedTheme})`}
                aria-pressed={preference === 'system'}
              >
                <MonitorIcon size={14} />
                <span>Auto</span>
              </button>
              <button
                type="button"
                className={`kui-theme-btn ${preference === 'light' ? 'active' : ''}`}
                onClick={() => setPreference('light')}
                title="Light Theme"
                aria-pressed={preference === 'light'}
              >
                <SunIcon size={14} />
                <span>Light</span>
              </button>
              <button
                type="button"
                className={`kui-theme-btn ${preference === 'dark' ? 'active' : ''}`}
                onClick={() => setPreference('dark')}
                title="Dark Theme"
                aria-pressed={preference === 'dark'}
              >
                <MoonIcon size={14} />
                <span>Dark</span>
              </button>
            </div>
          </div>
        </header>

        {/* Viewport Container */}
        <div className={`kui-viewport-container ${viewportMode === 'mobile' ? 'kui-viewport-mobile' : ''}`}>
          <main className="kui-content-area">
            {/* Page Header */}
            <div style={{ borderBottom: '1px solid var(--kui-color-border)', paddingBottom: 'var(--kui-space-3)', marginBottom: 'var(--kui-space-4)' }}>
              <PageHeader
                title={getSectionTitle()}
                description={getSectionDescription()}
                breadcrumbs={[
                  { label: 'Platform', href: '#' },
                  { label: getSectionTitle(), current: true },
                ]}
                actions={
                  activeSection === 'credentials' ? (
                    <Button
                      variant="primary"
                      size="md"
                      leadingIcon={<PlusIcon size={15} />}
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      Create API Key
                    </Button>
                  ) : undefined
                }
              />
            </div>

            {/* TAB 1: API CREDENTIALS & STATES */}
            {activeSection === 'credentials' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-5)' }}>
                {/* State selector controls */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--kui-space-3)',
                    backgroundColor: 'var(--kui-color-surface-subtle)',
                    padding: 'var(--kui-space-3) var(--kui-space-4)',
                    borderRadius: 'var(--kui-radius-md)',
                    border: '1px solid var(--kui-color-border)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)' }}>
                    <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)' }}>
                      Simulate Screen State:
                    </span>
                    <div className="kui-tab-bar" style={{ border: 'none', padding: 0 }}>
                      <button
                        type="button"
                        className={`kui-tab-item ${tableViewState === 'populated' ? 'active' : ''}`}
                        onClick={() => setTableViewState('populated')}
                      >
                        Populated Table
                      </button>
                      <button
                        type="button"
                        className={`kui-tab-item ${tableViewState === 'empty' ? 'active' : ''}`}
                        onClick={() => setTableViewState('empty')}
                      >
                        Empty State
                      </button>
                      <button
                        type="button"
                        className={`kui-tab-item ${tableViewState === 'loading' ? 'active' : ''}`}
                        onClick={() => setTableViewState('loading')}
                      >
                        Loading Skeleton
                      </button>
                      <button
                        type="button"
                        className={`kui-tab-item ${tableViewState === 'error' ? 'active' : ''}`}
                        onClick={() => setTableViewState('error')}
                      >
                        Error State
                      </button>
                    </div>
                  </div>

                  <span style={{ fontSize: '11px', color: 'var(--kui-color-text-muted)' }}>
                    Theme: <strong style={{ color: 'var(--kui-color-brand)' }}>{resolvedTheme}</strong> ({preference})
                  </span>
                </div>

                {/* State Renderers */}
                {tableViewState === 'populated' && (
                  <DataTablePattern onAddNew={() => setIsCreateModalOpen(true)} />
                )}
                {tableViewState === 'empty' && (
                  <EmptyStatePattern onAction={() => setIsCreateModalOpen(true)} />
                )}
                {tableViewState === 'loading' && <LoadingStatePattern />}
                {tableViewState === 'error' && (
                  <ErrorStatePattern onRetry={() => setTableViewState('populated')} />
                )}
              </div>
            )}

            {/* TAB 2: DESIGN FOUNDATIONS */}
            {activeSection === 'foundations' && (
              <FoundationsPattern />
            )}

            {/* TAB 3: COMPONENT PRIMITIVES GALLERY */}
            {activeSection === 'components' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-6)' }}>
                {/* 1. Typography & Scale Showcase */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Typography Scale & Hierarchy</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      Proportional type scale based on Inter sans-serif with subtle letter spacing and tabular numerals.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-3)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--kui-color-border)', paddingBottom: 'var(--kui-space-2)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-2xl)', fontWeight: 'var(--kui-font-weight-bold)', letterSpacing: 'var(--kui-letter-spacing-tight)' }}>
                        Page Title (24px, Semibold)
                      </span>
                      <code style={{ color: 'var(--kui-color-text-muted)' }}>--kui-font-size-2xl (1.5rem)</code>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--kui-color-border)', paddingBottom: 'var(--kui-space-2)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-xl)', fontWeight: 'var(--kui-font-weight-semibold)', letterSpacing: 'var(--kui-letter-spacing-tight)' }}>
                        Section Heading (20px, Semibold)
                      </span>
                      <code style={{ color: 'var(--kui-color-text-muted)' }}>--kui-font-size-xl (1.25rem)</code>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--kui-color-border)', paddingBottom: 'var(--kui-space-2)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-md)', fontWeight: 'var(--kui-font-weight-medium)' }}>
                        Body Text (16px, Regular / Medium)
                      </span>
                      <code style={{ color: 'var(--kui-color-text-muted)' }}>--kui-font-size-md (1rem)</code>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--kui-color-border)', paddingBottom: 'var(--kui-space-2)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-sm)', color: 'var(--kui-color-text-secondary)' }}>
                        Small Secondary Text / Table cell (14px, Regular)
                      </span>
                      <code style={{ color: 'var(--kui-color-text-muted)' }}>--kui-font-size-sm (0.875rem)</code>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-muted)', fontFamily: 'var(--kui-font-mono)' }}>
                        Tabular Monospace: 0123456789 &bull; SHA256: 89fa281b
                      </span>
                      <code style={{ color: 'var(--kui-color-text-muted)' }}>--kui-font-mono (0.75rem)</code>
                    </div>
                  </div>
                </div>

                {/* 2. Buttons & IconButtons Showcase */}
                <div className="kui-showcase-section">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--kui-space-2)' }}>
                    <div>
                      <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Button Variants & States</h2>
                      <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                        Keyboard-navigable actions with clear hover, active, focus-visible, loading, and disabled states.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBtnLoading(!btnLoading)}
                    >
                      {btnLoading ? 'Stop Loading' : 'Simulate Loading'}
                    </Button>
                  </div>

                  <div className="kui-showcase-row">
                    <Button variant="primary" loading={btnLoading}>
                      Primary Action
                    </Button>
                    <Button variant="secondary" loading={btnLoading}>
                      Secondary Button
                    </Button>
                    <Button variant="outline" loading={btnLoading}>
                      Outline Button
                    </Button>
                    <Button variant="ghost" loading={btnLoading}>
                      Ghost Button
                    </Button>
                    <Button variant="danger" loading={btnLoading}>
                      Danger Action
                    </Button>
                    <Button variant="secondary" disabled>
                      Disabled
                    </Button>
                  </div>

                  {/* Size Scales */}
                  <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                    <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                      Size Scales (sm = 30px, md = 38px, lg = 46px):
                    </span>
                    <div className="kui-showcase-row">
                      <Button variant="primary" size="sm" leadingIcon={<PlusIcon size={13} />}>
                        Small (sm)
                      </Button>
                      <Button variant="primary" size="md" leadingIcon={<PlusIcon size={15} />}>
                        Medium (md)
                      </Button>
                      <Button variant="primary" size="lg" leadingIcon={<PlusIcon size={17} />}>
                        Large (lg)
                      </Button>
                    </div>
                  </div>

                  {/* IconButtons */}
                  <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                    <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                      Accessible IconButtons (with aria-label & touch targets):
                    </span>
                    <div className="kui-showcase-row">
                      <IconButton variant="primary" size="md" aria-label="Add new record" icon={<PlusIcon size={16} />} />
                      <IconButton variant="secondary" size="md" aria-label="Copy credential" icon={<CopyIcon size={16} />} />
                      <IconButton variant="outline" size="md" aria-label="Configure settings" icon={<SlidersIcon size={16} />} />
                      <IconButton variant="ghost" size="md" aria-label="Open documentation" icon={<ExternalLinkIcon size={16} />} />
                      <IconButton variant="danger" size="md" aria-label="Delete key" icon={<TrashIcon size={16} />} />
                      <IconButton variant="secondary" size="sm" aria-label="Small copy" icon={<CopyIcon size={13} />} />
                      <IconButton variant="secondary" size="lg" aria-label="Large settings" icon={<SlidersIcon size={18} />} />
                    </div>
                  </div>
                </div>

                {/* 3. Form Controls Showcase */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Form Controls & Validation</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      Accessible form controls with programmatic label/error association and visible focus rings.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--kui-space-4)' }}>
                    <Input
                      label="Standard Text Input"
                      description="Helper note explaining format rules"
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                    />

                    <Input
                      label="Input with Error State"
                      required
                      value="invalid token string"
                      error="Security token contains non-standard characters"
                      onChange={() => {}}
                    />

                    <Select
                      label="Region Selection"
                      description="Physical cloud datacenter perimeter"
                      options={[
                        { label: 'us-east-1 (N. Virginia)', value: 'us-east-1' },
                        { label: 'eu-central-1 (Frankfurt)', value: 'eu-central-1' },
                        { label: 'ap-southeast-1 (Singapore)', value: 'ap-southeast-1' },
                      ]}
                      value={testSelect}
                      onChange={(e) => setTestSelect(e.target.value)}
                    />
                  </div>

                  <Textarea
                    label="Description Textarea (with Counter)"
                    description="Sensible vertical resize with character limit."
                    showCount
                    maxLength={140}
                    value={testTextarea}
                    onChange={(e) => setTestTextarea(e.target.value)}
                  />

                  <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-4)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--kui-space-4)' }}>
                    <RadioGroup
                      label="Enforcement Mode (RadioGroup)"
                      description="Select TLS certificate verification policy"
                      name="sandbox-tls"
                      value={testRadio}
                      onChange={setTestRadio}
                      options={[
                        { value: 'strict', label: 'Strict mTLS', description: 'Requires verified client CA' },
                        { value: 'standard', label: 'Standard TLS 1.3', description: 'Recommended default' },
                      ]}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-4)' }}>
                      <Checkbox
                        label="Enforce mTLS handshake"
                        description="Reject mutual certificates that fail OCSP checks"
                        checked={testCheck}
                        onChange={(e) => setTestCheck(e.target.checked)}
                      />

                      <Switch
                        label="Real-time Webhook Dispatch"
                        description="Stream execution payloads without local buffer"
                        checked={testSwitch}
                        onChange={setTestSwitch}
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Status Badges & Identity Avatars Showcase */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Status Badges & Identity Avatars</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      Non-decorative status badges using text and optional indicators, plus accessible avatar identities.
                    </p>
                  </div>

                  <div>
                    <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                      WCAG Compliant Badges:
                    </span>
                    <div className="kui-showcase-row">
                      <Badge variant="neutral" dot>Neutral</Badge>
                      <Badge variant="success" dot>Active</Badge>
                      <Badge variant="warning" dot>Expiring</Badge>
                      <Badge variant="danger" dot>Revoked</Badge>
                      <Badge variant="info" dot>Processing</Badge>
                    </div>

                    <div className="kui-showcase-row" style={{ marginTop: 'var(--kui-space-2)' }}>
                      <Badge variant="neutral" size="sm">Tag Small</Badge>
                      <Badge variant="success" size="sm">Success Sm</Badge>
                      <Badge variant="warning" size="sm">Warning Sm</Badge>
                      <Badge variant="danger" size="sm">Danger Sm</Badge>
                      <Badge variant="info" size="sm">Info Sm</Badge>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                    <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                      Identity Avatars (Initials & fallback):
                    </span>
                    <div className="kui-showcase-row">
                      <Avatar name="Kaleem User" alt="Kaleem User" size="lg" />
                      <Avatar name="Admin Node" alt="Admin Node" size="md" />
                      <Avatar name="Staging Worker" alt="Staging Worker" size="sm" />
                      <Avatar alt="Generic Service" size="md" />
                    </div>
                  </div>
                </div>

                {/* 5. Feedback & Inline Alerts Showcase */}
                <div className="kui-showcase-section">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Inline Alerts & Feedback States</h2>
                      <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                        Contextual feedback notifications with appropriate live-region accessibility.
                      </p>
                    </div>
                    {!showAlert && (
                      <Button variant="outline" size="sm" onClick={() => setShowAlert(true)}>
                        Reset Alerts
                      </Button>
                    )}
                  </div>

                  {showAlert && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-3)' }}>
                      <InlineAlert variant="info" title="Cluster maintenance scheduled" onDismiss={() => {}}>
                        A rolling update is planned for Sunday at 02:00 UTC. No downtime expected.
                      </InlineAlert>

                      <InlineAlert variant="success" title="Verification complete">
                        All cryptographic perimeters passed mutual TLS handshake tests.
                      </InlineAlert>

                      <InlineAlert variant="warning" title="Rotation deadline approaching">
                        Production key <code>kui_live_33bc</code> expires in 12 days.
                      </InlineAlert>

                      <InlineAlert
                        variant="danger"
                        title="Service degraded"
                        onDismiss={() => setShowAlert(false)}
                        action={
                          <Button variant="outline" size="sm">
                            Inspect Pod Logs
                          </Button>
                        }
                      >
                        Ingress proxy responded with 502 Bad Gateway during health check.
                      </InlineAlert>
                    </div>
                  )}
                </div>

                {/* 6. Separator Demo */}
                <div className="kui-showcase-section">
                  <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Separators & Dividers</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-4)', fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-secondary)' }}>
                    <span>Horizontal & Vertical semantic separation:</span>
                    <Separator orientation="vertical" />
                    <span>Left section</span>
                    <Separator orientation="vertical" />
                    <span>Right section</span>
                  </div>
                </div>

                {/* 7. Typography & Layout Primitives (M2 Foundations) */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Typography & Layout Primitives</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      Predictable semantic headings, text variations, and CSS flex/grid layout foundations.
                    </p>
                  </div>

                  <Stack gap={4}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-2)', borderBottom: '1px solid var(--kui-color-border)', paddingBottom: 'var(--kui-space-3)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)' }}>
                        Typography Scale & Hierarchy:
                      </span>
                      <Heading variant="display">Display Heading (30px / 1.875rem)</Heading>
                      <Heading variant="title">Page Title Heading (24px / 1.5rem)</Heading>
                      <Heading variant="section">Section Heading (20px / 1.25rem)</Heading>
                      <Heading variant="subsection">Subsection Heading (16px / 1rem)</Heading>
                      <Inline gap={3} align="baseline" style={{ marginTop: 'var(--kui-space-2)' }}>
                        <Text variant="body">Standard body text with balanced contrast.</Text>
                        <Text variant="caption">Accessible caption (12px)</Text>
                        <Text variant="code">export const config = true;</Text>
                        <Text variant="label">Form Field Label</Text>
                      </Inline>
                    </div>

                    <div>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                        Layout Primitives (Grid & Stack):
                      </span>
                      <Grid columns="repeat(auto-fit, minmax(180px, 1fr))" gap={3}>
                        <div style={{ padding: 'var(--kui-space-3)', background: 'var(--kui-color-surface-subtle)', borderRadius: 'var(--kui-radius-sm)', border: '1px solid var(--kui-color-border)' }}>
                          <Text variant="label">Grid Column 1</Text>
                          <Text variant="caption">Auto-responsive width</Text>
                        </div>
                        <div style={{ padding: 'var(--kui-space-3)', background: 'var(--kui-color-surface-subtle)', borderRadius: 'var(--kui-radius-sm)', border: '1px solid var(--kui-color-border)' }}>
                          <Text variant="label">Grid Column 2</Text>
                          <Text variant="caption">Tokenized 12px gap</Text>
                        </div>
                        <div style={{ padding: 'var(--kui-space-3)', background: 'var(--kui-color-surface-subtle)', borderRadius: 'var(--kui-radius-sm)', border: '1px solid var(--kui-color-border)' }}>
                          <Text variant="label">Grid Column 3</Text>
                          <Text variant="caption">CSS-native layout</Text>
                        </div>
                      </Grid>
                    </div>

                    <div>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                        Responsive Container Primitive:
                      </span>
                      <Container size="sm" style={{ margin: 0, padding: 'var(--kui-space-3)', background: 'var(--kui-color-surface-subtle)', borderRadius: 'var(--kui-radius-sm)', border: '1px solid var(--kui-color-border)' }}>
                        <Text variant="label">Container (sm constraint: 640px)</Text>
                        <Text variant="caption">Auto-centers content and enforces canonical horizontal padding.</Text>
                      </Container>
                    </div>
                  </Stack>
                </div>

                {/* 8. Overlays & Interactive Primitives (M3 Core Primitives) */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Overlays & Interactive Primitives (M3)</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      Accessible Tooltips, Popovers, DropdownMenus, Tabs, Accordions, and Skeletons/Spinners.
                    </p>
                  </div>

                  <Stack gap={4}>
                    <Inline gap={4} align="center">
                      <Tooltip content="Provides live webhook traffic status">
                        <Button variant="secondary" size="sm">
                          Hover for Tooltip
                        </Button>
                      </Tooltip>

                      <Popover
                        trigger={
                          <Button variant="outline" size="sm">
                            Open Popover
                          </Button>
                        }
                        content={
                          <Stack gap={2}>
                            <Text variant="label">Contextual Config</Text>
                            <Text variant="caption">Adjust sampling rate without navigating away.</Text>
                            <Button variant="primary" size="sm" onClick={() => {}}>Save Filter</Button>
                          </Stack>
                        }
                      />

                      <DropdownMenu
                        trigger={
                          <Button variant="outline" size="sm">
                            Actions Menu ▾
                          </Button>
                        }
                        items={[
                          { id: 'view', label: 'Inspect Logs', onClick: () => {} },
                          { id: 'rotate', label: 'Rotate Secret', onClick: () => {} },
                          { id: 'revoke', label: 'Revoke Key', danger: true, onClick: () => {} },
                        ]}
                      />

                      <Button variant="primary" size="sm" onClick={() => setIsCreateModalOpen(true)}>
                        Open Native Dialog
                      </Button>
                    </Inline>

                    <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                        Feedback Primitives (Spinner & Skeletons):
                      </span>
                      <Inline gap={4} align="center">
                        <Spinner size={18} label="Synchronizing tokens" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-1)', flex: 1, maxWidth: '280px' }}>
                          <Skeleton variant="text" width="80%" height="12px" />
                          <Skeleton variant="text" width="60%" height="10px" />
                        </div>
                        <Skeleton variant="circle" width={32} height={32} />
                      </Inline>
                    </div>

                    <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                        Accessible Tabs (Keyboard Arrow Navigation):
                      </span>
                      <Tabs
                        defaultTab="env"
                        ariaLabel="Sandbox Tabs"
                        items={[
                          {
                            id: 'env',
                            label: 'Environment Specs',
                            content: <Text variant="body">Production nodes configured across 3 AWS availability zones with automated failover.</Text>,
                          },
                          {
                            id: 'perms',
                            label: 'Permission Scopes',
                            content: <Text variant="body">Read-only event stream ingestion with granular rate limiting (5,000 req/min).</Text>,
                          },
                          {
                            id: 'telemetry',
                            label: 'Telemetry',
                            content: <Text variant="body">Exporting OpenTelemetry traces directly to cloud monitor endpoint.</Text>,
                          },
                        ]}
                      />
                    </div>

                    <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                        Accordion Primitive (Semantic Region Disclosure):
                      </span>
                      <Accordion
                        items={[
                          {
                            id: 'acc-1',
                            title: 'What happens when a credential expires?',
                            content: 'Expired credentials immediately fail TLS validation and emit an alert to registered webhook destinations.',
                          },
                          {
                            id: 'acc-2',
                            title: 'How is mutual TLS enforced across gateways?',
                            content: 'Inbound traffic passes through reverse proxy ingress where client certificates are matched against trusted CAs.',
                          },
                        ]}
                      />
                    </div>
                  </Stack>
                </div>
              </div>
            )}

            {/* TAB 4: COMPOSITE APPLICATION PATTERNS */}
            {activeSection === 'patterns' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-6)' }}>
                {/* 1. Composite Patterns Gallery */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Composite Application Patterns</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      Higher-order page structures and patterns composed from Kaleem UI primitives.
                    </p>
                  </div>

                  <Stack gap={5}>
                    {/* Breadcrumbs Navigation Pattern */}
                    <div style={{ borderBottom: '1px solid var(--kui-color-border)', paddingBottom: 'var(--kui-space-3)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                        Breadcrumbs Navigation Hierarchy:
                      </span>
                      <Breadcrumbs
                        items={[
                          { label: 'Security Center', href: '#' },
                          { label: 'Gateways', href: '#' },
                          { label: 'Credential Policy', current: true },
                        ]}
                      />
                    </div>

                    {/* Cards */}
                    <div>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                        Card / Panel Variants:
                      </span>
                      <Grid columns="repeat(auto-fit, minmax(240px, 1fr))" gap={3}>
                        <Card variant="bordered" header={<Text variant="label">Bordered Card</Text>} footer={<Text variant="caption">Standard elevation</Text>}>
                          <Text variant="body">Encapsulates structured settings with consistent 1px borders.</Text>
                        </Card>
                        <Card variant="elevated" header={<Text variant="label">Elevated Panel</Text>} footer={<Text variant="caption">Subtle shadow</Text>}>
                          <Text variant="body">High-contrast surface for modals and elevated overlay panels.</Text>
                        </Card>
                        <Card variant="plain" header={<Text variant="label">Plain Group</Text>} footer={<Text variant="caption">Transparent boundary</Text>}>
                          <Text variant="body">Lightweight organizational grouping without card borders.</Text>
                        </Card>
                      </Grid>
                    </div>

                    {/* FormField & FormLayout */}
                    <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                        FormField & FormLayout Pattern:
                      </span>
                      <FormLayout gap={3}>
                        <FormField
                          label="Workload Trust Domain"
                          description="Canonical SPIFFE URI prefix for cluster security federation"
                          required
                        >
                          <Input value="spiffe://mesh.internal/sa/ingress-router" onChange={() => {}} />
                        </FormField>
                      </FormLayout>
                    </div>

                    {/* FilterBar & SearchField */}
                    <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                        FilterBar with Removable Badges:
                      </span>
                      <FilterBar
                        searchField={
                          <SearchField
                            value={filterSearch}
                            onChange={setFilterSearch}
                            onClear={() => setFilterSearch('')}
                            placeholder="Filter by service identifier..."
                          />
                        }
                        activeFilters={[
                          { id: 'env', label: 'Env: Production', onRemove: () => {} },
                          { id: 'status', label: 'Status: Active', onRemove: () => {} },
                        ]}
                        onReset={() => setFilterSearch('')}
                      />
                    </div>

                    {/* Generic DataTable Pattern */}
                    <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                        Reusable DataTable with Selection:
                      </span>
                      <DataTable
                        data={[
                          { id: 'k1', name: 'Ingress Proxy Token', env: 'Production', status: 'Active' },
                          { id: 'k2', name: 'Billing Hook Signer', env: 'Production', status: 'Expiring' },
                          { id: 'k3', name: 'Local Worker Key', env: 'Development', status: 'Revoked' },
                        ]}
                        keyExtractor={(item) => item.id}
                        selectable
                        selectedKeys={selectedRowKeys}
                        onSelectionChange={setSelectedRowKeys}
                        columns={[
                          { key: 'name', header: 'Key Name' },
                          { key: 'env', header: 'Environment', width: '140px' },
                          {
                            key: 'status',
                            header: 'Status',
                            width: '120px',
                            render: (item) => (
                              <Badge
                                variant={item.status === 'Active' ? 'success' : item.status === 'Expiring' ? 'warning' : 'danger'}
                                dot
                                size="sm"
                              >
                                {item.status}
                              </Badge>
                            ),
                          },
                        ]}
                      />
                    </div>

                    {/* EmptyState Pattern */}
                    <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                        EmptyState Pattern:
                      </span>
                      <EmptyState
                        icon={<KeyIcon size={24} />}
                        title="No Inactive Keys"
                        description="All provisioned TLS gateway certificates are currently active and healthy."
                        action={<Button variant="outline" size="sm">Audit Log</Button>}
                      />
                    </div>

                    {/* State Feedback: ConfirmationDialog & Toast */}
                    <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                        State Modals & Toast Alerts:
                      </span>
                      <Inline gap={4} align="center">
                        <Button variant="danger" size="sm" onClick={() => setIsConfirmOpen(true)}>
                          Trigger Confirmation Dialog
                        </Button>
                        <Toast
                          message="Cryptographic configuration synced to edge mesh nodes."
                          variant="success"
                        />
                      </Inline>

                      <ConfirmationDialog
                        open={isConfirmOpen}
                        title="Revoke Ingress Gateway Secret?"
                        message="This action immediately terminates active WebSocket connections using key kui_live_89fa. Downstream API requests will fail."
                        confirmText="Revoke Immediately"
                        destructive
                        onConfirm={() => setIsConfirmOpen(false)}
                        onCancel={() => setIsConfirmOpen(false)}
                      />
                    </div>
                  </Stack>
                </div>

                {/* 2. Access Policies & Settings Form Pattern */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Form Layout & Access Policies</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      Structured form pattern with segmented sections, descriptions, and accessible actions.
                    </p>
                  </div>
                  <div style={{ maxWidth: '640px' }}>
                    <SettingsFormPattern
                      onSuccess={() => {
                        setActiveSection('credentials');
                        setTableViewState('populated');
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: GUIDELINES & WCAG QUALITY AUDIT */}
            {activeSection === 'guidelines' && (
              <GuidelinesPattern />
            )}
          </main>
        </div>
      </div>

      {/* Canonical Dialog Primitive for Provisioning Key */}
      <Dialog
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Provision Gateway Credential"
        description="Configure parameters and execution scopes for the new authentication key."
        size="md"
      >
        <SettingsFormPattern
          onCancel={() => setIsCreateModalOpen(false)}
          onSuccess={() => {
            setIsCreateModalOpen(false);
            setTableViewState('populated');
          }}
        />
      </Dialog>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <PreviewContent />
    </ThemeProvider>
  );
}
