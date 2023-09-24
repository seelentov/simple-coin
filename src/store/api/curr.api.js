/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const API_URL = 'https://www.cbr-xml-daily.ru/daily_json.js'

export const currApi = createApi({
  reducerPath: 'api',
  tagTypes: ['currency'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  endpoints: builder => ({
    getData: builder.query({
      query: (item) => ({
        query: () => '/',
        providesTags: () => [{
          type: 'currency'
        }]
      })
    })
  })
})

export const { useGetDataQuery } = currApi