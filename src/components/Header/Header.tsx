import React from 'react'
import logo from '../../assets/images/logo_transparent.png'
import MenuBar from '../MenuBar/MenuBar'
import style from './Header.module.scss'
import Drawers from '../Drawers/Drawers'

export default function Header() {
  return (
    <div className={style.outer}>
      <div className={style.logoOuter}>
        <img className={style.logo} src={logo}></img>
      </div>
      <MenuBar isOfDrawers={false} />
      <Drawers />
    </div>
  )
}
