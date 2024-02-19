import React, { useState, useEffect } from 'react'
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
  Modal,
} from '@mantine/core'
import {
  IconCamera,
  IconPencil,
  IconX,
  IconDeviceFloppy,
  IconSquareRoundedXFilled,
} from '@tabler/icons-react'
import styles from './UserProfile.module.scss'
import { useDisclosure } from '@mantine/hooks'

import {
  getProfile,
  uploadAvatar,
  uploadAvatarToCloudinary,
  changePassword,
} from '../../service/ProfileService'
import { User } from '../../types/user'
import Swal from 'sweetalert2'
import { useForm } from '@mantine/form'
import { yupResolver } from 'mantine-form-yup-resolver'
import * as yup from 'yup'
import {
  useFetchProvincesQuery,
  useFetchDistrictsQuery,
  useFetchWardsQuery,
} from '../../redux/reducers/locationSlice'

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
  const [locationEditing, setLocationEditing] = useState(false)

  const [visible, { toggle }] = useDisclosure(false)
  const [visibleCurrentPw, handlers] = useDisclosure(false)
  const [opened, { open, close }] = useDisclosure(false)

  const [userInfo, setUserInfo] = useState<User>()

  const [loading, setLoading] = useState(false)

  const [showSaveProfileBtn, setShowSaveProfileBtn] = useState(false)

  const { data: provinces = [] } = useFetchProvincesQuery()
  const [provinceCode, setProvinceCode] = useState('')
  const { data: districts = [] } = useFetchDistrictsQuery(provinceCode, {
    skip: !provinceCode,
  })
  const [districtCode, setDistrictCode] = useState<string | null>('')
  const { data: wards = [] } = useFetchWardsQuery(districtCode, {
    skip: !districtCode,
  })
  const [wardCode, setWardCode] = useState<string | null>('')

  const listSchema = yup.object().shape({
    fullName:
      nameEditing && userInfo?.role.roleName === 'Seller'
        ? yup.string().required('Name is required')
        : yup.string().nullable(),
    phone:
      phoneEditing && userInfo?.role.roleName === 'Seller'
        ? yup
            .string()
            .matches(/^[0-9]+$/, 'Phone number must contain only digits')
            .length(10, 'The phone number must be 10 digits long.')
            .required('Phone number is required')
        : yup.string().nullable(),

    provinceCode: locationEditing
      ? yup.string().required('City/Province is required')
      : yup.string().nullable(),
    districtCode: locationEditing
      ? yup.string().required('District is required')
      : yup.string().nullable(),
    wardCode: locationEditing
      ? yup.string().required('Ward is required')
      : yup.string().nullable(),
    address: addressEditing
      ? yup.string().required('Address is required')
      : yup.string().nullable(),
  })

  const passwordSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .matches(
        /^(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Password must contain at least 1 number and 1 character',
      )
      .min(8)
      .required('Current Password is required'),
    newPassword: yup
      .string()
      .matches(
        /^(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Password must contain at least 1 number and 1 character',
      )
      .min(8)
      .test(
        'not-same-as-current',
        'New password cannot be the same as the current password.',
        function (value) {
          return this.parent.currentPassword !== value
        },
      )
      .required('New Password is required'),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Confirm Password must match')
      .required('Password Confirmation is required'),
  })

  const form = useForm({
    initialValues: {
      email: userInfo?.email,
      fullName: userInfo?.fullName,
      phone: userInfo?.phone,
      provinceCode: userInfo?.province?.provinceCode,
      districtCode: userInfo?.district?.districtCode,
      wardCode: userInfo?.ward?.wardCode,
      address: userInfo?.address,
    },
    validate: yupResolver(listSchema),
  })

  const passwordForm = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validate: yupResolver(passwordSchema),
  })

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
    const data = await getProfile()

    setUserInfo(data)

    console.log('user ' + JSON.stringify(data))

    if (data.province) {
      setProvinceCode(data.province.provinceCode)
      setDistrictCode(data.district.districtCode)
      setWardCode(data.ward.wardCode)
    }
  }

  const handleUpdateProfile = async (values: any) => {
    alert(JSON.stringify(values))
  }

  const handleChangePassword = async (values: any) => {
    console.log(JSON.stringify(values))

    passwordForm.clearErrors()
    const { currentPassword, newPassword } = values
    try {
      await changePassword({ currentPassword, newPassword })
      close()
      passwordForm.reset()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Password has been changed successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (err: any) {
      passwordForm.setErrors({
        currentPassword: err.response.data.error.message,
      })
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  return (
    <>
      <div className={styles.container}>
        <div className=" flex justify-between">
          <h1 className={styles.heading}>My Profile</h1>
          <Button variant="outline" onClick={open}>
            Change Password
          </Button>
        </div>

        <Divider my="md" />
        <div className={styles.outer}>
          <div className={styles.imgOuter}>
            <div className={styles.imgInner}>
              {!file && userInfo?.avatar && (
                <IconSquareRoundedXFilled
                  className={styles.clearAvatar}
                  onClick={handleClearAvatar}
                ></IconSquareRoundedXFilled>
              )}
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
              <div className={styles.saveAndCancel}>
                <Button
                  loading={loading ? true : false}
                  bg="green"
                  onClick={handleUploadAvatar}
                >
                  <IconDeviceFloppy className="mr-1" />
                  Save Avatar
                </Button>

                <Button
                  bg="red"
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
            <form
              onSubmit={form.onSubmit((values) => handleUpdateProfile(values))}
            >
              <Stack>
                <TextInput
                  {...form.getInputProps('fullName')}
                  id="name"
                  className="font-semibold"
                  size="md"
                  w="100%"
                  label="Your name"
                  placeholder="Your Name"
                  rightSection={<IconPencil></IconPencil>}
                  onKeyUp={(event) => {
                    setNameEditing(true)
                    setShowSaveProfileBtn(true)
                    form.setFieldValue('fullName', event.currentTarget.value)
                  }}
                  defaultValue={userInfo?.fullName?.toString().toUpperCase()}
                />
                <TextInput
                  {...form.getInputProps('email')}
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
                  {...form.getInputProps('phone')}
                  defaultValue={userInfo?.phone}
                  id="phone"
                  size="md"
                  w="100%"
                  label="Phone Number"
                  placeholder="Phone Number"
                  rightSection={<IconPencil></IconPencil>}
                  onKeyUp={(event) => {
                    setPhoneEditing(true)
                    setShowSaveProfileBtn(true)
                    form.setFieldValue('phone', event.currentTarget.value)
                  }}
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
                  rightSection={<IconPencil></IconPencil>}
                  {...form.getInputProps('address')}
                  onKeyUp={(event) => {
                    setAddressEditing(true)
                    setShowSaveProfileBtn(true)
                    form.setFieldValue('address', event.currentTarget.value)
                  }}
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
                    onChange={async (_value: any) => {
                      form.setFieldValue('provinceCode', _value)
                      setProvinceCode(_value)
                      setDistrictCode(null)
                      setWardCode(null)
                      setLocationEditing(true)
                      setShowSaveProfileBtn(true)
                    }}
                    value={provinceCode}
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
                    onChange={(_value: any) => {
                      form.setFieldValue('districtCode', _value)
                      setDistrictCode(_value)
                      setWardCode(null)
                      setLocationEditing(true)
                      setShowSaveProfileBtn(true)
                    }}
                    value={districtCode}
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
                    onChange={(_value: any) => {
                      form.setFieldValue('wardCode', _value)
                      setWardCode(_value)
                      setLocationEditing(true)
                      setShowSaveProfileBtn(true)
                    }}
                    value={wardCode}
                  />
                </div>

                <div className={styles.btnContainer}>
                  <Button
                    size="md"
                    type="submit"
                    className={
                      showSaveProfileBtn ? styles.btn : styles.disableBtn
                    }
                    disabled={showSaveProfileBtn ? false : true}
                  >
                    Save Changes
                  </Button>
                </div>
              </Stack>
            </form>
          </div>
        </div>

        <Modal
          opened={opened}
          onClose={() => {
            passwordForm.reset()
            close()
          }}
          centered
          classNames={{ title: styles.pwTitle }}
          title="Change Password"
        >
          <form
            onSubmit={passwordForm.onSubmit((values) =>
              handleChangePassword(values),
            )}
          >
            <Stack>
              <PasswordInput
                {...passwordForm.getInputProps('currentPassword')}
                size="md"
                label="Current Password"
                placeholder="Current Password"
                visible={visibleCurrentPw}
                onVisibilityChange={() =>
                  handleToggleCurrentPassword(!visibleCurrentPw)
                }
                onChange={(event) =>
                  passwordForm.setFieldValue(
                    'currentPassword',
                    event.currentTarget.value,
                  )
                }
              />
              <PasswordInput
                {...passwordForm.getInputProps('newPassword')}
                size="md"
                label="New Password"
                placeholder="New Password"
                visible={visible}
                onVisibilityChange={toggle}
                onChange={(event) =>
                  passwordForm.setFieldValue(
                    'newPassword',
                    event.currentTarget.value,
                  )
                }
              />
              <PasswordInput
                {...passwordForm.getInputProps('confirmNewPassword')}
                size="md"
                label="Confirm Password"
                placeholder="Confirm Password"
                visible={visible}
                onVisibilityChange={toggle}
                onChange={(event) =>
                  passwordForm.setFieldValue(
                    'confirmNewPassword',
                    event.currentTarget.value,
                  )
                }
              />
              <div className={styles.btnContainer}>
                <Button size="md" type="submit" className={styles.btn}>
                  Confirm
                </Button>
              </div>
            </Stack>
          </form>
        </Modal>
      </div>
    </>
  )
}
