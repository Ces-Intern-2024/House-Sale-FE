import React, { useState, useEffect } from 'react'
import { Menu, Avatar } from '@mantine/core'
// import { IconChevronDown } from '@tabler/icons-react'
import styles from './MenuBar.module.scss'
import { useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { signOutSuccess } from '../../redux/reducers/sessionSlice'
import { resetUser } from '../../redux/reducers/userSlice'
import { persistor } from '../../redux/store'
import { useDisclosure } from '@mantine/hooks'
import ChangePassword from '../ChangePassword/ChangePassword'
import { Roles } from '../../types/role'
import { navigationConfigs } from '../../configs/navigation.config/navigation.configs'
import {
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
} from '../../constants/navigation.constant'
import AuthorityCheck from '../shared/AuthorityCheck'
import CollapseMenuItem from './CollapseMenuItem'
import SingleMenuItem from './SingleMenuItem'
interface MenuBarProps {
  isOfDrawers: boolean
  closeDrawer?: () => void
  userAuthority?: string
}

export default function MenuBar({
  isOfDrawers,
  closeDrawer,
  userAuthority,
}: MenuBarProps) {
  const OPEN_DELAY = 50
  const CLOSE_DELAY = 50
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const [activeLink, setActiveLink] = useState(pathname)
  const [opened, { open, close }] = useDisclosure(false)

  const handleLogout = async () => {
    persistor
      .purge()
      .then(() => persistor.flush())
      .then(() => {
        dispatch(signOutSuccess())
        dispatch(resetUser())
      })
    // .catch((error) => console.log('purge persisted state error', error))

    navigate('/home')
    window.location.reload()
  }
  useEffect(() => {
    setActiveLink(pathname)
  }, [pathname])

  return (
    <>
      <ChangePassword isOpened={opened} onClose={close} />
      <div className={isOfDrawers ? styles.outerOfDrawers : styles.outer}>
        {navigationConfigs.map((nav) => {
          if (nav.type === NAV_ITEM_TYPE_COLLAPSE) {
            return (
              <>
                <AuthorityCheck
                  authority={nav.authority}
                  userAuthority={userAuthority}
                >
                  <CollapseMenuItem
                    nav={nav}
                    isOfDrawers={isOfDrawers}
                    activeLink={activeLink}
                    closeDrawer={closeDrawer}
                  />
                </AuthorityCheck>
              </>
            )
          }
          if (nav.type === NAV_ITEM_TYPE_ITEM) {
            return (
              <>
                <AuthorityCheck
                  authority={nav.authority}
                  userAuthority={userAuthority}
                >
                  <SingleMenuItem
                    nav={nav}
                    activeLink={activeLink}
                    closeDrawer={closeDrawer}
                  />
                </AuthorityCheck>
              </>
            )
          }
        })}
        <div>
          <Menu trigger="click" openDelay={OPEN_DELAY} closeDelay={CLOSE_DELAY}>
            <Menu.Target>
              <div className="flex items-center cursor-pointer">
                {user.userId ? (
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
                        <NavLink to="#" className={styles.navLink}>
                          <div className=" flex flex-col justify-center gap-y-1 flex-wrap">
                            <div className="flex items-center">
                              <Avatar size={28} color="white" />
                              <h3 className=" text-white font-bold ml-1  hover:text-orange-100">
                                {user.fullName
                                  ? user.fullName.toUpperCase()
                                  : 'USER'}
                              </h3>
                            </div>
                            <span
                              className={`h-[3px] bg-[#ffa500] ${activeLink === '#' ? 'opacity-100' : 'opacity-0'}`}
                            ></span>
                          </div>
                        </NavLink>
                      </Menu.Target>
                      <Menu.Dropdown className=" flex-col justify-center">
                        {Number(user.roleId) === Roles.Seller ? (
                          <>
                            <Menu.Item className={styles.dropdown}>
                              <NavLink to="/seller"> Dashboard</NavLink>
                            </Menu.Item>
                            <Menu.Item className={styles.dropdown}>
                              <NavLink to="/profile"> Profile</NavLink>
                            </Menu.Item>
                          </>
                        ) : (
                          <h1
                            onClick={() => {
                              open()
                            }}
                          >
                            Change Password
                          </h1>
                        )}

                        <Menu.Item
                          className={styles.dropdown}
                          onClick={closeDrawer}
                        >
                          <h1 onClick={handleLogout}>Log Out</h1>
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className={styles.navLink}
                    onClick={closeDrawer}
                  >
                    <div className=" flex flex-col justify-center">
                      <h1 className={styles.navText}>LOG IN</h1>
                      <span
                        className={`h-[3px] mt-2 bg-[#ffa500] ${activeLink === '/login' ? 'opacity-100' : 'opacity-0'}`}
                      ></span>
                    </div>
                  </NavLink>
                )}
              </div>
            </Menu.Target>
          </Menu>
        </div>
      </div>
    </>
  )
}
