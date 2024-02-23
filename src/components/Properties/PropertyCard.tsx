import React, { useEffect, useState } from 'react'
import { FaLocationDot, FaRegHeart } from 'react-icons/fa6'
import { MdOutlineZoomOutMap } from 'react-icons/md'
import { IoBedOutline } from 'react-icons/io5'
import { GrSteps } from 'react-icons/gr'
import { Properties as PropertiesType } from '@/types'
import style from './styles.module.scss'
import { axiosInstance } from '../../service/AxiosInstance'
import { FaHeart } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getAllWishList } from '../../redux/reducers/propertySlice'

interface Props {
  data: PropertiesType
}

const Properties = ({ data }: Props) => {
  const [isAddedWishlist, setIsAddedWishlist] = useState(false)

  const wishList: PropertiesType[] = useAppSelector(
    (state) => state.property.listFavorites,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllWishList())
  }, [])

  const handleAddToWishlist = async (propertyId: number) => {
    const res = await axiosInstance.post(`/favorites-list`, { propertyId })
    setIsAddedWishlist(true)
    return res
  }

  return (
    <div className={style.propertyContainer}>
      <div className={style.propertyContent}>
        <div className={style.propertyFeatured}>{data.feature.name}</div>
        <div className={style.propertyCoverImage}>
          <a href="/">
            {data.images.length > 0 ? (
              <img
                className={style.propertyImage}
                src={data.images[0].imageUrl}
                alt={data.name}
              />
            ) : (
              <img className={style.propertyImage} alt={data.name} />
            )}
          </a>
        </div>
        <div className="w-full">
          <div className={style.propertyName}>
            <a className={style.propertyNameLink} href="/">
              {data.name}
            </a>
          </div>
          <div className={style.propertyLocation}>
            <span className={style.propertyCoverIcon}>
              <FaLocationDot className={style.propertyIcon} size={16} />
              {data.location.address}
            </span>
            {wishList.length > 0 &&
              (wishList.filter(
                (property: PropertiesType) =>
                  property.propertyId === data.propertyId,
              ).length > 0 ? (
                <span
                  className={style.heartIsAdded}
                  onClick={() => handleAddToWishlist(data.propertyId)}
                >
                  <FaHeart size={24} />
                </span>
              ) : isAddedWishlist ? (
                <span
                  className={style.heartIsAdded}
                  onClick={() => handleAddToWishlist(data.propertyId)}
                >
                  <FaHeart size={24} />
                </span>
              ) : (
                <span
                  className={style.heartCoverIcon}
                  onClick={() => handleAddToWishlist(data.propertyId)}
                >
                  <FaRegHeart size={24} />
                </span>
              ))}
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
              {data.numberOfBedRoom}
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
