'use client';

import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/shared/Modal';
import { FormField, inputClassName } from '@/components/shared/FormField';
import { GENDERS, PATIENT_CONDITIONS } from '@/utils/constants';
import { Gender, Patient } from '@/types/patient.types';
import { useGetDoctorOptionsQuery } from '@/store/api/doctorsApi';
import {
  useCreatePatientMutation,
  useUpdatePatientMutation,
} from '@/store/api/patientsApi';

interface PatientFormModalProps {
  open: boolean;
  onClose: () => void;
  patient?: Patient | null;
  lockedDoctorId?: string;
}

export function PatientFormModal({
  open,
  onClose,
  patient,
  lockedDoctorId,
}: PatientFormModalProps) {
  const isEditing = Boolean(patient);
  const { data: doctorOptionsRes } = useGetDoctorOptionsQuery(undefined, { skip: !open });
  const doctorOptions = doctorOptionsRes?.data ?? [];

  const [form, setForm] = useState({
    name: '',
    age: '30',
    gender: 'Male' as Gender,
    phone: '',
    email: '',
    condition: 'General',
    notes: '',
    doctorId: lockedDoctorId || '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const [createPatient, { isLoading: isCreating }] = useCreatePatientMutation();
  const [updatePatient, { isLoading: isUpdating }] = useUpdatePatientMutation();
  const isSubmitting = isCreating || isUpdating;

  useEffect(() => {
    if (patient) {
      const docId =
        typeof patient.doctorId === 'string' ? patient.doctorId : patient.doctorId?._id || '';
      setForm({
        name: patient.name,
        age: String(patient.age),
        gender: patient.gender,
        phone: patient.phone,
        email: patient.email || '',
        condition: patient.condition,
        notes: patient.notes || '',
        doctorId: lockedDoctorId || docId,
      });
    } else {
      setForm({
        name: '',
        age: '30',
        gender: 'Male',
        phone: '',
        email: '',
        condition: 'General',
        notes: '',
        doctorId: lockedDoctorId || doctorOptions[0]?._id || '',
      });
    }
    setErrorMsg('');
  }, [patient, open, lockedDoctorId, doctorOptions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const payload = {
      name: form.name,
      age: Number(form.age),
      gender: form.gender,
      phone: form.phone,
      email: form.email || undefined,
      condition: form.condition,
      notes: form.notes || undefined,
      doctorId: lockedDoctorId || form.doctorId,
    };

    try {
      if (isEditing && patient) {
        await updatePatient({ id: patient._id, ...payload }).unwrap();
      } else {
        await createPatient(payload).unwrap();
      }
      onClose();
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      setErrorMsg(apiErr?.data?.message || 'Failed to save patient. Please check your inputs.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? 'Edit Patient' : 'Add New Patient'}
      description={
        isEditing
          ? 'Update patient clinical and contact information.'
          : 'Register a new patient and assign them to a doctor.'
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
            {errorMsg}
          </div>
        )}

        <FormField label="Patient Name" htmlFor="patient-name" required>
          <input
            id="patient-name"
            type="text"
            required
            placeholder="e.g. Liam Carter"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className={inputClassName}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField label="Age" htmlFor="patient-age" required>
            <input
              id="patient-age"
              type="number"
              min={0}
              max={150}
              required
              value={form.age}
              onChange={(e) => setForm((prev) => ({ ...prev, age: e.target.value }))}
              className={inputClassName}
            />
          </FormField>

          <FormField label="Gender" htmlFor="patient-gender" required>
            <select
              id="patient-gender"
              required
              value={form.gender}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, gender: e.target.value as Gender }))
              }
              className={inputClassName}
            >
              {GENDERS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Condition" htmlFor="patient-condition" required>
            <select
              id="patient-condition"
              required
              value={form.condition}
              onChange={(e) => setForm((prev) => ({ ...prev, condition: e.target.value }))}
              className={inputClassName}
            >
              {PATIENT_CONDITIONS.map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Phone" htmlFor="patient-phone" required>
            <input
              id="patient-phone"
              type="text"
              required
              placeholder="e.g. +1-555-0244"
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              className={inputClassName}
            />
          </FormField>

          <FormField label="Email (Optional)" htmlFor="patient-email">
            <input
              id="patient-email"
              type="email"
              placeholder="e.g. patient@example.com"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className={inputClassName}
            />
          </FormField>
        </div>

        {!lockedDoctorId && (
          <FormField label="Assigned Doctor" htmlFor="patient-doctor" required>
            <select
              id="patient-doctor"
              required
              value={form.doctorId}
              onChange={(e) => setForm((prev) => ({ ...prev, doctorId: e.target.value }))}
              className={inputClassName}
            >
              <option value="" disabled>
                Select a doctor
              </option>
              {doctorOptions.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.name} ({doc.specialization})
                </option>
              ))}
            </select>
          </FormField>
        )}

        <FormField label="Clinical Notes (Optional)" htmlFor="patient-notes">
          <textarea
            id="patient-notes"
            rows={2}
            placeholder="Brief clinical notes or follow-up details..."
            value={form.notes}
            onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
            className={inputClassName}
          />
        </FormField>

        <div className="flex justify-end gap-2.5 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-60"
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Patient'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

