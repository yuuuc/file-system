import express, { Express, Request, Response } from 'express'
const router = express.Router()
import fs from 'fs'
import { FILE_PATH } from '../../config/index'
import { saveFileName, hasFileName } from '../server/fileService'
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, FILE_PATH)
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname
    cb(null, name)
  }
})
const upload = multer({ storage: storage }).single('file')

router.post('/file/upload', upload, function (req: Request, res, next) {
  try {
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
  } catch (e) {}
})

router.get('/media', function (req, res) {
  const name = req.query.name as string
  if (hasFileName(name)) {
    fs.readFile(FILE_PATH + name, (err, data) => {
      res.statusCode = 200
      res.setHeader('conten-type', 'image/png')
      res.write(data, 'binary')
      res.end()
    })
  } else {
    res.statusCode = 404
    res.end()
  }
})

export default router
