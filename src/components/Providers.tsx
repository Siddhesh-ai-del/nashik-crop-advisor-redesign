"use client";

import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

/**
 * Client-side provider roots for ObsidianUI primitives:
 * - TooltipProvider — required once globally by Radix tooltip.
 * - Toaster — sonner toast surface (used by Phase 5.2 actions).
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider delayDuration={200}>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast:
              "rounded-lg border border-border bg-surface text-ink shadow-2",
          },
        }}
      />
    </TooltipProvider>
  );
}
