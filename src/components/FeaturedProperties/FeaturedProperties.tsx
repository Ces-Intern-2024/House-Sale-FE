import React, { ReactNode, useEffect, useState } from 'react'
import { Properties } from '@/types'
import PropertyCard from '../Properties/PropertyCard'
import style from './styles.module.scss'
import { Button } from '@mantine/core'

type Props = {
  title?: string
  properties: Properties[]
  filter?: string | number
  children?: ReactNode
}
const FeaturedProperties = ({ title, properties, filter, children }: Props) => {
  // console.log(properties);

  const quantity = 3
  const [visibleProperty, setVisibleProperty] = useState<number>(quantity)
  const [propertiesToShow, setPropertiesToShow] = useState<Properties[]>([])
  const [filteredList, setFilteredList] = useState<Properties[]>([])

  const filterFeatured = () => {
    return properties.filter((element) => element.featuredId === `${filter}`)
  }

  useEffect(() => {
    const listTemp = filterFeatured()
    setFilteredList(listTemp)
  }, [properties, filter]) // Add dependencies to the useEffect dependency array

  useEffect(() => {
    const initList = filteredList.slice(0, visibleProperty)
    setPropertiesToShow(initList)
  }, [filteredList, visibleProperty]) // Add dependencies to the useEffect dependency array

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
        <Button
          className="text-center mt-[20px]"
          classNames={{ root: style.rootButton }}
          variant="filled"
          onClick={handleViewMore}
        >
          View more
        </Button>
      </div>
    </div>
  )
}

export default FeaturedProperties
