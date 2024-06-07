import { SC } from '../helper/statuscode.js'
import dataSource from '../models/index.js'

import { hash } from '../helper/crypto.js'
import { create_token, verify } from '../helper/user.js'
import moment from 'moment'

const userRepository = dataSource.getRepository('User')

export default {
  async signUp(req, res) {
    const { user_email, user_password, user_name, user_phone } = req.body
    try {
      const user = await userRepository.findOne({
        where: [{ user_phone }, { user_email }],
      })
      if (user) {
        return res.stdJson(
          SC.UNPROCESSABLE,
          null,
          'User with that email or phone already exists'
        )
      }

      const hashpassword = hash(user_password)
      const newUser = userRepository.create({
        user_name,
        user_email,
        user_password: hashpassword.pwd,
        user_password_salt: hashpassword.salt,
        user_phone,
      })
      await userRepository.save(newUser)
      return res.stdJson(SC.CREATED, null)
    } catch (e) {
      console.log(e)
      return res.stdJson(
        SC.SERVER_ERROR,
        null,
        'Could not perform operation at this time, kindly try again later.'
      )
    }
  },
  async signIn(req, res) {
    const { user_email, user_phone, user_password } = req.body
    try {
      const user = await userRepository.findOne({
        where: [{ user_phone }, { user_email }],
      })
      if (!user) {
        return res.stdJson(SC.UNAUTHORIZED, null)
      }

      const verifyData = verify(user, { user_password })
      if (!verifyData) {
        return res.stdJson(SC.UNAUTHORIZED, null)
      }

      await userRepository.save({
        user_id: user.user_id,
        user_last_login_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      })

      user.token = create_token(verifyData)
      return res.stdJson(SC.OK, user)
    } catch (e) {
      console.log(e)
      return res.stdJson(
        SC.SERVER_ERROR,
        null,
        'Could not perform operation at this time, kindly try again later.'
      )
    }
  },
}
