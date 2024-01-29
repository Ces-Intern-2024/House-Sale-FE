import React from 'react'
import MultiCarousel from '../../components/MultiCarousel/MuitiCarousel'
import DetailsImageList from '../../components/DetailsImageList/DetailsImageList'
import Map from '../../components/Map/Map'
import ContactUs from '../../components/ContactUs/ContactUs'
import DetailsProperty from '../../components/DetailsProperty/DetailsProperty'
import style from './DetailPage.module.scss'
export default function DetailPage() {
  return (
    <>
      <DetailsImageList />
      <div className={style.container}>
        <div className={style.containerDesc}>
          <DetailsProperty />
          <Map />
        </div>
        <div className={style.containerContact}>
          <ContactUs />
        </div>
      </div>
      <MultiCarousel />
    </>
  )
}
