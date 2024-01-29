import React, { useEffect } from 'react'
import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import styles from './TextSearchBar.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSmallScreen } from '../../redux/action'

export default function TextSearchBar() {
  const dispatch = useDispatch()
  const isSmallScreen = useSelector(
    (state: any) => state.resizeReducer.isSmallScreen,
  )
  console.log(isSmallScreen)

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsSmallScreen(window.innerWidth < 600))
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [dispatch])
  const rightIcon = <IconSearch className={styles.icon} />
  return (
    <>
      <TextInput
        className=" cursor-pointer"
        radius="xl"
        size={isSmallScreen ? 'md' : 'lg'}
        // leftSectionPointerEvents="none"
        rightSection={rightIcon}
        placeholder="Search here..."
        classNames={{
          wrapper: styles.wrapper,
          input: styles.input,
          section: styles.section,
        }}
      />
    </>
  )
}
