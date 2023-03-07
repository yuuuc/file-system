import React from 'react'
import routes from '@/router/index'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'

export default () => {
  const navigate = useNavigate()
  const toFiles = () => {
    navigate('/files')
  }
  return (
    <>
      {/* <img src='http://192.168.3.13:3000/media?name=1678098233596-img1.png' /> */}
      {/* <button onClick={toFiles}>toFiles</button> */}
    </>
  )
}
