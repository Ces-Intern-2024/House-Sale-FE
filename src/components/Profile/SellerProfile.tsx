import React, { useState, useRef, useEffect } from 'react'
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
  IconX,
  IconDeviceFloppy,
  IconSquareRoundedXFilled,
} from '@tabler/icons-react'
import styles from './SellerProfile.module.scss'
import { useDisclosure } from '@mantine/hooks'
import { getItem } from '../../utils/localStorage'
import { getProfile } from '../../service/ProfileService'
import { User } from '../../types/user'
import {
  uploadAvatar,
  uploadAvatarToCloudinary,
} from '../../service/AvatarService'
import Swal from 'sweetalert2'
import {
  getProvinces,
  getDistricts,
  getWards,
} from '../../service/LocationService'
import { useForm } from '@mantine/form'
import { yupResolver } from 'mantine-form-yup-resolver'
import * as yup from 'yup'

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
  const [addressEditing, setAddressEditing] = useState(false)
  const nameInputRef: any = useRef(null)
  const phoneInputRef: any = useRef(null)
  const addressInputRef: any = useRef(null)
  const [visible, { toggle }] = useDisclosure(false)
  const [visibleCurrentPw, handlers] = useDisclosure(false)
  const [userInfo, setUserInfo] = useState<User>()
  const [loading, setLoading] = useState(false)
  const [provinces, setProvinces] = useState<[]>([])
  const [districts, setDistricts] = useState<[]>([])
  const [wards, setWards] = useState<[]>([])
  const listSchema = yup.object().shape({
    fullName:
      nameEditing || phoneEditing || addressEditing
        ? yup.string().required('Name is required')
        : yup.string().nullable(),
    phone:
      nameEditing || phoneEditing || addressEditing
        ? yup.string().length(10).required('Phone number is required')
        : yup.string().nullable(),
    password: yup
      .string()
      .matches(
        /^(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Password must contain at least 1 number and 1 character',
      )
      .min(8)
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Password must match')
      .required('Password Confirmation is required!'),

    provinceCode:
      nameEditing || phoneEditing || addressEditing
        ? yup.string().required('City/Province is required')
        : yup.string().nullable(),
    districtCode:
      nameEditing || phoneEditing || addressEditing
        ? yup.string().required('District is required')
        : yup.string().nullable(),
    wardCode:
      nameEditing || phoneEditing || addressEditing
        ? yup.string().required('Ward is required')
        : yup.string().nullable(),
    address:
      nameEditing || phoneEditing || addressEditing
        ? yup.string().required('Address is required')
        : yup.string().nullable(),
  })

  const form = useForm({
    initialValues: {
      email: userInfo?.email,
      fullName: userInfo?.fullName,
      phone: userInfo?.phone,
      provinceCode: userInfo?.province?.provinceCode
        ? userInfo?.province?.provinceCode
        : null,
      districtCode: userInfo?.district?.districtCode
        ? userInfo?.district?.districtCode
        : null,
      wardCode: userInfo?.ward?.wardCode || null,
      address: userInfo?.address,
    },
    validate: yupResolver(listSchema),
  })

  const getAllProvinces = async () => {
    const data = await getProvinces()
    setProvinces(data)
    console.log(data)
  }
  const getAllDistricts = async (provinceCode: string | null) => {
    const data = await getDistricts(provinceCode)
    setDistricts(data)
    console.log('hi')
  }

  const getAllWards = async (districtCode: string | null) => {
    const data = await getWards(districtCode)
    setWards(data)
    console.log('hi')
  }

  const handleToggleCurrentPassword = (prop: boolean) => {
    prop ? handlers.open() : handlers.close()
  }

  const handleUploadAvatar = async () => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'gjwqdwrx')
      formData.append('api_key', '618339743287128')

      setLoading(true)
      const data = await uploadAvatarToCloudinary(formData)
      await uploadAvatar(data.secure_url)
      setLoading(false)

      setUserInfo(
        (prev) =>
          ({
            ...prev,
            avatar: data.secure_url,
          }) as User,
      )
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Avatar updated successfully!',
        showConfirmButton: false,
        timer: 1000,
      })
    }

    setFile(null)
    setLoading(false)
  }

  const handleClearAvatar = () => {
    Swal.fire({
      title: 'Do you want to delete profile image?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#2ac58b',
      denyButtonColor: '#fe6563',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await uploadAvatar(null)
        setUserInfo(
          (prev) =>
            ({
              ...prev,
              avatar: '',
            }) as User,
        )
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Avatar deleted successfully!',
          showConfirmButton: false,
          timer: 1000,
        })
      }
    })
  }

  const getUserProfile = async () => {
    const accessToken = getItem('data')
    const data = await getProfile(accessToken?.tokens.accessToken)
    setUserInfo(data)
    return data
  }

  useEffect(() => {
    const runFirst = async () => {
      const temp = await getUserProfile()
      await getAllProvinces()
      if (temp.province) {
        await getAllDistricts(temp.province.provinceCode)
        await getAllWards(temp.district.districtCode)
      }
    }
    runFirst()
  }, [])

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>My Profile</h1>
        <Divider my="md" />
        <div className={styles.outer}>
          <div className={styles.imgOuter}>
            <div className={styles.imgInner}>
              <IconSquareRoundedXFilled
                className=" z-10 absolute right-[10px] top-3  cursor-pointer opacity-50"
                onClick={handleClearAvatar}
              ></IconSquareRoundedXFilled>
              <Avatar
                src={file ? URL.createObjectURL(file) : userInfo?.avatar}
                size={150}
                className={styles.avatar}
              ></Avatar>

              <FileButton onChange={setFile} accept="image/png,image/jpeg">
                {(props) => (
                  <Button
                    {...props}
                    className={styles.uploadBtn}
                    disabled={loading ? true : false}
                  >
                    <IconCamera className="mr-1" />
                    Choose Image
                  </Button>
                )}
              </FileButton>
            </div>

            {file && (
              <div className=" mx-2 grid grid-flow-col grid-cols-2 gap-1">
                <Button
                  loading={loading ? true : false}
                  bg="green"
                  className={styles.uploadBtn}
                  onClick={handleUploadAvatar}
                >
                  <IconDeviceFloppy className="mr-1" />
                  Save Avatar
                </Button>
                <Button
                  bg="red"
                  className={styles.uploadBtn}
                  onClick={() => setFile(null)}
                  disabled={loading ? true : false}
                >
                  <IconX className="mr-1" />
                  Delete
                </Button>
              </div>
            )}
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
                placeholder="Your Name"
                defaultValue={userInfo?.fullName?.toString().toUpperCase()}
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
                value={userInfo?.email}
              />

              <TextInput
                defaultValue={userInfo?.phone}
                id="phone"
                size="md"
                w="100%"
                label="Phone Number"
                ref={phoneInputRef}
                placeholder="Phone Number"
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
                withAsterisk
                classNames={{ label: styles.label }}
                defaultValue={userInfo?.address}
                id="address"
                size="md"
                w="100%"
                label="Address"
                placeholder="Address"
                ref={addressInputRef}
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
                {...form.getInputProps('address')}
              />
              <div className=" flex gap-x-3 mobile:gap-y-5 xs:flex-row mobile:flex-col">
                <Select
                  size="md"
                  className=" flex-grow"
                  allowDeselect={false}
                  withAsterisk
                  checkIconPosition="right"
                  label="City/Province"
                  placeholder="City/Province"
                  data={provinces.flatMap((prov: any) => [
                    {
                      value: prov.provinceCode,
                      label: prov.nameEn,
                    },
                  ])}
                  filter={optionsFilter}
                  searchable
                  comboboxProps={{
                    position: 'bottom',
                    offset: 0,
                    transitionProps: { transition: 'pop', duration: 200 },
                  }}
                  {...form.getInputProps('provinceCode')}
                  value={userInfo?.province?.provinceCode ?? ''}
                  onChange={(_value: any) => {
                    form.setFieldValue('districtCode', null)
                    form.setFieldValue('wardCode', null)
                    form.setFieldValue('provinceCode', _value)
                    getAllDistricts(_value)
                  }}
                />
                <Select
                  size="md"
                  className=" flex-grow"
                  allowDeselect={false}
                  withAsterisk
                  classNames={{ label: styles.label }}
                  checkIconPosition="right"
                  label="District"
                  placeholder="District"
                  data={districts.flatMap((dist: any) => [
                    {
                      value: dist.districtCode,
                      label: dist.nameEn,
                    },
                  ])}
                  filter={optionsFilter}
                  searchable
                  comboboxProps={{
                    position: 'bottom',
                    offset: 0,
                    transitionProps: { transition: 'pop', duration: 200 },
                  }}
                  {...form.getInputProps('districtCode')}
                  value={userInfo?.district?.districtCode ?? ''}
                  onChange={(_value: any) => {
                    // to clear Ward
                    form.setFieldValue('wardCode', null)
                    // to display District
                    form.setFieldValue('districtCode', _value)
                    getAllWards(_value)
                  }}
                />
                <Select
                  size="md"
                  className=" flex-grow"
                  allowDeselect={false}
                  withAsterisk
                  classNames={{ label: styles.label }}
                  checkIconPosition="right"
                  label="Ward"
                  placeholder="Ward"
                  data={wards.flatMap((ward: any) => [
                    {
                      value: ward.wardCode,
                      label: ward.nameEn,
                    },
                  ])}
                  filter={optionsFilter}
                  searchable
                  comboboxProps={{
                    position: 'bottom',
                    offset: 0,
                    transitionProps: { transition: 'pop', duration: 200 },
                  }}
                  {...form.getInputProps('wardCode')}
                  value={userInfo?.ward?.wardCode ?? ''}
                />
              </div>

              <div className={styles.btnContainer}>
                <Button size="md" className={styles.btn}>
                  Save Changes
                </Button>
              </div>
            </Stack>
          </div>
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
    </>
  )
}
