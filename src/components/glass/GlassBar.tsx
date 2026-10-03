"use client";

import type { ReactNode } from "react";
import { Glass } from "@samasante/liquid-glass";
import { cn } from "@/lib/cn";
import { GLASS_CHROME, GLASS_SURFACE } from "@/lib/glass";

/**
 * GlassBar — the sticky chrome shell (plan 4.3 / 4.4): header, floating
 * action bars. Uses the locked `chrome` optics — heavier frost so content
 * scrolling underneath never bleeds through the bar.
 *
 * Print: suppressed via `.glass-surface` rules in globals.css (the header
 * itself also carries `print-hide`).
 */
export function GlassBar({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Glass
      optics={GLASS_CHROME}
      /* See GlassPanel — drop the inline inline-block default so the bar
         lays out as a normal block (full width of its sticky wrapper). */
      style={{ display: undefined }}
      className={cn(
        GLASS_SURFACE,
        "border border-border/50 bg-canvas/75 shadow-1",
        className,
      )}
    >
      {children}
    </Glass>
  );
}
