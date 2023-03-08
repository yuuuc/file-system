import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import File from './file'
import FunBar from './funBar'
import { useNavigate } from 'react-router-dom'
import { getFilesList, getImgUrl } from '@/api/file'

const Box = styled.div`
  padding: 12px;
  height: 100%;
  box-sizing: border-box;
`
const FilesContainer = styled.div`
  border: 1px solid #ddd;
  width: 100%;
  height: 100%;
`
const FilesContent = styled.div<{
  gap?: number
  col?: number
}>`
  width: 100%;
  display: grid;
  gap: ${(props) => props.gap + 'px'};
  grid-template-columns: ${(props) =>
    `repeat(${props.col}, 1fr)` || `repeat(7, 1fr)`};
  border-top: 1px solid #ddd;
  padding: 12px;
  box-sizing: border-box;
`
export default () => {
  const [state, setState] = useState(false)
  const [files, setFiles] = useState([])
  const [col, setCol] = useState(7)
  const [gap, setGap] = useState(0)
  const fileContentRef = useRef(null)
  const getImglist = () => {
    getFilesList().then((r: any) => {
      if (r.success) {
        setFiles(r.data)
      }
    })
  }

  // 计算网格布局
  const computedfileContentGrid = (() => {
    let flag = false
    return function () {
      if (flag) return
      flag = true
      requestAnimationFrame(() => {
        const { clientWidth } = fileContentRef.current as any
        const rol = Math.floor(clientWidth / 130)
        setGap((clientWidth - 130 * rol) / 7)
        setCol(rol)
        flag = false
      })
    }
  })()

  useEffect(() => {
    getImglist()
    computedfileContentGrid()
    window.addEventListener('resize', computedfileContentGrid)
    return () => {
      window.removeEventListener('resize', computedfileContentGrid)
    }
  }, [])

  setTimeout(() => {
    setState(true)
  }, 2000)
  return (
    <Box>
      <FilesContainer ref={fileContentRef}>
        <FunBar onSuccess={getImglist}></FunBar>
        <FilesContent col={col} gap={gap}>
          <>
            {files.map((e: any) => {
              return (
                <File
                  name={e.name}
                  id={e.id}
                  key={e.id}
                  url={getImgUrl(e.name)}
                ></File>
              )
            })}
          </>
        </FilesContent>
      </FilesContainer>
    </Box>
  )
}
