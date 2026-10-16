# Kaleem UI --- Design System

Version: 1.0\
Status: Proposed specification pending visual validation

## 1. Design intent

Kaleem UI is calm, modern, precise, and quietly confident. It is
designed for serious application interfaces where people need to
understand information and complete tasks without visual noise.

The system uses evergreen as the anchor color, mint as a controlled
accent, neutral surfaces for legibility, modern sans-serif typography,
subtle radii, restrained elevation, and clear interaction states.

### Design principles

1.  **Clarity before decoration.** Every visual element must support
    hierarchy, comprehension, feedback, or navigation.
2.  **Consistency without uniformity.** Reuse the same tokens and
    components, but let page structure follow the user's task.
3.  **Balanced density.** Keep important information visible without
    crowding the interface or wasting space.
4.  **Progressive disclosure.** Keep primary actions and essential
    content visible; move advanced or infrequent options into
    appropriate secondary surfaces.
5.  **Accessible by default.** Keyboard access, visible focus, semantic
    structure, reduced motion, and adequate contrast are core
    requirements.
6.  **Evidence over invention.** Never fabricate statistics, records,
    user quotes, product capabilities, or logos.
7.  **Verified implementation.** A UI is not considered visually
    complete until its rendered result has been inspected at
    representative viewport sizes.

## 2. Visual identity

-   Primary identity: evergreen.
-   Accent: mint.
-   Surfaces: neutral, low-noise, theme-aware.
-   Typography: Inter where available, otherwise a modern system
    sans-serif stack.
-   Shape language: subtle rounding; avoid pill shapes except where
    semantically appropriate.
-   Elevation: minimal. Prefer surface contrast and borders to stacked
    shadows.
-   Iconography: one consistent line-icon family, consistent optical
    size and stroke.
-   Illustrations: use only when they explain a concept or materially
    improve comprehension.
-   Gradients: not a default. Use only if the product brief gives them a
    specific purpose.

## 3. Color tokens

Use `DESIGN_TOKENS.json` as the canonical initial source. Components
must consume semantic tokens, not hardcoded hex values.

### Initial light theme

-   Primary brand: `#102C27`
-   Accent mint: `#83F0C0`
-   Canvas: `#F6F7F5`
-   Surface: `#FFFFFF`
-   Main text: `#17231E`
-   Muted text: `#53635A`
-   Border: `#DDE3DE`

### Initial dark theme

-   Canvas: `#151A18`
-   Surface: `#1D2521`
-   Elevated surface: `#252F2A`
-   Main text: `#F2F6F3`
-   Muted text: `#B8C5BD`
-   Border: `#35423B`

### Semantic colors

Success, warning, error, and information colors must be paired with
suitable text, iconography, and accessible contrast. Never rely on color
alone to communicate status. Validate all foreground/background
combinations before release.

## 4. Theme behavior

Supported preference values: `system`, `light`, `dark`.

-   Default preference: `system`.
-   If system is selected, follow the operating system/browser
    color-scheme preference.
-   Persist explicit user preference using the consuming application's
    approved storage mechanism.
-   Avoid a flash of the wrong theme during initial render where
    feasible.
-   All components must use semantic tokens so themes can change without
    component-specific overrides.
-   Theme switching must not alter layout or cause content to become
    unreadable.

## 5. Typography

Use a consistent type scale. The initial scale is defined in
`DESIGN_TOKENS.json`.

-   Display sizes are reserved for rare high-level moments, not every
    page heading.
-   Page titles should be clear and compact.
-   Section headings establish hierarchy without competing with page
    titles.
-   Body text prioritizes readability.
-   Labels and metadata may be smaller but must remain legible.
-   Use tabular numerals for dense numerical data when supported.
-   Avoid excessive font weights, all-caps labels, and oversized text
    used merely for visual impact.

## 6. Spacing and layout

Use the spacing tokens defined in `DESIGN_TOKENS.json`, based on a
consistent 4 px base rhythm.

-   Align page content to a predictable grid.
-   Use consistent horizontal gutters and content widths.
-   Separate unrelated content groups with space rather than adding
    unnecessary cards.
-   Use cards when grouping, separation, or independent actions justify
    them.
-   Do not wrap every heading, paragraph, or statistic in a card.
-   Responsive layouts must adapt to content; do not only scale a
    desktop layout down.
-   Dense tables may use compact row spacing while maintaining usable
    controls and readability.

## 7. Shape, border, and elevation

-   Small controls: subtle radius, generally 6 px.
-   Inputs and standard buttons: generally 8 px.
-   Panels and dialogs: generally 10--12 px where appropriate.
-   Pill radius is reserved for status badges, tags, and genuinely
    pill-shaped controls.
-   Use neutral borders to define structure.
-   Shadows are reserved for overlays and meaningful elevation; avoid
    shadowing every card.
-   Do not mix unrelated radii across components.

## 8. Components

Every component must define: - Purpose and appropriate use. - Public API
and variants. - Visual states. - Keyboard behavior. - Accessible name
and semantic role. - Responsive behavior. - Theme behavior. - Tests and
documented examples.

Prefer composition over large components with many unrelated boolean
props. Do not create an abstraction solely to wrap one element unless it
adds a clear reusable contract.

## 9. Interaction and motion

-   Interactive controls need hover, focus-visible, active, disabled,
    and loading states as relevant.
-   Feedback should be close to the action that caused it.
-   Motion should communicate state changes, continuity, or hierarchy.
-   Prefer short, restrained transitions; avoid animation that delays
    task completion.
-   Respect `prefers-reduced-motion`.
-   Do not hijack scrolling or use parallax by default.
-   Menus, dialogs, and popovers must have predictable focus and
    dismissal behavior.

## 10. Application patterns

The library may provide reusable patterns such as App Shell, Sidebar,
Page Header, Filter Bar, Data Table, Settings Form, Empty State, and
Confirmation Dialog.

Patterns are optional starting points, not mandatory page templates.
Product-specific information architecture must determine which patterns
are used and how they are composed.

## 11. Anti-AI-slop rules

Do not automatically add: - A gradient hero to an application
dashboard. - Three identical feature cards for every section. - A
rounded card around every content block. - Decorative blobs, random icon
clusters, glow effects, or glassmorphism. - Charts or metrics that do
not represent real data. - Generic filler text or fabricated
testimonials. - Repetitive page layouts that ignore the underlying
task. - Animation without a usability purpose.

Before adding a visual element, ask: what user need, information
hierarchy, interaction, or brand requirement does it serve?

## 12. Accessibility

Target WCAG 2.2 AA. Validate contrast and keyboard interaction; do not
infer compliance from token choices alone.

-   Use semantic HTML and appropriate ARIA only where needed.
-   Ensure all actions are keyboard accessible.
-   Provide a visible focus indicator.
-   Label form controls and associate errors with their fields.
-   Announce asynchronous feedback appropriately.
-   Preserve usability at zoom and narrow viewport sizes.
-   Do not communicate state by color alone.
-   Test reduced motion and dark theme.
-   Document known gaps rather than claiming unverified compliance.

## 13. Visual verification

For meaningful UI changes: 1. Run the application. 2. Inspect
screenshots at desktop and mobile viewport sizes. 3. Check hierarchy,
spacing, content fit, theme contrast, and interaction states. 4. Compare
against the design specification and reference screenshots. 5. Fix
defects and re-check. 6. Run relevant automated checks.

Do not mark visual verification complete if only source code was
inspected.
