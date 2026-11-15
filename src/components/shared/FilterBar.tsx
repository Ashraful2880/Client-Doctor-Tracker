"use client";

import React, { useState } from "react";
import { DatePicker } from "./DatePicker";
import { CustomSelect } from "./CustomSelect";
import { FilterBarProps } from "@/types/InterfaceAll";
import { ChevronDown, Filter, RotateCcw, Search, X } from "lucide-react";

export function FilterBar({
  search,
  endDate,
  onReset,
  startDate,
  onSearchChange,
  onEndDateChange,
  onStartDateChange,
  selectFilters = [],
  hasActiveFilters = false,
  searchPlaceholder = "Search...",
}: FilterBarProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const hasFilterControls =
    selectFilters.length > 0 ||
    Boolean(onStartDateChange) ||
    Boolean(onEndDateChange);

  const activeFilterCount =
    selectFilters.filter((f) => Boolean(f.value)).length +
    (startDate ? 1 : 0) +
    (endDate ? 1 : 0);

  // Dashboard-only mode (no search input, only date filters)
  if (onSearchChange === undefined && hasFilterControls) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs sm:p-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-wrap items-end gap-3">
            {onStartDateChange && (
              <div className="w-full sm:w-44">
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  From Date
                </label>
                <DatePicker
                  placeholder="From date"
                  value={startDate ?? ""}
                  onChange={onStartDateChange}
                />
              </div>
            )}
            {onEndDateChange && (
              <div className="w-full sm:w-44">
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  To Date
                </label>
                <DatePicker
                  placeholder="To date"
                  value={endDate ?? ""}
                  onChange={onEndDateChange}
                />
              </div>
            )}
          </div>

          {onReset && hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-[38px] items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs sm:p-4">
      {/* Top Toolbar: Search Left + Filters Button Right */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {onSearchChange !== undefined && (
          <div className="relative w-full sm:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search ?? ""}
              placeholder={searchPlaceholder}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-8 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-2">
          {onReset && hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-[38px] items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          )}

          {hasFilterControls && (
            <button
              type="button"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((prev) => !prev)}
              className={`inline-flex h-[38px] items-center gap-2 rounded-md border px-3.5 text-sm font-medium transition ${
                filtersOpen || activeFilterCount > 0
                  ? "border-sky-600 bg-sky-600 text-white shadow-xs hover:bg-sky-700"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span
                  className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                    filtersOpen || activeFilterCount > 0
                      ? "bg-white text-sky-700"
                      : "bg-sky-100 text-sky-700"
                  }`}
                >
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  filtersOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Filter Panel */}
      {hasFilterControls && filtersOpen && (
        <div className="mt-3.5 border-t border-slate-100 pt-3.5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {selectFilters.map((filter) => (
              <div key={filter.id} className="w-full">
                <label
                  htmlFor={filter.id}
                  className="mb-1 block text-xs font-medium text-slate-600"
                >
                  {filter.label}
                </label>
                <CustomSelect
                  id={filter.id}
                  includeAllOption
                  value={filter.value}
                  options={filter.options}
                  onChange={filter.onChange}
                  allLabel={`All ${filter.label}`}
                />
              </div>
            ))}

            {onStartDateChange && (
              <div className="w-full">
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  From Date
                </label>
                <DatePicker
                  placeholder="From date"
                  value={startDate ?? ""}
                  onChange={onStartDateChange}
                />
              </div>
            )}

            {onEndDateChange && (
              <div className="w-full">
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  To Date
                </label>
                <DatePicker
                  placeholder="To date"
                  value={endDate ?? ""}
                  onChange={onEndDateChange}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
