import React from "react";
import { StatCardProps } from "@/types/InterfaceAll";

export type StatTone = "sky" | "violet" | "emerald" | "amber" | "rose";

const TONE_STYLES: Record<StatTone, { card: string; iconBg: string }> = {
  sky: {
    iconBg: "bg-sky-500 text-white shadow-sky-500/25",
    card: "bg-gradient-to-br from-sky-50/90 via-white to-cyan-50/60 border-sky-100",
  },
  violet: {
    iconBg: "bg-violet-600 text-white shadow-violet-600/25",
    card: "bg-gradient-to-br from-violet-50/90 via-white to-purple-50/60 border-violet-100",
  },
  emerald: {
    iconBg: "bg-emerald-500 text-white shadow-emerald-500/25",
    card: "bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/60 border-emerald-100",
  },
  amber: {
    iconBg: "bg-amber-500 text-white shadow-amber-500/25",
    card: "bg-gradient-to-br from-amber-50/90 via-white to-orange-50/60 border-amber-100",
  },
  rose: {
    iconBg: "bg-rose-500 text-white shadow-rose-500/25",
    card: "bg-gradient-to-br from-rose-50/90 via-white to-pink-50/60 border-rose-100",
  },
};

export function StatCard({
  icon,
  label,
  value,
  subtext,
  badgeText,
  tone = "sky",
}: StatCardProps) {
  const styles = TONE_STYLES[tone];

  return (
    <div
      className={`rounded-2xl border p-5 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md ${styles.card}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </span>
          <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {value}
          </div>
        </div>
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-md ${styles.iconBg}`}
        >
          {icon}
        </div>
      </div>
      {(badgeText || subtext) && (
        <div className="mt-3.5 flex items-center gap-2 text-xs">
          {badgeText && (
            <span className="rounded-md bg-emerald-100/80 px-1.5 py-0.5 font-semibold text-emerald-700">
              {badgeText}
            </span>
          )}
          {subtext && (
            <span className="truncate text-slate-500">{subtext}</span>
          )}
        </div>
      )}
    </div>
  );
}
