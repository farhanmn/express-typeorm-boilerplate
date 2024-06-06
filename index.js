import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import route from './src/routes/index.js'
dotenv.config()

import logger from './src/helper/logger.js'
import standardFormat from './src/middlewares/stdJson.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
