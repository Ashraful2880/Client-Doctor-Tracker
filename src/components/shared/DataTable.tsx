"use client";

import React from "react";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { Pagination } from "./Pagination";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { DataTableProps } from "@/types/InterfaceAll";

export function DataTable<T>({
  data,
  meta,
  rowKey,
  columns,
  onRetry,
  emptyTitle,
  onPageChange,
  onEmptyAction,
  onLimitChange,
  isError = false,
  emptyDescription,
  emptyActionLabel,
  isLoading = false,
  isFetching = false,
}: DataTableProps<T>) {
  if (isLoading || isFetching) {
    return (
      <LoadingSkeleton variant="table" rows={6} columns={columns.length} />
    );
  }

  if (isError) {
    return <ErrorState onRetry={onRetry} />;
  }

  if (data.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        onAction={onEmptyAction}
        description={emptyDescription}
        actionLabel={emptyActionLabel}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div
        className={`overflow-x-auto transition-opacity ${isFetching ? "opacity-65" : "opacity-100"}`}
      >
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`whitespace-nowrap px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-600 sm:px-6 ${col.className ?? ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.map((item) => (
              <tr
                key={rowKey(item)}
                className="transition-colors hover:bg-slate-50/80"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`whitespace-nowrap px-4 py-3.5 text-slate-700 sm:px-6 ${col.className ?? ""}`}
                  >
                    {col.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {meta && onPageChange && (
        <Pagination
          meta={meta}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
        />
      )}
    </div>
  );
}
