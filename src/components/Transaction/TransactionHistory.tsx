import React, { useEffect, useState } from 'react'
import { Box, Button, LoadingOverlay, Transition } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import style from './Transaction.module.scss'
import { IoIosNotifications } from 'react-icons/io'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { BsCoin } from 'react-icons/bs'
import { HistoryTransaction } from '../../types/historyTransaction'
import {
  convertISOToVNDateTimeString,
  formatDateToYYYYMMDD,
  sortTransactionsByDate,
} from '../../utils/commonFunctions'
import { getTransactionHistory } from '../../service/TransactionService'
import { getTransactionRentService } from '../../service/SellerService'

interface TransactionHistoryProps {
  shouldUpdate: boolean
}
export default function TransactionHistory({
  shouldUpdate,
}: TransactionHistoryProps) {
  const [histories, setHistories] = useState<HistoryTransaction[]>([])
  const [dateValue, setDateValue] = useState<[Date | null, Date | null]>([
    null,
    null,
  ])
  const [showCalendar, setShowCalendar] = useState(false)
  const [visible, setVisible] = useState(false)
  const getTransaction = async (dateFrom?: string, dateTo?: string | null) => {
    try {
      setVisible(true)
      const data = await getTransactionHistory(dateFrom, dateTo ?? null)
      const rentServiceHistory = await getTransactionRentService(
        dateFrom,
        dateTo ?? null,
      )
      const combinedHistory = [...data, ...rentServiceHistory]
      setHistories(sortTransactionsByDate(combinedHistory))
    } catch (error) {
      setHistories([])
    } finally {
      setVisible(false)
    }
  }

  const handleDateRangeSearch = () => {
    if (dateValue[0] && dateValue[1]) {
      getTransaction(
        formatDateToYYYYMMDD(dateValue[0]),
        formatDateToYYYYMMDD(dateValue[1]),
      )
    } else {
      getTransaction(
        formatDateToYYYYMMDD(dateValue[0]),
        formatDateToYYYYMMDD(dateValue[0]),
      )
    }
    setShowCalendar(false)
  }

  useEffect(() => {
    getTransaction()
    return () => {
      setShowCalendar(false)
    }
  }, [shouldUpdate])

  return (
    <>
      <div className=" flex justify-between items-center font-sans">
        <div className="flex items-center gap-x-2">
          <span className={style.titleText}>Transaction history</span>
          <span className={style.titleIcon}>
            <IoIosNotifications />
          </span>
        </div>
        <div className="relative ">
          <IoCalendarNumberOutline
            size={35}
            className=" text-primary cursor-pointer "
            onClick={() => setShowCalendar(!showCalendar)}
          />
          <Transition
            mounted={showCalendar ? true : false}
            transition="slide-up"
            duration={390}
            timingFunction="ease"
          >
            {(styles) => (
              <div
                style={styles}
                className="absolute top-10 -left-[300px] flex flex-col justify-end items-center z-10 
              rounded-xl p-3 w-[327px] bg-white border border-blur"
              >
                <DatePicker
                  className=" text-center"
                  // allowSingleDateInRange
                  hideOutsideDates
                  bg="#F5F9FC"
                  type="range"
                  value={dateValue}
                  onChange={setDateValue}
                  classNames={{
                    calendarHeaderLevel: 'w-[330px] text-center',
                    calendarHeader: 'w-[330px] text-center',
                    day: style.day,
                    weekday: ' text-gray-600 font-bold',
                    levelsGroup: 'w-full ',
                    month: 'w-full ',
                  }}
                  w="100%"
                  style={styles}
                />

                <Button
                  className=" bg-blur text-primary w-[300px]"
                  onClick={handleDateRangeSearch}
                >
                  Search
                </Button>
              </div>
            )}
          </Transition>
        </div>
      </div>

      <Box pos="relative">
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          loaderProps={{ color: 'pink', type: 'bars' }}
          overlayProps={{ radius: 'sm', blur: 0.7 }}
        />
        <div className=" max-h-[110px] overflow-y-scroll pr-4 flex flex-col gap-y-1">
          {histories.length > 0 ? (
            histories.map((history, index) => (
              <div key={index} className={style.row}>
                <div className={style.date}>
                  {convertISOToVNDateTimeString(history.createdAt)}
                </div>
                <div className={style.content}>{history.description}</div>
                <div className={style.quantity}>
                  <span className={style.symbol}>
                    {history.description.includes('property') ? '-' : '+'}
                  </span>
                  <span className={style.money}>{Number(history.amount)}</span>
                  <span className={style.icon}>
                    <BsCoin />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="h-[100px]">
              You have not made any transactions yet.
            </div>
          )}
        </div>
      </Box>
    </>
  )
}
