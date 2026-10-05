/**
 * AmbientBackdrop — the load-bearing layer under every glass surface (plan 4.2).
 *
 * Plan 5.7: the original gradient-mesh / furrow / vignette layers were replaced
 * with OpenSourceUI's "Dark Aurora Background" — four soft teal/cyan/emerald/
 * sky blooms + a dot-grid over charcoal — so the liquid-glass lenses refract
 * moving colour instead of a flat mesh. Layer markup is copied verbatim from:
 *
 *   https://opensourceui.in/components/dark-aurora-background
 *   https://github.com/bidyut10/opensourceui
 *
 * --- MIT License -----------------------------------------------------------
 * Copyright (c) 2026 Bidyut Kundu
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * -------------------------------------------------------------------------
 *
 * Integration deltas vs the upstream component (which wraps `children`):
 * - wrapper here is the plan 4.2 fixed viewport cover, keeping `-z-10`,
 *   `pointer-events-none`, `aria-hidden` and the plan 4.6 `print:hidden` guard;
 *   it adopts upstream's `bg-[#0A0C0F]` + `overflow-hidden` semantics.
 * - inner layers are untouched: static (one paint, zero runtime cost), so no
 *   reduced-motion handling is needed.
 */
export function AmbientBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0A0C0F] print:hidden"
    >
      {/* Base vertical gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#12151A_0%,#0A0C0F_55%,#06080A_100%)]" />

      {/* Aurora blooms — teal, cyan, emerald, sky */}
      <div className="pointer-events-none absolute -inset-6 -z-10 blur-xl">
        <div className="absolute inset-0 bg-[#0A0C0F]" />

        <div className="absolute -top-[18%] -left-[12%] h-[68%] w-[68%] rounded-full bg-[#2DD4BF] opacity-22 blur-3xl" />

        <div className="absolute top-[8%] -right-[10%] h-[62%] w-[62%] rounded-full bg-[#22D3EE] opacity-18 blur-3xl" />

        <div className="absolute bottom-[-28%] left-[18%] h-[70%] w-[70%] rounded-full bg-[#34D399] opacity-16 blur-3xl" />

        <div className="absolute right-[8%] bottom-[-16%] h-[56%] w-[56%] rounded-full bg-[#38BDF8] opacity-14 blur-3xl" />
      </div>

      {/* Dot-grid texture */}
      <div className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,#FFFFFF_1px,transparent_1px)] [background-size:4px_4px] opacity-[0.04]" />
    </div>
  );
}
