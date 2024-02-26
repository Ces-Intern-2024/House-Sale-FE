import React, { useMemo, lazy, Suspense } from 'react'
import useAuth from '../../hooks/useAuth'
import { useLocation } from 'react-router-dom'
import '@mantine/core/styles.css'
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
  const sellerPaths = ['/seller', '/profile', '/report']
  const adminPaths = ['/admin', '/report', '/admin-property']
  // const privatePaths = ['/seller', '/profile', '/admin']
  const AppLayout = useMemo(() => {
    if (authenticated) {
      if (adminPaths.includes(pathname) && Number(roleId) === 3) {
        return layouts.LAYOUT_ADMIN
      } else if (sellerPaths.includes(pathname) && Number(roleId) === 2) {
        return layouts.LAYOUT_SELLER
      } else {
        console.log('00')

        return layouts.LAYOUT_COMMON
      }
    } else {
      console.log('0')

      return publicPaths.includes(pathname)
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
