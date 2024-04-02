import PieChart from '../../components/Charts/PieChart'
import LineChart from '../../components/Charts/LineChart'
import React, { useEffect, useState } from 'react'
import {
  getContactsCountedByDate,
  getPropertiesCountedByCategory,
  getPropertiesCountedByDate,
  getPropertiesCountedByFeature,
  getTotalAmountDepositedByDate,
  getTotalCreditsUsedByDate,
} from '../../service/AdminService'
import DoubleLineChart from '../../components/Charts/DoubleLineChart'
import { IconCalendar, IconHistory } from '@tabler/icons-react'
import { DatePickerInput } from '@mantine/dates'
import { primary } from '../../constants/color.constant'
import style from './AdminReportPage.module.scss'
import { formatDateToYYYYMMDD } from '../../utils/commonFunctions'
import { Box, LoadingOverlay, Tooltip } from '@mantine/core'

const AdminReportPage = () => {
  const [propertiesCountedByFeature, setPropertiesCountedByFeature] = useState<
    []
  >([])
  const [propertiesCountedByCategory, setPropertiesCountedByCategory] =
    useState<[]>([])
  const [propertiesCountedByDate, setPropertiesCountedByDate] = useState<[]>([])
  const [contactsCountedByDate, setContactsCountedByDate] = useState<[]>([])
  const [totalCreditsUsedByDate, setTotalCreditsUsedByDate] = useState<[]>([])
  const [
    totalAmountDepositedByDateInCredit,
    setTotalAmountDepositedByDateInCredit,
  ] = useState<[]>([])
  const [
    totalAmountDepositedByDateInDollar,
    setTotalAmountDepositedByDateInDollar,
  ] = useState<[]>([])
  const [dateValues, setDateValues] = useState<[Date | null, Date | null]>([
    new Date('2024-01-15'),
    new Date(),
  ])

  const [isLoading, setIsLoading] = useState(false)

  const handleGetPropertiesCountedByFeature = async () => {
    try {
      setIsLoading((_prev) => true)
      const data = await getPropertiesCountedByFeature()
      const formattedData = data.metaData
        .flatMap((property: any) => [
          {
            name: property.name,
            y: Number(property.count),
            inNumber: property.count,
          },
        ])
        .sort((a: any, b: any) => a.inNumber - b.inNumber)

      setPropertiesCountedByFeature((_prev) => formattedData)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading((_prev) => false)
    }
  }

  const handleGetPropertiesCountedByCategory = async () => {
    const data = await getPropertiesCountedByCategory()
    const formattedData = data.metaData
      .flatMap((property: any) => [
        {
          name: property.name,
          y: Number(property.count),
          inNumber: property.count,
        },
      ])
      .sort((a: any, b: any) => a.inNumber - b.inNumber)
    setPropertiesCountedByCategory((_prev) => formattedData)
  }

  const handleGetPropertiesCountedByDate = async () => {
    const res = await getPropertiesCountedByDate(
      formatDateToYYYYMMDD(dateValues[0])!,
      formatDateToYYYYMMDD(dateValues[1])!,
    )
    const formattedData = res.metaData.data.map((el: any) => [
      Date.parse(el.dateReport),
      el.count,
    ])
    setPropertiesCountedByDate((_prev) => formattedData)
  }

  const handleGetTotalAmountDepositedByDate = async () => {
    const res = await getTotalAmountDepositedByDate(
      formatDateToYYYYMMDD(dateValues[0])!,
      formatDateToYYYYMMDD(dateValues[1])!,
    )
    const formattedDataInCredit: any[] = []
    const formattedDataInDollar: any[] = []
    res.metaData.data.map((el: any) => {
      formattedDataInCredit.push({
        x: Date.parse(el.dateReport),
        y: Number(el.amountInCredits),
      })
      formattedDataInDollar.push({
        x: Date.parse(el.dateReport),
        y: Number(el.amountInDollars),
      })
    })
    setTotalAmountDepositedByDateInCredit(formattedDataInCredit as [])
    setTotalAmountDepositedByDateInDollar(formattedDataInDollar as [])
  }

  const handleGetContactsCountedByDate = async () => {
    const res = await getContactsCountedByDate(
      formatDateToYYYYMMDD(dateValues[0])!,
      formatDateToYYYYMMDD(dateValues[1])!,
    )
    const formattedData = res.metaData.data.map((el: any) => [
      Date.parse(el.dateReport),
      el.count,
    ])
    setContactsCountedByDate((_prev) => formattedData)
  }
  const handleGetCreditsUsedByDate = async () => {
    const res = await getTotalCreditsUsedByDate(
      formatDateToYYYYMMDD(dateValues[0])!,
      formatDateToYYYYMMDD(dateValues[1])!,
    )

    const formattedData = res.metaData.data.map((el: any) => [
      Date.parse(el.dateReport),
      Number(el.amountInCredits),
    ])

    setTotalCreditsUsedByDate((_prev) => formattedData)
  }

  useEffect(() => {
    // to make sure we have the date range
    if (dateValues[0] && dateValues[1]) {
      handleGetPropertiesCountedByDate()
      handleGetTotalAmountDepositedByDate()
      handleGetContactsCountedByDate()
      handleGetCreditsUsedByDate()
      handleGetPropertiesCountedByCategory()
      handleGetPropertiesCountedByFeature()
    }
    // for reset purpose
    if (!dateValues[0] && !dateValues[1]) {
      setDateValues([new Date('2024-01-15'), new Date()])
    }
  }, [dateValues[1]])
  return (
    <>
      <Box pos="relative">
        <LoadingOverlay
          visible={isLoading === true ? true : false}
          zIndex={10}
          overlayProps={{ radius: 'lg', blur: 10 }}
          loaderProps={{ color: 'pink', type: 'bars' }}
          classNames={{
            loader: 'absolute top-20 ',
          }}
        />

        <div className="outer flex flex-col mt-7 gap-y-14 px-2 font-archivo">
          <div>
            <div className={style.coverPieChart}>
              <div className={style.featureChart}>
                <PieChart
                  title="Properties By Feature"
                  data={propertiesCountedByFeature}
                />
              </div>
              <div className={style.categoryChart}>
                <PieChart
                  title="Properties By Category"
                  data={propertiesCountedByCategory}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-10 gap-4 relative">
            <div className="col-span-7">
              <div className="flex flex-col gap-y-2">
                <h2 className="text-primary m-0 ">Property Created By Date</h2>
                <div className={style.countedByDate}>
                  <LineChart
                    data={propertiesCountedByDate}
                    title="Properties Created By Date"
                    seriesName="Number of Properties Created"
                    yAxisLabel="Properties"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-y-2 mt-6">
                <h2 className="text-primary m-0 ">Contacts Received By Date</h2>
                <div className={style.countedByDate}>
                  <LineChart
                    data={contactsCountedByDate}
                    title="Contacts Received By Date"
                    seriesName="Number of Contacts Received"
                    yAxisLabel="Contacts"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-y-2 mt-6">
                <h2 className="text-primary m-0">
                  Total Amount Deposited By Date
                </h2>
                <div className={style.countedByDate}>
                  <DoubleLineChart
                    title="Total Amount Deposited By Date In Credit and Dollar"
                    data1={totalAmountDepositedByDateInCredit}
                    data2={totalAmountDepositedByDateInDollar}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-y-2 mt-6">
                <h2 className="text-primary m-0 ">Credits Used By Date</h2>
                <div className={style.countedByDate}>
                  <LineChart
                    data={totalCreditsUsedByDate}
                    title="Credits Used By Date"
                    seriesName="Number of Credits Used"
                    yAxisLabel="Credits"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-3 min-h-[1600px] ">
              <div className="sticky top-[120px]">
                <DatePickerInput
                  className="shadow-md"
                  clearable={true}
                  allowSingleDateInRange={true}
                  leftSection={<IconCalendar color={primary} stroke={1.5} />}
                  rightSection={
                    <Tooltip label="Reset" className="bg-gray-800">
                      <IconHistory
                        color={primary}
                        stroke={1.5}
                        className=" cursor-pointer"
                        onClick={() =>
                          setDateValues([new Date('2024-01-15'), new Date()])
                        }
                      />
                    </Tooltip>
                  }
                  size="md"
                  classNames={{
                    day: style.day,
                    weekday: ' text-gray-600 font-bold',
                    label: 'text-primary',
                  }}
                  w={360}
                  type="range"
                  placeholder="Pick date range"
                  value={dateValues}
                  onChange={setDateValues}
                />
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  )
}

export default AdminReportPage
