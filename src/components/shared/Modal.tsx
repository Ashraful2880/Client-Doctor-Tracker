"use client";

import { X } from "lucide-react";
import { ModalProps } from "@/types/InterfaceAll";
import React, { useEffect, useState } from "react";

export function Modal({
  open,
  title,
  onClose,
  children,
  description,
  maxWidthClass = "max-w-lg",
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(open);

  useEffect(() => {
    let rafId: number;
    let timerId: ReturnType<typeof setTimeout>;

    if (open) {
      setShouldRender(true);
      rafId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);
      timerId = setTimeout(() => {
        setShouldRender(false);
      }, 200);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (timerId) clearTimeout(timerId);
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-[2px] transition-opacity duration-200 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 flex w-full ${maxWidthClass} max-h-[92vh] flex-col rounded-xl border border-slate-200/90 bg-white shadow-2xl transition-all duration-200 ease-out ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-3.5 rounded-t-xl">
          <div>
            <h2 className="text-base font-bold text-slate-900">{title}</h2>
            {description && (
              <p className="mt-0.5 text-xs text-slate-500">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-md p-1 text-slate-400 transition hover:bg-slate-200/70 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
