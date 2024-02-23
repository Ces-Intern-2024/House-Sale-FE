import { lazy } from 'react'
import { Roles } from '../../types/role'

export const publicRoutes = [
  {
    key: 'home',
    path: `/home`,
    component: lazy(() => import('../../pages/HomePage/HomePage')),
    authority: [Roles.Admin, Roles.Seller, Roles.User],
  },
  {
    key: 'details',
    path: `/details`,
    component: lazy(() => import('../../pages/DetailPage/DetailPage')),
    authority: [Roles.Admin, Roles.Seller, Roles.User],
  },
  {
    key: 'search',
    path: `/search`,
    component: lazy(() => import('../../pages/SearchPage/SearchPage')),
    authority: [Roles.Admin, Roles.Seller, Roles.User],
  },
  {
    key: 'for-sale',
    path: `/for-sale`,
    component: lazy(() => import('../../pages/DetailPage/DetailPage')),
    authority: [Roles.Admin, Roles.Seller, Roles.User],
  },
  {
    key: 'for-rent',
    path: `/for-rent`,
    component: lazy(() => import('../../pages/DetailPage/DetailPage')),
    authority: [Roles.Admin, Roles.Seller, Roles.User],
  },
  {
    key: 'contact',
    path: `/contact`,
    component: lazy(() => import('../../pages/DetailPage/DetailPage')),
    authority: [Roles.Admin, Roles.Seller, Roles.User],
  },
  {
    key: 'about-us',
    path: '/about-us',
    component: lazy(() => import('../../pages/AboutUsPage/AboutUsPage')),
    authority: [Roles.Admin, Roles.Seller, Roles.User],
  },
]

export const protectedRoutes = [
  {
    key: 'profile',
    path: '/profile',
    component: lazy(() => import('../../components/Profile/UserProfile')),
    authority: [Roles.Seller],
  },
  {
    key: 'seller-dashboard',
    path: '/seller',
    component: lazy(() => import('../../pages/SellerPage/SellerPage')),
    authority: [Roles.Seller],
  },
]

export const authRoutes = [
  {
    key: 'login',
    path: `/login`,
    component: lazy(() =>
      import('../../components/Login/Login').then((module) => ({
        default: module.Login,
      })),
    ),
    authority: [Roles.Admin, Roles.Seller, Roles.User],
  },
  {
    key: 'register',
    path: `/register`,
    component: lazy(() => import('../../components/Register/Register')),
    authority: [Roles.Admin, Roles.Seller, Roles.User],
  },
]
