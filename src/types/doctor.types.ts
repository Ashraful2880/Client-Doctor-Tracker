export interface Doctor {
  _id: string;
  name: string;
  phone: string;
  email: string;
  hospital: string;
  createdAt: string;
  updatedAt: string;
  patientCount: number;
  specialization: string;
}

export interface DoctorOption {
  _id: string;
  name: string;
  hospital: string;
  specialization: string;
}

export interface DoctorQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  endDate?: string;
  hospital?: string;
  startDate?: string;
  specialization?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateDoctorPayload {
  name: string;
  phone: string;
  email: string;
  hospital: string;
  specialization: string;
}

export type UpdateDoctorPayload = Partial<CreateDoctorPayload> & { id: string };

export interface DoctorFormModalProps {
  open: boolean;
  onClose: () => void;
  doctor?: Doctor | null;
}