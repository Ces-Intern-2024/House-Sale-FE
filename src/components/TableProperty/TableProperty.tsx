import React, { useState } from 'react'
import style from './TableProperty.module.scss'
import {
  Modal,
  Button,
  Select,
  TextInput,
  Table,
  Image,
  ScrollArea,
} from '@mantine/core'
import { FaPlus, FaSearch, FaEdit } from 'react-icons/fa'
import { properties } from '../../utils/properties'
import { MdDelete } from 'react-icons/md'
import { useDisclosure } from '@mantine/hooks'
import ModalProperty from '../ModalProperty/ModalProperty'
import { Properties } from '@/types'

const TableProperty = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [selectedProperty, setSelectedProperty] = useState<Properties | null>(
    null,
  )

  const handlePropertyView = (property: Properties) => {
    setSelectedProperty(property)
    open()
  }

  const handlePropertyAdd = () => {
    setSelectedProperty(null)
    open()
  }

  const rows = properties.map((element) => (
    <Table.Tr className={style.detailContentTable} key={element.propertyId}>
      <Table.Td>{element.propertyId}</Table.Td>
      <Table.Td onClick={() => handlePropertyView(element)}>
        <Button
          className={style.propertyNameCover}
          classNames={{ label: style.propertyNameModal }}
        >
          <Image className={style.propertyImage} src={element.images} />
          <span className={style.propertyName}>{element.name}</span>
        </Button>
      </Table.Td>
      <Table.Td>$ {element.price}</Table.Td>
      <Table.Td>{element.featuredId}</Table.Td>
      <Table.Td>{element.categoryId}</Table.Td>
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
              <span className={style.subTitle}>Manage your properties</span>
            </div>
          </div>

          <div className={style.tableSideBar}>
            <div className={style.tableSelect}>
              <div className={style.tableSearch}>
                <TextInput
                  classNames={{ input: style.input }}
                  placeholder="Search property......"
                />
              </div>
              <div>
                <Select
                  classNames={{ input: style.elementSelect }}
                  placeholder="Choose Featured"
                  data={['Rent', 'Sale']}
                />
              </div>
              <div>
                <Select
                  classNames={{ input: style.elementSelect }}
                  placeholder="Choose Category"
                  data={['House', 'Villa', 'Department']}
                />
              </div>
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
        <ModalProperty property={selectedProperty} />
      </Modal>
    </>
  )
}

export default TableProperty
