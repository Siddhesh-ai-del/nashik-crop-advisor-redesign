import {
  Droplets,
  Leaf,
  MapPin,
  Sprout,
  ThermometerSun,
  Wind,
} from "lucide-react";
import type { RecommendationRequest, WeatherResponse } from "@/lib/types";
import { REGIONS, SEASONS } from "@/lib/constants";
import { GlassBar } from "./glass/GlassBar";

export function Header({
  params,
  weather,
}: {
  params: RecommendationRequest;
  weather: WeatherResponse | null;
}) {
  const region = REGIONS[params.region];
  const season = SEASONS[params.season];

  return (
    /* Chrome bar (plan 4.4): sticky from lg up (mobile header is tall —
       sticky would eat the viewport), z-40 keeps it under dialogs (z-50). */
    <header className="z-40 print-hide lg:sticky lg:top-0">
      <GlassBar className="border-0 border-b border-b-border/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Single hierarchy: display heading → muted subhead (brand icon inline). */}
          <div className="flex items-start gap-3">
            <span className="mt-1 text-moss" aria-hidden>
              <Sprout className="h-7 w-7" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-display text-h2 font-bold text-ink">
                  Nashik Crop Advisor
                </h1>
                <span className="rounded-full bg-moss-light px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-moss-deep ring-1 ring-inset ring-moss/10">
                  District Agro-Advisory
                </span>
              </div>
              <p className="mt-0.5 text-sm text-ink-muted">
                Hyper-local crop science, weather & farm economics
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2.5 rounded-md border border-border/50 bg-surface/60 px-3.5 py-2.5">
              <MapPin className="h-4 w-4 text-moss" aria-hidden />
              <div className="text-xs">
                <p className="font-semibold text-ink">{region.shortName}</p>
                <p className="text-ink-secondary">{region.tehsils}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-md border border-border/50 bg-surface/60 px-3.5 py-2.5">
              <Leaf className="h-4 w-4 text-moss" aria-hidden />
              <div className="text-xs">
                <p className="font-semibold text-ink">{season.name} season</p>
                <p className="text-ink-secondary">{season.window}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <div className="rounded-md border border-border/50 bg-surface/60 px-3 py-2 text-center">
                <ThermometerSun
                  className="mx-auto mb-1 h-4 w-4 text-terracotta"
                  aria-hidden
                />
                <p className="text-sm font-bold text-ink">
                  {weather
                    ? `${Math.round(weather.current.temperature)}°`
                    : "—"}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-ink-muted">
                  Now
                </p>
              </div>
              <div className="rounded-md border border-border/50 bg-surface/60 px-3 py-2 text-center">
                <Droplets
                  className="mx-auto mb-1 h-4 w-4 text-sage"
                  aria-hidden
                />
                <p className="text-sm font-bold text-ink">
                  {weather ? `${Math.round(weather.current.humidity)}%` : "—"}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-ink-muted">
                  Humidity
                </p>
              </div>
              <div className="rounded-md border border-border/50 bg-surface/60 px-3 py-2 text-center">
                <Wind
                  className="mx-auto mb-1 h-4 w-4 text-ink-muted"
                  aria-hidden
                />
                <p className="text-sm font-bold text-ink">
                  {weather ? `${Math.round(weather.current.windSpeed)}` : "—"}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-ink-muted">
                  km/h
                </p>
              </div>
            </div>
          </div>
        </div>
      </GlassBar>
    </header>
  );
}
