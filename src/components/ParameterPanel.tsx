"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  CloudSun,
  Droplets,
  Leaf,
  MapPin,
} from "lucide-react";
import type {
  RecommendationRequest,
  RegionKey,
  SeasonKey,
  SoilKey,
  WaterKey,
} from "@/lib/types";
import { REGIONS, SEASONS, SOILS, WATER_LEVELS } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { SectionCard } from "./ui";

interface OptionMeta {
  key: string;
  label: string;
  sub: string;
}

function OptionGrid({
  label,
  icon,
  options,
  value,
  onSelect,
}: {
  label: string;
  icon: React.ReactNode;
  options: OptionMeta[];
  value: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
        {icon}
        {label}
      </p>
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
        {options.map((opt) => {
          const active = opt.key === value;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSelect(opt.key)}
              aria-pressed={active}
              className={cn(
                "relative rounded-md border px-3 py-2.5 text-left transition-all duration-300",
                active
                  ? "border-moss/40 bg-moss-light/70 shadow-1"
                  : "border-border/40 bg-surface/50 hover:border-moss/20 hover:bg-moss-light/20",
              )}
            >
              {active ? (
                <motion.span
                  layoutId={`dot-${label}`}
                  className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-moss shadow-glow"
                />
              ) : null}
              <span
                className={cn(
                  "block text-sm font-semibold",
                  active ? "text-moss-deep" : "text-ink",
                )}
              >
                {opt.label}
              </span>
              <span className="mt-0.5 block text-[11px] leading-snug text-ink-secondary">
                {opt.sub}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ParameterPanel({
  params,
  onChange,
}: {
  params: RecommendationRequest;
  onChange: <K extends keyof RecommendationRequest>(
    key: K,
    value: RecommendationRequest[K],
  ) => void;
}) {
  const regionOptions = Object.values(REGIONS).map((r) => ({
    key: r.key,
    label: r.shortName.split(" / ")[0],
    sub: r.climate.split(",")[0],
  }));

  const seasonOptions = Object.values(SEASONS).map((s) => ({
    key: s.key,
    label: s.name,
    sub: s.window,
  }));

  const soilOptions = Object.values(SOILS).map((s) => ({
    key: s.key,
    label: s.name,
    sub: s.traits.split(" — ")[1] ?? s.traits,
  }));

  const waterOptions = Object.values(WATER_LEVELS).map((w) => ({
    key: w.key,
    label: w.name,
    sub: w.traits,
  }));

  return (
    <SectionCard className="p-6 print-hide">
      <div className="flex items-start gap-3.5">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-moss-light text-moss ring-1 ring-moss/10">
          <MapPin className="h-4.5 w-4.5" aria-hidden />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-source-serif)] text-base font-semibold tracking-tight text-ink">
            Field Parameters
          </h2>
          <p className="mt-0.5 text-sm text-ink-secondary">
            Set the micro-region, season, soil and water availability for your
            plot.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <OptionGrid
          label="Micro-Region"
          icon={<MapPin className="h-3.5 w-3.5" aria-hidden />}
          options={regionOptions}
          value={params.region}
          onSelect={(v) => onChange("region", v as RegionKey)}
        />
        <OptionGrid
          label="Season"
          icon={<CloudSun className="h-3.5 w-3.5" aria-hidden />}
          options={seasonOptions}
          value={params.season}
          onSelect={(v) => onChange("season", v as SeasonKey)}
        />
        <OptionGrid
          label="Soil Type"
          icon={<Leaf className="h-3.5 w-3.5" aria-hidden />}
          options={soilOptions}
          value={params.soil}
          onSelect={(v) => onChange("soil", v as SoilKey)}
        />
        <OptionGrid
          label="Water Availability"
          icon={<Droplets className="h-3.5 w-3.5" aria-hidden />}
          options={waterOptions}
          value={params.water}
          onSelect={(v) => onChange("water", v as WaterKey)}
        />
      </div>

      <div className="mt-5 border-t border-border/30 pt-3.5 text-[11px] text-ink-muted">
        <AnimatePresence mode="wait">
          <motion.p
            key={params.region}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="line-clamp-1"
          >
            {REGIONS[params.region].monsoonRainfall} monsoon ·{" "}
            {REGIONS[params.region].soil}
          </motion.p>
        </AnimatePresence>
      </div>
    </SectionCard>
  );
}
