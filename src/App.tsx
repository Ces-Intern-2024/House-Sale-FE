import React from 'react'
import './App.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layouts/CommonLayout/Layout'

function App() {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/" element={<Layout></Layout>}></Route>
      </Routes>
    </MantineProvider>
  )
}

export default App
