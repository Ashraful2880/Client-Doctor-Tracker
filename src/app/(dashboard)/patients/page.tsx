'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetDoctorOptionsQuery } from '@/store/api/doctorsApi';
import {
  useDeletePatientMutation,
  useGetPatientsQuery,
} from '@/store/api/patientsApi';
import { Patient } from '@/types/patient.types';
import { GENDERS, PATIENT_CONDITIONS } from '@/utils/constants';
import { formatDate, getDoctorName } from '@/utils/formatters';
import { PageHeader } from '@/components/shared/PageHeader';
import { FilterBar } from '@/components/shared/FilterBar';
import { DataTable, TableColumn } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { PatientFormModal } from '@/components/features/patients/PatientFormModal';

export default function PatientsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [condition, setCondition] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [gender, setGender] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [deletingPatient, setDeletingPatient] = useState<Patient | null>(null);

  const debouncedSearch = useDebounce(search, 350);

  const { data: doctorOptionsRes } = useGetDoctorOptionsQuery();
  const doctorOptions = doctorOptionsRes?.data ?? [];

  const { data, isLoading, isFetching, isError, refetch } = useGetPatientsQuery({
    page,
    limit,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(condition && { condition }),
    ...(doctorId && { doctorId }),
    ...(gender && { gender }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  });

  const [deletePatient, { isLoading: isDeleting }] = useDeletePatientMutation();

  const hasActiveFilters = Boolean(
    search || condition || doctorId || gender || startDate || endDate
  );

  const resetFilters = () => {
    setSearch('');
    setCondition('');
    setDoctorId('');
    setGender('');
    setStartDate('');
    setEndDate('');
    setPage(1);
  };

  const handleConfirmDelete = async () => {
    if (!deletingPatient) return;
    await deletePatient(deletingPatient._id).unwrap();
    setDeletingPatient(null);
  };

  const columns: TableColumn<Patient>[] = useMemo(
    () => [
      {
        key: 'name',
        header: 'Patient',
        render: (p) => (
          <div>
            <p className="font-semibold text-slate-900">{p.name}</p>
            <p className="text-xs text-slate-500">
              {p.age} yrs &bull; {p.gender}
            </p>
          </div>
        ),
      },
      {
        key: 'condition',
        header: 'Condition',
        render: (p) => <StatusBadge label={p.condition} />,
      },
      {
        key: 'doctor',
        header: 'Assigned Doctor',
        render: (p) => {
          const docObj = typeof p.doctorId === 'string' ? null : p.doctorId;
          return docObj ? (
            <Link
              href={`/doctors/${docObj._id}`}
              className="font-medium text-sky-700 hover:underline"
            >
              {docObj.name}
            </Link>
          ) : (
            <span>{getDoctorName(p.doctorId)}</span>
          );
        },
      },
      {
        key: 'contact',
        header: 'Contact',
        render: (p) => (
          <div>
            <p className="text-slate-700">{p.phone}</p>
            {p.email && <p className="text-xs text-slate-500">{p.email}</p>}
          </div>
        ),
      },
      {
        key: 'createdAt',
        header: 'Registered',
        render: (p) => (
          <span className="text-xs text-slate-500">{formatDate(p.createdAt)}</span>
        ),
      },
      {
        key: 'actions',
        header: 'Actions',
        className: 'text-right',
        render: (p) => (
          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              title="Edit Patient"
              onClick={() => {
                setEditingPatient(p);
                setFormModalOpen(true);
              }}
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Delete Patient"
              onClick={() => setDeletingPatient(p)}
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
        title="Patients"
        description="Browse all patients, filter by medical condition or date, and update records."
        actions={
          <button
            type="button"
            onClick={() => {
              setEditingPatient(null);
              setFormModalOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700"
          >
            <Plus className="h-4 w-4" />
            Add Patient
          </button>
        }
      />

      <FilterBar
        search={search}
        searchPlaceholder="Search by patient name, phone, email, condition..."
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        selectFilters={[
          {
            id: 'condition-filter',
            label: 'Condition',
            value: condition,
            options: PATIENT_CONDITIONS.map((c) => ({ label: c, value: c })),
            onChange: (val) => {
              setCondition(val);
              setPage(1);
            },
          },
          {
            id: 'doctor-filter',
            label: 'Doctor',
            value: doctorId,
            options: doctorOptions.map((d) => ({ label: d.name, value: d._id })),
            onChange: (val) => {
              setDoctorId(val);
              setPage(1);
            },
          },
          {
            id: 'gender-filter',
            label: 'Gender',
            value: gender,
            options: GENDERS.map((g) => ({ label: g, value: g })),
            onChange: (val) => {
              setGender(val);
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
        rowKey={(p) => p._id}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        onRetry={refetch}
        emptyTitle="No Patients Found"
        emptyDescription={
          hasActiveFilters
            ? 'No patients match your current search or filter criteria.'
            : 'No patients have been registered yet.'
        }
        emptyActionLabel={hasActiveFilters ? 'Reset Filters' : 'Add Patient'}
        onEmptyAction={
          hasActiveFilters
            ? resetFilters
            : () => {
                setEditingPatient(null);
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

      <PatientFormModal
        open={formModalOpen}
        onClose={() => {
          setFormModalOpen(false);
          setEditingPatient(null);
        }}
        patient={editingPatient}
      />

      <ConfirmDialog
        open={Boolean(deletingPatient)}
        onClose={() => setDeletingPatient(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Patient"
        message={`Are you sure you want to delete ${deletingPatient?.name ?? 'this patient'}? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
}

