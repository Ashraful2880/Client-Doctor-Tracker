"use client";

import React from "react";
import { Modal } from "./Modal";
import { AlertTriangle, LogOut } from "lucide-react";
import { ConfirmDialogProps } from "@/types/InterfaceAll";

export function ConfirmDialog({
  open,
  title,
  onClose,
  message,
  onConfirm,
  tone = "danger",
  isLoading = false,
  confirmLabel = "Delete",
}: ConfirmDialogProps) {
  const isDanger = tone === "danger";

  return (
    <Modal open={open} onClose={onClose} title={title} maxWidthClass="max-w-md">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            isDanger ? "bg-rose-100 text-rose-600" : "bg-sky-100 text-sky-600"
          }`}
        >
          {isDanger ? (
            <AlertTriangle className="h-5 w-5" />
          ) : (
            <LogOut className="h-5 w-5" />
          )}
        </div>
        <p className="text-sm leading-relaxed text-slate-600">{message}</p>
      </div>
      <div className="mt-6 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className={`rounded-md px-4 py-2 text-sm font-medium text-white shadow-xs transition disabled:opacity-60 ${
            isDanger
              ? "bg-rose-600 hover:bg-rose-700"
              : "bg-sky-600 hover:bg-sky-700"
          }`}
        >
          {isLoading ? "Processing..." : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
