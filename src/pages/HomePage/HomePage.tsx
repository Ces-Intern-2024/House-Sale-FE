import React, { useEffect } from 'react'
import Container from '../../components/Container/Container'
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties'
import BannerValue from '../../components/BannerValue/BannerValue'
import BannerWelcome from '../../components/BannerWelcome/BannerWelcome'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import {
  getAllPropertiesForSale,
  getAllPropertiesForRent,
} from '../../redux/reducers/homeSlice'
import { Properties } from '@/types'
import SlideShow from '../../components/Slideshow/SlideShow'
import MultiCarousel from '../../components/MultiCarousel/MultiCarousel'
import style from './HomePage.module.scss'
import { getAllWishList } from '../../redux/reducers/propertySlice'

const HomePage = () => {
  const salesList: Properties[] = useAppSelector(
    (state) => state.home.propertiesListForSale,
  )
  const rentsList: Properties[] = useAppSelector(
    (state) => state.home.propertiesListForRent,
  )

  const wishList: Properties[] = useAppSelector(
    (state) => state.property.listFavorites,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllPropertiesForSale())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllPropertiesForRent())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllWishList())
  }, [dispatch])

  return (
    <div>
      <Container>
        <SlideShow />
        {rentsList && (
          <FeaturedProperties
            properties={rentsList}
            title="FEATURED FOR RENT"
          ></FeaturedProperties>
        )}

        <BannerValue />

        {salesList && (
          <FeaturedProperties
            properties={salesList}
            title="FEATURED FOR SALE"
          ></FeaturedProperties>
        )}

        <div className={style.coverWishList}>
          {wishList?.length > 0 && (
            <MultiCarousel properties={wishList} title="YOUR WISHLIST" />
          )}
        </div>

        <BannerWelcome />
      </Container>
    </div>
  )
}

export default HomePage
