"use client";

import React from "react";
import { CustomSelect } from "./CustomSelect";
import { PAGE_SIZE_OPTIONS } from "@/utils/constants";
import { PaginationProps } from "@/types/InterfaceAll";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  meta,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const { page, limit, total, totalPages } = meta;
  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const getPageNumbers = () => {
    const pages: number[] = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3.5 sm:flex-row sm:px-6">
      <div className="flex items-center gap-3 text-sm text-slate-600">
        <span>
          Showing{" "}
          <span className="font-semibold text-slate-900">{startItem}</span> to{" "}
          <span className="font-semibold text-slate-900">{endItem}</span> of{" "}
          <span className="font-semibold text-slate-900">{total}</span> results
        </span>

        {onLimitChange && (
          <div className="w-28">
            <CustomSelect
              size="sm"
              value={String(limit)}
              onChange={(val) => onLimitChange(Number(val))}
              options={PAGE_SIZE_OPTIONS.map((size) => ({
                label: `${size} / page`,
                value: String(size),
              }))}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Prev
        </button>

        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={`h-8 min-w-[32px] rounded-lg px-2 text-xs font-semibold transition ${
              pageNum === page
                ? "bg-sky-600 text-white shadow-xs"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
