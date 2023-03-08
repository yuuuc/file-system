import express, { Express, Request, Response, query } from 'express'
const router = express.Router()
const mime = require('mime')
import { FILE_PATH } from '../../config/index'
import {
  saveFileName,
  getFileDataByName,
  getFileList,
  delFileByData
} from '../server/file-service'
const multer = require('multer')
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid')

const getUUID = () => {
  return uuidv4().toString().replaceAll('-', '')
}
// console.log(crypto.getHashes())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, FILE_PATH)
  },
  filename: function (req, file, cb) {
    const name =
      getUUID() + '-' + getUUID() + '.' + mime.getExtension(file.mimetype)
    cb(null, name)
  }
})
const upload = multer({ storage: storage }).single('file')

router.post('/file/upload', upload, function (req: Request, res, next) {
  const file = (req as any).file
  if (file) {
    const c_i = file.filename.indexOf('-')
    saveFileName({
      id: file.filename.substring(0, c_i),
      name: file.filename,
      mime: file.mimetype,
      size: file.size,
      upload_time: new Date(),
      modify_time: ''
    })
    res.statusCode = 200
    res.send({
      success: true,
      data: file.filename,
      type: 'data'
    })
  } else {
    res.statusCode = 500
    res.send({
      success: false,
      type: 'data'
    })
  }
})

router.get('/media', function (req, res) {
  const name = req.query.name as string
  getFileDataByName(name)
    .then((r) => {
      res.statusCode = 200
      // res.setHeader("etag")
      //uuidv4()
      // 图片缓存
      res.setHeader('Cache-Control', 'max-age=3600')
      res.setHeader(
        'Content-Type',
        mime.getType(name.substring(name.indexOf('.') + 1))
      )
      res.write(r, 'binary')
      res.end()
    })
    .catch((e) => {})
})

router.get(
  '/media/list',
  function (
    req: Request<
      never,
      any,
      never,
      {
        pageNum: number
        pageSize: number
      },
      never
    >,
    res
  ) {
    const query = req.query
    res.send({
      success: true,
      type: 'page',
      data: getFileList(query.pageNum, query.pageSize)
    })
    res.end()
  }
)

router.post(
  '/media/del',
  function (req: Request<never, any, string[], never, never>, res) {
    const param = req.body
    const n = delFileByData(param)
    if (n > 0) {
      res.statusCode = 200
      res.send({
        success: true,
        data: n
      })
    } else {
      res.statusCode = 500
    }

    res.end()
  }
)

export default router
