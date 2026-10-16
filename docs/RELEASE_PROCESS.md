# Release Process & Hardening Guidelines

This document outlines the versioning conventions, quality checks, and verification procedures required before publishing or deploying releases of Kaleem UI.

## 1. Versioning Conventions (SemVer)

All packages in the monorepo (`@kaleem-ui/tokens`, `@kaleem-ui/react`) adhere strictly to [Semantic Versioning 2.0.0](https://semver.org/):

- **Major (`X.0.0`)**: Breaking changes to token naming conventions, component prop interfaces, or removal of deprecated primitives.
- **Minor (`0.X.0` or `1.X.0`)**: Addition of new primitives, layout components, or non-breaking extensions to semantic variables.
- **Patch (`0.0.X` or `1.0.X`)**: Bug fixes, accessibility corrections, internal performance enhancements, and documentation updates.

All packages maintain synchronized version numbers across the monorepo.

## 2. Pre-Release Verification Gates

Every pull request and release build must pass all automated verification gates:

```bash
# 1. Static linting across all files
pnpm lint

# 2. Strict multi-project TypeScript typechecking
pnpm typecheck

# 3. Package unit and invariant tests:
#    - WCAG 2.1 AA token contrast invariants (19 checks)
#    - Exported primitives and hooks verification (45 checks)
#    - ARIA and accessibility contract verification (12 checks)
pnpm test

# 4. Production build compilation
pnpm build

# 5. Release and consumer integrity verification:
#    - Verifies dist directory existence and exports
#    - Verifies zero rogue runtime dependencies
#    - Simulates an external application importing tokens and rendering components
pnpm release:check

# 6. Preview reference application build
pnpm --filter preview build
```

## 3. Browser & Visual Verification Policy

- **Automated Browser Automation**: In accordance with workspace environment rules (`NO browser test`), automated headless browser tests (e.g., Playwright, Puppeteer, Chrome DevTools automation) are not executed in development pipelines.
- **Contract & SSR Validation**: Layout attributes, semantic HTML elements (`<dialog>`, `<table>`, `<ol>`), and accessibility properties (`role`, `aria-*`, `disabled`) are verified deterministically via Node.js server-side rendering assertion tests (`scripts/verify-a11y-contracts.js` and `scripts/verify-consumer.js`).
- **Human Inspection**: Visual and aesthetic fidelity (hierarchy, density, responsive 390px mobile simulation, theme transitions) is audited against [`docs/VISUAL_REVIEW_CHECKLIST.md`](./VISUAL_REVIEW_CHECKLIST.md).

## 4. Known Gaps & Future Roadmap

- **Virtualization**: For datasets exceeding 5,000 rows, `DataTable` currently renders standard table rows without windowed virtualization. Large-scale streaming virtualization is slated for v1.1.0.
- **Drag-and-Drop Column Reordering**: Table columns currently use a fixed declaratively configured ordering.
- **Right-to-Left (RTL) Layout**: Primary text alignment and directional icons currently target LTR layouts; explicit bidirectional CSS logical properties (`margin-inline-start`, etc.) are slated for future multi-lingual internationalization.
