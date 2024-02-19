import { Image } from '@mantine/core'
import React from 'react'
import banner from '../../assets/images/BannerWelcomeImage3.png'
import style from './BannerWelcome.module.scss'
const BannerWelcome = () => {
  return (
    <div className={style.bannerWelcomeContainer}>
      <div className={style.bannerWelcomeContent}>
        <div className={style.bannerWelcomeText}>
          <h4 className={style.bannerTitle}>Your Satisfaction</h4>
          <h2 className={style.bannerSubTitle}>LUXURY</h2>
          <h1 className={style.bannerTitle}>House</h1>
          <p className={style.bannerDescription}>
            Determined to uphold the highest standards, our seasoned team of
            experts stands prepared to deliver individualized support and expert
            guidance.
          </p>
        </div>
        <div className={style.bannerWelcomeText}>
          <Image
            src={banner}
            className={style.bannerWelcomeImage}
            alt="building"
          />
        </div>
      </div>
    </div>
  )
}

export default BannerWelcome
