"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-5 text-center">
      <h1 className="font-[family-name:var(--font-source-serif)] text-2xl font-bold text-ink">
        Something went wrong
      </h1>
      <p className="max-w-md text-sm text-ink-secondary">
        {error.message || "An unexpected error occurred while rendering the dashboard."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-[12px] bg-moss px-5 py-2.5 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(90,122,77,0.2)] transition-all duration-300 hover:bg-moss-deep"
      >
        Try again
      </button>
    </main>
  );
}
