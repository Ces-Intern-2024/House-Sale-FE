import React, { useEffect, useState } from 'react'
import style from './TableProperty.module.scss'
import {
  Button,
  Select,
  TextInput,
  Table,
  Image,
  Modal,
  Pagination,
  RangeSlider,
  Text,
} from '@mantine/core'
import { FaEdit, FaSearch } from 'react-icons/fa'
import { useDisclosure } from '@mantine/hooks'
import ModalProperty from '../ModalProperty/ModalProperty'
import { Category, Feature, Properties } from '@/types'
import { formatMoneyToUSD } from '../../utils/commonFunctions'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getAllCategories } from '../../redux/reducers/categorySlice'
import { getAllFeatures } from '../../redux/reducers/featureSlice'
import { PiArrowsDownUp } from 'react-icons/pi'
import {
  CODE_RESPONSE_400,
  CODE_RESPONSE_401,
  CODE_RESPONSE_403,
  CODE_RESPONSE_404,
} from '../../constants/codeResponse'
import { MdDelete } from 'react-icons/md'
import { Province } from '@/types/province'
import { getAllProvinces } from '../../redux/reducers/locationReducer'
import { SearchProps } from '@/types/searchProps'
import {
  getPropertiesForAdminService,
  getAllPropertiesForAdminSerivce,
  updateStatusPropertyForAdminService,
} from '../../service/AdminService'
import {
  AVAILABLE,
  DISABLED,
  UN_AVAILABLE,
} from '../../constants/statusProperty'
import { optionsFilter } from '../../utils/filterLocation'

