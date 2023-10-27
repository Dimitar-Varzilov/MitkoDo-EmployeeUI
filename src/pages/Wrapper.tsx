/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, type FC } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { logOut } from '../api/auth/authSlice'
import Spinner from '../components/Spinner'
import { useAppDispatch, useAppSelector } from '../store'

const Wrapper: FC = () => {
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

  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
  }, [isLogged])

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
