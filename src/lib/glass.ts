import type { GlassOptics } from "@samasante/liquid-glass";

/**
 * Two LOCKED optics presets (plan 4.3). Every glass surface in the app must
 * use one of these — no ad-hoc `optics={{...}}` anywhere, so the material
 * stays consistent and the per-card cost is auditable (plan 6.3).
 *
 * `panel` — data cards (10+ instances). Legibility-first: gentle curvature
 * gated behind a thin `depth` so card CENTRES stay optically flat (charts
 * and tables must not warp), refraction concentrated in the rim, modest
 * frost, and a 256px displacement map to halve raster cost per card.
 *
 * `chrome` — the few large surfaces (header bar, modal). More presence:
 * heavier frost for legibility over scrolling content, stronger rim bend
 * and specular, full 512px map (only 1–2 mounted at a time).
 *
 * Both stay off the animation path: no `live`, no motion values — the
 * displacement map only re-rasters on resize, and `mapSize` (not a call-site
 * `filterResolution`, which would eject us out of material mode — see the
 * `isMaterial` gate in the lib) is the cost lever.
 */
export const GLASS_PANEL: GlassOptics = {
  mapSize: 256,
  depth: 0.3,
  curvature: 0.35,
  dispersion: 0.16,
  strength: 0.045,
  clipToShape: true,
  softEdge: true,
  frost: 6,
  saturate: 1.12,
  brightness: 0.05,
  specular: 0.8,
  sheenAngle: 45,
  sheenDark: false,
  glow: 0.1,
  glowSpread: 1,
  glowFalloff: 0.5,
  sheen: 0.3,
  sheenWidth: 2.5,
  sheenFalloff: 1.5,
  splay: 0,
  bend: 0.18,
  bendWidth: 0.14,
};

export const GLASS_CHROME: GlassOptics = {
  mapSize: 512,
  depth: 0.55,
  curvature: 0.4,
  dispersion: 0.3,
  strength: 0.055,
  clipToShape: true,
  softEdge: true,
  frost: 14,
  saturate: 1.15,
  brightness: 0.04,
  specular: 1,
  sheenAngle: 45,
  sheenDark: false,
  glow: 0.12,
  glowSpread: 1,
  glowFalloff: 0.5,
  sheen: 0.35,
  sheenWidth: 3,
  sheenFalloff: 1.5,
  splay: 0,
  bend: 0.4,
  bendWidth: 0.16,
};

/** Marker class every glass wrapper carries: `@media print` suppression and
 *  the `prefers-reduced-motion` guard in globals.css key off this. */
export const GLASS_SURFACE = "glass-surface";
