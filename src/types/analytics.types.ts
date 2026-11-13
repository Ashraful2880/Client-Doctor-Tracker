export interface DashboardAnalytics {
  summary: {
    totalDoctors: number;
    totalPatients: number;
    avgPatientsPerDoctor: number;
    totalSpecializations: number;
  };
  patientsPerDoctor: Array<{
    doctorId: string;
    name: string;
    specialization: string;
    patientCount: number;
  }>;
  conditionDistribution: Array<{
    condition: string;
    count: number;
  }>;
  dateStats: Array<{
    date: string;
    doctors: number;
    patients: number;
  }>;
}

export interface AnalyticsQueryParams {
  startDate?: string;
  endDate?: string;
}

