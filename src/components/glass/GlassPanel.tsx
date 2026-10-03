"use client";

import type { ReactNode } from "react";
import { Glass } from "@samasante/liquid-glass";
import { cn } from "@/lib/cn";
import { GLASS_PANEL, GLASS_SURFACE } from "@/lib/glass";

/**
 * GlassPanel — the card-shaped glass shell (plan 4.3 / 4.5).
 *
 * Uses the locked `panel` optics: refraction lives in the rim so card
 * centres stay flat and charts/tables never warp. Children render crisp
 * (the lens frosts what's BEHIND the panel, it never filters content).
 *
 * Print: `.glass-surface` is neutralised in `@media print` (globals.css)
 * so cards print as solid surfaces — the lens is decoration only.
 */
export function GlassPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Glass
      optics={GLASS_PANEL}
      /* Material mode defaults to `display:inline-block` (pill shrink-wrap)
         as an INLINE style, which would beat every Tailwind display class
         (`flex`, `grid`, plain `block`) callers pass via className.
         `display: undefined` drops the inline declaration so the caller's
         class decides; a card with no display class stays a plain block. */
      style={{ display: undefined }}
      className={cn(
        GLASS_SURFACE,
        "rounded-xl border border-border/50 bg-surface/85 shadow-1 print-break",
        className,
      )}
    >
      {children}
    </Glass>
  );
}
