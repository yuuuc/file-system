import React, { useState, useContext, useReducer } from 'react'
import { LoadingContext } from '@/context/loadingContext'
import { createPortal } from 'react-dom'
import { Space, Spin } from 'antd'
import styled from 'styled-components'

const Mask = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Loading = () => {
  // const [visible, setVisible] = useState(false)
  const loading = useContext(LoadingContext)

  return createPortal(
    <>
      {loading.visiable && (
        // <Space
        //   direction='vertical'
        //   style={{
        //     width: '100%',
        //     height: '100%',
        //     position: 'fixed',
        //     top: 0,
        //     left: 0
        //   }}
        // >

        // </Space>
        <Mask>
          <Spin tip='Loading...'>{/* <Mask /> */}</Spin>
        </Mask>
      )}
    </>,

    document.body
  )
}

export default Loading
