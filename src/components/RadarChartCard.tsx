"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { RadarIcon } from "lucide-react";
import type { CropRecommendation } from "@/lib/types";
import { SectionCard, SectionTitle } from "./ui";

const METRIC_LABELS: { key: keyof CropRecommendation["radarMetrics"]; label: string }[] = [
  { key: "yieldPotential", label: "Yield Potential" },
  { key: "marketValue", label: "Market Value" },
  { key: "waterEfficiency", label: "Water Efficiency" },
  { key: "soilCompatibility", label: "Soil Compatibility" },
  { key: "climateResilience", label: "Climate Resilience" },
];

export function RadarChartCard({ crop }: { crop: CropRecommendation }) {
  const data = METRIC_LABELS.map((m) => ({
    subject: m.label,
    value: crop.radarMetrics[m.key],
    fullMark: 100,
  }));

  return (
    <SectionCard className="p-6">
      <SectionTitle
        icon={<RadarIcon className="h-4 w-4" aria-hidden />}
        title="5-Axis Suitability Assessment"
        subtitle="Multi-metric rating (0–100) of this crop against your field parameters."
      />
      <div className="mt-3 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
            <PolarGrid stroke="#d4c9b8" strokeOpacity={0.6} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontSize: 11, fill: "#6b5e50", fontFamily: "var(--font-inter)" }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "#8a7d6f" }}
              tickCount={5}
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
              formatter={(value) => [`${value} / 100`, "Rating"]}
            />
            <Radar
              name="Rating"
              dataKey="value"
              stroke="#5a7a4d"
              strokeWidth={2}
              fill="#5a7a4d"
              fillOpacity={0.18}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
