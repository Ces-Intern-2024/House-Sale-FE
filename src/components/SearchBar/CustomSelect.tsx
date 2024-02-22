import React, { useRef, useState, useEffect } from 'react'
import {
  ScrollArea,
  TextInput,
  UnstyledButton,
  Box,
  Text,
  Collapse,
} from '@mantine/core'

import {
  IconChevronDown,
  IconChevronUp,
  IconCheck,
  IconMathEqualLower,
} from '@tabler/icons-react'

interface KVObj {
  key: string
  value: string
}
interface SearchBarProps {
  list: KVObj[]
  value?: string
  setValue: (value: string) => void
  icon: JSX.Element
  placeHolder: string
  lessThan?: boolean
}

export default function CustomSelect({
  list,
  value,
  setValue,
  icon,
  placeHolder,
  lessThan,
}: SearchBarProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState<string>('')
  const [inputValue, setInputValue] = useState(value)

  const [hovered, setHovered] = useState(-1)

  const [opened2, setOpened2] = useState(false)

  const [selectedKey, setSelectedKey] = useState('')

  const toggleDropdown = async () => await setOpened2((prev) => !prev)

  const IconElement = React.cloneElement(icon, {
    onClick: toggleDropdown,
    className: 'cursor-text text-primary',
  })

  const filtered = list.filter((item) =>
    item.key.toLowerCase().includes(query.toLowerCase()),
  )

  const findKeyByValue = (value: string) => {
    const temp = list.find((el) => el.value === value)

    return temp ? temp.key : ''
  }

  const items = filtered.map((item, index) => (
    <UnstyledButton
      data-list-item
      key={item.key}
      value={item.value}
      display="block"
      bg={index === hovered ? 'var(--mantine-color-blue-light)' : undefined}
      w="100%"
      p={5}
    >
      {item.key}
    </UnstyledButton>
  ))

  const handleItemClick = (key: any, value: any) => {
    // this works as deselect :)
    if (selectedKey === key) {
      setInputValue('')
      setSelectedKey('')
      setValue('')
    } else {
      setInputValue(key)
      setSelectedKey(key)
      setValue(value)
    }
    setOpened2(false)
    setQuery('')
  }

  useEffect(() => {
    if (selectedKey) {
      setInputValue(selectedKey)
    }
  }, [selectedKey])

  useEffect(() => {
    setInputValue(value ? findKeyByValue(value) : '')
  }, [value, list])

  return (
    <>
      <div className="">
        <TextInput
          leftSection={IconElement}
          rightSection={
            opened2 ? (
              <IconChevronUp
                onClick={async () => await setOpened2((prev) => !prev)}
                size={17}
                className=" cursor-text"
              ></IconChevronUp>
            ) : (
              <IconChevronDown
                onClick={async () => await setOpened2((prev) => !prev)}
                size={17}
                className=" cursor-text"
              ></IconChevronDown>
            )
          }
          value={inputValue}
          onClick={async () => await setOpened2((prev) => !prev)}
          onChange={(event) => {
            setOpened2(true)
            setInputValue(event.currentTarget.value)
            setQuery(event.currentTarget.value)

            setHovered(-1)
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              setHovered((current) => {
                const nextIndex =
                  current + 1 >= filtered.length ? current : current + 1
                viewportRef.current
                  ?.querySelectorAll('[data-list-item]')
                  ?.[nextIndex]?.scrollIntoView({ block: 'nearest' })
                return nextIndex
              })
            }

            if (event.key === 'ArrowUp') {
              event.preventDefault()
              setHovered((current) => {
                const nextIndex = current - 1 < 0 ? current : current - 1
                viewportRef.current
                  ?.querySelectorAll('[data-list-item]')
                  ?.[nextIndex]?.scrollIntoView({ block: 'nearest' })
                return nextIndex
              })
            }
          }}
          placeholder={placeHolder}
        />

        <Collapse in={opened2}>
          <ScrollArea.Autosize
            viewportRef={viewportRef}
            mah={200}
            type="always"
            scrollbars="y"
            className="border rounded-md"
          >
            <Box px="xs" py={5}>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <Box
                    className=" flex items-center justify-between pr-2"
                    key={index}
                    onClick={() => handleItemClick(item.key, item.props.value)}
                  >
                    <Text className=" flex items-center">
                      {lessThan && (
                        <IconMathEqualLower size={29}></IconMathEqualLower>
                      )}
                      {item}
                    </Text>
                    {selectedKey === item.key && (
                      <IconCheck
                        color="gray"
                        className=" font-bold"
                        size={20}
                      />
                    )}
                  </Box>
                ))
              ) : (
                <Text color="dimmed">Nothing found</Text>
              )}
            </Box>
          </ScrollArea.Autosize>
        </Collapse>
      </div>
    </>
  )
}
