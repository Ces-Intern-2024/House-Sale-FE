import React, { useMemo, lazy, Suspense } from 'react'
import useAuth from '../../hooks/useAuth'
import { useLocation } from 'react-router-dom'
import '@mantine/core/styles.css'

const layouts = {
  LAYOUT_COMMON: lazy(() => import('./CommonLayout/CommonLayout')),
  LAYOUT_AUTH: lazy(() => import('./AuthLayout/AuthLayout')),
  LAYOUT_SELLER: lazy(() => import('./SellerLayout/SellerLayout')),
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
  // const privatePath = ['/seller', '/profile']

  const AppLayout = useMemo(() => {
    if (authenticated) {
      return publicPaths.some((publicPath) => publicPath === pathname)
        ? layouts.LAYOUT_COMMON
        : layouts.LAYOUT_SELLER
    } else {
      return publicPaths.some((publicPath) => publicPath === pathname)
        ? layouts.LAYOUT_COMMON
        : layouts.LAYOUT_AUTH
    }
  }, [roleId, authenticated, pathname])

  return (
    <Suspense fallback={<div></div>}>
      <AppLayout />
    </Suspense>
  )
}

export default Layouts
