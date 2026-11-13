'use client';

import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/shared/Modal';
import { FormField, inputClassName } from '@/components/shared/FormField';
import { SPECIALIZATIONS } from '@/utils/constants';
import { Doctor } from '@/types/doctor.types';
import { useCreateDoctorMutation, useUpdateDoctorMutation } from '@/store/api/doctorsApi';

interface DoctorFormModalProps {
  open: boolean;
  onClose: () => void;
  doctor?: Doctor | null;
}

const initialForm = {
  name: '',
  specialization: 'Cardiology',
  hospital: '',
  phone: '',
  email: '',
};

export function DoctorFormModal({ open, onClose, doctor }: DoctorFormModalProps) {
  const isEditing = Boolean(doctor);
  const [form, setForm] = useState(initialForm);
  const [errorMsg, setErrorMsg] = useState('');

  const [createDoctor, { isLoading: isCreating }] = useCreateDoctorMutation();
  const [updateDoctor, { isLoading: isUpdating }] = useUpdateDoctorMutation();
  const isSubmitting = isCreating || isUpdating;

  useEffect(() => {
    if (doctor) {
      setForm({
        name: doctor.name,
        specialization: doctor.specialization,
        hospital: doctor.hospital,
        phone: doctor.phone,
        email: doctor.email,
      });
    } else {
      setForm(initialForm);
    }
    setErrorMsg('');
  }, [doctor, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      if (isEditing && doctor) {
        await updateDoctor({ id: doctor._id, ...form }).unwrap();
      } else {
        await createDoctor(form).unwrap();
      }
      onClose();
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      setErrorMsg(apiErr?.data?.message || 'Failed to save doctor. Please check your inputs.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? 'Edit Doctor' : 'Add New Doctor'}
      description={
        isEditing
          ? 'Update doctor profile details.'
          : 'Register a new doctor into the Care Guide portal.'
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
            {errorMsg}
          </div>
        )}

        <FormField label="Full Name" htmlFor="doctor-name" required>
          <input
            id="doctor-name"
            type="text"
            required
            placeholder="e.g. Dr. Sarah Jenkins"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className={inputClassName}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Specialization" htmlFor="doctor-specialization" required>
            <select
              id="doctor-specialization"
              required
              value={form.specialization}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, specialization: e.target.value }))
              }
              className={inputClassName}
            >
              {SPECIALIZATIONS.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Hospital / Clinic" htmlFor="doctor-hospital" required>
            <input
              id="doctor-hospital"
              type="text"
              required
              placeholder="e.g. Metro General Hospital"
              value={form.hospital}
              onChange={(e) => setForm((prev) => ({ ...prev, hospital: e.target.value }))}
              className={inputClassName}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Phone" htmlFor="doctor-phone" required>
            <input
              id="doctor-phone"
              type="text"
              required
              placeholder="e.g. +1-555-0199"
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              className={inputClassName}
            />
          </FormField>

          <FormField label="Email" htmlFor="doctor-email" required>
            <input
              id="doctor-email"
              type="email"
              required
              placeholder="e.g. doctor@careguide.com"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className={inputClassName}
            />
          </FormField>
        </div>

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
            {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Doctor'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

