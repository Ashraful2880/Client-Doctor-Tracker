import { DoctorOption } from './doctor.types';

export type Gender = 'Male' | 'Female' | 'Other';

export interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: Gender;
  phone: string;
  email?: string;
  condition: string;
  notes?: string;
  doctorId: DoctorOption | string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  condition?: string;
  doctorId?: string;
  gender?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreatePatientPayload {
  name: string;
  age: number;
  gender: Gender;
  phone: string;
  email?: string;
  condition: string;
  notes?: string;
  doctorId: string;
}

export type UpdatePatientPayload = Partial<CreatePatientPayload> & { id: string };

