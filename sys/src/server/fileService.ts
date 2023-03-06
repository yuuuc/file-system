import fs from 'fs'
import { FILE_PATH } from '../../config/index'
const files = fs.readdirSync(FILE_PATH)
console.log('当前资源目录下存在' + files.length + '个文件')
const data: string[] = [...files]
export const saveFileName = (name: string) => {
  data.push(name)
  console.log(data)
}

export const getFileName = (pageNum: number = 0, pageSize: number = 10) => {
  return data.slice(pageNum, pageSize)
}

export const hasFileName = (name: string) => {
  return data.includes(name)
}
