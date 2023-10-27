import { type UUID } from 'crypto'

import React, { createContext, useState } from 'react'

import type { IEmployeeData, IToDo, LoginDto, RegisterDto } from '../interfaces'
import { getToken, removeToken, setToken } from '../utilities'

interface AppContextType {
  clearState: () => void
  data: IToDo[]
  employeeData: IEmployeeData
  error?: Error
  fetchEmployeeData: () => Promise<void>
  fetchEmployeeTasks: () => Promise<void>
  isLoading: boolean
  isLoggedIn: boolean
  loginUser: (user: LoginDto) => void
  logOut: () => void
  registerUser: (user: RegisterDto) => void
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  token: string
  uploadImages: (formData: FormData, subTaskId: UUID) => Promise<void>
}

export const defaultState: AppContextType = {
  clearState: () => {},
  data: [],
  employeeData: { name: '', employeeId: crypto.randomUUID() },
  error: undefined,
  fetchEmployeeData: async () => Promise.resolve(),
  fetchEmployeeTasks: async () => Promise.resolve(),
  isLoading: false,
  isLoggedIn: getToken() !== null,
  loginUser: () => {},
  logOut: () => {},
  registerUser: () => {},
  setIsLoading: () => {},
  setIsLoggedIn: () => {},
  token: getToken() ?? '',
  uploadImages: async () => Promise.resolve(),
}

export const AppContext = createContext<AppContextType>(defaultState)

interface AppProviderProps {
  children: React.ReactNode
}

enum URLs {
  AUTH = 'https://localhost:5000/Auth',
  EMPLOYEE = 'https://localhost:5001/Employee',
  TASK = 'https://localhost:5002/Task',
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState(defaultState)

  const setIsLoadingTrue = () =>
    setState((prev) => ({ ...prev, isLoading: true }))
  const setIsLoadingFalse = () =>
    setState((prev) => ({ ...prev, isLoading: false }))

  const clearState = () => setState(defaultState)

  const loginUser: typeof defaultState.loginUser = async ({
    email,
    password,
  }: LoginDto) => {
    setIsLoadingTrue()
    try {
      const response = await fetch(`${URLs.AUTH}/login`, {
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      if (!response.ok) throw new Error('Invalid credentials')
      const data = await response.text()
      setToken(data)
      setState((prev) => ({ ...prev, isLoggedIn: true, token: data }))
    } catch (error) {
      console.log(error)
      setState((prev) => ({
        ...prev,
        error,
        isLoggedIn: false,
      }))
    } finally {
      setIsLoadingFalse()
    }
  }

  const logOut = () => {
    removeToken()
    setState(defaultState)
  }
  const tokenHeader = `Bearer ${getToken()}`

  const fetchEmployeeData = async () => {
    try {
      setIsLoadingTrue()
      const response = await fetch(
        `${URLs.EMPLOYEE}/employeeDetailsFromToken`,
        {
          headers: {
            Authorization: tokenHeader,
          },
        },
      )
      const data: IEmployeeData = await response.json()
      setState((prev) => ({
        ...prev,
        employeeData: data,
      }))
    } catch (error) {
      console.log(error)
      setState((prev) => ({ ...prev, error }))
    } finally {
      setIsLoadingFalse()
    }
  }

  const fetchEmployeeTasks = async () => {
    try {
      setIsLoadingTrue()
      const response = await fetch(`${URLs.TASK}/byToken`, {
        headers: {
          Authorization: tokenHeader,
        },
      })
      const data: IToDo[] = await response.json()
      setState((prev) => ({
        ...prev,
        data: data,
      }))
    } catch (error) {
      console.log(error)
      setState((prev) => ({ ...prev, error }))
    } finally {
      setIsLoadingFalse()
    }
  }

  const uploadImages: typeof defaultState.uploadImages = async (
    formData,
    subTaskId,
  ) => {
    try {
      setIsLoadingTrue()
      const response = await fetch(
        `${URLs.TASK}/subtask/addImage/${subTaskId}`,
        {
          body: formData,
          headers: {
            Authorization: tokenHeader,
          },
          method: 'POST',
        },
      )
      const data = await response.text()
      console.log(data)
    } catch (error) {
      setState((prev) => ({ ...prev, error }))
    } finally {
      setIsLoadingFalse()
    }
  }

  const registerUser = async (userData: RegisterDto) => {
    setIsLoadingTrue()
    try {
      await fetch(`${URLs.AUTH}/register/employee`, {
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
    } catch (error) {
      console.error(error)
      setState((prev) => ({ ...prev, error }))
    } finally {
      setIsLoadingFalse()
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearState,
        fetchEmployeeData,
        fetchEmployeeTasks,
        loginUser,
        logOut,
        registerUser,
        uploadImages,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
export const useAppContext = () => React.useContext(AppContext)
