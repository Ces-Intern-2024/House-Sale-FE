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
  LoadingOverlay,
  Tooltip,
  Switch,
  Checkbox,
} from '@mantine/core'
import {
  FaEdit,
  FaLongArrowAltUp,
  FaSearch,
  FaLongArrowAltDown,
} from 'react-icons/fa'
import { useDisclosure } from '@mantine/hooks'
import ModalProperty from '../ModalProperty/ModalProperty'
import { Category, Feature, Properties } from '@/types'
import { formatMoneyToUSD } from '../../utils/commonFunctions'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getAllCategories } from '../../redux/reducers/categorySlice'
import { getAllFeatures } from '../../redux/reducers/featureSlice'
import { MdDelete } from 'react-icons/md'
import { Province } from '@/types/province'
import { getAllProvinces } from '../../redux/reducers/locationReducer'
import { SearchProps } from '@/types/searchProps'
import {
  getPropertiesForAdminService,
  getAllPropertiesForAdminSerivce,
  updateStatusPropertyForAdminService,
  deletePropertyForAdminService,
} from '../../service/AdminService'
import {
  AVAILABLE,
  DISABLED,
  UN_AVAILABLE,
} from '../../constants/statusProperty'
import { optionsFilter } from '../../utils/filterLocation'
import { PiArrowsDownUp } from 'react-icons/pi'
import Swal from 'sweetalert2'
import { cancelBtn, confirmBtn } from '../../constants/colorConstant'

