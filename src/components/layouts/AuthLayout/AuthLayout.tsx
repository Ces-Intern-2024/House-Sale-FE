import React from 'react'
import { Outlet } from 'react-router-dom'
import style from './AuthLayout.module.scss'
const AuthLayout = () => {
  return (
    <div className={style.authContainer}>
      <div className={style.outletContainer}>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
