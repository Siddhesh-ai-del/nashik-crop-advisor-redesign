# Nashik Crop Advisor — Redesign Plan (approved, 6 phases)

Dark premium interface · agricultural accents (moss green + harvest amber) ·
heavy `@samasante/liquid-glass` (including data cards) · ObsidianUI components ·
fix 5 confirmed bugs · preserve all functionality.
~14–20h · 5 reviewable commits · push after every sub-phase.

## Requirements Restatement

Redesign the **Nashik Crop Advisor** frontend (Next.js 16 / React 19 / Tailwind v4)
from its inconsistent "vibe-coded" warm-cream dashboard into a **dark premium
interface with agricultural accents (moss green + harvest amber)**, using
**`@samasante/liquid-glass` heavily — including on data cards** — plus a broad set
of **ObsidianUI** components, while fixing 5 confirmed bugs and preserving all
existing functionality (API routes, print/export, Gemini + fallback engine, charts).

**Locked decisions:** Dark theme · Heavy glass (cards included) · Full ObsidianUI shortlist.

---

## Phase 0 — Safety net + bug fixes *(no styling yet)*

- [x] **0.1 Baseline capture.** Screenshots at 1440/768/390 + print PDF → `.playwright-mcp/baseline/`. *(f4bf126)*
- [x] **0.2 Fix hydration mismatch.** `Dashboard.tsx` `new Date()` as `generatedAt` → stable `""` default, timestamp rendered client-side only. *(8c96ede)*
- [x] **0.3 Fix WeatherWidget overlap.** `grid-cols-[auto_1fr]` squeezed metrics → second row / `minmax(0,auto)`. *(ced97b8)*
- [x] **0.4 Fix `Compare all (0)` during load.** Hide until `crops.length > 0`. *(7c7c06b)*

## Phase 1 — Design token foundation

- [x] **1.1 Radius scale.** 50 literals (10/12/13/14/16/18/20px) → `--radius-sm/md/lg/xl` (8/12/16/24). *(0a56cfb)*
- [x] **1.2 Elevation ladder.** 14 bespoke `shadow-[rgba(61,43,31,…)]` → `--shadow-1/2/3` (+glow), retuned dark. *(0a56cfb)*
- [x] **1.3 Type scale.** `display/h1/h2/h3/body/caption` + display face (Source Serif 4) for headings. *(25f7f34)*
- [x] **1.4 Dark theme tokens.** `:root` charcoal ramp `#0a0b0c → #141618 → #1c1f22`, accents retuned, chart hexes remapped, `themeColor`. *(cc86b55)*
- [x] **1.5 Upgrade `cn`.** naive join → clsx + tailwind-merge with custom-token groups. *(44cd091)*

## Phase 2 — ObsidianUI primitives

- [ ] **2.1 Aliases.** Create `components.json` + `tsconfig.json` paths `@ui/*`, `@components/*`, `@lib/*`, `@hooks/*` → `src/*`.
- [~] **2.2 Install primitives.** Needed: `toggle-group`, `tabs`, `dialog`, `tooltip`, `progress`, `spinner`, `skeleton`, `badge`, `separator`, `scroll-area`.
  *(Done so far: alert, badge, button, card, checkbox, collapsible, dialog, empty, input, item, label, progress, separator, skeleton, spinner, switch, table, tabs, tooltip — 9a8627e; missing: toggle-group, scroll-area)*
- [ ] **2.3 Wire providers.** Mount `<TooltipProvider>`, `<Sonner Toaster>` roots in `layout.tsx`.

## Phase 3 — Layout & hierarchy surgery

- [~] **3.1 Rebalance two-column grid.** ~450px dead whitespace under weather card. *(6d1dd65 — weather card stretches to column height; original idea was full-width hero band)*
- [ ] **3.2 Kill the repeated "tinted square + icon + title + subtitle" pattern** (4×) → display heading → muted subhead → content. *(Files: `Header.tsx`, `ui.tsx`, `ParameterPanel.tsx`, `Dashboard.tsx`)*
- [ ] **3.3 Replace `OptionGrid` with `toggle-group`** for Region / Season / Soil / Water — real `aria-pressed`, focus rings, keyboard nav. Must preserve `layoutId` selected-dot motion. *(`ParameterPanel.tsx`)*
- [ ] **3.4 Replace `CropSwitcher` with `tabs`**; `ComparisonView` hand-rolled overlay → `dialog`/`drawer`. *(`CropSwitcher.tsx`, `ComparisonView.tsx`)*
- [ ] **3.5 Recommendation loading state.** 14.8s Gemini call → staged/animated loader (`loaders-gooey-blobs` or `spinner`) with progress copy. *(`Dashboard.tsx`, `ui.tsx`)*
- [ ] **3.6 Restyle charts.** Retheme axes/grid/labels for dark *(done in 1.4)*, add `tooltip` on data points, replace profit-margin bar with `progress`. *(4 chart files)*

