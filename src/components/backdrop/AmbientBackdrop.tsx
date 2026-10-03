/**
 * AmbientBackdrop — the load-bearing layer under every glass surface (plan 4.2).
 *
 * Liquid glass refracts what's behind it; on a flat dark fill it looks like
 * plain blur. This fixed gradient mesh gives the lenses colour + luminance to
 * bend: moss pooling top-left, harvest mid-right, clay bottom, plus faint
 * "furrow" bands so rim refraction has linear structure to warp.
 *
 * Deliberately NON-animated (one static paint, zero runtime cost).
 * `print:hidden` keeps the printed summary on solid white.
 */
export function AmbientBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 print:hidden"
    >
      {/* Base canvas + soft radial colour pools */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "var(--canvas)",
          backgroundImage: [
            "radial-gradient(52rem 38rem at 12% -6%, rgb(123 160 105 / 0.16), transparent 62%)",
            "radial-gradient(46rem 34rem at 96% 18%, rgb(150 114 44 / 0.13), transparent 60%)",
            "radial-gradient(40rem 30rem at 78% 96%, rgb(217 138 99 / 0.10), transparent 58%)",
            "radial-gradient(34rem 26rem at 34% 74%, rgb(123 160 105 / 0.08), transparent 55%)",
            "linear-gradient(180deg, rgb(28 31 34 / 0.55), transparent 32%)",
          ].join(", "),
        }}
      />
      {/* Faint field furrows — give the refraction linear structure to bend */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgb(232 230 225 / 0.02) 0 1px, transparent 1px 8px)",
        }}
      />
      {/* Vignette keeps the edges calm so cards read against quiet glass */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgb(10 11 12 / 0.55) 100%)",
        }}
      />
    </div>
  );
}
