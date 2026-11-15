"use client";

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { createPortal } from "react-dom";
import { MONTHS, WEEKDAYS } from "./AllOptions";
import { formatDisplay, toIsoDate } from "@/utils/formatters";
import { DatePickerProps, PopoverCoords } from "@/types/InterfaceAll";

export function DatePicker({
  id,
  value,
  onChange,
  className = "",
  placeholder = "Select date",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<PopoverCoords | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const initialDate = useMemo(() => {
    if (value) {
      const [y, m] = value.split("-").map(Number);
      if (y && m) return { year: y, month: m - 1 };
    }
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  }, [value]);

  const [viewYear, setViewYear] = useState(initialDate.year);
  const [viewMonth, setViewMonth] = useState(initialDate.month);

  const updatePosition = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const popoverWidth = 288;
    const spaceBelow = window.innerHeight - rect.bottom - 12;
    const openUpward = spaceBelow < 320 && rect.top > 320;
    const clampedLeft = Math.min(
      Math.max(12, rect.left),
      Math.max(12, window.innerWidth - popoverWidth - 12),
    );

    setCoords({
      top: openUpward ? rect.top - 6 : rect.bottom + 6,
      left: clampedLeft,
      openUpward,
    });
  }, []);

  const toggleOpen = () => {
    if (!open) {
      setViewYear(initialDate.year);
      setViewMonth(initialDate.month);
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
        popoverRef.current &&
        !popoverRef.current.contains(target)
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

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const today = new Date();
  const todayIso = toIsoDate(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        id={id}
        role="button"
        tabIndex={0}
        onClick={toggleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleOpen();
          }
        }}
        className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border bg-white px-3 py-2 text-sm transition ${
          open
            ? "border-sky-500 ring-2 ring-sky-500/20"
            : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <div className="flex min-w-0 items-center gap-2">
          <CalendarIcon className="h-4 w-4 shrink-0 text-slate-400" />
          <span
            className={`truncate ${value ? "font-medium text-slate-900" : "text-slate-400"}`}
          >
            {value ? formatDisplay(value) : placeholder}
          </span>
        </div>
        {value && (
          <button
            type="button"
            aria-label="Clear date"
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
              setOpen(false);
            }}
            className="rounded-md p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open &&
        coords &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={popoverRef}
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              transform: coords.openUpward ? "translateY(-100%)" : "none",
            }}
            className="z-[9999] w-72 rounded-md border border-slate-200 bg-white p-3.5 shadow-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={prevMonth}
                className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-semibold text-slate-900">
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7 text-center">
              {WEEKDAYS.map((day) => (
                <span
                  key={day}
                  className="py-1 text-[11px] font-semibold text-slate-400"
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                <div key={`empty-${idx}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const iso = toIsoDate(viewYear, viewMonth, dayNum);
                const isSelected = value === iso;
                const isToday = todayIso === iso;

                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => {
                      onChange(iso);
                      setOpen(false);
                    }}
                    className={`flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium transition ${
                      isSelected
                        ? "bg-sky-600 font-semibold text-white shadow-xs"
                        : isToday
                          ? "border border-sky-300 bg-sky-50 font-semibold text-sky-700"
                          : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
              <button
                type="button"
                onClick={() => {
                  onChange(todayIso);
                  setOpen(false);
                }}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                Clear
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
