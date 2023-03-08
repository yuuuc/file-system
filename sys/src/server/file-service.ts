import fs from 'fs'
import { FILE_PATH } from '../../config/index'
import DataSource from '../data/loader'
DataSource.install()
const jsonData = fs.readFileSync(DataSource.dbPath).toString()
const data: FileRecord[] = jsonData.trim() === '' ? [] : JSON.parse(jsonData)
console.log('当前资源目录下存在' + data.length + '个文件')

type FileRecord = {
  id: string
  name: string
  upload_time?: Date | ''
  modify_time?: Date | ''
  size?: number | 0
  mime?: string | ''
  isDel?: 0 | 1
}

setInterval(() => {
  fs.writeFile(DataSource.dbPath, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('文件保存')
  })
}, 60000)

export const saveFileName = (d: FileRecord) => {
  data.push(d)
}

/**
 * 分页查找文件信息
 * @param pageNum
 * @param pageSize
 * @returns
 */
export const getFileList = (pageNum: number = 0, pageSize: number = 10) => {
  return data.filter((e) => e.isDel !== 1) // .slice(pageNum, pageSize)
}

/**
 * 获取单个文件的数据流
 * @param name
 * @returns
 */
export const getFileDataByName = (name: string) => {
  return new Promise((resovle, reject) => {
    fs.readFile(FILE_PATH + name, (err, data) => {
      if (err) {
        reject(err)
      }
      resovle(data)
    })
  })
}

/**
 * 删除
 * @param ids
 */
export const delFileByData = (ids: string[]) => {
  let count = 0
  data.forEach((e) => {
    if (ids.includes(e.id)) {
      e.isDel = 1
      count++
    }
  })
  return count
}
