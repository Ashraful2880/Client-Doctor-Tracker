"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { NAV_LINKS } from "../shared/AllOptions";
import React, { useEffect, useState } from "react";
import { Activity, ArrowRight, Menu, X } from "lucide-react";

export function PublicNavbar() {
  const pathname = usePathname();
  const token = useAppSelector((state) => state.auth.token);
  const portalHref = token ? "/dashboard" : "/login";

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);

      if (pathname !== "/") return;
      const sectionIds = ["specialisations", "about", "pricing", "faq"];
      const scrollPos = window.scrollY + 120;

      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof NAV_LINKS)[number],
  ) => {
    setMobileNavOpen(false);
    if (pathname === "/" && link.sectionId) {
      e.preventDefault();
      setActiveSection(link.sectionId);
      const target = document.getElementById(link.sectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `/#${link.sectionId}`);
      }
    }
  };

  const isLinkActive = (link: (typeof NAV_LINKS)[number]) => {
    if (link.sectionId === null) {
      return pathname === link.href;
    }
    return pathname === "/" && activeSection === link.sectionId;
  };

  const isHome = pathname === "/";

  return (
    <header
      className={`${isHome ? "fixed inset-x-0 top-0" : "sticky top-0"} z-40 border-b transition-all duration-300 ${
        scrolled || mobileNavOpen
          ? "border-slate-200/80 bg-white/50 shadow-sm backdrop-blur-md"
          : isHome
            ? "border-transparent bg-transparent"
            : "border-transparent bg-sky-50/70 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => {
            if (pathname === "/") {
              setActiveSection("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-slate-900">
              DoctorTracker
            </span>
            <span className="ml-2 hidden rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sky-700 sm:inline-block">
              Care Guide
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1.5 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative rounded-md px-3.5 py-2 transition-colors ${
                  active
                    ? "bg-sky-50 font-semibold text-sky-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-sky-600" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href={portalHref}
            className="hidden items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-sky-700 sm:inline-flex"
          >
            {token ? "Open Dashboard" : "Admin Sign In"}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            className="rounded-md border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          >
            {mobileNavOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {mobileNavOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-1.5 text-sm font-medium">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`rounded-md px-3 py-2 transition ${
                    active
                      ? "bg-sky-50 font-semibold text-sky-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={portalHref}
              onClick={() => setMobileNavOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              {token ? "Open Dashboard" : "Admin Sign In"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
