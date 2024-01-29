import React, { useState } from 'react'
import { AppShell, Burger, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import logo from '../../../assets/images/logo_transparent.png'
import styles from './SellerLayout.module.scss'
import {
  IconDashboard,
  IconUserStar,
  IconGraph,
  IconLogout,
} from '@tabler/icons-react'

export default function SellerLayout() {
  const [opened, { toggle }] = useDisclosure()
  const [isSmall, setIsSmall] = useState(false)
  const SMALL_SCREEN_WIDTH = 70
  const LARGE_SCREEN_WIDTH = 180
  const ICON_SIZE = 30
  const APPSHELL_HEIGHT = 80
  return (
    <>
      <AppShell
        bg="primary"
        header={{ height: APPSHELL_HEIGHT }}
        navbar={{
          width: isSmall ? SMALL_SCREEN_WIDTH : LARGE_SCREEN_WIDTH,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header className={styles.header}>
          <Group h="100%" px="md" classNames={{ root: styles.root }}>
            <Burger opened={opened} onClick={toggle} size="sm" color="white" />
          </Group>
          <div>
            <img src={logo} className={styles.img} />
          </div>
          <IconLogout color="#1b2850" className={styles.iconColor} />
        </AppShell.Header>

        <AppShell.Navbar className={styles.navBar}>
          <div className={styles.navBarInner}>
            <div className={styles.navItem}>
              <IconDashboard color="green" size={ICON_SIZE} />
              {!isSmall && <h1 className={styles.navText}>DASH BOARD</h1>}
            </div>
            <div className={styles.navItem}>
              <IconUserStar color="green" size={ICON_SIZE} />
              {!isSmall && <h1 className={styles.navText}>PROFILE</h1>}
            </div>
            <div className={styles.navItem}>
              <IconGraph color="green" size={ICON_SIZE} />
              {!isSmall && <h1 className={styles.navText}>REPORT</h1>}
            </div>
          </div>

          <Group h="100%" px="md">
            <Burger
              opened={isSmall}
              onClick={() => {
                setIsSmall((prev) => !prev)
              }}
              visibleFrom="md"
              size="sm"
            />
          </Group>
        </AppShell.Navbar>

        <AppShell.Main className={styles.main}>
          This is main screen
        </AppShell.Main>
      </AppShell>
    </>
  )
}
