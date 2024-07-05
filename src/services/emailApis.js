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
                response['data'] = newData;
                return response;
            }
        }),
        getEmailDetails: builder.query({
            query:({messageId}) => ({
                url: `${endpoint}/${messageId}`,
                method: 'GET'
            }),
            transformResponse: (response) => {
                let newData = response?.data;
                let newBody = convert(newData?.body);
                newData['body'] = newBody;
                response['data'] = newData;
                return response;
            }
        }),
        attachEntity: builder.mutation({
            query:(payload) => ({
                url: `${endpoint}/attachEntity`,
                method: 'POST',
                data: payload
            })
        }),
        postToFusion: builder.query({
            query:(messageId) => ({
                url: `${endpoint}/postToFusion?emailMessageId=${messageId}`,
                method: 'POST'
            })
        })
    })
})

export const {
    endpoints,
    useLazyGetAllEmailsQuery,
    useLazyGetEmailDetailsQuery,
    useAttachEntityMutation,
    useLazyPostToFusionQuery
} = emailApis;