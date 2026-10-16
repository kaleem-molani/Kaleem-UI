# Kaleem UI --- Milestone-by-Milestone Build Plan

## Execution protocol

Build in small, verifiable milestones. Do not start the full library
before the design preview is approved. Each milestone ends with
evidence, a summary, and an explicit go/no-go gate.

## M0 --- Discovery and design preview

Tasks: - Inspect repository and environment. - Confirm stack and package
manager. - Read PRD, DESIGN.md, token JSON, and component
specifications. - Create a small visual preview with representative app
shell, navigation, buttons, form controls, table, status states, and
theme switcher. - Show both light and dark themes. - Include desktop and
narrow-screen layouts. - Validate color contrast and identify any token
adjustments. - Do not create the full library yet.

Acceptance: - The owner approves the visual direction. - The preview has
no obvious hierarchy, overflow, or contrast defects. - Token changes are
recorded before implementation.

## M1 --- Repository scaffold

Tasks: - Create pnpm workspace and TypeScript base configuration. -
Create tokens and React packages. - Configure linting, formatting,
tests, and build scripts. - Add repository-level AGENTS.md. - Keep
dependencies minimal and compatible.

Acceptance: - Clean install works. - Workspace builds. - Type checks and
lint checks run. - Package boundaries are documented.

## M2 --- Foundations and themes

Tasks: - Implement canonical tokens and semantic CSS variables. -
Implement system/light/dark theme behavior. - Implement typography and
basic layout primitives. - Add focus-ring and reduced-motion
conventions. - Verify contrast for text, controls, borders, and status
states.

Acceptance: - Theme changes do not require component-specific
overrides. - No token duplication or circular dependency. - Theme
preview works in the docs app. - Contrast issues are fixed or documented
before proceeding.

## M3 --- Core primitives

Implement in small batches: 1. Button and IconButton. 2. TextInput,
Textarea, Select. 3. Checkbox, RadioGroup, Switch. 4. Badge, Avatar,
Separator. 5. Tooltip and basic feedback components. 6. Dialog, Popover,
DropdownMenu, Tabs, Accordion.

For each component: - Define API and variants. - Implement semantics and
keyboard behavior. - Add Storybook stories for all important states. -
Add unit and accessibility-oriented tests. - Add visual checks for
high-risk states.

Acceptance: - No undocumented public props. - All interactive controls
have accessible names and focus states. - Disabled/loading/error states
are verified.

## M4 --- Application patterns

Implement: - AppShell and navigation. - PageHeader and Breadcrumbs. -
Card/Panel. - FormField and FormLayout. - FilterBar and SearchField. -
DataTable with explicit responsive strategy. - EmptyState, InlineAlert,
Toast, ConfirmationDialog.

Acceptance: - Patterns compose primitives rather than duplicating their
styles. - Patterns do not impose a universal information architecture. -
Sample pages use realistic, clearly identified demo data.

## M5 --- Documentation and reference application

Tasks: - Build Storybook navigation by Foundations, Components,
Patterns, and Guidelines. - Add do/don't examples and accessibility
notes. - Build a representative internal application screen using only
Kaleem UI components. - Demonstrate adaptive theme, loading, empty,
error, and populated states. - Add a narrow viewport preview.

Acceptance: - A new developer can find the right component and
understand its usage. - Reference app demonstrates consistency without
repetitive card layouts. - No undocumented visual deviations.

## M6 --- Visual regression and release hardening

Tasks: - Add Playwright smoke tests and screenshot baselines. - Capture
representative light/dark desktop and mobile views. - Add CI
workflows. - Run dependency and production build checks. - Review
keyboard navigation and accessibility. - Verify package exports and
consumer installation. - Add versioning and changelog conventions.

Acceptance: - CI is green for the agreed checks. - Screenshot changes
are reviewed rather than automatically accepted. - Known gaps are
documented. - Package can be consumed by a clean sample app.

## M7 --- First reusable release

Tasks: - Freeze v1 token and component APIs. - Publish to the selected
private distribution mechanism or document Git-based installation. - Add
a migration/release guide. - Test installation in a second, separate
application. - Update Antigravity global rules to require the library.

Acceptance: - A separate application installs and uses the library
successfully. - The agent can discover the design rules and components
from project instructions. - Version updates are explicit and
reviewable.

## Rules for the coding agent

-   Stop at the M0 approval gate; do not proceed to M1 without approval
    of the visual preview.
-   Do not claim tests ran unless they were actually run.
-   Do not silence failures by deleting tests or blindly updating
    snapshots.
-   Prefer the smallest change that satisfies the milestone.
-   Keep a decision log for changes to approved design foundations.
