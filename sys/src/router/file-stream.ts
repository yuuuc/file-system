import express, { Express, Request, Response } from 'express'
const router = express.Router()
const mime = require('mime')
import { FILE_PATH } from '../../config/index'
import {
  saveFileName,
  getFileDataByName,
  getFileList
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
    const name = getUUID() + '-' + file.originalname
    cb(null, name)
  }
})
const upload = multer({ storage: storage }).single('file')

router.post('/file/upload', upload, function (req: Request, res, next) {
  const file = (req as any).file
  if (file) {
    saveFileName(file.filename)
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

router.get('/media/list', function (req, res) {
  const query = req.query
  res.send({
    success: true,
    type: 'page',
    data: getFileList()
  })
})

export default router
