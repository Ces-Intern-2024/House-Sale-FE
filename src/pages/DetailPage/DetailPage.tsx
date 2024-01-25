<<<<<<< HEAD
import MultiCarousel from '../../components/MultiCarousel/MuitiCarousel'
import DetailsImageList from '../../components/DetailsImageList/DetailsImageList'
import React from 'react'
import Map from '../../components/Map/Map'

=======
import React from 'react'
import MultiCarousel from '../../components/MultiCarousel/MuitiCarousel'
import DetailsImageList from '../../components/DetailsImageList/DetailsImageList'
import Map from '../../components/Map/Map'
import ContactUs from '../../components/ContactUs/ContactUs'
import DetailsProperty from '../../components/DetailsProperty/DetailsProperty'
import style from './DetailPage.module.scss'
>>>>>>> 4358ab6 (feat: contact us component)
export default function DetailPage() {
  return (
    <>
      <DetailsImageList />
<<<<<<< HEAD
      <MultiCarousel />
      <Map />
=======
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
>>>>>>> 4358ab6 (feat: contact us component)
    </>
  )
}
