import React from 'react'
import App from '../App'
import DetailPage from '../pages/DetailPage/DetailPage'
import HomePage from '../pages/HomePage/HomePage'
import SellerPage from '../pages/SellerPage/SellerPage'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layouts/CommonLayout/Layout'
import SellerLayout from '../components/layouts/SellerLayout/SellerLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Layout />,
        children: [
          {
            path: '',
            element: <HomePage />,
          },
          { path: 'details/:id', element: <DetailPage /> },
        ],
      },
      {
        path: 'seller',
        element: <SellerLayout />,
        children: [
          { path: 'dashboard', element: <SellerPage /> },
          { path: '', element: '' },
        ],
      },
      {
        path: 'admin',
      },
    ],
  },
])
