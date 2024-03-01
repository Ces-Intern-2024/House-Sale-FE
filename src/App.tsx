import React, { Suspense } from 'react'
import './App.css'
import Layouts from './components/layouts/Layouts'
import { MantineProvider } from '@mantine/core'
import '@mantine/carousel/styles.css'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css';

function App() {
  return (
    <MantineProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Layouts />
      </Suspense>
    </MantineProvider>
  )
}

export default App
