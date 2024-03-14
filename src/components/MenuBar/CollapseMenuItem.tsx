import { Menu } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import React from 'react'
import styles from './MenuBar.module.scss'
import { NavigationTree } from '../../types/navigation'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { Category } from '../../types'

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
  const categories: Category[] = useAppSelector(
    (state) => state.category.categoriesList,
  )

  return (
    <>
      <Menu
        trigger="hover"
        openDelay={OPEN_DELAY}
        closeDelay={CLOSE_DELAY}
        width={170}
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
            state={{ featureId: nav.key === 'for-sale' ? 1 : 2 }}
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
          {categories.map((category) => (
            <NavLink
              key={category.categoryId}
              to={nav.path}
              state={{
                categoryId: category.categoryId,
                featureId: nav.key === 'for-sale' ? 1 : 2,
              }}
            >
              <Menu.Item className={styles.dropdown} onClick={closeDrawer}>
                {category.name}
              </Menu.Item>
            </NavLink>
          ))}
        </Menu.Dropdown>
      </Menu>
    </>
  )
}
