import React, { useEffect, useState } from 'react'
import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import styles from './TextSearchBar.module.scss'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setIsSmallScreen } from '../../redux/reducers/resizeSlice'
import { useNavigate } from 'react-router-dom'

export default function TextSearchBar() {
  const dispatch = useAppDispatch()
  const isSmallScreen = useAppSelector((state) => state.resize.isSmallScreen)
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  console.log(isSmallScreen)

  const handleSearch = () => {
    navigate('/search', { state: { searchValue } })
  }

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
  const rightIcon = (
    <div onClick={handleSearch}>
      <IconSearch className={styles.icon} />
    </div>
  )

  return (
    <>
      <TextInput
        onChange={(event) => setSearchValue(event.currentTarget.value)}
        className=" cursor-pointer"
        radius="xl"
        size={isSmallScreen ? 'md' : 'lg'}
        rightSection={rightIcon}
        placeholder="Search here..."
        classNames={{
          wrapper: styles.wrapper,
          input: styles.input,
          section: styles.section,
        }}
        value={searchValue}
      />
    </>
  )
}
