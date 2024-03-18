import React, { useState } from 'react'
import { FaLocationDot, FaRegHeart } from 'react-icons/fa6'
import { Properties as PropertiesType } from '@/types'
import style from './styles.module.scss'
import { axiosInstance } from '../../service/AxiosInstance'
import { FaHeart } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getAllWishList } from '../../redux/reducers/propertySlice'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { Button } from '@mantine/core'
import { formatMoneyToUSD } from '../../utils/commonFunctions'
import area from '../../assets/images/area.png'
import bedroom from '../../assets/images/bed.png'
import floor from '../../assets/images/stair.png'

interface Props {
  data: PropertiesType
}

const Properties = ({ data }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const loggedIn = useAppSelector((state) => state.session.signedIn)

  const wishList: PropertiesType[] = useAppSelector(
    (state) => state.property.listFavorites,
  )
  const dispatch = useAppDispatch()

  const handleAddToWishlist = async (propertyId: number) => {
    try {
      setIsLoading(true)
      await axiosInstance.post(`/favorites-list`, { propertyId })
      await dispatch(getAllWishList())
    } catch (error: any) {
      Swal.fire({
        icon: 'warning',
        title: 'You need to login first!',
        showConfirmButton: false,
        timer: 1400,
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className={style.propertyContainer}>
      <div className={style.propertyContent}>
        <div
          className={`${style.propertyFeatured} ${data.feature.featureId === 1 ? 'bg-darkBlue' : 'bg-emerald-700'}`}
        >
          {data.feature.name}
        </div>
        <div className={style.propertyCoverImage}>
          <Link to={`/details/${data.propertyId}`} key={data.propertyId}>
            {data.images.length > 0 ? (
              <img
                className={style.propertyImage}
                src={data.images[0].imageUrl}
                alt={data.name}
              />
            ) : (
              <img className={style.propertyImage} alt={data.name} />
            )}
          </Link>
        </div>
        <div className="w-full">
          <div className={style.propertyName}>
            <Link
              to={`/details/${data.propertyId}`}
              key={data.propertyId}
              className={style.propertyName}
            >
              {data.name}
            </Link>
          </div>
          <div className={style.propertyLocation}>
            <span className={style.propertyCoverIcon}>
              <FaLocationDot className={style.propertyIcon} size={16} />
              {data.location.address}
            </span>
            {/* This comment has been kept as a temporary if there are any errors.
            {user !== null ? (
              wishList.filter(
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
              )
            ) : (
              <span
                className={style.heartCoverIcon}
                onClick={() => handleAddToWishlist(data.propertyId)}
              >
                <FaRegHeart size={24} />
              </span>
            )} */}
            {loggedIn &&
            wishList &&
            wishList.find(
              (property: PropertiesType) =>
                property.propertyId === data.propertyId,
            ) ? (
              <Button
                loading={isLoading}
                className={style.heartIsAdded}
                onClick={() => handleAddToWishlist(data.propertyId)}
              >
                <FaHeart size={24} />
              </Button>
            ) : (
              <Button
                loading={isLoading}
                className={style.heartIsAdded}
                onClick={() => handleAddToWishlist(data.propertyId)}
              >
                <FaRegHeart size={24} />
              </Button>
            )}
          </div>

          {data.feature.name === 'Rent' ? (
            <div className={style.propertyPrice}>
              {formatMoneyToUSD(data.price)} {data.currencyCode}/month
            </div>
          ) : (
            <div className={style.propertyPrice}>
              {formatMoneyToUSD(data.price)} {data.currencyCode}
            </div>
          )}
          <div className={style.propertyDescription}>
            <span className={style.propertyDesIcon}>
              <img src={area} className="w-4 h-auto mr-2" />
              {data.landArea} m²
            </span>
            <span className={style.propertyDesIcon}>
              <img src={bedroom} className="w-5 h-auto mr-2" />
              {data.numberOfBedRoom}
            </span>
            <span className={style.propertyDesIcon}>
            <img src={floor} className="w-5 h-auto mr-2" />

              {data.numberOfFloor}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Properties
