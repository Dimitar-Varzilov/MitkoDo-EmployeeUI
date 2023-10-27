import { type UUID } from 'crypto'

import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

import type { ISubtask, IToDo, IUploadNoteAndPicturesDto } from '../interfaces'
import { getToken } from '../utilities'

import { ReducerNames, TagIds, TagTypes, URLs } from './types'

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({
  baseUrl: URLs.TASK,
  prepareHeaders: (headers) => {
    const token = getToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

export const toDoApi = createApi({
  baseQuery: baseQueryWithRetry,

  endpoints: (builder) => ({
    getEmployeeToDos: builder.query<IToDo[], void>({
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ todoId }) => ({ id: todoId, type: TagTypes.TODO }) as const,
              ),
              { id: TagIds.LIST, type: TagTypes.TODO },
            ]
          : [{ id: TagIds.LIST, type: TagTypes.TODO }],
      query: () => '/Task/byToken',
    }),
    getToDoById: builder.query<IToDo, UUID>({
      providesTags: (result, error, id) => [{ id, type: TagTypes.TODO }],
      query: (todoId) => `/Task/${todoId}`,
    }),
    uploadNoteAndImages: builder.mutation<ISubtask, IUploadNoteAndPicturesDto>({
      invalidatesTags: (result, error, args) => [
        { id: args.todoId, type: TagTypes.TODO },
      ],
      query: ({ formData, subTaskId }) => ({
        body: formData,
        method: 'POST',
        url: `/Task/subtask/addImage/${subTaskId}`,
      }),
    }),
  }),
  reducerPath: ReducerNames.ToDoApi,
  tagTypes: [TagTypes.TODO],
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetEmployeeToDosQuery,
  useGetToDoByIdQuery,
  useUploadNoteAndImagesMutation,
} = toDoApi
