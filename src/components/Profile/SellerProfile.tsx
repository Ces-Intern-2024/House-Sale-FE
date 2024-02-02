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
  PasswordInput,
  Stack,
} from '@mantine/core'
import {
  IconCamera,
  IconPencil,
  IconDiscountCheckFilled,
} from '@tabler/icons-react'
import styles from './SellerProfile.module.scss'
import { useDisclosure } from '@mantine/hooks'

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(' ')
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(' ')
    return splittedSearch.every((searchWord) =>
      words.some((word) => word.includes(searchWord)),
    )
  })
}
/**
 * The comments are kept in case we wanna use it in the future.
 */
export default function SellerProfile() {
  const [file, setFile] = useState<File | null>(null)
  const [nameEditing, setNameEditing] = useState(false)
  const [phoneEditing, setPhoneEditing] = useState(false)
  const nameInputRef: any = useRef(null)
  const phoneInputRef: any = useRef(null)
  const [visible, { toggle }] = useDisclosure(false)
  const [visibleCurrentPw, handlers] = useDisclosure(false)

  const handleToggleCurrentPassword = (prop: boolean) => {
    prop ? handlers.open() : handlers.close()
  }

  // const [emailEditing, setEmailEditing] = useState(false)
  // const [addressEditing, setAddressEditing] = useState(false)
  // const emailInputRef: any = useRef(null)
  // const addressInputRef: any = useRef(null)

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>My Profile</h1>
        <Divider my="md" />
        <div className={styles.outer}>
          <div className={styles.imgOuter}>
            <div className={styles.imgInner}>
              <Avatar
                src={file ? URL.createObjectURL(file) : undefined}
                size={150}
                className={styles.avatar}
              ></Avatar>
              <FileButton onChange={setFile} accept="image/png,image/jpeg">
                {(props) => (
                  <Button {...props} className={styles.uploadBtn}>
                    <IconCamera className="mr-1" />
                    Upload Image
                  </Button>
                )}
              </FileButton>
            </div>
          </div>
          <div className={styles.personalInfoOuter}>
            <h1 className={styles.title}>Personal Information</h1>
            <Stack>
              <TextInput
                id="name"
                className="font-semibold"
                size="md"
                w="100%"
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
                      className="cursor-pointer"
                    ></IconPencil>
                  ) : (
                    <IconDiscountCheckFilled
                      onClick={() => setNameEditing(false)}
                      className={styles.editIcon}
                    />
                  )
                }
              />
              <TextInput
                id="email"
                size="md"
                w="100%"
                label="Email"
                placeholder="Email"
                defaultValue="roseannepark@gmail.com"
                readOnly
                // ref={emailInputRef}
                // readOnly={emailEditing ? false : true}
                // rightSection={
                //   !emailEditing ? (
                //     <IconPencil
                //       onClick={() => {
                //         setEmailEditing(true)
                //         emailInputRef.current.focus()
                //       }}
                //       className=" cursor-pointer"
                //     ></IconPencil>
                //   ) : (
                //     <IconDiscountCheckFilled
                //       onClick={() => setEmailEditing(false)}
                //       className=" text-blue-500 cursor-pointer"
                //     />
                //   )
                // }
              />

              <TextInput
                id="phone"
                size="md"
                w="100%"
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
                      className="cursor-pointer"
                    ></IconPencil>
                  ) : (
                    <IconDiscountCheckFilled
                      onClick={() => setPhoneEditing(false)}
                      className={styles.editIcon}
                    />
                  )
                }
              />

              <TextInput
                id="address"
                size="md"
                w="100%"
                label="Address"
                placeholder="Address"
                defaultValue="27 Le Do Street"
                readOnly
                // ref={addressInputRef}
                // readOnly={addressEditing ? false : true}
                // rightSection={
                //   !addressEditing ? (
                //     <IconPencil
                //       onClick={() => {
                //         setAddressEditing(true)
                //         addressInputRef.current.focus()
                //       }}
                //       className=" cursor-pointer"
                //     ></IconPencil>
                //   ) : (
                //     <IconDiscountCheckFilled
                //       onClick={() => setAddressEditing(false)}
                //       className=" text-blue-500 cursor-pointer"
                //     />
                //   )
                // }
              />
              <div className=" flex gap-x-3">
                <Select
                  readOnly
                  size="md"
                  classNames={{ label: styles.label }}
                  w="50%"
                  checkIconPosition="right"
                  label="District"
                  placeholder="Thanh Khe"
                  data={['Thanh Khe', 'Hai Chau', 'Lien Chieu', 'Cam Le']}
                  filter={optionsFilter}
                  searchable
                  comboboxProps={{
                    position: 'bottom',
                    offset: 0,
                    transitionProps: { transition: 'pop', duration: 200 },
                  }}
                />

                <Select
                  readOnly
                  size="md"
                  w="50%"
                  classNames={{ label: styles.label }}
                  checkIconPosition="right"
                  label="City"
                  placeholder="Danang"
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
              <div className={styles.btnContainer}>
                <Button size="md" className={styles.btn}>
                  Save Changes
                </Button>
              </div>
            </Stack>
          </div>

          <div className={styles.pwContainer}>
            <h1 className={styles.title}>Change Password</h1>
            <Stack>
              <PasswordInput
                size="md"
                label="Current Password"
                defaultValue="secret"
                visible={visibleCurrentPw}
                onVisibilityChange={() =>
                  handleToggleCurrentPassword(!visibleCurrentPw)
                }
              />
              <PasswordInput
                size="md"
                label="New Password"
                defaultValue="secret"
                visible={visible}
                onVisibilityChange={toggle}
              />
              <PasswordInput
                size="md"
                label="Confirm Password"
                defaultValue="secret"
                visible={visible}
                onVisibilityChange={toggle}
              />
              <div className={styles.btnContainer}>
                <Button size="md" className={styles.btn}>
                  Confirm
                </Button>
              </div>
            </Stack>
          </div>
        </div>
      </div>
    </>
  )
}
