import PieChart from '../../components/Charts/PieChart'
import LineChart from '../../components/Charts/LineChart'
import React, { useEffect, useState } from 'react'
import {
  getContactsCountedByDate,
  getPropertiesCountedByCategory,
  getPropertiesCountedByDate,
  getPropertiesCountedByFeature,
  getTotalAmountDeposited,
  getTotalAmountDepositedByDate,
  getTotalCreditsUsed,
  getTotalCreditsUsedByDate,
} from '../../service/SellerService'
import DoubleLineChart from '../../components/Charts/DoubleLineChart'
import BalanceViewer from '../../components/ProgressCard/BalanceViewer'
import {
  IconCalendar,
  IconCreditCardPay,
  IconCreditCardRefund,
  IconHistory,
  // IconCreditCard,
} from '@tabler/icons-react'
import { useAppSelector } from '../../redux/hooks'
import { DatePickerInput } from '@mantine/dates'
import { primary } from '../../constants/color.constant'
import style from './SellerReportPage.module.scss'
import { formatDateToYYYYMMDD } from '../../utils/commonFunctions'
import { Box, LoadingOverlay, Tooltip } from '@mantine/core'

function SellerReportPage() {
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
  const [totalCreditsDeposited, setTotalCreditsDeposited] = useState(0)
  const [totalCreditsUsed, setTotalCreditsUsed] = useState(0)
  const user = useAppSelector((state) => state.user)
  const [dateValues, setDateValues] = useState<[Date | null, Date | null]>([
    new Date(String(user.createdAt)),
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

  const handleGetTotalAmountDeposited = async () => {
    const res = await getTotalAmountDeposited()
    setTotalCreditsDeposited(res.metaData.totalAmountInCredits)
  }

  const handleGetTotalCreditsUsed = async () => {
    const res = await getTotalCreditsUsed()
    setTotalCreditsUsed(res.metaData)
  }

  useEffect(() => {
    // to make sure we have the date range
    if (dateValues[0] && dateValues[1]) {
      handleGetPropertiesCountedByDate()
      handleGetTotalAmountDepositedByDate()
      handleGetContactsCountedByDate()
      handleGetCreditsUsedByDate()
      handleGetTotalAmountDeposited()
      handleGetTotalCreditsUsed()
      handleGetPropertiesCountedByCategory()
      handleGetPropertiesCountedByFeature()
    }
    // for reset purpose
    if (!dateValues[0] && !dateValues[1]) {
      setDateValues([new Date(String(user.createdAt)), new Date()])
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
          <div className="flex flex-col gap-y-2">
            <h1 className="text-primary m-0">Overview</h1>
            <div className="flex justify-between items-center m-0 gap-x-20">
              <div className="flex m-0 gap-x-10">
                <BalanceViewer
                  balance={totalCreditsDeposited}
                  sign="+"
                  background="#66d9e880"
                  icon={<IconCreditCardRefund size={40} />}
                  title="Total Credits In"
                />
                <BalanceViewer
                  balance={totalCreditsUsed}
                  sign="-"
                  background="rgba(255, 173, 194, 0.38)"
                  icon={<IconCreditCardPay size={40} />}
                  title="Total Credits Out"
                />
              </div>

              <div>
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
                          setDateValues([
                            new Date(String(user.createdAt)),
                            new Date(),
                          ])
                        }
                      />
                    </Tooltip>
                  }
                  size="md"
                  classNames={{
                    day: style.day,
                    weekday: ' text-gray-600 font-bold',
                    input: ' outline-[#8ac987] outline',
                    label: 'text-primary',
                  }}
                  w={360}
                  type="range"
                  label="Pick date range"
                  placeholder="Pick date range"
                  value={dateValues}
                  onChange={setDateValues}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <h1 className="text-primary  m-0">Total Properties</h1>
            <div className="flex justify-between gap-x-3">
              <PieChart
                title="Properties By Feature"
                data={propertiesCountedByFeature}
              />

              <PieChart
                title="Properties By Category"
                data={propertiesCountedByCategory}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <h1 className="text-primary m-0 ">Property Created By Date</h1>
            <div>
              <LineChart
                data={propertiesCountedByDate}
                title="Properties Created By Date"
                seriesName="Number of Properties Created"
                yAxisLabel="Properties"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <h1 className="text-primary m-0 ">Contacts Received By Date</h1>
            <div className="m-0 p-0">
              <LineChart
                data={contactsCountedByDate}
                title="Contacts Received By Date"
                seriesName="Number of Contacts Received"
                yAxisLabel="Contacts"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <h1 className="text-primary m-0">Total Amount Deposited By Date</h1>
            <DoubleLineChart
              title="Total Amount Deposited By Date In Credit and Dollar"
              data1={totalAmountDepositedByDateInCredit}
              data2={totalAmountDepositedByDateInDollar}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <h1 className="text-primary m-0 ">Credits Used By Date</h1>
            <div className="m-0 p-0">
              <LineChart
                data={totalCreditsUsedByDate}
                title="Credits Used By Date"
                seriesName="Number of Credits Used"
                yAxisLabel="Credits"
              />
            </div>
          </div>
        </div>
      </Box>
    </>
  )
}

export default SellerReportPage
