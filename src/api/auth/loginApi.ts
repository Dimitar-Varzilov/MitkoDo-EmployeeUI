import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

import type { IUser, LoginDto, RegisterDto } from '../../interfaces'
import { getToken, setToken } from '../../utilities'
import { URLs } from '../types'

import { tokenReceived } from './authSlice'

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({
  baseUrl: URLs.AUTH,
  prepareHeaders: (headers) => {
    const token = getToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

export const loginApi = createApi({
  baseQuery: baseQueryWithRetry,

  endpoints: (builder) => ({
    loginUser: builder.mutation<string, LoginDto>({
      queryFn: async (dto, api) => {
        try {
          const data = await axios.post<LoginDto, string, LoginDto>(
            `${URLs.AUTH}/login`,
            dto,
          )
          setToken(data)
          api.dispatch(tokenReceived(data))
          return { data }
        } catch (error: any) {
          return { error }
        }
      },
    }),
    registerUser: builder.mutation<IUser, RegisterDto>({
      query: (dto) => ({
        body: dto,
        method: 'POST',
        url: '/register/employee',
      }),
    }),
  }),
  reducerPath: 'loginApi',
  tagTypes: [],
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation, useRegisterUserMutation } = loginApi
