"use client";

import { motion } from "motion/react";
import { Award, Leaf, ShieldCheck } from "lucide-react";
import type { ComponentType } from "react";
import type { CropRecommendation, CropTier } from "@/lib/types";
import { cn } from "@/lib/cn";

const TIER_META: Record<
  CropTier,
  { label: string; icon: ComponentType<{ className?: string }> }
> = {
  primary: { label: "Primary", icon: Award },
  secondary: { label: "Secondary", icon: Leaf },
  alternative: { label: "Alternative", icon: ShieldCheck },
};

export function CropSwitcher({
  crops,
  activeTier,
  onChange,
}: {
  crops: CropRecommendation[];
  activeTier: CropTier;
  onChange: (tier: CropTier) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Crop options">
      {crops.map((crop) => {
        const meta = TIER_META[crop.tier];
        const Icon = meta.icon;
        const active = crop.tier === activeTier;
        return (
          <button
            key={crop.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(crop.tier)}
            className={cn(
              "relative flex min-w-0 items-center gap-2.5 rounded-[14px] border px-4 py-3 text-left transition-all duration-300",
              active
                ? "border-moss/40 bg-moss text-white shadow-[0_2px_12px_rgba(90,122,77,0.2)]"
                : "border-border/40 bg-surface/60 text-ink-secondary hover:border-moss/20 hover:bg-moss-light/30",
            )}
          >
            <Icon
              className={cn("h-4 w-4 shrink-0", active ? "text-white/90" : "text-moss")}
              aria-hidden
            />
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold leading-tight">
                {crop.crop}
              </span>
              <span
                className={cn(
                  "block text-[11px] leading-tight",
                  active ? "text-white/70" : "text-ink-muted",
                )}
              >
                {meta.label}
              </span>
            </span>
            {active ? (
              <motion.span
                layoutId="crop-tab-indicator"
                className="absolute -bottom-px left-4 right-4 h-0.5 rounded-full bg-clay"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
