# Kaleem UI --- Component Specifications

This is the v1 component contract. Exact APIs should be finalized during
implementation and documented in Storybook. Do not implement every
component in one batch.

## General contract

All components must: - Use semantic design tokens and support light/dark
themes. - Have clear TypeScript types and stable exports. - Define
keyboard, focus, disabled, loading, error, and responsive behavior where
relevant. - Use semantic HTML and avoid unnecessary ARIA. - Support
composition and long/localized content where applicable. - Include at
least one documented example and relevant tests. - Avoid hardcoded
colors and arbitrary one-off visual styles.

## P0 --- Foundations

### ThemeProvider / useTheme

-   Preference: `system | light | dark`.
-   Expose current resolved theme and setter.
-   Avoid initial theme flash where feasible.
-   Document SSR/hydration behavior and persistence strategy.
-   Do not assume localStorage is available in every runtime.

### Typography

-   Components or utility styles for display, page title, section
    heading, body, label, caption, and code.
-   Use semantic HTML elements and allow appropriate element overrides.
-   Do not make every page title oversized.

### Container / Stack / Inline / Grid

-   Provide predictable spacing and responsive layout primitives.
-   Prefer CSS layout primitives over JavaScript measurement.
-   Avoid creating a proprietary layout DSL that is harder to use than
    CSS.

## P1 --- Core primitives

### Button

-   Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`.
-   Sizes: `sm`, `md`, `lg`.
-   States: default, hover, active, focus-visible, disabled, loading.
-   Support leading/trailing icon slots.
-   Use a real button for actions; use links for navigation.
-   Loading state must prevent accidental duplicate submission where
    appropriate and expose status accessibly.

### IconButton

-   Requires an accessible name via `aria-label` or visible text.
-   Variants align with Button.
-   Hit area must be usable on touch screens.
-   Tooltip may supplement but must not be the only accessible name.

### TextInput / Textarea

-   Support label, description, required state, disabled state, invalid
    state, and error message.
-   Associate labels and error descriptions programmatically.
-   Do not rely on placeholder text as the label.
-   Textarea supports sensible resizing and character count when useful.

### Select

-   Use a native select when it satisfies the UX requirements.
-   Use a custom accessible primitive only when necessary.
-   Support label, description, disabled, invalid, and empty/placeholder
    states.

### Checkbox / RadioGroup / Switch

-   Support keyboard interaction and visible focus.
-   Provide accessible group labels and descriptions.
-   Do not use a switch for actions that are not immediate binary
    settings.
-   Do not rely on color alone to indicate checked/selected state.

### Badge / StatusBadge

-   Variants: neutral, success, warning, danger, info.
-   Status text must remain understandable without color.
-   Do not use badges as decoration.

### Avatar

-   Support image, initials fallback, and accessible naming.
-   Grouped avatars must handle overflow without hiding important
    identity information.

### Tooltip

-   Use for brief supplemental information, not essential instructions.
-   Support keyboard focus and pointer interaction.
-   Do not trap focus.

### Separator

-   Semantic orientation and decorative/semantic mode where appropriate.

### Skeleton / Spinner / Progress

-   Loading indicators must not replace useful labels or status
    announcements.
-   Skeletons should resemble the expected content structure without
    creating layout shifts.

## P1 --- Overlays and navigation primitives

### Dialog

-   Accessible title and description where relevant.
-   Focus enters dialog, remains appropriately managed, and returns to
    the trigger on close.
-   Escape and backdrop dismissal behavior must be deliberate and
    documented.
-   Destructive actions require clear wording and appropriate
    confirmation.

### Popover

-   Predictable focus, placement, dismissal, and collision handling.
-   Use for contextual content, not for hiding essential navigation.

### DropdownMenu

-   Keyboard navigation, Escape dismissal, correct menu semantics.
-   Separate navigation links from action menu items.

### Tabs

-   Keyboard navigation and correct tab/tabpanel relationships.
-   Use only when switching between related peer sections.

### Accordion

-   Accessible disclosure controls with clear expanded state.
-   Do not hide frequently needed information solely to make the page
    appear cleaner.

### Toast / InlineAlert

-   Distinguish transient feedback from persistent errors.
-   Provide appropriate live-region behavior.
-   Avoid removing important error messages too quickly.

### Breadcrumbs / Pagination

-   Semantic navigation, current-page indication, and accessible labels.
-   Pagination must preserve relevant filters/search state in the
    consuming application.

## P2 --- Application components

### AppShell

-   Composes sidebar/top navigation and content area.
-   Must not dictate the product's complete information architecture.
-   Responsive navigation must remain keyboard accessible.

### Sidebar / TopNavigation

-   Clear active route, accessible labels, responsive collapse behavior.
-   Avoid unnecessary nested navigation and decorative icon clutter.

### PageHeader

-   Title, optional description, breadcrumbs, and primary/secondary
    actions.
-   Keep the title hierarchy consistent across routes.

### Card / Panel

-   Use when content is a meaningful group or interactive unit.
-   Variants: plain, bordered, elevated only when justified.
-   Do not wrap every block in a card.

### DataTable

-   Typed column definitions, loading/empty/error states, sorting and
    selection where needed.
-   Preserve semantic table structure for tabular data.
-   Responsive strategy must be explicit; do not blindly squeeze all
    columns onto mobile.
-   Do not build a feature-heavy table abstraction before actual use
    cases are known.

### FilterBar / SearchField

-   Make active filters visible and removable.
-   Provide clear reset behavior.
-   Keep search state and filtering semantics in the consuming
    application unless a reusable behavior is clearly defined.

### FormField / FormLayout

-   Consistent label, description, control, and error composition.
-   Keep validation logic in the form/application layer.
-   Ensure errors identify the field and corrective action.

### EmptyState

-   Explain what is absent and, where appropriate, provide a useful next
    action.
-   Avoid meaningless illustrations and generic filler.

### ConfirmationDialog

-   Clearly state the action and consequence.
-   Destructive action is visually distinct but not the default for
    ordinary confirmation.

### CommandPalette (Cmd+K)

- Keyboard-first command discovery and instant action launcher (`open`, `onClose`, `items`).
- Searchable, accessible (`role="combobox"`, `role="listbox"`), and grouped by category.
- Supports keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`) and `<Kbd>` shortcut chips.

