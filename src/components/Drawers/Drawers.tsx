import React from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Drawer, Button } from '@mantine/core'
import MenuBar from '../MenuBar/MenuBar'
import { FaAlignJustify } from 'react-icons/fa'
import styles from './Drawers.module.scss'
import logo from '../../assets/images/logo_transparent.png'

export default function Drawers() {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <Drawer
        opened={opened}
        size="sm"
        onClose={close}
        className={styles.drawers}
      >
        <div className={styles.drawersContent}>
          <img src={logo} className={styles.logo}></img>
        </div>
        <MenuBar isOfDrawers={true} />
      </Drawer>

      <Button onClick={open} className={styles.toggleBtn}>
        <FaAlignJustify className={styles.iconAlign} />
      </Button>
    </>
  )
}
