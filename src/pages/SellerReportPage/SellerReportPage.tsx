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
  getTotalCreditsUsedByDate,
} from '../../service/SellerService'
import DoubleLineChart from '../../components/Charts/DoubleLineChart'
import BarChart from '../../components/Charts/BarChart'
import ProgressCard from '../../components/ProgressCard/ProgressCard'

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

  const handleGetPropertiesCountedByFeature = async () => {
    const data = await getPropertiesCountedByFeature()
    const formattedData = data.metaData.flatMap((property: any) => [
      {
        name: property.name,
        y: Number(property.count),
        inNumber: property.count,
      },
    ])
    setPropertiesCountedByFeature((_prev) => formattedData)
  }

  const handleGetPropertiesCountedByCategory = async () => {
    const data = await getPropertiesCountedByCategory()
    const formattedData = data.metaData.flatMap((property: any) => [
      {
        name: property.name,
        y: Number(property.count),
        inNumber: property.count,
      },
    ])
    setPropertiesCountedByCategory((_prev) => formattedData)
  }

  const handleGetPropertiesCountedByDate = async () => {
    const res = await getPropertiesCountedByDate(
      '2024-01-20',
      new Date().toJSON().slice(0, 10),
    )
    const formattedData = res.metaData.data.map((el: any) => [
      Date.parse(el.dateReport),
      el.count,
    ])
    setPropertiesCountedByDate((_prev) => formattedData)
  }

  const handleGetTotalAmountDepositedByDate = async () => {
    const res = await getTotalAmountDepositedByDate(
      '2024-01-20',
      new Date().toJSON().slice(0, 10),
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
      '2024-01-20',
      new Date().toJSON().slice(0, 10),
    )
    const formattedData = res.metaData.data.map((el: any) => [
      Date.parse(el.dateReport),
      el.count,
    ])
    setContactsCountedByDate((_prev) => formattedData)
  }
  const handleGetCreditsUsedByDate = async () => {
    const res = await getTotalCreditsUsedByDate(
      '2024-01-20',
      new Date().toJSON().slice(0, 10),
    )

    const formattedData = res.metaData.data.map((el: any) => [
      Date.parse(el.dateReport),
      Number(el.amountInCredits),
    ])

    setTotalCreditsUsedByDate((_prev) => formattedData)
    setTotalCreditsUsed(res.metaData.totalAmountInCredits)
  }

  const handleGetTotalAmountDeposited = async () => {
    const res = await getTotalAmountDeposited()
    setTotalCreditsDeposited(res.metaData.totalAmountInCredits)
  }

  useEffect(() => {
    handleGetPropertiesCountedByFeature()
    handleGetPropertiesCountedByCategory()
    handleGetPropertiesCountedByDate()
    handleGetTotalAmountDepositedByDate()
    handleGetContactsCountedByDate()
    handleGetCreditsUsedByDate()
    handleGetTotalAmountDeposited()
  }, [])
  return (
    <>
      <div className="outer flex flex-col gap-y-5 px-2">
        <div>
          <h1 className="text-primary text-center">Total Properties</h1>
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
        <div>
          <h1 className="text-primary mb-0 text-center">
            Property Created By Date
          </h1>
          <div>
            <LineChart
              data={propertiesCountedByDate}
              title="Properties Created By Date"
              seriesName="Number of Properties Created"
              yAxisLabel="Properties"
            />
          </div>
        </div>
        <div>
          <h1 className="text-primary mb-0 text-center">
            Contacts Received By Date
          </h1>
          <div className="m-0 p-0">
            <LineChart
              data={contactsCountedByDate}
              title="Contacts Received By Date"
              seriesName="Number of Contacts Received"
              yAxisLabel="Contacts"
            />
          </div>
        </div>

        <div>
          <h1 className="text-primary text-center">
            Total Amount Deposited By Date
          </h1>
          <DoubleLineChart
            title="Total Amount Deposited By Date In Credit and Dollar"
            data1={totalAmountDepositedByDateInCredit}
            data2={totalAmountDepositedByDateInDollar}
          />
        </div>
        <div>
          <h1 className="text-primary mb-0 text-center">
            Credits Used By Date
          </h1>
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
      <div>
        <BarChart
          title="Credit Amount Deposited, Used, and Remaining"
          depositedCredits={totalCreditsDeposited}
          usedCredits={totalCreditsUsed}
          remainingCredits={totalCreditsDeposited - totalCreditsUsed}
        />
      </div>
      <div>
        
        <ProgressCard />
      </div>
    </>
  )
}

export default SellerReportPage
