import React, { useEffect, useState } from 'react'
import style from './TableProperty.module.scss'
import {
  Modal,
  Button,
  Select,
  TextInput,
  Table,
  Image,
  ScrollArea,
  Group,
  Collapse,
} from '@mantine/core'
import { FaPlus, FaSearch, FaEdit } from 'react-icons/fa'
import { FaFilter } from 'react-icons/fa6'
import { MdDelete } from 'react-icons/md'
import { useDisclosure } from '@mantine/hooks'
import ModalProperty from '../ModalProperty/ModalProperty'
import { Properties } from '@/types'
import { axiosInstance } from '../../service/AxiosInstance'
import Swal from 'sweetalert2'

const TableProperty = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [collapse, { toggle }] = useDisclosure(false)
  const [selectedProperty, setSelectedProperty] = useState<Properties | null>(
    null,
  )
  const [isUpdated, setIsUpdated] = useState(false)
  const [properties, setProperties] = useState<Properties[]>([])

  const toggleCollapse = () => {
    toggle()
  }

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
            text: 'Your file has been deleted.',
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
  useEffect(() => setProperties(properties), [properties])

  const getAllPropertiesForSeller = async () => {
    const res = await axiosInstance.get(`/seller/properties`)
    setProperties(res.data.metaData.properties)
  }

  useEffect(() => {
    getAllPropertiesForSeller()
    setIsUpdated(false)
  }, [isUpdated])

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
        <Table.Td>$ {element.price}</Table.Td>
        <Table.Td>{element.feature.featureId}</Table.Td>
        <Table.Td>{element.category.categoryId}</Table.Td>
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
              <Group justify="center" mb={5}>
                <FaFilter onClick={toggleCollapse} />
              </Group>
              <div className={style.tableSearch}>
                <TextInput
                  classNames={{ input: style.input }}
                  placeholder="Search property......"
                />
              </div>
              <Collapse
                in={collapse}
                transitionDuration={1000}
                transitionTimingFunction="linear"
              >
                <div>
                  <Select
                    classNames={{ input: style.elementSelect }}
                    placeholder="Choose Featured"
                    data={['Rent', 'Sale']}
                  />

                  <Select
                    classNames={{ input: style.elementSelect }}
                    placeholder="Choose Category"
                    data={['House', 'Villa', 'Department']}
                  />
                </div>
              </Collapse>
              <div>
                <Button className={style.iconSearch}>
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
                    <Table.Th classNames={{ th: style.thPrice }}>
                      Price
                    </Table.Th>
                    <Table.Th>Featured</Table.Th>
                    <Table.Th>Category</Table.Th>
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
