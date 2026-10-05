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

## Phase 0 — Safety net + bug fixes _(no styling yet)_

- [x] **0.1 Baseline capture.** Screenshots at 1440/768/390 + print PDF → `.playwright-mcp/baseline/`. _(f4bf126)_
- [x] **0.2 Fix hydration mismatch.** `Dashboard.tsx` `new Date()` as `generatedAt` → stable `""` default, timestamp rendered client-side only. _(8c96ede)_
- [x] **0.3 Fix WeatherWidget overlap.** `grid-cols-[auto_1fr]` squeezed metrics → second row / `minmax(0,auto)`. _(ced97b8)_
- [x] **0.4 Fix `Compare all (0)` during load.** Hide until `crops.length > 0`. _(7c7c06b)_

## Phase 1 — Design token foundation

- [x] **1.1 Radius scale.** 50 literals (10/12/13/14/16/18/20px) → `--radius-sm/md/lg/xl` (8/12/16/24). _(0a56cfb)_
- [x] **1.2 Elevation ladder.** 14 bespoke `shadow-[rgba(61,43,31,…)]` → `--shadow-1/2/3` (+glow), retuned dark. _(0a56cfb)_
- [x] **1.3 Type scale.** `display/h1/h2/h3/body/caption` + display face (Source Serif 4) for headings. _(25f7f34)_
- [x] **1.4 Dark theme tokens.** `:root` charcoal ramp `#0a0b0c → #141618 → #1c1f22`, accents retuned, chart hexes remapped, `themeColor`. _(cc86b55)_
- [x] **1.5 Upgrade `cn`.** naive join → clsx + tailwind-merge with custom-token groups. _(44cd091)_

## Phase 2 — ObsidianUI primitives

- [ ] **2.1 Aliases.** Create `components.json` + `tsconfig.json` paths `@ui/*`, `@components/*`, `@lib/*`, `@hooks/*` → `src/*`.
- [~] **2.2 Install primitives.** Needed: `toggle-group`, `tabs`, `dialog`, `tooltip`, `progress`, `spinner`, `skeleton`, `badge`, `separator`, `scroll-area`.
  _(Done so far: alert, badge, button, card, checkbox, collapsible, dialog, empty, input, item, label, progress, separator, skeleton, spinner, switch, table, tabs, tooltip — 9a8627e; missing: toggle-group, scroll-area)_
- [ ] **2.3 Wire providers.** Mount `<TooltipProvider>`, `<Sonner Toaster>` roots in `layout.tsx`.

## Phase 3 — Layout & hierarchy surgery

- [~] **3.1 Rebalance two-column grid.** ~450px dead whitespace under weather card. _(6d1dd65 — weather card stretches to column height; original idea was full-width hero band)_
- [ ] **3.2 Kill the repeated "tinted square + icon + title + subtitle" pattern** (4×) → display heading → muted subhead → content. _(Files: `Header.tsx`, `ui.tsx`, `ParameterPanel.tsx`, `Dashboard.tsx`)_
- [ ] **3.3 Replace `OptionGrid` with `toggle-group`** for Region / Season / Soil / Water — real `aria-pressed`, focus rings, keyboard nav. Must preserve `layoutId` selected-dot motion. _(`ParameterPanel.tsx`)_
- [ ] **3.4 Replace `CropSwitcher` with `tabs`**; `ComparisonView` hand-rolled overlay → `dialog`/`drawer`. _(`CropSwitcher.tsx`, `ComparisonView.tsx`)_
- [ ] **3.5 Recommendation loading state.** 14.8s Gemini call → staged/animated loader (`loaders-gooey-blobs` or `spinner`) with progress copy. _(`Dashboard.tsx`, `ui.tsx`)_
- [ ] **3.6 Restyle charts.** Retheme axes/grid/labels for dark _(done in 1.4)_, add `tooltip` on data points, replace profit-margin bar with `progress`. _(4 chart files)_

## Phase 4 — Liquid Glass _(the heavy pass)_

- [x] **4.1 Install.** `npm i @samasante/liquid-glass` (v0.1.1, peer react/react-dom ≥18 ✔).

