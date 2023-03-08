import React, { useEffect } from 'react'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const Menu = styled.div`
  flex-shrink: 0;
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

export default MenuContainer
