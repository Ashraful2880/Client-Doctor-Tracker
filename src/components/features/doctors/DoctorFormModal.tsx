"use client";

import {
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
} from "@/store/api/doctorsApi";
import { Modal } from "@/components/shared/Modal";
import React, { useEffect, useState } from "react";
import { SPECIALIZATIONS } from "@/utils/constants";
import { DoctorFormModalProps } from "@/types/doctor.types";
import { CustomSelect } from "@/components/shared/CustomSelect";
import { FormField, inputClassName } from "@/components/shared/FormField";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  hospital: "",
  specialization: "Cardiology",
};

export function DoctorFormModal({
  open,
  onClose,
  doctor,
}: DoctorFormModalProps) {
  const isEditing = Boolean(doctor);
  const [form, setForm] = useState(initialForm);
  const [errorMsg, setErrorMsg] = useState("");

  const [createDoctor, { isLoading: isCreating }] = useCreateDoctorMutation();
  const [updateDoctor, { isLoading: isUpdating }] = useUpdateDoctorMutation();
  const isSubmitting = isCreating || isUpdating;

  useEffect(() => {
    if (doctor) {
      setForm({
        name: doctor.name,
        phone: doctor.phone,
        email: doctor.email,
        hospital: doctor.hospital,
        specialization: doctor.specialization,
      });
    } else {
      setForm(initialForm);
    }
    setErrorMsg("");
  }, [doctor, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      if (isEditing && doctor) {
        await updateDoctor({ id: doctor._id, ...form }).unwrap();
      } else {
        await createDoctor(form).unwrap();
      }
      onClose();
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      setErrorMsg(
        apiErr?.data?.message ||
          "Failed to save doctor. Please check your inputs.",
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? "Edit Doctor" : "Add New Doctor"}
      description={
        isEditing
          ? "Update doctor profile details."
          : "Register a new doctor into the Care Guide portal."
      }
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {errorMsg && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
            {errorMsg}
          </div>
        )}

        <FormField label="Full Name" htmlFor="doctor-name" required>
          <input
            required
            type="text"
            id="doctor-name"
            value={form.name}
            className={inputClassName}
            placeholder="e.g. Dr. Sarah Jenkins"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </FormField>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FormField
            label="Specialization"
            htmlFor="doctor-specialization"
            required
          >
            <CustomSelect
              id="doctor-specialization"
              value={form.specialization}
              options={SPECIALIZATIONS.map((spec) => ({
                label: spec,
                value: spec,
              }))}
              onChange={(val) =>
                setForm((prev) => ({ ...prev, specialization: val }))
              }
            />
          </FormField>

          <FormField
            label="Hospital / Clinic"
            htmlFor="doctor-hospital"
            required
          >
            <input
              required
              type="text"
              id="doctor-hospital"
              value={form.hospital}
              className={inputClassName}
              placeholder="e.g. Metro General Hospital"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, hospital: e.target.value }))
              }
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FormField label="Phone" htmlFor="doctor-phone" required>
            <input
              required
              type="text"
              id="doctor-phone"
              value={form.phone}
              className={inputClassName}
              placeholder="e.g. +1-555-0199"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </FormField>

          <FormField label="Email" htmlFor="doctor-email" required>
            <input
              required
              type="email"
              id="doctor-email"
              value={form.email}
              className={inputClassName}
              placeholder="e.g. doctor@careguide.com"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
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
            {isSubmitting
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Create Doctor"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
