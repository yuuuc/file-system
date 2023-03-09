import JSZip from 'jszip'
import FileSaver from 'file-saver'
import axios, { ResponseType } from 'axios'
// import { useContext } from 'react'
// import { LoadingContext } from '@/context/LoadingContext'

// const loading = useContext(LoadingContext)

// loading
// https://www.jianshu.com/p/a1f09b640732
/**
 单个图片文件下载
**/
export function downloadImg(imgsrc: string, name: string) {
  const images = new Image()
  images.setAttribute('crossOrigin', 'anonymous')
  images.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = images.width
    canvas.height = images.height
    const context: any = canvas.getContext('2d')
    context.drawImage(images, 0, 0, images.width, images.height)
    const url = canvas.toDataURL('image/png') // 得到图片的base64编码数据
    const a = document.createElement('a') // 生成一个a元素
    const event = new MouseEvent('click') // 创建一个单击事件
    a.download = name || 'photo' // 设置图片名称
    a.href = url // 将生成的URL设置为a.href属性
    a.dispatchEvent(event) // 触发a的单击事件
  }
  images.src = imgsrc
}
/**
多张图片以压缩包的形式下载
imgsList： 存放多张图片路径的数组 base64
**/
export function multDownloadImgZip(imgsList: any) {
  return new Promise((resolve, reject) => {
    const blogTitle = '文件'
    const zip = new JSZip()
    const imgs: any = zip.folder(blogTitle)
    const baseList: any = []

    // React

    // ReactDom.createPortal(
    //   <Space>
    //     <Spin tip={'loading'}></Spin>
    //   </Space>,
    //   document.body
    // )
    //   const imgNameList: any = []
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < imgsList.length; i++) {
      const images = new Image()
      images.setAttribute('crossOrigin', 'anonymous')
      images.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = images.width
        canvas.height = images.height
        const context: any = canvas.getContext('2d')
        context.drawImage(images, 0, 0, images.width, images.height)
        const url = canvas.toDataURL('image/png') // 得到图片的base64编码数据
        baseList.push(url.substring(22)) // 去掉base64编码前的 data:image/png;base64,
        if (baseList.length === imgsList.length && baseList.length > 0) {
          // eslint-disable-next-line no-plusplus
          for (let k = 0; k < baseList.length; k++) {
            imgs.file(`${k}.png`, baseList[k], { base64: true })
          }
          zip.generateAsync({ type: 'blob' }).then((content) => {
            // see FileSaver.js
            FileSaver.saveAs(content, `${blogTitle}.zip`)
            resolve(true)
          })
        }
      }
      images.src = imgsList[i] // base64的图片url路径
    }
  })
}

/**
 *
 */
export const zipImg = (imgUrls: string[], zipName?: string) => {
  return new Promise((resolve, reject) => {
    let name = '文件cc'
    if (zipName) {
      name = zipName
    }
    const zip = new JSZip()
    const imgs: any = zip.folder(name)
    Promise.all(
      imgUrls.map(async (e: string) => {
        const res = await axios.request({
          url: e,
          method: 'get',
          responseType: 'arraybuffer'
        })
        // (
        //   `data:${res.headers['content-type']};base64,` +
        //   transformArrayBufferToBase64(res.data)
        // )
        const type = res.headers['content-type']
        return {
          data: res.data,
          end: type.substring(type.indexOf('/') + 1)
        }
      })
    ).then((res) => {
      res.forEach((e, i) => {
        imgs.file(`${i}.${e.end}`, e.data, { base64: true })
      })
      zip.generateAsync({ type: 'blob' }).then((content) => {
        // see FileSaver.js
        FileSaver.saveAs(content, `${name}.zip`)
        resolve(true)
      })
    })
  })
}

function transformArrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = ''
  var bytes = new Uint8Array(buffer)
  for (var len = bytes.byteLength, i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}
