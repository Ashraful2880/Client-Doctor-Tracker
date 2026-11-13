"use client";

import {
  Plus,
  Users,
  Layers,
  Activity,
  RotateCcw,
  Stethoscope,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { StatCard } from "@/components/shared/StatCard";
import { DatePicker } from "@/components/shared/DatePicker";
import { PageHeader } from "@/components/shared/PageHeader";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";
import { useGetPatientsQuery } from "@/store/api/patientsApi";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatDate, getDoctorName } from "@/utils/formatters";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { useGetDashboardAnalyticsQuery } from "@/store/api/analyticsApi";
import { AnalyticsCharts } from "@/components/features/dashboard/AnalyticsCharts";

export default function DashboardPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading, isFetching, isError, refetch } =
    useGetDashboardAnalyticsQuery({
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    });

  const {
    data: recentPatientsRes,
    isLoading: isPatientsLoading,
    isFetching: isPatientsFetching,
  } = useGetPatientsQuery({
    page: 1,
    limit: 5,
  });

  const analytics = data?.data;
  const recentPatients = recentPatientsRes?.data ?? [];
  const hasDateFilter = Boolean(startDate || endDate);

  return (
    <div className="space-y-3">
      <PageHeader
        title="Dashboard"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-36 sm:w-40">
              <DatePicker
                placeholder="From date"
                value={startDate}
                onChange={setStartDate}
              />
            </div>
            <div className="w-36 sm:w-40">
              <DatePicker
                placeholder="To date"
                value={endDate}
                onChange={setEndDate}
              />
            </div>
            {hasDateFilter && (
              <button
                type="button"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                }}
                title="Reset Date Filter"
                className="inline-flex h-[38px] items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            )}
            <Link
              href="/doctors"
              className="inline-flex h-[38px] items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 shadow-xs transition hover:bg-slate-50"
            >
              <Stethoscope className="h-4 w-4 text-sky-600" />
              Doctors
            </Link>
            <Link
              href="/patients"
              className="inline-flex h-[38px] items-center gap-1.5 rounded-md bg-sky-600 px-3.5 text-sm font-medium text-white shadow-xs transition hover:bg-sky-700"
            >
              <Plus className="h-4 w-4" />
              Manage Patients
            </Link>
          </div>
        }
      />

      {isLoading || isFetching ? (
        <div className="space-y-6">
          <LoadingSkeleton variant="stat-grid" />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <LoadingSkeleton variant="chart" />
            <LoadingSkeleton variant="chart" />
          </div>
        </div>
      ) : isError || !analytics ? (
        <ErrorState
          title="Unable to load dashboard analytics"
          message="Please ensure the backend API is running and try again."
          onRetry={refetch}
        />
      ) : (
        <>
          {/* WowDash-style Pastel KPI Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              tone="sky"
              badgeText="Active"
              label="Total Doctors"
              subtext="Registered specialists"
              value={analytics.summary.totalDoctors}
              icon={<Stethoscope className="h-5 w-5" />}
            />
            <StatCard
              tone="violet"
              badgeText="Tracked"
              label="Total Patients"
              subtext="Across all departments"
              icon={<Users className="h-5 w-5" />}
              value={analytics.summary.totalPatients}
            />
            <StatCard
              tone="emerald"
              badgeText="Ratio"
              label="Patients / Doctor"
              subtext="Average care load"
              icon={<Activity className="h-5 w-5" />}
              value={analytics.summary.avgPatientsPerDoctor}
            />
            <StatCard
              tone="amber"
              badgeText="Depts"
              label="Specializations"
              subtext="Active medical fields"
              icon={<Layers className="h-5 w-5" />}
              value={analytics.summary.totalSpecializations}
            />
          </div>

          {/* 3-Column Analytics Row */}
          <AnalyticsCharts analytics={analytics} />

          {/* Bottom Row: Latest Registered Patients + Top Doctors */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
            {/* Latest Registered Patients */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs xl:col-span-8">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-base font-bold text-slate-900">
                    Latest Registered Patients
                  </h2>
                  <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700">
                    {analytics.summary.totalPatients}
                  </span>
                </div>
                <Link
                  href="/patients"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700"
                >
                  View All
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {isPatientsLoading || isPatientsFetching ? (
                <div className="p-4">
                  <LoadingSkeleton variant="table" rows={4} columns={4} />
                </div>
              ) : recentPatients.length === 0 ? (
                <div className="p-5">
                  <EmptyState
                    title="No Patients Found"
                    description="Register patients to see recent clinical activity here."
                  />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                    <thead className="bg-slate-50/70">
                      <tr>
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Patient
                        </th>
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Assigned Doctor
                        </th>
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Registered On
                        </th>
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Condition
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentPatients.map((patient) => (
                        <tr key={patient._id} className="hover:bg-slate-50/70">
                          <td className="whitespace-nowrap px-5 py-3.5">
                            <p className="font-semibold text-slate-900">
                              {patient.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {patient.age} yrs &bull; {patient.gender}
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-5 py-3.5 text-slate-700">
                            {getDoctorName(patient.doctorId)}
                          </td>
                          <td className="whitespace-nowrap px-5 py-3.5 text-xs text-slate-500">
                            {formatDate(patient.createdAt)}
                          </td>
                          <td className="whitespace-nowrap px-5 py-3.5">
                            <StatusBadge label={patient.condition} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Top Doctors */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xs xl:col-span-4">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h2 className="text-base font-bold text-slate-900">
                  Top Doctors
                </h2>
                <Link
                  href="/doctors"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700"
                >
                  View All
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {analytics.patientsPerDoctor.length === 0 ? (
                <div className="p-5">
                  <EmptyState
                    title="No Doctors Found"
                    description="Add doctors to see top practitioners."
                  />
                </div>
              ) : (
                <div className="divide-y divide-slate-100 p-2">
                  {analytics.patientsPerDoctor.slice(0, 5).map((doc) => {
                    const initials = doc.name
                      .replace(/^Dr\.\s+/i, "")
                      .split(" ")
                      .map((p) => p[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <Link
                        key={doc.doctorId}
                        href={`/doctors/${doc.doctorId}`}
                        className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-slate-50"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {doc.name}
                            </p>
                            <p className="truncate text-xs text-slate-500">
                              {doc.specialization}
                            </p>
                          </div>
                        </div>
                        <span className="ml-2 shrink-0 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-800">
                          {doc.patientCount} pts
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
