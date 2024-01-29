import React from 'react'
import { properties } from '../../utils/properties'
import SlideShow from '../../components/Slideshow/SlideShow'
import Container from '../../components/Container/Container'
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties'
import BannerValue from '../../components/BannerValue/BannerValue'
import BannerWelcome from '../../components/BannerWelcome/BannerWelcome'
import Button from '../../components/CustomButton/ButtonCustom'
import style from './HomePage.module.scss'
const HomePage = () => {
  return (
    <div>
      <SlideShow />
      <Container>
        <FeaturedProperties
          properties={properties}
          title="FEATURED FOR RENT"
          filter="rent"
        >
          <div className={style.buttonContainer}>
            <Button
              className="text-center mt-[20px]"
              variant="filled"
              text="View more"
            />
          </div>
        </FeaturedProperties>

        <BannerValue />

        <FeaturedProperties
          properties={properties}
          title="FEATURED FOR SALE"
          filter="sale"
        >
          <div className={style.buttonContainer}>
            <Button
              className="text-center mt-[20px]"
              variant="filled"
              text="View more"
            />
          </div>
        </FeaturedProperties>
        <BannerWelcome />
      </Container>
    </div>
  )
}

export default HomePage
