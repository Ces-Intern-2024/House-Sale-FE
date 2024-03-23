import React from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Drawer, Button } from '@mantine/core'
import MenuBar from '../MenuBar/MenuBar'
import { FaAlignJustify } from 'react-icons/fa'
import styles from './Drawers.module.scss'
import logo from '../../assets/images/logo_transparent.png'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'

export default function Drawers() {
  const [opened, { open, close }] = useDisclosure(false)
  const userAuthority = useAppSelector((state) => state.user.roleId)
  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        className={styles.drawers}
        size="80%"
      >
        <div className={styles.drawersContent}>
          <Link to="/home" onClick={close}>
            <img src={logo} className={styles.logo} />
          </Link>
        </div>
        <MenuBar
          isOfDrawers={true}
          closeDrawer={close}
          userAuthority={userAuthority!}
        />
      </Drawer>

      <Button onClick={open} classNames={{ root: styles.toggleBtn }}>
        <FaAlignJustify className={styles.iconAlign} />
      </Button>
    </>
  )
}
