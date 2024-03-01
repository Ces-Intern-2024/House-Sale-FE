import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import PropertyCard from '../Properties/PropertyCard'
import styles from './MultiCarousel.module.scss'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { Properties } from '../../types'
import { searchProperty } from '../../service/SearchService'
import { Link } from 'react-router-dom'

interface MultiCarouselProps {
  property: Properties
}
export default function MultiCarousel({ property }: MultiCarouselProps) {
  const [properties, setProperties] = useState<Properties[]>([])

  const handleGetProperties = async () => {
    if (property) {
      const data = await searchProperty(
        {
          featureId: property?.feature.featureId,
          orderBy: 'createdAt',
          sortBy: 'desc',
        },
        true,
      )
      const filteredProperties = data.data.filter(
        (item: Properties) => item.propertyId !== property.propertyId,
      )
      setProperties(filteredProperties)
    }
  }

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
  useEffect(() => {
    handleGetProperties()
  }, [property])
  return (
    <>
      <div className={styles.outer}>
        <h1 className={styles.title}>RELEVANT</h1>

        <span className={styles.underline}></span>

        {properties.length > 0 && (
          <Carousel
            arrows={true}
            responsive={responsive}
            autoPlay={true}
            infinite={true}
            customLeftArrow={
              <IconChevronLeft color="black" className={styles.leftArrow} />
            }
            customRightArrow={
              <IconChevronRight color="black" className={styles.rightArrow} />
            }
          >
            {properties.map((propertyItem, index) => (
              <div key={index} className="py-3">
                <div className={styles.carouselItem}>
                  <Link
                    to={`/details/${propertyItem.propertyId}`}
                    key={propertyItem.propertyId}
                  >
                    <PropertyCard
                      key={propertyItem.propertyId}
                      data={propertyItem}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </>
  )
}
