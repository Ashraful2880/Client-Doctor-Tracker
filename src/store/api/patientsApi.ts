import {
  Patient,
  PatientQueryParams,
  CreatePatientPayload,
  UpdatePatientPayload,
} from "@/types/patient.types";
import { baseApi } from "./baseApi";
import { ApiResponse } from "@/types/api.types";

export const patientsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query<
      ApiResponse<Patient[]>,
      PatientQueryParams | void
    >({
      query: (params) => ({
        url: "/patients",
        params: params || undefined,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({
                type: "Patient" as const,
                id: _id,
              })),
              { type: "Patient", id: "LIST" },
            ]
          : [{ type: "Patient", id: "LIST" }],
    }),
    createPatient: builder.mutation<ApiResponse<Patient>, CreatePatientPayload>(
      {
        query: (body) => ({
          url: "/patients",
          method: "POST",
          body,
        }),
        invalidatesTags: (_result, _error, { doctorId }) => [
          { type: "Patient", id: "LIST" },
          { type: "Doctor", id: doctorId },
          { type: "Doctor", id: "LIST" },
          "Analytics",
        ],
      },
    ),
    updatePatient: builder.mutation<ApiResponse<Patient>, UpdatePatientPayload>(
      {
        query: ({ id, ...body }) => ({
          url: `/patients/${id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: (_result, _error, { id }) => [
          { type: "Patient", id },
          { type: "Patient", id: "LIST" },
          { type: "Doctor", id: "LIST" },
          "Analytics",
        ],
      },
    ),
    deletePatient: builder.mutation<ApiResponse<Patient>, string>({
      query: (id) => ({
        url: `/patients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Patient", id: "LIST" },
        { type: "Doctor", id: "LIST" },
        "Analytics",
      ],
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientsApi;
