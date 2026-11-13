export interface DashboardAnalytics {
  summary: {
    totalDoctors: number;
    totalPatients: number;
    avgPatientsPerDoctor: number;
    totalSpecializations: number;
  };
  patientsPerDoctor: Array<{
    name: string;
    doctorId: string;
    patientCount: number;
    specialization: string;
  }>;
  conditionDistribution: Array<{
    count: number;
    condition: string;
  }>;
  dateStats: Array<{
    date: string;
    doctors: number;
    patients: number;
  }>;
}

export interface AnalyticsQueryParams {
  endDate?: string;
  startDate?: string;
}

