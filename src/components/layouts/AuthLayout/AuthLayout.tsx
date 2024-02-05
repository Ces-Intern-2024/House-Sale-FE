import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import style from './AuthLayout.module.scss'
import { Paper, PaperProps } from '@mantine/core'
import { IoIosArrowBack } from 'react-icons/io'

const AuthLayout = (props: PaperProps) => {
  return (
    <div className={style.authContainer}>
      <div className={style.outletContainer}>
        <Paper
          className=" md:w-[500px] mobile:w-[90%]"
          classNames={{ root: style.rootLoginForm }}
          radius="md"
          p="xl"
          withBorder
          {...props}
        >
          <Link to="/" className={style.btnBackHome}>
            <IoIosArrowBack />
          </Link>
          <Outlet />
        </Paper>
      </div>
    </div>
  )
}

export default AuthLayout
