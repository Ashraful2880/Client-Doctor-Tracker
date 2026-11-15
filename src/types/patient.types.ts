import { DoctorOption } from './doctor.types';

export type Gender = 'Male' | 'Female' | 'Other';

export interface Patient {
  _id: string;
  age: number;
  name: string;
  phone: string;
  gender: Gender;
  email?: string;
  notes?: string;
  condition: string;
  createdAt: string;
  updatedAt: string;
  doctorId: DoctorOption | string;
}

export interface PatientQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  gender?: string;
  sortBy?: string;
  endDate?: string;
  doctorId?: string;
  condition?: string;
  startDate?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreatePatientPayload {
  age: number;
  name: string;
  phone: string;
  gender: Gender;
  email?: string;
  notes?: string;
  doctorId: string;
  condition: string;
}

export type UpdatePatientPayload = Partial<CreatePatientPayload> & { id: string };

export interface PatientFormModalProps {
  open: boolean;
  onClose: () => void;
  lockedDoctorId?: string;
  patient?: Patient | null;
}