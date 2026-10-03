"use client";

import { AnimatePresence, motion } from "motion/react";
import { Lightbulb, MessageSquareText, Target } from "lucide-react";
import type { CropRecommendation, CropTier } from "@/lib/types";
import { Badge } from "./ui";
import { MetricPills } from "./MetricPills";
import { RadarChartCard } from "./RadarChartCard";
import { FinancialCard } from "./FinancialCard";
import { PestDiseaseCard } from "./PestDiseaseCard";
import { WaterCurveCard } from "./WaterCurveCard";
import { GrowthTimeline } from "./GrowthTimeline";

const TIER_BADGE: Record<CropTier, "moss" | "harvest" | "sage"> = {
  primary: "moss",
  secondary: "harvest",
  alternative: "sage",
};

export function CropDetails({
  crop,
  activeTier,
}: {
  crop: CropRecommendation;
  activeTier: CropTier;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={crop.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="space-y-6"
      >
        <div className="rounded-lg border border-border/40 bg-surface/70 p-6 shadow-1 print-break">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold tracking-tight text-ink">
                  {crop.crop}
                </h2>
                <Badge tone={TIER_BADGE[activeTier]}>{crop.tag}</Badge>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-secondary">
                {crop.reason}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-start gap-3.5 rounded-lg border border-moss/15 bg-moss-light/40 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-moss-light text-moss">
                <Lightbulb className="h-4 w-4" aria-hidden />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-moss-deep">
                  Advisor tip
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink">
                  {crop.advisorTip}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5 rounded-lg border border-border/30 bg-canvas-warm/40 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-clay-light text-ink-secondary">
                <Target className="h-4 w-4" aria-hidden />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
                  Market demand
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink">
                  {crop.marketDemand}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5 rounded-lg border border-border/30 bg-canvas-warm/40 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-clay-light text-ink-secondary">
                <MessageSquareText className="h-4 w-4" aria-hidden />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
                  Water requirement
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink">
                  {crop.waterRequirement}
                </p>
              </div>
            </div>
          </div>
        </div>

        <MetricPills crop={crop} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RadarChartCard crop={crop} />
          <FinancialCard crop={crop} />
          <PestDiseaseCard crop={crop} />
          <WaterCurveCard crop={crop} />
        </div>

        <GrowthTimeline crop={crop} />
      </motion.div>
    </AnimatePresence>
  );
}
