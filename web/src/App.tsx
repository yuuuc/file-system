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
  background-color: rgba(255, 0, 0, 0.2);
`
const Button = styled.button``

const MenuContainer = () => {
  const navigate = useNavigate()
  const toMain = () => {
    navigate('/')
  }
  const toFiles = () => {
    navigate('/files')
  }
  return (
    <Menu>
      <Button onClick={toFiles}>文件</Button>
      <Button onClick={toMain}>主页</Button>
    </Menu>
  )
}

export default () => {
  const elements = useRoutes(routes)
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <>
      <Container>
        <MenuContainer></MenuContainer>
        <div style={{ flex: 1 }}>{elements}</div>
      </Container>
    </>
  )
}
