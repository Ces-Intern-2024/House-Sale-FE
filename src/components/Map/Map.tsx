import React from 'react'
import styles from './Map.module.scss'
import { AspectRatio } from '@mantine/core'

export default function Map() {
  return (
    <>
      <div className={styles.mapContainer}>
        <h1 className={styles.mapFont}>GOOGLE MAP</h1>
        <AspectRatio ratio={9 / 3}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15280.66116855551!2d108.22439527065858!3d16.047079690541397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752e1a6e565e6d%3A0x4c41a5b76469b8f2!2sDanang%20City%2C%20Vietnam!5e0!3m2!1sen!2sru!4v1644262070010!5m2!1sen!2sru"
            title="Google map"
          />
        </AspectRatio>
      </div>
    </>
  )
}
