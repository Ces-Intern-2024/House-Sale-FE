import React, { ReactNode } from 'react'
import { Properties } from '@/types'
import PropertyCard from '../Properties/PropertyCard'
import style from './styles.module.scss'
type Props = {
  title?: string
  properties: Properties[]
  filter?: string | number
  quantity?: number
  children?: ReactNode
}
const FeaturedProperties = ({ title, properties, filter, children }: Props) => {
  return (
    <div className={style.featuredContainer}>
      <div className={style.featuredTitle}>{title}</div>
      <span className={style.featuredLineBreak}></span>
      <div className={style.featuredContent}>
        {properties.length > 0 ? (
          properties
            .filter((element) => element.featuredId === `${filter}`)
            .map((property) => {
              return <PropertyCard key={property.propertyId} data={property} />
            })
        ) : (
          <p>No featured properties available.</p>
        )}
      </div>
      {children}
    </div>
  )
}

export default FeaturedProperties
