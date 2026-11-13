"use client";

import { Check, ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { CustomSelectProps, SelectOption } from "@/types/InterfaceAll";

export function CustomSelect({
  id,
  value,
  options,
  onChange,
  size = "md",
  className = "",
  allLabel = "All",
  disabled = false,
  includeAllOption = false,
  placeholder = "Select...",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const allOptions: SelectOption[] = includeAllOption
    ? [{ label: allLabel, value: "" }, ...options]
    : options;

  const selectedOption = allOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between gap-2 rounded-md border bg-white text-left transition focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 ${
          open
            ? "border-sky-500 ring-2 ring-sky-500/20"
            : "border-slate-200 hover:border-slate-300"
        } ${size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"}`}
      >
        <span
          className={`truncate ${selectedOption ? "text-slate-900 font-medium" : "text-slate-400"}`}
        >
          {displayLabel}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-150 ${
            open ? "rotate-180 text-sky-600" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-50 mt-1.5 max-h-60 min-w-[160px] overflow-y-auto rounded-md border border-slate-200 bg-white p-1.5 shadow-lg">
          {allOptions.length === 0 ? (
            <p className="px-3 py-2 text-xs text-slate-400">
              No options available
            </p>
          ) : (
            allOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                    isSelected
                      ? "bg-sky-50 font-semibold text-sky-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 shrink-0 text-sky-600" />
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
