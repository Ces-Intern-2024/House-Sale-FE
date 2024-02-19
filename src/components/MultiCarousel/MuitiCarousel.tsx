import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { properties } from '../../utils/properties'
import PropertyCard from '../Properties/PropertyCard'
import styles from './MultiCarousel.module.scss'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

export default function MultiCarousel() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 6000, min: 2300 },
      items: 5,
    },
    largeDesktop: {
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
        <Carousel
          arrows={true}
          responsive={responsive}
          autoPlay={true}
          infinite={true}
          customLeftArrow={
            <IconChevronLeft
              color="black"
              className={styles.leftArrow}
            ></IconChevronLeft>
          }
          customRightArrow={
            <IconChevronRight
              color="black"
              className={styles.rightArrow}
            ></IconChevronRight>
          }
        >
          {properties.map((carouselItem, index) => {
            return (
              <div key={index} className="py-3">
                <div className={styles.carouselItem}>
                  <PropertyCard
                    key={carouselItem.propertyId}
                    data={carouselItem}
                  />
                </div>
              </div>
            )
          })}
        </Carousel>
      </div>
    </>
  )
}
