import React from 'react'
import { properties } from '../../utils/properties'
import SlideShow from '../../components/Slideshow/SlideShow'
import Container from '../../components/Container/Container'
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties'
// import Button from '../../components/Button/ButtonCustom'
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
        {/* <Button
          color="black"
          className="text-center mt-[20px]"
          variant="filled"
          text="View more"
        /> */}
        <BannerValue/>
        <FeaturedProperties
          properties={properties}
          title="FEATURED FOR SALE"
          filter="sale"
        ></FeaturedProperties>
        {/* <Button
          className="text-center mt-[20px]"
          color="black"
          variant="filled"
          text="View more"
        /> */}
        <BannerWelcome/>
      </Container>
    </div>
  )
}

export default HomePage
