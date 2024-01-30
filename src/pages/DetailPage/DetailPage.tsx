import React from 'react'
import MultiCarousel from '../../components/MultiCarousel/MuitiCarousel'
import DetailsImageList from '../../components/DetailsImageList/DetailsImageList'
import Map from '../../components/Map/Map'
import ContactUs from '../../components/ContactUs/ContactUs'
import DetailsProperty from '../../components/DetailsProperty/DetailsProperty'
import style from './DetailPage.module.scss'
import { Anchor, Breadcrumbs } from '@mantine/core'
export default function DetailPage() {
  const paths = [
    { title: 'Home', href: '#' },
    { title: 'Details', href: '#' },
    { title: 'Apartment', href: '#' },
  ].map((path, index) => (
    <Anchor href={path.href} key={index}>
      {path.title}
    </Anchor>
  ))

  return (
    <>
      <div className={style.outer}>
        <Breadcrumbs my="md">{paths}</Breadcrumbs>
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
      </div>
    </>
  )
}
