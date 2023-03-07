import React, { useRef } from 'react'
import styled from 'styled-components'
import { postUploadFile } from '@/api/file'

const FunBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 6px;
`
const FunState = styled.div`
  flex: 1;
`

const UpLoadButton = styled.button`
  border: none;
  color: white;
  background-color: #0099ff;
  outline: none;
  padding: 8px 24px;
  font-size: 14px;
  border-radius: 6px;
`

const InputFile = styled.input`
  display: none;
`

type FunBarProps = {
  onSuccess?: () => void
  onFail?: () => void
}
export default (props: FunBarProps) => {
  const file = useRef<HTMLInputElement>(null)
  const uploadHandle = () => {
    // if (file.current) {
    //   file.current.onchange = function (e) {
    //     console.log(e)
    //   }
    //   file.current.click()
    // }
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = async function (e) {
      const file = (e.target as any).files[0]
      const res: any = await postUploadFile(file)
      if (res.success) {
        alert('上传成功')
        props.onSuccess && props.onSuccess()
      } else {
        props.onFail && props.onFail()
      }

      // const fileRender = new FileReader()

      // fileRender.readAsDataURL()
      // fileRender.onload = () => {
      //   console.log(fileRender)
      // }
    }
    input.click()
  }
  return (
    <FunBarContainer>
      <FunState></FunState>
      <UpLoadButton onClick={uploadHandle}>上传</UpLoadButton>
      <InputFile ref={file} type='file' />
    </FunBarContainer>
  )
}
