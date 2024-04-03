import React, { useState, useEffect } from 'react'
import { Menu, Avatar, Accordion, ScrollArea } from '@mantine/core'
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
import AuthorityCheck from '../../shared/AuthorityCheck'
import CollapseMenuItem from './CollapseMenuItem'
import SingleMenuItem from './SingleMenuItem'
import { getAllFeatures } from '../../redux/reducers/featureSlice'
import { getAllCategories } from '../../redux/reducers/categorySlice'
import useAuth from '../../hooks/useAuth'
import Swal from 'sweetalert2'
import UpgradeSeller from '../UpgradeSeller/UpgradeSeller'
import { getMaintenanceModeForSeller } from '../../service/MaintenanceService'
import UnderMaintenance from '../UnderMaintenance/UnderMaintenance'

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
  const [openUpgradeSeller, setOpenUpgradeSeller] = useState(false)
  const { authenticated, roleId } = useAuth()
  const [isUnderMaintenance, setIsUnderMaintenance] = useState(false)
  const [maintenanceMessage, setMaintenanceMessage] = useState('')

  const handleGetMaintenanceMode = async () => {
    try {
      const res = await getMaintenanceModeForSeller()
      setIsUnderMaintenance((_prev) => res.metaData.isMaintenance)
      setMaintenanceMessage((_prev) => res.metaData.description)
      return res.metaData.isMaintenance
    } catch (error) {
      console.error(error)
    }
  }

  const handleNavigateToPublishing = () => {
    if (!authenticated) {
      Swal.fire({
        title: 'Please register first',
        icon: 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2ac58b',
        timer: 1500,
      })
      navigate('/register', { state: { isSeller: true } })
    }
    if (authenticated && Number(roleId) === Roles.Seller) {
      navigate('/seller-property')
    }

    if (authenticated && Number(roleId) === Roles.User)
      setOpenUpgradeSeller(true)
  }

  const handleLogout = async () => {
    persistor
      .purge()
      .then(() => persistor.flush())
      .then(() => {
        dispatch(signOutSuccess())
        dispatch(resetUser())
      })

    navigate('/home')
    window.location.reload()
  }

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllFeatures())
  }, [])
  useEffect(() => {
    setActiveLink(pathname)
  }, [pathname])

  return (
    <>
      <UpgradeSeller
        isOpened={openUpgradeSeller}
        onClose={setOpenUpgradeSeller}
      />
      <ChangePassword isOpened={opened} onClose={close} />

      <div
        className={
          isOfDrawers ? styles.outerOfDrawersListing : styles.outerOfListing
        }
      >
        <div className={isOfDrawers ? styles.outerOfDrawers : styles.outer}>
          {navigationConfigs.map((nav) => {
            if (nav.type === NAV_ITEM_TYPE_COLLAPSE) {
              return (
                <AuthorityCheck
                  authority={nav.authority}
                  userAuthority={userAuthority}
                  key={nav.key}
                >
                  <CollapseMenuItem
                    nav={nav}
                    isOfDrawers={isOfDrawers}
                    activeLink={activeLink}
                    closeDrawer={closeDrawer}
                  />
                </AuthorityCheck>
              )
            }
            if (nav.type === NAV_ITEM_TYPE_ITEM) {
              return (
                <AuthorityCheck
                  authority={nav.authority}
                  userAuthority={userAuthority}
                  key={nav.key}
                >
                  <SingleMenuItem
                    nav={nav}
                    activeLink={activeLink}
                    closeDrawer={closeDrawer}
                  />
                </AuthorityCheck>
              )
            }
          })}
          {isOfDrawers ? (
            <ScrollArea.Autosize mah="100%" maw="100%" type="never">
              <div className="flex items-center cursor-pointer">
                {user.userId ? (
                  <>
                    <Accordion
                      variant="unstyled"
                      className="w-full ml-2"
                      classNames={{
                        content: 'px-0',
                        chevron: 'text-white',
                        label: 'p-0',
                        panel: 'text-black',
                      }}
                    >
                      <Accordion.Item
                        value="photos"
                        className="hover:bg-transparent"
                      >
                        <Accordion.Control className="w-[220px] px-5 ">
                          <NavLink to="#">
                            <div className=" flex flex-col justify-center gap-y-1 flex-wrap">
                              <div className="flex items-center">
                                <Avatar size={28} color="white" />
                                <div className={styles.nameTag}>
                                  {user.fullName
                                    ? user.fullName.toUpperCase()
                                    : 'USER'}
                                </div>
                              </div>
                              <span
                                className={`h-[3px] bg-[#ffa500] ${activeLink === '#' ? 'opacity-100' : 'opacity-0'}`}
                              ></span>
                            </div>
                          </NavLink>
                        </Accordion.Control>
                        <Accordion.Panel className=" px-2 mt-2 bg-[#2c513f] rounded-lg shadow-xl">
                          <div className=" flex flex-col justify-center">
                            {Number(user.roleId) === Roles.Seller && (
                              <>
                                <NavLink
                                  to="/seller"
                                  className={styles.commonNav}
                                >
                                  Dashboard
                                </NavLink>

                                <NavLink
                                  to="/seller-profile"
                                  className={styles.commonNav}
                                >
                                  Profile
                                </NavLink>
                              </>
                            )}
                            {Number(user.roleId) === Roles.Admin && (
                              <NavLink to="/admin" className={styles.commonNav}>
                                Dashboard
                              </NavLink>
                            )}

                            <span
                              onClick={async () => {
                                const status = await handleGetMaintenanceMode()
                                if (status === false) open()
                              }}
                              className={styles.commonNav}
                            >
                              Change Password
                            </span>

                            <span
                              onClick={() => {
                                closeDrawer
                                handleLogout()
                              }}
                              className={styles.commonNav}
                            >
                              Log Out
                            </span>
                          </div>
                        </Accordion.Panel>
                      </Accordion.Item>
                    </Accordion>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    onClick={closeDrawer}
                    className={styles.navLink}
                  >
                    <div className=" flex flex-col items-start justify-center">
                      <span className={styles.navText}>LOG IN</span>
                      <span
                        className={`h-[3px] mt-2 bg-[#ffa500] ${activeLink === '/login' ? 'opacity-100' : 'opacity-0'}`}
                      ></span>
                    </div>
                  </NavLink>
                )}
              </div>
            </ScrollArea.Autosize>
          ) : (
            <div className="flex items-center cursor-pointer">
              {user.userId ? (
                <>
                  <Menu
                    trigger="hover"
                    openDelay={OPEN_DELAY}
                    closeDelay={CLOSE_DELAY}
                    width={170}
                    position={isOfDrawers ? 'right-end' : 'bottom'}
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
                            <span className="text-base text-white font-bold ml-1 hover:text-orange-100">
                              {user.fullName
                                ? user.fullName.toUpperCase()
                                : 'USER'}
                            </span>
                          </div>
                          <span
                            className={`h-[3px] bg-[#ffa500] ${activeLink === '#' ? 'opacity-100' : 'opacity-0'}`}
                          ></span>
                        </div>
                      </NavLink>
                    </Menu.Target>
                    <Menu.Dropdown className=" flex-col justify-center">
                      {Number(user.roleId) === Roles.Seller && (
                        <>
                          <NavLink to="/seller" className={styles.dropdown}>
                            <Menu.Item className={styles.dropdown}>
                              Dashboard
                            </Menu.Item>
                          </NavLink>

                          <NavLink
                            to="/seller-profile"
                            className={styles.dropdown}
                          >
                            <Menu.Item className={styles.dropdown}>
                              Profile
                            </Menu.Item>
                          </NavLink>
                        </>
                      )}
                      {Number(user.roleId) === Roles.Admin && (
                        <NavLink to="/admin">
                          <Menu.Item className={styles.dropdown}>
                            Dashboard
                          </Menu.Item>
                        </NavLink>
                      )}

                      <span
                        onClick={async () => {
                          const status = await handleGetMaintenanceMode()
                          if (status === false) open()
                        }}
                      >
                        <Menu.Item className={styles.dropdown}>
                          Change Password
                        </Menu.Item>
                      </span>

                      <span onClick={handleLogout}>
                        <Menu.Item
                          className={styles.dropdown}
                          onClick={closeDrawer}
                        >
                          Log Out{' '}
                        </Menu.Item>
                      </span>
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
                    <span className={styles.navText}>LOG IN</span>
                    <span
                      className={`h-[3px] mt-2 bg-[#ffa500] ${activeLink === '/login' ? 'opacity-100' : 'opacity-0'}`}
                    ></span>
                  </div>
                </NavLink>
              )}
            </div>
          )}
        </div>
        {Number(user?.roleId) !== Roles.Admin && (
          <div
            className={styles.postingBtn}
            onClick={handleNavigateToPublishing}
          >
            <span className="text-primary hover:text-white text-[16px] flex flex-col items-center font-extrabold">
              POSTING
            </span>
          </div>
        )}
      </div>
      <UnderMaintenance
        setStatus={setIsUnderMaintenance}
        status={isUnderMaintenance}
        maintenanceMessage={maintenanceMessage}
      />
    </>
  )
}
