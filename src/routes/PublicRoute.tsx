import React from 'react'
import { Outlet } from 'react-router-dom'
// import useAuth from '../hooks/useAuth'

const PublicRoute = () => {
  // const { authenticated } = useAuth()
  // console.log('pub: ' + authenticated)

  return <Outlet />
  // return authenticated ? <Navigate replace to={pathname} /> : <Outlet />
}

export default PublicRoute
