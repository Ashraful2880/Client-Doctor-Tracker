export const SPECIALIZATIONS = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "Endocrinology",
  "Pulmonology",
  "General Medicine",
] as const;

export const PATIENT_CONDITIONS = [
  "Hypertension",
  "Diabetes",
  "Cardiology",
  "Respiratory",
  "Orthopedic",
  "Neurological",
  "General",
] as const;

export const GENDERS = ["Male", "Female", "Other"] as const;

export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const;

export const AUTH_TOKEN_KEY = "doctor_tracker_token";
export const AUTH_USER_KEY = "doctor_tracker_user";
