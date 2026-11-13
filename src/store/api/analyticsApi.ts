import { baseApi } from './baseApi';
import { ApiResponse } from '@/types/api.types';
import { AnalyticsQueryParams, DashboardAnalytics } from '@/types/analytics.types';

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardAnalytics: builder.query<
      ApiResponse<DashboardAnalytics>,
      AnalyticsQueryParams | void
    >({
      query: (params) => ({
        url: '/analytics/dashboard',
        params: params || undefined,
      }),
      providesTags: ['Analytics'],
    }),
  }),
});

export const { useGetDashboardAnalyticsQuery } = analyticsApi;

