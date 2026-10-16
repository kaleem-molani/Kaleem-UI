# Migration Guide: Adopting Kaleem UI v1.0

This guide assists engineering teams in migrating legacy applications or prototype interfaces to **Kaleem UI v1.0**.

---

## 1. Replacing Ad-hoc Color Palettes

Legacy prototypes often hardcode arbitrary hex codes or generic greens. Replace them with canonical semantic variables:

| Legacy Raw Color | Semantic Token Variable | Description |
| :--- | :--- | :--- |
| `#102C27`, `#004d40` | `var(--kui-color-brand)` | Core evergreen brand identity |
| `#83F0C0`, `#00ffcc` | `var(--kui-color-accent)` | Cool mint interactive focus & highlights |
| `#F6F7F5`, `#151A18` | `var(--kui-color-canvas)` | Adaptive application background |
| `#FFFFFF`, `#1D2521` | `var(--kui-color-surface)` | Card and panel elevated surface |
| `#DDE3DE`, `#35423B` | `var(--kui-color-border)` | Accessible container border (3:1 contrast) |
| `#17231E`, `#F2F6F3` | `var(--kui-color-text-primary)` | High-contrast body & heading text |
| `#53635A`, `#B8C5BD` | `var(--kui-color-text-secondary)` | Secondary metadata text |

---

## 2. Migrating Component Primitives

### Buttons
**Before (ad-hoc HTML):**
```html
<button class="btn btn-green custom-submit" onclick="submit()">
  Submit
</button>
```

**After (Kaleem UI):**
```tsx
import { Button } from '@kaleem-ui/react';

<Button variant="primary" size="md" onClick={submit}>
  Submit
</Button>
```

### Form Controls
**Before (unlinked input and error):**
```html
<div>
  <span>Username</span>
  <input type="text" />
  <span style="color: red">Invalid name</span>
</div>
```

**After (accessible association):**
```tsx
import { Input } from '@kaleem-ui/react';

<Input
  label="Username"
  error="Invalid name"
  required
/>
```
*Kaleem UI automatically links `id` with `<label htmlFor>`, sets `aria-invalid="true"`, binds `role="alert"`, and coordinates `aria-describedby`.*

### Modals & Overlays
**Before (third-party runtime or portal overlay):**
```html
<div class="modal-backdrop">
  <div class="modal-content">...</div>
</div>
```

**After (HTML5 top-layer native `<dialog>`):**
```tsx
import { Dialog } from '@kaleem-ui/react';

<Dialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Provision Access Token"
  description="Sets security perimeter scopes."
>
  ...
</Dialog>
```
*Kaleem UI uses the browser's native `showModal()`, automatically preventing backdrop interaction, managing focus, and supporting native Escape dismissal with zero runtime bundle bloat.*

---

## 3. Spacing and Density Standardization

Replace arbitrary pixel paddings with Kaleem UI's 4px base rhythm:

- `4px`  → `var(--kui-space-1)`
- `8px`  → `var(--kui-space-2)`
- `12px` → `var(--kui-space-3)`
- `16px` → `var(--kui-space-4)`
- `24px` → `var(--kui-space-6)`
- `32px` → `var(--kui-space-8)`
