import React, { useEffect, useState } from 'react'
import { AppShell, Burger, Group, Anchor, Breadcrumbs } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import logo from '../../../assets/images/logo_transparent.png'
import styles from './SellerLayout.module.scss'
import {
  IconDashboard,
  IconUserStar,
  IconGraph,
  IconLogout,
} from '@tabler/icons-react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSmallScreen } from '../../../redux/action'

export default function SellerLayout() {
  const [opened, { toggle }] = useDisclosure()
  const [isSmallNav, setIsSmallNav] = useState(false)
  const SMALL_SCREEN_WIDTH = 70
  const LARGE_SCREEN_WIDTH = 180
  const ICON_SIZE = 30
  const APPSHELL_HEIGHT = 80
  const dispatch = useDispatch()
  const isSmallScreen = useSelector(
    (state: any) => state.resizeReducer.isSmallScreen,
  )

  const paths = [
    { title: 'Management', href: '#' },
    { title: 'Dashboard', href: '#' },
    { title: 'Profile', href: '#' },
  ].map((path, index) => (
    <Anchor href={path.href} key={index}>
      {path.title}
    </Anchor>
  ))

  const handleResize = () => {
    dispatch(setIsSmallScreen(window.innerWidth < 768))
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [dispatch])

  return (
    <>
      <AppShell
        bg="primary"
        header={{ height: APPSHELL_HEIGHT }}
        navbar={{
          width: isSmallNav ? SMALL_SCREEN_WIDTH : LARGE_SCREEN_WIDTH,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header className={styles.header}>
          <Group h="100%" classNames={{ root: styles.root }}>
            <Burger opened={opened} onClick={toggle} size="md" color="white" />
          </Group>
          <div>
            <img src={logo} className={styles.img} />
          </div>
          <div className="flex items-center text-white font-bold gap-x-2 cursor-pointer">
            <h1 className=" hidden md:block">Log Out</h1>
            <IconLogout color="white" size={30} />
          </div>
        </AppShell.Header>

        <AppShell.Navbar className={styles.navBar}>
          <div className={styles.navBarInner}>
            <div className={styles.navItem}>
              <IconDashboard className={styles.navIcon} size={ICON_SIZE} />
              {(!isSmallNav || isSmallScreen) && (
                <h1 className={styles.navText}>DASHBOARD</h1>
              )}
            </div>
            <div className={styles.navItem}>
              <IconUserStar className={styles.navIcon} size={ICON_SIZE} />
              {(!isSmallNav || isSmallScreen) && (
                <h1 className={styles.navText}>PROFILE</h1>
              )}
            </div>
            <div className={styles.navItem}>
              <IconGraph className={styles.navIcon} size={ICON_SIZE} />
              {(!isSmallNav || isSmallScreen) && (
                <h1 className={styles.navText}>REPORT</h1>
              )}
            </div>
          </div>

          <Group>
            <Burger
              opened={!isSmallNav}
              onClick={() => {
                setIsSmallNav((prev) => !prev)
              }}
              visibleFrom="sm"
              size="md"
            />
          </Group>
        </AppShell.Navbar>

        <AppShell.Main className={styles.main}>
          <Breadcrumbs my="md">{paths}</Breadcrumbs>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  )
}
