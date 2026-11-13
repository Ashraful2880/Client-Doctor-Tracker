"use client";

import React from "react";
import { DatePicker } from "./DatePicker";
import { CustomSelect } from "./CustomSelect";
import { Search, RotateCcw } from "lucide-react";
import { FilterBarProps } from "@/types/InterfaceAll";

export function FilterBar({
  search,
  onReset,
  endDate,
  startDate,
  onSearchChange,
  onEndDateChange,
  onStartDateChange,
  selectFilters = [],
  hasActiveFilters = false,
  searchPlaceholder = "Search...",
}: FilterBarProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
      <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
        {onSearchChange !== undefined && (
          <div className="min-w-[220px] flex-1">
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Search
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search ?? ""}
                placeholder={searchPlaceholder}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>
        )}

        {selectFilters.map((filter) => (
          <div key={filter.id} className="min-w-[170px] flex-1 lg:flex-none">
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
          <div className="min-w-[165px]">
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
          <div className="min-w-[165px]">
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

        {onReset && hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-[38px] items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
