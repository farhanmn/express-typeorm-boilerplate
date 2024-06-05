import app from 'express'
const router = app.Router()

import AuthController from '../controllers/AuthController'

router.post('/register', AuthController.signUp)

export default router
