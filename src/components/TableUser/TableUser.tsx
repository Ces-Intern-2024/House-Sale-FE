import React, { useEffect, useState } from 'react'
import style from './TableUser.module.scss'
import {
  Button,
  Table,
  TextInput,
  Image,
  Select,
  Switch,
  Tooltip,
  Box,
  LoadingOverlay,
  Pagination,
} from '@mantine/core'
import { FaEdit, FaSearch } from 'react-icons/fa'
import {
  getAllUsersForAdminService,
  getUsersForAdminService,
  updateStatusUserForAdminService,
} from '../../service/AdminService'
import { User } from '../../types/user'
import { Roles } from '../../types/role'
import { MdDelete } from 'react-icons/md'
import { formatDateNoHours } from '../../utils/commonFunctions'
import { RxAvatar } from 'react-icons/rx'
import { IconSortAscending } from '@tabler/icons-react'
import { SearchUsers } from '@/types/searchUsers'

function TableUser() {
  const [email, setEmail] = useState('')
  const [userList, setUserList] = useState<User[]>([])
  const [roleId, setRoleId] = useState('')
  const [activePage, setActivePage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [resetPage, setResetPage] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const getAllUser = async () => {
    try {
      const res = await getAllUsersForAdminService()
      setUserList(res.metaData.data)
      setTotalPages(res.metaData.totalPages)
      setTotalItems(res.metaData.totalItems)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getAllUser()
  }, [])

  const handleSearchUsers = async () => {
    const searchValues: SearchUsers = {
      roleId: roleId ? Number(roleId) : null,
      email: email ? email : null,
      page: resetPage ? 1 : activePage,
      limit: 10,
      orderBy: null,
      sortBy: null,
    }
    try {
      setIsLoading(true)
      const res = await getUsersForAdminService(searchValues)
      setUserList(res.metaData.data)
      setTotalPages(res.metaData.totalPages)
      setTotalItems(res.metaData.totalItems)
      setActivePage(resetPage ? 1 : activePage)
      setResetPage(true)
    } catch (error) {
      console.error(error)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleSearchUsers()
  }, [roleId])

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSearchUsers()
    }
  }
  const handleUpdateStatusUser = async (userId: number) => {
    try {
      setIsLoading(true)
      await updateStatusUserForAdminService(userId)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangeActivePage = async (page: any) => {
    setResetPage(false)
    setActivePage(page)
  }

  useEffect(() => {
    handleSearchUsers()
  }, [activePage])
  const rows =
    userList.length > 0 ? (
      userList.map((user) => (
        <Table.Tr key={user.userId} className="text-base h-16">
          <Table.Td>{user.userId}</Table.Td>
          <Table.Td>
            {user.avatar ? (
              <Image className={style.avatar} src={user.avatar} />
            ) : (
              <RxAvatar className="ml-1" size={30} />
            )}
          </Table.Td>
          <Table.Td>{user.fullName ? user.fullName : 'User'}</Table.Td>
          <Table.Td>{user.email}</Table.Td>
          {user.phone ? (
            <Table.Td>{user.phone}</Table.Td>
          ) : (
            <Table.Td>
              <span className="text-base bg-blue-700 text-white px-2 rounded-[6px] py-1">
                Not registered
              </span>
            </Table.Td>
          )}
          <Table.Td className="font-semibold">
            {user.roleId === Roles.User
              ? 'User'
              : user.roleId === Roles.Seller
                ? 'Seller'
                : 'Undefined'}
          </Table.Td>
          <Table.Td>{formatDateNoHours(user.createdAt)}</Table.Td>
          <Table.Td>
            <Tooltip label="Active" refProp="rootRef">
              <Switch
                size="md"
                onChange={() => {
                  if (user.userId !== undefined) {
                    handleUpdateStatusUser(user.userId)
                  }
                }}
                defaultChecked={user.isActive}
              />
            </Tooltip>
          </Table.Td>
          <Table.Td>
            <div className={style.userActions}>
              <FaEdit className={`${style.actionIcon} ${style.editIcon}`} />
              <MdDelete className={`${style.actionIcon} ${style.deleteIcon}`} />
            </div>
          </Table.Td>
        </Table.Tr>
      ))
    ) : (
      <div>There are no registered users yet</div>
    )

  return (
    <div className={style.tablePropertyContainer}>
      <div className={style.tablePropertyContent}>
        <div className={style.tableHeader}>
          <div className={style.pageTitle}>
            <span className={style.title}>User List </span>
            <span className={style.subTitle}>Manage your Users</span>
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <div className={style.searchContainer}>
            <TextInput
              placeholder="Enter email..."
              size="md"
              radius={4}
              classNames={{ input: style.textInput }}
              onChange={(event) => setEmail(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              className={style.iconSearch}
              onClick={() => handleSearchUsers()}
            >
              <FaSearch size={20} />
            </Button>
          </div>
          <Select
            className="col-span-1"
            classNames={{
              label: 'text-sm',
              input:
                'h-auto rounded-none border-primary text-primary text-sm font-semibold',
            }}
            size="md"
            leftSection={<IconSortAscending className=" text-primary" />}
            allowDeselect
            checkIconPosition="right"
            placeholder="Filter By"
            data={[
              { label: 'User', value: '1' },
              { label: 'Seller', value: '2' },
            ]}
            onChange={(value) => {
              if (value) {
                setRoleId(value)
              } else {
                setRoleId('')
              }
            }}
          />
        </div>
        <div className="mt-8">
          <Box pos="relative">
            <LoadingOverlay
              visible={isLoading}
              zIndex={10}
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
                <Table.Tr className="text-base">
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Avatar</Table.Th>
                  <Table.Th>Full name</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Created On</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <div className="flex justify-between my-2 items-baseline">
              <Pagination
                total={totalPages}
                value={activePage}
                mt="sm"
                onChange={handleChangeActivePage}
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
  )
}

export default TableUser