### Drawer (Sheet)

- Slide-over side panel (`position="right | left"`, `size="sm | md | lg | xl | full"`).
- Spring animation with backdrop blur, sticky header, scrollable body, and sticky actions footer.
- Keyboard accessible with Escape-key dismiss, backdrop click, and body scroll lock.

### SegmentedControl

- Compact, low-clutter selection pills for 2–5 options with `role="radiogroup"`.
- Keyboard arrow navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`), active pill indicator.
- Replaces vertical radio buttons in modern dashboards and form modals.

### FormSection

- Visual grouping container (`variant="card | plain | inset"`, `columns={1 | 2 | 3}`).
- Inset surface contrast, icon badge chip, title, description, and responsive grid layout.

### BulkActionsBar

- Floating bottom-center pill bar for multi-row batch actions when table rows are selected.
- Displays selected count badge, action buttons, and deselect trigger with backdrop blur.

### Kbd

- Tactile 3D beveled keyboard shortcut badge (`⌘K`, `Ctrl+S`, `Esc`, `Enter`).
- Font-mono typography with subtle bottom-border bevel and theme contrast.


## Component contribution checklist

Before adding a component: 1. Confirm it is not already available. 2.
Define its use case and public API. 3. Check whether composition of
existing components is sufficient. 4. Specify theme and responsive
behavior. 5. Specify accessibility and interaction states. 6. Add
Storybook examples. 7. Add unit/accessibility tests. 8. Add visual
regression coverage for important states. 9. Update exports and
documentation. 10. Record breaking changes and migration guidance if
applicable.
