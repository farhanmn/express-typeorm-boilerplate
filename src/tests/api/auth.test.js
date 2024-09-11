import request from 'supertest'

import { app, shutDown } from './../../app.js'
import { dataSource, shutDown as Close } from '#tests/helpers/db-handler.js'
const userRepository = dataSource.getRepository('User')

import { hash } from '#helper/crypto.js'

describe('Testing Auth Routes', () => {
  afterAll(async () => {
    await Close()
    shutDown()
  })
  afterAll(async () => {
    await userRepository.delete({ user_email: 'only4Test@testing.com' })
    await userRepository.delete({ user_email: 'only4Test1@testing.com' })
  })
  beforeAll(async () => {
    const hashedPassword = hash('password')

    await userRepository.create({
      user_name: 'Testing',
      user_email: 'only4Test@testing.com',
      user_password: hashedPassword.pwd,
      user_password_salt: hashedPassword.salt,
      user_status: 1,
    })

    await userRepository.create({
      user_name: 'Testing',
      user_email: 'only4Test1@testing.com',
      user_password: hashedPassword.pwd,
      user_password_salt: hashedPassword.salt,
      user_status: 0,
    })
  })

  describe('Testing login route', () => {
    it('should login successfully', async () => {
      const response = await request(app)
        .post('/users/login')
        .send({
          user_email: 'only4Test@testing.com',
          user_password: 'password',
        })
        .expect(200)
      const body = response.body
      expect(body).toHaveProperty('status')
      expect(body).toHaveProperty('data')
      expect(body.data).toHaveProperty('token')
    })

    it('should not login with wrong password', async () => {
      const response = await request(app)
        .post('/users/login')
        .send({
          user_email: 'only4Test@testing.com',
          user_password: 'password1',
        })
        .expect(401)

      const body = response.body
      expect(body).toHaveProperty('status', 'error')
      expect(body).toHaveProperty('message', 'Incorrect password')
      expect(body).not.toHaveProperty('token')
    })

    it('should not login with wrong email', async () => {
      const response = await request(app)
        .post('/users/login')
        .send({
          user_email: 'only4Test@testing1.com',
          user_password: 'password',
        })
        .expect(400)

      const body = response.body
      expect(body).toHaveProperty('status', 'error')
      expect(body).toHaveProperty(
        'message',
        'User with that email or phone does not exist'
      )
      expect(body).not.toHaveProperty('token')
    })

    it('should not login with inactive account', async () => {
      const response = await request(app)
        .post('/users/login')
        .send({
          user_email: 'only4Test1@testing.com',
          user_password: 'password',
        })
        .expect(400)

      const body = response.body
      expect(body).toHaveProperty('status', 'error')
      expect(body).toHaveProperty('message', 'User is not active')
      expect(body).not.toHaveProperty('token')
    })
  })
})
