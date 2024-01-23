import React from 'react'
import { Menu, Button } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import styles from './SearchBar.module.scss'

export default function SearchBar() {
  return (
    <>
      <div className={styles.outer}>
        <Menu
          trigger="click"
          openDelay={100}
          closeDelay={400}
          width={150}
          withArrow
        >
          <Menu.Target>
            <div className={styles.searchBtn}>
              <Button>PROVINCE</Button>
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
          width={150}
          withArrow
          position="bottom"
        >
          <Menu.Target>
            <Button className={styles.searchBtn}>
              DISTRICT
              <IconChevronDown />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => console.log('hihhihihi')}>
              Search
            </Menu.Item>
            <Menu.Item>House</Menu.Item>
            <Menu.Item>Apartment</Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Menu
          trigger="click"
          openDelay={100}
          closeDelay={400}
          width={150}
          withArrow
          position="bottom"
        >
          <Menu.Target>
            <Button className={styles.searchBtn}>
              WARD
              <IconChevronDown />
            </Button>
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
          width={150}
          withArrow
          position="bottom"
        >
          <Menu.Target>
            <Button className={styles.searchBtn}>
              FOR SALE
              <IconChevronDown />
            </Button>
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
          width={150}
          withArrow
          position="bottom"
        >
          <Menu.Target>
            <Button className={styles.searchBtn}>
              FOR SALE
              <IconChevronDown />
            </Button>
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
          width={150}
          withArrow
          position="bottom"
        >
          <Menu.Target>
            <Button className={styles.searchBtn}>
              FOR SALE
              <IconChevronDown />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Search</Menu.Item>
            <Menu.Item>House</Menu.Item>
            <Menu.Item>Apartment</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <h1>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim in aut
        amet repudiandae ad, vero vitae odit molestiae adipisci minima ut,
        similique blanditiis quam ratione necessitatibus corrupti voluptatum
        error voluptates. Lorem, ipsum dolor sit amet consectetur adipisicing
        elit. Repudiandae, quas cumque commodi perspiciatis quidem optio, porro
        molestias numquam nulla debitis neque voluptate alias officiis
        voluptatem in omnis minus sint sed? Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Eos tempore reiciendis, rem quibusdam
        eveniet quia non nisi ipsum dignissimos, consectetur, modi ab neque
        quaerat fuga veniam dolorum porro nesciunt eum.
      </h1>
    </>
  )
}
