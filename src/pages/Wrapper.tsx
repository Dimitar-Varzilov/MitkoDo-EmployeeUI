import React, { useEffect, type FC } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import Spinner from '../components/Spinner'
import { useAppContext } from '../context'

const Wrapper: FC = () => {
  const { error, isLoading, isLoggedIn, logOut } = useAppContext()
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/main')
  }

  const handleLogOut = () => {
    logOut()
    navigate('/')
  }

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate('/')
  //   }
  // }, [isLoggedIn])

  if (isLoading) return <Spinner />
  // if (error) return <p>{error.errors}</p>
  return (
    <>
      {isLoggedIn && (
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
