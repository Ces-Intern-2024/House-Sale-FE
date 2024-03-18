import React, { useEffect, useState } from 'react'
import style from './TableProperty.module.scss'
import {
  Button,
  TextInput,
  Table,
  Image,
  Modal,
  Switch,
  Tooltip,
  LoadingOverlay,
  Box,
  Pagination,
  Select,
  Checkbox,
  Group,
  Radio,
} from '@mantine/core'
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaLongArrowAltDown,
  FaLongArrowAltUp,
} from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useDisclosure } from '@mantine/hooks'
import ModalProperty from '../ModalProperty/ModalProperty'
import { Category, Feature, Properties } from '@/types'
import { axiosInstance } from '../../service/AxiosInstance'
import Swal from 'sweetalert2'
import { formatMoneyToUSD } from '../../utils/commonFunctions'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { PiArrowsDownUp } from 'react-icons/pi'
import {
  CODE_RESPONSE_400,
  CODE_RESPONSE_401,
} from '../../constants/codeResponse.constant'
import { SearchProps } from '@/types/searchProps'
import {
  deletePropertiesForSellerService,
  getAllPropertiesForSellerService,
  updateStatusPropertiesForSellerService,
  searchPropertyForSeller,
} from '../../service/SellerService'
import {
  AVAILABLE,
  UN_AVAILABLE,
} from '../../constants/statusProperty.constant'
import { getAllFeatures } from '../../redux/reducers/featureSlice'
import { getAllCategories } from '../../redux/reducers/categorySlice'
import { cancelBtn, confirmBtn } from '../../constants/color.constant'
import { getAllRentalPackageService } from '../../service/PackageService'
import { PackageService } from '../../types/packageService'
import { getProfile } from '../../service/ProfileService'
import { User } from '@/types/user'

