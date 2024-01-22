import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import style from './Layout.module.scss'
import SlideShow from '../../Slideshow/SlideShow'
export default function Layout() {
  return (
    <>
      <div className={style.outer}>
        <div className={style.inner}>
          <Header />
        </div>
        <SlideShow />
      </div>
      <Outlet />
      <Footer />
    </>
  )
}
