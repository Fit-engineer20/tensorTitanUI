import { createApi } from "@reduxjs/toolkit/query/react";
import { convert } from "html-to-text";
import { axiosBaseQuery, baseApiUrl } from "./api";

export const endpoint = '/api/v1/processedEmail'

export const emailApis = createApi({
    reducerPath: 'emailApis',
    baseQuery: axiosBaseQuery({
        baseUrl: baseApiUrl
      }),
    endpoints: (builder) => ({
        getAllEmails: builder.query({
            query:(payload) => ({
                url: `${endpoint}/list`,
                method: 'POST',
                data: payload
            }),
            transformResponse: (response) => {
                const newData = response?.data.map((item) => {
                    const textBody = convert(item?.body);
                    item['body'] = textBody;
                    return item;
                })
                return newData;
            }
        }),
        getEmailDetails: builder.query({
            query:({messageId}) => ({
                url: `${endpoint}/${messageId}`,
                method: 'GET'
            }),
            transformResponse: (response) => {
                response['body'] = convert(response?.body);
                return response;
            }
        })
    })
})

export const {
    endpoints,
    useLazyGetAllEmailsQuery,
    useLazyGetEmailDetailsQuery
} = emailApis;