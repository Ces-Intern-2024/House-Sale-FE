import React, { useState, useEffect } from 'react'
import {
  FileButton,
  Button,
  Group,
  TextInput,
  Select,
  NumberInput,
  Textarea,
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
import { getAllCategories } from '../../redux/reducers/categorySlice'
import { getAllFeatures } from '../../redux/reducers/featureSlice'
import { optionsFilter } from '../../utils/filterLocation'
import { District } from '@/types/district'
import { Ward } from '@/types/ward'
import { useForm } from '@mantine/form'
import { yupResolver } from 'mantine-form-yup-resolver'
import * as yup from 'yup'
import { axiosInstance } from '../../service/AxiosInstance'

type Props = {
  property: Properties | null
  // action: string
}

const ModalProperty = ({ property }: Props) => {
  const [files, setFiles] = useState<File[]>([])
  const [images, setImages] = useState<string[]>([])
  // const resetRef = useRef<() => void>(null)
  const [loading, setLoading] = useState('')
  // const clearFile = () => {
  //   setFiles([])
  //   resetRef.current?.()
  // }
  const [provinceCode, setProvinceCode] = useState<string>('')
  const [districtCode, setDistrictCode] = useState<string>('')
  const [wardCode, setWardCode] = useState<string>('')

  const dispatch = useAppDispatch()
  //apply API getAllProvinces
  const provinces: Province[] = useAppSelector(
    (state) => state.location.provincesList,
  )
  useEffect(() => {
    const promise = dispatch(getAllProvinces())
    return () => {
      promise.abort()
    }
  }, [dispatch])
  console.log(provinces)
  //apply API getAllDistricts
  const districts: District[] = useAppSelector(
    (state) => state.location.districtsList,
  )
  useEffect(() => {
    const promise = dispatch(getAllDistricts(provinceCode))
    return () => {
      promise.abort()
    }
  }, [dispatch, provinceCode])
  console.log(districts)
  //Apply API getAllWards
  const wards: Ward[] = useAppSelector((state) => state.location.wardsList)
  useEffect(() => {
    const promise = dispatch(getAllWards(districtCode))
    return () => {
      promise.abort()
    }
  }, [dispatch, districtCode])
  console.log(wards)
  //Apply API getAllCategory
  const categories: Category[] = useAppSelector(
    (state) => state.category.categoriesList,
  )
  useEffect(() => {
    const promise = dispatch(getAllCategories())
    return () => {
      promise.abort()
    }
  }, [dispatch])
  //Apply API getAllFeatures
  const features: Feature[] = useAppSelector(
    (state) => state.feature.featuresList,
  )
  useEffect(() => {
    const promise = dispatch(getAllFeatures())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  const modalSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    code: yup.string().required('Code is required'),
    featureId: yup.string().required('Featured is required'),
    categoryId: yup.string().required('Category is required'),
    provinceCode: yup.string().required('Province Code is required'),
    districtCode: yup.string().required('District Code is required'),
    wardCode: yup.string().required('Ward Code is required'),
    street: yup.string().required('Street is required'),
    // address: yup.string().nullable(),
    price: yup.number().positive().required('Price is required'),
    currencyCode: yup.string().required('Currency code is required'),
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

  const form = useForm({
    initialValues: {
      name: '',
      code: '',
      featureId: '',
      categoryId: '',
      provinceCode: '',
      districtCode: '',
      wardCode: '',
      street: '',
      price: '',
      currencyCode: '',
      landArea: '',
      areaOfUse: '',
      numberOfBedRoom: '',
      numberOfToilet: '',
      numberOfFloor: '',
      direction: '',
      description: '',
    },
    validate: yupResolver(modalSchema),
  })

  const handleUpload = () => {
    const uploaders = files.map(async (file) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'ntdit_dev_image')
      formData.append('api_key', '166589584369138')
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dzip9qwyz/image/upload',
        formData,
        {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        },
      )
      const data = response.data
      const imageUrl = data.secure_url //get image url

      setImages((prevImages) => [...prevImages, imageUrl])
      setFiles([])
    })
    axios.all(uploaders).then(() => {
      setLoading('false')
    })
  }

  // const imagePreview = () => {
  //   if (loading === 'true') {
  //     return <h3>Loading....</h3>
  //   }
  //   if (loading === 'false') {
  //     return (
  //       <h3>
  //         {images.length <= 0
  //           ? 'No images'
  //           : images.map((image, index) => (
  //               <img
  //                 key={index}
  //                 alt="uploaded image"
  //                 className="w-[125px] h-[70px] bg-cover pr-[15px]"
  //                 src={image}
  //               />
  //             ))}
  //       </h3>
  //     )
  //   }
  // }

  const handleAddNew = async (value: any) => {
    const convertProperty = {
      ...value,
      featureId: Number(value.featureId),
      categoryId: Number(value.categoryId),
      numberOfBedRoom: Number(value.numberOfBedRoom),
      numberOfToilet: Number(value.numberOfToilet),
      numberOfFloor: Number(value.numberOfFloor),
      price: Number(value.price),
      address: 'NONE',
    }
    try {
      loading
      // Gọi hàm handleUpload để tải lên hình ảnh
      await handleUpload()
      // Sau khi tất cả hình ảnh đã được tải lên, gửi dữ liệu lên máy chủ
      const newProperty = { ...convertProperty, images: images }
      const res = await axiosInstance.post(`/seller/properties`, newProperty)
      console.log(res)
    } catch (error) {
      console.error('Error adding new property:', error)
    }
  }
  return (
    <form
      onSubmit={form.onSubmit((values) => {
        handleAddNew(values)
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
            value={property?.name}
            onKeyUp={(event) => {
              form.setFieldValue('name', event.currentTarget.value)
            }}
          />
          <TextInput
            {...form.getInputProps('code')}
            className={style.colModal}
            label="Property code"
            placeholder="Enter code "
            value={property?.code}
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
            value={property?.feature.name}
          />
          <Select
            {...form.getInputProps('categoryId')}
            className={style.colModal}
            label="Category"
            placeholder="Choose featured "
            withAsterisk
            value={property?.category.name}
            data={categories.flatMap((category) => [
              {
                value: category.categoryId.toString(),
                label: category.name,
              },
            ])}
          />
        </div>
        <div className={`${style.rowModal} ${style.mt}`}>
          <Select
            {...form.getInputProps('provinceCode')}
            className={style.colModal}
            label="City/Province"
            placeholder="Choose city/province"
            withAsterisk
            searchable
            allowDeselect={false}
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
            onChange={(_value: any) => {
              form.setFieldValue('provinceCode', _value)
              setProvinceCode(_value)
              setDistrictCode('')
              setWardCode('')
            }}
            value={provinceCode}
          />
          <Select
            {...form.getInputProps('districtCode')}
            className={style.colModal}
            label="District"
            placeholder="Choose district "
            withAsterisk
            searchable
            allowDeselect={false}
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
          />
          <Select
            {...form.getInputProps('wardCode')}
            className={style.colModal}
            label="Ward"
            placeholder="Choose ward "
            withAsterisk
            searchable
            allowDeselect={false}
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
          />
          <TextInput
            {...form.getInputProps('street')}
            className={style.colModal}
            label="Street"
            placeholder="Enter street"
          />
        </div>
        <div className={`${style.rowModal} ${style.mt}`}>
          <TextInput
            {...form.getInputProps('direction')}
            className={style.colModal}
            label="Direction"
            placeholder="Enter direction"
            // value={property?.direction}
          />
          <NumberInput
            {...form.getInputProps('numberOfFloor')}
            className={style.colModal}
            label="Number of floor"
            placeholder="Enter number of floor"
            min={0}
            hideControls
            // value={property?.numberOfFloor}
          />
          <NumberInput
            {...form.getInputProps('numberOfBedRoom')}
            className={style.colModal}
            label="Number of bedroom"
            placeholder="Enter number of bedroom"
            min={0}
            hideControls
            // value={property?.numberOfBedRoom}
          />
          <NumberInput
            {...form.getInputProps('numberOfToilet')}
            className={style.colModal}
            label="Number of toilet"
            placeholder="Enter number of toilet"
            min={0}
            hideControls
            // value={property?.numberOfToilet}
          />
        </div>
        <div className={`${style.rowModal} ${style.mt}`}>
          <TextInput
            {...form.getInputProps('landArea')}
            className={style.colModal}
            label="Land of Area"
            placeholder="Enter number"
            // value={property?.landArea}
          />
          <NumberInput
            {...form.getInputProps('areaOfUse')}
            className={style.colModal}
            label="Area of use"
            placeholder="Enter number "
            hideControls
            min={0}
            // value={property?.areaOfUse}
          />
          <NumberInput
            {...form.getInputProps('price')}
            className={style.colModal}
            label="Price"
            placeholder="Enter price "
            min={0}
            // value={property?.price}
            hideControls
          />
          <TextInput
            {...form.getInputProps('currencyCode')}
            className={style.colModal}
            label="Currency Code"
            placeholder="Enter currency"
            // value={property?.currencyCode}
          />
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
            {/* <Button
              onClick={handleUpload}
              classNames={{ root: style.rootButton }}
            >
              Upload Images
            </Button>
            <Button disabled={!files} bg="red" onClick={clearFile}>
              Reset
            </Button> */}
          </Group>

          {files.length > 0 && (
            <div className="border border-grey mt-[12px] bg-white ">
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
            </div>
          )}
          {/* {imagePreview()} */}
        </div>
        <div className={style.coverBtn}>
          <Button type="submit" classNames={{ root: style.rootButton }}>
            Add New
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ModalProperty
