import React from 'react'
import routes from '@/router/index'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  height: 100vh;
`
const Menu = styled.div`
  width: 350px;
  background-color: red;
  opacity: 0.2;
`

export default () => {
  const elements = useRoutes(routes)
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <>
      <Container>
        <Menu></Menu>
        <div style={{ flex: 1 }}>{elements}</div>
      </Container>
    </>
  )
}
