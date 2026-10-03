"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GitCompareArrows, X } from "lucide-react";
import type { CropRecommendation } from "@/lib/types";
import { formatRupees } from "@/lib/constants";
import { SectionCard, SectionTitle, Badge } from "./ui";

const COLORS = ["#5a7a4d", "#c4704b", "#7a8a5c"];

const METRIC_KEYS: { key: keyof CropRecommendation["radarMetrics"]; label: string }[] = [
  { key: "yieldPotential", label: "Yield" },
  { key: "marketValue", label: "Market" },
  { key: "waterEfficiency", label: "Water" },
  { key: "soilCompatibility", label: "Soil" },
  { key: "climateResilience", label: "Climate" },
];

export function ComparisonView({
  crops,
  open,
  onClose,
}: {
  crops: CropRecommendation[];
  open: boolean;
  onClose: () => void;
}) {
  const financialData = crops.map((c) => ({
    name: c.crop.split(" (")[0],
    Input: c.financials.inputCostPerAcre,
    Revenue: c.financials.grossRevenuePerAcre,
    "Net Profit": c.financials.netProfitPerAcre,
  }));

  const radarData = METRIC_KEYS.map((m) => {
    const entry: Record<string, string | number> = { subject: m.label };
    crops.forEach((c) => {
      entry[c.crop.split(" (")[0]] = c.radarMetrics[m.key];
    });
    return entry;
  });

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/30 p-4 backdrop-blur-sm sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 24, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl rounded-[20px] bg-canvas p-6 shadow-[0_8px_40px_rgba(61,43,31,0.12)]"
            role="dialog"
            aria-modal="true"
            aria-label="Comparative crop analysis"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-moss-light text-moss ring-1 ring-moss/10">
                  <GitCompareArrows className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-source-serif)] text-lg font-bold tracking-tight text-ink">
                    Comparative Analysis
                  </h2>
                  <p className="text-sm text-ink-secondary">
                    All recommended crops side by side — financials and
                    suitability.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-border/50 text-ink-muted transition-all hover:border-border hover:bg-surface hover:text-ink"
                aria-label="Close comparison"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              {crops.map((c, i) => (
                <Badge key={c.id} tone={i === 0 ? "moss" : i === 1 ? "harvest" : "sage"}>
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />
                  {c.crop}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <SectionCard className="p-5">
                <SectionTitle
                  title="Financial ROI (per acre)"
                  subtitle="Input cost, gross revenue and net profit (₹)"
                />
                <div className="mt-3 h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={financialData}
                      margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
                      barSize={14}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#d4c9b8" strokeOpacity={0.5} vertical={false} />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11, fill: "#6b5e50", fontFamily: "var(--font-inter)" }}
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#8a7d6f" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) =>
                          v >= 100000 ? `${(v / 100000).toFixed(1)}L` : `${Math.round(v / 1000)}k`
                        }
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid #d4c9b8",
                          fontSize: 12,
                          background: "#faf7f2",
                          fontFamily: "var(--font-inter)",
                          color: "#3d2b1f",
                        }}
                        formatter={(value) => formatRupees(Number(value))}
                      />
                      <Legend wrapperStyle={{ fontSize: 12, fontFamily: "var(--font-inter)" }} />
                      <Bar dataKey="Input" fill="#b8a99a" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Revenue" fill="#7a8a5c" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Net Profit" fill="#5a7a4d" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </SectionCard>

              <SectionCard className="p-5">
                <SectionTitle
                  title="Suitability Radar Overlay"
                  subtitle="5-axis metric comparison (0–100)"
                />
                <div className="mt-3 h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                      <PolarGrid stroke="#d4c9b8" strokeOpacity={0.6} />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#6b5e50", fontFamily: "var(--font-inter)" }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "#8a7d6f" }} tickCount={5} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid #d4c9b8",
                          fontSize: 12,
                          background: "#faf7f2",
                          fontFamily: "var(--font-inter)",
                          color: "#3d2b1f",
                        }}
                        formatter={(value, name) => [`${value} / 100`, name]}
                      />
                      <Legend wrapperStyle={{ fontSize: 12, fontFamily: "var(--font-inter)" }} />
                      {crops.map((c, i) => (
                        <Radar
                          key={c.id}
                          name={c.crop.split(" (")[0]}
                          dataKey={c.crop.split(" (")[0]}
                          stroke={COLORS[i]}
                          fill={COLORS[i]}
                          fillOpacity={0.08}
                          strokeWidth={2}
                        />
                      ))}
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </SectionCard>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
