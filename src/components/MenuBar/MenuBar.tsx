import React from 'react'
import { Menu, Button } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import styles from './MenuBar.module.scss'
import { Avatar } from '@mantine/core'

interface MenuBarProps {
  isOfDrawers: boolean
}
export default function MenuBar(props: MenuBarProps) {
  return (
    <>
      <div className={props.isOfDrawers ? styles.outerOfDrawers : styles.outer}>
        <div>
          <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
              <Button className={styles.button}>HOME</Button>
            </Menu.Target>
          </Menu>
        </div>
        <div>
          <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
              <Button className={styles.button}>ABOUT US</Button>
            </Menu.Target>
          </Menu>
        </div>

        <div>
          <Menu
            trigger="click-hover"
            openDelay={100}
            closeDelay={400}
            width={150}
            position={props.isOfDrawers ? 'right-start' : 'bottom'}
          >
            <Menu.Target>
              <Button className={styles.button}>
                FOR SALE
                <IconChevronDown className={styles.icon} />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Search</Menu.Item>
              <Menu.Item>House</Menu.Item>
              <Menu.Item>Apartment</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        <div>
          <Menu
            trigger="click-hover"
            openDelay={100}
            closeDelay={400}
            width={150}
            position={props.isOfDrawers ? 'right-start' : 'bottom'}
          >
            <Menu.Target>
              <Button className={styles.button}>
                FOR RENT
                <IconChevronDown className={styles.icon} />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Search</Menu.Item>
              <Menu.Item>House</Menu.Item>
              <Menu.Item>Apartment</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        <div>
          <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
              <Button className={styles.button}>CONTACT</Button>
            </Menu.Target>
          </Menu>
        </div>
        <div className={styles.login}>
          <Avatar color="white" />
          <a href="#" className={styles.loginBtn}>
            Log In
          </a>
        </div>
      </div>
    </>
  )
}
