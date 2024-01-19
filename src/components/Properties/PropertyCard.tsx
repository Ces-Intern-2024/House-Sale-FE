import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { MdOutlineZoomOutMap } from 'react-icons/md'
import { IoBedOutline } from 'react-icons/io5'
import { GrSteps } from 'react-icons/gr'
import { Properties as PropertiesType } from '@/types'
import { FaRegHeart } from 'react-icons/fa6'
import style from './styles.module.scss'

type Props = {
  data: PropertiesType
}

const Properties = ({ data }: Props) => {
  return (
    <div className={style.propertyContainer}>
      <div className={style.propertyContent}>
        <div className={style.propertyFeatured}>{data.featuredId}</div>
        <div className={style.propertyCoverImage}>
          <img
            className={style.propertyImage}
            src={data.images}
            alt={data.name}
          />
        </div>
        <div className="w-full">
          <div className={style.propertyName}>{data.name}</div>
          <div className={style.propertyLocation}>
            <span className={style.propertyCoverIcon}>
              <FaLocationDot className={style.propertyIcon} size={16} />
              {data.location}
            </span>
            <span>
              <FaRegHeart size={16} />
            </span>
          </div>
          <div className={style.propertyPrice}>
            {data.price} {data.currencyCode}
          </div>
          <div className={style.propertyDescription}>
            <span className={style.propertyDesIcon}>
              <MdOutlineZoomOutMap className="mr-[8px]" size={16} />
              {data.landArea}
            </span>
            <span className={style.propertyDesIcon}>
              <IoBedOutline className="mr-[8px]" size={16} />
              {data.numberOfBedroom}
            </span>
            <span className={style.propertyDesIcon}>
              <GrSteps className="mr-[8px]" size={16} />
              {data.numberOfFloor}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Properties
