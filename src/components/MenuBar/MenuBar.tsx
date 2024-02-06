import React from 'react'
import { Menu, Button, Avatar } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import styles from './MenuBar.module.scss'
import { getItem, inforUser, removeItem } from '../../utils/localStorage'
import { Link, useNavigate } from 'react-router-dom'

interface MenuBarProps {
  isOfDrawers: boolean
}
export default function MenuBar({ isOfDrawers }: MenuBarProps) {
  const OPEN_DELAY = 50
  const CLOSE_DELAY = 50
  const data: inforUser | undefined = getItem('data')
  const navigate = useNavigate()
  const handleLogout = () => {
    removeItem('data')
    navigate('/')
  }

  return (
    <>
      <div className={isOfDrawers ? styles.outerOfDrawers : styles.outer}>
        <div>
          <Menu trigger="click" openDelay={OPEN_DELAY} closeDelay={CLOSE_DELAY}>
            <Menu.Target>
              <Button color="transparent" className={styles.button}>
                ABOUT US
              </Button>
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
              <Button color="transparent" className={styles.button}>
                FOR RENT
                <IconChevronDown className={styles.icon} />
              </Button>
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
              <Button color="transparent" className={styles.button}>
                FOR SALE
                <IconChevronDown className={styles.icon} />
              </Button>
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
              <Button color="transparent" className={styles.button}>
                CONTACT
              </Button>
            </Menu.Target>
          </Menu>
        </div>

        <div>
          <Menu trigger="click" openDelay={OPEN_DELAY} closeDelay={CLOSE_DELAY}>
            <Menu.Target>
              <div className="flex items-center cursor-pointer">
                {data ? (
                  <>
                    <Menu
                      trigger="click-hover"
                      openDelay={OPEN_DELAY}
                      closeDelay={CLOSE_DELAY}
                      width={150}
                      position={isOfDrawers ? 'right-start' : 'bottom'}
                      withArrow
                    >
                      <Menu.Target>
                        <Button
                          className={styles.btnProfile}
                          color="transparent"
                        >
                          <Avatar color="white" />
                          <h3 className=" text-white font-bold ml-1">
                            {data.user.fullName
                              ? data.user.fullName.toUpperCase()
                              : 'USER'}
                          </h3>
                        </Button>
                      </Menu.Target>
                      <Menu.Dropdown className=" flex-col justify-center">
                        <Menu.Item className={styles.dropdown}>
                          PROFILE
                        </Menu.Item>
                        <Menu.Item className={styles.dropdown}>
                          <h1 onClick={handleLogout}>LOG OUT</h1>
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </>
                ) : (
                  <Link to="/login">
                    <Button color="transparent" className={styles.button}>
                      LOG IN
                    </Button>
                  </Link>
                )}
              </div>
            </Menu.Target>
          </Menu>
        </div>
      </div>
    </>
  )
}
