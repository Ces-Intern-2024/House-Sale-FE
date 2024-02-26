import { Menu } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import React from 'react'
import styles from './MenuBar.module.scss'
import { NavigationTree } from '../../types/navigation'
import { NavLink } from 'react-router-dom'

interface CollapseMenuItemProps {
  nav: NavigationTree
  isOfDrawers: boolean
  closeDrawer?: () => void
  activeLink: string
}
export default function CollapseMenuItem({
  nav,
  isOfDrawers,
  closeDrawer,
  activeLink,
}: CollapseMenuItemProps) {
  const OPEN_DELAY = 50
  const CLOSE_DELAY = 50

  return (
    <>
      <Menu
        trigger="hover"
        openDelay={OPEN_DELAY}
        closeDelay={CLOSE_DELAY}
        width={150}
        position={isOfDrawers ? 'right-start' : 'bottom'}
        withArrow
        transitionProps={{
          transition: 'pop',
          duration: 300,
          timingFunction: 'ease-in-out',
          exitDuration: 100,
        }}
      >
        <Menu.Target>
          <NavLink
            to={nav.path}
            className={styles.navLink}
            onClick={closeDrawer}
          >
            <div className=" flex flex-col justify-center">
              <h1 className={styles.navText}>
                {nav.title}
                <IconChevronDown className={styles.icon} />
              </h1>
              <span
                className={`h-[3px] mt-2 bg-[#ffa500] ${activeLink === nav.path ? 'opacity-100' : 'opacity-0'}`}
              ></span>
            </div>
          </NavLink>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item className={styles.dropdown}>Search</Menu.Item>
          <Menu.Item className={styles.dropdown}>House</Menu.Item>
          <Menu.Item className={styles.dropdown}>Apartment</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}
