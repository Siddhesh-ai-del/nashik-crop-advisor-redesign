"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  FlaskConical,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useRecommendation } from "@/hooks/useRecommendation";
import type { CropTier } from "@/lib/types";
import { REGIONS } from "@/lib/constants";
import { Header } from "./Header";
import { PresetButtons } from "./PresetButtons";
import { ParameterPanel } from "./ParameterPanel";
import { WeatherWidget } from "./WeatherWidget";
import { CropSwitcher } from "./CropSwitcher";
import { CropDetails } from "./CropDetails";
import { ComparisonView } from "./ComparisonView";
import { ExportButton } from "./ExportButton";
import { PrintSummary } from "./PrintSummary";
import { FadeIn, SectionCard, Skeleton } from "./ui";

export function Dashboard() {
  const {
    params,
    recommendation,
    weather,
    loadingRecommendation,
    loadingWeather,
    error,
    setParam,
    setParams,
    retry,
  } = useRecommendation();

  const [activeTier, setActiveTier] = useState<CropTier>("primary");
  const [compareOpen, setCompareOpen] = useState(false);

  const crops = recommendation?.crops ?? [];
  const activeCrop = crops.find((c) => c.tier === activeTier) ?? crops[0];

  return (
    <main className="pb-20 print:p-0">
      <PrintSummary
        params={params}
        crops={crops}
        generatedAt={recommendation?.generatedAt ?? ""}
        source={recommendation?.source ?? "fallback"}
      />

      <Header params={params} weather={weather} />

      <div className="mx-auto max-w-7xl space-y-7 px-5 py-8 sm:px-6 print:p-0">
        {error ? (
          <div className="flex items-start justify-between gap-3 rounded-lg border border-terracotta/20 bg-terracotta-light/60 p-4 print-hide">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-ink">
                  A network error occurred
                </p>
                <p className="mt-0.5 text-xs text-ink-secondary">{error}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={retry}
              className="shrink-0 rounded-sm border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-ink-secondary transition-all hover:border-moss/30 hover:bg-moss-light hover:text-moss-deep"
            >
              Retry
            </button>
          </div>
        ) : null}

        <FadeIn delay={0.05}>
          <PresetButtons params={params} onApply={setParams} />
        </FadeIn>

        <div className="grid grid-cols-1 gap-7 xl:grid-cols-[400px_1fr]">
          <FadeIn delay={0.1}>
            <div className="space-y-7">
              <ParameterPanel params={params} onChange={setParam} />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <WeatherWidget
              region={params.region}
              weather={weather}
              loading={loadingWeather}
              onRefresh={retry}
            />
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <SectionCard className="overflow-hidden print-break">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 bg-canvas-warm/50 px-6 py-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-moss text-white shadow-2">
                  <Trophy className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h2 className="font-display text-h3 font-bold text-ink">
                    Crop Recommendations
                  </h2>
                  <p className="text-xs text-ink-secondary">
                    {REGIONS[params.region].name} ·{" "}
                    {recommendation
                      ? `${crops.length} ranked options · ${
                          recommendation.source === "ai" ? "Gemini AI engine" : "Scientific dataset"
                        }`
                      : "Ranked for your field parameters"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 print-hide">
                {recommendation?.source === "ai" ? (
                  <span className="flex items-center gap-1 rounded-full bg-moss-light px-2.5 py-1 text-[11px] font-semibold text-moss-deep ring-1 ring-inset ring-moss/10">
                    <Sparkles className="h-3 w-3" aria-hidden />
                    AI generated
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-sage-light px-2.5 py-1 text-[11px] font-semibold text-olive ring-1 ring-inset ring-sage/10">
                    <FlaskConical className="h-3 w-3" aria-hidden />
                    Offline fallback
                  </span>
                )}
                {recommendation && crops.length >= 2 ? (
                  <button
                    type="button"
                    onClick={() => setCompareOpen(true)}
                    className="rounded-md border border-border/60 bg-surface/80 px-3.5 py-2.5 text-sm font-semibold text-ink-secondary transition-all hover:border-moss/30 hover:bg-moss-light/50 hover:text-moss-deep"
                  >
                    Compare all ({crops.length})
                  </button>
                ) : null}
                <ExportButton />
              </div>
            </div>

            <div className="space-y-6 p-6">
              {loadingRecommendation ? (
                <div className="space-y-6">
                  <div className="flex gap-2.5">
                    <Skeleton className="h-12 w-56 rounded-lg" />
                    <Skeleton className="h-12 w-56 rounded-lg" />
                    <Skeleton className="hidden h-12 w-56 rounded-lg lg:block" />
                  </div>
                  <Skeleton className="h-28 w-full" />
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                  </div>
                </div>
              ) : activeCrop ? (
                <>
                  <CropSwitcher
                    crops={crops}
                    activeTier={activeCrop.tier}
                    onChange={setActiveTier}
                  />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCrop.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <CropDetails crop={activeCrop} activeTier={activeCrop.tier} />
                    </motion.div>
                  </AnimatePresence>
                </>
              ) : null}
            </div>
          </SectionCard>
        </FadeIn>
      </div>

      <ComparisonView crops={crops} open={compareOpen} onClose={() => setCompareOpen(false)} />
    </main>
  );
}
