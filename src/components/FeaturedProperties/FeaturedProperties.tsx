import React, { ReactNode, useEffect, useState } from 'react'
import { Properties } from '@/types'
import PropertyCard from '../Properties/PropertyCard'
import style from './styles.module.scss'
import { Button } from '@mantine/core'
import { FEATURED_FOR_RENT } from '../../constants/category.constant'

type Props = {
  title?: string
  properties: Properties[]
  filter?: string | number
  children?: ReactNode
}
const FeaturedProperties = ({ title, properties, children }: Props) => {
  const quantity = 4
  const [visibleProperty, setVisibleProperty] = useState<number>(quantity)
  const [propertiesToShow, setPropertiesToShow] = useState<Properties[]>([])

  useEffect(() => {
    const initList = properties.slice(0, visibleProperty)
    setPropertiesToShow(initList)
  }, [properties, visibleProperty])

  const handleViewMore = () => {
    setVisibleProperty((prevCount) => prevCount + quantity)
  }

  return (
    <div className={style.featuredContainer}>
      <div className={style.featuredTitle}>{title}</div>
      <span className={style.featuredLineBreak}></span>
      <div className={style.featuredContent}>
        {propertiesToShow.length > 0 ? (
          propertiesToShow.map((property) => {
            return <PropertyCard key={property.propertyId} data={property} />
          })
        ) : (
          <p>No featured properties available.</p>
        )}
      </div>
      {children}

      <div className={style.buttonContainer}>
        {visibleProperty === propertiesToShow.length && (
          <Button
            classNames={{ root: title === FEATURED_FOR_RENT ? style.rootButtonRent : style.rootButtonSale }}
            variant="filled"
            onClick={handleViewMore}
          >
            View more
          </Button>
        )}
      </div>
    </div>
  )
}

export default FeaturedProperties
