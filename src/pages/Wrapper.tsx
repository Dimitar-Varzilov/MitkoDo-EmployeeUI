/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, type FC } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { logOut } from '../api/auth/authSlice'
import Spinner from '../components/Spinner'
import { useAppContext } from '../context'
import { useAppDispatch, useAppSelector } from '../store'

const Wrapper: FC = () => {
  const { error, isLoading } = useAppContext()
  const { isLogged } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/main')
  }

  const handleLogOut = () => {
    dispatch(logOut())
    navigate('/')
  }

  // useEffect(() => {
  //   if (!isLogged) {
  //     navigate('/')
  //   }
  // }, [isLogged])

  if (isLoading) return <Spinner />
  if (error) return <p>{error.title}</p>
  return (
    <>
      {isLogged && (
        <>
          <button onClick={handleGoHome}>Main</button>
          <button onClick={handleLogOut}>Log out</button>
        </>
      )}
      <Outlet />
    </>
  )
}

export default Wrapper
