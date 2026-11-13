"use client";

import {
  Lock,
  Database,
  Activity,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { FEATURES } from "@/components/shared/AllOptions";

export default function LandingPage() {
  const token = useAppSelector((state) => state.auth.token);
  const portalHref = token ? "/dashboard" : "/login";

  return (
    <div className="min-h-screen bg-[#f5f6fa] text-slate-900">
      {/* Sticky Navbar */}
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
            <a href="#features" className="transition hover:text-sky-600">
              Features
            </a>
            <a href="#workflow" className="transition hover:text-sky-600">
              Workflow
            </a>
            <a href="#architecture" className="transition hover:text-sky-600">
              Architecture
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={portalHref}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-sky-700"
            >
              {token ? "Open Dashboard" : "Admin Sign In"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              Clinical Operations &amp; Analytics Portal
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Manage Doctors &amp; Patients with{" "}
              <span className="text-sky-600">Clarity &amp; Speed</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              A secure, high-performance administrative workspace built for
              healthcare coordinators. Track practitioner workloads, filter
              patient records in milliseconds, and inspect live clinical charts.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href={portalHref}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-600/20 transition hover:bg-sky-700"
              >
                {token ? "Go to Dashboard" : "Launch Admin Portal"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Explore Features
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

          {/* Stylized Dashboard Preview Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-slate-200 bg-[#f5f6fa] p-4 shadow-xl sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
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
                <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-4">
                  <p className="text-[11px] font-semibold uppercase text-slate-500">
                    Total Doctors
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">12+</p>
                  <span className="mt-1 inline-block rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                    8 Specializations
                  </span>
                </div>
                <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-4">
                  <p className="text-[11px] font-semibold uppercase text-slate-500">
                    Total Patients
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">28+</p>
                  <span className="mt-1 inline-block rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-700">
                    Tracked Live
                  </span>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-800">
                    Patients per Doctor
                  </p>
                  <span className="text-[11px] font-medium text-emerald-600">
                    MongoDB $lookup
                  </span>
                </div>
                <div className="mt-4 flex h-28 items-end gap-2.5">
                  {[55, 82, 64, 95, 70, 48, 88].map((height, idx) => (
                    <div
                      key={idx}
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-sky-600 to-sky-400"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Core Capabilities
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Everything Needed for Clinical Administration
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">
            Designed with reusable UI patterns, loading skeletons, empty states,
            and indexed database queries.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md"
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
      </section>

      {/* Workflow & Architecture */}
      <section
        id="workflow"
        className="border-y border-slate-200 bg-white py-16"
      >
        <div
          id="architecture"
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8"
        >
          <div className="rounded-2xl border border-slate-200 bg-[#f5f6fa] p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-sm font-bold text-white">
              01
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">
              Authenticate Securely
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Sign in with Bearer JWT authentication to unlock protected
              dashboard, doctor, and patient routes.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#f5f6fa] p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white">
              02
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">
              Manage Doctors &amp; Patients
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Create doctors, assign patients directly under any specialist, and
              filter records by condition or date range.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#f5f6fa] p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
              03
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">
              Inspect Live Analytics
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              RTK Query tag invalidation keeps Recharts graphs and KPI cards in
              sync the instant any record changes.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-semibold text-slate-700">
          <Database className="h-4 w-4 text-sky-600" />
          DoctorTracker &bull; Care Guide Administration
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1">
            <Lock className="h-3.5 w-3.5 text-emerald-600" />
            JWT Bearer Secured
          </span>
          <Link
            href={portalHref}
            className="font-semibold text-sky-600 hover:underline"
          >
            Open Portal
          </Link>
        </div>
      </footer>
    </div>
  );
}