interface TablePropertyProps {
  setShouldUpdate: React.Dispatch<React.SetStateAction<boolean>>
  shouldUpdate: boolean
}
const TableProperty = ({
  setShouldUpdate,
  shouldUpdate,
}: TablePropertyProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [
    openedPackageservice,
    { open: openPackageService, close: closePackageService },
  ] = useDisclosure(false)
  const [selectedProperty, setSelectedProperty] = useState<Properties | null>(
    null,
  )
  const [isUpdated, setIsUpdated] = useState(false)
  const [properties, setProperties] = useState<Properties[]>([])
  const [sort, setSort] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  // These states is used for paginate.
  const [activePage, setActivePage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [resetPage, setResetPage] = useState(true)
  const [featureId, setFeatureId] = useState<string | null>(null)
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [keyword, setKeyword] = useState('')
  const [intervals, setIntervals] = useState<NodeJS.Timer[]>([])
  const [resetFilter, setResetFilter] = useState(false)
  const [filterNum, setFilterNum] = useState<number>(0)
  const [sortBy, setSortBy] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const dispatch = useAppDispatch()

  const handlePropertyView = (property: Properties) => {
    setSelectedProperty(property)
    open()
  }
  const handlePropertyAdd = () => {
    setSelectedProperty(null)
    open()
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
          await deletePropertiesForSellerService(String(property.propertyId))
          Swal.fire({
            title: 'Deleted!',
            text: 'Your property has been deleted.',
            icon: 'success',
          })
          setProperties(
            properties.filter(
              (item) => item.propertyId !== property.propertyId,
            ),
          )
        } catch (error: any) {
          Swal.fire({
            icon: 'error',
            text: error.response.data.error.message,
          })
        }
      }
    })
  }

  useEffect(() => {
    setProperties(properties)
  }, [properties])

  const getAllPropertiesForSeller = async () => {
    try {
      const res = await getAllPropertiesForSellerService()
      setProperties(res?.data.metaData.data)
      setTotalPages(res?.data.metaData.totalPages)
      setTotalItems(res?.data.metaData.totalItems)
    } catch (error: any) {
      setError(error.response.data.error.message)
    }
  }

  useEffect(() => {
    getAllPropertiesForSeller()
  }, [isUpdated, shouldUpdate])

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

  const _getPropertiesSortByPrice = async () => {
    try {
      setSort(!sort)
      if (sort) {
        const res = await axiosInstance.get(`/seller/properties`, {
          params: { sortBy: 'asc', orderBy: 'price' },
        })
        setProperties(res.data.metaData.data)
      } else {
        const res = await axiosInstance.get(`/seller/properties`, {
          params: { sortBy: 'desc', orderBy: 'price' },
        })
        setProperties(res.data.metaData.data)
      }
    } catch (error: any) {
      if (error.response.status === CODE_RESPONSE_400) {
        console.error('This feature is not available yet. Please try again')
      } else if (error.response.status === CODE_RESPONSE_401) {
        console.error('Please Authenticate')
      } else {
        console.error(error)
      }
    }
  }

  const handleFiltering = async () => {
    const data: SearchProps = {
      keyword: keyword ? keyword : null,
      categoryId: categoryId ? Number(categoryId) : null,
      featureId: featureId ? Number(featureId) : null,
      page: resetPage ? 1 : activePage,
      sortBy: sortBy ? (sortBy.includes('asc') ? 'desc' : 'asc') : null,
      orderBy: orderBy ? (orderBy.startsWith('p') ? 'price' : null) : null,
    }

    try {
      setIsLoading(true)
      const res = await searchPropertyForSeller(data)
      setProperties(res.data.metaData.data)
      setTotalPages(res.data.metaData.totalPages)
      setTotalItems(res.data.metaData.totalItems)
      setActivePage(resetPage ? 1 : activePage)
      setResetPage(true)
    } catch (error: any) {
      setError(error.response.data.error.message)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    handleFiltering()
  }, [activePage, featureId, categoryId, resetFilter, orderBy, sortBy])

  const handleResetFilter = () => {
    if (filterNum > 0) {
      setKeyword('')
      setCategoryId(null)
      setFeatureId(null)
      setSortBy('')
      setOrderBy('')
      setActivePage(1)
      setResetPage(true)
      setResetFilter((prev) => !prev)
    }
  }

  const checkNumFilter = () => {
    setFilterNum(0)
    if (keyword) setFilterNum((prev) => prev + 1)
    if (categoryId) setFilterNum((prev) => prev + 1)
    if (featureId) setFilterNum((prev) => prev + 1)
    if (sortBy) setFilterNum((prev) => prev + 1)
  }

  useEffect(() => {
    checkNumFilter()
  }, [keyword, categoryId, featureId, sortBy])

  const handleChangeActivePage = async (page: any) => {
    setResetPage(false)
    setActivePage(page)
  }
  const handleUpdateStatus = async (event: boolean, property: Properties) => {
    if (event) {
      Swal.fire({
        title: `Are you sure to change this property's status to ${property.status === UN_AVAILABLE ? 'available' : 'unavailable'}?`,
        icon: 'question',
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (property.savedRemainingRentalTime > 0) {
            try {
              setIsLoading(true)
              await updateStatusPropertiesForSellerService(
                property.propertyId,
                property.status === UN_AVAILABLE ? AVAILABLE : UN_AVAILABLE,
              )
              Swal.fire({
                icon: 'success',
                title: 'Status changed!',
                text: 'This property is now available.',
              })
              setIsUpdated((prev) => !prev)
            } catch (error) {
              console.error(error)
            } finally {
              setIsLoading(false)
            }
          } else {
            setSelectedProperty(property)
            openPackageService()
          }
        }
      })
    } else {
      Swal.fire({
        title: `Are you sure to change this property's status to ${property.status === UN_AVAILABLE ? 'available' : 'unavailable'}?`,
        icon: 'question',
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setIsLoading(true)
            await updateStatusPropertiesForSellerService(
              property.propertyId,
              UN_AVAILABLE,
            )
            Swal.fire({
              icon: 'success',
              title: 'Status changed!',
              text: 'This property is now unavailable.',
            })
            setIsUpdated((prev) => !prev)
          } catch (error) {
            console.error(error)
          } finally {
            setIsLoading(false)
          }
        }
      })
    }
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
  const handleSelectAllSelectedRows = () => {
    if (allSelected) {
      setSelectedRows([])
    } else {
      const allPropertyIds = properties.map((property) => property.propertyId)
      setSelectedRows(allPropertyIds)
    }
  }

  const handleDeleteAllSelectedRows = () => {
    if (selectedRows.length === 0) {
      return
    }
    const parseSelectedRowsToString = String(selectedRows)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: confirmBtn,
      cancelButtonColor: cancelBtn,
      confirmButtonText: 'Yes, delete selected property!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePropertiesForSellerService(parseSelectedRowsToString)
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

  const [packageServiceSelected, setPackageServiceSelected] = useState('')
  const [pricePackageServiceSelected, setPricePackageServiceSelected] =
    useState<number>()
  const [packageServiceList, setPackageServiceList] = useState<
    PackageService[]
  >([])
  const getAllPackageService = async () => {
    const res = await getAllRentalPackageService()
    setPackageServiceList(res.data.metaData)
  }
  useEffect(() => {
    getAllPackageService()
  }, [])

  // Get userProfile to get current credit.
  const [userProfile, setUserProfile] = useState<User | undefined>()
  const getUserProfile = async () => {
    const res = await getProfile()
    setUserProfile(res)
  }
  useEffect(() => {
    getUserProfile()
  }, [])

  const handleRenewProperty = async (property: Properties | null) => {
    if (property) {
      if (
        userProfile?.balance &&
        Number(userProfile.balance) >= Number(pricePackageServiceSelected!)
      ) {
        try {
          await updateStatusPropertiesForSellerService(
            property.propertyId,
            AVAILABLE,
            Number(packageServiceSelected),
          )
          closePackageService()
          Swal.fire({
            icon: 'success',
            title: 'Renew successfully!',
            text: 'This property is now available.',
          })
          setShouldUpdate((prev) => !prev)
        } catch (error) {
          console.error(error)
        } finally {
          setIsUpdated(!isUpdated)
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Insufficient balance',
          text: 'You have insufficient balance',
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
      })
    }
  }

  /**
   * When property is available, start countdown timer
   * the timer will run every second
   * the first if condition is used to display the countdown time
   * the second if condition is used to handle when the property is expired,
   * it will temporarily display EXPIRED to status field, then call API to change status to unavailable
   * to prevent the memory leak, there will be a clean-up function in an useEffect hook to clear the intervals when the component unmounts
   */
  function handleCountdownTimer(property: Properties) {
    intervals.forEach((interval) => clearInterval(interval))
    const x = setInterval(async function () {
      setIntervals((prev) => [...prev, x])

      const countDownDate = new Date(property.expiresAt).getTime()
      const now = new Date().getTime()
      const distance = countDownDate - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      if (
        document.getElementById(`remainingTime${property.propertyId}`) &&
        property.remainingTime > 0 &&
        property.status === AVAILABLE
      ) {
        document.getElementById(
          `remainingTime${property.propertyId}`,
        )!.innerHTML =
          days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's '
        clearInterval(x)
      }

      if (
        distance < 0 &&
        document.getElementById(`remainingTime${property.propertyId}`) &&
        property.status === AVAILABLE
      ) {
        clearInterval(x)
        document.getElementById(
          `remainingTime${property.propertyId}`,
        )!.innerHTML = 'EXPIRED'
        try {
          await updateStatusPropertiesForSellerService(
            property.propertyId,
            UN_AVAILABLE,
          )
          setIsUpdated((prev) => !prev)
        } catch (err) {
          clearInterval(x)
        } finally {
          clearInterval(x)
        }
      }
    }, 1000)

    return () => {
      clearInterval(x)
    }
  }

  /**
   * this func is used to check status/remaining time/savedRemainingRentalTime(it exists when sell temporarily sets status to unavailable even there's still remaining time) and choose which func to handle each case.
   * if the property is not expired or disabled, it will call the handleCountdownTimer func
   * if the property is temporarily unavailable, it will call the handleStopCountdownTimer func
   * if the property is disabled, it will return DISABLED
   * if the property is expired, it will return EXPIRED
   */
  function handleCheckBeforeInterval(property: Properties) {
    if (property.remainingTime > 0 && property.status === AVAILABLE) {
      handleCountdownTimer(property)
      return
    }

    if (
      property.savedRemainingRentalTime > 0 &&
      property.status === UN_AVAILABLE
    ) {
      handleStopCountdownTimer(property)
      return
    }

    return !property.remainingTime && property.status === UN_AVAILABLE
      ? 'EXPIRED'
      : 'DISABLED'
  }
  function handleStopCountdownTimer(property: Properties) {
    if (
      property.savedRemainingRentalTime > 0 &&
      property.status === UN_AVAILABLE
    ) {
      const days = Math.floor(
        property.savedRemainingRentalTime / (1000 * 60 * 60 * 24),
      )
      const hours = Math.floor(
        (property.savedRemainingRentalTime % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60),
      )
      const minutes = Math.floor(
        (property.savedRemainingRentalTime % (1000 * 60 * 60)) / (1000 * 60),
      )
      const seconds = Math.floor(
        (property.savedRemainingRentalTime % (1000 * 60)) / 1000,
      )
      if (document.getElementById(`remainingTime${property.propertyId}`)) {
        document.getElementById(
          `remainingTime${property.propertyId}`,
        )!.innerHTML =
          days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's '
      }
      return ''
    }
  }

  useEffect(() => {
    intervals.forEach((el) => clearInterval(el))
    setIntervals([])
    return () => {
      intervals.forEach((el) => clearInterval(el))
      setIntervals([])
    }
  }, [isUpdated])

  const rows =
    properties.length > 0 ? (
      properties.map((element) => (
        <Table.Tr
          onClick={() => handlePropertyView(element)}
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
          <Table.Td classNames={{ td: style.tdNameCover }}>
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
          <Table.Td
            key={element.propertyId}
            id={`remainingTime${element.propertyId}`}
          >
            {handleCheckBeforeInterval(element)}
          </Table.Td>
          <Table.Td onClick={(event) => event.stopPropagation()}>
            {element.status === AVAILABLE ? (
              <div className={style.available}>Available</div>
            ) : element.status === UN_AVAILABLE ? (
              <div className={style.unavailable}>Unavailable</div>
            ) : (
              <div className={style.disabledAdmin}>Disabled</div>
            )}
          </Table.Td>

          <Table.Td onClick={(event) => event.stopPropagation()}>
            <div className={style.propertyActions}>
              {element.status === 'Disabled' ? (
                <Tooltip label="Disabled" refProp="rootRef">
                  <Switch checked={false} />
                </Tooltip>
              ) : element.status === 'Available' ? (
                <Tooltip label="Disable property" refProp="rootRef">
                  <Switch
                    checked={element.status === 'Available' ? true : false}
                    onChange={(event) =>
                      handleUpdateStatus(event.currentTarget.checked, element)
                    }
                  />
                </Tooltip>
              ) : (
                <Tooltip label="Enable property" refProp="rootRef">
                  <Switch
                    checked={element.status === 'Available' ? true : false}
                    onChange={(event) =>
                      handleUpdateStatus(event.currentTarget.checked, element)
                    }
                  />
                </Tooltip>
              )}
              <FaEdit
                className={`${style.actionIcon} ${style.editIcon}`}
                onClick={() => handlePropertyView(element)}
              />
              <MdDelete
                className={`${style.actionIcon} ${style.deleteIcon}`}
                onClick={() => handleDelete(element)}
              />
            </div>
          </Table.Td>
        </Table.Tr>
      ))
    ) : (
      <div>No properties</div>
    )

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
            <div className={style.tableSelect}>
              <div className={style.tableSearch}>
                <TextInput
                  classNames={{ input: style.inputText }}
                  placeholder="Enter your keyword..."
                  onChange={(event) => setKeyword(event.target.value)}
                />
              </div>
              <Select
                classNames={{
                  input: style.elementSelect,
                  dropdown: style.dropdownSelectActions,
                  options: style.optionsSelectActions,
                  option: style.optionSelectActions,
                }}
                placeholder="Select Featured"
                data={features.flatMap((feature) => [
                  {
                    value: feature.featureId.toString(),
                    label: feature.name,
                  },
                ])}
                onChange={(value: string | null) => {
                  setFeatureId(value)
                }}
                allowDeselect
              />

              <Select
                classNames={{
                  input: style.elementSelect,
                  dropdown: style.dropdownSelectActions,
                  options: style.optionsSelectActions,
                  option: style.optionSelectActions,
                }}
                placeholder="Select Category"
                data={categories.flatMap((category) => [
                  {
                    value: category.categoryId.toString(),
                    label: category.name,
                  },
                ])}
                onChange={(value: string | null) => {
                  setCategoryId(value)
                }}
                allowDeselect
              />

              <div>
                <Button
                  className={style.iconSearch}
                  onClick={() => handleFiltering()}
                >
                  <FaSearch size={16} />
                </Button>
              </div>
            </div>
            <div className={style.coverBtn}>
              <Button onClick={handlePropertyAdd} className={style.addBtn}>
                <span className={style.iconBtn}>
                  <FaPlus />
                </span>
                Add New Property
              </Button>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Button
              classNames={{
                root:
                  selectedRows.length > 0
                    ? style.rootButtonDeleteAllAfter
                    : style.rootButtonDeleteAll,
              }}
              onClick={() => handleDeleteAllSelectedRows()}
            >
              Delete ({selectedRows.length}) properties
            </Button>

            <Button
              classNames={{
                root:
                  filterNum > 0 ? style.rootBtnClearAfter : style.rootBtnClear,
              }}
              onClick={() => handleResetFilter()}
            >
              Clear filter {filterNum > 0 && <span>({filterNum})</span>}
            </Button>
          </div>
          <div className={style.tableContent}>
            <Box pos="relative">
              <LoadingOverlay
                visible={isLoading}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'pink', type: 'bars' }}
              />

              <Table
                bg="white"
                highlightOnHover
                withTableBorder
                verticalSpacing="sm"
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
                          <PiArrowsDownUp
                            className="cursor-pointer"
                            size={20}
                          />
                        )}
                      </span>
                    </Table.Th>
                    <Table.Th>Remaining Time</Table.Th>
                    <Table.Th className="min-w-25">Status</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{error ? error : rows}</Table.Tbody>
              </Table>

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
            </Box>
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
        title="Manage Property"
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
          setShouldUpdate={setShouldUpdate}
        />
      </Modal>
      <Modal
        opened={openedPackageservice}
        onClose={closePackageService}
        title="Package Service"
        centered
        classNames={{ title: style.titleModalPackage }}
      >
        <div>
          <div className="text-base text-black font-bold">
            Your property&apos;s effective day is expired. Please, choose a
            package to renew.
          </div>
          <div className="mt-4">
            <Radio.Group
              value={packageServiceSelected}
              onChange={(value) => {
                setPackageServiceSelected(value)
              }}
              withAsterisk
              label="How long do you want to renew this property?"
              className="text-base"
              classNames={{
                root: style.radioGroupRoot,
                label: style.radioGroupLabel,
              }}
            >
              <Group classNames={{ root: style.groupRoot }}>
                {packageServiceList.length > 0 &&
                  packageServiceList.map((item) => (
                    <Radio
                      onChange={() =>
                        setPricePackageServiceSelected(item.price)
                      }
                      key={item.serviceId}
                      value={String(item.serviceId)}
                      label={`${item.serviceName} - ${item.price} credits`}
                    />
                  ))}
              </Group>
            </Radio.Group>
          </div>
          <div className="flex justify-center">
            <Button
              classNames={{ root: style.renewBtn }}
              size="sm"
              onClick={() => {
                if (selectedProperty) {
                  handleRenewProperty(selectedProperty)
                } else {
                  handleRenewProperty(null)
                }
              }}
            >
              Renew
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default TableProperty
