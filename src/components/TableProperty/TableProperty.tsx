import React, { useEffect, useState } from 'react'
import style from './TableProperty.module.scss'
import {
  Button,
  Select,
  TextInput,
  Table,
  Image,
  ScrollArea,
  Modal,
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
import { getAllCategories } from '../../redux/reducers/categorySlice'
import { getAllFeatures } from '../../redux/reducers/featureSlice'
import { PiArrowsDownUp } from 'react-icons/pi'
import {
  searchPropertyForSeller,
  SearchProps,
} from '../../service/SearchService'
import { CODE_RESPONSE_400, CODE_RESPONSE_401, CODE_RESPONSE_404 } from '../../constants/codeResponse'

const TableProperty = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [selectedProperty, setSelectedProperty] = useState<Properties | null>(
    null,
  )
  const [isUpdated, setIsUpdated] = useState(false)
  const [properties, setProperties] = useState<Properties[]>([])
  const [sort, setSort] = useState(true)
  const [statusProperty, setStatusProperty] = useState(false)
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
          const res = await axiosInstance.delete(
            `/seller/properties/${property.propertyId}`,
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
        }
      })
    } catch (error) {
      // console.error('Error deleting new property:', error)
    }
  }
  useEffect(() => {
    setProperties(properties)
  }, [properties])

  const getAllPropertiesForSeller = async () => {
    try {
      const res = await axiosInstance.get(`/seller/properties`)
      setProperties(res.data.metaData.data)
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

  useEffect(() => {
    getAllPropertiesForSeller()
    setIsUpdated(false)
  }, [isUpdated])
  //Apply API getAllCategory
  const dispatch = useAppDispatch()
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

  const getPropertiesSortByPrice = async () => {
    try {
      setSort(!sort)
      if (sort) {
        const res = await axiosInstance.get(
          `/seller/properties`,{params: {sortBy: 'asc', orderBy: 'price'}}
        )
        setProperties(res.data.metaData.data)
      } else {
        const res = await axiosInstance.get(
          `/seller/properties`,{params: {sortBy: 'desc', orderBy: 'price'}}
        )
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

  const [featureId, setFeatureId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [name, setName] = useState('')

  const handleFiltering = async (
    name: string,
    featureId: string,
    categoryId: string,
  ) => {
    const data: SearchProps = {
      keyword: name ? name : null,
      categoryId: categoryId ? Number(categoryId) : null,
      featureId: featureId ? Number(featureId) : null,
    }
    const res = await searchPropertyForSeller(data)
    setProperties(res.data)
  }

  const handleUpdateStatus = async (status:boolean, propertyId: number) => {
    setStatusProperty(!status)
    try{Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, disable it!',
    }).then(async (result) =>{
      if (result.isConfirmed) {
        const res = await axiosInstance.patch(`/seller/properties/${propertyId}`, {status: statusProperty})
        Swal.fire({
          title: 'Updated!',
          text: 'Your property is updated.',
          icon: 'success',
        })
        setIsUpdated(prev => !prev)
        return res
      }
    })
      
    }catch(error:any) {
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
  const rows =
    properties.length > 0 &&
    properties.map((element) => (
      <Table.Tr className={style.detailContentTable} key={element.propertyId}>
        <Table.Td>{element.propertyId}</Table.Td>
        <Table.Td onClick={() => handlePropertyView(element)}>
          <div className={style.propertyNameCover}>
            <Image
              className={style.propertyImage}
              src={element.images[0].imageUrl}
            />
            <span className={style.propertyName}>{element.name}</span>
          </div>
        </Table.Td>
        <Table.Td>{element.code}</Table.Td>
        <Table.Td>{element.feature.name}</Table.Td>
        <Table.Td>{element.category.name}</Table.Td>
        <Table.Td>{formatMoneyToUSD(element.price)}</Table.Td>

        {element.status ? (
          <Table.Td>
            <Button
              onClick={() => handleUpdateStatus(element.status, element.propertyId)}
              className={style.enable}
            >
              Enable
            </Button>
          </Table.Td>
        ) : (
          <Table.Td>
            <Button className={style.disable}>Disable</Button>
          </Table.Td>
        )}
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
                  classNames={{ input: style.input }}
                  placeholder="Search property......"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <Select
                classNames={{ input: style.elementSelect }}
                placeholder="Choose Featured"
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
                placeholder="Choose Category"
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
                  onClick={() => handleFiltering(name, featureId, categoryId)}
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
            <ScrollArea h={600}>
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
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </ScrollArea>
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

export default TableProperty
