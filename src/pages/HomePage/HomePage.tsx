import React from 'react'
import { properties } from '../../utils/properties'
import SlideShow from '../../components/Slideshow/SlideShow'
import Container from '../../components/Container/Container'
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties'
import BannerValue from '../../components/BannerValue/BannerValue'
import BannerWelcome from '../../components/BannerWelcome/BannerWelcome'
const HomePage = () => {
  return (
    <div>
      <SlideShow />
      <Container>
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
