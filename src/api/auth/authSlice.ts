import { createSlice } from '@reduxjs/toolkit'

import type { IUser } from '../../interfaces'
import { type RootState } from '../../store'
import { getToken } from '../../utilities'
import { SliceNames } from '../types'

interface AuthState {
  token: string | null
  user?: IUser
}

const initialState: AuthState = {
  token: getToken(),
  user: undefined,
}

export const authSlice = createSlice({
  name: SliceNames.AUTH,
  initialState: initialState,
  reducers: {
    logOut: (state) => {
      state.user = undefined
    },
    setUser: (state, action: { payload: IUser }) => {
      state.user = action.payload
    },
    tokenReceived: (state, action: { payload: string }) => {
      state.token = action.payload
    },
  },
})

export const selectUser = (state: RootState) => state.auth.user
export const { logOut, setUser, tokenReceived } = authSlice.actions
export default authSlice.reducer
