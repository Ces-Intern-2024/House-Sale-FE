import React, { Suspense } from 'react'
import './App.css'
import Layouts from './components/layouts/Layouts'
import { MantineProvider } from '@mantine/core'
import '@mantine/carousel/styles.css'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css';
// import { Route, Routes } from 'react-router-dom'
// import Layout from './components/layouts/CommonLayout/CommonLayout'
// import HomePage from './pages/HomePage/HomePage'
// import DetailPage from './pages/DetailPage/DetailPage'
// import SellerPage from './pages/SellerPage/SellerPage'
// import { Login } from './components/Login/Login'
// import AuthLayout from './components/layouts/AuthLayout/AuthLayout'
// import SellerProfile from './components/Profile/UserProfile'
// import Register from './components/Register/Register'
// import SellerLayout from './components/layouts/SellerLayout/SellerLayout'

function App() {
  return (
    <MantineProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Layouts />
      </Suspense>

      {/* <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/details" element={<DetailPage></DetailPage>}></Route>
        </Route>
        <Route path="/" element={<SellerLayout></SellerLayout>}>
          <Route path="/seller" element={<SellerPage></SellerPage>}></Route>
          <Route
            path="/profile"
            element={<SellerProfile></SellerProfile>}
          ></Route>
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Route>
      </Routes> */}
    </MantineProvider>
  )
}

export default App
