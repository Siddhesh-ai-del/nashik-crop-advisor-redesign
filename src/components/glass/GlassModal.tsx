"use client";

import type { ReactNode } from "react";
import { Glass } from "@samasante/liquid-glass";
import { cn } from "@/lib/cn";
import { GLASS_CHROME, GLASS_SURFACE } from "@/lib/glass";

/**
 * GlassModal — the large overlay shell (plan 4.3 / 4.4): ComparisonView.
 * Locked `chrome` optics with heavier frost so the dimmed page underneath
 * stays a backdrop, not a distraction behind the dialog content.
 *
 * Print: the dialog never reaches paper (PrintSummary + `print-hide`
 * chrome); `.glass-surface` rules in globals.css neutralise the lens
 * as a second line of defence.
 */
export function GlassModal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Glass
      optics={GLASS_CHROME}
      /* See GlassPanel — callers lay this shell out with `grid`/`block`
         classes, so the inline inline-block default must not win. */
      style={{ display: undefined }}
      className={cn(
        GLASS_SURFACE,
        "rounded-xl border border-border/50 bg-surface/90 shadow-3",
        className,
      )}
    >
      {children}
    </Glass>
  );
}