- [x] **4.2 Build the backdrop (load-bearing).** `src/components/backdrop/AmbientBackdrop.tsx` — non-animated gradient-mesh / subtle field-imagery layer fixed behind everything. **Glass refracts what's behind it; on a flat dark fill it looks like plain blur.** Mounted in `layout.tsx`. _(3 layers: colour pools + furrow bands + vignette; pixel-sampled visible; `print:hidden`)_

- [x] **4.3 Glass primitives.** `src/components/glass/`: `GlassPanel` (cards), `GlassBar` (sticky header/nav), `GlassChip` (presets/badges), `GlassModal`, plus `src/lib/glass.ts` with **2 locked `optics` presets** (`panel`, `chrome`). Include `prefers-reduced-motion` handling and `print:hidden` guard. _(`glass-surface` marker class keys both global guards in globals.css)_
- [x] **4.4 Apply — chrome.** Sticky header, preset chip row, floating Compare/Export action bar, error banner, ComparisonView modal. _(`Header.tsx` GlassBar + `lg:sticky`; `PresetButtons.tsx` GlassChip shells w/ state on the chip; `Dashboard.tsx` GlassPanel error banner + GlassChip action pill; `ComparisonView.tsx` GlassModal — DialogContent hollowed to a transparent Radix shell. Material-mode gotcha fixed: `filterResolution` is part of the lib's `isMaterial` gate (setting it ejects to GlassDOM → no backdrop frost + content warp), and material's inline `display:inline-block` default is neutralized via `style={{ display: undefined }}` so caller `flex`/`grid` classes win.)_
- [x] **4.5 Apply — cards (the "heavy" choice).** Convert `ui.tsx:SectionCard` → `GlassPanel` **in one place** so all 10+ cards update at once (CropDetails, Radar, Financial, Pest, Water, Timeline…). _(One delegation in `ui.tsx`; verified 14 material instances on the loaded dashboard, all with live `backdrop-filter`, WeatherWidget's `flex` display preserved via the `display:undefined` fix, idle frames 16.5ms avg / 17ms max @14 surfaces.)_
- [x] **4.6 Print suppression.** Every glass surface excluded from `@media print` so `PrintSummary` stays solid. _(`globals.css` `.glass-surface` `!important` neutralizes the inline `filter`/`backdrop-filter`; `AmbientBackdrop` is `print:hidden`; all 4 primitives carry the marker class. Also re-flipped the full token ramp dark-on-white in `@media print` — the 1.4 dark flip had left `--ink: #e8e6e1` light text on the white print background. Output PDF verification deferred to 6.4.)_

## Phase 5 — ObsidianUI feature components

- [x] **5.1** `interactive-hover-button` → Export/Print, Refresh, Compare actions. _(Registry block adapted: the `scale-[100.8]` moss disc is the signature fill — hover floods the pill moss, so the hover row must stay `text-primary-foreground` (7.7:1 on moss), not re-tinted. Disc restructured as an always-present layer so the icon variant (Refresh's spinning `RefreshCw`) keeps the fill and rides the resting row out with the label; explicit `focus-visible` ring + `motion-reduce:transition-none`.)_
- [x] **5.2** `sonner` toasts → weather refresh, export, API errors (currently silent/inline). _(`useRecommendation.ts` toasts manual-refresh success (live/offline variants) + API errors with stable ids (dedupe, no stacking); `ExportButton` shows "Opening print dialog…" and defers `print()` one frame so the toast paints before the modal blocks the thread, dismissing it on return; toaster is `display:none` in `@media print`. Fixed the ObsidianUI wrapper's shadcn-compat vars — `--popover`/`--radius` don't exist in this theme, making sonner's `[data-styled=true]` background/border-radius invalid → transparent square; now maps to `--surface-elevated`/`--ink`/`--radius-lg`.)_
- [x] **5.3** `flip-text` / `text-reel` → headline + crop-tier recommendation swap. _(`text-reel` isn't in the registry — flip-text only. Ships no companion CSS, so authored the keyframes: ink front face + moss `::before` back face (`attr(data-char)`, rotateX 180°), wave driven by the component's sine-staggered `--flip-delay`. Two registry adaptations: word gap moved out of the `&nbsp;` span (unbreakable phrases overflowed 390px) and delay rounded to 0.1ms (`Math.sin` ULP differed server→client → hydration mismatch). Applied one-shot (`loop=false`) to the brand h1 and the CropDetails crop headline (remounts via AnimatePresence per tier swap); `aria-label` preserves accessible names over per-char spans; print pins chars upright, reduced-motion disables.)_
- [x] **5.4** `hover-img` (**needs `gsap`**) → crop card imagery. _Image assets sourced:_ 23 Wikimedia Commons JPEGs in `public/crops/` (credits in `public/crops/CREDITS.md`); `src/lib/crop-images.ts` maps crop names → thumbnails (ordered specific-first keyword rules, generic `field` fallback for Gemini free-text). Block adapted to the token theme (drops registry's 100vh/light bg/`.dark`/Raleway), wrapper defaults to `scale(0)` (no SSR flash), reduced-motion collapses gsap tweens + CSS transitions, print-hidden + `aria-hidden` (rows duplicate the tabs). Wired as a compact photo index above the tab strip in the rec-card; `gsap@3.15.0`.
- [x] **5.5** `liquid-metal` (**needs `@paper-design/shaders-react`**, WebGL) → logo/hero only, not the dashboard body. _Landed on the logo:_ chip in `Header.tsx` — `LiquidMetal` shader (dark chrome `#191c13` + harvest-amber `#dfbd7e`, speed 0.35) as a bezel behind a `bg-surface/85` medallion disc holding the sprout (`text-moss-deep`; `moss-light` is near-black after the 1.4 flip and bright bands swallowed a naked glyph). `bg-surface`+ring = no-WebGL fallback; header already `print-hide`; shader parks under reduced motion (registry's `useReducedMotion`). Verified: canvas/WebGL live, frames differ over 400ms, 0 console errors.
- [x] **5.6** `smooth-scroll` (**needs `lenis`**) + `click-spark` → global page feel. _(Blocks materialized registry-verbatim (lenis 1.3.26): Lenis drives wheel/touch with `lerp` while globals keeps `scroll-behavior: smooth` for anchor jumps — `setScroll` uses `behavior:"instant"` so the two never fight; `respectReducedMotion` parks the loop under reduce (wheel ramps 0→900, instant). `click-spark` gets an explicit `sparkColor="#d4b87a"` — no ThemeProvider mounts, so next-themes' default would fall back to invisible `#000`. motion@13's `useReducedMotion` reads `prefers-reduced-motion` once at mount with no change listener — replaced by `src/lib/use-reduced-motion.ts` (`useSyncExternalStore`, live), adopted by click-spark, smooth-scroll, liquid-metal + Header. Verified: eased ramp settles exactly, `lenis` class absent under reduce, spark canvas z-9999/pointer-events-none, 156-stroke burst expires to 0, 0 under reduce, 0 console errors.)_
- [x] **5.7** Dark Aurora Background (user-requested backdrop swap). _Replaced AmbientBackdrop's 4.2 mesh/furrow/vignette layers with OpenSourceUI's MIT `DarkAuroraBackground` (© 2026 Bidyut Kundu, full notice in the file header) — layers verbatim: `#0A0C0F` base + vertical gradient, four `blur-3xl` blooms (teal 22/cyan 18/emerald 16/sky 14% opacities) in a `blur-xl` `-inset-6` layer, 4px dot-grid @4%; wrapper keeps the 4.2 fixed/`-z-10`/`pointer-events-none` contract + 4.6 `print:hidden`. Still fully static (zero runtime cost). Verified by backdrop-isolation pixel probe (content hidden, screenshot → canvas `getImageData`): teal dev [-1,0,0], cyan [0,0,0], emerald/blend/base/dot all match analytical predictions within ±2, dot-grid delta exactly +10, 14/14 glass still frosted, print hides it, 0 console errors._

## Phase 6 — Motion, QA, verification

- [x] **6.1** Unified easing/duration tokens; retire ad-hoc `ease: [0.25,0.46,0.45,0.94]` literals. _(`src/lib/motion.ts` exports `EASE_STANDARD` + `DURATION` fast/base/slow/emphasis (0.25/0.3/0.35/0.5s); CSS twins `--ease-standard`, `--ease-in-out`, `--duration-*` live in globals `:root`. All 6 framer sites (ui, CropDetails, RecommendationLoader, GrowthTimeline ×2, Dashboard) + the flip-text keyframe now reference tokens. Gotcha: motion vars belong in `:root`, NOT the `@theme inline` block — Tailwind tree-shakes non-namespace vars there (3 of 6 silently vanished from the compiled CSS), and `--ease-in-out` inside `@theme` would hijack the `ease-in-out` utility's value. Verified: all 6 vars resolve at runtime, flip char's animation-timing-function computes to `cubic-bezier(0.6, 0, 0.35, 1)`, 0 console errors. GSAP named eases, lenis scroll duration and toast durations deliberately out of scope.)_
- [x] **6.2** **Contrast audit** — glass over dark with light text is a WCAG AA risk; check every badge/ink-muted token. _(Static token audit 20/20 PASS — all 5 badge tones, ink/ink-secondary/ink-muted on canvas/surface/elevated, accent pairs. Live DOM pixel audit (median composited bg per text box across scrolled viewport segments, glyph pixels filtered): **258/258 page + 33/33 Compare modal, 0 failures, 0 console errors**. Fixes: `--ink-muted` #74706a failed AA (4.00) → final **#9a958c** (two bumps — the aurora lifts real glass bg to ~(31–35, 39–46), beyond the static `--surface` assumption; worst live glass now 4.73); 5 hardcoded Recharts tick/label hexes following the old muted value aligned to the token; radar `PolarRadiusAxis` plot-well ticks → `#bebab2` (5 crops × 0.08 fill washes the well to (71,72,57) — matches the analytical union-alpha ceiling, ratio 4.82 with 7% margin); bare-aurora preset label + Comparison legend text → `ink-secondary` (3.73/4.05 → 5.15/6.27). Audit scripts: `/tmp/opencode/audit-62-{static,live,modal}.js`.)_
- [ ] **6.3** ~~Performance pass~~ **PARKED by user redirect (Phase 7).** — count SVG filters above the fold, `filterResolution`, IntersectionObserver-mount to avoid painting offscreen glass. _(Superseded: Phase 7.3 removed glass from ~12 of ~14 surfaces, so the filter count collapsed to header + a few chips.)_
- [ ] **6.4** ~~Verify~~ **PARKED by user redirect (Phase 7).** — `npx tsc --noEmit`, `npm run lint`, `npm run build`, clean console, 1440/768/390 screenshots vs. baseline, print PDF. _(Baseline screenshots predate the Phase 7 theme flip and are no longer comparable; 7.4 re-ran the parts that still apply.)_

## Phase 7 — Paper-theme pivot _(user redirect, supersedes 6.3–6.4)_

User verdict on the dark build: (1) remove liquid glass **only where unnecessary** (keep it even on small surfaces), (2) replace the backdrop with OpenSourceUI's **Arc Bands**, (3) replace the disliked dark theme with one that suits that backdrop.

- [x] **7.1 Backdrop → Arc Bands.** `AmbientBackdrop` rewritten with OpenSourceUI's MIT `ArcBandsBackground` (© 2026 Bidyut Kundu, full notice kept in-file): warm cream `#FFFCF7 → #FFF8F0` base + sky/teal/amber/rose radial arcs rising from the viewport's bottom edge (sharp band + `blur-2xl` echo + `blur-3xl` white bloom + 4px dot-grid @3%). Kept the plan 4.2 contract: fixed cover, `-z-10`, `pointer-events-none`, `aria-hidden`, `print:hidden`; still fully static (one paint, zero runtime cost). Arcs anchor to the viewport bottom so the glow rides along while scrolling.
- [x] **7.2 Light "retro paper" theme.** `:root` ramp flipped to meet the backdrop base: canvas `#FFFCF7`, warm paper steps `#F6F1E7`/`#ECE5D6`, surface `#FFFFFF`, ink `#1F1D1A` / secondary `#4C4841` / muted `#6E6A62` (AA on cream **and** white), warm hairline borders `#E2DBCB`. Accents deepened for paper: moss `#35602A`, terracotta `#A4552D`, sage/clay/olive print-proven equivalents. `leaf`/`harvest` scales re-issued light-first (50 pale → 700 deep) — every app pairing is pale-bg + deep-text, so the mirror preserves each badge/chip relationship. Shadows re-weighted soft-warm (light wants lift, not black pools). `color-scheme: light`; `dark` class dropped from `<html>` (the `@custom-variant` binding keeps `dark:` rules inert regardless of OS setting); `themeColor → #FFFCF7`. No ThemeProvider exists, so next-themes cannot re-add `.dark`; sonner toast classNames are token-based. Click-spark deepened `#d4b87a → #A97420` (gold was invisible on cream).
- [x] **7.3 Glass reduction — only the necessary/small survives.** Removed: `SectionCard` → solid white paper sheet (the 10+ cards), Dashboard error banner → solid, ComparisonView `GlassModal` → the default `DialogContent` paper shell (**permanently resolves the late-6.2 dialog paint bug** — stash A/B had proven the unpainted dialog was the glass modal shell; dialog now paints with 0 console errors). **Kept:** `GlassBar` sticky header (functional chrome that softens content scrolling beneath) + `GlassChip` preset pills and the Compare/Export action pill (explicitly "keep even if small"). Deleted `GlassPanel.tsx` / `GlassModal.tsx`; `glass.ts` now ships the single locked `chrome` optics preset + `GLASS_SURFACE` marker.
- [x] **7.4 Light color audit.** All hardcoded dark chart hexes re-tuned for white cards: grid `#2A2E33 → #E5DECF` (opacity 0.5–0.6 → 0.9 — pale-on-white vanished otherwise), axis/radius ticks `#6E6A62` → radius ticks `#55514A` (they sit on the radar's green wash: 4.24 → 4.99), tooltips white bg / `#1F1D1A` ink, bar & series fills deepened to ≥3:1 graphics (Input `#8A8078`, Revenue `#7C8A3D`, Net `#35602A`), `COLORS` → moss/terracotta/olive `#35602A/#A4552D/#5D6B34` (recharts paints legend **text** in the series color → 4.5:1 not 3:1). Dropped CropSwitcher's dead `dark:` row; rewrote stale comments (GlassBar→deleted GlassPanel ref, print-palette premise, Providers spark note). **Re-ran the full 6.2 harness on the new theme: static ALL PASS · live 258/258 · modal 33/33 · 0 console errors · 1440 + 390 screenshots + dialog verified visually.** Weather panel grid gained `items-start` (stretched empty white box was only tolerable while glass showed aurora through it).

---

## Dependencies

**New npm:** `@samasante/liquid-glass` · `sonner` · `next-themes` · `lenis` · `gsap` ·
`@paper-design/shaders-react` (heaviest, WebGL) · Radix toggle/tabs/dialog/tooltip/progress _(done)_ ·
`clsx`/`tailwind-merge`/`class-variance-authority` _(done)_.

**External:** crop imagery assets for `hover-img` (Unsplash or `public/`). No API changes.

## Risks

- **HIGH — Heavy glass on ~15 data cards.** Each `<Glass>` spawns an SVG `feDisplacementMap` + 3-pass RGB split. _Mitigation:_ low-cost `optics` preset for cards; `filterResolution={1}`; avoid `live`; IntersectionObserver mount; CSS fallback for constrained devices; FPS before/after in 6.3.
- **HIGH — Glass legibility on charts/tables.** _Mitigation:_ solid inner "data well" behind chart plots while the shell stays glass; enforce AA in 6.2.
- **MEDIUM — Dark-theme long tail.** ~150 light-assuming references. _(handled in 1.4)_
- **MEDIUM — Cross-browser refraction gap.** Live-DOM bending is Chrome/Edge only; Safari/Firefox get frost + tint. _Mitigation:_ tune `optics.frost`.
- **MEDIUM — Two early-stage libraries.** liquid-glass v0.1.1; ObsidianUI copy-and-own. _Mitigation:_ copy source into repo, pin glass version.
- **MEDIUM — New transitive deps** (`gsap`, `lenis`, `@paper-design/shaders-react`). _Mitigation:_ dynamic-import WebGL, gate effects behind `next/dynamic`.

**Estimated complexity:** Phase 0 ~1.5h · 1 ~3h · 2 ~1.5h · 3 ~3h · 4 ~4–5h · 5 ~2–3h · 6 ~2h.
