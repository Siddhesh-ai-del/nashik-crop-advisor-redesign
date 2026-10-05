import type { GlassOptics } from "@samasante/liquid-glass";

/**
 * The two LOCKED optics presets (plan 4.3, reduced Phase 7). Phase 7
 * stripped liquid glass from every content surface (cards, banner,
 * modal) — only the small chrome shells keep a lens: the sticky header
 * bar (GlassBar → `GLASS_HEADER`, Phase 7.6 max-refraction pane) and the
 * pill/badge shells (GlassChip → `GLASS_CHROME`, quiet by design so five
 * pills don't shout). No ad-hoc `optics={{...}}` anywhere, so the
 * material stays consistent and the per-surface cost stays auditable.
 *
 * The look is REAL liquid glass, not glassmorphism: the body is near-CLEAR
 * (tint lives in each primitive's low-alpha `bg-*` class, frost is light,
 * the white `brightness` veil is a whisper) and the lens itself does the
 * talking — the rim meniscus (`bend`), chromatic split (`dispersion`) and
 * specular glow are pushed up so the edges bend and light up while the
 * centre stays a flat, undistorted window. On the light paper theme the
 * white veil and glow read as daylight caught in the material.
 *
 * `chrome` — soft 7px frost so content scrolling underneath mutes into a
 * backdrop, stronger rim bend and specular, full 512px map (six chrome
 * surfaces mount the lens: the header bar + the preset/action pills).
 *
 * Stays off the animation path: no `live`, no motion values — the
 * displacement map only re-rasters on resize. The map's APPLICATION is
 * the scroll cost, though: the compositor re-runs the `url()` pass for
 * every glass surface on every scroll frame (~110ms/frame measured in
 * Phase 7.5), so globals.css downgrades `.is-scrolling .glass-surface`
 * to a plain compositor blur and restores the full lens ~150ms after the
 * scroll settles. `mapSize` (not a call-site `filterResolution`, which
 * would eject us out of material mode — see the `isMaterial` gate in the
 * lib) stays the mount-cost lever.
 */
export const GLASS_CHROME: GlassOptics = {
  mapSize: 512,
  depth: 0.55,
  curvature: 0.4,
  dispersion: 0.35,
  strength: 0.055,
  clipToShape: true,
  softEdge: true,
  frost: 7,
  saturate: 1.22,
  brightness: 0.02,
  specular: 1,
  sheenAngle: 45,
  sheenDark: false,
  glow: 0.16,
  glowSpread: 1,
  glowFalloff: 0.5,
  sheen: 0.4,
  sheenWidth: 3,
  sheenFalloff: 1.5,
  splay: 0,
  bend: 0.5,
  bendWidth: 0.16,
};

/**
 * Phase 7.6 — the HEADER lens, maxed for the top bar (user verdict on the
 * chrome preset: "transparent, like glassmorphism — I want real liquid
 * glass there"). The chrome preset was tuned for small pills: near-clear
 * body, subtle rim. The bar wants the opposite — a thick pane you can
 * SEE refracting: depth 0.55→0.9 and curvature 0.4→0.7 so the backdrop
 * visibly compresses toward the rim, strength 0.055→0.14 so displacement
 * actually moves pixels, bend 0.5→0.9 with a wider bendWidth so the
 * meniscus rolls hard at the edge, and dispersion 0.35→0.7 for real
 * chromatic fringing. Frost/saturate/brightness tick up so the material
 * has body instead of reading as a tinted strip.
 *
 * Perf: this surface is exempt from the cost problem, not subject to it —
 * at rest nothing invalidates the filter (metal parked, sparks parked),
 * and `.is-scrolling` swaps the whole `url()` pass for a plain blur while
 * the page moves (see globals.css). So the expensive lens only ever runs
 * on a still page. The header ALSO needs backdrop structure to bend:
 * AmbientBackdrop's top-edge echo band exists for exactly this — over
 * flat cream a perfect lens still looks like nothing.
 */
export const GLASS_HEADER: GlassOptics = {
  mapSize: 1024,
  depth: 0.9,
  curvature: 0.75,
  dispersion: 0.8,
  strength: 0.18,
  clipToShape: true,
  softEdge: true,
  frost: 8,
  saturate: 1.35,
  brightness: 0.05,
  specular: 1,
  sheenAngle: 45,
  sheenDark: false,
  glow: 0.2,
  glowSpread: 1,
  glowFalloff: 0.5,
  sheen: 0.4,
  sheenWidth: 3,
  sheenFalloff: 1.5,
  splay: 0,
  bend: 0.9,
  bendWidth: 0.22,
};

/** Marker class every glass wrapper carries: `@media print` suppression and
 *  the `prefers-reduced-motion` guard in globals.css key off this. */
export const GLASS_SURFACE = "glass-surface";