const TablePropertyAdmin = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [selectedProperty, setSelectedProperty] = useState<Properties | null>(
    null,
  )
  const [isUpdated, setIsUpdated] = useState(false)
  const [properties, setProperties] = useState<Properties[]>([])
  const [featureId, setFeatureId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [keyword, setKeyword] = useState('')
  const [provinceCode, setProvinceCode] = useState('')
  const [activePage, setActivePage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  const [totalItems, setTotalItems] = useState(0)
  const [resetPage, setResetPage] = useState(true)
  const [sortBy, setSortBy] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const [maxPrice, setMaxPrice] = useState<number>(0)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()

  const handleGetMaxPrice = async () => {
    const res = await getPropertiesForAdminService({
      orderBy: 'price',
      sortBy: 'desc',
    })
    setMaxPrice(Number(res.data.metaData.data[0].price))
    setPriceRange([0, Number(res.data.metaData.data[0].price)])
  }
  useEffect(() => {
    handleGetMaxPrice()
  }, [])
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
      Swal.fire({
        title: error.response.data.error.message,
        icon: 'error',
      })
    }
  }

  useEffect(() => {
    getAllProperties()
  }, [isUpdated])
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

  const handleSearching = async () => {
    const data: SearchProps = {
      keyword: keyword ? keyword : null,
      categoryId: categoryId ? Number(categoryId) : null,
      featureId: featureId ? Number(featureId) : null,
      page: activePage ? activePage : null,
      priceFrom: priceRange ? priceRange[0] : null,
      priceTo: priceRange ? priceRange[1] : null,
      sortBy: sortBy ? (sortBy.includes('asc') ? 'desc' : 'asc') : null,
      orderBy: orderBy ? (orderBy.startsWith('p') ? 'price' : null) : null,
    }
    try {
      setIsLoading(true)
      const res = await getPropertiesForAdminService(data)
      setProperties(res.data.metaData.data)
      setTotalPages(res.data.metaData.totalPages)
      setTotalItems(res.data.metaData.totalItems)
      setActivePage(resetPage ? 1 : activePage)
      setResetPage(true)
    } catch (error: any) {
      Swal.fire({
        title: error.response.data.error.message,
        icon: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleSearching()
  }, [orderBy, sortBy])

  useEffect(() => {
    handleSearching()
  }, [activePage, priceRange])

  const provinces: Province[] = useAppSelector(
    (state) => state.location.provincesList,
  )
  useEffect(() => {
    dispatch(getAllProvinces())
  }, [dispatch])

  const _handleChangeStatusProperty = async (
    status: string | null,
    propertyId: number,
  ) => {
    try {
      setIsLoading(true)
      await updateStatusPropertyForAdminService(propertyId, status)
    } catch (error: any) {
      Swal.fire({
        title: error.response.data.error.message,
        icon: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }
  const handleChangeActivePage = async (page: any) => {
    setResetPage(false)
    setActivePage(page)
    setSelectedRows([])
  }

  const handleResetFilter = () => {
    setProvinceCode('')
    setKeyword('')
    setFeatureId('')
    setCategoryId('')
    setSortBy('')
    setOrderBy('')
    setActivePage(1)
    setPriceRange([0, maxPrice])
    setSelectedRows([])
  }

  const handleDelete = async (property: Properties) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: confirmBtn,
      cancelButtonColor: cancelBtn,
      confirmButtonText: 'Yes, delete property!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePropertyForAdminService(String(property.propertyId))
          Swal.fire({
            title: 'Deleted!',
            text: 'Your property has been deleted.',
            icon: 'success',
          })
          setIsUpdated(!isUpdated)
        } catch (error: any) {
          Swal.fire({
            icon: 'error',
            text: error.response.data.error.message,
          })
        }
      }
    })
  }
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const allSelected = selectedRows.length === properties.length
  const handleSelectBox = (event: boolean, propertyId: number) => {
    if (event) {
      setSelectedRows([...selectedRows, propertyId])
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== propertyId))
    }
  }

  const handleDeleteAllSelectedRows = () => {
    const parseSelectedRowsToString = String(selectedRows)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: confirmBtn,
      cancelButtonColor: cancelBtn,
      confirmButtonText: 'Yes, delete all selected!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePropertyForAdminService(parseSelectedRowsToString)
          Swal.fire({
            title: 'Deleted!',
            text: 'Your property has been deleted.',
            icon: 'success',
          })
          setIsUpdated(!isUpdated)
        } catch (error: any) {
          Swal.fire({
            title: error.response.data.error.message,
            icon: 'error',
          })
        }
      }
    })
  }

  const handleSelectAllSelectedRows = () => {
    if (allSelected) {
      setSelectedRows([])
    } else {
      const allPropertyIds = properties.map((property) => property.propertyId)
      setSelectedRows(allPropertyIds)
    }
  }
  const rows =
    properties.length > 0 &&
    properties.map((element) => (
      <Table.Tr
        className={style.detailContentTable}
        key={element.propertyId}
        bg={
          selectedRows.includes(element.propertyId)
            ? 'var(--mantine-color-blue-light)'
            : undefined
        }
      >
        <Table.Td>
          <Checkbox
            aria-label="Select row"
            checked={selectedRows.includes(element.propertyId)}
            onChange={(event) =>
              handleSelectBox(event.currentTarget.checked, element.propertyId)
            }
          />
        </Table.Td>
        <Table.Td>{element.propertyId}</Table.Td>
        <Table.Td
          classNames={{ td: style.tdNameCover }}
          onClick={() => handlePropertyView(element)}
        >
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
        <Table.Td className="font-semibold">{element.seller.fullName}</Table.Td>

        <Table.Td>
          {/* This comment has been kept as a temporary if there are any errors.
          <Select
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
          /> */}
          {element.status === AVAILABLE ? (
            <div className={style.available}>Available</div>
          ) : element.status === UN_AVAILABLE ? (
            <div className={style.unavailable}>Unavailable</div>
          ) : (
            <div className={style.disabledAdmin}>Disabled</div>
          )}
        </Table.Td>
        <Table.Td>
          <div className={style.propertyActions}>
            {/* This comment has been kept as a temporary if there are any errors.
            <Tooltip label="Disable property">
              <div>
                <GiSightDisabled
                  className={`${style.actionIcon} ${style.disabledIcon}`}
                  size={24}
                />
              </div>
            </Tooltip> */}

            {element.status === DISABLED ? (
              <Tooltip label="Disable property" refProp="rootRef">
                <Switch checked={false} />
              </Tooltip>
            ) : (
              <Tooltip label="Disable property" refProp="rootRef">
                <Switch checked={true} />
              </Tooltip>
            )}
            <Tooltip label="Edit property">
              <div>
                <FaEdit
                  className={`${style.actionIcon} ${style.editIcon}`}
                  onClick={() => handlePropertyView(element)}
                />
              </div>
            </Tooltip>
            <Tooltip label="Delete property">
              <div>
                <MdDelete
                  className={`${style.actionIcon} ${style.deleteIcon}`}
                  onClick={() => handleDelete(element)}
                />
              </div>
            </Tooltip>
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
              <span className={style.subTitle}>Manage your properties</span>
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
              <div className="flex flex-row justify-between mt-5 items-baseline">
                <div className="flex items-baseline gap-12">
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
                      minRange={100}
                      min={0}
                      max={maxPrice}
                      step={500}
                      defaultValue={priceRange}
                      onChangeEnd={setPriceRange}
                      labelAlwaysOn
                    />
                  </div>
                  <Button
                    className={style.iconSearchAdmin}
                    onClick={() => handleSearching()}
                  >
                    <FaSearch size={16} />
                  </Button>
                </div>
                <Button
                  className="text-primary text-lg font-bold px-0 rounded-none hover:text-[#5625d0]"
                  onClick={() => {
                    handleResetFilter()
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          <Button
            className="mt-4"
            classNames={{ root: style.rootButtonDeleteAll }}
            onClick={() => handleDeleteAllSelectedRows()}
          >
            Delete All
          </Button>
          <div className={style.tableContent}>
            <Table
              className="relative"
              bg="white"
              highlightOnHover
              withTableBorder
              verticalSpacing="sm"
              stickyHeader
            >
              <Table.Thead>
                <Table.Tr className={style.titleTable}>
                  <Table.Th>
                    <Checkbox
                      checked={allSelected}
                      onChange={() => handleSelectAllSelectedRows()}
                    />
                  </Table.Th>
                  <Table.Th>ID</Table.Th>
                  <Table.Th classNames={{ th: style.thName }}>
                    Property Name
                  </Table.Th>
                  <Table.Th>Code</Table.Th>
                  <Table.Th>Featured</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th classNames={{ th: style.thPrice }}>
                    <span>Price</span>
                    <span
                      className="flex justify-between cursor-pointer"
                      onClick={() => {
                        setOrderBy('price')
                        setSortBy(sortBy.includes('asc') ? 'desc' : 'asc')
                      }}
                    >
                      {sortBy ? (
                        sortBy === 'desc' ? (
                          <FaLongArrowAltUp />
                        ) : (
                          <FaLongArrowAltDown />
                        )
                      ) : (
                        <PiArrowsDownUp className="cursor-pointer" size={20} />
                      )}
                    </span>
                  </Table.Th>
                  <Table.Th>Seller</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <LoadingOverlay
                visible={isLoading}
                zIndex={10}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'pink', type: 'bars' }}
              />
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </div>

          <div className={style.pagination}>
            <Pagination
              total={totalPages}
              value={activePage}
              onChange={handleChangeActivePage}
              mt="sm"
              classNames={{ control: style.paginationControl }}
            />
            <div className="text-lg mr-2 text-primary font-bold">
              Result: {totalItems}
            </div>
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
