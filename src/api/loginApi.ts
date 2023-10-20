import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import ky from 'ky'

import type { LoginDto } from '../interfaces'
import { setToken } from '../utilities'

import { URLs } from './types'
// Define a service using a base URL and expected endpoints
export const loginApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: URLs.AUTH,
    fetchFn: async (...args) => ky(...args),
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<string, LoginDto>({
      query: (dto) => ({
        body: dto,
        method: 'POST',
        url: '/login',
      }),
      transformResponse: (response: string) => {
        setToken(response)
        return response
      },
    }),
  }),
  reducerPath: 'loginApi',
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation } = loginApi
