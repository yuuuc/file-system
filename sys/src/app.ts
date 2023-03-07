import express, { Express, Request, Response } from 'express'
import FileRouter from './router/file-stream'
const http2 = require('spdy')
const app: Express = express()

app.use('/', FileRouter)

app.listen(3000, function () {
  console.log('running...')
})
