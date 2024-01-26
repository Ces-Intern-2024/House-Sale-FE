import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { properties } from '../../utils/properties'
import PropertyCard from '../Properties/PropertyCard'
import styles from './MultiCarousel.module.scss'

export default function MultiCarousel() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 6000, min: 2300 },
      items: 5,
    },
    largeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 2300, min: 1401 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1400, min: 1000 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 999, min: 501 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
    },
  }
  return (
    <>
      <div className={styles.outer}>
        <h1 className={styles.title}>FEATURED</h1>
        <span className={styles.underline}></span>
        <Carousel responsive={responsive} autoPlay={true} infinite={true}>
          {properties.map((el, index) => {
            return (
              <div className={styles.carouselItem} key={index}>
                <PropertyCard key={el.propertyId} data={el} />
              </div>
            )
          })}
        </Carousel>
      </div>
    </>
  )
}
