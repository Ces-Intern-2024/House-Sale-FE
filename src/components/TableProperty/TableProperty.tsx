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
} from '@mantine/core'
import { FaPlus, FaSearch, FaEdit } from 'react-icons/fa'
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
  CODE_RESPONSE_404,
} from '../../constants/codeResponse'
import { SearchProps } from '@/types/searchProps'
import {
  deletePropertiesForSellerService,
  getAllPropertiesForSellerService,
  updateStatusPropertiesForSellerService,
  searchPropertyForSeller,
} from '../../service/SellerService'
import { AVAILABLE, UN_AVAILABLE } from '../../constants/statusProperty'
import { getAllFeatures } from '../../redux/reducers/featureSlice'
import { getAllCategories } from '../../redux/reducers/categorySlice'

interface TablePropertyProps {
  setShouldUpdate: React.Dispatch<React.SetStateAction<boolean>>
  shouldUpdate: boolean
}
const TableProperty = ({
  setShouldUpdate,
  shouldUpdate,
}: TablePropertyProps) => {
  const [opened, { open, close }] = useDisclosure(false)
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
  const [totalPages, setTotalPages] = useState(2)
  const [_totalItems, setTotalItems] = useState(0)

  const [featureId, setFeatureId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [keyword, setKeyword] = useState('')

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
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await deletePropertiesForSellerService(
              property.propertyId,
            )
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
            return res
          } catch (error: any) {
            if (error.response.status === CODE_RESPONSE_400) {
              Swal.fire({
                icon: 'error',
                text: 'Failed to delete property!',
              })
            } else if (error.response.status === CODE_RESPONSE_404) {
              Swal.fire({
                icon: 'error',
                text: 'Property not found',
              })
            } else {
              console.error(error)
            }
          }
        }
      })
    } catch (error) {
      console.error(error)
    }
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

  const getPropertiesSortByPrice = async () => {
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
      page: activePage ? activePage : null,
    }

    try {
      const res = await searchPropertyForSeller(data)
      setProperties(res.data)
    } catch (error: any) {
      setError(error.response.data.error.message)
    }
  }
  useEffect(() => {
    handleFiltering()
  }, [activePage])

  const handleUpdateStatus = async (event: boolean, propertyId: number) => {
    if (event) {
      try {
        setIsLoading(true)
        await updateStatusPropertiesForSellerService(propertyId, AVAILABLE)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
        setIsUpdated(!isUpdated)
      }
    } else {
      try {
        setIsLoading(true)
        await updateStatusPropertiesForSellerService(propertyId, UN_AVAILABLE)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
        setIsUpdated(!isUpdated)
      }
    }
  }

  const rows =
    properties.length > 0 ? (
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
          <Table.Td>
            {element.status === 'Disabled' ? (
              <Button className={style.disableb}>Disabled</Button>
            ) : element.status === 'Available' ? (
              <Tooltip label="Available property" refProp="rootRef">
                <Switch
                  onLabel="ON"
                  offLabel="OFF"
                  size="lg"
                  classNames={{
                    track: style.switchTrack,
                    thumb: style.switchThumb,
                    trackLabel: style.switchTrackLabel,
                  }}
                  checked={element.status === 'Available' ? true : false}
                  onChange={(event) =>
                    handleUpdateStatus(
                      event.currentTarget.checked,
                      element.propertyId,
                    )
                  }
                />
              </Tooltip>
            ) : (
              <Tooltip label="Unavailable property" refProp="rootRef">
                <Switch
                  onLabel="ON"
                  offLabel="OFF"
                  size="lg"
                  classNames={{
                    track: style.switchTrack,
                    thumb: style.switchThumb,
                    trackLabel: style.switchTrackLabel,
                  }}
                  checked={element.status === 'Available' ? true : false}
                  onChange={(event) =>
                    handleUpdateStatus(
                      event.currentTarget.checked,
                      element.propertyId,
                    )
                  }
                />
              </Tooltip>
            )}
          </Table.Td>

          <Table.Td>
            <div className={style.propertyActions}>
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
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{error ? error : rows}</Table.Tbody>
              </Table>

              <div className={style.pagination}>
                <Pagination
                  total={totalPages}
                  value={activePage}
                  onChange={setActivePage}
                  mt="sm"
                  classNames={{ control: style.paginationControl }}
                />
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
          setShouldUpdate={setShouldUpdate}
        />
      </Modal>
    </>
  )
}

export default TableProperty
