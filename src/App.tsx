import React from 'react'
import './App.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layouts/CommonLayout/Layout'
import HomePage from './pages/HomePage/HomePage'
import DetailPage from './pages/DetailPage/DetailPage'
import SellerLayout from './components/layouts/SellerLayout/SellerLayout'
import SellerPage from './pages/SellerPage/SellerPage'
import { Login } from './components/Login/Login'
import AuthLayout from './components/layouts/AuthLayout/AuthLayout'

function App() {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/details" element={<DetailPage></DetailPage>}></Route>
        </Route>
        <Route path="/seller" element={<SellerLayout></SellerLayout>}>
          <Route path="/seller" element={<SellerPage></SellerPage>}></Route>
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<Login />}></Route>
        </Route>
      </Routes>
    </MantineProvider>
  )
}

export default App
