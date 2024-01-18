import React from 'react'
import './App.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import SlideShow from './layouts/SlideShow'

function App() {
  return (
    <MantineProvider>
      <SlideShow />
    </MantineProvider>
  )
}

export default App
