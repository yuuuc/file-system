import fs from 'fs'
import { FILE_PATH } from '../../config/index'
const files = fs.readdirSync(FILE_PATH)
console.log('当前资源目录下存在' + files.length + '个文件')
const data: string[] = [...files]
export const saveFileName = (name: string) => {
  data.push(name)
}

/**
 * 分页查找文件信息
 * @param pageNum
 * @param pageSize
 * @returns
 */
export const getFileList = (pageNum: number = 0, pageSize: number = 10) => {
  return data.slice(pageNum, pageSize).map((e) => {
    const c_i = e.indexOf('-')
    return {
      id: e.substring(0, c_i),
      name: e
    }
  })
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
