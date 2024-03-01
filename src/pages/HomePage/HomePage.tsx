import React, { useEffect } from 'react'
import Container from '../../components/Container/Container'
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties'
import BannerValue from '../../components/BannerValue/BannerValue'
import BannerWelcome from '../../components/BannerWelcome/BannerWelcome'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import {
  getAllPropertiesForSale,
  getAllPropertiesForRent,
} from '../../redux/reducers/homeReducer'
import { Properties } from '@/types'
import SlideShow from '../../components/Slideshow/SlideShow'
import { getAllWishList } from '../../redux/reducers/propertySlice'

const HomePage = () => {
  const salesList: Properties[] = useAppSelector(
    (state) => state.home.propertiesListForSale,
  )
  const rentsList: Properties[] = useAppSelector(
    (state) => state.home.propertiesListForRent,
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
  }, [])
  
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

        <BannerWelcome />
      </Container>
    </div>
  )
}

export default HomePage
