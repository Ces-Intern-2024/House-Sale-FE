import React, { useState } from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { Modal, Image } from '@mantine/core'
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel'
import styles from './DetailsImageList.module.scss'

export default function DetailsImageList() {
  const TRANSITION_DURATION = 200
  const [opened, setOpened] = useState(false)
  const [chosenImg, setChosenImg] = useState(0)
  const [embla, setEmbla] = useState<Embla | null>(null)
  useAnimationOffsetEffect(embla, TRANSITION_DURATION)
  const images = [
    'https://cf.bstatic.com/xdata/images/hotel/max1280x900/408497442.jpg?k=6a75124889b1f6ff86a883fba8c60ddb0f19fb88b53871394806b3617445f78a&o=&hp=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1280x900/408497433.jpg?k=80a0f8f8e9a47178985a70cf98f7ca260232f06e07489bc564b3875cb9c7895d&o=&hp=1',
    'https://www.riccicoproperty.vn/themes/ricci/images/9-min.png',
    'https://cf.bstatic.com/xdata/images/hotel/max1280x900/408497438.jpg?k=de7739e09eae2df6bd51044356ddbd5248ff557b6190edd1ea1c5db94f0454af&o=&hp=1',
    'https://www.bhg.com/thmb/dgy0b4w_W0oUJUxc7M4w3H4AyDo=/1866x0/filters:no_upscale():strip_icc()/living-room-gallery-shelves-l-shaped-couch-ELeyNpyyqpZ8hosOG3EG1X-b5a39646574544e8a75f2961332cd89a.jpg',
    'https://stay.greatworld.com.sg/wp-content/uploads/2022/08/serviced-apartments-singapore.jpg-scaled.jpg',
    'https://cf.bstatic.com/xdata/images/hotel/max1280x900/408497475.jpg?k=84462b5820873cc488d61325539865b43457f2a49ba85410ffce96f1712fa6b7&o=&hp=1',
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
        <h1 className={styles.title}>Zen Apartment by Loft Affair</h1>
        <div className={styles.imgContainer}>
          <img
            src={images[0]}
            alt={images[0]}
            loading="lazy"
            className={styles.img}
            onClick={() => {
              setChosenImg(0)
              setOpened(true)
            }}
          />

          <ImageList cols={2}>
            {images.slice(1).map((item, index) => (
              <ImageListItem key={item}>
                <img
                  className={styles.img}
                  srcSet={item}
                  src={item}
                  alt={item}
                  loading="lazy"
                  onClick={() => {
                    setChosenImg(Number(index + 1))
                    setOpened(true)
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>

        <div>
          <Modal
            opened={opened}
            centered
            size="100%"
            padding={0}
            transitionProps={{ duration: TRANSITION_DURATION }}
            withCloseButton={false}
            onClose={() => setOpened(false)}
          >
            <Carousel getEmblaApi={setEmbla} initialSlide={chosenImg} loop>
              {slides}
            </Carousel>
          </Modal>
        </div>
      </div>
    </>
  )
}
