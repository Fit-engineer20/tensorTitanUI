import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery, baseApiUrl } from "./api";

export const endpoint = '/api/v1/api/files'

export const filesApis = createApi({
    reducerPath: 'filesApis',
    baseQuery: axiosBaseQuery({
        baseUrl: baseApiUrl
      }),
    endpoints: (builder) => ({
        uploadInvoice: builder.mutation({
            query: (payload) => ({
            url: `${endpoint}/upload`,
            method: 'POST',
            data: payload
            })
        })
    })
})

export const {
    endpoints,
    useUploadInvoiceMutation
} = filesApis;