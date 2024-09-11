import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import helmet from 'helmet'
import compression from 'compression'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import route from '#routes/index.js'
dotenv.config()

import logger from '#helper/logger.js'
import standardFormat from '#middlewares/stdJson.js'
import { Connect as connectDB, Close as closeDB } from '#models/index.js'

import { limiter } from '#helper/security.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(compression())
app.use(helmet())
app.use(limiter)
app.use(standardFormat)
app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

route(app)

const port = process.env.PORT || 3000
let server
const startServer = async () => {
  try {
    if (process.env.NODE_ENV != 'test') {
      connectDB(process.env.MONGODB_URL)
    }

    server = app.listen(port, () => {
      console.log('App is now running at port:', port)
    })
  } catch (error) {
    console.log(error)
  }
}

const shutDown = (signal) => {
  if (process.env.NODE_ENV === 'test') {
    server.close()
  } else {
    console.log(
      `Received signal ${signal} to terminate. Shutting down gracefully...`
    )
    server.close(async () => {
      console.log('Closed out remaining connections.')
      await closeDB()
      process.exit(0)
    })

    setTimeout(() => {
      console.error(
        'Could not close connections in time, forcefully shutting down'
      )
      process.exit(1)
    }, 10000)
  }
}

process.on('SIGINT', shutDown)
process.on('SIGTERM', shutDown)

startServer()

export { app, shutDown }
