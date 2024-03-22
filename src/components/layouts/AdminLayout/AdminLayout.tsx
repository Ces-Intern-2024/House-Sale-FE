import React, { useEffect, useState } from 'react'
import {
  AppShell,
  Burger,
  Group,
  Anchor,
  Breadcrumbs,
  Divider,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import logo from '../../../assets/images/logo_transparent.png'
import styles from './AdminLayout.module.scss'
import {
  IconDashboard,
  IconGraph,
  IconLogout,
  IconTransform,
} from '@tabler/icons-react'
import { TbBuildingSkyscraper } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { CiCreditCard1 } from 'react-icons/ci'
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { setIsSmallScreen } from '../../../redux/reducers/resizeSlice'
import { signOutSuccess } from '../../../redux/reducers/sessionSlice'
import { resetUser } from '../../../redux/reducers/userSlice'
import { persistor } from '../../../redux/store'
import Views from '../../../views/Views'

export default function AdminLayout() {
  const navigate = useNavigate()
  const [opened, { toggle }] = useDisclosure()
  const [isSmallNav, setIsSmallNav] = useState(false)
  const SMALL_SCREEN_WIDTH = 70
  const LARGE_SCREEN_WIDTH = 180
  const ICON_SIZE = 24
  const APPSHELL_HEIGHT = 80
  const dispatch = useAppDispatch()
  const isSmallScreen = useAppSelector((state) => state.resize.isSmallScreen)
  const { pathname } = useLocation()
  const paths = [
    { title: 'Management', href: '#' },
    pathname === '/seller' ? { title: 'Dashboard', href: '/seller' } : null,
    pathname === '/profile' ? { title: 'Profile', href: '/profile' } : null,
    pathname === '/report' ? { title: 'Report', href: '/report' } : null,
  ]
    .filter(Boolean)
    .map((path, index) => (
      <Anchor href={path?.href} key={index}>
        {path?.title}
      </Anchor>
    ))
  const [_activeLink, setActiveLink] = useState('/seller')
  const handleSetActiveLink = (link: string) => {
    setActiveLink(link)
  }
  const handleResize = () => {
    dispatch(setIsSmallScreen(window.innerWidth < 768))
  }
  const handleLogout = async () => {
    persistor
      .purge()
      .then(() => persistor.flush())
      .then(() => {
        dispatch(signOutSuccess())
        dispatch(resetUser())
      })
      .catch((error) => console.error('purge persisted state error', error))

    navigate('/home')
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
          <Link to="/home">
            <img src={logo} className={styles.img} />
          </Link>
          <div
            className="flex items-center text-white font-bold gap-x-2 cursor-pointer"
            onClick={handleLogout}
          >
            <span className=" hidden md:block">Log Out</span>
            <IconLogout color="white" size={30} />
          </div>
        </AppShell.Header>

        <AppShell.Navbar className={styles.navBar}>
          <div className={styles.navBarInner}>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? styles.navItemActive : ''
              }
              onClick={() => {
                handleSetActiveLink('/admin')
                if (opened) toggle()
              }}
            >
              <div className={styles.navItem}>
                <IconDashboard className={styles.navIcon} size={ICON_SIZE} />
                {(!isSmallNav || isSmallScreen) && (
                  <h3 className={styles.navText}>Dashboard</h3>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/admin-property"
              className={({ isActive }) =>
                isActive ? styles.navItemActive : ''
              }
              onClick={() => {
                handleSetActiveLink('/')
                if (opened) toggle()
              }}
            >
              <div className={styles.navItem}>
                <TbBuildingSkyscraper className={styles.navIcon} size={ICON_SIZE} />
                {(!isSmallNav || isSmallScreen) && (
                  <h3 className={styles.navText}>Property</h3>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/admin-user"
              className={({ isActive }) =>
                isActive ? styles.navItemActive : ''
              }
              onClick={() => {
                handleSetActiveLink('/')
                if (opened) toggle()
              }}
            >
              <div className={styles.navItem}>
                <FaRegUser className={styles.navIcon} size={ICON_SIZE} />
                {(!isSmallNav || isSmallScreen) && (
                  <h3 className={styles.navText}>User</h3>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/admin-transaction"
              className={({ isActive }) =>
                isActive ? styles.navItemActive : ''
              }
              onClick={() => {
                handleSetActiveLink('/')
                if (opened) toggle()
              }}
            >
              <div className={styles.navItem}>
                <CiCreditCard1 className={styles.navIcon} size={ICON_SIZE} />
                {(!isSmallNav || isSmallScreen) && (
                  <h3 className={styles.navText}>Transaction</h3>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/admin-conversion-rate"
              className={({ isActive }) =>
                isActive ? styles.navItemActive : ''
              }
              onClick={() => {
                handleSetActiveLink('/')
                if (opened) toggle()
              }}
            >
              <div className={styles.navItem}>
                <IconTransform className={styles.navIcon} size={ICON_SIZE} />
                {(!isSmallNav || isSmallScreen) && (
                  <h3 className={styles.navText}>Conversion Rate</h3>
                )}
              </div>
            </NavLink>

            <NavLink
              to="/report"
              className={({ isActive }) =>
                isActive ? styles.navItemActive : ''
              }
              onClick={() => {
                handleSetActiveLink('/report')
                if (opened) toggle()
              }}
            >
              <div className={styles.navItem}>
                <IconGraph className={styles.navIcon} size={ICON_SIZE} />
                {(!isSmallNav || isSmallScreen) && (
                  <h3 className={styles.navText}>Report</h3>
                )}
              </div>
            </NavLink>
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
          <Divider size="xs" />
          <Views />
        </AppShell.Main>
      </AppShell>
    </>
  )
}
