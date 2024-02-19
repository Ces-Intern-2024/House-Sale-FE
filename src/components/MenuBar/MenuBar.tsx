import React, { useState } from 'react'
import { Menu, Avatar } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import styles from './MenuBar.module.scss'
import { useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { signOutSuccess } from '../../redux/reducers/sessionSlice'
import { resetUser } from '../../redux/reducers/userSlice'
import { persistor } from '../../redux/store'

interface MenuBarProps {
  isOfDrawers: boolean
}
export default function MenuBar({ isOfDrawers }: MenuBarProps) {
  const OPEN_DELAY = 50
  const CLOSE_DELAY = 50
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const [activeLink, setActiveLink] = useState(pathname)

  const handleSetActiveLink = (link: string) => {
    setActiveLink(link)
  }

  const handleLogout = async () => {
    persistor
      .purge()
      .then(() => persistor.flush())
      .then(() => {
        dispatch(signOutSuccess())
        dispatch(resetUser())
      })
      .catch((error) => console.log('purge persisted state error', error))

    navigate('/home')
  }

  return (
    <>
      <div className={isOfDrawers ? styles.outerOfDrawers : styles.outer}>
        <div>
          <Menu openDelay={OPEN_DELAY} closeDelay={CLOSE_DELAY}>
            <Menu.Target>
              <NavLink
                to="/home"
                className={styles.navLink}
                onClick={() => {
                  handleSetActiveLink('/home')
                }}
              >
                <div className=" flex flex-col justify-center">
                  <h1 className={styles.navText}>HOME</h1>
                  <span
                    className={`h-[3px] mt-2 bg-[#ffa500] ${activeLink === '/home' ? 'opacity-100' : 'opacity-0'}`}
                  ></span>
                </div>
              </NavLink>
            </Menu.Target>
          </Menu>
        </div>
        <div>
          <Menu trigger="click" openDelay={OPEN_DELAY} closeDelay={CLOSE_DELAY}>
            <Menu.Target>
              <NavLink
                to="/about-us"
                className={styles.navLink}
                onClick={() => {
                  handleSetActiveLink('/about-us')
                }}
              >
                <div className=" flex flex-col justify-center">
                  <h1 className={styles.navText}>ABOUT US</h1>
                  <span
                    className={`h-[3px] mt-2 bg-[#ffa500] ${activeLink === '/about-us' ? 'opacity-100' : 'opacity-0'}`}
                  ></span>
                </div>
              </NavLink>
            </Menu.Target>
          </Menu>
        </div>

        <div>
          <Menu
            trigger="hover"
            openDelay={OPEN_DELAY}
            closeDelay={CLOSE_DELAY}
            width={150}
            position={isOfDrawers ? 'right-start' : 'bottom'}
            withArrow
          >
            <Menu.Target>
              <NavLink
                to="/for-rent"
                className={styles.navLink}
                onClick={() => {
                  handleSetActiveLink('/for-rent')
                }}
              >
                <div className=" flex flex-col justify-center">
                  <h1 className={styles.navText}>FOR RENT</h1>
                  <span
                    className={`h-[3px] mt-2 bg-[#ffa500] ${activeLink === '/for-rent' ? 'opacity-100' : 'opacity-0'}`}
                  ></span>
                </div>

                <IconChevronDown className={styles.icon} />
              </NavLink>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item className={styles.dropdown}>Search</Menu.Item>
              <Menu.Item className={styles.dropdown}>House</Menu.Item>
              <Menu.Item className={styles.dropdown}>Apartment</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        <div>
          <Menu
            trigger="hover"
            openDelay={OPEN_DELAY}
            closeDelay={CLOSE_DELAY}
            width={150}
            position={isOfDrawers ? 'right-start' : 'bottom'}
            withArrow
          >
            <Menu.Target>
              <NavLink
                to="/for-sale"
                className={styles.navLink}
                onClick={() => {
                  handleSetActiveLink('/for-sale')
                }}
              >
                <div className=" flex flex-col justify-center">
                  <h1 className={styles.navText}>FOR SALE</h1>
                  <span
                    className={`h-[3px] mt-2 bg-[#ffa500] ${activeLink === '/for-sale' ? 'opacity-100' : 'opacity-0'}`}
                  ></span>
                </div>
                <IconChevronDown className={styles.icon} />
              </NavLink>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item className={styles.dropdown}>Search</Menu.Item>
              <Menu.Item className={styles.dropdown}>House</Menu.Item>
              <Menu.Item className={styles.dropdown}>Apartment</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        <div>
          <Menu trigger="click" openDelay={OPEN_DELAY} closeDelay={CLOSE_DELAY}>
            <Menu.Target>
              <NavLink
                to="/contact"
                className={styles.navLink}
                onClick={() => {
                  handleSetActiveLink('/contact')
                }}
              >
                <div className=" flex flex-col justify-center">
                  <h1 className={styles.navText}>CONTACT</h1>
                  <span
                    className={`h-[3px] mt-2 bg-[#ffa500] ${activeLink === '/contact' ? 'opacity-100' : 'opacity-0'}`}
                  ></span>
                </div>
              </NavLink>
            </Menu.Target>
          </Menu>
        </div>

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
                    >
                      <Menu.Target>
                        <NavLink
                          to="#"
                          className={styles.navLink}
                          onClick={() => {
                            handleSetActiveLink('#')
                          }}
                        >
                          <div className=" flex flex-col justify-center gap-y-1">
                            <div className="flex items-center">
                              <Avatar size={28} color="white" />
                              <h3 className=" text-white font-bold ml-1 hover:text-orange-100">
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
                        <Menu.Item className={styles.dropdown}>
                          <NavLink to="/profile"> PROFILE</NavLink>
                        </Menu.Item>
                        <Menu.Item className={styles.dropdown}>
                          <h1 onClick={handleLogout}>LOG OUT</h1>
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className={styles.navLink}
                    onClick={() => {
                      handleSetActiveLink('/login')
                    }}
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
