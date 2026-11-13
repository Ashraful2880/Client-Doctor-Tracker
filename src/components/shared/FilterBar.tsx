'use client';

import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

export interface SelectFilterConfig {
  id: string;
  label: string;
  value: string;
  options: Array<{ label: string; value: string }>;
  onChange: (value: string) => void;
}

interface FilterBarProps {
  search?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  selectFilters?: SelectFilterConfig[];
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (value: string) => void;
  onEndDateChange?: (value: string) => void;
  onReset?: () => void;
  hasActiveFilters?: boolean;
}

export function FilterBar({
  search,
  searchPlaceholder = 'Search...',
  onSearchChange,
  selectFilters = [],
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onReset,
  hasActiveFilters = false,
}: FilterBarProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
        {onSearchChange !== undefined && (
          <div className="flex-1 min-w-[220px]">
            <label className="mb-1 block text-xs font-medium text-slate-600">Search</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search ?? ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>
        )}

        {selectFilters.map((filter) => (
          <div key={filter.id} className="min-w-[160px] flex-1 lg:flex-none">
            <label
              htmlFor={filter.id}
              className="mb-1 block text-xs font-medium text-slate-600"
            >
              {filter.label}
            </label>
            <select
              id={filter.id}
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="">All</option>
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        {onStartDateChange && (
          <div className="min-w-[145px]">
            <label className="mb-1 block text-xs font-medium text-slate-600">From Date</label>
            <input
              type="date"
              value={startDate ?? ''}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
        )}

        {onEndDateChange && (
          <div className="min-w-[145px]">
            <label className="mb-1 block text-xs font-medium text-slate-600">To Date</label>
            <input
              type="date"
              value={endDate ?? ''}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
        )}

        {onReset && hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-[38px] items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-3.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

