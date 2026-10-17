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
  SkeletonTable,
  SkeletonCard,
  SkeletonList,
  Tooltip,
  Dialog,
  Popover,
  DropdownMenu,
  CustomSelect,
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
  type DataTableHeightMode,
  paginateAndSortData,
  type SortConfig,
  Pagination,
  EmptyState,
  ConfirmationDialog,
  Toast,
  ToastProvider,
  useToast,
  MetricCard,
  Timeline,
  Stepper,
  ChartContainer,
  Sparkline,
  BarChart,
  DonutChart,
  AreaChart,
  Heatmap,
  GaugeChart,
  MetricBreakdownList,
  FunnelChart,
  RadarChart,
  ScatterPlot,
  StackedBarChart,
  Treemap,
  UptimeTracker,
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
  BarChartIcon,
  ActivityIcon,
  RefreshIcon,
} from './components/common/Icons';
import './App.css';

type NavSection = 'credentials' | 'foundations' | 'components' | 'patterns' | 'guidelines' | 'analytics';
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
  const [tableSort, setTableSort] = useState<SortConfig>({ key: 'name', direction: 'asc' });
  const [tablePage, setTablePage] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(2);
  const [tableHeightMode, setTableHeightMode] = useState<DataTableHeightMode>('fixed');
  const [stepperStep, setStepperStep] = useState(1);
  const [analyticsRange, setAnalyticsRange] = useState<'24h' | '7d' | '30d' | 'quarter'>('7d');
  const [customSelectVal, setCustomSelectVal] = useState<string>('chase');
  const [dropdownShowMeta, setDropdownShowMeta] = useState<boolean>(true);
  const [skeletonAnimation, setSkeletonAnimation] = useState<'shimmer' | 'pulse' | 'none'>('shimmer');
  const toast = useToast();


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
      case 'analytics':
        return 'Analytics & Telemetry';
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
      case 'analytics':
        return 'Telemetry cards, zero-dependency SVG micro-charts, sparklines, and immutable timeline feeds.';
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

          <button
            type="button"
            className={`kui-nav-link ${activeSection === 'analytics' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('analytics');
              setMobileNavOpen(false);
            }}
          >
            <BarChartIcon size={16} />
            <span>Analytics</span>
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

                    <CustomSelect
                      label="Region Selection"
                      description="Physical cloud datacenter perimeter"
                      options={[
                        {
                          value: 'us-east-1',
                          label: 'us-east-1 (N. Virginia)',
                          description: 'Primary datacenter • 14ms latency',
                          icon: <LayersIcon size={14} />,
                          badge: <Badge variant="success" size="sm">Primary</Badge>,
                        },
                        {
                          value: 'eu-central-1',
                          label: 'eu-central-1 (Frankfurt)',
                          description: 'European hub • 82ms latency',
                          icon: <LayersIcon size={14} />,
                          badge: <Badge variant="info" size="sm">Active</Badge>,
                        },
                        {
                          value: 'ap-southeast-1',
                          label: 'ap-southeast-1 (Singapore)',
                          description: 'APAC gateway • 140ms latency',
                          icon: <LayersIcon size={14} />,
                        },
                      ]}
                      value={testSelect}
                      onChange={(val) => setTestSelect(val)}
                      searchable
                      clearable
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
                            Rich Actions Menu ▾
                          </Button>
                        }
                        items={[
                          {
                            type: 'header',
                            content: (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)' }}>
                                <Avatar size="sm" alt="KM" name="Kaleem UI Node" />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Kaleem UI Node</span>
                                  <span style={{ fontSize: '11px', color: 'var(--kui-color-text-muted)' }}>prod-east-primary</span>
                                </div>
                              </div>
                            ),
                          },
                          {
                            type: 'group',
                            label: 'Diagnostics',
                            items: [
                              {
                                id: 'view',
                                label: 'Inspect Logs',
                                description: 'Real-time telemetry stream',
                                icon: <LayersIcon size={14} />,
                                shortcut: '⌘L',
                                onClick: () => toast.show({ title: 'Opening Logs', message: 'Streaming real-time telemetry.', variant: 'info' }),
                              },
                              {
                                id: 'rotate',
                                label: 'Rotate Secret',
                                description: 'Zero-downtime key rotation',
                                icon: <RefreshIcon size={14} />,
                                shortcut: '⌥R',
                                onClick: () => toast.show({ title: 'Rotating Key', message: 'Issued secret rotation request.', variant: 'success' }),
                              },
                              {
                                id: 'meta',
                                type: 'checkbox',
                                label: 'Include Metadata',
                                description: 'Export full JSON headers',
                                checked: dropdownShowMeta,
                                onCheckedChange: (c) => setDropdownShowMeta(c),
                              },
                            ],
                          },
                          { type: 'separator' },
                          {
                            id: 'revoke',
                            label: 'Revoke Key',
                            description: 'Immediately disables webhook traffic',
                            danger: true,
                            icon: <XIcon size={14} />,
                            shortcut: '⇧⌘⌫',
                            onClick: () => toast.show({ title: 'Revoked', message: 'API key has been revoked.', variant: 'danger' }),
                          },
                        ]}
                      />

                      <DropdownMenu>
                        <DropdownMenu.Trigger>
                          <Button variant="ghost" size="sm">
                            <Avatar size="sm" alt="KM" name="Kaleem Molani" />
                            <span style={{ marginLeft: '6px' }}>Account ▾</span>
                          </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content align="end">
                          <DropdownMenu.Header>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontSize: '13px', fontWeight: 600 }}>Kaleem Molani</span>
                              <span style={{ fontSize: '11px', color: 'var(--kui-color-text-muted)' }}>admin@kaleem.ui</span>
                            </div>
                          </DropdownMenu.Header>
                          <DropdownMenu.Group label="Workspaces">
                            <DropdownMenu.Item icon={<ShieldIcon size={14} />} shortcut="⌘1">Production Cluster</DropdownMenu.Item>
                            <DropdownMenu.Item icon={<LayersIcon size={14} />} shortcut="⌘2">Staging Sandbox</DropdownMenu.Item>
                          </DropdownMenu.Group>
                          <DropdownMenu.Separator />
                          <DropdownMenu.Item
                            danger
                            icon={<XIcon size={14} />}
                            onClick={() => toast.show({ title: 'Signed Out', message: 'Session closed.', variant: 'info' })}
                          >
                            Sign Out
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu>

                      <Button variant="primary" size="sm" onClick={() => setIsCreateModalOpen(true)}>
                        Open Native Dialog
                      </Button>
                    </Inline>

                    {/* Rich CustomSelect Dropdown Showcase */}
                    <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                        Rich CustomSelect Primitive (Searchable, Filterable, Option Icons & Subtitles):
                      </span>
                      <div style={{ maxWidth: '380px' }}>
                        <CustomSelect
                          label="Active Funding Account"
                          description="Select payment route for settlement (searchable & clearable)"
                          placeholder="Choose an account..."
                          value={customSelectVal}
                          onChange={(val) => {
                            setCustomSelectVal(val);
                            toast.show({ title: 'Account Selected', message: `Active route updated to ${val}.`, variant: 'success' });
                          }}
                          searchable
                          clearable
                          options={[
                            {
                              label: 'Commercial Banking',
                              options: [
                                {
                                  value: 'chase',
                                  label: 'Chase Premier Checking',
                                  description: 'Account •••• 4921 ($14,250.00)',
                                  icon: <KeyIcon size={14} />,
                                  badge: <Badge variant="success">Primary</Badge>,
                                },
                                {
                                  value: 'silicon',
                                  label: 'SVB Operating Reserve',
                                  description: 'Account •••• 1084 ($82,900.00)',
                                  icon: <ShieldIcon size={14} />,
                                  badge: <Badge variant="info">Verified</Badge>,
                                },
                              ],
                            },
                            {
                              label: 'Corporate Cards',
                              options: [
                                {
                                  value: 'amex',
                                  label: 'American Express Platinum',
                                  description: 'Corporate Card •••• 8820',
                                  icon: <LayersIcon size={14} />,
                                },
                                {
                                  value: 'brex',
                                  label: 'Brex Treasury Card',
                                  description: 'Corporate Card •••• 3319',
                                  icon: <LayersIcon size={14} />,
                                },
                              ],
                            },
                          ]}
                        />
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--kui-space-2)' }}>
                        <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)' }}>
                          Feedback Primitives & Composite Skeletons:
                        </span>
                        <Inline gap={2} align="center">
                          <span style={{ fontSize: '11px', color: 'var(--kui-color-text-muted)' }}>Animation:</span>
                          {(['shimmer', 'pulse', 'none'] as const).map((mode) => (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => setSkeletonAnimation(mode)}
                              style={{
                                padding: '2px 8px',
                                fontSize: '11px',
                                borderRadius: 'var(--kui-radius-sm)',
                                border: '1px solid var(--kui-color-border)',
                                backgroundColor: skeletonAnimation === mode ? 'var(--kui-color-brand-primary)' : 'var(--kui-color-surface-subtle)',
                                color: skeletonAnimation === mode ? 'var(--kui-color-surface)' : 'var(--kui-color-text-primary)',
                                cursor: 'pointer',
                                fontWeight: skeletonAnimation === mode ? 600 : 400,
                              }}
                            >
                              {mode}
                            </button>
                          ))}
                        </Inline>
                      </div>

                      <Stack gap={4}>
                        <Inline gap={4} align="center">
                          <Spinner size={18} label="Synchronizing tokens" />
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-1)', flex: 1, maxWidth: '280px' }}>
                            <Skeleton variant="text" width="80%" height="12px" animation={skeletonAnimation} />
                            <Skeleton variant="text" width="60%" height="10px" animation={skeletonAnimation} />
                          </div>
                          <Skeleton variant="circle" width={32} height={32} animation={skeletonAnimation} />
                        </Inline>

                        <Grid columns={2} gap={4}>
                          <SkeletonCard hasHeader hasAvatar hasMetric lines={2} hasAction animation={skeletonAnimation} />
                          <SkeletonList items={3} hasAvatar lines={2} hasAction animation={skeletonAnimation} />
                        </Grid>

                        <SkeletonTable rows={3} columns={4} showCheckbox showHeader animation={skeletonAnimation} />
                      </Stack>
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

                    {/* Generic DataTable Pattern with Sorting & Integrated Pagination */}
                    <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--kui-space-2)', flexWrap: 'wrap', gap: '8px' }}>
                        <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)' }}>
                          Reusable DataTable (Sortable Columns, Row Selection & Height Mode):
                        </span>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: 'var(--kui-font-size-xs)' }}>
                          <span style={{ color: 'var(--kui-color-text-secondary)', fontSize: '11px' }}>Height Mode:</span>
                          <div style={{ display: 'inline-flex', backgroundColor: 'var(--kui-color-surface-subtle)', borderRadius: 'var(--kui-radius-sm)', padding: '2px', border: '1px solid var(--kui-color-border)' }}>
                            <button
                              type="button"
                              onClick={() => setTableHeightMode('auto')}
                              style={{
                                padding: '2px 8px',
                                fontSize: '11px',
                                fontWeight: tableHeightMode === 'auto' ? 'var(--kui-font-weight-semibold)' : 'normal',
                                backgroundColor: tableHeightMode === 'auto' ? 'var(--kui-color-surface)' : 'transparent',
                                color: tableHeightMode === 'auto' ? 'var(--kui-color-brand-primary)' : 'var(--kui-color-text-secondary)',
                                border: 'none',
                                borderRadius: 'var(--kui-radius-sm)',
                                cursor: 'pointer',
                              }}
                            >
                              Auto (Collapses to Rows)
                            </button>
                            <button
                              type="button"
                              onClick={() => setTableHeightMode('fixed')}
                              style={{
                                padding: '2px 8px',
                                fontSize: '11px',
                                fontWeight: tableHeightMode !== 'auto' ? 'var(--kui-font-weight-semibold)' : 'normal',
                                backgroundColor: tableHeightMode !== 'auto' ? 'var(--kui-color-surface)' : 'transparent',
                                color: tableHeightMode !== 'auto' ? 'var(--kui-color-brand-primary)' : 'var(--kui-color-text-secondary)',
                                border: 'none',
                                borderRadius: 'var(--kui-radius-sm)',
                                cursor: 'pointer',
                              }}
                            >
                              Fill/Fixed (Empty Inside When Few Rows)
                            </button>
                          </div>
                        </div>
                      </div>
                      <p style={{ margin: '0 0 var(--kui-space-3) 0', fontSize: '11px', color: 'var(--kui-color-text-secondary)' }}>
                        {tableHeightMode === 'auto'
                          ? 'Table height collapses dynamically to fit row count (try changing page size to 2, 4, or 6).'
                          : 'Table maintains fixed container bounds covering screen space; when only 1 or 2 rows exist, the interior below the last row remains empty while pagination stays anchored at bottom.'}
                      </p>
                      {(() => {
                        const rawData = [
                          { id: 'k1', name: 'Ingress Proxy Token', env: 'Production', status: 'Active' },
                          { id: 'k2', name: 'Billing Hook Signer', env: 'Production', status: 'Expiring' },
                          { id: 'k3', name: 'Local Worker Key', env: 'Development', status: 'Revoked' },
                          { id: 'k4', name: 'Analytics Pipeline Key', env: 'Staging', status: 'Active' },
                          { id: 'k5', name: 'Audit Log Forwarder', env: 'Production', status: 'Active' },
                          { id: 'k6', name: 'Edge CDN Signer', env: 'Staging', status: 'Active' },
                        ];
                        const { paginatedData, totalPages, totalItems } = paginateAndSortData(
                          rawData,
                          tableSort,
                          tablePage,
                          tablePageSize
                        );

                        return (
                          <DataTable
                            data={paginatedData}
                            keyExtractor={(item) => item.id}
                            selectable
                            selectedKeys={selectedRowKeys}
                            onSelectionChange={setSelectedRowKeys}
                            sortConfig={tableSort}
                            onSortChange={(newSort) => {
                              setTableSort(newSort);
                              setTablePage(1);
                            }}
                            heightMode={tableHeightMode}
                            height={tableHeightMode !== 'auto' ? '360px' : undefined}
                            columns={[
                              { key: 'name', header: 'Key Name', sortable: true },
                              { key: 'env', header: 'Environment', width: '150px', sortable: true },
                              {
                                key: 'status',
                                header: 'Status',
                                width: '130px',
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
                            pagination={
                              <Pagination
                                currentPage={tablePage}
                                totalPages={totalPages}
                                totalItems={totalItems}
                                pageSize={tablePageSize}
                                pageSizeOptions={[2, 4, 6]}
                                onPageChange={setTablePage}
                                onPageSizeChange={(newSize) => {
                                  setTablePageSize(newSize);
                                  setTablePage(1);
                                }}
                              />
                            }
                          />
                        );
                      })()}
                    </div>

                    {/* Standalone Pagination Primitive */}
                    <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                        Pagination Primitive (Standalone with Truncation Dots):
                      </span>
                      <div
                        style={{
                          padding: 'var(--kui-space-3)',
                          backgroundColor: 'var(--kui-color-surface)',
                          border: '1px solid var(--kui-color-border)',
                          borderRadius: 'var(--kui-radius-md)',
                        }}
                      >
                        <Pagination
                          currentPage={5}
                          totalPages={12}
                          totalItems={120}
                          pageSize={10}
                          onPageChange={() => {}}
                        />
                      </div>
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

                    {/* Interactive Toast Dispatcher */}
                    <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)', display: 'block', marginBottom: 'var(--kui-space-2)' }}>
                        Interactive Application-Wide Toast Dispatcher (useToast hook):
                      </span>
                      <Inline gap={2} wrap>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast.success('API credential rotated successfully', 'Secret Synchronized')}
                        >
                          Trigger Success Toast
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast.error('HMAC token mismatch from ingress peer', 'Authentication Failure')}
                        >
                          Trigger Error Toast
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast.warning('Production signing key expires in 24 hours', 'Key Expiration Warning')}
                        >
                          Trigger Warning Toast
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast.info('Cluster health check completed with 0 errors.', 'Telemetry Sync')}
                        >
                          Trigger Info Toast
                        </Button>
                      </Inline>
                    </div>

                    {/* Stepper Primitive */}
                    <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--kui-space-2)' }}>
                        <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)' }}>
                          Stepper Primitive (Multi-Step Workflow):
                        </span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={stepperStep <= 0}
                            onClick={() => setStepperStep((s) => Math.max(0, s - 1))}
                          >
                            Prev Step
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            disabled={stepperStep >= 2}
                            onClick={() => setStepperStep((s) => Math.min(2, s + 1))}
                          >
                            Next Step
                          </Button>
                        </div>
                      </div>
                      <div
                        style={{
                          padding: 'var(--kui-space-4)',
                          backgroundColor: 'var(--kui-color-surface)',
                          border: '1px solid var(--kui-color-border)',
                          borderRadius: 'var(--kui-radius-md)',
                        }}
                      >
                        <Stepper
                          activeStep={stepperStep}
                          onStepClick={setStepperStep}
                          steps={[
                            { id: 'step-1', title: 'Target Environment', description: 'Production or Staging VPC' },
                            { id: 'step-2', title: 'Scopes & Quotas', description: 'Read/Write rate limits', optional: true },
                            { id: 'step-3', title: 'Review & Mint', description: 'Cryptographic signature' },
                          ]}
                        />
                      </div>
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

            {/* TAB 6: ANALYTICS & TELEMETRY */}
            {activeSection === 'analytics' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-5)' }}>
                {/* Analytics Control Bar */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--kui-space-3)',
                    backgroundColor: 'var(--kui-color-surface)',
                    border: '1px solid var(--kui-color-border)',
                    borderRadius: 'var(--kui-radius-lg)',
                    padding: 'var(--kui-space-3) var(--kui-space-4)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)' }}>
                    <BarChartIcon size={18} style={{ color: 'var(--kui-color-brand-primary)' }} />
                    <div>
                      <span style={{ fontSize: 'var(--kui-font-size-sm)', fontWeight: 'var(--kui-font-weight-semibold)', color: 'var(--kui-color-text-primary)' }}>
                        Cluster Telemetry & Performance
                      </span>
                      <span style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-secondary)', display: 'block' }}>
                        Real-time gateway metrics, request distributions, and immutable security ledger
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-3)', flexWrap: 'wrap' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        backgroundColor: 'var(--kui-color-surface-subtle)',
                        borderRadius: 'var(--kui-radius-sm)',
                        padding: '2px',
                        border: '1px solid var(--kui-color-border)',
                      }}
                    >
                      {(
                        [
                          { id: '24h', label: 'Last 24h' },
                          { id: '7d', label: 'Last 7d' },
                          { id: '30d', label: 'Last 30d' },
                          { id: 'quarter', label: 'Quarter to Date' },
                        ] as const
                      ).map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setAnalyticsRange(item.id)}
                          style={{
                            padding: '3px 10px',
                            fontSize: '11px',
                            fontWeight: analyticsRange === item.id ? 'var(--kui-font-weight-semibold)' : 'normal',
                            backgroundColor: analyticsRange === item.id ? 'var(--kui-color-surface)' : 'transparent',
                            color: analyticsRange === item.id ? 'var(--kui-color-brand-primary)' : 'var(--kui-color-text-secondary)',
                            border: 'none',
                            borderRadius: 'var(--kui-radius-sm)',
                            cursor: 'pointer',
                            boxShadow: analyticsRange === item.id ? 'var(--kui-shadow-sm)' : 'none',
                            transition: 'all 120ms ease',
                          }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      leadingIcon={<RefreshIcon size={13} />}
                      onClick={() => toast.info('Telemetry data synced with edge cluster nodes.', 'Data Refreshed')}
                    >
                      Sync Telemetry
                    </Button>
                  </div>
                </div>

                {/* 1. Executive Telemetry Metrics Grid */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Executive KPI Metrics (`MetricCard`)</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      High-impact summary telemetry cards with trend badges, comparative subtext, and embedded responsive sparklines.
                    </p>
                  </div>

                  <Grid columns="repeat(auto-fit, minmax(240px, 1fr))" gap={3}>
                    <MetricCard
                      label="Active Credentials"
                      value={analyticsRange === '24h' ? '312' : analyticsRange === '7d' ? '1,429' : analyticsRange === '30d' ? '5,820' : '14,290'}
                      delta="+12.4%"
                      deltaType="increase"
                      subtext={analyticsRange === '24h' ? 'vs yesterday' : 'vs previous period'}
                      icon={<KeyIcon size={16} />}
                      sparkline={<Sparkline data={analyticsRange === '24h' ? [12, 14, 15, 18, 20, 24, 28] : [14, 18, 16, 24, 30, 28, 42]} fill />}
                    />
                    <MetricCard
                      label="P99 Gateway Latency"
                      value={analyticsRange === '24h' ? '16.4ms' : analyticsRange === '7d' ? '18.2ms' : analyticsRange === '30d' ? '21.0ms' : '19.5ms'}
                      delta="-4.1ms"
                      deltaType="decrease"
                      deltaSentiment="positive"
                      subtext="Under 25ms SLO ceiling"
                      icon={<ActivityIcon size={16} />}
                      sparkline={<Sparkline data={[34, 30, 26, 25, 22, 20, 18]} color="var(--kui-color-accent)" fill />}
                    />
                    <MetricCard
                      label="Ingress Error Rate"
                      value="0.02%"
                      delta="-0.05%"
                      deltaType="decrease"
                      deltaSentiment="positive"
                      subtext="99.98% availability uptime"
                      icon={<LayersIcon size={16} />}
                      sparkline={<Sparkline data={[8, 12, 10, 6, 4, 3, 2]} color="var(--kui-color-success)" fill />}
                    />
                    <MetricCard
                      label="Ingestion Throughput"
                      value={analyticsRange === '24h' ? '680k' : analyticsRange === '7d' ? '4.69M' : analyticsRange === '30d' ? '18.4M' : '52.8M'}
                      delta="+18.7%"
                      deltaType="increase"
                      deltaSentiment="positive"
                      subtext="Peak 24.2k req/sec"
                      icon={<BarChartIcon size={16} />}
                      sparkline={<Sparkline data={[20, 28, 35, 42, 48, 55, 64]} color="var(--kui-color-brand-primary)" fill />}
                    />
                  </Grid>
                </div>

                {/* 2. SLO & Health Gauges */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>SLO & Capacity Gauges (`GaugeChart`)</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      Semi-circular radial meters for service level objectives, rate quota ceilings, and resource saturation.
                    </p>
                  </div>

                  <Card variant="bordered">
                    <Grid columns="repeat(auto-fit, minmax(220px, 1fr))" gap={4}>
                      <GaugeChart
                        value={99.98}
                        min={95}
                        max={100}
                        label="SLO Availability"
                        subtext="Target: >= 99.90%"
                        valueFormatter={(v) => `${v}%`}
                        color="var(--kui-color-brand-primary)"
                      />
                      <GaugeChart
                        value={42}
                        min={0}
                        max={100}
                        label="Rate Limit Quota"
                        subtext="42k of 100k req/hr consumed"
                        valueFormatter={(v) => `${v}%`}
                        color="var(--kui-color-accent)"
                      />
                      <GaugeChart
                        value={28}
                        min={0}
                        max={100}
                        label="CPU Core Saturation"
                        subtext="Cluster average across 24 pods"
                        valueFormatter={(v) => `${v}%`}
                        color="var(--kui-color-success)"
                      />
                    </Grid>
                  </Card>
                </div>

                {/* 3. Time-Series Multi-Line AreaChart */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Time-Series Area Chart (`AreaChart`)</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      Multi-series time-series visualization with gradient area fills, dashed gridlines, and coordinate interpolation.
                    </p>
                  </div>

                  <ChartContainer
                    title="Cluster Network Throughput (24 Hours)"
                    subtitle="Ingress requests vs egress encrypted payloads (Thousands per hour)"
                    legend={
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--kui-color-text-secondary)' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'var(--kui-color-brand-primary)' }} />
                          Ingress Traffic
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--kui-color-text-secondary)' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'var(--kui-color-accent)' }} />
                          Egress Payloads
                        </span>
                      </div>
                    }
                  >
                    <AreaChart
                      data={[
                        { label: '00:00', ingress: 240, egress: 180 },
                        { label: '04:00', ingress: 180, egress: 140 },
                        { label: '08:00', ingress: 620, egress: 480 },
                        { label: '12:00', ingress: 890, egress: 720 },
                        { label: '16:00', ingress: 940, egress: 780 },
                        { label: '20:00', ingress: 710, egress: 540 },
                        { label: '24:00', ingress: 380, egress: 290 },
                      ]}
                      series={[
                        { key: 'ingress', name: 'Ingress Traffic', color: 'var(--kui-color-brand-primary)', fill: true },
                        { key: 'egress', name: 'Egress Payloads', color: 'var(--kui-color-accent)', fill: true },
                      ]}
                      height={220}
                      valueFormatter={(v) => `${v}k`}
                    />
                  </ChartContainer>
                </div>

                {/* 4. 24x7 Traffic Intensity Matrix Heatmap */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Traffic Density Matrix (`Heatmap`)</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      Weekly hourly request distribution matrix with mint-scaled heat levels and native accessible cell tooltips.
                    </p>
                  </div>

                  <Card variant="bordered">
                    <Heatmap
                      data={[
                        { x: '00:00', y: 'Mon', value: 12 }, { x: '03:00', y: 'Mon', value: 8 }, { x: '06:00', y: 'Mon', value: 34 }, { x: '09:00', y: 'Mon', value: 92 }, { x: '12:00', y: 'Mon', value: 85 }, { x: '15:00', y: 'Mon', value: 78 }, { x: '18:00', y: 'Mon', value: 65 }, { x: '21:00', y: 'Mon', value: 40 },
                        { x: '00:00', y: 'Tue', value: 15 }, { x: '03:00', y: 'Tue', value: 9 }, { x: '06:00', y: 'Tue', value: 42 }, { x: '09:00', y: 'Tue', value: 110 }, { x: '12:00', y: 'Tue', value: 98 }, { x: '15:00', y: 'Tue', value: 88 }, { x: '18:00', y: 'Tue', value: 72 }, { x: '21:00', y: 'Tue', value: 45 },
                        { x: '00:00', y: 'Wed', value: 18 }, { x: '03:00', y: 'Wed', value: 11 }, { x: '06:00', y: 'Wed', value: 45 }, { x: '09:00', y: 'Wed', value: 125 }, { x: '12:00', y: 'Wed', value: 104 }, { x: '15:00', y: 'Wed', value: 94 }, { x: '18:00', y: 'Wed', value: 80 }, { x: '21:00', y: 'Wed', value: 50 },
                        { x: '00:00', y: 'Thu', value: 14 }, { x: '03:00', y: 'Thu', value: 10 }, { x: '06:00', y: 'Thu', value: 38 }, { x: '09:00', y: 'Thu', value: 105 }, { x: '12:00', y: 'Thu', value: 92 }, { x: '15:00', y: 'Thu', value: 86 }, { x: '18:00', y: 'Thu', value: 74 }, { x: '21:00', y: 'Thu', value: 42 },
                        { x: '00:00', y: 'Fri', value: 16 }, { x: '03:00', y: 'Fri', value: 12 }, { x: '06:00', y: 'Fri', value: 40 }, { x: '09:00', y: 'Fri', value: 115 }, { x: '12:00', y: 'Fri', value: 118 }, { x: '15:00', y: 'Fri', value: 102 }, { x: '18:00', y: 'Fri', value: 85 }, { x: '21:00', y: 'Fri', value: 55 },
                        { x: '00:00', y: 'Sat', value: 20 }, { x: '03:00', y: 'Sat', value: 15 }, { x: '06:00', y: 'Sat', value: 22 }, { x: '09:00', y: 'Sat', value: 48 }, { x: '12:00', y: 'Sat', value: 60 }, { x: '15:00', y: 'Sat', value: 55 }, { x: '18:00', y: 'Sat', value: 45 }, { x: '21:00', y: 'Sat', value: 35 },
                        { x: '00:00', y: 'Sun', value: 14 }, { x: '03:00', y: 'Sun', value: 10 }, { x: '06:00', y: 'Sun', value: 18 }, { x: '09:00', y: 'Sun', value: 38 }, { x: '12:00', y: 'Sun', value: 52 }, { x: '15:00', y: 'Sun', value: 48 }, { x: '18:00', y: 'Sun', value: 38 }, { x: '21:00', y: 'Sun', value: 28 },
                      ]}
                      xLabels={['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']}
                      yLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                      cellWidth={64}
                      cellHeight={26}
                      cellRadius={4}
                    />
                  </Card>
                </div>

                {/* Service Availability & 60-Day SLA Track */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Service Reliability & 60-Day SLA (`UptimeTracker`)</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      High-density availability tracker with interactive daily status ribbons, incident popovers, and uptime percentages.
                    </p>
                  </div>

                  <Card variant="bordered">
                    <UptimeTracker
                      daysCount={60}
                      services={[
                        {
                          id: 'api-gateway',
                          name: 'Edge API Gateway (Envoy Mesh)',
                          currentStatus: 'operational',
                          uptimePercentage: 99.99,
                          latencyMs: 14,
                          history: Array.from({ length: 60 }, (_, i) => ({
                            date: `2026-09-${String((i % 30) + 1).padStart(2, '0')}`,
                            status: i === 48 ? 'degraded' : 'operational',
                            uptimePct: i === 48 ? 99.1 : 100,
                            latencyMs: i === 48 ? 64 : 14,
                            incident: i === 48 ? 'Transient upstream BGP routing failover' : undefined,
                          })),
                        },
                        {
                          id: 'vault-hsm',
                          name: 'Cryptographic Key Vault & HSM',
                          currentStatus: 'operational',
                          uptimePercentage: 100.0,
                          latencyMs: 8,
                          history: Array.from({ length: 60 }, (_, i) => ({
                            date: `2026-09-${String((i % 30) + 1).padStart(2, '0')}`,
                            status: 'operational',
                            uptimePct: 100,
                            latencyMs: 8,
                          })),
                        },
                        {
                          id: 'event-broker',
                          name: 'Webhook Event Dispatcher (Kafka Broker)',
                          currentStatus: 'operational',
                          uptimePercentage: 99.95,
                          latencyMs: 38,
                          history: Array.from({ length: 60 }, (_, i) => ({
                            date: `2026-09-${String((i % 30) + 1).padStart(2, '0')}`,
                            status: i === 18 ? 'degraded' : i === 52 ? 'degraded' : 'operational',
                            uptimePct: i === 18 || i === 52 ? 98.8 : 100,
                            latencyMs: i === 18 ? 112 : i === 52 ? 94 : 38,
                            incident: i === 18 ? 'Buffer queue backpressure spike' : i === 52 ? 'Timeout retry flood' : undefined,
                          })),
                        },
                      ]}
                    />
                  </Card>
                </div>

                {/* 5. Ranked Endpoints & Funnel Pipeline */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Endpoint Distribution & Auth Pipeline</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      Ranked endpoint telemetry bars and multi-stage pipeline conversion tracking.
                    </p>
                  </div>

                  <Grid columns="repeat(auto-fit, minmax(320px, 1fr))" gap={4}>
                    <Card variant="bordered" header={<Text variant="label">Top API Endpoints by Ingestion Volume</Text>}>
                      <MetricBreakdownList
                        items={[
                          { id: 'ep-1', label: '/v1/auth/tokens', value: 184200, secondaryValue: '38.2%', badge: <Badge size="sm" variant="success">Core</Badge> },
                          { id: 'ep-2', label: '/v1/gateway/ingress', value: 128500, secondaryValue: '26.6%', badge: <Badge size="sm" variant="neutral">Proxy</Badge> },
                          { id: 'ep-3', label: '/v1/audit/events', value: 92100, secondaryValue: '19.1%', badge: <Badge size="sm" variant="info">Audit</Badge> },
                          { id: 'ep-4', label: '/v1/keys/rotate', value: 48000, secondaryValue: '10.0%', badge: <Badge size="sm" variant="warning">Crypto</Badge> },
                          { id: 'ep-5', label: '/v1/webhooks/billing', value: 29400, secondaryValue: '6.1%', badge: <Badge size="sm" variant="neutral">Hooks</Badge> },
                        ]}
                        valueFormatter={(v) => `${(v / 1000).toFixed(1)}k reqs`}
                      />
                    </Card>

                    <Card variant="bordered" header={<Text variant="label">Authentication & Security Pipeline (`FunnelChart`)</Text>}>
                      <FunnelChart
                        stages={[
                          { id: 'f-1', name: 'Edge Ingress Handshake', count: 100000, description: 'Incoming TCP & TLS connections accepted' },
                          { id: 'f-2', name: 'mTLS & Certificate Verification', count: 98400, description: 'Cryptographic client verification pass' },
                          { id: 'f-3', name: 'Scope & Rate Quota Validation', count: 95200, description: 'Token active within quota ceilings' },
                          { id: 'f-4', name: 'Payload Dispatched to Mesh', count: 94800, description: 'Forwarded to upstream cluster pods' },
                        ]}
                        valueFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
                      />
                    </Card>
                  </Grid>
                </div>

                {/* Multivariate Capability Scorecard & Hierarchical Space Partitioning */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Multivariate Scorecard (`RadarChart`) & Space Allocation (`Treemap`)</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      Multi-axis operational comparison radar and proportional rectangular resource partitioning.
                    </p>
                  </div>

                  <Grid columns="repeat(auto-fit, minmax(340px, 1fr))" gap={4}>
                    <Card
                      variant="bordered"
                      header={<Text variant="label">Cluster Operational Posture (`RadarChart`)</Text>}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--kui-space-2) 0' }}>
                        <RadarChart
                          metrics={[
                            { key: 'latency', label: 'Latency SLO' },
                            { key: 'throughput', label: 'Throughput' },
                            { key: 'reliability', label: 'Reliability' },
                            { key: 'security', label: 'Security' },
                            { key: 'scalability', label: 'Elastic Scale' },
                            { key: 'efficiency', label: 'Cost Efficiency' },
                          ]}
                          series={[
                            {
                              id: 'prod',
                              name: 'Production VPC',
                              color: 'var(--kui-color-brand-primary)',
                              data: {
                                latency: 95,
                                throughput: 92,
                                reliability: 99,
                                security: 98,
                                scalability: 88,
                                efficiency: 84,
                              },
                            },
                            {
                              id: 'staging',
                              name: 'Staging Cluster',
                              color: 'var(--kui-color-brand-accent)',
                              data: {
                                latency: 80,
                                throughput: 68,
                                reliability: 94,
                                security: 90,
                                scalability: 75,
                                efficiency: 95,
                              },
                            },
                          ]}
                          size={300}
                          valueFormatter={(val) => `${val}%`}
                        />
                      </div>
                    </Card>

                    <Card
                      variant="bordered"
                      header={<Text variant="label">Encrypted Data & Cache Footprint (`Treemap`)</Text>}
                    >
                      <Treemap
                        data={[
                          { id: 's3', label: 'Encrypted S3 Blobs', value: 450, color: '#0F4C3A' },
                          { id: 'pg', label: 'Postgres Primary DB', value: 280, color: '#165E49' },
                          { id: 'redis', label: 'Redis Session Cache', value: 140, color: '#248B6C' },
                          { id: 'es', label: 'Audit Index (OpenSearch)', value: 120, color: '#2DD4BF' },
                          { id: 'registry', label: 'OCI Container Registry', value: 70, color: '#14B8A6' },
                          { id: 'archive', label: 'Cold Glacier Archive', value: 40, color: '#042F24' },
                        ]}
                        height={260}
                        valueFormatter={(val) => `${val} GB`}
                      />
                    </Card>
                  </Grid>
                </div>

                {/* 6. Zero-Dependency SVG Micro-Charts */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Categorical & Segment Visualizations (`BarChart` & `DonutChart`)</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      Zero-dependency SVG micro-charts embedded within accessible `ChartContainer` primitives (`role="img"`).
                    </p>
                  </div>

                  <Grid columns="repeat(auto-fit, minmax(320px, 1fr))" gap={4}>
                    <ChartContainer
                      title="Daily Ingestion Volume"
                      subtitle="Requests per hour across cluster gateways (Thousands)"
                      legend={
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: 'var(--kui-color-brand-primary)' }} />
                            Production VPC
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: 'var(--kui-color-accent)' }} />
                            Staging Mesh
                          </span>
                        </div>
                      }
                    >
                      <BarChart
                        data={[
                          { label: 'Mon', value: 420 },
                          { label: 'Tue', value: 680 },
                          { label: 'Wed', value: 890 },
                          { label: 'Thu', value: 810 },
                          { label: 'Fri', value: 950 },
                          { label: 'Sat', value: 540 },
                          { label: 'Sun', value: 410 },
                        ]}
                        valueFormatter={(v) => `${v}k`}
                      />
                    </ChartContainer>

                    <ChartContainer
                      title="Credential Status Distribution"
                      subtitle="Proportional breakdown across key lifecycle states"
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--kui-space-2) 0' }}>
                        <DonutChart
                          segments={[
                            { label: 'Active', value: 72, color: 'var(--kui-color-brand-primary)' },
                            { label: 'Expiring', value: 18, color: 'var(--kui-color-warning)' },
                            { label: 'Revoked', value: 10, color: 'var(--kui-color-danger)' },
                          ]}
                          centerLabel="100"
                          centerSubtext="Total Keys"
                        />
                      </div>
                    </ChartContainer>
                  </Grid>
                </div>

                {/* Correlation Analysis & Stacked Categorical Ingress */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Distribution Correlation (`ScatterPlot`) & Ingress Composition (`StackedBarChart`)</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      Payload-to-latency distribution correlation against SLA ceilings alongside multi-category HTTP response composition.
                    </p>
                  </div>

                  <Grid columns="repeat(auto-fit, minmax(340px, 1fr))" gap={4}>
                    <ChartContainer
                      title="Payload Size vs Latency Distribution"
                      subtitle="Ingress request payload (KB) vs Gateway roundtrip latency (ms)"
                    >
                      <ScatterPlot
                        data={[
                          { x: 12, y: 14.2, label: 'GET /v1/tokens', color: 'var(--kui-color-brand-primary)' },
                          { x: 18, y: 15.8, label: 'GET /v1/keys', color: 'var(--kui-color-brand-primary)' },
                          { x: 45, y: 18.2, label: 'POST /v1/auth', color: 'var(--kui-color-brand-primary)' },
                          { x: 80, y: 19.5, label: 'POST /v1/events', color: 'var(--kui-color-brand-accent)' },
                          { x: 120, y: 21.0, label: 'POST /v1/audit/batch', color: 'var(--kui-color-brand-accent)' },
                          { x: 160, y: 22.8, label: 'PUT /v1/payloads/large', color: 'var(--kui-color-brand-accent)' },
                          { x: 210, y: 26.4, label: 'POST /v1/export/zip', color: 'var(--kui-color-danger)' },
                          { x: 28, y: 16.1, label: 'GET /v1/health', color: 'var(--kui-color-brand-primary)' },
                          { x: 95, y: 19.8, label: 'POST /v1/webhooks', color: 'var(--kui-color-brand-accent)' },
                          { x: 140, y: 23.2, label: 'POST /v1/sync', color: 'var(--kui-color-warning)' },
                          { x: 180, y: 24.1, label: 'POST /v1/snapshot', color: 'var(--kui-color-warning)' },
                          { x: 60, y: 17.5, label: 'GET /v1/metrics', color: 'var(--kui-color-brand-primary)' },
                        ]}
                        xAxisLabel="Payload Size (KB)"
                        yAxisLabel="Latency (ms)"
                        thresholdY={25}
                        thresholdYLabel="25ms SLA Ceiling"
                        xFormatter={(v) => `${v}KB`}
                        yFormatter={(v) => `${v.toFixed(0)}ms`}
                        height={240}
                      />
                    </ChartContainer>

                    <ChartContainer
                      title="HTTP Status Code Distribution (7 Days)"
                      subtitle="Categorical breakdown of cluster ingress responses (Thousands)"
                    >
                      <StackedBarChart
                        data={[
                          {
                            label: 'Mon',
                            segments: [
                              { key: '2xx', label: '2xx Success', value: 380, color: 'var(--kui-color-brand-primary)' },
                              { key: '3xx', label: '3xx Redirect', value: 25, color: 'var(--kui-color-brand-accent)' },
                              { key: '4xx', label: '4xx Client Err', value: 12, color: 'var(--kui-color-warning)' },
                              { key: '5xx', label: '5xx Server Err', value: 3, color: 'var(--kui-color-danger)' },
                            ],
                          },
                          {
                            label: 'Tue',
                            segments: [
                              { key: '2xx', label: '2xx Success', value: 620, color: 'var(--kui-color-brand-primary)' },
                              { key: '3xx', label: '3xx Redirect', value: 38, color: 'var(--kui-color-brand-accent)' },
                              { key: '4xx', label: '4xx Client Err', value: 18, color: 'var(--kui-color-warning)' },
                              { key: '5xx', label: '5xx Server Err', value: 4, color: 'var(--kui-color-danger)' },
                            ],
                          },
                          {
                            label: 'Wed',
                            segments: [
                              { key: '2xx', label: '2xx Success', value: 810, color: 'var(--kui-color-brand-primary)' },
                              { key: '3xx', label: '3xx Redirect', value: 50, color: 'var(--kui-color-brand-accent)' },
                              { key: '4xx', label: '4xx Client Err', value: 24, color: 'var(--kui-color-warning)' },
                              { key: '5xx', label: '5xx Server Err', value: 6, color: 'var(--kui-color-danger)' },
                            ],
                          },
                          {
                            label: 'Thu',
                            segments: [
                              { key: '2xx', label: '2xx Success', value: 740, color: 'var(--kui-color-brand-primary)' },
                              { key: '3xx', label: '3xx Redirect', value: 45, color: 'var(--kui-color-brand-accent)' },
                              { key: '4xx', label: '4xx Client Err', value: 20, color: 'var(--kui-color-warning)' },
                              { key: '5xx', label: '5xx Server Err', value: 5, color: 'var(--kui-color-danger)' },
                            ],
                          },
                          {
                            label: 'Fri',
                            segments: [
                              { key: '2xx', label: '2xx Success', value: 870, color: 'var(--kui-color-brand-primary)' },
                              { key: '3xx', label: '3xx Redirect', value: 55, color: 'var(--kui-color-brand-accent)' },
                              { key: '4xx', label: '4xx Client Err', value: 22, color: 'var(--kui-color-warning)' },
                              { key: '5xx', label: '5xx Server Err', value: 3, color: 'var(--kui-color-danger)' },
                            ],
                          },
                          {
                            label: 'Sat',
                            segments: [
                              { key: '2xx', label: '2xx Success', value: 490, color: 'var(--kui-color-brand-primary)' },
                              { key: '3xx', label: '3xx Redirect', value: 30, color: 'var(--kui-color-brand-accent)' },
                              { key: '4xx', label: '4xx Client Err', value: 16, color: 'var(--kui-color-warning)' },
                              { key: '5xx', label: '5xx Server Err', value: 4, color: 'var(--kui-color-danger)' },
                            ],
                          },
                          {
                            label: 'Sun',
                            segments: [
                              { key: '2xx', label: '2xx Success', value: 370, color: 'var(--kui-color-brand-primary)' },
                              { key: '3xx', label: '3xx Redirect', value: 22, color: 'var(--kui-color-brand-accent)' },
                              { key: '4xx', label: '4xx Client Err', value: 14, color: 'var(--kui-color-warning)' },
                              { key: '5xx', label: '5xx Server Err', value: 4, color: 'var(--kui-color-danger)' },
                            ],
                          },
                        ]}
                        valueFormatter={(v) => `${v}k`}
                        height={180}
                      />
                    </ChartContainer>
                  </Grid>
                </div>

                {/* 7. Standalone Sparkline Gallery */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Sparkline Visualizations (`Sparkline`)</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      Responsive inline SVG paths with automatic coordinate normalization, gradient area fills, and anchor dots.
                    </p>
                  </div>

                  <Card variant="bordered">
                    <Grid columns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-1)' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)' }}>
                          Mint Gradient Area Fill:
                        </span>
                        <div style={{ height: '48px', padding: '4px', backgroundColor: 'var(--kui-color-surface-subtle)', borderRadius: 'var(--kui-radius-sm)' }}>
                          <Sparkline data={[10, 22, 18, 35, 28, 45, 60]} fill />
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-1)' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)' }}>
                          Brand Forest High-Contrast:
                        </span>
                        <div style={{ height: '48px', padding: '4px', backgroundColor: 'var(--kui-color-surface-subtle)', borderRadius: 'var(--kui-radius-sm)' }}>
                          <Sparkline data={[45, 38, 42, 28, 34, 22, 15]} color="var(--kui-color-brand-primary)" fill={false} strokeWidth={2.5} />
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-1)' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)' }}>
                          Warning Trajectory:
                        </span>
                        <div style={{ height: '48px', padding: '4px', backgroundColor: 'var(--kui-color-surface-subtle)', borderRadius: 'var(--kui-radius-sm)' }}>
                          <Sparkline data={[5, 12, 18, 25, 34, 48, 62]} color="var(--kui-color-warning)" fill />
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-1)' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)' }}>
                          Recovery Curve (Danger to Safe):
                        </span>
                        <div style={{ height: '48px', padding: '4px', backgroundColor: 'var(--kui-color-surface-subtle)', borderRadius: 'var(--kui-radius-sm)' }}>
                          <Sparkline data={[60, 52, 40, 28, 15, 8, 4]} color="var(--kui-color-danger)" fill />
                        </div>
                      </div>
                    </Grid>
                  </Card>
                </div>

                {/* 8. Security Audit Trail & Activity Timeline */}
                <div className="kui-showcase-section">
                  <div>
                    <h2 style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Security Audit Trail (`Timeline`)</h2>
                    <p style={{ fontSize: 'var(--kui-font-size-xs)', margin: 0 }}>
                      Continuous vertical connective track with milestone markers, relative timestamps, and actor avatars.
                    </p>
                  </div>

                  <Card variant="bordered">
                    <Timeline
                      items={[
                        {
                          id: 'ev-1',
                          title: 'TLS Gateway mTLS Certificate Auto-Rotated',
                          timestamp: '8 mins ago',
                          status: 'success',
                          description: 'Synced new Let\'s Encrypt leaf certificate across 6 cluster nodes with zero downtime.',
                        },
                        {
                          id: 'ev-2',
                          title: 'API Key Revocation Request Processed',
                          timestamp: '2 hours ago',
                          status: 'warning',
                          description: 'Key kui_dev_77fe...d0 revoked due to 90-day inactivity policy enforcement.',
                          actor: { name: 'Kaleem Molani' },
                        },
                        {
                          id: 'ev-3',
                          title: 'HMAC Signature Mismatch Detected & Blocked',
                          timestamp: '5 hours ago',
                          status: 'danger',
                          description: 'Edge router dropped 14 invalid payload attempts originating from untrusted CIDR block 198.51.100.4.',
                        },
                        {
                          id: 'ev-4',
                          title: 'Workload Trust Domain SPIFFE Federation Established',
                          timestamp: 'Yesterday at 16:42 UTC',
                          status: 'info',
                          description: 'Federated SPIFFE trust bundle configured with ingress-proxy cluster authority.',
                          actor: { name: 'DevOps Automated Bot' },
                        },
                        {
                          id: 'ev-5',
                          title: 'Routine Cluster Health Probe Succeeded',
                          timestamp: '2 days ago',
                          status: 'neutral',
                          description: 'All 24 worker health checks returned HTTP 200 within 12ms threshold.',
                        },
                      ]}
                    />
                  </Card>
                </div>
              </div>
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
      <ToastProvider>
        <PreviewContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
