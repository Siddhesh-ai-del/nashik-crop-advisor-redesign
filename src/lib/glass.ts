import type { GlassOptics } from "@samasante/liquid-glass";

/**
 * The one LOCKED optics preset (plan 4.3, reduced Phase 7). Phase 7
 * stripped liquid glass from every content surface (cards, banner,
 * modal) — only the small chrome shells keep the lens: the sticky header
 * bar (GlassBar) and the pill/badge shells (GlassChip). No ad-hoc
 * `optics={{...}}` anywhere, so the material stays consistent and the
 * per-surface cost stays auditable.
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
 * backdrop, stronger rim bend and specular, full 512px map (only 1–2
 * surfaces mounted with the lens at a time).
 *
 * Stays off the animation path: no `live`, no motion values — the
 * displacement map only re-rasters on resize, and `mapSize` (not a call-site
 * `filterResolution`, which would eject us out of material mode — see the
 * `isMaterial` gate in the lib) is the cost lever.
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

/** Marker class every glass wrapper carries: `@media print` suppression and
 *  the `prefers-reduced-motion` guard in globals.css key off this. */
export const GLASS_SURFACE = "glass-surface";