const TablePropertyAdmin = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [selectedProperty, setSelectedProperty] = useState<Properties | null>(
    null,
  )
  const [isUpdated, setIsUpdated] = useState(false)
  const [properties, setProperties] = useState<Properties[]>([])
  const [sort, setSort] = useState(true)

  const handlePropertyView = (property: Properties) => {
    setSelectedProperty(property)
    open()
  }

  const getAllProperties = async () => {
    try {
      const res = await getAllPropertiesForAdminSerivce()
      setProperties(res.metaData.data)
      setTotalPages(res.metaData.totalPages)
      setTotalItems(res.metaData.totalItems)
    } catch (error: any) {
      if (error.response.status === CODE_RESPONSE_400) {
        console.error('Failed to get all properties.')
      } else if (error.response.status === CODE_RESPONSE_401) {
        console.error('Please Authenticate!')
      } else if (error.response.status === CODE_RESPONSE_403) {
        console.error('Your account is not active!')
      } else if (error.response.status === CODE_RESPONSE_404) {
        console.error('User not found!')
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    getAllProperties()
  }, [isUpdated])
  const dispatch = useAppDispatch()
  const categories: Category[] = useAppSelector(
    (state) => state.category.categoriesList,
  )
  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  const features: Feature[] = useAppSelector(
    (state) => state.feature.featuresList,
  )
  useEffect(() => {
    dispatch(getAllFeatures())
  }, [dispatch])

  const getPropertiesSortByPrice = async () => {
    try {
      setSort(!sort)
      if (sort) {
        const res = await getPropertiesForAdminService({
          sortBy: 'asc',
          orderBy: 'price',
        })

        setProperties(res.data.metaData.data)
      } else {
        const res = await getPropertiesForAdminService({
          sortBy: 'desc',
          orderBy: 'price',
        })

        setProperties(res.data.metaData.data)
      }
    } catch (error: any) {
      if (error.response.status === CODE_RESPONSE_400) {
        console.error('This feature is not available yet. Please try again')
      } else if (error.response.status === CODE_RESPONSE_401) {
        console.error('Please Authenticate')
      } else if (error.response.status === 403) {
        console.error('Your account is not active!')
      } else {
        console.error(error)
      }
    }
  }

  const [featureId, setFeatureId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [keyword, setKeyword] = useState('')

  const handleSearching = async () => {
    const data: SearchProps = {
      keyword: keyword ? keyword : null,
      categoryId: categoryId ? Number(categoryId) : null,
      featureId: featureId ? Number(featureId) : null,
      page: activePage ? activePage : null,
    }
    try {
      const res = await getPropertiesForAdminService(data)
      setProperties(res.data.metaData.data)
    } catch (error: any) {
      if (error.response.status === 400) {
        console.error('Failed to search property!')
      } else if (error.response.status === 401) {
        console.error('Please Authenticate!')
      } else if (error.response.status === 403) {
        console.error('Your account is not active!')
      } else if (error.response.status === 404) {
        console.error('User not found!')
      } else {
        console.error(error)
      }
    }
  }

  const [activePage, setActivePage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    handleSearching()
  }, [activePage])

  const provinces: Province[] = useAppSelector(
    (state) => state.location.provincesList,
  )
  useEffect(() => {
    dispatch(getAllProvinces())
  }, [dispatch])

  const handleChangeStatusProperty = async (
    status: string | null,
    propertyId: number,
  ) => {
    try {
      await updateStatusPropertyForAdminService(propertyId, status)
    } catch (error: any) {
      console.error(error.response.data.error.message)
    }
  }

  const [provinceCode, setProvinceCode] = useState('')


  const rows =
    properties.length > 0 &&
    properties.map((element) => (
      <Table.Tr className={style.detailContentTable} key={element.propertyId}>
        <Table.Td>{element.propertyId}</Table.Td>
        <Table.Td onClick={() => handlePropertyView(element)}>
          <div className={style.propertyNameCover}>
            <Image
              className={style.propertyImage}
              src={
                element.images.length > 0
                  ? element.images[0].imageUrl
                  : 'No image'
              }
            />
            <span className={style.propertyName}>{element.name}</span>
          </div>
        </Table.Td>
        <Table.Td>{element.code}</Table.Td>
        <Table.Td>{element.feature.name}</Table.Td>
        <Table.Td>{element.category.name}</Table.Td>
        <Table.Td>{formatMoneyToUSD(element.price)}</Table.Td>
        <Table.Td>{element.seller.fullName}</Table.Td>

        <Table.Td>
          <Select
            // classNames={{
            //   input: style.inputSelectStatus,
            //   section: style.sectionSelectStatus,
            //   wrapper: style.wrapperSelectStatus,
            // }}
            classNames={{
              input: `${element.status === AVAILABLE} ? ${style.inputSelectStatus} : ${style.unavailableSelectStatus}`,
              wrapper: style.wrapperSelectStatus,
            }}
            placeholder="Select status"
            data={[
              { value: AVAILABLE, label: AVAILABLE },
              { value: UN_AVAILABLE, label: UN_AVAILABLE },
              { value: DISABLED, label: DISABLED },
            ]}
            defaultValue={element.status}
            onChange={(value: string | null) =>
              handleChangeStatusProperty(value, element.propertyId)
            }
          />
        </Table.Td>
        <Table.Td>
          <div className={style.propertyActions}>
            <FaEdit
              className={`${style.actionIcon} ${style.editIcon}`}
              onClick={() => handlePropertyView(element)}
            />
            <MdDelete className={`${style.actionIcon} ${style.deleteIcon}`} />
          </div>
        </Table.Td>
      </Table.Tr>
    ))

  return (
    <>
      <div className={style.tablePropertyContainer}>
        <div className={style.tablePropertyContent}>
          <div className={style.tableHeader}>
            <div className={style.pageTitle}>
              <span className={style.title}>Property List</span>
              <span className={style.subTitle}>
                Manage your properties {totalItems}
              </span>
            </div>
          </div>

          <div className={style.tableSideBar}>
            <div className={style.tableSelectAdmin}>
              <div className="grid grid-cols-4 gap-8">
                <TextInput
                  classNames={{ input: style.inputText }}
                  placeholder="Enter your keyword..."
                  onChange={(event) => setKeyword(event.target.value)}
                />
                <Select
                  classNames={{ input: style.elementSelect }}
                  placeholder="Select Featured"
                  data={features.flatMap((feature) => [
                    {
                      value: feature.featureId.toString(),
                      label: feature.name,
                    },
                  ])}
                  onChange={(value: string | null) => {
                    if (value !== null) {
                      setFeatureId(value)
                    } else {
                      setFeatureId('')
                    }
                  }}
                  allowDeselect
                />

                <Select
                  classNames={{ input: style.elementSelect }}
                  placeholder="Select Category"
                  data={categories.flatMap((category) => [
                    {
                      value: category.categoryId.toString(),
                      label: category.name,
                    },
                  ])}
                  onChange={(value: string | null) => {
                    if (value !== null) {
                      setCategoryId(value)
                    } else {
                      setCategoryId('')
                    }
                  }}
                  allowDeselect
                />
                <Select
                  classNames={{ input: style.elementSelect }}
                  placeholder="Select City/Province"
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
                  onChange={(value: string | null) => {
                    if (value !== null) {
                      setProvinceCode(value)
                    } else {
                      setProvinceCode('')
                    }
                  }}
                  defaultValue={provinceCode}
                />
              </div>
              <div className="grid grid-cols-3 gap-12 mt-5">
                <div className="flex gap-3 items-baseline mt-5">
                  <Text className="text-base font-semibold text-primary">
                    Price range:
                  </Text>
                  <RangeSlider
                    classNames={{
                      root: style.rootRangeSlider,
                      label: style.lableRangeSlider,
                    }}
                    color="#396651"
                    minRange={0.2}
                    min={0}
                    max={1000000000}
                    step={100}
                    defaultValue={[0, 1000000000]}
                    labelAlwaysOn
                  />
                </div>
                <div className="flex gap-3 items-baseline mt-5">
                  <Text className="text-base font-semibold text-primary">
                    Area range:
                  </Text>
                  <RangeSlider
                    classNames={{
                      root: style.rootRangeSlider,
                      label: style.lableRangeSlider,
                    }}
                    color="#396651"
                    minRange={0.2}
                    min={0}
                    max={1000000000}
                    step={100}
                    defaultValue={[0, 1000000000]}
                    labelAlwaysOn
                  />
                </div>
                <Button
                  className={style.iconSearch}
                  classNames={{ label: style.labelIconSearch }}
                  onClick={() => handleSearching()}
                >
                  <FaSearch size={20} />
                  <span className={style.labelIconSearch}>Search</span>
                </Button>
              </div>
            </div>
          </div>

          <div className={style.tableContent}>
            <Table
              bg="white"
              highlightOnHover
              withTableBorder
              verticalSpacing="sm"
              stickyHeader
            >
              <Table.Thead>
                <Table.Tr className={style.titleTable}>
                  <Table.Th>ID</Table.Th>
                  <Table.Th classNames={{ th: style.thName }}>
                    Property Name
                  </Table.Th>
                  <Table.Th>Code</Table.Th>
                  <Table.Th>Featured</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th classNames={{ th: style.thPrice }}>
                    <span>Price</span>

                    <PiArrowsDownUp
                      onClick={() => getPropertiesSortByPrice()}
                      className="cursor-pointer"
                      size={20}
                    />
                  </Table.Th>
                  <Table.Th>Seller</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </div>

          <div className={style.pagination}>
            <Pagination
              total={totalPages}
              value={activePage}
              onChange={setActivePage}
              mt="sm"
              classNames={{ control: style.paginationControl }}
            />
          </div>
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={() => {
          close()
          setSelectedProperty(null)
        }}
        size={1280}
        title="Property Add"
        classNames={{
          header: style.headerModal,
          title: style.titleModal,
          body: style.bodyModal,
          content: style.contentModal,
        }}
      >
        <ModalProperty
          property={selectedProperty}
          onClose={close}
          isUpdated={setIsUpdated}
        />
      </Modal>
    </>
  )
}
export default TablePropertyAdmin
