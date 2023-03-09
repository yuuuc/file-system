import React, { useRef } from 'react'
import styled from 'styled-components'
import { postUploadFile } from '@/api/file'
import { message } from 'antd'
import { DownloadOutlined, CloudUploadOutlined } from '@ant-design/icons'

const FunBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 6px;
`
const FunState = styled.div`
  flex: 1;
`

const Button = styled.button`
  @keyframes scale {
    from {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0.3;
    }
    to {
      transform: translate(-50%, -50%) scale(8);
      opacity: 0;
    }
  }
  position: relative;
  border: none;
  outline: none;
  padding: 8px 24px;
  font-size: 14px;
  border-radius: 6px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: center;
  :active {
    ::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      display: inline-block;
      width: 20%;
      padding-bottom: 20%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(233, 233, 233);
      opacity: 0.3;
      animation: scale ease 0.3s;
    }
  }
`
const UploadButton = styled(Button)`
  color: white;
  background-color: rgba(0, 188, 255);
`
const EditButton = styled(Button)`
  border: 1px solid #aaa;
  color: #000;
  background-color: #fff;
  margin-right: 12px;
`

const DelButton = styled(Button)`
  background-color: rgba(255, 88, 88);
  color: #fff;
  margin-right: 12px;
`

const DownloadButton = styled(Button)`
  color: white;
  background-color: rgba(0, 188, 255);
  margin-right: 12px;
`

// const InputFile = styled.input`
//   display: none;
// `

type FunBarProps = {
  onSuccess?: () => void
  onFail?: () => void
  setEditState: (state: boolean) => void
  onDel?: () => void
  onDownload?: () => void
  editState: boolean
}
export default (props: FunBarProps) => {
  // const file = useRef<HTMLInputElement>(null)
  // 编辑
  const editHandle = () => {
    props.setEditState && props.setEditState(!props.editState)
  }
  // 删除
  const delHandle = () => {
    props.onDel && props.onDel()
  }
  // 上传
  const uploadHandle = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = async function (e) {
      const file = (e.target as any).files[0]
      const res: any = await postUploadFile(file)
      if (res.success) {
        message.success('上传成功')
        props.onSuccess && props.onSuccess()
      } else {
        props.onFail && props.onFail()
      }
    }
    input.click()
  }
  // 下载
  const downloadHandle = () => {
    props.onDownload && props.onDownload()
  }
  return (
    <FunBarContainer>
      <FunState>
        <EditButton onClick={editHandle}>
          {props.editState ? '完成' : '编辑'}{' '}
        </EditButton>
      </FunState>
      <DownloadButton onClick={downloadHandle}>
        <DownloadOutlined style={{ fontSize: '16px' }} />
        <span>批量下载</span>
      </DownloadButton>
      <DelButton onClick={delHandle}>删除</DelButton>
      <UploadButton onClick={uploadHandle}>
        <CloudUploadOutlined style={{ fontSize: '16px' }} />
        <span>上传</span>
      </UploadButton>
      {/* <InputFile ref={file} type='file' /> */}
    </FunBarContainer>
  )
}
