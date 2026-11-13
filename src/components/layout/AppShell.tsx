"use client";

import {
  X,
  Menu,
  Search,
  LogOut,
  Activity,
  ShieldCheck,
  ChevronRight,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import Link from "next/link";
import { baseApi } from "@/store/api/baseApi";
import { NavItem } from "@/types/InterfaceAll";
import React, { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearCredentials } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NAV_ITEMS, SEGMENT_LABELS } from "../shared/AllOptions";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [collapsed, setCollapsed] = useState(false);
  const [menuSearch, setMenuSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleConfirmLogout = () => {
    setLogoutModalOpen(false);
    dispatch(clearCredentials());
    dispatch(baseApi.util.resetApiState());
    router.replace("/login");
  };

  const filteredItems = useMemo(() => {
    const q = menuSearch.trim().toLowerCase();
    if (!q) return NAV_ITEMS;
    return NAV_ITEMS.filter((item) => item.label.toLowerCase().includes(q));
  }, [menuSearch]);

  const groupedItems = useMemo(() => {
    const groups: Array<{ title: string; items: NavItem[] }> = [];
    for (const groupName of ["Overview", "Management"] as const) {
      const items = filteredItems.filter((i) => i.group === groupName);
      if (items.length > 0) {
        groups.push({ title: groupName, items });
      }
    }
    return groups;
  }, [filteredItems]);

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const crumbs: Array<{ label: string; href: string }> = [
      { label: "Home", href: "/dashboard" },
    ];

    let acc = "";
    segments.forEach((seg, idx) => {
      acc += `/${seg}`;
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(seg);
      const label = isObjectId
        ? "Doctor Details"
        : SEGMENT_LABELS[seg] || seg.charAt(0).toUpperCase() + seg.slice(1);
      crumbs.push({
        label,
        href: idx === segments.length - 1 ? pathname : acc,
      });
    });

    return crumbs;
  }, [pathname]);

  const renderNavGroups = (isCollapsed: boolean, onNavigate?: () => void) => {
    if (groupedItems.length === 0) {
      return !isCollapsed ? (
        <p className="px-3 py-4 text-center text-xs text-slate-400">
          No menu matches &ldquo;{menuSearch}&rdquo;
        </p>
      ) : null;
    }

    return groupedItems.map((group) => (
      <div key={group.title} className="space-y-1">
        {!isCollapsed && (
          <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {group.title}
          </p>
        )}
        {group.items.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              title={isCollapsed ? item.label : undefined}
              className={`group relative flex items-center rounded-xl py-2.5 text-sm font-medium transition ${
                isCollapsed ? "justify-center px-2" : "gap-3 px-3.5"
              } ${
                isActive
                  ? "bg-sky-50 text-sky-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-sky-600" />
              )}
              <Icon
                className={`h-[18px] w-[18px] shrink-0 ${
                  isActive
                    ? "text-sky-600"
                    : "text-slate-400 group-hover:text-slate-600"
                }`}
              />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      {/* Fixed Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-slate-200 bg-white transition-all duration-200 lg:flex ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Brand Header */}
        <div
          className={`flex h-16 shrink-0 items-center border-b border-slate-200 ${
            collapsed ? "justify-center px-2" : "gap-2.5 px-5"
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm">
              <Activity className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div>
                <span className="text-base font-bold tracking-tight text-slate-900">
                  DoctorTracker
                </span>
                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                  Care Guide
                </p>
              </div>
            )}
          </Link>
        </div>

        {/* Search Box Before Dashboard Menus */}
        {!collapsed && (
          <div className="border-b border-slate-100 px-4 py-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                placeholder="Search menu..."
                className="w-full rounded-md border border-slate-200 bg-slate-50/70 py-1.5 pl-8 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>
        )}

        {/* Scrollable Menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-3">
          {renderNavGroups(collapsed)}
        </nav>

        {/* Sidebar Footer */}
        <div className="shrink-0 border-t border-slate-200 p-3">
          {!collapsed ? (
            <>
              <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 p-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-900">
                    {user?.name || "Admin"}
                  </p>
                  <p className="truncate text-[11px] text-slate-500">
                    {user?.email || ""}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLogoutModalOpen(true)}
                className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setLogoutModalOpen(true)}
              title="Sign Out"
              className="flex w-full items-center justify-center rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative z-10 flex h-full w-72 flex-col bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-white">
                  <Activity className="h-4 w-4" />
                </div>
                <span className="text-base font-bold text-slate-900">
                  DoctorTracker
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="border-b border-slate-100 px-4 py-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  placeholder="Search menu..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-3">
              {renderNavGroups(false, () => setMobileMenuOpen(false))}
            </nav>

            <div className="border-t border-slate-200 p-4">
              <p className="truncate text-xs font-semibold text-slate-900">
                {user?.name || "Admin"}
              </p>
              <p className="truncate text-xs text-slate-500">
                {user?.email || ""}
              </p>
              <button
                type="button"
                onClick={() => setLogoutModalOpen(true)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Column */}
      <div
        className={`flex min-h-screen flex-col transition-all duration-200 ${
          collapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        {/* Sticky / Fixed Topbar with Collapse Toggle & Breadcrumb */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>

            {/* Desktop Sidebar Collapse / Expand Toggle */}
            <button
              type="button"
              onClick={() => setCollapsed((prev) => !prev)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 lg:inline-flex"
            >
              {collapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </button>

            <span className="hidden h-5 w-px bg-slate-200 sm:block" />

            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs sm:text-sm"
            >
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={crumb.href + idx}>
                    {idx > 0 && (
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                    )}
                    {isLast ? (
                      <span className="font-semibold text-slate-900">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="font-medium text-slate-500 transition hover:text-sky-600"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-slate-700">
                {user?.name || "Admin"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLogoutModalOpen(true)}
              title="Sign Out"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="w-full flex-1 p-4 sm:p-5">{children}</main>
      </div>

      <ConfirmDialog
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Confirm Sign Out"
        message="Are you sure you want to sign out of the Doctor Tracker portal? You will need to sign in again to access your dashboard."
        confirmLabel="Yes, Sign Out"
        tone="primary"
      />
    </div>
  );
}
