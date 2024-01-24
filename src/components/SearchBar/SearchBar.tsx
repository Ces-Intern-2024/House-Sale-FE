import React, { useState } from 'react'
import { Menu, Button, Transition } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import styles from './SearchBar.module.scss'
import { FaAlignJustify, FaSearch } from 'react-icons/fa'

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleExpandSearch = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <>
      <div className={styles.outer}>
        <div className={isExpanded ? 'visible' : 'invisible'}>
          <Transition
            mounted={isExpanded ? true : false}
            transition="slide-up"
            duration={400}
            timingFunction="ease"
          >
            {(stylesParam) => (
              <div style={stylesParam}>
                <div className="grid grid-cols-2 md:grid-cols-4">
                  <Menu
                    trigger="click"
                    openDelay={100}
                    closeDelay={400}
                    width={200}
                    withArrow
                  >
                    <Menu.Target>
                      <div className={styles.btnOuter}>
                        <Button className={styles.searchBtn}>BED</Button>
                        <IconChevronDown />
                      </div>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item>Search</Menu.Item>
                      <Menu.Item>House</Menu.Item>
                      <Menu.Item>Apartment</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>

                  <Menu
                    trigger="click"
                    openDelay={100}
                    closeDelay={400}
                    width={200}
                    withArrow
                  >
                    <Menu.Target>
                      <div className={styles.btnOuter}>
                        <Button className={styles.searchBtn}>BATHROOM</Button>
                        <IconChevronDown />
                      </div>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item>Search</Menu.Item>
                      <Menu.Item>House</Menu.Item>
                      <Menu.Item>Apartment</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>

                  <Menu
                    trigger="click"
                    openDelay={100}
                    closeDelay={400}
                    width={200}
                    withArrow
                  >
                    <Menu.Target>
                      <div className={styles.btnOuter}>
                        <Button className={styles.searchBtn}>CATEGORY</Button>
                        <IconChevronDown />
                      </div>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item>Search</Menu.Item>
                      <Menu.Item>House</Menu.Item>
                      <Menu.Item>Apartment</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>

                  <Menu
                    trigger="click"
                    openDelay={100}
                    closeDelay={400}
                    width={200}
                    withArrow
                  >
                    <Menu.Target>
                      <div className={styles.btnOuter}>
                        <Button className={styles.searchBtn}>RENT/SALE</Button>
                        <IconChevronDown />
                      </div>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item>Search</Menu.Item>
                      <Menu.Item>House</Menu.Item>
                      <Menu.Item>Apartment</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </div>
              </div>
            )}
          </Transition>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 ">
          <Menu
            trigger="click"
            openDelay={100}
            closeDelay={400}
            width={200}
            withArrow
          >
            <Menu.Target>
              <div className={styles.btnOuter}>
                <Button className={styles.searchBtn}>PROVINCE</Button>
                <IconChevronDown />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Search</Menu.Item>
              <Menu.Item>House</Menu.Item>
              <Menu.Item>Apartment</Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Menu
            trigger="click"
            openDelay={100}
            closeDelay={400}
            width={200}
            withArrow
          >
            <Menu.Target>
              <div className={styles.btnOuter}>
                <Button className={styles.searchBtn}>DISTRICT</Button>
                <IconChevronDown />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Search</Menu.Item>
              <Menu.Item>House</Menu.Item>
              <Menu.Item>Apartment</Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Menu
            trigger="click"
            openDelay={100}
            closeDelay={400}
            width={200}
            withArrow
          >
            <Menu.Target>
              <div className={styles.btnOuter}>
                <Button className={styles.searchBtn}>WARD</Button>
                <IconChevronDown />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Search</Menu.Item>
              <Menu.Item>House</Menu.Item>
              <Menu.Item>Apartment</Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <div className={styles.flexBox}>
            <button className={styles.btnOuter} onClick={handleExpandSearch}>
              <FaAlignJustify />
            </button>
            <button className={styles.searchButton2}>
              <FaSearch></FaSearch> Search
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
