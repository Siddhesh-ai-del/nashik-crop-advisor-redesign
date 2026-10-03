import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { GlassPanel } from "./glass/GlassPanel";

/**
 * SectionCard — the single conversion point for plan 4.5: every card in the
 * app flows through here, so swapping the shell to GlassPanel (locked `panel`
 * optics — refraction confined to the rim, flat centres) converts all 10+
 * cards at once. The base styling (radius, border, tint, `print-break`) lives
 * in GlassPanel; callers only pass layout/padding classes as before.
 *
 * The old `backdrop-blur-sm` is intentionally dropped — the material's
 * frost (`blur(6px) saturate(1.12)`) replaces it.
 */
export function SectionCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <GlassPanel className={className}>{children}</GlassPanel>;
}

export function SectionTitle({
  icon,
  title,
  subtitle,
  right,
}: {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 px-6 pt-6">
      <div className="min-w-0">
        {/* Single hierarchy: display heading → muted subhead. The icon sits
            inline in moss instead of a tinted square tile. */}
        <div className="flex items-center gap-2">
          {icon ? (
            <span className="text-moss" aria-hidden>
              {icon}
            </span>
          ) : null}
          <h2 className="font-display text-h3 font-semibold text-ink">
            {title}
          </h2>
        </div>
        {subtitle ? (
          <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

export function Badge({
  children,
  tone = "stone",
  className,
}: {
  children: ReactNode;
  tone?: "stone" | "moss" | "harvest" | "terracotta" | "sage" | "clay";
  className?: string;
}) {
  const tones: Record<string, string> = {
    stone: "bg-clay-light text-ink-secondary ring-border",
    moss: "bg-moss-light text-moss-deep ring-moss/15",
    harvest: "bg-harvest-100 text-harvest-700 ring-harvest-200",
    terracotta: "bg-terracotta-light text-terracotta ring-terracotta/15",
    sage: "bg-sage-light text-olive ring-sage/15",
    clay: "bg-clay-light text-ink-secondary ring-clay/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-border-light",
        className,
      )}
    />
  );
}

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
