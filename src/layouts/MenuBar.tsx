import React from 'react'
import { Menu, Button } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { Avatar } from '@mantine/core'

export default function MenuBar() {
  return (
    <>
      <div className="flex items-center justify-center py-2">
        <div className="hover:bg-sky-700 hover:text-white">
          <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
              <Button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#0ba1e4',
                }}
              >
                HOME
              </Button>
            </Menu.Target>
          </Menu>
        </div>
        <div className="hover:bg-sky-700 hover:text-white">
          <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
              <Button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#0ba1e4',
                }}
              >
                ABOUT US
              </Button>
            </Menu.Target>
          </Menu>
        </div>

        <div className="hover:bg-sky-700 hover:text-white">
          <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
              <Button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#0ba1e4',
                }}
              >
                FOR SALE
                <IconChevronDown style={{ width: '15px' }} />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Search</Menu.Item>
              <Menu.Item>House</Menu.Item>
              <Menu.Item>Apartment</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        <div className="hover:bg-sky-700 hover:text-white">
          <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
              <Button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#0ba1e4',
                }}
              >
                FOR RENT
                <IconChevronDown style={{ width: '15px' }} />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Search</Menu.Item>
              <Menu.Item>House</Menu.Item>
              <Menu.Item>Apartment</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        <div className="hover:bg-sky-700 hover:text-white">
          <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
              <Button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#0ba1e4',
                }}
              >
                CONTACT
              </Button>
            </Menu.Target>
          </Menu>
        </div>
        <div className="flex items-center gap-2 text-[#0ba1e4] font-bold ">
          <Avatar />
          <a href="#">SignUp</a>
        </div>
      </div>
    </>
  )
}
