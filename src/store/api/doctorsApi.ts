import { baseApi } from './baseApi';
import { ApiResponse } from '@/types/api.types';
import {
  CreateDoctorPayload,
  Doctor,
  DoctorOption,
  DoctorQueryParams,
  UpdateDoctorPayload,
} from '@/types/doctor.types';

export const doctorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query<ApiResponse<Doctor[]>, DoctorQueryParams | void>({
      query: (params) => ({
        url: '/doctors',
        params: params || undefined,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Doctor' as const, id: _id })),
              { type: 'Doctor', id: 'LIST' },
            ]
          : [{ type: 'Doctor', id: 'LIST' }],
    }),
    getDoctorOptions: builder.query<ApiResponse<DoctorOption[]>, void>({
      query: () => '/doctors/options',
      providesTags: [{ type: 'Doctor', id: 'LIST' }],
    }),
    getDoctorById: builder.query<ApiResponse<Doctor>, string>({
      query: (id) => `/doctors/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Doctor', id }],
    }),
    createDoctor: builder.mutation<ApiResponse<Doctor>, CreateDoctorPayload>({
      query: (body) => ({
        url: '/doctors',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Doctor', id: 'LIST' }, 'Analytics'],
    }),
    updateDoctor: builder.mutation<ApiResponse<Doctor>, UpdateDoctorPayload>({
      query: ({ id, ...body }) => ({
        url: `/doctors/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Doctor', id },
        { type: 'Doctor', id: 'LIST' },
        'Analytics',
      ],
    }),
    deleteDoctor: builder.mutation<ApiResponse<Doctor>, string>({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'Doctor', id: 'LIST' },
        { type: 'Patient', id: 'LIST' },
        'Analytics',
      ],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorOptionsQuery,
  useGetDoctorByIdQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorsApi;

