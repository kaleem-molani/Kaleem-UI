# Antigravity Prompt --- Build Kaleem UI

Act as a senior design-system architect, product designer, accessibility
specialist, and frontend engineer.

You are building **Kaleem UI**, a reusable React design system for my
future web applications. This is a long-lived shared library, not a
one-off website.

## Read first

Read these files in full: - `PRD.md` - `DESIGN.md` -
`DESIGN_TOKENS.json` - `COMPONENTS.md` - `ARCHITECTURE.md` -
`IMPLEMENTATION_PLAN.md` - `AGENTS.md`

Treat them as the current specification. Identify contradictions or
technical risks before implementing.

## Important: start with design preview only

Your first task is M0 --- Discovery and Design Preview.

Do not build the complete component library yet. Do not create dozens of
components before I approve the visual direction.

First: 1. Inspect the current repository and available tooling. 2.
Summarize any assumptions and technical constraints. 3. Create a small,
runnable preview of the proposed Kaleem UI design system. 4. Include an
application shell with sidebar and top bar, page title and actions,
buttons, form fields, status badges, a data table, empty/loading/error
states, and a theme switcher. 5. Demonstrate both light and dark themes.
6. Show a representative desktop layout and a narrow/mobile layout. 7.
Use the evergreen-and-mint visual identity, modern sans-serif
typography, balanced information density, and subtle rounding. 8. Use
realistic demo data only and label it as demo content. 9. Validate color
contrast and inspect the rendered preview using browser tools or
screenshots when available. 10. List the design decisions that need
approval and any token adjustments you recommend.

The preview must demonstrate actual hierarchy and interaction patterns,
not just a palette board. Avoid generic dashboard clichés, unnecessary
cards, decorative gradients, meaningless charts, and random iconography.

Stop after M0 and wait for my approval. Do not begin M1 until I
explicitly approve the preview.

## After approval

Implement one milestone at a time according to `IMPLEMENTATION_PLAN.md`.
At each milestone: - Make a focused implementation plan. - Implement
only the agreed scope. - Run the relevant checks. - Inspect rendered UI
where possible. - Report evidence and unresolved issues. - Stop at the
next approval gate.

## Quality requirements

Use React + TypeScript, semantic CSS variables, and the agreed package
architecture. Keep dependencies lean. Components must be typed,
accessible, documented, theme-aware, and tested. Never use hardcoded
colors where semantic tokens exist. Do not silently modify approved
design decisions. Do not claim tests or visual verification were
performed unless they were actually performed.

Success means a reusable and documented design system that helps future
applications look related without forcing every application into the
same layout.
