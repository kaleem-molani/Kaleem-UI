# Kaleem UI --- Repository Architecture

## 1. Monorepo

Use pnpm workspaces with independent packages and a documentation
application.

``` text
kaleem-ui/
├── AGENTS.md
├── README.md
├── PRD.md
├── DESIGN.md
├── DESIGN_TOKENS.json
├── COMPONENTS.md
├── ARCHITECTURE.md
├── IMPLEMENTATION_PLAN.md
├── ANTIGRAVITY_IMPLEMENTATION_PROMPT.md
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── packages/
│   ├── tokens/
│   │   ├── src/
│   │   │   ├── tokens.json
│   │   │   ├── themes.css
│   │   │   └── index.ts
│   │   └── package.json
│   ├── react/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── styles/
│   │   │   └── index.ts
│   │   └── package.json
│   └── icons/                 # optional; only if a wrapper package adds value
├── apps/
│   └── docs/
│       ├── .storybook/
│       └── stories/
├── tests/
│   ├── unit/
│   ├── accessibility/
│   └── visual/
└── .github/
    └── workflows/
```

## 2. Package responsibilities

### `@kaleem-ui/tokens`

Canonical design tokens, semantic theme mappings, CSS custom properties,
and optional Tailwind integration. It must not depend on React.

### `@kaleem-ui/react`

React components and hooks. It depends on tokens and only the accessible
primitives it actually uses.

### `@kaleem-ui/icons` (optional)

Only create this package if it provides meaningful consistency or
tree-shaking benefits. Otherwise standardize on a single icon package
and document sizing rules.

### `apps/docs`

Storybook with interactive examples, usage guidance, states, keyboard
behavior, and theme previews.

## 3. Dependency rules

-   Tokens do not depend on React or the component package.
-   React components may consume tokens and accessible primitives.
-   Documentation consumes the published packages as a normal
    application would.
-   Product-specific business logic does not belong in the generic
    component package.
-   No circular dependencies.
-   Do not expose internal files as public APIs.
-   Use explicit package exports.

## 4. Styling strategy

Use CSS custom properties as the source of truth. Tailwind may consume
the same semantic variables, but must not introduce a competing palette
or spacing scale.

Prefer semantic variables such as: - `--kui-color-canvas` -
`--kui-color-surface` - `--kui-color-text-primary` -
`--kui-color-text-secondary` - `--kui-color-border` -
`--kui-color-brand` - `--kui-color-accent` - `--kui-radius-control` -
`--kui-space-4`

Avoid styling application components with hardcoded color literals.

## 5. Theme architecture

-   Theme preference API: `system | light | dark`.
-   Theme resolution belongs in a small, documented provider/hook.
-   Use a root attribute or class to activate semantic CSS variables.
-   Prevent theme flashes where practical.
-   Do not assume every consumer has the same persistence strategy.
-   Support SSR/hydration without reading browser-only APIs during
    server render.
-   Document how a consuming application can provide its own persistence
    adapter if needed.

## 6. Public API and releases

-   Export supported components and types from package entry points.
-   Avoid undocumented deep imports.
-   Use semantic versioning.
-   Maintain a changelog.
-   Breaking API changes require migration notes.
-   Keep peer dependencies explicit.
-   Test the package in a sample application before release.

## 7. Quality pipeline

Pull request checks should include: - Formatting and linting. -
TypeScript checks. - Unit tests. - Accessibility-oriented tests. -
Production build. - Storybook build. - Playwright smoke tests. - Visual
regression screenshots for selected stories and sample pages. -
Dependency audit where supported.

Visual diffs require human review when the baseline changes
intentionally. Do not blindly update all screenshots to make failures
disappear.

## 8. Publishing strategy

Start with local workspace consumption and a sample application. Once
the API is stable, publish versioned packages to a private registry or
use a controlled Git dependency. Do not block early design validation on
registry setup.
