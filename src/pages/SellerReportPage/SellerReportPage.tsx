import PieChart from '../../components/Charts/PieChart'
import LineChart from '../../components/Charts/LineChart'
import React, { useEffect, useState } from 'react'
import {
  getPropertiesCountedByCategory,
  getPropertiesCountedByDate,
  getPropertiesCountedByFeature,
} from '../../service/SellerService'

function SellerReportPage() {
  const [propertiesCountedByFeature, setPropertiesCountedByFeature] = useState<
    []
  >([])
  const [propertiesCountedByCategory, setPropertiesCountedByCategory] =
    useState<[]>([])
  const [propertiesCountedByDate, setPropertiesCountedByDate] = useState<[]>([])
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

  useEffect(() => {
    handleGetPropertiesCountedByFeature()
    handleGetPropertiesCountedByCategory()
    handleGetPropertiesCountedByDate()
  }, [])
  return (
    <div>
      <div>
        <div>
          <h1>Total Properties</h1>
          <div className="flex justify-between mt-5">
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
          <h1>Property created by date</h1>
          <div>
            <LineChart
              data={propertiesCountedByDate}
              title="Properties Created By Date"
            />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default SellerReportPage
