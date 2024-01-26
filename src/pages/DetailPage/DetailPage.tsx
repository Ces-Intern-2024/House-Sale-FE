import MultiCarousel from '../../components/MultiCarousel/MuitiCarousel'
import DetailsImageList from '../../components/DetailsImageList/DetailsImageList'
import React from 'react'
import Map from '../../components/Map/Map'

export default function DetailPage() {
  return (
    <>
      <DetailsImageList />
      <MultiCarousel />
      <Map />
    </>
  )
}
