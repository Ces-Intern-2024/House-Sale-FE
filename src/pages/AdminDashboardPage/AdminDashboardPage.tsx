import PieChart from '../../components/Charts/PieChart'
import LineChart from '../../components/Charts/LineChart'
import React, { useEffect, useState } from 'react'
import {
  countPropertiesCreated,
  getPropertiesCountedByCategory,
  getPropertiesCountedByFeature,
} from '../../service/AdminService'
import ProgressCard from '../../components/ProgressCard/ProgressCard'

function AdminDashboardPage() {
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
        y: property.count,
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
        y: property.count,
        inNumber: property.count,
      },
    ])
    setPropertiesCountedByCategory((_prev) => formattedData)
  }

  const getAmountOfPropertyCreated = async () => {
    const res = await countPropertiesCreated(
      '2024-01-20',
      new Date().toJSON().slice(0, 10),
    )
    const formattedData = res.data.metaData.data.map((a: any) => [
      Date.parse(a.dateReport),
      a.count,
    ])
    setPropertiesCountedByDate((_prev) => formattedData)
  }

  useEffect(() => {
    handleGetPropertiesCountedByFeature()
    handleGetPropertiesCountedByCategory()
    getAmountOfPropertyCreated()
  }, [])
  return (
    <div>
      <div>
        <div>
          <ProgressCard />
          <h1>Total Properties</h1>
          <div className="flex justify-between mt-5">
            <div className="dat">
              <PieChart data={propertiesCountedByFeature} />
            </div>

            <PieChart data={propertiesCountedByCategory} />
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
      <div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
