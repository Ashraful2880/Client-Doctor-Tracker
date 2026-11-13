"use client";

import {
  X,
  Zap,
  Lock,
  Menu,
  Clock,
  Check,
  Activity,
  Sparkles,
  Database,
  Building2,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import {
  FAQS,
  TESTIMONIALS,
  DASH_FEATURES,
  PRICING_TIERS,
} from "@/components/shared/AllOptions";
import Link from "next/link";
import React, { useState } from "react";
import { useAppSelector } from "@/store/hooks";

export default function LandingPage() {
  const token = useAppSelector((state) => state.auth.token);
  const portalHref = token ? "/dashboard" : "/login";
  const [annualBilling, setAnnualBilling] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#f5f6fa] text-slate-900">
      {/* Sticky Glassmorphic Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
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

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a href="#about" className="transition hover:text-sky-600">
              About
            </a>
            <a href="#features" className="transition hover:text-sky-600">
              Features
            </a>
            <a href="#pricing" className="transition hover:text-sky-600">
              Pricing
            </a>
            <a href="#testimonials" className="transition hover:text-sky-600">
              Reviews
            </a>
            <a href="#faq" className="transition hover:text-sky-600">
              FAQ
            </a>
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
              aria-label="Toggle navigation"
              onClick={() => setMobileNavOpen((prev) => !prev)}
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
            <div className="flex flex-col space-y-3 text-sm font-medium text-slate-700">
              <a href="#about" onClick={() => setMobileNavOpen(false)}>
                About
              </a>
              <a href="#features" onClick={() => setMobileNavOpen(false)}>
                Features
              </a>
              <a href="#pricing" onClick={() => setMobileNavOpen(false)}>
                Pricing
              </a>
              <a href="#testimonials" onClick={() => setMobileNavOpen(false)}>
                Reviews
              </a>
              <a href="#faq" onClick={() => setMobileNavOpen(false)}>
                FAQ
              </a>
              <Link
                href={portalHref}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white"
              >
                {token ? "Open Dashboard" : "Admin Sign In"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/40 to-[#f5f6fa] pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              <Sparkles className="h-3.5 w-3.5 text-sky-600" />
              Clinical Operations &amp; Analytics Portal
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:leading-[1.12]">
              Manage Doctors &amp; Patients with{" "}
              <span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                Clarity &amp; Precision
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              A secure, high-performance administrative workspace built for
              healthcare coordinators. Track practitioner workloads, filter
              patient records in milliseconds, and inspect live clinical charts.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href={portalHref}
                className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-600/20 transition hover:bg-sky-700"
              >
                {token ? "Go to Dashboard" : "Launch Admin Portal"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View Pricing
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                RTK Query Caching
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                MongoDB Aggregations
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Server-Side Pagination
              </span>
            </div>
          </div>

          {/* Stylized Portal Preview Card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  DoctorTracker &bull; Live Overview
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-4">
                  <p className="text-[11px] font-semibold uppercase text-slate-500">
                    Total Doctors
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">12+</p>
                  <span className="mt-1 inline-block rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                    8 Specializations
                  </span>
                </div>
                <div className="rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-4">
                  <p className="text-[11px] font-semibold uppercase text-slate-500">
                    Total Patients
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">28+</p>
                  <span className="mt-1 inline-block rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-700">
                    Tracked Live
                  </span>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-800">
                    Patients per Doctor
                  </p>
                  <span className="text-[11px] font-medium text-emerald-600">
                    MongoDB $lookup
                  </span>
                </div>
                <div className="mt-4 flex h-24 items-end gap-2.5">
                  {[55, 82, 64, 95, 70, 48, 88]?.map((height, idx) => (
                    <div
                      key={idx}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-sky-600 to-sky-400"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-2.5 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                    SJ
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Dr. Sarah Jenkins
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Cardiology &bull; Metro General
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-sky-50 px-2.5 py-0.5 font-semibold text-sky-700">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Metrics Strip */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs lg:grid-cols-4">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              &lt;30ms
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Indexed Query Speed
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-extrabold text-sky-600 sm:text-3xl">
              100%
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Bearer JWT Protected
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-extrabold text-emerald-600 sm:text-3xl">
              3-in-1
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Recharts Analytics Views
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-extrabold text-violet-600 sm:text-3xl">
              24/7
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Responsive Portal Access
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              About DoctorTracker
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Built to Replace Fragmented Clinic Spreadsheets
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Healthcare coordinators often struggle with disconnected
              spreadsheets when tracking which patients are assigned to which
              specialists. DoctorTracker centralizes doctor profiles, patient
              records, and real-time workload analytics into one fast, unified
              interface.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Unified Doctor-Patient Hierarchy
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600">
                    Inspect every doctor&apos;s hospital, specialization, and
                    assigned patient list from a single detail view.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Instant Search &amp; Date-Wise Auditing
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600">
                    Debounced search combined with custom date-range and
                    condition filters surfaces exact records immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">
                Decoupled REST Architecture
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                Next.js App Router frontend communicating cleanly with a
                standalone Express + MongoDB API server.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">
                Skeleton &amp; Empty States
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                Polished loading skeletons, retryable error cards, and helpful
                empty states across every page.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Production-Ready Data Validation
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Every API payload is validated with Zod schemas before
                    touching MongoDB.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Zod + Mongoose
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="border-y border-slate-200 bg-white py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Core Capabilities
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Everything Needed for Clinical Administration
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">
              Designed with reusable UI patterns, loading skeletons, empty
              states, and indexed database queries.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DASH_FEATURES?.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${feat.tone}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Transparent Pricing
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Plans Built for Every Healthcare Team
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
            Start free for small clinics or scale to unlimited doctors and
            multi-hospital analytics.
          </p>

          {/* Billing Toggle */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setAnnualBilling(false)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                !annualBilling
                  ? "bg-sky-600 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnualBilling(true)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                annualBilling
                  ? "bg-sky-600 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Annual
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  annualBilling
                    ? "bg-white/20 text-white"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRICING_TIERS?.map((tier) => {
            const price = annualBilling ? tier.annualPrice : tier.monthlyPrice;
            return (
              <div
                key={tier.name}
                className={`relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-xs transition hover:shadow-md ${
                  tier.highlighted
                    ? "border-sky-500 ring-2 ring-sky-500/20"
                    : "border-slate-200"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">
                      {tier.name}
                    </h3>
                    {tier.badge && (
                      <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700">
                        {tier.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500">
                    {tier.subtitle}
                  </p>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                      ${price}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      / month
                    </span>
                  </div>

                  <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5 text-sm text-slate-600">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={portalHref}
                  className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition ${
                    tier.highlighted
                      ? "bg-sky-600 text-white shadow-sm hover:bg-sky-700"
                      : "border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="border-y border-slate-200 bg-white py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Trusted by Teams
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              What Clinical Coordinators Say
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.name}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#f8fafc] p-6"
              >
                <p className="text-sm leading-relaxed text-slate-700">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-slate-200/70 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            FAQ
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                      isOpen ? "rotate-180 text-sky-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 px-5 py-3.5 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-sky-900 p-8 text-white shadow-lg sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to Streamline Your Clinical Operations?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-300">
              Sign in to the DoctorTracker admin portal and start managing
              doctors, patients, and live analytics right away.
            </p>
          </div>
          <Link
            href={portalHref}
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-sky-400"
          >
            {token ? "Open Dashboard" : "Launch Portal"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Multi-Column Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-white">
                <Activity className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-slate-900">
                DoctorTracker
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Secure clinical administration for doctors, patients, and
              real-time workload analytics.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Navigation
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              <li>
                <a href="#about" className="hover:text-sky-600">
                  About
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-sky-600">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-sky-600">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-sky-600">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Portal Modules
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/dashboard" className="hover:text-sky-600">
                  Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-sky-600">
                  Doctors Management
                </Link>
              </li>
              <li>
                <Link href="/patients" className="hover:text-sky-600">
                  Patients Management
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Security &amp; Stack
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              <li className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-emerald-600" />
                Bearer JWT Secured
              </li>
              <li>Next.js App Router + RTK Query</li>
              <li>Express + MongoDB Aggregations</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} DoctorTracker &bull; Care Guide
          Administration. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
