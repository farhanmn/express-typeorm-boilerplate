import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import dotenv from 'dotenv'
import route from './src/routes'
dotenv.config()

import logger from './src/helper/logger'
import standardFormat from './src/middlewares/stdJson'

const app = express()

app.use(standardFormat)
app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

route(app)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('App is now running at port:', port)
})
