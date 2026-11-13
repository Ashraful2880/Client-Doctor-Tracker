'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { DashboardAnalytics } from '@/types/analytics.types';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatShortDate } from '@/utils/formatters';

const PIE_COLORS = [
  '#0284c7',
  '#0ea5e9',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#64748b',
];

interface AnalyticsChartsProps {
  analytics: DashboardAnalytics;
}

export function AnalyticsCharts({ analytics }: AnalyticsChartsProps) {
  const { patientsPerDoctor, dateStats, conditionDistribution } = analytics;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Patients per Doctor */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-900">Patients per Doctor</h2>
          <p className="text-xs text-slate-500">
            Patient load distribution across top registered doctors
          </p>
        </div>

        {patientsPerDoctor.length === 0 ? (
          <EmptyState
            title="No Data Found"
            description="Add doctors and patients to visualize workload distribution."
          />
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={patientsPerDoctor}
                margin={{ top: 8, right: 12, left: -12, bottom: 24 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={(val: string) => val.replace(/^Dr\.\s+/i, '')}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '10px',
                    borderColor: '#e2e8f0',
                    fontSize: '12px',
                  }}
                />
                <Bar
                  dataKey="patientCount"
                  name="Patients"
                  fill="#0284c7"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={42}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Date-Based Statistics */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-900">Date-Based Statistics</h2>
          <p className="text-xs text-slate-500">
            Daily doctor &amp; patient registration timeline
          </p>
        </div>

        {dateStats.length === 0 ? (
          <EmptyState
            title="No Data Found"
            description="No registration activity recorded for the selected date range."
          />
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dateStats}
                margin={{ top: 8, right: 12, left: -12, bottom: 8 }}
              >
                <defs>
                  <linearGradient id="patientsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="doctorsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={formatShortDate}
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  labelFormatter={(label) => formatShortDate(String(label))}
                  contentStyle={{
                    borderRadius: '10px',
                    borderColor: '#e2e8f0',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area
                  type="monotone"
                  dataKey="patients"
                  name="Patients"
                  stroke="#0284c7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#patientsGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="doctors"
                  name="Doctors"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#doctorsGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Patient Condition Distribution */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-900">
            Patient Condition Breakdown
          </h2>
          <p className="text-xs text-slate-500">
            Distribution of patients across clinical conditions
          </p>
        </div>

        {conditionDistribution.length === 0 ? (
          <EmptyState
            title="No Data Found"
            description="No patient condition records found for the selected filter."
          />
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conditionDistribution}
                  dataKey="count"
                  nameKey="condition"
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={95}
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
                    borderRadius: '10px',
                    borderColor: '#e2e8f0',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

