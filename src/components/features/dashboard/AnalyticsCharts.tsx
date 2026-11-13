"use client";

import {
  Bar,
  Pie,
  Cell,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  PieChart,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import React from "react";
import { formatShortDate } from "@/utils/formatters";
import { DashboardAnalytics } from "@/types/analytics.types";
import { EmptyState } from "@/components/shared/EmptyState";

const PIE_COLORS = [
  "#3b82f6",
  "#f59e0b",
  "#10b981",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#64748b",
];

interface AnalyticsChartsProps {
  analytics: DashboardAnalytics;
}

export function AnalyticsCharts({ analytics }: AnalyticsChartsProps) {
  const { patientsPerDoctor, dateStats, conditionDistribution, summary } =
    analytics;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
      {/* Date-Based Registration Statistics (WowDash Sales Statistic style) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs xl:col-span-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Registration Statistics
            </h2>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-900">
                {summary.totalPatients + summary.totalDoctors}
              </span>
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                Active Records
              </span>
              <span className="text-xs text-slate-500">
                Doctors &amp; Patients timeline
              </span>
            </div>
          </div>
        </div>

        {dateStats.length === 0 ? (
          <EmptyState
            title="No Data Found"
            description="No registration activity recorded for the selected date range."
          />
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dateStats}
                margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="patientsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="doctorsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  tickFormatter={formatShortDate}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />
                <Tooltip
                  labelFormatter={(label) => formatShortDate(String(label))}
                  contentStyle={{
                    borderRadius: "12px",
                    borderColor: "#e2e8f0",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="patients"
                  name="Patients"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#patientsGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="doctors"
                  name="Doctors"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#doctorsGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Patients per Doctor (WowDash Total Subscriber Bar style) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs xl:col-span-3">
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900">
            Patients / Doctor
          </h2>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-900">
              {summary.avgPatientsPerDoctor}
            </span>
            <span className="rounded-md bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-700">
              Avg Load
            </span>
          </div>
        </div>

        {patientsPerDoctor.length === 0 ? (
          <EmptyState
            title="No Data Found"
            description="Add doctors and patients to view workload."
          />
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={patientsPerDoctor.slice(0, 6)}
                margin={{ top: 8, right: 4, left: -24, bottom: 18 }}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  tickFormatter={(val: string) =>
                    val.replace(/^Dr\.\s+/i, "").split(" ")[0]
                  }
                  interval={0}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    borderColor: "#e2e8f0",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="patientCount"
                  name="Patients"
                  fill="#6366f1"
                  radius={[8, 8, 4, 4]}
                  maxBarSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Condition Breakdown (WowDash Users Overview Donut style) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs xl:col-span-3">
        <div className="mb-2">
          <h2 className="text-base font-bold text-slate-900">
            Conditions Overview
          </h2>
          <p className="text-xs text-slate-500">
            Distribution by patient condition
          </p>
        </div>

        {conditionDistribution.length === 0 ? (
          <EmptyState
            title="No Data Found"
            description="No condition records found."
          />
        ) : (
          <>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={conditionDistribution}
                    dataKey="count"
                    nameKey="condition"
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={76}
                    paddingAngle={3}
                  >
                    {conditionDistribution.map((entry, idx) => (
                      <Cell
                        key={entry.condition}
                        fill={PIE_COLORS[idx % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      borderColor: "#e2e8f0",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
              {conditionDistribution.slice(0, 4).map((item, idx) => (
                <div
                  key={item.condition}
                  className="flex items-center gap-1.5 text-xs"
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-xs"
                    style={{
                      backgroundColor: PIE_COLORS[idx % PIE_COLORS.length],
                    }}
                  />
                  <span className="truncate text-slate-600">
                    {item.condition}:
                  </span>
                  <span className="font-semibold text-slate-900">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
