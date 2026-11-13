'use client';

import React, { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Building2, Mail, Phone, Plus, Trash2, Users } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetDoctorByIdQuery } from '@/store/api/doctorsApi';
import {
  useDeletePatientMutation,
  useGetPatientsQuery,
} from '@/store/api/patientsApi';
import { Patient } from '@/types/patient.types';
import { PATIENT_CONDITIONS } from '@/utils/constants';
import { formatDate } from '@/utils/formatters';
import { PageHeader } from '@/components/shared/PageHeader';
import { FilterBar } from '@/components/shared/FilterBar';
import { DataTable, TableColumn } from '@/components/shared/DataTable';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { PatientFormModal } from '@/components/features/patients/PatientFormModal';

export default function DoctorDetailPage() {
  const params = useParams();
  const doctorId = String(params.id);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [condition, setCondition] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [addPatientOpen, setAddPatientOpen] = useState(false);
  const [deletingPatient, setDeletingPatient] = useState<Patient | null>(null);

  const debouncedSearch = useDebounce(search, 350);

  const {
    data: doctorRes,
    isLoading: isDoctorLoading,
    isError: isDoctorError,
    refetch: refetchDoctor,
  } = useGetDoctorByIdQuery(doctorId);

  const {
    data: patientsRes,
    isLoading: isPatientsLoading,
    isFetching: isPatientsFetching,
    isError: isPatientsError,
    refetch: refetchPatients,
  } = useGetPatientsQuery({
    doctorId,
    page,
    limit,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(condition && { condition }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  });

  const [deletePatient, { isLoading: isDeleting }] = useDeletePatientMutation();
  const doctor = doctorRes?.data;
  const hasActiveFilters = Boolean(search || condition || startDate || endDate);

  const resetFilters = () => {
    setSearch('');
    setCondition('');
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
          <button
            type="button"
            title="Remove Patient"
            onClick={() => setDeletingPatient(p)}
            className="inline-flex items-center gap-1 rounded-lg p-1.5 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={doctor?.name ?? 'Doctor Details'}
        description="View doctor profile and manage their assigned patients."
        backHref="/doctors"
        backLabel="Back to Doctors"
        actions={
          <button
            type="button"
            onClick={() => setAddPatientOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700"
          >
            <Plus className="h-4 w-4" />
            Add Patient
          </button>
        }
      />

      {isDoctorLoading ? (
        <LoadingSkeleton variant="detail" />
      ) : isDoctorError || !doctor ? (
        <ErrorState
          title="Unable to load doctor details"
          onRetry={refetchDoctor}
        />
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-lg font-bold text-slate-900">{doctor.name}</h2>
                <StatusBadge label={doctor.specialization} />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Registered on {formatDate(doctor.createdAt)}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-sky-50 px-3.5 py-2 text-sm font-semibold text-sky-700">
              <Users className="h-4 w-4" />
              {doctor.patientCount} Assigned Patients
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3">
            <div className="flex items-center gap-2.5 text-sm text-slate-600">
              <Building2 className="h-4 w-4 text-slate-400" />
              <span>{doctor.hospital}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-600">
              <Phone className="h-4 w-4 text-slate-400" />
              <span>{doctor.phone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-600">
              <Mail className="h-4 w-4 text-slate-400" />
              <span className="truncate">{doctor.email}</span>
            </div>
          </div>
        </div>
      )}

      <FilterBar
        search={search}
        searchPlaceholder="Search assigned patients by name, phone, condition..."
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        selectFilters={[
          {
            id: 'doctor-patient-condition',
            label: 'Condition',
            value: condition,
            options: PATIENT_CONDITIONS.map((c) => ({ label: c, value: c })),
            onChange: (val) => {
              setCondition(val);
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
        data={patientsRes?.data ?? []}
        rowKey={(p) => p._id}
        isLoading={isPatientsLoading}
        isFetching={isPatientsFetching}
        isError={isPatientsError}
        onRetry={refetchPatients}
        emptyTitle="No Patients Found"
        emptyDescription={
          hasActiveFilters
            ? 'No patients match your search or filter criteria.'
            : 'This doctor currently has no assigned patients.'
        }
        emptyActionLabel={hasActiveFilters ? 'Reset Filters' : 'Add Patient'}
        onEmptyAction={hasActiveFilters ? resetFilters : () => setAddPatientOpen(true)}
        meta={patientsRes?.meta}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />

      <PatientFormModal
        open={addPatientOpen}
        onClose={() => setAddPatientOpen(false)}
        lockedDoctorId={doctorId}
      />

      <ConfirmDialog
        open={Boolean(deletingPatient)}
        onClose={() => setDeletingPatient(null)}
        onConfirm={handleConfirmDelete}
        title="Remove Patient"
        message={`Are you sure you want to remove ${deletingPatient?.name ?? 'this patient'} from ${doctor?.name ?? 'this doctor'}?`}
        isLoading={isDeleting}
      />
    </div>
  );
}

