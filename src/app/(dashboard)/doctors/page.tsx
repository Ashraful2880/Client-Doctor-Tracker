'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import {
  useDeleteDoctorMutation,
  useGetDoctorsQuery,
} from '@/store/api/doctorsApi';
import { Doctor } from '@/types/doctor.types';
import { SPECIALIZATIONS } from '@/utils/constants';
import { formatDate } from '@/utils/formatters';
import { PageHeader } from '@/components/shared/PageHeader';
import { FilterBar } from '@/components/shared/FilterBar';
import { DataTable, TableColumn } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { DoctorFormModal } from '@/components/features/doctors/DoctorFormModal';

export default function DoctorsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [deletingDoctor, setDeletingDoctor] = useState<Doctor | null>(null);

  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading, isFetching, isError, refetch } = useGetDoctorsQuery({
    page,
    limit,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(specialization && { specialization }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  });

  const [deleteDoctor, { isLoading: isDeleting }] = useDeleteDoctorMutation();

  const hasActiveFilters = Boolean(search || specialization || startDate || endDate);

  const resetFilters = () => {
    setSearch('');
    setSpecialization('');
    setStartDate('');
    setEndDate('');
    setPage(1);
  };

  const handleConfirmDelete = async () => {
    if (!deletingDoctor) return;
    await deleteDoctor(deletingDoctor._id).unwrap();
    setDeletingDoctor(null);
  };

  const columns: TableColumn<Doctor>[] = useMemo(
    () => [
      {
        key: 'name',
        header: 'Doctor',
        render: (doc) => (
          <div>
            <Link
              href={`/doctors/${doc._id}`}
              className="font-semibold text-slate-900 transition hover:text-sky-600"
            >
              {doc.name}
            </Link>
            <p className="text-xs text-slate-500">{doc.email}</p>
          </div>
        ),
      },
      {
        key: 'specialization',
        header: 'Specialization',
        render: (doc) => <StatusBadge label={doc.specialization} />,
      },
      {
        key: 'hospital',
        header: 'Hospital',
        render: (doc) => <span className="text-slate-700">{doc.hospital}</span>,
      },
      {
        key: 'phone',
        header: 'Phone',
        render: (doc) => <span className="text-slate-600">{doc.phone}</span>,
      },
      {
        key: 'patientCount',
        header: 'Patients',
        render: (doc) => (
          <Link
            href={`/doctors/${doc._id}`}
            className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
          >
            {doc.patientCount} patients
          </Link>
        ),
      },
      {
        key: 'createdAt',
        header: 'Added',
        render: (doc) => (
          <span className="text-xs text-slate-500">{formatDate(doc.createdAt)}</span>
        ),
      },
      {
        key: 'actions',
        header: 'Actions',
        className: 'text-right',
        render: (doc) => (
          <div className="flex items-center justify-end gap-1.5">
            <Link
              href={`/doctors/${doc._id}`}
              title="View Patients"
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-sky-50 hover:text-sky-600"
            >
              <Eye className="h-4 w-4" />
            </Link>
            <button
              type="button"
              title="Edit Doctor"
              onClick={() => {
                setEditingDoctor(doc);
                setFormModalOpen(true);
              }}
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Delete Doctor"
              onClick={() => setDeletingDoctor(doc)}
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Doctors"
        description="Manage medical practitioners, view specializations, and inspect assigned patients."
        actions={
          <button
            type="button"
            onClick={() => {
              setEditingDoctor(null);
              setFormModalOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700"
          >
            <Plus className="h-4 w-4" />
            Add Doctor
          </button>
        }
      />

      <FilterBar
        search={search}
        searchPlaceholder="Search by name, hospital, email, phone..."
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        selectFilters={[
          {
            id: 'specialization-filter',
            label: 'Specialization',
            value: specialization,
            options: SPECIALIZATIONS.map((s) => ({ label: s, value: s })),
            onChange: (val) => {
              setSpecialization(val);
              setPage(1);
            },
          },
        ]}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={(val) => {
          setStartDate(val);
          setPage(1);
        }}
        onEndDateChange={(val) => {
          setEndDate(val);
          setPage(1);
        }}
        hasActiveFilters={hasActiveFilters}
        onReset={resetFilters}
      />

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        rowKey={(doc) => doc._id}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        onRetry={refetch}
        emptyTitle="No Doctors Found"
        emptyDescription={
          hasActiveFilters
            ? 'No doctors match your current search or filter criteria.'
            : 'Get started by registering your first doctor.'
        }
        emptyActionLabel={hasActiveFilters ? 'Reset Filters' : 'Add Doctor'}
        onEmptyAction={
          hasActiveFilters
            ? resetFilters
            : () => {
                setEditingDoctor(null);
                setFormModalOpen(true);
              }
        }
        meta={data?.meta}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />

      <DoctorFormModal
        open={formModalOpen}
        onClose={() => {
          setFormModalOpen(false);
          setEditingDoctor(null);
        }}
        doctor={editingDoctor}
      />

      <ConfirmDialog
        open={Boolean(deletingDoctor)}
        onClose={() => setDeletingDoctor(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Doctor"
        message={`Are you sure you want to delete ${deletingDoctor?.name ?? 'this doctor'}? This will also remove their assigned patient records.`}
        isLoading={isDeleting}
      />
    </div>
  );
}

