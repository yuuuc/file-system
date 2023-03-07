import React from 'react'
import styled from 'styled-components'
import Img from '@/static/img.png'

const File = styled.div`
  width: 100%;
  /* padding-bottom: 100%; */
  height: 130px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* box-shadow: 0 0 16px 0px rgba(0, 0, 0, 0.2); */
  border-radius: 8px;
  padding: 12px;
  box-sizing: border-box;
  overflow: hidden;
  max-width: 130px;
`
const Image = styled.img`
  height: 80px;
  width: 80px;
  object-fit: cover;
`
const Text = styled.div`
  font-size: 12px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* margin-top: 6px; */
`

type FileProps = {
  id: string
  url?: string
  name: string
}
export default (props: FileProps) => {
  return (
    <File>
      <Image src={props.url ? props.url : Img} />
      <Text> {props.name} </Text>
    </File>
  )
}
