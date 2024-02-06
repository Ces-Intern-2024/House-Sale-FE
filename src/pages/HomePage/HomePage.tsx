import React, { useEffect } from 'react'
import { properties } from '../../utils/properties'
import Container from '../../components/Container/Container'
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties'
import BannerValue from '../../components/BannerValue/BannerValue'
import BannerWelcome from '../../components/BannerWelcome/BannerWelcome'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import {
  getAllPropertiesForSale,
  getAllPropertiesForRent,
} from '../../redux/reducers/homeReducer'
import { Properties } from '@/types'
import SlideShow from '../../components/Slideshow/SlideShow'

const HomePage = () => {
  const salesList: Properties[] = useAppSelector(
    (state: RootState) => state.home.propertiesListForSale,
  )
  const rentsList: Properties[] = useAppSelector(
    (state: RootState) => state.home.propertiesListForRent,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    const promise = dispatch(getAllPropertiesForSale())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  useEffect(() => {
    const promise = dispatch(getAllPropertiesForRent())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  console.log('SALE LIST:', salesList)
  console.log('RENT LIST:', rentsList)

  return (
    <div>
      <Container>
        <SlideShow />
        <FeaturedProperties
          properties={properties}
          title="FEATURED FOR RENT"
          filter="rent"
        ></FeaturedProperties>

        <BannerValue />

        <FeaturedProperties
          properties={properties}
          title="FEATURED FOR SALE"
          filter="sale"
        ></FeaturedProperties>
        <BannerWelcome />
      </Container>
    </div>
  )
}

export default HomePage
