"use client";

import {
  useCreatePatientMutation,
  useUpdatePatientMutation,
} from "@/store/api/patientsApi";
import { Modal } from "@/components/shared/Modal";
import React, { useEffect, useMemo, useState } from "react";
import { CustomSelect } from "@/components/shared/CustomSelect";
import { GENDERS, PATIENT_CONDITIONS } from "@/utils/constants";
import { useGetDoctorOptionsQuery } from "@/store/api/doctorsApi";
import { Gender, PatientFormModalProps } from "@/types/patient.types";
import { FormField, inputClassName } from "@/components/shared/FormField";

export function PatientFormModal({
  open,
  onClose,
  patient,
  lockedDoctorId,
}: PatientFormModalProps) {
  const isEditing = Boolean(patient);
  const { data: doctorOptionsRes } = useGetDoctorOptionsQuery(undefined, {
    skip: !open,
  });
  const doctorOptions = useMemo(
    () => doctorOptionsRes?.data ?? [],
    [doctorOptionsRes?.data]
  );
  const firstDoctorId = doctorOptions[0]?._id ?? "";

  const [form, setForm] = useState({
    name: "",
    age: "30",
    phone: "",
    email: "",
    notes: "",
    condition: "General",
    gender: "Male" as Gender,
    doctorId: lockedDoctorId || "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const [createPatient, { isLoading: isCreating }] = useCreatePatientMutation();
  const [updatePatient, { isLoading: isUpdating }] = useUpdatePatientMutation();
  const isSubmitting = isCreating || isUpdating;

  useEffect(() => {
    if (!open) return;

    if (patient) {
      const docId =
        typeof patient.doctorId === "string"
          ? patient.doctorId
          : patient.doctorId?._id || "";
      setForm({
        name: patient.name,
        phone: patient.phone,
        gender: patient.gender,
        age: String(patient.age),
        email: patient.email || "",
        notes: patient.notes || "",
        condition: patient.condition,
        doctorId: lockedDoctorId || docId,
      });
    } else {
      setForm({
        name: "",
        age: "30",
        phone: "",
        email: "",
        notes: "",
        gender: "Male",
        condition: "General",
        doctorId: lockedDoctorId || firstDoctorId,
      });
    }
    setErrorMsg("");
  }, [patient, open, lockedDoctorId, firstDoctorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const payload = {
      name: form.name,
      phone: form.phone,
      gender: form.gender,
      age: Number(form.age),
      condition: form.condition,
      email: form.email || undefined,
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
      setErrorMsg(
        apiErr?.data?.message ||
          "Failed to save patient. Please check your inputs.",
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? "Edit Patient" : "Add New Patient"}
      description={
        isEditing
          ? "Update patient clinical and contact information."
          : "Register a new patient and assign them to a doctor."
      }
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {errorMsg && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
            {errorMsg}
          </div>
        )}

        <FormField label="Patient Name" htmlFor="patient-name" required>
          <input
            required
            type="text"
            id="patient-name"
            value={form.name}
            className={inputClassName}
            placeholder="e.g. Liam Carter"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </FormField>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <FormField label="Age" htmlFor="patient-age" required>
            <input
              min={0}
              required
              max={150}
              type="number"
              id="patient-age"
              value={form.age}
              className={inputClassName}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, age: e.target.value }))
              }
            />
          </FormField>

          <FormField label="Gender" htmlFor="patient-gender" required>
            <CustomSelect
              id="patient-gender"
              value={form.gender}
              options={GENDERS.map((g) => ({ label: g, value: g }))}
              onChange={(val) =>
                setForm((prev) => ({ ...prev, gender: val as Gender }))
              }
            />
          </FormField>

          <FormField label="Condition" htmlFor="patient-condition" required>
            <CustomSelect
              id="patient-condition"
              value={form.condition}
              options={PATIENT_CONDITIONS.map((cond) => ({
                label: cond,
                value: cond,
              }))}
              onChange={(val) =>
                setForm((prev) => ({ ...prev, condition: val }))
              }
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FormField label="Phone" htmlFor="patient-phone" required>
            <input
              required
              type="text"
              id="patient-phone"
              value={form.phone}
              className={inputClassName}
              placeholder="e.g. +1-555-0244"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </FormField>

          <FormField label="Email (Optional)" htmlFor="patient-email">
            <input
              type="email"
              id="patient-email"
              value={form.email}
              className={inputClassName}
              placeholder="e.g. patient@example.com"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </FormField>
        </div>

        {!lockedDoctorId && (
          <FormField label="Assigned Doctor" htmlFor="patient-doctor" required>
            <CustomSelect
              id="patient-doctor"
              value={form.doctorId}
              placeholder="Select a doctor"
              options={doctorOptions.map((doc) => ({
                label: `${doc.name} (${doc.specialization})`,
                value: doc._id,
              }))}
              onChange={(val) =>
                setForm((prev) => ({ ...prev, doctorId: val }))
              }
            />
          </FormField>
        )}

        <FormField label="Clinical Notes (Optional)" htmlFor="patient-notes">
          <textarea
            rows={2}
            id="patient-notes"
            value={form.notes}
            className={inputClassName}
            placeholder="Brief clinical notes or follow-up details..."
            onChange={(e) =>
              setForm((prev) => ({ ...prev, notes: e.target.value }))
            }
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
            {isSubmitting
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Add Patient"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
