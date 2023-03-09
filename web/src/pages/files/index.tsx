import React, { useRef, useState, useEffect, useContext } from 'react'
import { Checkbox, message } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import styled from 'styled-components'

import { getFilesList, getImgUrl, postDelImg } from '@/api/file'
import File from './file'
import FunBar from './funBar'
import { multDownloadImgZip } from '@/utils/zipDownload'
import { LoadingContext } from '@/context/loadingContext'

const Box = styled.div`
  padding: 12px;
  height: 100%;
  box-sizing: border-box;
`
const FilesContainer = styled.div`
  border: 1px solid #ddd;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  min-width: 156px;
`
const FilesContent = styled.div<{
  gap?: number
  col?: number
}>`
  width: 100%;
  display: grid;
  column-gap: ${(props) => props.gap + 'px'};
  grid-template-columns: ${(props) => `repeat(${props.col}, 1fr)`};
  border-top: 1px solid #ddd;
  padding: 12px;
  box-sizing: border-box;
  place-items: center;
`

const FileBox = styled.div`
  width: 100%;
  height: 130px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: cneter;
`
const FileEditBar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

const Files = () => {
  const fileContentRef = useRef(null)
  const [editState, setEditState] = useState(false)
  const [files, setFiles] = useState<any[]>([])
  const [col, setCol] = useState(7)
  const [gap, setGap] = useState(0)
  // const [checkSet, checkSetArr] = useState(new Set<string>())
  const checkSet = new Set<string>()
  const loading = useContext(LoadingContext)

  const getImglist = () => {
    getFilesList().then((r: any) => {
      if (r.success) {
        setFiles(r.data)
      }
    })
  }

  const delImgHandle = async () => {
    if (noCheckTips()) return
    const res: any = await postDelImg([...checkSet])
    if (res.success) {
      message.success('删除成功')
      getImglist()
    } else {
      message.error('删除失败')
    }
  }

  const checkBoxChange = (e: CheckboxChangeEvent, id: string) => {
    if (e.target.checked) {
      checkSet.add(id)
    } else {
      checkSet.delete(id)
    }
  }

  // 下载
  const downloadHandle = () => {
    if (noCheckTips()) return
    const imgList: string[] = []
    checkSet.forEach((e) => {
      const o = files.find((v) => v.id === e)
      if (o) {
        imgList.push(getImgUrl(o.name))
      }
    })
    loading.show()
    multDownloadImgZip(imgList).then(() => {
      loading.hide()
    })
    checkSet.clear()
  }

  const noCheckTips = (): boolean => {
    if (checkSet.size > 0) {
      return false
    } else {
      message.info('请选择')
      return true
    }
  }

  // 计算网格布局
  const computedfileContentGrid = (() => {
    let flag = false
    return function () {
      if (flag) return
      flag = true
      requestAnimationFrame(() => {
        const { clientWidth } = fileContentRef.current as any
        const w = clientWidth - 24
        const rol = Math.floor(w / 130)
        setGap((w - 130 * rol - 1) / rol)
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

  return (
    <Box>
      <FilesContainer ref={fileContentRef}>
        <FunBar
          onSuccess={getImglist}
          setEditState={(flag: boolean) => {
            checkSet.clear()
            setEditState(flag)
          }}
          editState={editState}
          onDel={delImgHandle}
          onDownload={downloadHandle}
        ></FunBar>
        <FilesContent col={col} gap={gap}>
          <>
            {files.map((e: any) => {
              return (
                <FileBox key={e.id}>
                  {editState ? (
                    <FileEditBar>
                      <Checkbox
                        onChange={($e) => checkBoxChange($e, e.id)}
                      ></Checkbox>
                    </FileEditBar>
                  ) : undefined}
                  <File name={e.name} id={e.id} url={getImgUrl(e.name)}></File>
                </FileBox>
              )
            })}
          </>
        </FilesContent>
      </FilesContainer>
    </Box>
  )
}

export default Files