## Phase 4 — Liquid Glass *(the heavy pass)*

- [ ] **4.1 Install.** `npm i @samasante/liquid-glass` (v0.1.1, peer react/react-dom ≥18 ✔).
- [ ] **4.2 Build the backdrop (load-bearing).** `src/components/backdrop/AmbientBackdrop.tsx` — non-animated gradient-mesh / subtle field-imagery layer fixed behind everything. **Glass refracts what's behind it; on a flat dark fill it looks like plain blur.** Mounted in `layout.tsx`.
- [ ] **4.3 Glass primitives.** `src/components/glass/`: `GlassPanel` (cards), `GlassBar` (sticky header/nav), `GlassChip` (presets/badges), `GlassModal`, plus `src/lib/glass.ts` with **2 locked `optics` presets** (`panel`, `chrome`). Include `prefers-reduced-motion` handling and `print:hidden` guard.
- [ ] **4.4 Apply — chrome.** Sticky header, preset chip row, floating Compare/Export action bar, error banner, ComparisonView modal. *(`Header.tsx`, `PresetButtons.tsx`, `Dashboard.tsx`, `ComparisonView.tsx`)*
- [ ] **4.5 Apply — cards (the "heavy" choice).** Convert `ui.tsx:SectionCard` → `GlassPanel` **in one place** so all 10+ cards update at once (CropDetails, Radar, Financial, Pest, Water, Timeline…).
- [ ] **4.6 Print suppression.** Every glass surface excluded from `@media print` so `PrintSummary` stays solid. *(`globals.css`, glass components)*

## Phase 5 — ObsidianUI feature components

- [ ] **5.1** `interactive-hover-button` → Export/Print, Refresh, Compare actions.
- [ ] **5.2** `sonner` toasts → weather refresh, export, API errors (currently silent/inline).
- [ ] **5.3** `flip-text` / `text-reel` → headline + crop-tier recommendation swap.
- [ ] **5.4** `hover-img` (**needs `gsap`**) → crop card imagery. *Needs image assets sourced.*
- [ ] **5.5** `liquid-metal` (**needs `@paper-design/shaders-react`**, WebGL) → logo/hero only, not the dashboard body.
- [ ] **5.6** `smooth-scroll` (**needs `lenis`**) + `click-spark` (**needs `next-themes`**) → global page feel.

## Phase 6 — Motion, QA, verification

- [ ] **6.1** Unified easing/duration tokens; retire ad-hoc `ease: [0.25,0.46,0.45,0.94]` literals.
- [ ] **6.2** **Contrast audit** — glass over dark with light text is a WCAG AA risk; check every badge/ink-muted token.
- [ ] **6.3** **Performance pass** — count SVG filters above the fold, `filterResolution`, IntersectionObserver-mount to avoid painting offscreen glass.
- [ ] **6.4** Verify: `npx tsc --noEmit`, `npm run lint`, `npm run build`, clean console, 1440/768/390 screenshots vs. baseline, print PDF.

---

## Dependencies

**New npm:** `@samasante/liquid-glass` · `sonner` · `next-themes` · `lenis` · `gsap` ·
`@paper-design/shaders-react` (heaviest, WebGL) · Radix toggle/tabs/dialog/tooltip/progress *(done)* ·
`clsx`/`tailwind-merge`/`class-variance-authority` *(done)*.

**External:** crop imagery assets for `hover-img` (Unsplash or `public/`). No API changes.

## Risks

- **HIGH — Heavy glass on ~15 data cards.** Each `<Glass>` spawns an SVG `feDisplacementMap` + 3-pass RGB split. *Mitigation:* low-cost `optics` preset for cards; `filterResolution={1}`; avoid `live`; IntersectionObserver mount; CSS fallback for constrained devices; FPS before/after in 6.3.
- **HIGH — Glass legibility on charts/tables.** *Mitigation:* solid inner "data well" behind chart plots while the shell stays glass; enforce AA in 6.2.
- **MEDIUM — Dark-theme long tail.** ~150 light-assuming references. *(handled in 1.4)*
- **MEDIUM — Cross-browser refraction gap.** Live-DOM bending is Chrome/Edge only; Safari/Firefox get frost + tint. *Mitigation:* tune `optics.frost`.
- **MEDIUM — Two early-stage libraries.** liquid-glass v0.1.1; ObsidianUI copy-and-own. *Mitigation:* copy source into repo, pin glass version.
- **MEDIUM — New transitive deps** (`gsap`, `lenis`, `@paper-design/shaders-react`). *Mitigation:* dynamic-import WebGL, gate effects behind `next/dynamic`.

**Estimated complexity:** Phase 0 ~1.5h · 1 ~3h · 2 ~1.5h · 3 ~3h · 4 ~4–5h · 5 ~2–3h · 6 ~2h.
