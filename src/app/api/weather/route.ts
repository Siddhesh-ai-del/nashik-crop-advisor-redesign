import { NextRequest, NextResponse } from "next/server";
import type { RegionKey } from "@/lib/types";
import { REGIONS } from "@/lib/constants";
import {
  buildWeatherUrl,
  buildFallbackResponse,
  mapWeatherResponse,
  type OpenMeteoResponse,
} from "@/lib/weather-utils";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region") as RegionKey | null;

  if (!region || !REGIONS[region]) {
    return NextResponse.json(
      { error: "A valid 'region' query parameter is required." },
      { status: 400 },
    );
  }

  try {
    const url = buildWeatherUrl(region);
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      return NextResponse.json(buildFallbackResponse(region), { status: 200 });
    }

    const raw = (await res.json()) as OpenMeteoResponse;
    return NextResponse.json(mapWeatherResponse(region, raw));
  } catch {
    return NextResponse.json(buildFallbackResponse(region), { status: 200 });
  }
}