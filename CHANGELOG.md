# Changelog

All notable changes to the Kaleem UI design system and component libraries are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **`ToastProvider` & `useToast()` Notification System**:
  - Global reactive toast dispatcher supporting stacked container positioning (`bottom-right`, `top-right`, `bottom-center`, etc.).
  - Configurable auto-dismiss timers with pause-on-hover, manual dismissal, and callback hooks.
  - Polite and assertive ARIA live-regions (`role="status"` / `role="alert"`) for screen reader announcements.
  - Convenience dispatch helpers: `toast()`, `toast.success()`, `toast.danger()`, `toast.warning()`, and `toast.info()`.
- **`MetricCard` Telemetry Primitive**:
  - Executive KPI card designed for dashboard analytics.
  - Supports prominent metric values, uppercase labels, sentiment-colored delta change badges (`ArrowUpIcon` / `ArrowDownIcon`), descriptive subtext, and an embedded sparkline or accessory slot.
- **`Timeline` Audit Trail Primitive**:
  - Chronological activity log rendered as semantic `<ol role="list">` and `<li>`.
  - Continuous 2px vertical connective track with status-accented milestone markers (success, warning, danger, neutral, brand).
  - Integrates actor avatars, timestamps, titles, descriptions, and tag pills.
- **`Stepper` Workflow Primitive**:
  - Multi-step wizard and progress navigation adhering to WAI-ARIA (`<nav aria-label="Progress">`, `aria-current="step"`).
  - Supports numbered and checkmark step circles, horizontal and vertical orientations, completed/current/upcoming step states, and clickable step callbacks.
- **Zero-Dependency SVG Micro-Charts (`@kaleem-ui/react`)**:
  - `ChartContainer`: Accessible wrapper providing titles, subtitles, semantic legends, and `role="img"` attributes.
  - `Sparkline`: Compact trend line with automatic coordinate normalization, mint gradient fill, and min/max anchor points.
  - `BarChart`: Scaled categorical bars with customizable bar colors, value labels, and interactive tooltips.
  - `DonutChart`: Proportional SVG circular segment visualization with center metric readout and accessible metadata.
- **`Pagination` Primitive**: Accessible multi-page navigation component supporting page truncation dots (`getPaginationRange`), `aria-current="page"`, next/previous controls, customizable `pageSizeOptions`, and items range summary.
- **`DataTable` Sorting & Pagination**:
  - Added `sortable?: boolean` to `DataTableColumn<T>` with interactive column header buttons, sort direction arrows (`ArrowUpIcon`, `ArrowDownIcon`, `ArrowUpDownIcon`), and accessible `aria-sort="ascending" | "descending" | "none"`.
  - Added optional integrated `pagination` container slot at table footer.
  - Exported `paginateAndSortData` client-side sorting and slicing helper function.
- **Icons**: Added `ChevronLeftIcon`, `ArrowUpIcon`, `ArrowDownIcon`, and `ArrowUpDownIcon` to `@kaleem-ui/react`.

## [1.0.0] - 2026-10-17

### Added
- **`@kaleem-ui/tokens` Package**:
  - Semantic CSS custom properties layer (`themes.css`) with evergreen forest brand (`#102C27` / `#167653`) and cool mint accents (`#83F0C0`).
  - Native light/dark theme support with automatic system preference detection (`@media (prefers-color-scheme: dark)`) and manual overrides (`data-theme="light"` / `data-theme="dark"`).
  - Verified WCAG 2.1 AA contrast ratios across all semantic roles, including accessible muted text (`#607065` light, `#B8C5BD` dark).
  - Strongly typed JavaScript token object literal and `tokens.json` specification.
- **`@kaleem-ui/react` Package**:
  - **Foundations**: `Typography` (`Heading`, `Text`), `Layout` (`Container`, `Stack`, `Inline`, `Grid`), `ThemeProvider`, and `useTheme` hook.
  - **Actions & Controls**: `Button` (5 variants, 3 sizes, loading & disabled states), `IconButton` (accessible touch targets), `Input`, `Select`, `Checkbox` (including pure and indeterminate states), `Switch`, `Textarea` (with character counter), `RadioGroup`.
  - **Status & Indicators**: `Badge` (neutral, success, warning, danger, info with optional dot), `Avatar` (image with initials fallback), `Separator` (horizontal & vertical).
  - **Feedback & Overlays**: `InlineAlert`, `Spinner`, `Skeleton` (text, rectangle, circle), `Tooltip`, native HTML5 `Dialog` (with focus trapping and backdrop dismissal), `Popover`, `DropdownMenu`, `Tabs` (keyboard arrow navigation), `Accordion` (region disclosure).
  - **Composite Application Patterns**: `Breadcrumbs`, `PageHeader`, `Card` (bordered, elevated, plain), `FormField`, `FormLayout`, `FilterBar`, `SearchField`, `DataTable<T>` (with multi-row selection), `EmptyState`, `ConfirmationDialog`, `Toast`, `AppShell`.
- **Reference Application (`preview`)**:
  - Interactive API Credentials internal management screen with full state coverage: Populated, Empty State, Loading Skeleton, and Error State.
  - Responsive layout with 390px mobile narrow simulation toggle and mobile drawer navigation.
  - Complete Design System Catalog: Foundations, Primitives, Patterns, and Guidelines (Do/Don't matrix & live contrast audit).
- **Release Hardening & CI**:
  - Automated zero-dependency contrast verification suite (`scripts/verify-contrast.js`).
  - Automated 12-rule accessibility and ARIA contract assertions test suite (`verify-a11y-contracts.js`).
  - Consumer application import and SSR integration test (`verify-consumer.js`).
  - GitHub Actions CI workflow (`.github/workflows/ci.yml`) testing Node 20 and Node 22.
