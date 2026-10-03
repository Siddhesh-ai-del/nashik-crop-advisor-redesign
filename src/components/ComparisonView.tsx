"use client";

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
import { GitCompareArrows } from "lucide-react";
import type { CropRecommendation } from "@/lib/types";
import { formatRupees } from "@/lib/constants";
import { SectionCard, SectionTitle, Badge } from "./ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const COLORS = ["#7ba069", "#d98a63", "#a3b573"];

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
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DialogContent
        className="sm:max-w-5xl"
        overlayClassName="bg-ink/30 backdrop-blur-sm"
      >
        <DialogHeader className="gap-1 pr-10 text-left">
          {/* Single hierarchy: display heading → muted subhead (icon inline). */}
          <DialogTitle className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-ink">
            <span className="text-moss" aria-hidden>
              <GitCompareArrows className="h-5 w-5" />
            </span>
            Comparative Analysis
          </DialogTitle>
          <DialogDescription className="text-sm text-ink-muted">
            All recommended crops side by side — financials and suitability.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap items-center gap-2">
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
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2e33" strokeOpacity={0.5} vertical={false} />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11, fill: "#a8a49c", fontFamily: "var(--font-inter)" }}
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#74706a" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) =>
                          v >= 100000 ? `${(v / 100000).toFixed(1)}L` : `${Math.round(v / 1000)}k`
                        }
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid #2a2e33",
                          fontSize: 12,
                          background: "#1c1f22",
                          fontFamily: "var(--font-inter)",
                          color: "#e8e6e1",
                        }}
                        formatter={(value) => formatRupees(Number(value))}
                      />
                      <Legend wrapperStyle={{ fontSize: 12, fontFamily: "var(--font-inter)" }} />
                      <Bar dataKey="Input" fill="#8a8078" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Revenue" fill="#a3b573" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Net Profit" fill="#7ba069" radius={[4, 4, 0, 0]} />
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
                      <PolarGrid stroke="#2a2e33" strokeOpacity={0.6} />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#a8a49c", fontFamily: "var(--font-inter)" }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "#74706a" }} tickCount={5} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid #2a2e33",
                          fontSize: 12,
                          background: "#1c1f22",
                          fontFamily: "var(--font-inter)",
                          color: "#e8e6e1",
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
        </DialogContent>
      </Dialog>
  );
}
