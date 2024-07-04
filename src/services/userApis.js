import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery, baseApiUrl } from "./api";

export const endpoint = '/api/v1/auth'

export const userApis = createApi({
    reducerPath: 'userApis',
    baseQuery: axiosBaseQuery({
        baseUrl: baseApiUrl
      }),
    endpoints: (builder) => ({
        login: builder.query({
            query: (payload) => ({
            url: `${endPoint}/signin`,
            method: 'POST',
            data: payload
            })
        }),
        register: builder.query({
            query:(payload) => ({
                url: `${endpoint}/signup`,
                method:'POST',
                data: payload
            })
        }),
        logout: builder.query({
            query: () => ({
            url: `${endPoint}/auth/signup`,
            method: 'GET'
            })
        }),
    })
})

export const {
    endpoints,
    useLazyLoginQuery,
    useLazyRegisterQuery
} = userApis;