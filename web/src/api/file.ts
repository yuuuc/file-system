/**
 * 文件上传
 * @param file
 * @returns
 */
export const postUploadFile = (file: File) => {
  return new Promise((resolve, reject) => {
    const form = new FormData()
    form.append('file', file)
    fetch('/api/file/upload', {
      method: 'POST',
      body: form
    })
      .then((res) => {
        res
          .json()
          .then((res) => {
            resolve(res)
          })
          .catch((e) => {
            reject(e)
          })
      })
      .catch((e) => {
        reject(e)
      })
  })
}

/**
 * 获取图片列表
 */
export const getFilesList = () => {
  return new Promise((resolve, reject) => {
    fetch('/api/media/list')
      .then((r) => {
        r.json()
          .then((j) => {
            resolve(j)
          })
          .catch((e) => {
            reject(e)
          })
      })
      .catch((e) => {
        reject(e)
      })
  })
}

/**
 * 获取单张图片地址
 */
export const getImgUrl = (name: string) => {
  return `/api/media?name=${name}`
}
