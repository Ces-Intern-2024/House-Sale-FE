import React, { useEffect, useState } from 'react'
import style from './TableTransaction.module.scss'
import {
  Table,
  Box,
  LoadingOverlay,
  Pagination,
  TextInput,
} from '@mantine/core'
import { getAllTransactions } from '../../service/AdminService'
import { getTransactionHistory } from '../../service/TransactionService'
import {
  convertISOToVNDateTimeString,
  formatDateToYYYYMMDD,
  getSevenDaysBeforeToday,
} from '../../utils/commonFunctions'
import { FaSearch } from 'react-icons/fa'
import { DatePickerInput } from '@mantine/dates'
import { IconCalendar, IconHistory } from '@tabler/icons-react'
import { primary } from '../../constants/color.constant'

interface TableTransactionProps {
  isSeller: boolean
}

export default function TableTransaction({ isSeller }: TableTransactionProps) {
  const [activePage, setActivePage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [_searchEmail, setSearchEmail] = useState('')
  const [dateValues, setDateValues] = useState<[Date | null, Date | null]>([
    getSevenDaysBeforeToday(),
    new Date(),
  ])

  const [transactions, setTransactions] = useState<[]>([])

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      setSearchEmail(event.currentTarget.value)
      handleGetAllTransactions()
    }
  }
  const handleGetAllTransactions = async (
    fromDateRange?: string,
    toDateRange?: string,
    page?: number,
  ) => {
    try {
      setIsLoading(true)
      const res = !isSeller
        ? await getAllTransactions(
            fromDateRange ?? null,
            toDateRange ?? null,
            page ?? activePage,
          )
        : await getTransactionHistory(
            fromDateRange ?? null,
            toDateRange ?? null,
            page ?? activePage,
          )

      setTransactions(res.data)
      setTotalPages(res.totalPages)
      setTotalItems(res.totalItems)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangeActivePage = async (page: any) => {
    setActivePage(page)
  }

  useEffect(() => {
    handleGetAllTransactions(
      formatDateToYYYYMMDD(dateValues[0]),
      formatDateToYYYYMMDD(dateValues[1]),
      activePage,
    )
  }, [activePage])

  useEffect(() => {
    // to make sure we have the date range
    if (dateValues[0] && dateValues[1]) {
      handleGetAllTransactions(
        formatDateToYYYYMMDD(dateValues[0]),
        formatDateToYYYYMMDD(dateValues[1]),
        1,
      )
      setActivePage(1)
    }
    // for reset purpose
    if (!dateValues[0] && !dateValues[1]) {
      setDateValues([getSevenDaysBeforeToday(), new Date()])
      setActivePage(1)
    }
  }, [dateValues[1]])

  const rows =
    transactions.length > 0 ? (
      transactions.map((transaction: any) => (
        <Table.Tr key={transaction.transactionId} className="text-base h-16">
          <Table.Td>{transaction.transactionId}</Table.Td>
          {!isSeller && <Table.Td>{transaction.userId}</Table.Td>}
          <Table.Td>{transaction.amount}</Table.Td>
          <Table.Td>{transaction.balance}</Table.Td>
          <Table.Td>{transaction.description}</Table.Td>
          <Table.Td>
            {convertISOToVNDateTimeString(transaction.createdAt)}
          </Table.Td>
        </Table.Tr>
      ))
    ) : (
      <div>There is no transaction yet</div>
    )

  return (
    <div className={style.tablePropertyContainer}>
      <div className={style.tablePropertyContent}>
        <div className={style.tableHeader}>
          <div className={style.pageTitle}>
            <span className={style.title}>Transaction List </span>
            <span className={style.subTitle}>Manage Your Transaction</span>
          </div>
        </div>
        <div
          className={`mt-0 flex items-end ${isSeller ? 'justify-end' : 'justify-between'}`}
        >
          {!isSeller && (
            <div className={style.searchContainer}>
              <TextInput
                leftSection={<FaSearch color={primary} size={20} />}
                placeholder="Enter email..."
                size="md"
                radius={4}
                classNames={{ input: style.textInput }}
                onChange={(event) => setSearchEmail(event.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}

          <DatePickerInput
            clearable={true}
            allowSingleDateInRange={true}
            leftSection={<IconCalendar color={primary} stroke={1.5} />}
            rightSection={
              <IconHistory
                color={primary}
                stroke={1.5}
                className=" cursor-pointer"
                onClick={() =>
                  setDateValues([getSevenDaysBeforeToday(), new Date()])
                }
              />
            }
            size="md"
            classNames={{
              day: style.day,
              weekday: ' text-gray-600 font-bold',
            }}
            w={330}
            type="range"
            label="Pick date range"
            placeholder="Pick date range"
            value={dateValues}
            onChange={setDateValues}
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
                  <Table.Th>Transaction ID</Table.Th>
                  {!isSeller && <Table.Th>User ID</Table.Th>}
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>Balance</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>Created At</Table.Th>
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
