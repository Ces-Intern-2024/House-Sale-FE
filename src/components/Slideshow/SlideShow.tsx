import React from 'react'
import { Carousel } from '@mantine/carousel'
import { Image } from '@mantine/core'
import { useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import styles from './SlideShow.module.scss'

export default function SlideShow() {
  const autoplay = useRef(Autoplay({ delay: 3000 }))
  const images = [
    'https://www.riccicoproperty.vn/themes/ricci/images/3-min.png',
    'https://www.riccicoproperty.vn/themes/ricci/images/6-min.png',
    'https://www.riccicoproperty.vn/themes/ricci/images/9-min.png',
    'https://www.riccicoproperty.vn/themes/ricci/images/10-min.png',
    'https://www.riccicoproperty.vn/themes/ricci/images/house_wide_view-min.jpg',
  ]

  const slides = images.map((url) => {
    return (
      <Carousel.Slide key={url} classNames={{ slide: styles.slide }}>
        <Image className={styles.slideImage} src={url} />
      </Carousel.Slide>
    )
  })
  return (
    <>
      <div className={styles.outer}>
        <Carousel
          classNames={{
            indicator: styles.indicator,
            controls: styles.controls,
          }}
          withIndicators
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          loop
          dragFree
          height="100%"
          className={styles.carousel}
        >
          {slides}
        </Carousel>

        <div className={styles.overlay}>
          <h1 className={styles.largeText}>Find the perfect home</h1>
          <h1 className={styles.smallText}>Your dreams are in trusted hands</h1>
        </div>
      </div>
    </>
  )
}
