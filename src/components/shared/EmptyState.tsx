import React from "react";
import { FileSearch } from "lucide-react";
import { EmptyStateProps } from "@/types/InterfaceAll";

export function EmptyState({
  icon,
  onAction,
  actionLabel,
  title = "No Data Found",
  description = "There are no records matching your current criteria.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        {icon ?? <FileSearch className="h-6 w-6" />}
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
