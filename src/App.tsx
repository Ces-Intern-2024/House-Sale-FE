import React from 'react'
import './App.css'
import { properties } from './utils/properties'
import Container from './components/Container'
import Footer from './layouts/Footer/Footer'
import { MantineProvider } from '@mantine/core'
import SlideShow from './layouts/SlideShow'
import Button from './components/Button/ButtonCustom'
import '@mantine/core/styles.css'
import FeaturedProperties from './components/FeaturedProperties/FeaturedProperties'

function App() {
  return (
    <MantineProvider>
      <SlideShow />
      <Container>
        <FeaturedProperties
          properties={properties}
          title="FEATURED FOR RENT"
          filter="rent"
        >
          <Button
            className="text-center mt-[20px]"
            color="rgba(52, 129, 217, 1)"
            variant="filled"
            text="View more"
          />
        </FeaturedProperties>

        <FeaturedProperties
          properties={properties}
          title="FEATURED FOR SALE"
          filter="sale"
        >
          <Button
            className="text-center mt-[20px]"
            color="rgba(52, 129, 217, 1)"
            variant="filled"
            text="View more"
          />
        </FeaturedProperties>
      </Container>
      <Footer />
    </MantineProvider>
  )
}

export default App
