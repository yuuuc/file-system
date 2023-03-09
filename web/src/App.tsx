import React, { useEffect } from 'react'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import routes from '@/router/index'
import MenuContainer from '@/component/business/Menu'
import Loading from '@/component/common/loading/index'
const Container = styled.div`
  display: flex;
  height: 100vh;
`

const RouterView = styled.div`
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;
`

export default () => {
  const elements = useRoutes(routes)
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/files')
  }, [])
  return (
    <>
      <Loading />
      <Container>
        {/* <MenuContainer></MenuContainer> */}
        <RouterView>{elements}</RouterView>
      </Container>
    </>
  )
}
