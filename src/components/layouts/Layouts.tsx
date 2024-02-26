import React, { useMemo, lazy, Suspense } from 'react'
import useAuth from '../../hooks/useAuth'
import { useLocation } from 'react-router-dom'
import '@mantine/core/styles.css'
import { Roles } from '../../types/role'

const layouts = {
  LAYOUT_COMMON: lazy(() => import('./CommonLayout/CommonLayout')),
  LAYOUT_AUTH: lazy(() => import('./AuthLayout/AuthLayout')),
  LAYOUT_SELLER: lazy(() => import('./SellerLayout/SellerLayout')),
  LAYOUT_ADMIN: lazy(() => import('./AdminLayout/AdminLayout')),
}
const Layouts = () => {
  const { pathname } = useLocation()
  const { authenticated, roleId } = useAuth()
  const publicPaths = [
    '/home',
    '/details',
    '/about-us',
    '/for-sale',
    '/for-rent',
    '/feedback',
    '/search',
  ]

  const AppLayout = useMemo(() => {
    if (authenticated) {
      if (Number(roleId) === Roles.Admin) {
        return publicPaths.some((publicPath) => pathname.includes(publicPath))
          ? layouts.LAYOUT_COMMON
          : layouts.LAYOUT_ADMIN
      }
      if (Number(roleId) === Roles.Seller) {
        return publicPaths.some((publicPath) => pathname.includes(publicPath))
          ? layouts.LAYOUT_COMMON
          : layouts.LAYOUT_SELLER
      }
      return layouts.LAYOUT_COMMON
    } else {
      return publicPaths.some((publicPath) => pathname.includes(publicPath))
        ? layouts.LAYOUT_COMMON
        : layouts.LAYOUT_AUTH
    }
  }, [roleId, authenticated, pathname])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppLayout />
    </Suspense>
  )
}
export default Layouts
