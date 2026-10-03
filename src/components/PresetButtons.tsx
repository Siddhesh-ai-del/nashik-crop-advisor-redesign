"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Crop, FlaskConical, Wheat, Wine } from "lucide-react";
import type { ComponentType } from "react";
import type { RecommendationRequest } from "@/lib/types";
import { PRESETS } from "@/lib/constants";
import { cn } from "@/lib/cn";

const PRESET_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "igatpuri-paddy": Wheat,
  "niphad-grapes-onion": Wine,
  "malegaon-bajra-pomegranate": Crop,
  "sinnar-summer-pulses": FlaskConical,
};

export function PresetButtons({
  params,
  onApply,
}: {
  params: RecommendationRequest;
  onApply: (next: RecommendationRequest) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
        One-click sample presets
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PRESETS.map((preset) => {
          const Icon = PRESET_ICONS[preset.id] ?? Crop;
          const active =
            params.region === preset.region &&
            params.season === preset.season &&
            params.soil === preset.soil &&
            params.water === preset.water;
          return (
            <motion.button
              key={preset.id}
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                onApply({
                  region: preset.region,
                  season: preset.season,
                  soil: preset.soil,
                  water: preset.water,
                })
              }
              className={cn(
                "group flex flex-col rounded-[16px] border p-4 text-left transition-all duration-300",
                active
                  ? "border-moss/40 bg-moss-light/60 shadow-[0_2px_12px_rgba(90,122,77,0.1)]"
                  : "border-border/50 bg-surface/60 hover:border-moss/25 hover:bg-moss-light/30 hover:shadow-[0_2px_8px_rgba(90,122,77,0.06)]",
              )}
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-[10px] transition-all duration-300",
                    active
                      ? "bg-moss text-white shadow-[0_2px_6px_rgba(90,122,77,0.25)]"
                      : "bg-moss-light text-moss ring-1 ring-moss/10",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </div>
                <ArrowUpRight
                  className={cn(
                    "h-3.5 w-3.5 text-border transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-moss",
                    active && "text-moss",
                  )}
                  aria-hidden
                />
              </div>
              <span
                className={cn(
                  "mt-3 block text-sm font-semibold leading-tight",
                  active ? "text-moss-deep" : "text-ink",
                )}
              >
                {preset.label}
              </span>
              <span className="mt-1 block text-[11px] leading-snug text-ink-secondary">
                {preset.description}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
