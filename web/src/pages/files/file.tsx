import React from 'react'
import styled from 'styled-components'
import { Image, message } from 'antd'
import Img from '@/static/img.png'
import eImg from '@/static/error.png'

const File = styled.div`
  width: 100%;
  /* padding-bottom: 100%; */
  height: 130px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 12px;
  box-sizing: border-box;
  overflow: hidden;
  max-width: 130px;
  :hover {
    box-shadow: 0 0 16px 0px rgba(0, 0, 0, 0.1);
  }
`
// const Image = styled.img`
//   height: 80px;
//   width: 80px;
//   object-fit: cover;
// `
const Text = styled.div`
  font-size: 12px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  /* margin-top: 6px; */
`

type FileProps = {
  id: string
  url?: string
  name: string
}
export default (props: FileProps) => {
  const nameClick = (n: string) => {
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.value = n
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    message.success('已复制: ' + n)
  }
  return (
    <File>
      {/* props.url ? props.url : */}
      <Image
        width={80}
        height={80}
        src={props.url}
        preview={{
          src: props.url
        }}
        fallback={eImg}
      ></Image>
      <Text onClick={() => nameClick(props.name)}> {props.name} </Text>
    </File>
  )
}
