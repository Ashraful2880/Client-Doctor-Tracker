'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Stethoscope, Users, Activity, Layers, ArrowRight } from 'lucide-react';
import { useGetDashboardAnalyticsQuery } from '@/store/api/analyticsApi';
import { PageHeader } from '@/components/shared/PageHeader';
import { FilterBar } from '@/components/shared/FilterBar';
import { StatCard } from '@/components/shared/StatCard';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { AnalyticsCharts } from '@/components/features/dashboard/AnalyticsCharts';

export default function DashboardPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data, isLoading, isError, refetch } = useGetDashboardAnalyticsQuery({
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  });

  const analytics = data?.data;
  const hasDateFilter = Boolean(startDate || endDate);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clinical Overview"
        description="Real-time analytics across registered doctors, patients, and medical conditions."
        actions={
          <>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Manage Doctors
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/patients"
              className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700"
            >
              View Patients
              <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        }
      />

      <FilterBar
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        hasActiveFilters={hasDateFilter}
        onReset={() => {
          setStartDate('');
          setEndDate('');
        }}
      />

      {isLoading ? (
        <div className="space-y-6">
          <LoadingSkeleton variant="stat-grid" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Doctors"
              value={analytics.summary.totalDoctors}
              subtext="Active medical practitioners"
              icon={<Stethoscope className="h-5 w-5" />}
              accentClass="bg-sky-50 text-sky-600"
            />
            <StatCard
              label="Total Patients"
              value={analytics.summary.totalPatients}
              subtext="Registered across all doctors"
              icon={<Users className="h-5 w-5" />}
              accentClass="bg-emerald-50 text-emerald-600"
            />
            <StatCard
              label="Avg. Patients / Doctor"
              value={analytics.summary.avgPatientsPerDoctor}
              subtext="Current care load ratio"
              icon={<Activity className="h-5 w-5" />}
              accentClass="bg-violet-50 text-violet-600"
            />
            <StatCard
              label="Specializations"
              value={analytics.summary.totalSpecializations}
              subtext="Distinct clinical departments"
              icon={<Layers className="h-5 w-5" />}
              accentClass="bg-amber-50 text-amber-600"
            />
          </div>

          <AnalyticsCharts analytics={analytics} />
        </>
      )}
    </div>
  );
}

