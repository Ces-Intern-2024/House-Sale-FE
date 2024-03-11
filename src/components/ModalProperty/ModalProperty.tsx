import React, { useState, useEffect, useMemo } from 'react'
import {
  FileButton,
  Button,
  Group,
  Select,
  NumberInput,
  Textarea,
  TextInput,
  Radio,
} from '@mantine/core'
import style from './ModalProperty.module.scss'
import { Category, Feature, Properties } from '@/types'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Province } from '@/types/province'
import {
  getAllProvinces,
  getAllDistricts,
  getAllWards,
} from '../../redux/reducers/locationReducer'
import { optionsFilter } from '../../utils/filterLocation'
import { District } from '@/types/district'
import { Ward } from '@/types/ward'
import { useForm } from '@mantine/form'
import { yupResolver } from 'mantine-form-yup-resolver'
import * as yup from 'yup'
import { axiosInstance } from '../../service/AxiosInstance'
import Swal from 'sweetalert2'
import {
  CODE_RESPONSE_400,
  CODE_RESPONSE_401,
  CODE_RESPONSE_404,
} from '../../constants/codeResponse'
import { getProfile } from '../../service/ProfileService'
import { User } from '../../types/user'

interface Props {
  property: Properties | null
  onClose: () => void
  isUpdated?: (value: boolean) => void
  setShouldUpdate?: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalProperty = ({
  property,
  onClose,
  isUpdated,
  setShouldUpdate,
}: Props) => {
  const [files, setFiles] = useState<File[]>([])

  const [loading, setLoading] = useState(false)

  const [provinceCode, setProvinceCode] = useState<string | undefined>(
    property?.location.provinceCode,
  )
  const [districtCode, setDistrictCode] = useState<string | undefined>(
    property?.location.districtCode,
  )
  const [wardCode, setWardCode] = useState<string | undefined>(
    property?.location.wardCode,
  )
  const [feature, setFeature] = useState<string | undefined>(
    String(property?.feature.featureId),
  )
  const [category, setCategory] = useState<string | undefined>(
    String(property?.category.categoryId),
  )
  const dispatch = useAppDispatch()

  const provinces: Province[] = useAppSelector(
    (state) => state.location.provincesList,
  )
  useEffect(() => {
    dispatch(getAllProvinces())
  }, [dispatch])

  const districts: District[] = useAppSelector(
    (state) => state.location.districtsList,
  )
  useEffect(() => {
    dispatch(getAllDistricts(provinceCode))
  }, [dispatch, provinceCode])

  const wards: Ward[] = useAppSelector((state) => state.location.wardsList)
  useEffect(() => {
    dispatch(getAllWards(districtCode))
  }, [dispatch, districtCode])

  const categories: Category[] = useAppSelector(
    (state) => state.category.categoriesList,
  )

  const features: Feature[] = useAppSelector(
    (state) => state.feature.featuresList,
  )

  // Get userProfile to get current credit.
  const [userProfile, setUserProfile] = useState<User | undefined>()
  const getUserProfile = async () => {
    const res = await getProfile()
    setUserProfile(res)
  }
  useEffect(() => {
    getUserProfile()
  }, [])
  const modalSchema = useMemo(() => {
    return yup.object().shape({
      name: yup.string().required('Name is required'),
      code: yup.string().required('Code is required'),
      featureId: yup.string().required('Featured is required'),
      categoryId: yup.string().required('Category is required'),
      provinceCode: yup.string().required('Province Code is required'),
      districtCode: yup.string().required('District Code is required'),
      wardCode: yup.string().required('Ward Code is required'),
      street: yup.string().required('Street is required'),
      address: yup.string().nullable(),
      price: yup.number().positive().required('Price is required'),
      landArea: yup.string().nullable(),
      areaOfUse: yup.string().nullable(),
      numberOfBedRoom: yup
        .number()
        .positive()
        .required('Number of bedrooms is required'),
      numberOfToilet: yup
        .number()
        .positive()
        .required('Number of toilets is required'),
      numberOfFloor: yup
        .number()
        .positive()
        .required('Number of floors is required'),
      direction: yup.string().nullable(),
      description: yup.string().nullable(),
    })
  }, [])

  const form = useForm({
    initialValues: {
      name: property?.name,
      code: property?.code,
      featureId: feature,
      categoryId: category,
      provinceCode: provinceCode,
      districtCode: districtCode,
      wardCode: wardCode,
      street: property?.location.street,
      address: property?.location.address,
      price: property?.price,
      landArea: property?.landArea,
      areaOfUse: property?.areaOfUse,
      numberOfBedRoom: property?.numberOfBedRoom,
      numberOfToilet: property?.numberOfToilet,
      numberOfFloor: property?.numberOfFloor,
      direction: property?.direction,
      description: property?.description,
    },
    validate: yupResolver(modalSchema),
  })

  const handleUploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'ntdit_dev_image')
    formData.append('api_key', '166589584369138')
    setLoading(true)
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dzip9qwyz/image/upload',
      formData,
      {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      },
    )
    const data = response.data
    const imageUrl = data.secure_url // get image url.
    return imageUrl
  }

  const handleAddNew = async (value: any) => {
    const convertProperty = {
      ...value,
      featureId: Number(feature),
      categoryId: Number(category),
      numberOfBedRoom: Number(value.numberOfBedRoom),
      numberOfToilet: Number(value.numberOfToilet),
      numberOfFloor: Number(value.numberOfFloor),
      price: Number(value.price),
      currencyCode: 'USD',
    }
    try {
      loading
      if (userProfile?.balance && userProfile.balance >= 20) {
        // Call function handleUpload to push images to the cloudinary.
        const arr = []
        for (let i = 0; i < files.length; i++) {
          // eslint-disable-next-line no-await-in-loop
          const res = await handleUploadImage(files[i])
          arr.push(res)
        }
        // After all of images is pushed. Send it to server.
        const newProperty = { ...convertProperty, images: arr }
        const res = await axiosInstance.post(`/seller/properties`, newProperty)
        setLoading(false)
        onClose()
        Swal.fire({
          title: 'Added successfully',
          icon: 'success',
        })
        setShouldUpdate!((prev) => !prev)
        return res
      } else {
        setLoading(false)
        Swal.fire({
          title:
            'Your balance is not enough to create new property. Please refill your balance!',
          icon: 'warning',
        })
      }
    } catch (error: any) {
      setLoading(false)
      if (error.response.status === CODE_RESPONSE_400) {
        Swal.fire({
          title:
            'Your balance is not enough to create new property. Please refill your balance!',
          icon: 'error',
        })
      } else if (error.response.status === CODE_RESPONSE_401) {
        Swal.fire({
          title: 'Please Authenticate!',
          icon: 'error',
        })
      } else {
        console.error('Error adding new property:', error)
      }
    }
  }

  const handleUpdate = async (value: any) => {
    delete value.featureId
    delete value.categoryId
    delete value.provinceCode
    delete value.districtCode
    delete value.wardCode
    delete value.street
    delete value.address
    delete value.numberOfBedRoom
    delete value.numberOfToilet
    delete value.numberOfFloor
    try {
      setLoading(true)
      const res = await axiosInstance.patch(
        `/seller/properties/${property?.propertyId}`,
        value,
      )
      setLoading(false)
      onClose()
      Swal.fire({
        title: 'Updated successfully',
        icon: 'success',
      })
      isUpdated!(true)
      return res
    } catch (error: any) {
      if (error.response.status === CODE_RESPONSE_400) {
        Swal.fire({
          title: 'Failed to update property',
          icon: 'error',
        })
      } else if (error.response.status === CODE_RESPONSE_404) {
        Swal.fire({
          title:
            'This property is not available now. Please try another property!',
          icon: 'error',
        })
      } else {
        console.error('Error updating property:', error)
      }
    }
  }

  const handleSubmit = (value: any) => {
    if (property === null) {
      handleAddNew(value)
    } else {
      handleUpdate(value)
    }
  }
  return (
    <form
      onSubmit={form.onSubmit((values) => {
        handleSubmit(values)
      })}
    >
      <div>
        <div className={style.rowModal}>
          <TextInput
            {...form.getInputProps('name')}
            className={style.colModal}
            id="name"
            label="Property name"
            placeholder="Enter name "
            withAsterisk
            onKeyUp={(event) => {
              form.setFieldValue('name', event.currentTarget.value)
            }}
          />
          <TextInput
            {...form.getInputProps('code')}
            className={style.colModal}
            label="Property code"
            placeholder="Enter code "
            withAsterisk
            onKeyUp={(event) => {
              form.setFieldValue('code', event.currentTarget.value)
            }}
          />
          <Select
            {...form.getInputProps('featureId')}
            className={style.colModal}
            label="Featured"
            placeholder="Choose featured "
            withAsterisk
            data={features.flatMap((feature) => [
              {
                value: feature.featureId.toString(),
                label: feature.name,
              },
            ])}
            value={feature}
            onChange={(_value: any) => {
              setFeature(_value)
            }}
            readOnly={property === null ? false : true}
            classNames={{
              input: property === null ? 'bg-white' : 'bg-slate-200',
            }}
          />
          <Select
            {...form.getInputProps('categoryId')}
            className={style.colModal}
            label="Category"
            placeholder="Choose featured "
            withAsterisk
            data={categories.flatMap((category) => [
              {
                value: category.categoryId.toString(),
                label: category.name,
              },
            ])}
            value={category}
            onChange={(_value: any) => {
              setCategory(_value)
            }}
            readOnly={property === null ? false : true}
            classNames={{
              input: property === null ? 'bg-white' : 'bg-slate-200',
            }}
          />
        </div>
        <div className={`${style.rowModal} ${style.mt}`}>
          <Select
            className={style.colModal}
            label="City/Province"
            placeholder="Choose city/province"
            withAsterisk
            searchable
            allowDeselect
            data={provinces.flatMap((prov: Province) => [
              {
                value: prov.provinceCode,
                label: prov.nameEn,
              },
            ])}
            filter={optionsFilter}
            comboboxProps={{
              position: 'bottom',
              offset: 0,
              transitionProps: { transition: 'pop', duration: 200 },
            }}
            {...form.getInputProps('provinceCode')}
            onChange={(_value: any) => {
              form.setFieldValue('provinceCode', _value)
              setProvinceCode(_value)
              setDistrictCode('')
              setWardCode('')
            }}
            value={provinceCode}
            readOnly={property === null ? false : true}
            classNames={{
              input: property === null ? 'bg-white' : 'bg-slate-200',
            }}
          />
          <Select
            {...form.getInputProps('districtCode')}
            className={style.colModal}
            label="District"
            placeholder="Choose district "
            withAsterisk
            searchable
            allowDeselect
            data={districts.flatMap((district: District) => [
              {
                value: district.districtCode,
                label: district.nameEn,
              },
            ])}
            filter={optionsFilter}
            comboboxProps={{
              position: 'bottom',
              offset: 0,
              transitionProps: { transition: 'pop', duration: 200 },
            }}
            onChange={(_value: any) => {
              form.setFieldValue('districtCode', _value)
              setDistrictCode(_value)
              setWardCode('')
            }}
            value={districtCode}
            readOnly={property === null ? false : true}
            classNames={{
              input: property === null ? 'bg-white' : 'bg-slate-200',
            }}
          />
          <Select
            {...form.getInputProps('wardCode')}
            className={style.colModal}
            label="Ward"
            placeholder="Choose ward "
            withAsterisk
            searchable
            allowDeselect
            data={wards.flatMap((ward: Ward) => [
              {
                value: ward.wardCode,
                label: ward.nameEn,
              },
            ])}
            filter={optionsFilter}
            comboboxProps={{
              position: 'bottom',
              offset: 0,
              transitionProps: { transition: 'pop', duration: 200 },
            }}
            onChange={(_value: any) => {
              form.setFieldValue('wardCode', _value)
              setWardCode(_value)
            }}
            value={wardCode}
            readOnly={property === null ? false : true}
            classNames={{
              input: property === null ? 'bg-white' : 'bg-slate-200',
            }}
          />
          <TextInput
            {...form.getInputProps('street')}
            className={style.colModal}
            label="Street"
            required
            placeholder="Enter street"
            readOnly={property === null ? false : true}
            classNames={{
              input: property === null ? 'bg-white' : 'bg-slate-200',
            }}
          />
        </div>
        <div className={`${style.rowModal} ${style.mt}`}>
          <TextInput
            {...form.getInputProps('address')}
            className={style.colModal}
            label="Address"
            placeholder="Enter address"
            readOnly={property === null ? false : true}
            classNames={{
              input: property === null ? 'bg-white' : 'bg-slate-200',
            }}
          />
          <NumberInput
            {...form.getInputProps('numberOfFloor')}
            className={style.colModal}
            required
            label="Number of floor"
            placeholder="Enter number of floor"
            min={0}
            hideControls
            readOnly={property === null ? false : true}
            classNames={{
              input: property === null ? 'bg-white' : 'bg-slate-200',
            }}
          />
          <NumberInput
            {...form.getInputProps('numberOfBedRoom')}
            className={style.colModal}
            required
            label="Number of bedroom"
            placeholder="Enter number of bedroom"
            min={0}
            hideControls
            readOnly={property === null ? false : true}
            classNames={{
              input: property === null ? 'bg-white' : 'bg-slate-200',
            }}
          />
          <NumberInput
            {...form.getInputProps('numberOfToilet')}
            className={style.colModal}
            required
            label="Number of toilet"
            placeholder="Enter number of toilet"
            min={0}
            hideControls
            readOnly={property === null ? false : true}
            classNames={{
              input: property === null ? 'bg-white' : 'bg-slate-200',
            }}
          />
        </div>
        <div className={`${style.rowModal} ${style.mt}`}>
          <TextInput
            {...form.getInputProps('landArea')}
            className={style.colModal}
            label="Land of Area"
            placeholder="Enter number"
          />
          <NumberInput
            {...form.getInputProps('areaOfUse')}
            className={style.colModal}
            label="Area of use"
            placeholder="Enter number "
            hideControls
            min={0}
          />
          <TextInput
            {...form.getInputProps('direction')}
            className={style.colModal}
            label="Direction"
            placeholder="Enter direction"
          />
          <div className={style.halfColModal}>
            <NumberInput
              {...form.getInputProps('price')}
              className="w-1/2"
              label="Price"
              placeholder="Enter price "
              min={0}
              hideControls
              required
            />
            <TextInput
              className="w-1/2"
              label="Currency Code"
              placeholder="Enter currency"
              readOnly
              classNames={{
                input: 'bg-slate-200',
              }}
              defaultValue="USD"
            />
          </div>
        </div>
        <div className={`${style.rowModal} ${style.mt}`}>
          <Radio.Group
            withAsterisk
            label="Duration and price:"
            className="text-base"
            classNames={{ root: style.radioGroupRoot }}
          >
            <Group classNames={{ root: style.groupRoot }}>
              <Radio
                value="15 days for 15 credit"
                label="15 days for 15 credit"
              />
              <Radio
                value="30 days for 30 credit"
                label="30 days for 30 credit"
              />
              <Radio
                value="60 days for 60 credit"
                label="60 days for 60 credit"
              />
            </Group>
          </Radio.Group>
        </div>

        <Textarea
          {...form.getInputProps('description')}
          className={style.description}
          label="Description"
          placeholder="Enter decription"
          autosize
          minRows={5}
          value={property?.description}
        />

        <div className="mt-[20px]">
          {property === null && (
            <Group justify="start">
              <FileButton
                onChange={setFiles}
                accept="image/png,image/jpeg"
                multiple
              >
                {(props) => (
                  <Button
                    type="button"
                    {...props}
                    classNames={{ root: style.rootButton }}
                  >
                    Choose images
                  </Button>
                )}
              </FileButton>
            </Group>
          )}

          <div className="border border-grey mt-[12px] bg-white min-h-25">
            {files.length > 0 && (
              <div className="px-[16px] py-[8px] overflow-hidden flex flex-wrap gap-4">
                {files.map((file, index) => (
                  <img
                    key={index}
                    alt="uploaded image"
                    className="w-1/6 object-scale-down shadow-xl h-[180px]"
                    src={URL.createObjectURL(file)}
                  />
                ))}
              </div>
            )}
            {property !== null && (
              <div className="px-[16px] py-[8px] overflow-hidden flex flex-wrap gap-4">
                {property?.images.map((image, index) => (
                  <img
                    key={index}
                    alt="uploaded image"
                    className="w-1/6 object-scale-down shadow-xl h-[180px]"
                    src={image.imageUrl}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="text-base text-primary font-semibold mt-4 ">
          NOTE: You cannot change some information of your new property, so
          please make sure you use the right information!
        </div>
        <div className={style.coverBtn}>
          {property === null ? (
            <Button
              type="submit"
              classNames={{ root: style.rootButton }}
              loading={loading ? true : false}
            >
              Add New
            </Button>
          ) : property.status === 'Available' ? (
            <Button
              type="submit"
              classNames={{ root: style.rootButton }}
              loading={loading ? true : false}
            >
              Update
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    </form>
  )
}

export default ModalProperty
