"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  RecommendationRequest,
  RecommendationResponse,
  RegionKey,
  SeasonKey,
  SoilKey,
  WeatherResponse,
  WaterKey,
} from "@/lib/types";

export interface RecommendationState {
  params: RecommendationRequest;
  recommendation: RecommendationResponse | null;
  weather: WeatherResponse | null;
  loadingRecommendation: boolean;
  loadingWeather: boolean;
  error: string | null;
  setParam: <K extends keyof RecommendationRequest>(
    key: K,
    value: RecommendationRequest[K],
  ) => void;
  setParams: (next: RecommendationRequest) => void;
  retry: () => void;
}

export function useRecommendation(): RecommendationState {
  const [params, setParamsState] = useState<RecommendationRequest>({
    region: "central",
    season: "rabi",
    soil: "black",
    water: "high",
  });
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loadingRecommendation, setLoadingRecommendation] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const recAbortRef = useRef<AbortController | null>(null);
  const weatherAbortRef = useRef<AbortController | null>(null);
  const paramsRef = useRef(params);

  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  const setParam = useCallback(
    <K extends keyof RecommendationRequest>(key: K, value: RecommendationRequest[K]) => {
      setParamsState((prev) => ({ ...prev, [key]: value }));
      setLoadingRecommendation(true);
      if (key === "region") setLoadingWeather(true);
    },
    [],
  );

  const setParams = useCallback((next: RecommendationRequest) => {
    const prevRegion = paramsRef.current.region;
    setParamsState(next);
    setLoadingRecommendation(true);
    if (next.region !== prevRegion) setLoadingWeather(true);
  }, []);

  const retry = useCallback(() => {
    setLoadingRecommendation(true);
    setLoadingWeather(true);
    setRetryKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    recAbortRef.current?.abort();
    recAbortRef.current = controller;

    fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json() as Promise<RecommendationResponse>;
      })
      .then((data) => {
        if (!controller.signal.aborted) {
          setRecommendation(data);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Unable to load recommendations.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingRecommendation(false);
      });

    return () => controller.abort();
  }, [params, retryKey]);

  useEffect(() => {
    const controller = new AbortController();
    weatherAbortRef.current?.abort();
    weatherAbortRef.current = controller;

    fetch(`/api/weather?region=${params.region}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Weather request failed (${res.status})`);
        return res.json() as Promise<WeatherResponse>;
      })
      .then((data) => {
        if (!controller.signal.aborted) {
          setWeather(data);
        }
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error ? `Weather unavailable: ${err.message}` : "Weather unavailable.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingWeather(false);
      });

    return () => controller.abort();
  }, [params.region, retryKey]);

  return {
    params,
    recommendation,
    weather,
    loadingRecommendation,
    loadingWeather,
    error,
    setParam,
    setParams,
    retry,
  };
}

export type { RegionKey, SeasonKey, SoilKey, WaterKey };