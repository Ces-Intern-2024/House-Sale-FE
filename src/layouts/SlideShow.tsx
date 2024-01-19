import React from 'react'
import { Carousel } from '@mantine/carousel'
import { Image } from '@mantine/core'

import Header from './Header'
import MenuBar from './MenuBar'
import { useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'

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
      <Carousel.Slide key={url}>
        <Image src={url} />
      </Carousel.Slide>
    )
  })
  return (
    <>
      <div className="relative">
        <div
          style={{
            position: 'fixed',
            zIndex: '10',
            top: '0px',
            backgroundColor: '#fff',
            left: '0',
            right: '0',
          }}
        >
          <MenuBar />
          <Header />
        </div>
        
      </div>

      <div className="relative">
        <Carousel
          className="indicator"
          withIndicators
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          loop
          dragFree
          height={700}
        >
          {slides}
        </Carousel>

        <div
          style={{
            height: '677px',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1 className=" text-white font-bold" style={{ fontSize: '4rem' }}>
            Find the perfect home
          </h1>
          <h1 className=" text-white font-bold">
            Your dreams are in trusted hands
          </h1>
        </div>
      </div>
    </>
  )
}
