import React, { Children, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import Files from '@/pages/files/index'
import Menu from '@/pages/menu/index'

// const Files = React.lazy(() => import('@/pages/files/index'))
// const Menu = React.lazy(() => import('@/pages/menu/index'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Menu />
  },
  {
    path: '/files',
    element: <Files />
  }
]

const getRouter = (routes: RouteObject[]) => {
  return routes.map((e) => {
    const t: RouteObject = e
    if (e.children) {
      t.children = getRouter(e.children)
    }
    t.element = <Suspense fallback={<>Loadding</>}>{t.element}</Suspense>
    return t
  })
}

export default routes
