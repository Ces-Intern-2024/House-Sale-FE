import React, { useState, useRef } from 'react'
import {
  Divider,
  Avatar,
  FileButton,
  Button,
  TextInput,
  Select,
  ComboboxItem,
  OptionsFilter,
} from '@mantine/core'
import {
  IconCamera,
  IconPencil,
  IconDiscountCheckFilled,
} from '@tabler/icons-react'
import styles from './SellerProfile.module.scss'

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(' ')
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(' ')
    return splittedSearch.every((searchWord) =>
      words.some((word) => word.includes(searchWord)),
    )
  })
}

export default function SellerProfile() {
  const [file, setFile] = useState<File | null>(null)
  const [nameEditing, setNameEditing] = useState(false)
  const [emailEditing, setEmailEditing] = useState(false)
  const [phoneEditing, setPhoneEditing] = useState(false)
  const [addressEditing, setAddressEditing] = useState(false)
  const nameInputRef: any = useRef(null)
  const emailInputRef: any = useRef(null)
  const phoneInputRef: any = useRef(null)
  const addressInputRef: any = useRef(null)

  return (
    <>
      <div className="bg-white rounded-[5px] w-full min-h-[500px] p-5">
        <h1 className="text-[30px] font-semibold">My Profile</h1>
        <Divider my="md" />
        <div className=" flex gap-7 items-start md:flex-row mobile:flex-col">
          <div className={styles.imgOuter}>
            <div className="flex flex-col h-[100%] justify-between">
              <Avatar
                src={file ? URL.createObjectURL(file) : undefined}
                size={150}
                className="outline outline-2 outline-blue-200"
              ></Avatar>
              <FileButton onChange={setFile} accept="image/png,image/jpeg">
                {(props) => (
                  <Button {...props} color="blue" bg="#FFA836">
                    <IconCamera className=" mr-1" />
                    Upload Image
                  </Button>
                )}
              </FileButton>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <TextInput
              id="name"
              className=" font-semibold"
              size="md"
              w="400px"
              label="Your name"
              ref={nameInputRef}
              placeholder="Ms.Roseanne Park"
              defaultValue="Roseanne Park"
              readOnly={nameEditing ? false : true}
              rightSection={
                !nameEditing ? (
                  <IconPencil
                    onClick={() => {
                      setNameEditing(true)
                      nameInputRef.current.focus()
                    }}
                    className=" cursor-pointer"
                  ></IconPencil>
                ) : (
                  <IconDiscountCheckFilled
                    onClick={() => setNameEditing(false)}
                    className=" text-blue-500 cursor-pointer"
                  />
                )
              }
            />
            <TextInput
              id="email"
              size="md"
              w="400px"
              label="Email"
              ref={emailInputRef}
              placeholder="Email"
              defaultValue="roseannepark@gmail.com"
              readOnly={emailEditing ? false : true}
              rightSection={
                !emailEditing ? (
                  <IconPencil
                    onClick={() => {
                      setEmailEditing(true)
                      emailInputRef.current.focus()
                    }}
                    className=" cursor-pointer"
                  ></IconPencil>
                ) : (
                  <IconDiscountCheckFilled
                    onClick={() => setEmailEditing(false)}
                    className=" text-blue-500 cursor-pointer"
                  />
                )
              }
            />

            <TextInput
              id="phone"
              size="md"
              w="400px"
              label="Phone Number"
              ref={phoneInputRef}
              placeholder="Phone Number"
              defaultValue="0222777111"
              readOnly={phoneEditing ? false : true}
              rightSection={
                !phoneEditing ? (
                  <IconPencil
                    onClick={() => {
                      setPhoneEditing(true)
                      phoneInputRef.current.focus()
                    }}
                    className=" cursor-pointer"
                  ></IconPencil>
                ) : (
                  <IconDiscountCheckFilled
                    onClick={() => setPhoneEditing(false)}
                    className=" text-blue-500 cursor-pointer"
                  />
                )
              }
            />

            <TextInput
              id="address"
              size="md"
              w="400px"
              label="Address"
              ref={addressInputRef}
              placeholder="Address"
              defaultValue="27 Le Do Street"
              readOnly={addressEditing ? false : true}
              rightSection={
                !addressEditing ? (
                  <IconPencil
                    onClick={() => {
                      setAddressEditing(true)
                      addressInputRef.current.focus()
                    }}
                    className=" cursor-pointer"
                  ></IconPencil>
                ) : (
                  <IconDiscountCheckFilled
                    onClick={() => setAddressEditing(false)}
                    className=" text-blue-500 cursor-pointer"
                  />
                )
              }
            />
            <div className=" flex gap-3">
              <Select
                className=" w-[50%]"
                checkIconPosition="right"
                label="District"
                placeholder="Pick value"
                data={['React', 'Angular', 'Vue', 'Svelte']}
                filter={optionsFilter}
                searchable
                comboboxProps={{
                  position: 'bottom',
                  offset: 0,
                  transitionProps: { transition: 'pop', duration: 200 },
                }}
              />

              <Select
                className=" w-[50%]"
                checkIconPosition="right"
                label="City"
                placeholder="Pick value"
                data={['Danang', 'HCM', 'Hanoi', 'Hai Phong']}
                filter={optionsFilter}
                searchable
                comboboxProps={{
                  position: 'bottom',
                  offset: 0,
                  transitionProps: { transition: 'pop', duration: 200 },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
