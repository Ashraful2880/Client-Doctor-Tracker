"use client";

import {
  MenuCoords,
  SelectOption,
  CustomSelectProps,
} from "@/types/InterfaceAll";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

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
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<MenuCoords | null>(null);

  const updatePosition = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - 12;
    const spaceAbove = rect.top - 12;
    const openUpward = spaceBelow < 200 && spaceAbove > spaceBelow;
    const maxHeight = Math.min(
      240,
      Math.max(120, openUpward ? spaceAbove : spaceBelow),
    );

    setCoords({
      top: openUpward ? rect.top - 6 : rect.bottom + 6,
      left: rect.left,
      width: Math.max(rect.width, 160),
      maxHeight,
      openUpward,
    });
  }, []);

  const toggleOpen = () => {
    if (!open) {
      updatePosition();
    }
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const handleReposition = () => updatePosition();

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open, updatePosition]);

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
        onClick={toggleOpen}
        className={`flex w-full items-center justify-between gap-2 rounded-md border bg-white text-left transition focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 ${
          open
            ? "border-sky-500 ring-2 ring-sky-500/20"
            : "border-slate-200 hover:border-slate-300"
        } ${size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"}`}
      >
        <span
          className={`truncate ${selectedOption ? "font-medium text-slate-900" : "text-slate-400"}`}
        >
          {displayLabel}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-150 ${
            open ? "rotate-180 text-sky-600" : ""
          }`}
        />
      </button>

      {open &&
        coords &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              width: coords.width,
              maxHeight: coords.maxHeight,
              transform: coords.openUpward ? "translateY(-100%)" : "none",
            }}
            className="z-[9999] overflow-y-auto rounded-md border border-slate-200 bg-white p-1 shadow-xl"
          >
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
                    className={`flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-sm transition ${
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
          </div>,
          document.body,
        )}
    </div>
  );
}
