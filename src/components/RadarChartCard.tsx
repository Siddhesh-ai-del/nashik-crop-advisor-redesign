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

const METRIC_LABELS: {
  key: keyof CropRecommendation["radarMetrics"];
  label: string;
}[] = [
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
            <PolarGrid stroke="#2a2e33" strokeOpacity={0.6} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fontSize: 11,
                fill: "#a8a49c",
                fontFamily: "var(--font-inter)",
              }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "#bebab2" }}
              tickCount={5}
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
              formatter={(value) => [`${value} / 100`, "Rating"]}
            />
            <Radar
              name="Rating"
              dataKey="value"
              stroke="#7ba069"
              strokeWidth={2}
              fill="#7ba069"
              fillOpacity={0.18}
              dot={{ r: 3, fill: "#7ba069", stroke: "#1c1f22", strokeWidth: 2 }}
              activeDot={{
                r: 5,
                fill: "#9ec48c",
                stroke: "#0a0b0c",
                strokeWidth: 2,
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
