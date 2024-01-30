import React from 'react'
import { Menu, Button } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import styles from './MenuBar.module.scss'

interface MenuBarProps {
  isOfDrawers: boolean
}
export default function MenuBar({ isOfDrawers }: MenuBarProps) {
  const OPEN_DELAY = 50
  const CLOSE_DELAY = 50

  return (
    <>
      <div className={isOfDrawers ? styles.outerOfDrawers : styles.outer}>
        <div>
          <Menu trigger="click" openDelay={OPEN_DELAY} closeDelay={CLOSE_DELAY}>
            <Menu.Target>
              <Button className={styles.button}>ABOUT US</Button>
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
              <Button className={styles.button}>
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
              <Button className={styles.button}>
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
              <Button className={styles.button}>CONTACT</Button>
            </Menu.Target>
          </Menu>
        </div>

        <div>
          <Menu trigger="click" openDelay={OPEN_DELAY} closeDelay={CLOSE_DELAY}>
            <Menu.Target>
              <div className="flex">
                {/* <Avatar color="white" /> */}
                <Button className={styles.button}>LOG IN</Button>
              </div>
            </Menu.Target>
          </Menu>
        </div>
      </div>
    </>
  )
}
