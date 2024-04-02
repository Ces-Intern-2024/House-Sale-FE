import PieChart from '../../components/Charts/PieChart'
import LineChart from '../../components/Charts/LineChart'
import React, { useEffect, useState } from 'react'
import {
  countPropertiesCreated,
  getPropertiesCountedByCategory,
  getPropertiesCountedByFeature,
} from '../../service/AdminService'
import ProgressCard from '../../components/ProgressCard/ProgressCard'
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
} from '@vis.gl/react-google-maps'
import {
  REACT_APP_GOOGLE_MAP_ID_HOANG,
  REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY_HOANG,
} from '../../constants/google.constant'
import { TbBuildingWarehouse } from 'react-icons/tb'
import { Properties } from '@/types'
import { searchProperty } from '../../service/SearchService'

function AdminDashboardPage() {
  const [propertiesCountedByFeature, setPropertiesCountedByFeature] = useState<
    []
  >([])
  const [propertiesCountedByCategory, setPropertiesCountedByCategory] =
    useState<[]>([])
  const [propertiesCountedByDate, setPropertiesCountedByDate] = useState<[]>([])
  const [allLocations, setAllLocations] = useState<{ lat: number, lng: number }[]>([]);

  const handleGetAllLocations = async () => {
    const res = await searchProperty({}, true)
    const data = res.data
    const formattedData = data.map((property: Properties) => ({
      lat: Number(property.location.lat),
      lng: Number(property.location.lng),
    }))
    setAllLocations((_prev) => formattedData)
  }

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
    handleGetAllLocations()
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
        <h1>PROPERTY BY LOCATIONS</h1>
        <APIProvider apiKey={REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY_HOANG!}>
          <Map
            style={{ width: '70%', height: '500px' }}
            defaultCenter={allLocations[0]}
            defaultZoom={14}
            mapId={REACT_APP_GOOGLE_MAP_ID_HOANG!}
          >
            {allLocations.map((location: any, index: number) => (
              <AdvancedMarker key={index} position={location}>
                <Pin>
                  <TbBuildingWarehouse color="white" size={18} />
                </Pin>
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>
      </div>
    </div>
  )
}

export default AdminDashboardPage
